import * as React from 'react'
import { PlusIcon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import Link from 'next/link'
import { Button } from './ui/button'
import SidebarHistory from './sidebar-history'
import SidebarUserNav from './sidebar-user-nav'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center justify-between">
            <Link href="/" className="px-2">
              <span className="text-xl">🐘</span>
              <span className="hover:bg-muted rounded-md px-1 text-lg font-semibold">
                Elly Chat
              </span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end" className="hidden md:block">
                New chat
              </TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserNav />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
