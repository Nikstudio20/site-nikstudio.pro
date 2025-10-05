# Отладка проблемы с логином

## Проблема
При попытке войти с `admin` / `MLCdJIqUJyvFwV1` появляется ошибка "Ошибка при входе в систему"

## Шаги отладки

### 1. Проверьте, что backend работает
```powershell
# Должен быть запущен на порту 8000
cd backend_laravel
php artisan serve
```

### 2. Проверьте API напрямую
```powershell
$body = @{ email = "admin"; password = "MLCdJIqUJyvFwV1" } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:8000/api/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

Должен вернуть HTTP 200 с токеном.

### 3. Проверьте переменные окружения фронтенда
Откройте в браузере:
```
http://localhost:3000/test-env
```

Должно показать:
```
NEXT_PUBLIC_API_URL: http://localhost:8000
```

Если показывает "NOT DEFINED":
1. Проверьте файл `frontend_next/.env.local`
2. Убедитесь, что там есть: `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. **ПЕРЕЗАПУСТИТЕ** фронтенд сервер:
   ```bash
   cd frontend_next
   # Остановите сервер (Ctrl+C)
   npm run dev
   ```

### 4. Тест через HTML файл
Откройте файл `test-login.html` в браузере:
```
file:///C:/dev/fullstack/next_laravel/nik_studio_2_19/test-login.html
```

Введите:
- Логин: `admin`
- Пароль: `MLCdJIqUJyvFwV1`

Нажмите "Войти" и проверьте консоль браузера (F12).

### 5. Проверьте консоль браузера
1. Откройте `http://localhost:3000/admin/login`
2. Откройте DevTools (F12)
3. Перейдите на вкладку Console
4. Введите логин/пароль и нажмите "Войти"
5. Посмотрите логи:
   - `API URL: ...` - должен быть http://localhost:8000
   - `Credentials: ...` - должны быть правильные
   - `Response status: ...` - должен быть 200
   - Любые ошибки

### 6. Проверьте Network в DevTools
1. Откройте DevTools (F12)
2. Перейдите на вкладку Network
3. Попробуйте войти
4. Найдите запрос к `/api/login`
5. Проверьте:
   - Request URL - должен быть `http://localhost:8000/api/login`
   - Status Code - должен быть 200
   - Response - должен содержать token
   - Если есть CORS ошибка - проверьте `backend_laravel/config/cors.php`

### 7. Проверьте CORS
Файл `backend_laravel/config/cors.php` должен содержать:
```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    // ...
],
'supports_credentials' => true,
```

### 8. Проверьте пользователя в БД
```powershell
cd backend_laravel
php artisan tinker --execute="print_r(App\Models\User::where('name', 'admin')->first());"
```

Должен показать пользователя с name='admin'.

## Частые проблемы

### Проблема: "API URL не определен"
**Решение**: 
1. Проверьте `frontend_next/.env.local`
2. Добавьте: `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. **ПЕРЕЗАПУСТИТЕ** фронтенд

### Проблема: CORS ошибка
**Решение**:
1. Проверьте `backend_laravel/config/cors.php`
2. Убедитесь, что `localhost:3000` в `allowed_origins`
3. Убедитесь, что `supports_credentials` = true

### Проблема: "Неверные учетные данные"
**Решение**:
1. Проверьте пароль: `MLCdJIqUJyvFwV1` (с большой буквы)
2. Проверьте пользователя в БД
3. Попробуйте создать нового:
   ```bash
   cd backend_laravel
   php artisan tinker
   User::create(['name' => 'admin', 'email' => 'admin@local', 'password' => Hash::make('MLCdJIqUJyvFwV1')]);
   ```

### Проблема: Фронтенд не обновляется
**Решение**:
1. Остановите фронтенд (Ctrl+C)
2. Очистите кэш: `rm -rf .next`
3. Запустите снова: `npm run dev`

## Тестовые файлы

1. `test-login.html` - простой HTML тест API
2. `test-admin-login.ps1` - PowerShell тест API
3. `http://localhost:3000/test-env` - проверка переменных окружения

## Если ничего не помогает

1. Остановите оба сервера
2. Очистите кэш Laravel:
   ```bash
   cd backend_laravel
   php artisan config:clear
   php artisan cache:clear
   ```
3. Очистите кэш Next.js:
   ```bash
   cd frontend_next
   rm -rf .next
   ```
4. Запустите оба сервера заново
5. Очистите cookies в браузере (DevTools → Application → Cookies)
6. Попробуйте снова

## Получение помощи

Если проблема не решается, предоставьте:
1. Вывод из консоли браузера (F12 → Console)
2. Вывод из Network tab (F12 → Network → запрос /api/login)
3. Последние строки из `backend_laravel/storage/logs/laravel.log`
4. Результат теста `.\test-admin-login.ps1`
