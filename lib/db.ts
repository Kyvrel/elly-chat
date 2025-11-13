import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/auth-schema'

const rawConnectionString = process.env.POSTGRES_URL

if (!rawConnectionString) {
  throw new Error(
    '缺少数据库连接字符串，请在 .env 中设置 POSTGRES_PRISMA_URL 或 POSTGRES_URL'
  )
}

// Supabase 颁发的证书链在本地常导致 self-signed 报错，这里强制使用 no-verify
const connectionString = rawConnectionString.replace(
  /sslmode=[^&]+/i,
  'sslmode=no-verify'
)

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

export const db = drizzle(pool, { schema })
