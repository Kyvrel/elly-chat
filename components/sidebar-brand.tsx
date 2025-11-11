"use client";
import { Plus, Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function SidebarBrand({ ...props }: React.ComponentProps<"form">) {
  const [open, setOpen] = useState(false);

  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Elly Chat</h2>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Plus className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-24 p-2 text-base">New chat</PopoverContent>
          </Popover>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
