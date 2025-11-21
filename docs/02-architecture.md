# 架构设计

## 🏗️ 系统架构

Simple Chatbot 采用现代的前后端一体化架构，基于 Next.js App Router。

---

## 📐 总体架构

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (客户端)                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Chat Page   │  │   Sidebar    │  │  Auth Pages  │ │
│  │              │  │              │  │              │ │
│  │  - Messages  │  │  - History   │  │  - Login     │ │
│  │  - Input     │  │  - Switch    │  │  - Register  │ │
│  │  - Header    │  │  - Delete    │  │              │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                 │                  │          │
│         └─────────────────┴──────────────────┘          │
│                           │                             │
└───────────────────────────┼─────────────────────────────┘
                            │
                            │ HTTP / WebSocket
                            │
┌───────────────────────────┼─────────────────────────────┐
│                           │                             │
│         Next.js Server (服务端)                         │
├───────────────────────────┼─────────────────────────────┤
│                           ▼                             │
│  ┌────────────────────────────────────────────────┐    │
│  │           API Routes (App Router)              │    │
│  ├────────────────────────────────────────────────┤    │
│  │  - /api/chat (POST) - 聊天接口（流式）         │    │
│  │  - /api/auth/* - 认证接口 (NextAuth)           │    │
│  └────────────┬───────────────────────┬───────────┘    │
│               │                       │                │
│               │                       │                │
│       ┌───────▼─────────┐    ┌────────▼────────┐      │
│       │   AI Provider   │    │   Database      │      │
│       │  (OpenAI, etc)  │    │  (PostgreSQL)   │      │
│       │                 │    │                 │      │
│       │  - Stream Chat  │    │  - Users        │      │
│       │  - Models       │    │  - Chats        │      │
│       └─────────────────┘    │  - Messages     │      │
│                              └─────────────────┘      │
└──────────────────────────────────────────────────────┘
```

---

## 🔄 数据流设计

### 1. 用户发送消息流程

```
┌──────────┐
│  User    │
│  Input   │
└────┬─────┘
     │ 1. 用户输入消息
     ▼
┌────────────────┐
│  ChatInput     │
│  Component     │
└────┬───────────┘
     │ 2. 调用 sendMessage()
     ▼
┌────────────────┐
│   useChat      │  ← Vercel AI SDK
│   Hook         │
└────┬───────────┘
     │ 3. POST /api/chat
     ▼
┌────────────────┐
│  API Route     │
│  /api/chat     │
└────┬───────────┘
     │ 4. 调用 AI Provider
     ▼
┌────────────────┐
│  AI Provider   │
│  (OpenAI)      │
└────┬───────────┘
     │ 5. 流式返回
     ▼
┌────────────────┐
│  useChat       │
│  (接收流)      │
└────┬───────────┘
     │ 6. 更新 messages 状态
     ▼
┌────────────────┐
│  MessageList   │
│  Component     │
└────┬───────────┘
     │ 7. 渲染消息
     ▼
┌────────────────┐
│  Message       │
│  Component     │
└────────────────┘
```

---

### 2. 消息存储流程（Phase 2）

```
用户发送消息
     │
     ▼
useChat 发送请求
     │
     ▼
API Route 接收
     │
     ├──────────────┐
     │              │
     ▼              ▼
调用 AI        保存到数据库
     │              │
     │              ├─ 保存用户消息
     ▼              │
流式返回          │
     │              │
     ▼              ▼
onFinish()      保存 AI 回复
     │
     ▼
触发侧边栏刷新
```

---

### 3. 会话切换流程（Phase 2）

```
用户点击侧边栏会话
     │
     ▼
router.push('/chat/[id]')
     │
     ▼
服务端渲染
     │
     ├─ 从数据库加载消息
     │
     ▼
返回初始 messages
     │
     ▼
useChat 初始化
     │
     ▼
MessageList 渲染
```

---

## 🗂️ 数据模型设计

### Phase 1: 纯内存状态（不持久化）

```typescript
// 消息结构
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

// 状态存储在 useChat hook 中
const { messages, sendMessage } = useChat({
  initialMessages: []
})
```

---

### Phase 2: 数据库设计

#### 表结构

**1. users 表（Phase 3 添加）**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**2. chats 表**
```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_chats_created_at ON chats(created_at DESC);
```

**3. messages 表**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

#### Drizzle ORM Schema

```typescript
// lib/db/schema.ts

import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatId: uuid('chat_id').references(() => chats.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 20 }).notNull(), // 'user' | 'assistant'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow()
})
```

---

## 🔌 API 设计

### Phase 1: 聊天 API

#### POST /api/chat

**请求：**
```typescript
{
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
  }>
}
```

**响应：** 流式响应（Server-Sent Events）
```
data: {"type":"text","value":"你"}
data: {"type":"text","value":"好"}
data: {"type":"text","value":"！"}
...
data: [DONE]
```

**实现：**
```typescript
// app/api/chat/route.ts

import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
  })

  return result.toDataStreamResponse()
}
```

---

### Phase 2: 聊天历史 API

#### GET /api/chats

获取用户的所有聊天会话

**响应：**
```typescript
{
  chats: Array<{
    id: string
    title: string
    createdAt: string
    updatedAt: string
  }>
}
```

#### GET /api/chats/[id]

获取指定会话的所有消息

**响应：**
```typescript
{
  chat: {
    id: string
    title: string
  },
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    createdAt: string
  }>
}
```

#### DELETE /api/chats/[id]

删除指定会话

**响应：**
```typescript
{
  success: boolean
}
```

---

### Phase 3: 认证 API

使用 NextAuth.js，自动提供以下端点：

- `POST /api/auth/signin` - 登录
- `POST /api/auth/signout` - 登出
- `GET /api/auth/session` - 获取会话
- `POST /api/auth/register` - 注册（自定义）

---

## 🧩 组件设计

### 组件层次结构

```
app/
├── layout.tsx (根布局)
│   └── RootLayout
│       ├── Sidebar (Phase 2)
│       │   ├── SidebarHeader
│       │   ├── ChatHistory
│       │   │   └── ChatHistoryItem (多个)
│       │   └── SidebarFooter
│       └── {children}
│
├── page.tsx (首页)
│   └── ChatPage
│       ├── ChatHeader
│       ├── MessageList
│       │   └── Message (多个)
│       └── ChatInput
│
└── chat/[id]/page.tsx (会话页面 - Phase 2)
    └── ChatPage (同上)
```

---

### 核心组件详解

#### 1. Message 组件

**职责：** 渲染单条消息

**Props：**
```typescript
interface MessageProps {
  message: {
    id: string
    role: 'user' | 'assistant'
    content: string
  }
}
```

**关键特性：**
- 根据 role 显示不同样式（用户右对齐，AI 左对齐）
- Markdown 渲染
- 代码块语法高亮（Phase 4）
- 复制按钮（Phase 4）

---

#### 2. MessageList 组件

**职责：** 渲染消息列表，管理滚动

**Props：**
```typescript
interface MessageListProps {
  messages: Message[]
}
```

**关键特性：**
- 自动滚动到底部
- 虚拟滚动（消息很多时 - Phase 4）
- 加载状态显示

---

#### 3. ChatInput 组件

**职责：** 处理用户输入

**Props：**
```typescript
interface ChatInputProps {
  onSend: (content: string) => void
  isLoading: boolean
}
```

**关键特性：**
- 多行输入（textarea）
- 自动高度调整
- Enter 发送，Shift+Enter 换行
- 停止生成按钮（Phase 2）
- 字符计数（Phase 4）

---

#### 4. ChatHeader 组件

**职责：** 顶部导航栏

**特性：**
- 显示会话标题（Phase 2）
- 新建会话按钮
- 用户菜单（Phase 3）
- 移动端侧边栏切换按钮

---

#### 5. Sidebar 组件（Phase 2）

**职责：** 侧边栏导航

**特性：**
- 显示历史会话列表
- 切换会话
- 删除会话
- 新建会话
- 响应式（移动端可收起）

---

## 🔐 状态管理

### Phase 1: 本地状态（useChat）

```typescript
const {
  messages,        // 消息列表
  input,          // 输入框内容
  isLoading,      // 加载状态
  sendMessage,    // 发送消息
  stop,           // 停止生成（Phase 2）
} = useChat({
  api: '/api/chat',
  initialMessages: [],
})
```

**优点：**
- 简单直接
- Vercel AI SDK 已封装好
- 自动处理流式响应

---

### Phase 2: 数据持久化（SWR + Database）

```typescript
// 获取聊天列表
const { data: chats, mutate } = useSWR('/api/chats', fetcher)

// 切换会话时
const loadChat = async (chatId: string) => {
  const res = await fetch(`/api/chats/${chatId}`)
  const { messages } = await res.json()

  // 初始化 useChat
  setMessages(messages)
}

// 保存新消息
const saveMessage = async (message: Message) => {
  await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(message)
  })

  // 刷新侧边栏
  mutate()
}
```

---

### Phase 3: 认证状态（NextAuth）

```typescript
const { data: session } = useSession()

// 保护路由
if (!session) {
  redirect('/login')
}

// 获取当前用户的数据
const userId = session.user.id
```

---

## 🎨 样式系统

### Tailwind CSS + CSS 变量

```css
/* globals.css */

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  /* ... 更多变量 */
}
```

**使用：**
```tsx
<div className="bg-background text-foreground border-border">
  <button className="bg-primary text-primary-foreground">
    发送
  </button>
</div>
```

**优点：**
- 易于主题切换（Phase 4 添加深色模式）
- 一致的颜色系统
- 易于维护

---

## 🚀 性能优化

### 1. 代码分割

```typescript
// 动态导入
const Sidebar = dynamic(() => import('@/components/sidebar'), {
  loading: () => <SidebarSkeleton />
})
```

### 2. 图片优化

```typescript
import Image from 'next/image'

<Image
  src="/avatar.png"
  width={32}
  height={32}
  alt="User"
/>
```

### 3. 流式渲染

- 使用 React Server Components
- 使用 Suspense 边界
- 流式返回 AI 响应

### 4. 缓存策略（Phase 2）

```typescript
// SWR 自动缓存
const { data } = useSWR('/api/chats', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1 分钟内不重复请求
})
```

---

## 🔒 安全设计

### 1. API 保护（Phase 3）

```typescript
// app/api/chat/route.ts
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  // ... 继续处理
}
```

### 2. XSS 防护

- 使用 Markdown 渲染库的安全模式
- 禁止渲染危险的 HTML 标签
- 对用户输入进行转义

### 3. SQL 注入防护

- 使用 Drizzle ORM 参数化查询
- 不直接拼接 SQL

### 4. Rate Limiting（Phase 4）

```typescript
import { ratelimit } from '@/lib/ratelimit'

export async function POST(req: Request) {
  const { success } = await ratelimit.limit(userId)

  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }

  // ... 继续处理
}
```

---

## 📦 部署架构

### Vercel 部署（推荐）

```
┌─────────────────┐
│  Vercel Edge    │ ← 用户请求
│  Network        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js        │
│  Server         │
│  (Serverless)   │
└────────┬────────┘
         │
         ├────────────┐
         │            │
         ▼            ▼
┌──────────────┐  ┌──────────────┐
│  OpenAI API  │  │  PostgreSQL  │
│              │  │  (Vercel)    │
└──────────────┘  └──────────────┘
```

### 自托管部署

```
┌─────────────────┐
│     Nginx       │ ← 用户请求
│  (Reverse Proxy)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js        │
│  Server         │
│  (Node.js)      │
└────────┬────────┘
         │
         ├────────────┐
         │            │
         ▼            ▼
┌──────────────┐  ┌──────────────┐
│  OpenAI API  │  │  PostgreSQL  │
│              │  │  (自托管)    │
└──────────────┘  └──────────────┘
```

---

## 📊 可观测性（Phase 4）

### 1. 日志

```typescript
// lib/logger.ts
import { createLogger } from 'winston'

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
})
```

### 2. 监控

- Vercel Analytics（自动）
- Sentry（错误追踪）
- PostHog（用户行为）

### 3. 性能追踪

```typescript
import { track } from '@/lib/analytics'

// 追踪关键操作
track('message_sent', {
  chatId,
  messageLength: content.length,
  duration: Date.now() - startTime
})
```

---

## 🔄 扩展性设计

### 插件系统（预留）

```typescript
// 预留插件接口
interface Plugin {
  name: string
  onMessageReceived?: (message: Message) => void
  onMessageSent?: (message: Message) => void
  commands?: Command[]
}

// 未来可以添加
const plugins = [
  weatherPlugin,
  calculatorPlugin,
  // ... 更多插件
]
```

### 自定义模型（预留）

```typescript
// lib/ai/providers.ts

// 当前：单一模型
export const model = openai('gpt-4o')

// 未来：可切换模型
export const models = {
  'gpt-4o': openai('gpt-4o'),
  'claude-3': anthropic('claude-3-opus'),
  'qwen': custom('qwen-max'),
}
```

---

**最后更新：** 2025-11-13
