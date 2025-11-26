type ChatInputProps = {
  input: string
  status: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}
export function ChatInput({
  input,
  status,
  handleChange,
  handleKeyDown,
  handleSubmit,
}: ChatInputProps) {
  return (
    <div className="fixed bottom-0 left-72 right-0 border-t bg-white p-4">
      <form className="mx-auto flex max-w-4xl gap-2" onSubmit={handleSubmit}>
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
          disabled={!input.trim() || status !== 'ready'}
          className="disabled:bg-gray-200 disabled:text-white px-2 py-1 text-base rounded-lg bg-black text-white "
        >
          Send
        </button>
      </form>
    </div>
  )
}
