export function LoadingIndicator() {
  return (
    <div className="flex p-4 gap-2 justify-start">
      <div className="size-8 flex justify-center items-center rounded-full font-semibold bg-primary text-primary-foreground text-sm">
        AI
      </div>
      <div className="rounded-lg px-4 py-2 text-base bg-muted text-foreground">
        <span className="animate-pulse">AI is thinking...</span>
        <div className="inline-flex gap-1">
          <span className="animate-bounce">●</span>
          <span className="animate-bounce [animation-delay:0.2s]">●</span>
          <span className="animate-bounce [animation-delay:0.4s]">●</span>
        </div>
      </div>
    </div>
  )
}
