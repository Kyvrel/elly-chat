import { UIMessage } from 'ai'
import { useRef, useEffect } from 'react'
import { Message } from './message'
import { LoadingIndicator } from './loading-indicator'
import { Button } from '../ui/button'

import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
type MessageListProps = {
  messages: UIMessage[]
  status: string
  error: Error | undefined
  regenerate: () => void
}

export function MessageList({
  messages,
  status,
  regenerate,
  error,
}: MessageListProps) {
  const messageEndRef = useRef<HTMLDivElement | null>(null)

  // 只在消息数量变化时滚动（避免流式输出时的跳动）
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 pb-32">
      {messages.map(message => {
        return <Message key={message.id} message={message} />
      })}
      {status === 'submitted' && <LoadingIndicator />}
      {error && (
        <div className="px-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>An error occurred.</AlertTitle>
            <AlertDescription>
              <p className='mb-2'>{error.message}</p>
              <Button variant="destructive" onClick={() => regenerate()}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div ref={messageEndRef} />
    </div>
  )
}
