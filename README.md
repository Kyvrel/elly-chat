# Simple Chatbot

A minimalist AI chatbot built with Next.js 16, Vercel AI SDK, and modern web technologies.

## Features

- 💬 Real-time AI chat with streaming responses
- 🎨 Claude-inspired design system
- 📱 Responsive sidebar with chat history
- ✨ Markdown and syntax highlighting support
- 🗄️ PostgreSQL database with Drizzle ORM
- ⚡ Built with Next.js 16 and React 19

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: Vercel AI SDK (@ai-sdk/react)
- **Database**: PostgreSQL + Drizzle ORM
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Language**: TypeScript

## Getting Started

1. **Install dependencies**
```bash
pnpm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_key
```

3. **Set up database**
```bash
pnpm db:push
```

4. **Run development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm type-check` - TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio

## Project Structure

```
simple-chatbot/
├── app/                  # Next.js app router
├── components/           # React components
│   ├── chat/            # Chat-related components
│   ├── sidebar/         # Sidebar component
│   └── ui/              # shadcn/ui components
├── lib/                 # Utilities and configurations
│   └── db/              # Database schema and client
└── docs/                # Documentation
```

## License

MIT
