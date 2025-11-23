import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export async function POST(request: Request) {
  const { messages } = await request.json()
  const gemini = createGoogleGenerativeAI()
  const result = await streamText({
    model: gemini('gemini-2.5-flash'),
    messages: messages,
  })
  return result.toTextStreamResponse()
}
