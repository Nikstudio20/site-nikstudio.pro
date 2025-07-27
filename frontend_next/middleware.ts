import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Простая проверка доступа к админ-панели
// В реальном проекте здесь должна быть полноценная аутентификация
export function middleware(request: NextRequest) {
  // Проверяем, если это запрос к админ-панели
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Исключаем страницу входа из проверки
    if (request.nextUrl.pathname === '/admin/login') {
      // Если уже авторизован, перенаправляем в админку
      const adminToken = request.cookies.get('admin-token')?.value
      if (adminToken === 'authenticated') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.next()
    }

    // Проверяем наличие простого токена в cookies
    const adminToken = request.cookies.get('admin-token')?.value
    
    // Если нет токена, перенаправляем на страницу входа
    if (!adminToken || adminToken !== 'authenticated') {
      console.log(`Попытка доступа к админ-панели без авторизации: ${request.nextUrl.pathname}`)
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

// Настройка matcher для применения middleware только к нужным путям
export const config = {
  matcher: [
    '/admin/:path*',
    // Исключаем статические файлы
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}