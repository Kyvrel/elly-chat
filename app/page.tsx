'use client'

import { useState } from 'react'

export default function ChatPage() {
  const messages = [
    { id: 1, role: 'assistant', content: 'Hi there, what can I do for you' },
    { id: 2, role: 'user', content: 'Hello, whats the weather tody' },
    {
      id: 3,
      role: 'assistant',
      content: 'Very well, the temperature is 16C tody',
    },
    { id: 4, role: 'user', content: 'I want to do some exercise' },
    {
      id: 5,
      role: 'assistant',
      content: 'Thats great, exercise help us keep fit',
    },
  ]

  /* TODO(human): Add input state and handler

     需求：
     1. Create state for input value:
        - const [input, setInput] = useState('')

     2. Create submit handler function:
        - handleSubmit(e) - prevents default form submission
        - For now, just console.log(input) to test
        - Clear input after submit: setInput('')

     3. Create keyboard handler:
        - handleKeyDown(e) - detects Enter vs Shift+Enter
        - Enter alone = submit
        - Shift+Enter = new line (default textarea behavior)
  */
  const [input, setInput] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    // messages.push({
    //   id: messages[messages.length - 1].id + 1,
    //   role: 'user',
    //   content: 'e.target.value',
    // })
    console.log('handleSubmit: ', input)
    setInput('')
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  const handleChange = (e: any) => {
    setInput(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 ">
        <h1 className="text-lg font-semibold">Simple Chat</h1>
      </header>

      {/* Messages */}
      <div className="w-full max-w-3xl mx-auto mt-10">
        {messages.map(msg => {
          const isUser = msg.role === 'user'
          return (
            <div
              key={msg.id}
              className={`flex p-4 gap-2 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="size-8 flex justify-center items-center rounded-full font-semibold bg-purple-600 text-white text-sm">
                  AI
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 text-sm  ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 flex-1'
                }`}
              >
                {msg.content}
              </div>
            </div>
          )
        })}
      </div>

      {/* TODO(human): Add input box UI

          需求：Create a form at the bottom of the page with:

          1. Container:
             - Fixed at bottom (or just below messages)
             - White background, top border
             - Padding, max-width same as messages (max-w-3xl)
             - Centered

          2. Form layout (flex):
             - Textarea on the left (takes most space)
             - Send button on the right

          3. Textarea:
             - Multiple lines (rows=1 or auto-resize)
             - Placeholder: "Type a message..."
             - Rounded corners, border, padding
             - Connect to input state: value={input} onChange={e => setInput(e.target.value)}
             - Connect keyboard handler: onKeyDown={handleKeyDown}

          4. Send button:
             - Icon or text "Send"
             - Disabled when input is empty
             - onClick={handleSubmit}
      */}
      <div className="fixed bottom-0  left-0 right-0  border-t bg-white p-4 ">
        <form className="mx-auto flex max-w-3xl gap-2" onSubmit={handleSubmit}>
          <textarea
            name="input"
            autoFocus
            rows={1}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
            placeholder="Type a message..."
          ></textarea>
          <button
            disabled={!input.trim()}
            className="disabled:bg-gray-200 disabled:text-white px-2 py-1 text-sm rounded-lg bg-black text-white "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
