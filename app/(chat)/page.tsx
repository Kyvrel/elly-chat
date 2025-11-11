import Image from "next/image";

export default function Chat() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">欢迎使用 Elly Chat</h1>
        <p className="text-muted-foreground">从左侧侧边栏选择或创建新对话</p>
      </div>
    </div>
  );
}
