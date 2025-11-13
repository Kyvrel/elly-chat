# Better Auth 认证设置指南

这是一个基于 Better Auth 的最小化认证 MVP 实现。

## 功能特性

- ✅ 邮箱密码注册/登录
- ✅ Google OAuth 登录
- ✅ 会话管理
- ✅ 路由保护(使用 Next.js 16 的 proxy.ts)
- ✅ 自动重定向

## 环境变量配置

在项目根目录创建 `.env` 文件:

```env
# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Google OAuth (可选)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 数据库设置

### 手动运行 SQL

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

### 数据库表说明

**Better Auth 认证表:**

- `user` - 用户基本信息
- `session` - 登录会话管理
- `account` - 账号凭证(密码/OAuth)
- `verification` - 邮箱验证、密码重置

**业务功能表:**

- `chat` - 聊天会话 (关联 user.id)
- `message` - 聊天消息

## Google OAuth 设置

1. 前往 [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
2. 创建新项目或选择现有项目
3. 启用 "Google+ API"
4. 创建 OAuth 2.0 客户端 ID
5. 添加授权重定向 URI:
   - 本地开发: `http://localhost:3000/api/auth/callback/google`
   - 生产环境: `https://yourdomain.com/api/auth/callback/google`

## 使用方法

### 启动开发服务器

```bash
pnpm dev
```

### 访问页面

- 登录页面: `http://localhost:3000/login`
- 主页: `http://localhost:3000/`

## 文件结构

```
├── app/
│   ├── api/auth/[...all]/route.ts  # Auth API 路由
│   ├── login/page.tsx               # 登录页面
│   └── (chat)/page.tsx              # 受保护的主页
├── lib/
│   ├── auth.ts                      # Better Auth 配置
│   ├── auth-client.ts               # 客户端实例
│   └── db.ts                        # Drizzle 数据库实例
├── auth-schema.ts                   # 数据库 Schema
└── proxy.ts                         # Next.js 16 路由保护
```

## 主要特点

### 1. 登录页面 ([app/login/page.tsx](app/login/page.tsx))

- 支持注册/登录切换
- 邮箱密码认证
- Google OAuth 一键登录
- 错误处理和加载状态

### 2. 路由保护 ([proxy.ts](proxy.ts))

- 未登录用户自动重定向到 `/login`
- 使用 Next.js 16 的 `proxy.ts` (替代旧的 `middleware.ts`)

### 3. 会话管理

- 自动会话刷新
- 安全的 HTTP-only cookies
- 支持 "记住我" 功能

## 后续优化建议

- [ ] 添加忘记密码功能
- [ ] 邮箱验证
- [ ] 更多 OAuth 提供商 (GitHub, Apple 等)
- [ ] 用户头像上传
- [ ] 账号设置页面
- [ ] 登出功能优化

## 相关文档

- [Better Auth 官方文档](https://better-auth.com)
- [Next.js 16 文档](https://nextjs.org/docs)
- [Drizzle ORM 文档](https://orm.drizzle.team)
