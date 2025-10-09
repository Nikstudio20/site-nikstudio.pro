# Быстрое решение проблемы с видео на главной странице

## Что было сделано

Добавлено детальное логирование для диагностики проблемы с аутентификацией при работе с видео.

## Как проверить, в чем проблема

### Вариант 1: Быстрая проверка

1. Откройте `http://localhost:3000/admin/test-auth`
2. Нажмите "Проверить токен"
3. Если показывает "НЕТ ТОКЕНА" - **войдите заново** через `/admin/login`
4. Если токен есть, нажмите "DELETE /api/home/hero-video"
5. Если ошибка 401 - **проблема на backend**, см. ниже

### Вариант 2: Проверка через консоль

1. Откройте `http://localhost:3000/admin/homepage-editor`
2. Откройте консоль браузера (F12)
3. Попробуйте удалить видео
4. Посмотрите логи в консоли:

**Если видите:**
```
[AdminHeroVideoManager] Token exists: false
```
→ **Решение**: Войдите заново через `/admin/login`

**Если видите:**
```
[API Client] Response error: {status: 401, ...}
```
→ **Решение**: Проблема на backend, см. ниже

**Если видите:**
```
Access to XMLHttpRequest ... has been blocked by CORS
```
→ **Решение**: Проблема с CORS, см. ниже

## Решения

### Решение 1: Войти заново (самое частое)

```bash
# 1. Откройте http://localhost:3000/admin/login
# 2. Введите логин и пароль
# 3. Попробуйте снова
```

### Решение 2: Очистить cookies и войти заново

```javascript
// В консоли браузера (F12):
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
// Затем перезагрузите страницу и войдите заново
```

### Решение 3: Перезапустить backend

```bash
cd backend_laravel

# Очистить кэш
php artisan config:clear
php artisan cache:clear

# Перезапустить
php artisan serve
```

### Решение 4: Проверить CORS

Откройте `backend_laravel/.env` и убедитесь:
```
FRONTEND_URL=http://localhost:3000
```

Затем:
```bash
cd backend_laravel
php artisan config:clear
php artisan serve
```

### Решение 5: Проверить права на файлы (Linux/Mac)

```bash
cd backend_laravel
chmod -R 775 storage bootstrap/cache
```

## Проверка, что все работает

1. Откройте `http://localhost:3000/admin/test-auth`
2. Нажмите все кнопки по порядку:
   - ✅ "Проверить токен" - должен показать токен
   - ✅ "GET /api/home" - должен вернуть SUCCESS
   - ✅ "DELETE /api/home/hero-video" - должен вернуть SUCCESS или "Видео не найдено"

3. Откройте `http://localhost:3000/admin/homepage-editor`
4. Попробуйте загрузить и удалить видео
5. Проверьте консоль - не должно быть ошибок 401

## Если ничего не помогло

1. Откройте консоль браузера (F12)
2. Перейдите на вкладку Network
3. Попробуйте удалить видео
4. Найдите запрос к `/api/home/hero-video`
5. Проверьте:
   - Request Headers → должен быть `Authorization: Bearer ...`
   - Response → статус должен быть 200, не 401

6. Если статус 401, проверьте backend логи:
```bash
cd backend_laravel
tail -f storage/logs/laravel.log
```

## Контакты для помощи

Если проблема не решается:
1. Сделайте скриншот консоли браузера
2. Сделайте скриншот Network вкладки
3. Скопируйте последние строки из `backend_laravel/storage/logs/laravel.log`
4. Опишите, что именно не работает

## Полезные файлы

- `DEBUG-AUTH-ISSUES.md` - подробная инструкция по отладке
- `TEST-HOMEPAGE-VIDEO-FIX.md` - инструкция по тестированию
- `HOMEPAGE-VIDEO-AUTH-FIX.md` - описание исправлений
