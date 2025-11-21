# 实现计划

## 📅 4 周开发计划

本文档详细说明 Simple Chatbot 的分阶段实现计划。

---

## 🎯 整体时间线

```
Week 1-2: Phase 1 - 基础聊天 (MVP)
Week 3:   Phase 2 - 聊天历史
Week 4:   Phase 2-3 - 用户认证
Week 5+:  Phase 4 - 优化和扩展
```

---

## 📋 Phase 1: 基础聊天（第 1-2 周）

### 目标
实现一个可用的 AI 聊天界面，支持基础对话功能。

### 交付物
- ✅ 能发送文本消息
- ✅ 能接收 AI 流式回复
- ✅ Markdown 渲染（代码块、列表等）
- ✅ 响应式布局（移动端+桌面端）
- ✅ 基础 UI 组件

---

### Day 1-2: 项目初始化

#### 任务清单
- [ ] 创建 Next.js 项目
  ```bash
  npx create-next-app@latest simple-chatbot --typescript --tailwind --app
  ```
- [ ] 安装依赖
  ```bash
  pnpm add ai @ai-sdk/openai zod
  pnpm add -D @types/react @types/node
  ```
- [ ] 配置 shadcn/ui
  ```bash
  npx shadcn@latest init
  ```
- [ ] 安装基础 UI 组件
  ```bash
  npx shadcn@latest add button input card textarea
  ```
- [ ] 设置环境变量
  ```bash
  # .env.local
  OPENAI_API_KEY=sk-...
  ```

#### 目录结构
```
simple-chatbot/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── chat/
│           └── route.ts
├── components/
│   ├── ui/          # shadcn/ui 组件
│   └── chat/        # 聊天组件（待创建）
├── lib/
│   ├── ai.ts        # AI 配置
│   └── utils.ts     # 工具函数
└── docs/            # 项目文档
```

---

### Day 3-4: 核心组件开发

#### 1. Message 组件
**文件：** `components/chat/message.tsx`

**功能：**
- 根据角色显示不同样式
- 基础 Markdown 渲染
- 用户消息右对齐，AI 消息左对齐

**代码量：** ~50 行

---

#### 2. MessageList 组件
**文件：** `components/chat/message-list.tsx`

**功能：**
- 渲染消息列表
- 自动滚动到底部
- 显示加载状态

**代码量：** ~80 行

---

#### 3. ChatInput 组件
**文件：** `components/chat/chat-input.tsx`

**功能：**
- 多行文本输入
- 发送按钮
- Enter 发送，Shift+Enter 换行
- 禁用状态（加载中）

**代码量：** ~100 行

---

#### 4. ChatHeader 组件
**文件：** `components/chat/chat-header.tsx`

**功能：**
- 显示应用标题
- 新建会话按钮

**代码量：** ~30 行

---

### Day 5: API 开发

#### 聊天 API
**文件：** `app/api/chat/route.ts`

**功能：**
- 接收用户消息
- 调用 OpenAI API
- 流式返回响应

**代码量：** ~50 行

**核心代码：**
```typescript
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}
```

---

### Day 6: 集成和测试

#### 1. 主页面集成
**文件：** `app/page.tsx`

**功能：**
- 使用 useChat hook
- 组合所有组件
- 处理状态管理

**代码量：** ~100 行

**核心代码：**
```typescript
'use client'

import { useChat } from '@ai-sdk/react'
import { MessageList } from '@/components/chat/message-list'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatHeader } from '@/components/chat/chat-header'

export default function ChatPage() {
  const { messages, input, setInput, sendMessage, isLoading } = useChat({
    api: '/api/chat',
  })

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader />
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        disabled={isLoading}
      />
    </div>
  )
}
```

#### 2. 测试清单
- [ ] 发送消息功能
- [ ] 流式响应显示
- [ ] Markdown 渲染正确
- [ ] 响应式布局正常
- [ ] 移动端适配
- [ ] 加载状态显示
- [ ] 错误处理

---

### Day 7: 文档和优化

#### 任务
- [ ] 编写 Phase 1 技术文档
- [ ] 代码注释补充
- [ ] 样式优化
- [ ] 性能测试
- [ ] 创建 README

#### 交付文档
- `docs/phase1/README.md` - Phase 1 概览
- `docs/phase1/components.md` - 组件说明
- `docs/phase1/api.md` - API 说明
- `docs/phase1/troubleshooting.md` - 常见问题

---

### Phase 1 完成标准

#### 功能标准
- [x] 用户可以发送文本消息
- [x] AI 回复流式显示（打字机效果）
- [x] Markdown 正确渲染（代码块、列表、粗体等）
- [x] 移动端和桌面端布局正常
- [x] 没有明显的 bug

#### 代码标准
- [x] 代码结构清晰
- [x] 有必要的注释
- [x] 类型定义完整（TypeScript）
- [x] 遵循 ESLint 规则

#### 文档标准
- [x] 有完整的设计文档
- [x] 有组件使用说明
- [x] 有 API 接口文档
- [x] 有常见问题解答

---

## 📋 Phase 2: 聊天历史（第 3 周）

### 目标
实现聊天会话的保存、查看和管理功能。

### 交付物
- ✅ 数据库设计和实现（2 个表）
- ✅ 侧边栏组件
- ✅ 保存/加载会话功能
- ✅ 切换/删除会话功能

---

### Day 1-2: 数据库设计

#### 任务清单
- [ ] 安装数据库依赖
  ```bash
  pnpm add drizzle-orm postgres
  pnpm add -D drizzle-kit
  ```
- [ ] 设计数据库 Schema
- [ ] 创建迁移文件
- [ ] 本地测试数据库连接

#### 数据库 Schema
**文件：** `lib/db/schema.ts`

```typescript
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

// Phase 2 只需要这 2 个表
export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatId: uuid('chat_id').references(() => chats.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 20 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow()
})
```

---

### Day 3-4: API 开发

#### 1. 获取聊天列表 API
**文件：** `app/api/chats/route.ts`

**功能：**
- GET: 获取所有聊天会话
- POST: 创建新会话

#### 2. 会话详情 API
**文件：** `app/api/chats/[id]/route.ts`

**功能：**
- GET: 获取会话的所有消息
- DELETE: 删除会话

#### 3. 保存消息 API
**文件：** `app/api/messages/route.ts`

**功能：**
- POST: 保存新消息

---

### Day 5: 侧边栏组件

#### 1. Sidebar 组件
**文件：** `components/sidebar/sidebar.tsx`

**功能：**
- 显示聊天历史列表
- 新建会话按钮
- 响应式（移动端可收起）

#### 2. ChatHistory 组件
**文件：** `components/sidebar/chat-history.tsx`

**功能：**
- 使用 SWR 获取数据
- 显示会话列表
- 点击切换会话
- 删除会话

---

### Day 6: 集成和重构

#### 任务
- [ ] 修改 Chat API 支持保存消息
- [ ] 修改主页面支持侧边栏
- [ ] 创建动态路由 `/chat/[id]`
- [ ] 数据同步逻辑

#### 关键改动

**Chat API 保存消息：**
```typescript
export async function POST(req: Request) {
  const { messages, chatId } = await req.json()

  // 如果没有 chatId，创建新会话
  const chat = chatId
    ? await getChat(chatId)
    : await createChat({ title: messages[0].content.slice(0, 50) })

  // 保存用户消息
  await saveMessage({
    chatId: chat.id,
    role: 'user',
    content: messages[messages.length - 1].content
  })

  // 调用 AI
  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    onFinish: async ({ text }) => {
      // 保存 AI 回复
      await saveMessage({
        chatId: chat.id,
        role: 'assistant',
        content: text
      })
    }
  })

  return result.toDataStreamResponse()
}
```

---

### Day 7: 测试和文档

#### 测试清单
- [ ] 创建新会话
- [ ] 保存消息到数据库
- [ ] 切换会话加载历史消息
- [ ] 删除会话
- [ ] 侧边栏刷新

#### 文档
- `docs/phase2/README.md` - Phase 2 概览
- `docs/phase2/database.md` - 数据库设计
- `docs/phase2/api.md` - 新增 API 文档

---

## 📋 Phase 3: 用户认证（第 4 周）

### 目标
实现多用户支持，每个用户有独立的聊天数据。

### 交付物
- ✅ 用户认证系统（NextAuth）
- ✅ 登录/注册页面
- ✅ 数据隔离
- ✅ API 保护

---

### Day 1-2: NextAuth 配置

#### 任务清单
- [ ] 安装依赖
  ```bash
  pnpm add next-auth @auth/drizzle-adapter bcrypt
  pnpm add -D @types/bcrypt
  ```
- [ ] 添加 users 表
- [ ] 配置 NextAuth
- [ ] 创建认证 API

#### Users 表
```typescript
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
})
```

---

### Day 3: 登录/注册页面

#### 1. 登录页面
**文件：** `app/(auth)/login/page.tsx`

**功能：**
- 邮箱+密码登录
- 表单验证
- 错误提示

#### 2. 注册页面
**文件：** `app/(auth)/register/page.tsx`

**功能：**
- 邮箱+密码注册
- 密码强度验证
- 重复邮箱检测

---

### Day 4-5: 数据隔离

#### 任务
- [ ] 修改 chats 表添加 user_id
- [ ] 所有 API 添加认证检查
- [ ] 过滤查询结果（只返回当前用户数据）

#### 关键改动

**Chats 表添加 user_id：**
```typescript
export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
})
```

**API 保护：**
```typescript
export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  // 只返回当前用户的数据
  const chats = await db.query.chats.findMany({
    where: eq(chats.userId, session.user.id)
  })

  return Response.json(chats)
}
```

---

### Day 6: 用户界面

#### 任务
- [ ] 添加用户菜单（ChatHeader）
- [ ] 显示用户名
- [ ] 退出登录按钮
- [ ] 路由保护（未登录重定向）

---

### Day 7: 测试和文档

#### 测试清单
- [ ] 注册新用户
- [ ] 登录/登出
- [ ] 不同用户数据隔离
- [ ] API 未授权返回 401
- [ ] 路由保护正常工作

#### 文档
- `docs/phase3/README.md` - Phase 3 概览
- `docs/phase3/auth.md` - 认证流程说明
- `docs/phase3/security.md` - 安全设计

---

## 📋 Phase 4: 优化和扩展（第 5+ 周）

### 可选功能列表

#### 1. 代码高亮（推荐指数：⭐⭐⭐⭐⭐）
**时间：** 1-2 天

**任务：**
- [ ] 安装 `react-syntax-highlighter`
- [ ] 集成到 Markdown 渲染
- [ ] 支持常见语言
- [ ] 自动检测语言

---

#### 2. 停止生成（推荐指数：⭐⭐⭐⭐）
**时间：** 0.5 天

**任务：**
- [ ] 添加停止按钮（ChatInput）
- [ ] 调用 useChat 的 stop()
- [ ] UI 状态切换

---

#### 3. 复制消息（推荐指数：⭐⭐⭐⭐）
**时间：** 0.5 天

**任务：**
- [ ] 添加复制按钮（Message）
- [ ] 使用 Clipboard API
- [ ] 复制成功提示

---

#### 4. 重新生成（推荐指数：⭐⭐⭐）
**时间：** 1 天

**任务：**
- [ ] 添加重新生成按钮
- [ ] 删除原回复
- [ ] 发送同样的消息

---

#### 5. 深色模式（推荐指数：⭐⭐⭐）
**时间：** 1-2 天

**任务：**
- [ ] 添加主题切换逻辑
- [ ] 配置深色主题 CSS 变量
- [ ] 持久化用户偏好

---

#### 6. 消息时间戳（推荐指数：⭐⭐）
**时间：** 0.5 天

**任务：**
- [ ] Message 组件显示时间
- [ ] 使用相对时间（1 分钟前）
- [ ] Tooltip 显示完整时间

---

#### 7. 搜索历史（推荐指数：⭐⭐）
**时间：** 2 天

**任务：**
- [ ] 侧边栏添加搜索框
- [ ] API 支持搜索
- [ ] 实时过滤结果

---

#### 8. 导出对话（推荐指数：⭐）
**时间：** 1 天

**任务：**
- [ ] 导出为 Markdown
- [ ] 导出为纯文本
- [ ] 复制到剪贴板

---

## 🎯 里程碑检查点

### Milestone 1: MVP（第 2 周末）
- [x] 能发送消息并收到回复
- [x] Markdown 正确渲染
- [x] 响应式布局正常
- [x] 代码质量达标

### Milestone 2: 数据持久化（第 3 周末）
- [x] 聊天历史保存到数据库
- [x] 侧边栏显示历史
- [x] 能切换和删除会话

### Milestone 3: 多用户支持（第 4 周末）
- [x] 用户注册/登录
- [x] 数据隔离正常
- [x] API 安全保护

### Milestone 4: 生产就绪（第 5-6 周）
- [x] 代码高亮
- [x] 停止生成
- [x] 复制消息
- [x] 性能优化
- [x] 文档完善
- [x] 部署成功

---

## 📊 风险管理

### 可能的风险

#### 1. OpenAI API 访问问题
**风险等级：** 高
**影响：** 无法调用 AI
**缓解措施：**
- 使用代理服务
- 切换到国内大模型（通义千问、智谱等）
- 准备 Mock 数据用于开发

#### 2. 数据库连接问题
**风险等级：** 中
**影响：** Phase 2 无法进行
**缓解措施：**
- 先用 SQLite 本地开发
- 使用 Vercel Postgres（免费额度）
- Docker 本地运行 PostgreSQL

#### 3. 认证系统复杂度
**风险等级：** 中
**影响：** Phase 3 延期
**缓解措施：**
- 使用 Clerk（更简单）替代 NextAuth
- 简化认证流程（只支持邮箱密码）

#### 4. 响应式布局问题
**风险等级：** 低
**影响：** 移动端体验差
**缓解措施：**
- 参考 ai-chatbot 的布局
- 使用 Tailwind 响应式类
- 充分测试不同设备

---

## 🎓 学习资源

### 每个阶段的学习重点

#### Phase 1
- **Next.js App Router** - 路由和布局
- **Vercel AI SDK** - useChat hook
- **Tailwind CSS** - 响应式设计

**推荐资源：**
- [Next.js 官方文档](https://nextjs.org/docs)
- [Vercel AI SDK 文档](https://sdk.vercel.ai/docs)
- Tailwind 练习文件（已完成）

#### Phase 2
- **Drizzle ORM** - 数据库操作
- **SWR** - 数据获取和缓存
- **PostgreSQL** - 关系型数据库

**推荐资源：**
- [Drizzle 文档](https://orm.drizzle.team/)
- [SWR 文档](https://swr.vercel.app/)

#### Phase 3
- **NextAuth.js** - 认证系统
- **JWT / Session** - 会话管理
- **安全最佳实践** - XSS, CSRF 防护

**推荐资源：**
- [NextAuth.js 文档](https://next-auth.js.org/)
- [OWASP Top 10](https://owasp.org/Top10/)

---

## 📝 每日检查清单

### 开发前
- [ ] 创建今天的任务清单
- [ ] 确认环境正常（数据库、API key）
- [ ] 拉取最新代码（如果团队开发）

### 开发中
- [ ] 代码符合 ESLint 规则
- [ ] TypeScript 类型正确
- [ ] 测试关键功能
- [ ] 提交有意义的 commit

### 开发后
- [ ] 更新文档
- [ ] 代码 review（如果团队开发）
- [ ] 备份数据库（如果有重要数据）
- [ ] 记录遇到的问题和解决方案

---

**最后更新：** 2025-11-13
