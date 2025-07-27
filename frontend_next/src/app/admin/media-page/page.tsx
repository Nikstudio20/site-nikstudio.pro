'use client';

import { MediaPageAdmin } from '@/components/admin/MediaPageAdmin';

// Принудительно делаем страницу динамической для продакшн сборки
export const dynamic = 'force-dynamic'

export default function MediaPageAdminPage() {
  return <MediaPageAdmin />;
}