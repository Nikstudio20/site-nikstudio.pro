# Чек-лист деплоя изменений на сервер

## Изменения в этом коммите
1. ✅ Удален Sanctum middleware `EnsureFrontendRequestsAreStateful`
2. ✅ Добавлен `HandleCors` middleware для API маршрутов
3. ✅ Исправлены пути в хуках (добавлен префикс `/api`)
4. ✅ Исправлен интерфейс ответа для проектов (`success` вместо `status`)

## Что нужно сделать на сервере

### 1. Backend (Laravel)

После пула изменений выполните:

```bash
cd backend_laravel

# Очистить все кеши
php artisan route:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Закэшировать конфигурацию для production
php artisan config:cache
php artisan route:cache

# Перезапустить PHP-FPM или веб-сервер
sudo systemctl restart php8.2-fpm  # или php8.4-fpm в зависимости от версии
# ИЛИ
sudo systemctl reload nginx
```

### 2. Frontend (Next.js)

```bash
cd frontend_next

# Установить зависимости (если нужно)
npm install

# Пересобрать production build
npm run build

# Перезапустить PM2 (если используется)
pm2 restart nikstudio-frontend
# ИЛИ перезапустить systemd service
sudo systemctl restart nikstudio-frontend
```

### 3. Проверка переменных окружения

#### Backend `.env`
Убедитесь, что на сервере установлены правильные значения:
```env
APP_URL=https://nikstudio.pro
FRONTEND_URL=https://nikstudio.pro

# CORS настройки (уже в config/cors.php)
# Проверьте, что домен добавлен в allowed_origins
```

#### Frontend `.env.local` или `.env.production`
```env
NEXT_PUBLIC_API_URL=https://nikstudio.pro
```

### 4. Проверка CORS конфигурации

Файл `backend_laravel/config/cors.php` должен содержать:
```php
'allowed_origins' => array_filter([
    env('FRONTEND_URL', 'http://localhost:3000'),
    'https://nikstudio.pro',
    'http://109.205.58.5:3000',  // если используется IP
]),
```

### 5. Проверка Nginx конфигурации

Убедитесь, что Nginx правильно проксирует запросы:

```nginx
# Для API запросов
location /api/ {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Для storage файлов
location /storage/ {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
}
```

### 6. Проверка символической ссылки storage

```bash
cd backend_laravel
php artisan storage:link
```

## Тестирование после деплоя

### 1. Проверьте API напрямую
```bash
curl -H "Origin: https://nikstudio.pro" https://nikstudio.pro/api/project-categories -i
```

Должны быть заголовки:
- `Access-Control-Allow-Origin: https://nikstudio.pro`
- `Access-Control-Allow-Credentials: true`

### 2. Проверьте админку
- https://nikstudio.pro/admin/login
- https://nikstudio.pro/admin/category
- https://nikstudio.pro/admin/projects

### 3. Проверьте консоль браузера
Не должно быть ошибок CORS или Network Error

## Возможные проблемы и решения

### Проблема: CORS ошибки на production
**Решение:**
```bash
# Проверьте, что домен добавлен в config/cors.php
# Очистите кеш конфигурации
php artisan config:clear
php artisan config:cache
```

### Проблема: 404 на API маршрутах
**Решение:**
```bash
# Проверьте маршруты
php artisan route:list --path=api

# Очистите кеш маршрутов
php artisan route:clear
php artisan route:cache
```

### Проблема: Старые данные в кеше браузера
**Решение:**
- Очистите кеш браузера (Ctrl+Shift+Delete)
- Используйте режим инкогнито для тестирования
- Добавьте версионирование к статическим файлам

## Rollback план

Если что-то пойдет не так:

### 1. Откатить изменения в Git
```bash
git revert HEAD
git push origin main
```

### 2. Восстановить старую конфигурацию
```bash
# Вернуть Sanctum middleware в bootstrap/app.php
# Убрать префикс /api из хуков
```

### 3. Пересобрать и перезапустить
```bash
cd backend_laravel
php artisan config:clear
php artisan route:clear

cd ../frontend_next
npm run build
pm2 restart nikstudio-frontend
```

## Мониторинг после деплоя

### Проверьте логи Laravel
```bash
tail -f backend_laravel/storage/logs/laravel.log
```

### Проверьте логи Nginx
```bash
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Проверьте логи PM2 (если используется)
```bash
pm2 logs nikstudio-frontend
```

## Итоговый чек-лист

- [ ] Запушить изменения в GitHub
- [ ] Сделать pull на сервере
- [ ] Очистить кеши Laravel
- [ ] Закэшировать конфигурацию Laravel
- [ ] Пересобрать Next.js (`npm run build`)
- [ ] Перезапустить сервисы (PHP-FPM, PM2/systemd)
- [ ] Проверить переменные окружения
- [ ] Проверить CORS заголовки через curl
- [ ] Протестировать админку в браузере
- [ ] Проверить логи на ошибки
- [ ] Очистить кеш браузера и протестировать

## Примечания

- Изменения в `bootstrap/app.php` требуют перезапуска PHP-FPM
- Изменения в хуках требуют пересборки Next.js
- CORS конфигурация кэшируется Laravel, нужен `config:cache`
- Браузеры кэшируют preflight запросы, может потребоваться очистка кеша
