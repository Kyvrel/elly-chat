# 🚀 快速开始

## 1️⃣ 配置环境变量

创建 `.env` 文件:

```bash
# 必需: 数据库连接
DATABASE_URL=postgresql://user:password@localhost:5432/elly_chat

# 可选: Google OAuth (不配置则只能用邮箱密码登录)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## 2️⃣ 初始化数据库

```bash
# 方式 1: 使用脚本
source .env && ./database/setup.sh

# 方式 2: 手动执行
psql "$DATABASE_URL" -f database/schema.sql
```

## 3️⃣ 启动开发服务器

```bash
pnpm dev
```

访问: http://localhost:3000/login

## 4️⃣ 测试认证功能

### 邮箱密码注册

1. 打开 http://localhost:3000/login
2. 点击"没有账号?注册"
3. 填写姓名、邮箱、密码(至少8位)
4. 点击"注册"
5. 自动登录并跳转到主页

### Google 登录 (需要配置 OAuth)

1. 配置 Google OAuth 凭证 (见下方说明)
2. 打开 http://localhost:3000/login
3. 点击"使用 Google 登录"
4. 完成 Google 授权
5. 自动登录并跳转到主页

## 📊 数据库表结构

```
Better Auth 认证:
├── user           用户信息 (id, name, email, image)
├── session        登录会话
├── account        密码/OAuth凭证
└── verification   邮箱验证

业务功能:
├── chat           聊天会话 (关联 user.id)
└── message        聊天消息
```

## 🔧 Google OAuth 配置 (可选)

### 获取 Google 凭证

1. 访问 [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
2. 创建新项目或选择现有项目
3. 启用 "Google+ API"
4. 创建 OAuth 2.0 客户端 ID:
   - 应用类型: Web 应用
   - 授权重定向 URI:
     - 本地: `http://localhost:3000/api/auth/callback/google`
     - 生产: `https://yourdomain.com/api/auth/callback/google`
5. 复制 Client ID 和 Client Secret 到 `.env`

## 📁 关键文件说明

```
elly-chat/
├── app/
│   ├── api/auth/[...all]/route.ts   # Auth API 端点
│   ├── login/page.tsx                # 登录页面
│   └── (chat)/page.tsx               # 主页(受保护)
├── lib/
│   ├── auth.ts                       # Better Auth 配置
│   ├── auth-client.ts                # 客户端实例
│   └── db.ts                         # Drizzle 数据库
├── database/
│   ├── schema.sql                    # 数据库 Schema
│   └── setup.sh                      # 初始化脚本
├── auth-schema.ts                    # Drizzle Schema 定义
└── proxy.ts                          # Next.js 16 路由保护
```

## ✅ 验证安装

运行以下命令检查数据库连接:

```bash
psql "$DATABASE_URL" -c "\dt"
```

应该看到 6 张表:

- user
- session
- account
- verification
- chat
- message

## 🐛 常见问题

### 数据库连接失败

- 检查 PostgreSQL 是否运行: `pg_isready`
- 验证 DATABASE_URL 格式正确
- 确保数据库已创建: `createdb elly_chat`

### Google 登录失败

- 确保 GOOGLE_CLIENT_ID 和 GOOGLE_CLIENT_SECRET 正确
- 检查重定向 URI 配置是否匹配
- 如果不需要 Google 登录,可以不配置这两个环境变量

### 路由重定向循环

- 清除浏览器 cookies
- 检查 proxy.ts 配置
- 确保数据库表已正确创建

## 📚 更多文档

详细配置和功能说明请参考 [AUTH_SETUP.md](AUTH_SETUP.md)
