import { FileText, Home, Inbox, BriefcaseBusiness, LayoutGrid } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Главная",
    url: "/admin",
    icon: Home,
  },  
  {
    title: "Блог",
    url: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Категории",
    url: "/admin/category",
    icon: LayoutGrid,
  },
  {
    title: "Проекты",
    url: "/admin/projects",
    icon: BriefcaseBusiness,
  },  
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/" target="_blank" className="block p-4">
            <Image 
              src="/images/footer/logo_footer.svg" 
              alt="Логотип" 
              width={120} 
              height={40}
              priority
            />
          </Link>
          <SidebarGroupLabel>Приложение</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}