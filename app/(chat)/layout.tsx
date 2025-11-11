import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStorage = await cookies();
  const isOpen = cookieStorage.get("sidebar_state")?.value !== "false";
  return (
    <SidebarProvider defaultOpen={isOpen}>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <SidebarInset> {children}</SidebarInset>
      </main>
    </SidebarProvider>
  );
}
