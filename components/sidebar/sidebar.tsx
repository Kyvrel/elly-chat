'use client'

import { useEffect, useState } from 'react'
import { MessageSquare, PlusIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { ChatHeader } from '../chat/chat-header'
import { Button } from '../ui/button'

const fetcher = (url: string) => fetch(url).then(res => res.json())

type Chat = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

export function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState('')

  const handleNewChat = async () => {
    const res = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: 'New Chat' }),
    })
    const newChat = await res.json()
    setChats([newChat, ...chats])
    setSelected(newChat.id)
  }

  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/chats')
      const chats = await res.json()
      setChats(chats)
    } catch (e) {
      console.error('failed to fetch chats:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    // 乐观更新
    setChats(chats.filter(chat => chat.id != id))
    try {
      await fetch(`/api/chats/${id}`, {
        method: 'DELETE',
      })
    } catch (e) {
      console.error('failed to delete chat:', e)
      await fetchChats()
    }
  }

  return (
    <div className="flex flex-col bg-sidebar border-sidebar-border w-72 border-r h-full">
      <div className="border-b border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/elephant.png" alt="Elly" width={24} height={24} />
          <h1 className="text-lg font-semibold text-sidebar-foreground">
            Elly Chat
          </h1>
        </div>
      </div>

      <div className="px-4 py-2">
        <Button className="w-full" size="sm" onClick={handleNewChat}>
          <PlusIcon className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-sm text-sidebar-foreground/60 text-center px-4">
            Loading...
          </div>
        ) : chats.length === 0 ? (
          <div className="text-sm text-sidebar-foreground/60 text-center py-4">
            No chats yet. Click "New Chat" to start!
          </div>
        ) : (
          chats.map(chat => {
            return (
              <div
                className={`w-full rounded-xl p-3 mb-1 text-left transition-colors group cursor-pointer ${
                  selected === chat.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'hover:bg-muted'
                }`}
                key={chat.id}
                onClick={() => {
                  setSelected(chat.id)
                  console.log('select chat', chat.id)
                }}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-sidebar-foreground/60 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-sidebar-foreground/60">
                      {new Date(chat.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 rounded p-0.5 transition-all"
                    onClick={e => {
                      e.stopPropagation()
                      handleDelete(chat.id)
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
