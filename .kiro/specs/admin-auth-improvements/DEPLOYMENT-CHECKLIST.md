# Чеклист для деплоя на сервер

## 📋 Что нужно сделать на сервере

### ✅ Хорошие новости:
- **Миграции БД НЕ требуются** - изменения в структуре БД не вносились
- Все изменения только в коде и конфигурации

---

## 🔧 Шаги для деплоя

### 1. Подготовка (локально)

```bash
# Убедитесь, что все изменения закоммичены
git status
git add .
git commit -m "feat: улучшения системы авторизации админ-панели"
git push origin main
```

---

### 2. Backend (Laravel) - на сервере

```bash
# Перейти в директорию проекта
cd /path/to/backend_laravel

# Получить изменения
git pull origin main

# Обновить зависимости (если были изменения в composer.json)
composer install --no-dev --optimize-autoloader

# ВАЖНО: Обновить .env файл
# Добавьте следующие строки в .env:
```

**Добавить в `.env` на сервере:**
```env
# Настройки сессий (8 часов)
SESSION_LIFETIME=480
SESSION_EXPIRE_ON_CLOSE=false

# Настройки Sanctum токенов
SANCTUM_TOKEN_EXPIRATION=480
SANCTUM_REMEMBER_EXPIRATION=43200

# URL фронтенда (замените на ваш реальный URL)
FRONTEND_URL=https://nikstudio.pro
```

**Продолжение команд:**
```bash
# Очистить и пересоздать кэш конфигурации
php artisan config:clear
php artisan config:cache

# Очистить кэш маршрутов
php artisan route:clear
php artisan route:cache

# Очистить кэш представлений
php artisan view:clear
php artisan view:cache

# Перезапустить очередь (если используется)
php artisan queue:restart

# Проверить, что всё работает
php artisan about
```

---

### 3. Frontend (Next.js) - на сервере

```bash
# Перейти в директорию фронтенда
cd /path/to/frontend_next

# Получить изменения
git pull origin main

# Установить зависимости (если были изменения)
npm install

# Пересобрать production build
npm run build

# Перезапустить приложение
# Если используете PM2:
pm2 restart nextjs-app

# Если используете systemd:
sudo systemctl restart nextjs

# Если запускаете вручную:
# Остановите текущий процесс и запустите:
npm start
```

---

### 4. Проверка после деплоя

#### Backend проверки:

```bash
# Проверить логи Laravel
tail -f storage/logs/laravel.log

# Проверить, что конфигурация применилась
php artisan config:show session
php artisan config:show sanctum
php artisan config:show cors
```

#### Frontend проверки:

1. **Откройте админ-панель в браузере**
   - URL: `https://nikstudio.pro/admin/login`

2. **Проверьте страницу логина:**
   - [ ] Навигационное меню скрыто
   - [ ] Форма логина отображается корректно
   - [ ] Есть чекбокс "Запомнить меня"

3. **Войдите в систему:**
   - [ ] Браузер предлагает сохранить пароль
   - [ ] После входа появляется навигационное меню
   - [ ] Нет ошибок в консоли браузера (F12)

4. **Проверьте новые функции:**
   - [ ] В меню есть пункт "Сменить пароль"
   - [ ] Страница смены пароля открывается
   - [ ] Форма смены пароля работает

5. **Проверьте токены (DevTools → Network):**
   - [ ] При API запросах есть header `Authorization: Bearer ...`
   - [ ] При обновлении токена приходит header `X-New-Token`

---

### 5. Проверка безопасности

```bash
# На сервере проверьте права доступа
ls -la storage/
ls -la bootstrap/cache/

# Убедитесь, что .env не доступен публично
curl https://nikstudio.pro/.env
# Должно вернуть 404 или 403
```

---

## ⚠️ Важные моменты

### Конфигурация CORS

В `backend_laravel/config/cors.php` уже добавлен домен `https://nikstudio.pro`.

Если ваш фронтенд работает на другом домене, обновите:

```php
'allowed_origins' => array_filter([
    env('FRONTEND_URL', 'http://localhost:3000'),
    'https://ваш-реальный-домен.com',  // Добавьте ваш домен
]),
```

### Настройки веб-сервера (Nginx/Apache)

Убедитесь, что веб-сервер правильно проксирует запросы и передаёт headers.

**Для Nginx:**
```nginx
location /api {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # Важно для CORS
    add_header Access-Control-Allow-Credentials true;
}
```

---

## 🔄 Rollback план (если что-то пошло не так)

### Backend:
```bash
cd /path/to/backend_laravel

# Откатить код
git log --oneline  # Найти предыдущий коммит
git checkout <previous-commit-hash>

# Очистить кэш
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Восстановить старые значения в .env
# SESSION_LIFETIME=120
# Удалить SANCTUM_TOKEN_EXPIRATION и SANCTUM_REMEMBER_EXPIRATION
```

### Frontend:
```bash
cd /path/to/frontend_next

# Откатить код
git checkout <previous-commit-hash>

# Пересобрать
npm run build

# Перезапустить
pm2 restart nextjs-app
```

---

## 📊 Мониторинг после деплоя

### Первые 24 часа:

1. **Проверяйте логи Laravel:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

2. **Проверяйте логи Next.js:**
   ```bash
   pm2 logs nextjs-app
   ```

3. **Следите за метриками:**
   - Время ответа API
   - Количество ошибок 401/403
   - Количество успешных логинов

4. **Проверьте в разных браузерах:**
   - Chrome
   - Firefox
   - Safari (если есть доступ)

---

## ✅ Финальный чеклист

- [ ] Git push выполнен
- [ ] Git pull на сервере выполнен
- [ ] .env обновлён с новыми параметрами
- [ ] `php artisan config:cache` выполнен
- [ ] `npm run build` выполнен
- [ ] Приложение перезапущено
- [ ] Страница логина открывается
- [ ] Меню скрыто на странице логина
- [ ] Вход в систему работает
- [ ] Браузер предлагает сохранить пароль
- [ ] Меню появляется после входа
- [ ] Пункт "Сменить пароль" есть в меню
- [ ] Смена пароля работает
- [ ] Нет ошибок в логах
- [ ] Нет ошибок в консоли браузера

---

## 🆘 Если возникли проблемы

### Проблема: 401 ошибки при API запросах

**Решение:**
```bash
# Проверьте CORS конфигурацию
php artisan config:show cors

# Убедитесь, что FRONTEND_URL правильный в .env
echo $FRONTEND_URL

# Очистите кэш
php artisan config:clear
php artisan config:cache
```

### Проблема: Токены не обновляются автоматически

**Решение:**
```bash
# Проверьте, что middleware зарегистрирован
php artisan route:list | grep admin

# Проверьте логи
tail -f storage/logs/laravel.log
```

### Проблема: Браузер не предлагает сохранить пароль

**Решение:**
- Убедитесь, что сайт работает по HTTPS
- Проверьте, что форма имеет правильные атрибуты (уже реализовано)
- Попробуйте в режиме инкогнито

---

## 📞 Контакты

Если возникнут проблемы, проверьте:
1. Логи Laravel: `storage/logs/laravel.log`
2. Логи Next.js: `pm2 logs` или консоль
3. Консоль браузера (F12 → Console)
4. Network tab (F12 → Network)

---

**Дата создания:** 10 октября 2025  
**Версия:** 1.0.0
