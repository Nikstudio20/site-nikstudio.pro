'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import ErrorBoundary from "@/components/ErrorBoundary"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

// Принудительно делаем админку динамической для продакшн сборки
export const dynamic = 'force-dynamic'

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      window.location.href = '/admin/login';
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger className="hover:cursor-pointer" />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </Button>
        </div>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
    </SidebarProvider>
  )
}