'use client'

import { useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { ChatHeader } from '@/components/chat/chat-header'
import { Sidebar } from '@/components/sidebar/sidebar'
import { MessageList } from '@/components/chat/message-list'
import { ChatInput } from '@/components/chat/chat-input'
import { convertToModelMessages } from 'ai'

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat()
  const [input, setInput] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage({ text: input })
    setInput('')
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }
  useEffect(() => {
    console.log('[ChatPage]: messages: ', messages)
  }, [messages])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <ChatHeader />
        <MessageList messages={messages} status={status} />
        <ChatInput
          input={input}
          status={status}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
