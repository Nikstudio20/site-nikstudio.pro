# Схема работы централизованного API клиента

## Архитектура

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Component                              │
│  (использует get, post, put, del, patch из @/lib/api)          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API Client (api.ts)                            │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Request Interceptor                                     │   │
│  │  1. Извлекает токен из cookie 'admin-token'            │   │
│  │  2. Добавляет Authorization: Bearer {token}             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Axios Instance                                          │   │
│  │  - baseURL: NEXT_PUBLIC_API_URL                         │   │
│  │  - withCredentials: true                                │   │
│  │  - timeout: 30s                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Response Interceptor                                    │   │
│  │  1. Проверяет X-New-Token header                        │   │
│  │  2. Сохраняет новый токен в cookie                      │   │
│  │  3. Обрабатывает 401 → редирект на /admin/login        │   │
│  │  4. Обрабатывает 403 → показывает alert                │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Laravel Backend API                            │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  RefreshTokenMiddleware                                  │   │
│  │  - Проверяет время истечения токена                     │   │
│  │  - Создаёт новый токен за 30 мин до истечения          │   │
│  │  - Возвращает в X-New-Token header                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  API Controllers                                         │   │
│  │  - AuthController (login, logout, changePassword)       │   │
│  │  - ProjectController, BlogController, etc.              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Поток данных при запросе

### 1. Обычный запрос (токен валиден)

```
Component
   │
   │ get('/api/admin/projects')
   ▼
Request Interceptor
   │
   │ + Authorization: Bearer {token}
   ▼
Laravel API
   │
   │ Проверка токена ✓
   │ Обработка запроса
   ▼
Response Interceptor
   │
   │ Проверка X-New-Token (нет)
   │ Возврат данных
   ▼
Component
   │
   │ Получает данные
   ✓
```

### 2. Запрос с обновлением токена

```
Component
   │
   │ post('/api/admin/projects', data)
   ▼
Request Interceptor
   │
   │ + Authorization: Bearer {old-token}
   ▼
Laravel API
   │
   │ RefreshTokenMiddleware
   │ Токен истекает через 25 минут
   │ Создаёт новый токен
   │ + X-New-Token: {new-token}
   ▼
Response Interceptor
   │
   │ Обнаружен X-New-Token
   │ Сохраняет в cookie 'admin-token'
   │ 🔄 Логирует: "Получен новый токен"
   ▼
Component
   │
   │ Получает данные
   │ Следующие запросы используют новый токен
   ✓
```

### 3. Запрос с ошибкой 401 (неавторизован)

```
Component
   │
   │ get('/api/admin/projects')
   ▼
Request Interceptor
   │
   │ + Authorization: Bearer {invalid-token}
   ▼
Laravel API
   │
   │ Токен невалиден
   │ ← 401 Unauthorized
   ▼
Response Interceptor
   │
   │ Обнаружена 401 ошибка
   │ 🚫 Логирует: "Ошибка 401: Неавторизован"
   │ Удаляет токен из cookie
   │ window.location.href = '/admin/login'
   ▼
Login Page
   │
   │ Пользователь видит форму входа
   ✓
```

### 4. Запрос с ошибкой 403 (доступ запрещён)

```
Component
   │
   │ delete('/api/admin/projects/1')
   ▼
Request Interceptor
   │
   │ + Authorization: Bearer {token}
   ▼
Laravel API
   │
   │ Токен валиден, но нет прав
   │ ← 403 Forbidden
   ▼
Response Interceptor
   │
   │ Обнаружена 403 ошибка
   │ 🚫 Логирует: "Ошибка 403: Доступ запрещён"
   │ alert("Доступ запрещён...")
   ▼
Component
   │
   │ Обрабатывает ошибку в catch блоке
   │ Показывает сообщение пользователю
   ✓
```

## Жизненный цикл токена

```
Login
  │
  │ POST /api/login
  │ { username, password, remember }
  ▼
Backend создаёт токен
  │
  │ remember = false → TTL 8 часов
  │ remember = true  → TTL 30 дней
  ▼
Frontend сохраняет в cookie
  │
  │ document.cookie = 'admin-token={token}'
  ▼
Работа в админке
  │
  │ Каждый запрос использует токен
  │ Backend проверяет время истечения
  │
  ├─ Токен истекает через > 30 мин
  │  └─ Обычный ответ
  │
  └─ Токен истекает через < 30 мин
     │
     │ Backend создаёт новый токен
     │ + X-New-Token header
     ▼
  Frontend обновляет cookie
     │
     │ Автоматически, без прерывания работы
     ▼
  Продолжение работы
     │
     │ Следующие запросы используют новый токен
     ▼
  Цикл повторяется
```

## Обработка ошибок

```
┌─────────────────────────────────────────────────────────────┐
│                    Типы ошибок                               │
└─────────────────────────────────────────────────────────────┘

401 Unauthorized
├─ Причина: Токен невалиден/истёк
├─ Действие: Удалить токен + редирект на /admin/login
└─ Логирование: 🚫 Ошибка 401: Неавторизован

403 Forbidden
├─ Причина: Нет прав на действие
├─ Действие: Показать alert с сообщением
└─ Логирование: 🚫 Ошибка 403: Доступ запрещён

413 Payload Too Large
├─ Причина: Файл превышает размер
├─ Действие: Обработка в компоненте
└─ Сообщение: "Файл слишком большой (макс. 2MB/50MB)"

422 Unprocessable Entity
├─ Причина: Ошибки валидации
├─ Действие: Обработка в компоненте
└─ Показ field-specific ошибок

500 Internal Server Error
├─ Причина: Ошибка на сервере
├─ Действие: Обработка в компоненте
└─ Сообщение: "Произошла ошибка на сервере"

Network Error
├─ Причина: Нет соединения
├─ Действие: Обработка в компоненте
└─ Сообщение: "Проверьте подключение к интернету"
```

## Использование в компонентах

### Базовый паттерн

```typescript
'use client';

import { useState } from 'react';
import { get, post } from '@/lib/api';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await get('/api/admin/endpoint');
      setData(result);
      
    } catch (err: any) {
      // 401/403 обрабатываются автоматически
      // Здесь обрабатываем только специфичные ошибки
      
      if (err.response?.status === 422) {
        setError('Ошибка валидации');
      } else if (err.response?.status === 413) {
        setError('Файл слишком большой');
      } else {
        setError('Произошла ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div>Загрузка...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {data && <div>{/* Отображение данных */}</div>}
    </div>
  );
}
```

## Преимущества архитектуры

✅ **Централизация**: Вся логика авторизации в одном месте
✅ **Автоматизация**: Токены обновляются без участия разработчика
✅ **Безопасность**: Автоматическая обработка 401/403
✅ **Простота**: Минимум кода в компонентах
✅ **Типизация**: Полная поддержка TypeScript
✅ **Отладка**: Логирование всех важных событий
✅ **Консистентность**: Единый подход ко всем API запросам

## Интеграция с другими компонентами

```
api.ts (Task 13)
   │
   ├─ Используется в useTokenRefresh.ts (Task 14)
   │  └─ Автоматическая проверка токена каждые 5 минут
   │
   ├─ Используется во всех admin компонентах (Task 15)
   │  └─ Замена fetch/axios на централизованный клиент
   │
   └─ Работает с RefreshTokenMiddleware (Backend)
      └─ Обновление токенов на стороне сервера
```

## Конфигурация окружения

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```php
// Laravel config/cors.php
'exposed_headers' => ['X-New-Token'],
'supports_credentials' => true,
```

```php
// Laravel config/sanctum.php
'expiration' => 480, // 8 часов
'remember_expiration' => 43200, // 30 дней
```

## Мониторинг и отладка

### Console логи:

```
✅ Успешные операции:
   🔄 Получен новый токен, обновляем cookie

❌ Ошибки:
   🚫 Ошибка 401: Неавторизован, перенаправление на страницу входа
   🚫 Ошибка 403: Доступ запрещён
```

### Browser DevTools:

1. **Network tab**: Проверка заголовков Authorization и X-New-Token
2. **Application tab**: Проверка cookie 'admin-token'
3. **Console tab**: Логи работы API клиента

## Тестирование

```bash
# Unit тесты
npm run test:run -- src/lib/__tests__/api.test.ts

# E2E тесты (после интеграции)
npm run test:e2e
```

---

**Дата создания:** 06.10.2025  
**Версия:** 1.0  
**Статус:** ✅ Реализовано
