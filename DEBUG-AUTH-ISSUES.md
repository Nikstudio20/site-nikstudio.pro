# Инструкция по отладке проблем с аутентификацией

## Шаг 1: Проверка токена

1. Откройте админку: `http://localhost:3000/admin/homepage-editor`
2. Откройте DevTools (F12) → Console
3. Выполните в консоли:
   ```javascript
   document.cookie.split(';').find(c => c.trim().startsWith('admin-token='))
   ```
4. **Ожидаемый результат**: Должна быть строка вида `admin-token=1|xxxxx...`
5. **Если токена нет**: Войдите заново через `/admin/login`

## Шаг 2: Тестовая страница

1. Откройте тестовую страницу: `http://localhost:3000/admin/test-auth`
2. Нажмите кнопку "Проверить токен"
   - Должно показать: `Токен из cookie: 1|xxxxx...`
   - Если показывает `НЕТ ТОКЕНА` - войдите заново

3. Нажмите кнопку "GET /api/home"
   - **Успех**: Должен вернуть данные о видео или `null`
   - **Ошибка 401**: Проблема с токеном - войдите заново
   - **Другая ошибка**: Проверьте, запущен ли backend

4. Нажмите кнопку "DELETE /api/home/hero-video"
   - **Успех**: Видео удалено (или сообщение "Видео не найдено")
   - **Ошибка 401**: Проблема с аутентификацией

## Шаг 3: Проверка логов в консоли

Откройте `http://localhost:3000/admin/homepage-editor` и посмотрите в консоль браузера.

### При загрузке страницы должны быть логи:

```
[AdminHeroVideoManager] Fetching current video data (attempt 1)
[AdminHeroVideoManager] Token exists: true
[API Client] Request interceptor: {url: '/api/home', method: 'get', hasToken: true, ...}
[API Client] Response received: {url: '/api/home', status: 200, ...}
[AdminHeroVideoManager] Successfully fetched current video data: {...}
```

### При удалении видео:

```
[AdminHeroVideoManager] Starting video deletion
[AdminHeroVideoManager] Token exists for delete: true
[API Client] Request interceptor: {url: '/api/home/hero-video', method: 'delete', hasToken: true, ...}
[API Client] Response received: {url: '/api/home/hero-video', status: 200, ...}
```

### При загрузке видео:

```
[AdminHeroVideoManager] Starting video upload: {fileName: 'video.mp4', ...}
[AdminHeroVideoManager] Token exists for upload: true
[API Client] Request interceptor: {url: '/api/home/hero-video', method: 'post', hasToken: true, ...}
[API Client] Response received: {url: '/api/home/hero-video', status: 201, ...}
```

## Шаг 4: Проверка Network в DevTools

1. Откройте DevTools (F12) → Network
2. Попробуйте удалить или загрузить видео
3. Найдите запрос к `/api/home/hero-video`
4. Проверьте:
   - **Request Headers** должен содержать: `Authorization: Bearer 1|xxxxx...`
   - **Response Status** должен быть 200 или 201, НЕ 401

## Возможные проблемы и решения

### Проблема 1: Токен не найден в cookie

**Симптомы:**
- В консоли: `Token exists: false`
- В логах: `hasToken: false, tokenPreview: 'NO TOKEN'`

**Решение:**
1. Выйдите из админки
2. Очистите cookies (DevTools → Application → Cookies → Удалить все)
3. Войдите заново через `/admin/login`

### Проблема 2: Ошибка 401 Unauthenticated

**Симптомы:**
- В консоли: `Response error: {status: 401, ...}`
- Сообщение: "Unauthenticated"

**Возможные причины:**
1. **Токен истек** - войдите заново
2. **Токен недействителен** - очистите cookies и войдите заново
3. **Backend не запущен** - запустите `php artisan serve`
4. **Проблема с CORS** - проверьте `backend_laravel/config/cors.php`

**Решение:**
```bash
# Проверьте, запущен ли backend
cd backend_laravel
php artisan serve

# В другом терминале проверьте доступность
curl http://localhost:8000/api/home
```

### Проблема 3: CORS ошибка

**Симптомы:**
- В консоли: `Access to XMLHttpRequest ... has been blocked by CORS policy`
- Красные ошибки в Network

**Решение:**
1. Проверьте `.env` в backend:
   ```
   FRONTEND_URL=http://localhost:3000
   ```

2. Перезапустите backend:
   ```bash
   cd backend_laravel
   php artisan config:clear
   php artisan serve
   ```

### Проблема 4: Токен есть, но не передается

**Симптомы:**
- В консоли: `Token exists: true`
- Но в Request Headers нет `Authorization`

**Решение:**
1. Проверьте, что используется `apiClient` из `@/lib/api`
2. Очистите кэш браузера (Ctrl+Shift+Delete)
3. Перезагрузите страницу с очисткой кэша (Ctrl+F5)

### Проблема 5: Backend возвращает 500

**Симптомы:**
- Status: 500 Internal Server Error

**Решение:**
1. Проверьте логи Laravel:
   ```bash
   tail -f backend_laravel/storage/logs/laravel.log
   ```

2. Проверьте права на папки:
   ```bash
   cd backend_laravel
   chmod -R 775 storage bootstrap/cache
   ```

## Шаг 5: Проверка backend

Если проблема не решается, проверьте backend напрямую:

```bash
# Проверка публичного endpoint (должен работать без токена)
curl http://localhost:8000/api/home

# Проверка защищенного endpoint (должен вернуть 401)
curl -X DELETE http://localhost:8000/api/home/hero-video

# Проверка с токеном (замените YOUR_TOKEN на реальный токен)
curl -X DELETE http://localhost:8000/api/home/hero-video \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

## Контрольный список

- [ ] Backend запущен (`php artisan serve`)
- [ ] Frontend запущен (`npm run dev`)
- [ ] Вы авторизованы в админке
- [ ] Токен существует в cookies
- [ ] В консоли нет ошибок CORS
- [ ] В Network видны запросы с заголовком Authorization
- [ ] Backend логи не показывают ошибок

## Если ничего не помогло

1. Полностью очистите cookies и localStorage
2. Перезапустите backend и frontend
3. Войдите заново
4. Откройте тестовую страницу `/admin/test-auth`
5. Сделайте скриншот консоли и Network
6. Проверьте логи Laravel

## Полезные команды

```bash
# Очистка кэша Laravel
cd backend_laravel
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Проверка роутов
php artisan route:list | grep home

# Просмотр логов в реальном времени
tail -f storage/logs/laravel.log
```
