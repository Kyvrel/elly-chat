# Simple Chatbot - 项目概览

## 📋 项目简介

Simple Chatbot 是一个简化版的 AI 聊天应用，基于 [ai-chatbot](https://github.com/vercel/ai-chatbot) 项目精简而来。

**设计目标：**
- ✅ 保留 ai-chatbot 80% 的核心体验
- ✅ 减少 90% 的代码复杂度
- ✅ 4 周内可完成开发
- ✅ 易于学习和维护

---

## 🎯 核心特性

### ✅ 包含的功能

| 功能 | 说明 | 优先级 |
|------|------|--------|
| **基础聊天** | 用户与 AI 的纯文本对话 | P0 |
| **流式响应** | AI 回复逐字显示（打字机效果） | P0 |
| **Markdown 渲染** | 支持代码块、列表、粗体等基础格式 | P0 |
| **响应式布局** | 支持移动端和桌面端 | P0 |
| **聊天历史** | 保存和查看历史会话 | P1 |
| **侧边栏导航** | 快速切换不同会话 | P1 |
| **用户认证** | 登录/注册，数据隔离 | P1 |
| **代码高亮** | 代码块语法高亮 | P2 |
| **停止生成** | 中断 AI 回复 | P2 |
| **复制消息** | 一键复制 AI 回复 | P2 |

### ❌ 不包含的功能

| 功能 | 原因 | 原版代码量 |
|------|------|-----------|
| **Artifact（多编辑器）** | 太复杂，需要集成 4 种编辑器 | 16.4KB |
| **Tool Calling** | 需要开发工具生态系统 | 8KB |
| **文件上传** | 需要存储服务（成本和复杂度） | 3KB |
| **多模型选择** | 简化为单模型 | 2KB |
| **投票系统** | 非核心功能 | 2KB |
| **分享/导出** | 后期可选功能 | 2KB |
| **主题切换** | 固定单主题 | 1KB |

---

## 📊 对比数据

### 代码量对比

| 项目 | 代码行数 | 组件数 | 文件数 | 学习时间 |
|------|---------|--------|-------|---------|
| **ai-chatbot（原版）** | 19,416 | 48 | 100+ | 8-12 周 |
| **simple-chatbot（Phase 1-3）** | ~1,500 | 15 | 30 | 4 周 |
| **simple-chatbot（完整版）** | ~2,000 | 20 | 35 | 5-6 周 |

**结论：减少 90% 代码量，保留 80% 核心体验！**

### 复杂度对比

#### 原版 ai-chatbot 复杂度分布
```
AI 集成 (40%)
  ├─ Tool Calling (4 tools)
  ├─ Stream Protocol
  └─ Multi-model Support

状态管理 (25%)
  ├─ useChat + SWR + Context
  └─ 复杂消息格式（Part[]）

多编辑器 (20%)
  ├─ CodeMirror (代码)
  ├─ ProseMirror (文本)
  ├─ react-data-grid (表格)
  └─ Canvas (图片)

其他 (15%)
  ├─ 认证、路由、数据库
  └─ UI 组件
```

#### Simple Chatbot 复杂度分布
```
AI 集成 (50%)
  ├─ 纯文本聊天
  └─ Stream Protocol

状态管理 (20%)
  └─ useChat（单一状态）

UI 渲染 (20%)
  └─ Markdown 基础渲染

数据持久化 (10%)
  └─ 简单的 CRUD
```

---

## 🏗️ 技术栈

### 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 15.x | React 框架（App Router） |
| **React** | 19.x | UI 库 |
| **TypeScript** | 5.x | 类型安全 |
| **Tailwind CSS** | 4.x | 样式框架 |
| **Vercel AI SDK** | 5.x | AI 集成（useChat hook） |

### UI 组件

| 技术 | 用途 |
|------|------|
| **shadcn/ui** | 基础组件库 |
| **Radix UI** | 无障碍组件（底层） |
| **Lucide Icons** | 图标库 |

### 数据层（Phase 2+）

| 技术 | 用途 |
|------|------|
| **Drizzle ORM** | 类型安全的 ORM |
| **PostgreSQL** | 生产环境数据库 |
| **SQLite** | 本地开发数据库（可选） |
| **SWR** | 数据获取和缓存 |

### 认证（Phase 3+）

| 技术 | 用途 |
|------|------|
| **NextAuth.js** | 认证解决方案 |
| **或 Clerk** | 更简单的替代方案 |

### AI Provider（Phase 1）

| Provider | 推荐指数 | 说明 |
|----------|---------|------|
| **OpenAI** | ⭐⭐⭐⭐⭐ | 最稳定，但需要代理 |
| **通义千问** | ⭐⭐⭐⭐ | 国内访问快 |
| **智谱 AI** | ⭐⭐⭐⭐ | 国内访问快 |
| **Anthropic Claude** | ⭐⭐⭐⭐⭐ | 质量最高，但需要代理 |

---

## 📐 项目结构

### 简化版文件结构
```
simple-chatbot/
├── app/                        # Next.js App Router
│   ├── (auth)/                # 认证路由组（Phase 3）
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── chat/                  # 聊天路由
│   │   └── [id]/page.tsx     # 动态聊天页面（Phase 2）
│   ├── api/                   # API 路由
│   │   └── chat/route.ts     # 聊天 API（Phase 1）
│   ├── layout.tsx             # 根布局
│   ├── page.tsx               # 首页（Phase 1）
│   └── globals.css            # 全局样式
│
├── components/                # React 组件
│   ├── ui/                    # shadcn/ui 基础组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...（10 个常用组件）
│   ├── chat/                  # 聊天相关组件
│   │   ├── message.tsx        # 消息组件（Phase 1）
│   │   ├── message-list.tsx   # 消息列表（Phase 1）
│   │   ├── chat-input.tsx     # 输入框（Phase 1）
│   │   └── chat-header.tsx    # 顶部导航（Phase 1）
│   └── sidebar/               # 侧边栏组件（Phase 2）
│       ├── sidebar.tsx
│       └── chat-history.tsx
│
├── lib/                       # 工具和配置
│   ├── ai.ts                  # AI 配置（Phase 1）
│   ├── db.ts                  # 数据库配置（Phase 2）
│   ├── auth.ts                # 认证配置（Phase 3）
│   └── utils.ts               # 工具函数
│
├── docs/                      # 项目文档
│   ├── 00-overview.md         # 项目概览（本文件）
│   ├── 01-feature-comparison.md  # 功能对比
│   ├── 02-architecture.md     # 架构设计
│   ├── 03-implementation-plan.md # 实现计划
│   └── 04-tech-stack.md       # 技术栈详解
│
└── public/                    # 静态资源
    └── ...
```

---

## 🚀 开发阶段

### Phase 1: 基础聊天（第 1-2 周）
**目标：** 能用的聊天界面

**核心功能：**
- 用户发送纯文本消息
- AI 流式返回回复
- 消息列表显示
- 基础 Markdown 渲染
- 响应式布局

**交付物：**
- 4 个组件
- 1 个 API 路由
- 1 个聊天页面
- ~500-800 行代码

**文档：**
- [Phase 1 详细设计](./phase1/)

---

### Phase 2: 聊天历史（第 3 周）
**目标：** 保存和查看历史会话

**核心功能：**
- 数据库设计（2 个表）
- 保存聊天会话
- 侧边栏显示历史
- 切换/删除会话
- 新建会话

**新增代码：** +300 行

**文档：**
- [Phase 2 详细设计](./phase2/)

---

### Phase 3: 用户认证（第 4 周）
**目标：** 多用户支持

**核心功能：**
- 邮箱+密码登录/注册
- 会话管理
- 数据隔离
- 退出登录

**新增代码：** +200 行

**文档：**
- [Phase 3 详细设计](./phase3/)

---

### Phase 4: 锦上添花（可选）
**目标：** 体验优化

**可选功能：**
1. 代码高亮（Prism.js）
2. 停止生成按钮
3. 复制消息
4. 重新生成
5. 深色模式
6. 消息时间戳

**新增代码：** 每个功能 +50-100 行

---

## 📖 文档导航

### 设计文档
- [功能对比详解](./01-feature-comparison.md) - 原版 vs 简化版详细对比
- [架构设计](./02-architecture.md) - 系统架构和数据流
- [实现计划](./03-implementation-plan.md) - 4 周开发计划
- [技术栈详解](./04-tech-stack.md) - 技术选型说明

### 阶段文档（待实现后创建）
- Phase 1: 基础聊天
  - 组件设计
  - API 设计
  - 实现说明
- Phase 2: 聊天历史
  - 数据库设计
  - 状态管理
  - 实现说明
- Phase 3: 用户认证
  - 认证流程
  - 权限管理
  - 实现说明

---

## 🎓 学习路径

### 推荐学习顺序

#### 方式 A: 快速搭建（适合快速上手）
1. 直接获取 Phase 1 完整代码
2. 本地运行，理解基本流程
3. 查看文档，理解每个部分
4. 修改和扩展功能

#### 方式 C: 分步教学（适合深入学习）
1. 从零开始，逐步实现每个功能
2. 理解每行代码的作用
3. 学习最佳实践
4. 培养独立开发能力

#### 推荐：A + C 组合
1. **Week 1**: 使用方式 A，快速搭建 Phase 1
2. **Week 1-2**: 切换到方式 C，深入理解代码
3. **Week 3-4**: 使用方式 C，自己实现 Phase 2-3
4. **持续**: 优化和扩展功能

---

## 📈 成功指标

### Phase 1 完成标准
- [ ] 能发送消息并收到 AI 回复
- [ ] 回复是流式显示的（打字机效果）
- [ ] Markdown 正确渲染（代码块、列表等）
- [ ] 移动端和桌面端都能正常使用
- [ ] 代码清晰，有注释

### Phase 2 完成标准
- [ ] 聊天会话保存到数据库
- [ ] 侧边栏显示所有历史会话
- [ ] 能切换不同会话
- [ ] 能删除会话
- [ ] 能创建新会话

### Phase 3 完成标准
- [ ] 用户能注册和登录
- [ ] 不同用户的数据隔离
- [ ] 登录状态持久化
- [ ] 能退出登录

### 最终目标
- [ ] 一个可用的 AI 聊天应用
- [ ] 理解整个项目的架构
- [ ] 能独立添加新功能
- [ ] 能部署到生产环境

---

## 🔗 相关资源

### 官方文档
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel AI SDK 文档](https://sdk.vercel.ai/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 文档](https://ui.shadcn.com/)

### 参考项目
- [ai-chatbot (原版)](https://github.com/vercel/ai-chatbot)
- [Vercel AI SDK Examples](https://github.com/vercel/ai/tree/main/examples)

### 学习资料
- Tailwind CSS 练习文件：`/Users/qiaocc/learn/learn-frontend/tailwind-code-snippet/practices/`
- ai-chatbot 学习笔记：`/Users/qiaocc/opensource/learning-notes/`

---

## 💬 问题和反馈

如果在开发过程中遇到问题：
1. 查看相关阶段的文档
2. 检查代码注释
3. 查看官方文档
4. 提问并获得帮助

---

**最后更新：** 2025-11-13
**当前版本：** v0.1.0 (规划阶段)
