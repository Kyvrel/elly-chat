import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  navMain: [
    {
      title: 'yesterday',
      url: '#',
      items: [
        {
          title: 'Chat1 Chat1 Chat1 Chat1 Chat1 ',
          url: '#',
        },
        {
          title: 'Chat2',
          url: '#',
        },
      ],
    },
    {
      title: 'last 7 days',
      url: '#',
      items: [
        {
          title: 'Chat3',
          url: '#',
        },
        {
          title: 'Chat4',
          url: '#',
        },
      ],
    },
  ],
}

export default function SidebarHistory() {
  return (
    <>
      {data.navMain.map(item => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={true}>
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
