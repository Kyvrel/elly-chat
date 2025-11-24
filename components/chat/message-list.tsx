import { UIMessage } from 'ai'
import { useRef, useEffect } from 'react'
import { Message } from './message'
import { LoadingIndicator } from './loading-indicator'

type MessageListProps = {
  messages: UIMessage[]
  status: string
}

export function MessageList({ messages, status }: MessageListProps) {
  const messageEndRef = useRef<HTMLDivElement | null>(null)

  // 只在消息数量变化时滚动（避免流式输出时的跳动）
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 pb-32">
      {messages.map(message => {
        return <Message key={message.id} message={message} />
      })}
      {status === 'submitted' && <LoadingIndicator />}
      <div ref={messageEndRef} />
    </div>
  )
}
