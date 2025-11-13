#!/bin/bash

# Better Auth 数据库初始化脚本

echo "🚀 开始初始化数据库..."

# 自动加载根目录下的 .env（若存在）并导出变量
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"
if [ -f "$ENV_FILE" ]; then
  echo "📄 检测到 .env，正在加载..."
  set -a
  . "$ENV_FILE"
  set +a
fi

# 检查环境变量
if [ -z "$POSTGRES_URL_NON_POOLING" ]; then
  echo "❌ 错误: POSTGRES_URL_NON_POOLING 环境变量未设置"
  echo "请在 .env 文件中设置 POSTGRES_URL_NON_POOLING"
  exit 1
fi

# 从 POSTGRES_URL_NON_POOLING 解析数据库连接信息
# 格式: postgresql://user:password@host:port/database
DB_URL=$POSTGRES_URL_NON_POOLING

echo "📦 应用数据库 schema..."
psql "$DB_URL" -f "$(dirname "$0")/schema.sql"

if [ $? -eq 0 ]; then
  echo "✅ 数据库初始化成功!"
  echo ""
  echo "📋 创建的表:"
  echo "  - user (Better Auth 用户表)"
  echo "  - session (Better Auth 会话表)"
  echo "  - account (Better Auth 账户表)"
  echo "  - verification (Better Auth 验证表)"
  echo "  - chat (聊天表)"
  echo "  - message (消息表)"
  echo ""
  echo "🎉 现在可以启动开发服务器了: pnpm dev"
else
  echo "❌ 数据库初始化失败"
  exit 1
fi
