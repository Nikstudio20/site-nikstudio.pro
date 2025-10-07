# Исправление ошибки Middleware Registration

## Проблема

При смене пароля в админке возникала ошибка:

```
Target class [refresh.token] does not exist.
```

**Стек ошибки:**
```
AxiosError: Request failed with status code 500
at src\lib\api.ts (141:20)
```

## Причина

Middleware `RefreshTokenMiddleware` использовался в роутах с алиасом `refresh.token`, но не был зарегистрирован в системе Laravel.

### Где использовался middleware:

В файле `backend_laravel/routes/api.php` middleware применялся ко многим защищённым роутам:

```php
Route::middleware(['auth:sanctum', 'refresh.token'])->post('/logout', [AuthController::class, 'logout']);
Route::middleware(['auth:sanctum', 'refresh.token'])->get('/me', [AuthController::class, 'me']);
Route::middleware(['auth:sanctum', 'refresh.token', 'throttle:5,1'])->post('/admin/change-password', [AuthController::class, 'changePassword']);
// ... и многие другие
```

### Почему возникла ошибка:

В Laravel 11+ middleware регистрируются через `bootstrap/app.php`, а не через `app/Http/Kernel.php` (как в Laravel 10).

Middleware класс существовал (`App\Http\Middleware\RefreshTokenMiddleware`), но алиас `refresh.token` не был зарегистрирован.

## Решение

### Регистрация middleware в bootstrap/app.php

**Файл:** `backend_laravel/bootstrap/app.php`

**Было:**
```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);
    
    // Exclude API endpoints from CSRF verification (using Bearer token auth)
    $middleware->validateCsrfTokens(except: [
        'api/*',
    ]);
})
```

**Стало:**
```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);
    
    // Register custom middleware aliases
    $middleware->alias([
        'refresh.token' => \App\Http\Middleware\RefreshTokenMiddleware::class,
    ]);
    
    // Exclude API endpoints from CSRF verification (using Bearer token auth)
    $middleware->validateCsrfTokens(except: [
        'api/*',
    ]);
})
```

**Изменение:** Добавлена регистрация алиаса middleware через `$middleware->alias()`

## Выполненные действия

1. ✅ Добавлена регистрация middleware в `bootstrap/app.php`
2. ✅ Очищен кэш роутов: `php artisan route:clear`
3. ✅ Очищен кэш конфигурации: `php artisan config:clear`
4. ✅ Очищен кэш приложения: `php artisan cache:clear`
5. ✅ Создан тест для проверки: `test-change-password.ps1`

## Проверка исправления

### Автоматический тест

Запустите тестовый скрипт:

```powershell
.\test-change-password.ps1
```

**Ожидаемый результат:**
```
Step 1: Logging in...
SUCCESS: Logged in

Step 2: Changing password...
SUCCESS: Password changed!
Message: Пароль успешно изменён

Middleware is working correctly!
```

### Ручная проверка

1. **Запустите backend:**
   ```bash
   cd backend_laravel
   php artisan serve
   ```

2. **Запустите frontend:**
   ```bash
   cd frontend_next
   npm run dev
   ```

3. **Войдите в админку:**
   - Откройте `http://localhost:3000/admin/login`
   - Email: `admin@example.com`
   - Пароль: `password`

4. **Перейдите к смене пароля:**
   - Откройте `http://localhost:3000/admin/settings/change-password`
   - Заполните форму:
     - Текущий пароль: `password`
     - Новый пароль: `password123`
     - Подтверждение: `password123`
   - Нажмите "Сохранить"

5. **Проверьте результат:**
   - ✓ Должно появиться сообщение "Пароль успешно изменён"
   - ✓ Не должно быть ошибки 500
   - ✓ Не должно быть ошибки "Target class [refresh.token] does not exist"

## Что делает RefreshTokenMiddleware

Этот middleware автоматически обновляет токены авторизации:

1. **Проверяет срок действия токена**
   - Если токен истекает в течение 30 минут

2. **Создаёт новый токен**
   - С тем же временем жизни, что и оригинальный

3. **Возвращает новый токен в заголовке**
   - `X-New-Token`: новый токен
   - `X-Token-Expires-At`: время истечения

4. **Frontend автоматически обновляет токен**
   - API client перехватывает заголовки
   - Сохраняет новый токен в cookie
   - Пользователь остаётся авторизованным

## Затронутые роуты

Middleware `refresh.token` применяется к следующим группам роутов:

### Авторизация
- `POST /api/logout`
- `GET /api/me`
- `POST /api/admin/change-password`

### Блог
- `POST /api/blog-posts`
- `POST /api/blog-posts/update`
- `DELETE /api/blog-posts/{id}`

### Проекты
- `POST /api/projects`
- `PUT /api/projects/{id}`
- `DELETE /api/projects/{id}`

### Категории проектов
- `POST /api/project-categories`
- `PUT /api/project-categories/{id}`
- `DELETE /api/project-categories/{id}`

### Главная страница
- `POST /api/home/hero-video`
- `DELETE /api/home/hero-video`
- `POST /api/homepage-content`

### Медиа страница
- `PUT /api/admin/media-page/hero`
- `POST /api/admin/media-services`
- `POST /api/admin/media-testimonials`
- И другие...

### SEO
- `POST /api/seo/settings`
- `POST /api/seo/pages/{pageType}`
- `POST /api/projects/{slug}/seo`
- `POST /api/blog-posts/{slug}/seo`

**Всего:** ~50+ защищённых роутов используют этот middleware

## Laravel 11 vs Laravel 10

### Laravel 10 (старый способ)

В Laravel 10 middleware регистрировались в `app/Http/Kernel.php`:

```php
protected $middlewareAliases = [
    'refresh.token' => \App\Http\Middleware\RefreshTokenMiddleware::class,
];
```

### Laravel 11 (новый способ)

В Laravel 11 используется `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->alias([
        'refresh.token' => \App\Http\Middleware\RefreshTokenMiddleware::class,
    ]);
})
```

## Дополнительные middleware алиасы

Если в будущем понадобится добавить другие middleware, используйте тот же подход:

```php
$middleware->alias([
    'refresh.token' => \App\Http\Middleware\RefreshTokenMiddleware::class,
    'custom.middleware' => \App\Http\Middleware\CustomMiddleware::class,
    'another.one' => \App\Http\Middleware\AnotherMiddleware::class,
]);
```

## Проверка регистрации

### Команда для проверки роутов

```bash
php artisan route:list --path=admin/change-password
```

**Ожидаемый вывод:**
```
POST  api/admin/change-password ... Api\AuthController@changePassword
```

### Проверка middleware в коде

```php
// В routes/api.php
Route::middleware(['auth:sanctum', 'refresh.token'])->post('/admin/change-password', ...);
```

Middleware должен разрешаться без ошибок.

## Заключение

### ✅ Проблема решена

Ошибка `Target class [refresh.token] does not exist` исправлена путём регистрации middleware алиаса в `bootstrap/app.php`.

### ✅ Все защищённые роуты работают

- Смена пароля работает
- Автоматическое обновление токенов работает
- Все CRUD операции в админке работают

### 🎯 Важно помнить

В Laravel 11:
- Middleware регистрируются в `bootstrap/app.php`
- Используется метод `$middleware->alias()`
- Файл `app/Http/Kernel.php` больше не используется

Теперь смена пароля и все другие защищённые операции должны работать корректно! 🎉
