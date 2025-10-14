# Тест удаления файлов

## Проблема
При удалении главного видео файл не удалялся из папки.

## Исправление
Изменён метод `cleanupOldVideo()` в модели `HomeContent.php`:
- Было: `Storage::exists()` и `Storage::delete()`
- Стало: `Storage::disk('public')->exists()` и `Storage::disk('public')->delete()`

## Как проверить

### 1. Проверка удаления главного видео

```bash
# 1. Перейдите в папку с видео
cd backend_laravel/storage/app/public/home/hero-videos/

# 2. Посмотрите список файлов ДО удаления
ls -la

# 3. Удалите видео через админку
# Откройте http://localhost:3000/admin/homepage-editor
# Нажмите "Удалить" в секции "Управление главным видео"

# 4. Посмотрите список файлов ПОСЛЕ удаления
ls -la

# Ожидаемый результат: файл должен быть удалён
```

### 2. Проверка замены видео

```bash
# 1. Загрузите первое видео через админку
# 2. Посмотрите список файлов
ls -la backend_laravel/storage/app/public/home/hero-videos/

# 3. Загрузите второе видео (замена)
# 4. Посмотрите список файлов снова
ls -la backend_laravel/storage/app/public/home/hero-videos/

# Ожидаемый результат: должен остаться только один файл (новое видео)
```

### 3. Проверка логов

```bash
# Откройте логи Laravel
tail -f backend_laravel/storage/logs/laravel.log

# Вы должны увидеть:
# [timestamp] local.INFO: Deleting hero video {"home_content_id":1,"video_path":"home/hero-videos/hero-video-2025-01-11_12-34-56.mp4"}
# [timestamp] local.INFO: Hero video deleted successfully {"home_content_id":1}
```

## Изменённые файлы

1. `backend_laravel/app/Models/HomeContent.php`
   - Метод `cleanupOldVideo()` - добавлен `disk('public')`
   - Метод `cleanupOldImage()` - добавлен `disk('public')`

## Дополнительная информация

### Почему это важно?

Laravel использует разные диски для хранения файлов:
- `local` - storage/app/
- `public` - storage/app/public/

Без явного указания диска Laravel использует диск по умолчанию (`local`), поэтому файлы не находились и не удалялись.

### Проверка конфигурации

```bash
# Проверьте config/filesystems.php
cat backend_laravel/config/filesystems.php | grep -A 5 "public"

# Должно быть:
# 'public' => [
#     'driver' => 'local',
#     'root' => storage_path('app/public'),
#     'url' => env('APP_URL').'/storage',
#     'visibility' => 'public',
# ],
```

### Проверка символической ссылки

```bash
# Убедитесь, что символическая ссылка создана
ls -la backend_laravel/public/storage

# Если ссылки нет, создайте её:
cd backend_laravel
php artisan storage:link
```
