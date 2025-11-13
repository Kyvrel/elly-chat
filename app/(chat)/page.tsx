'use client'

import { authClient } from '@/lib/auth-client'

export default function Chat() {
  const { data: session } = authClient.useSession()

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-semibold">欢迎使用 Elly Chat</h1>
        {session?.user && (
          <p className="mb-2 text-lg">
            你好, <strong>{session.user.name || session.user.email}</strong>!
          </p>
        )}
        <p className="text-muted-foreground">从左侧侧边栏选择或创建新对话</p>
      </div>
    </div>
  )
}
