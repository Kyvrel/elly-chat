'use client'

import { useState } from 'react'
import { MessageSquare, PlusIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { ChatHeader } from '../chat/chat-header'
import { Button } from '../ui/button'

export function Sidebar() {
  const [selected, setSelected] = useState('1')

  const MOCK_CHATS = Array.from({ length: 100 }, (_, idx) => ({
    id: String(idx),
    title: `${idx}: How to use React hooks?`,
    updatedAt: new Date('2024-01-15'),
  }))
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
        <Button
          className="w-full"
          size="sm"
          onClick={() => console.log('new chats')}
        >
          <PlusIcon className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {MOCK_CHATS.map(chat => {
          return (
            <div
              className={`w-full rounded-lg p-4 text-left  group cursor-pointer ${
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
                    {chat.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => {
                    e.stopPropagation()
                    console.log('delete chat', chat.id)
                  }}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
