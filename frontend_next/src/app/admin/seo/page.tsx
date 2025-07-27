'use client';

import SEOManager from '@/components/admin/SEOManager';

// Принудительно делаем страницу динамической для продакшн сборки
export const dynamic = 'force-dynamic'

export default function AdminSEOPage() {
  return <SEOManager />;
}