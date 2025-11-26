import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { chats, messages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// GET /api/chats/[id] - 获取某个聊天的所有消息
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const chatMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, id))
      .orderBy(messages.createdAt)

    return NextResponse.json(chatMessages)
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// DELETE /api/chats/[id] - 删除聊天
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await db.delete(chats).where(eq(chats.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete chat:', error)
    return NextResponse.json({ error: 'Failed to delete chat' }, { status: 500 })
  }
}
