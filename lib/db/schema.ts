import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

// Phase 2: 聊天历史 - 只需要这 2 个表
export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatId: uuid('chat_id')
    .references(() => chats.id, { onDelete: 'cascade' })
    .notNull(),
  role: varchar('role', { length: 20 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
