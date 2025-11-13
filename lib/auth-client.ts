import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  // baseURL 会自动使用当前访问的域名
})
