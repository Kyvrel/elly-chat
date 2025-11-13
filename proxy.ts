import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const PUBLIC_PATH = ['/login', '/signup']

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 公开路径,不需要验证
  if (PUBLIC_PATH.includes(pathname)) {
    return NextResponse.next()
  }

  // 检查会话
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  // 未登录,重定向到登录页
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
