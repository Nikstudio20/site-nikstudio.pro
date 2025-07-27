"use client"

import { Video } from "lucide-react";

// Принудительно делаем админку динамической для продакшн сборки
export const dynamic = 'force-dynamic'
import { AdminHeroVideoManager } from "@/components/admin/AdminHeroVideoManager";
import { ServiceVideoManager } from "@/components/admin/ServiceVideoManager";
import { SEOStatusWidget } from "@/components/admin/SEOStatusWidget";
import { SEOQuickActions } from "@/components/admin/SEOQuickActions";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Панель администратора</h1>
        <p className="mt-2 text-gray-600">Добро пожаловать в систему управления контентом</p>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <SEOStatusWidget />
        </div>
        <div className="lg:col-span-2">
          <SEOQuickActions />
        </div>
      </div>

      {/* Video Management Sections */}
      <div className="space-y-8">
        {/* Hero Video Management */}
        <div className="border-t pt-8">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-2xl font-semibold">Управление главным видео</h2>
              <p className="text-gray-600">Настройка видео для главной страницы сайта</p>
            </div>
          </div>
          
          <AdminHeroVideoManager />
        </div>

        {/* Service Video Management */}
        <div className="border-t pt-8">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-semibold">Управление видео услуг</h2>
              <p className="text-gray-600">Настройка видео для секции услуг</p>
            </div>
          </div>
          
          <ServiceVideoManager />
        </div>
      </div>
    </div>
  )
} 