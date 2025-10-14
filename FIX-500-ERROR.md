# Исправление ошибки 500 Internal Server Error

## Проблема
При сохранении Hero секции возникает ошибка:
```
PUT http://localhost:8000/api/admin/media-page/hero 500 (Internal Server Error)
SyntaxError: Unexpected token '<', "<!-- Pleas"... is not valid JSON
```

## Причина
Laravel сервер возвращает 500 ошибку, скорее всего из-за того, что таблица `media_page_content` не существует в базе данных.

## Решение

### Шаг 1: Проверьте Laravel логи
```bash
cd backend_laravel
tail -20 storage/logs/laravel.log
```

Если видите ошибку типа:
```
SQLSTATE[42S02]: Base table or view not found: 1146 Table 'database.media_page_content' doesn't exist
```

Значит нужно выполнить миграции.

### Шаг 2: Выполните миграции
```bash
cd backend_laravel
php artisan migrate
```

Должно появиться:
```
Running migrations.
2025_07_22_044328_create_media_page_content_table ................. DONE
```

### Шаг 3: Проверьте, что таблица создана
```bash
php artisan tinker
```

Затем в tinker:
```php
\App\Models\MediaPageContent::count()
// Должно вернуть 0 или больше, без ошибки
exit
```

### Шаг 4: Перезапустите Laravel сервер
```bash
php artisan serve
```

### Шаг 5: Проверьте в браузере
1. Откройте http://localhost:3000/admin/media-page
2. Измените заголовок Hero
3. Нажмите "Сохранить"
4. Должно появиться сообщение "Контент Hero успешно сохранён"

## Если миграции уже выполнены

Если миграции уже выполнены, но ошибка остаётся, проверьте:

### 1. Подключение к базе данных
В файле `backend_laravel/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Проверьте подключение:
```bash
php artisan db:show
```

### 2. Права доступа к базе данных
Убедитесь, что пользователь БД имеет права на создание таблиц и запись данных.

### 3. Очистите кэш Laravel
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### 4. Проверьте модель MediaPageContent
Файл `backend_laravel/app/Models/MediaPageContent.php` должен содержать:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaPageContent extends Model
{
    protected $table = 'media_page_content';

    protected $fillable = [
        'hero_title',
        'hero_description',
        'testimonials_title',
        'testimonials_subtitle',
        'process_title',
        'process_subtitle'
    ];
}
```

## Альтернативное решение: Создать таблицу вручную

Если миграции не работают, создайте таблицу вручную через SQL:

```sql
CREATE TABLE `media_page_content` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hero_title` text COLLATE utf8mb4_unicode_ci,
  `hero_description` text COLLATE utf8mb4_unicode_ci,
  `testimonials_title` text COLLATE utf8mb4_unicode_ci,
  `testimonials_subtitle` text COLLATE utf8mb4_unicode_ci,
  `process_title` text COLLATE utf8mb4_unicode_ci,
  `process_subtitle` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Проверка после исправления

1. Откройте http://localhost:3000/admin/media-page
2. Измените заголовок Hero на "ТЕСТ"
3. Нажмите "Сохранить"
4. Должно появиться зелёное сообщение "Контент Hero успешно сохранён"
5. Обновите страницу (F5)
6. Заголовок должен остаться "ТЕСТ"

Если всё работает - проблема решена! ✅

## Дополнительная отладка

Если проблема остаётся, выполните в консоли браузера:
```javascript
fetch('http://localhost:8000/api/admin/media-page', {
  credentials: 'include',
  headers: { 'Accept': 'application/json' }
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

Если получите JSON с данными - сервер работает корректно.
Если получите ошибку - проблема с сервером или аутентификацией.
