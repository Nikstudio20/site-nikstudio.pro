# Проверка логов Laravel

## Проблема

Фронтенд отправляет токен правильно, но Laravel возвращает "Unauthenticated".

## Что проверить

### 1. Проверьте логи Laravel

Откройте файл логов:
```
backend_laravel/storage/logs/laravel.log
```

Попробуйте сохранить SEO настройки и найдите в логах:
```
[SEOController] updateGlobalSettings called
```

**Что должно быть в логах:**
```
[2024-XX-XX XX:XX:XX] local.INFO: [SEOController] updateGlobalSettings called  
{
  "user": 1,
  "has_bearer_token": "yes",
  "token_preview": "28|ao6vwCGyb4SJ6ngIH...",
  "headers": {...}
}
```

**Если `user: "not authenticated"`:**
- Middleware `auth:sanctum` не пропускает запрос
- Токен не распознаётся Laravel

### 2. Проверьте, что метод вызывается

Если в логах НЕТ записи `[SEOController] updateGlobalSettings called`:
- Запрос не доходит до контроллера
- Middleware блокирует запрос ДО контроллера
- Проверьте middleware `auth:sanctum`

### 3. Проверьте токен в базе данных

Подключитесь к PostgreSQL:
```bash
psql -U postgres -d nik_studio
```

Проверьте токены:
```sql
SELECT id, tokenable_id, name, token, expires_at, created_at 
FROM personal_access_tokens 
ORDER BY created_at DESC 
LIMIT 5;
```

**Что проверить:**
- Есть ли токен с префиксом `28|` (из логов фронтенда)
- Не истёк ли токен (`expires_at > NOW()`)
- Соответствует ли `tokenable_id` вашему user ID

### 4. Проверьте middleware

Откройте файл:
```
backend_laravel/app/Http/Middleware/Authenticate.php
```

Проверьте, что middleware правильно обрабатывает API запросы.

### 5. Тест через curl

Получите токен из cookies браузера:
```javascript
// В консоли браузера
const token = document.cookie.split(';').find(c => c.trim().startsWith('admin-token='));
console.log(token.split('=')[1]);
```

Скопируйте токен и выполните:
```bash
curl -X POST http://localhost:8000/api/seo/settings \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Accept: application/json" \
  -F "site_title=Test" \
  -F "site_description=Test Description" \
  -F "twitter_card_type=summary_large_image" \
  -F "facebook_app_id="
```

**Ожидаемый результат:**
```json
{
  "success": true,
  "data": {...},
  "message": "Глобальные SEO-настройки успешно обновлены"
}
```

**Если ошибка "Unauthenticated":**
- Проблема в Laravel Sanctum
- Токен не валиден или истёк

### 6. Проверьте другие эндпоинты

Попробуйте создать пост в блоге через `/admin/blog`:
- Если работает - проблема специфична для SEO роутов
- Если не работает - проблема в Sanctum в целом

### 7. Проверьте конфигурацию CORS

Откройте файл:
```
backend_laravel/config/cors.php
```

Убедитесь, что:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'supports_credentials' => true,
```

## Возможные решения

### Решение 1: Очистить кэш Laravel

```bash
cd backend_laravel
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### Решение 2: Пересоздать токен

1. Выйдите из системы
2. Войдите заново
3. Попробуйте сохранить SEO настройки

### Решение 3: Проверить Sanctum middleware

Убедитесь, что в `bootstrap/app.php` правильно настроен Sanctum:
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->statefulApi();
    // ...
})
```

### Решение 4: Проверить .env

Убедитесь, что в `.env`:
```
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
```

## Следующие шаги

1. Проверьте логи Laravel (`storage/logs/laravel.log`)
2. Если логи показывают `user: "not authenticated"` - проблема в Sanctum
3. Если логов нет вообще - middleware блокирует запрос
4. Попробуйте curl тест для изоляции проблемы
5. Сравните с рабочими эндпоинтами (blog, projects)
