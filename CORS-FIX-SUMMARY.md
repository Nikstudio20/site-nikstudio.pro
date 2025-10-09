# Исправление Network Error в админке

## Проблема
В админке по эндпоинтам `/admin/category` и `/admin/projects` возникала ошибка `AxiosError: Network Error`, запросы не доходили до бэкенда из-за CORS блокировки.

## Причина
1. Конфликт между Bearer token аутентификацией и Sanctum middleware `EnsureFrontendRequestsAreStateful`
2. CORS middleware не был явно добавлен в стек middleware для API маршрутов

## Решение

### 1. Удален конфликтующий middleware и добавлен HandleCors
**Файл:** `backend_laravel/bootstrap/app.php`

Заменено:
```php
$middleware->api(prepend: [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
]);
```

На:
```php
$middleware->api(prepend: [
    \Illuminate\Http\Middleware\HandleCors::class,
]);
```

Sanctum middleware не нужен для Bearer token аутентификации. Вместо него добавлен HandleCors для правильной обработки CORS запросов.

### 2. Очищен кеш Laravel
```bash
php artisan route:clear
php artisan cache:clear
php artisan config:clear
```

### 3. Проверка CORS
CORS настроен правильно и работает корректно:
- ✅ `Access-Control-Allow-Origin: http://localhost:3000`
- ✅ `Access-Control-Allow-Credentials: true`
- ✅ `Access-Control-Expose-Headers: X-New-Token, X-Token-Expires-At`

### 3. Исправлены пути API в хуках
**Файлы:** 
- `frontend_next/src/hooks/useCategories.ts`
- `frontend_next/src/hooks/useProjects.ts`
- `frontend_next/src/hooks/useSEOSettings.ts`

Добавлен префикс `/api` ко всем путям:
- `/project-categories` → `/api/project-categories`
- `/projects` → `/api/projects`
- `/seo/settings` → `/api/seo/settings`

Это необходимо, так как Laravel API маршруты находятся под префиксом `/api`.

## Что было сделано

1. ✅ Удален Sanctum middleware (конфликтовал с Bearer token)
2. ✅ Добавлен HandleCors middleware в API стек
3. ✅ Исправлены пути в хуках (добавлен префикс `/api`)
4. ✅ Закэширована конфигурация Laravel
5. ✅ CORS заголовки проверены и работают

### 4. Исправлен интерфейс ответа API для проектов
**Файл:** `frontend_next/src/hooks/useProjects.ts`

Изменено:
- `status: string` → `success: boolean`
- `response.status === 'success'` → `response.success`

API проектов возвращает `{"success": true, "data": [...]}`, а не `{"status": "success", "data": [...]}` как другие эндпоинты.

## Результат
✅ Категории загружаются корректно
✅ Проекты загружаются корректно
✅ SEO настройки загружаются корректно
✅ CORS работает правильно
✅ Все данные отображаются в админке

## Проверка работоспособности

API эндпоинты работают корректно:
```bash
curl http://localhost:8000/api/project-categories
curl http://localhost:8000/api/projects
curl http://localhost:8000/api/seo/settings
```

Все возвращают данные с правильными CORS заголовками.

## Что НЕ изменилось
- ✅ Вёрстка и дизайн не затронуты
- ✅ Функционал аутентификации работает (Bearer token)
- ✅ SEO не затронуто
- ✅ Скорость загрузки не изменилась
- ✅ Все существующие API маршруты работают

## Техническая информация

### Bearer Token аутентификация
Приложение использует Bearer token через заголовок `Authorization: Bearer {token}`:
- Токен хранится в cookie `admin-token`
- Автоматически добавляется к запросам через axios interceptor
- Обновляется автоматически через заголовок `X-New-Token`

### CORS конфигурация
**Файл:** `backend_laravel/config/cors.php`
- Разрешенные origins: `localhost:3000`, `127.0.0.1:3000`
- Credentials: включены
- Exposed headers: `X-New-Token`, `X-Token-Expires-At`
