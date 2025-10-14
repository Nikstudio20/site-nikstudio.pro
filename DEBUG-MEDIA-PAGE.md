# Отладка ошибки Media Page

## Проблема
При сохранении Hero секции возникает ошибка:
```
SyntaxError: Unexpected token '<', "<!-- Pleas"... is not valid JSON
```

## Возможные причины

### 1. Laravel сервер не запущен
Проверьте, что Laravel сервер запущен на порту 8000:
```bash
cd backend_laravel
php artisan serve
```

Должно быть:
```
Starting Laravel development server: http://127.0.0.1:8000
```

### 2. Проблема с аутентификацией
Проверьте в консоли браузера (F12 → Console):
- Есть ли cookie `admin-token`
- Какой статус ответа от сервера (401, 404, 500?)

### 3. CORS не настроен
Проверьте файл `backend_laravel/config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'supports_credentials' => true,
```

### 4. Middleware не применён
Проверьте `backend_laravel/routes/api.php`:
```php
Route::prefix('admin/media-page')->group(function () {
    Route::get('/', [MediaPageController::class, 'index']);
    Route::middleware(['auth:sanctum', 'refresh.token'])->group(function () {
        Route::put('/hero', [MediaPageController::class, 'updateHero']);
        // ...
    });
});
```

## Шаги отладки

### Шаг 1: Проверьте консоль браузера
1. Откройте http://localhost:3000/admin/media-page
2. Откройте DevTools (F12)
3. Перейдите на вкладку Console
4. Попробуйте сохранить Hero секцию
5. Посмотрите логи:
   - `[Hero Submit] Отправка данных:` - что отправляется
   - `[Hero Submit] Ошибка:` - детали ошибки
   - `[API Client] Request interceptor:` - есть ли токен
   - `[API Client] Response error:` - статус ответа

### Шаг 2: Проверьте Network вкладку
1. Откройте DevTools → Network
2. Попробуйте сохранить Hero секцию
3. Найдите запрос `PUT /api/admin/media-page/hero`
4. Проверьте:
   - Status Code (должен быть 200, не 401/404/500)
   - Request Headers → Authorization (должен быть Bearer token)
   - Response → Preview (что вернул сервер)

### Шаг 3: Проверьте Laravel логи
```bash
cd backend_laravel
tail -f storage/logs/laravel.log
```

Попробуйте сохранить Hero секцию и посмотрите, что пишется в логи.

### Шаг 4: Проверьте токен в cookie
В консоли браузера выполните:
```javascript
document.cookie
```

Должно быть что-то вроде:
```
admin-token=1|abc123...; admin-token-expires-at=...
```

Если токена нет - нужно заново войти в систему:
1. Выйдите: http://localhost:3000/admin/login
2. Войдите снова с правильными учётными данными

### Шаг 5: Тестовый запрос
В консоли браузера выполните:
```javascript
fetch('http://localhost:8000/api/admin/media-page', {
  credentials: 'include',
  headers: {
    'Accept': 'application/json'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

Если получите JSON - сервер работает.
Если получите HTML - проблема с сервером или CORS.

## Решение

### Если сервер не запущен
```bash
cd backend_laravel
php artisan serve
```

### Если нет токена
1. Перейдите на http://localhost:3000/admin/login
2. Войдите в систему
3. Попробуйте снова

### Если 401 Unauthorized
Проблема с токеном или middleware. Проверьте:
1. Токен в cookie
2. Middleware в routes/api.php
3. Sanctum конфигурацию

### Если 404 Not Found
Проблема с роутами. Проверьте:
1. `backend_laravel/routes/api.php` - есть ли роут `/api/admin/media-page/hero`
2. Контроллер `MediaPageController` - есть ли метод `updateHero`

### Если 500 Internal Server Error
Проблема на сервере. Проверьте:
1. Laravel логи: `backend_laravel/storage/logs/laravel.log`
2. База данных подключена
3. Таблица `media_page_contents` существует

## Временное решение для тестирования

Если нужно быстро проверить, что проблема именно в аутентификации, можно временно убрать middleware:

В `backend_laravel/routes/api.php`:
```php
Route::prefix('admin/media-page')->group(function () {
    Route::get('/', [MediaPageController::class, 'index']);
    // Временно убрать middleware для теста
    Route::put('/hero', [MediaPageController::class, 'updateHero']);
    Route::put('/testimonials-header', [MediaPageController::class, 'updateTestimonialsHeader']);
    Route::put('/process-header', [MediaPageController::class, 'updateProcessHeader']);
});
```

⚠️ **ВАЖНО**: Это только для тестирования! Верните middleware обратно после проверки!

## Проверка после исправления

1. Откройте http://localhost:3000/admin/media-page
2. Измените заголовок Hero
3. Нажмите "Сохранить"
4. Должно появиться сообщение "Контент Hero успешно сохранён"
5. Обновите страницу - изменения должны сохраниться
