import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

// GET /api/chats - 获取所有聊天列表
export async function GET() {
  try {
    const allChats = await db
      .select()
      .from(chats)
      .orderBy(desc(chats.updatedAt))

    return NextResponse.json(allChats)
  } catch (error) {
    console.error('Failed to fetch chats:', error)
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 })
  }
}

// POST /api/chats - 创建新聊天
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const [newChat] = await db
      .insert(chats)
      .values({
        title,
      })
      .returning()

    return NextResponse.json(newChat, { status: 201 })
  } catch (error) {
    console.error('Failed to create chat:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}
