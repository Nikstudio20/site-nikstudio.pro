# Отладка авторизации SEO

## Шаг 1: Проверка токена

Откройте консоль браузера (F12) и выполните:

```javascript
// Проверка наличия токена
const token = document.cookie.split(';').find(c => c.trim().startsWith('admin-token='));
console.log('Token exists:', !!token);
console.log('Token:', token);

// Проверка всех cookies
console.log('All cookies:', document.cookie);
```

**Ожидаемый результат:**
- `Token exists: true`
- `Token: admin-token=eyJ0eXAiOiJKV1QiLCJhbGc...`

**Если токена нет:**
1. Перейдите на `/admin/login`
2. Войдите в систему
3. Проверьте токен снова

## Шаг 2: Тестовая страница

Откройте тестовую страницу: `http://localhost:3000/admin/test-seo-auth`

1. Нажмите **"Проверить токен"** - должен показать наличие токена
2. Нажмите **"Тест GET /api/seo/overview"** - должен вернуть данные SEO
3. Нажмите **"Тест POST /api/seo/settings"** - должен сохранить настройки

**Ожидаемые результаты:**
- GET запрос возвращает `{ success: true, data: {...} }`
- POST запрос возвращает `{ success: true, message: "..." }`

**Если ошибка "Unauthenticated":**
- Проверьте логи в консоли с префиксом `[API Client]`
- Убедитесь, что токен передаётся в заголовке `Authorization`

## Шаг 3: Проверка логов API Client

В консоли браузера должны появиться логи:

```
[API Client] Request interceptor: {
  url: "/api/seo/settings",
  method: "post",
  hasToken: true,
  tokenPreview: "eyJ0eXAiOiJKV1QiLCJh...",
  isFormData: true
}
[API Client] Authorization header added
[API Client] Content-Type removed for FormData
```

**Если `hasToken: false`:**
- Токен не найден в cookies
- Войдите в систему заново

**Если `Authorization header added` не появляется:**
- Проблема в interceptor
- Проверьте файл `frontend_next/src/lib/api.ts`

## Шаг 4: Проверка на странице SEO

1. Откройте `/admin/seo`
2. Откройте консоль браузера (F12)
3. Перейдите на вкладку "Глобальные"
4. Заполните поля и нажмите "Сохранить настройки"

**Ожидаемые логи:**

```
[GlobalSEOSettings] Token exists: true
[GlobalSEOSettings] Отправка запроса на /api/seo/settings
[API Client] Request interceptor: {...}
[API Client] Authorization header added
[API Client] Content-Type removed for FormData
[GlobalSEOSettings] Ответ получен: { success: true, ... }
```

**Если логи не появляются:**
- Компонент не загружен
- Проверьте, что файл `GlobalSEOSettings.tsx` сохранён
- Перезагрузите страницу (Ctrl+F5)

## Шаг 5: Проверка сетевых запросов

1. Откройте вкладку Network (Сеть) в DevTools
2. Попробуйте сохранить SEO настройки
3. Найдите запрос к `/api/seo/settings`
4. Проверьте заголовки запроса

**Ожидаемые заголовки:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
```

**Если заголовка Authorization нет:**
- Interceptor не работает
- Проверьте, что используется функция `post()` из `@/lib/api`
- Проверьте импорт: `import { post } from '@/lib/api';`

## Шаг 6: Проверка ответа сервера

Если запрос отправляется с токеном, но всё равно ошибка "Unauthenticated":

1. Проверьте статус ответа (должен быть 401)
2. Проверьте тело ответа
3. Проверьте, что Laravel сервер запущен на `http://localhost:8000`

**Проверка Laravel:**
```bash
# В терминале
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/seo/overview
```

**Если Laravel возвращает 401:**
- Токен недействителен или истёк
- Войдите в систему заново
- Проверьте настройки JWT в Laravel

## Шаг 7: Проверка других страниц админки

Если другие страницы работают, а SEO нет:

1. Откройте `/admin/blog` - попробуйте создать пост
2. Откройте `/admin/category` - попробуйте создать категорию
3. Откройте `/admin/projects` - попробуйте создать проект

**Если другие страницы работают:**
- Проблема специфична для SEO компонентов
- Сравните код SEO компонентов с рабочими компонентами

**Если другие страницы тоже не работают:**
- Проблема в авторизации в целом
- Войдите в систему заново
- Проверьте, что токен сохраняется после логина

## Частые проблемы и решения

### Проблема: "Token exists: false"
**Решение:** Войдите в систему через `/admin/login`

### Проблема: "Authorization header added" не появляется
**Решение:** Проверьте, что используется `post()` из `@/lib/api`, а не `fetch()`

### Проблема: Токен есть, но всё равно 401
**Решение:** 
- Токен истёк - войдите заново
- Проверьте формат токена (должен быть JWT)
- Проверьте Laravel middleware

### Проблема: Логи не появляются
**Решение:**
- Очистите кэш браузера (Ctrl+Shift+Delete)
- Перезагрузите страницу (Ctrl+F5)
- Проверьте, что файлы сохранены

### Проблема: CORS ошибка
**Решение:**
- Проверьте, что Laravel сервер запущен
- Проверьте настройки CORS в Laravel
- Проверьте `NEXT_PUBLIC_API_URL` в `.env`

## Контрольный список

- [ ] Токен существует в cookies
- [ ] Логи `[API Client]` появляются в консоли
- [ ] Логи `[GlobalSEOSettings]` появляются в консоли
- [ ] Заголовок `Authorization` присутствует в запросе
- [ ] Laravel сервер запущен и доступен
- [ ] Другие страницы админки работают
- [ ] Тестовая страница `/admin/test-seo-auth` работает

Если все пункты выполнены, но проблема остаётся - предоставьте:
1. Скриншот консоли с логами
2. Скриншот Network tab с заголовками запроса
3. Ответ сервера из Network tab
