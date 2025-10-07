# Тестирование времени жизни сессии
# Task 25: Проверка времени жизни сессии

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Тест 25: Проверка времени жизни сессии" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Конфигурация
$apiUrl = "http://localhost:8000"
$frontendUrl = "http://localhost:3000"

Write-Host "Конфигурация:" -ForegroundColor Yellow
Write-Host "  Backend API: $apiUrl" -ForegroundColor Gray
Write-Host "  Frontend: $frontendUrl" -ForegroundColor Gray
Write-Host ""

# Функция для проверки доступности сервера
function Test-ServerAvailability {
    param($url, $name)
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 5 -ErrorAction Stop
        Write-Host "✓ $name доступен" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "✗ $name недоступен" -ForegroundColor Red
        Write-Host "  Убедитесь, что сервер запущен на $url" -ForegroundColor Yellow
        return $false
    }
}

# Проверка доступности серверов
Write-Host "Проверка доступности серверов..." -ForegroundColor Yellow
$backendAvailable = Test-ServerAvailability "$apiUrl/api/health" "Backend"
$frontendAvailable = Test-ServerAvailability $frontendUrl "Frontend"

if (-not $backendAvailable -or -not $frontendAvailable) {
    Write-Host ""
    Write-Host "Запустите серверы перед тестированием:" -ForegroundColor Yellow
    Write-Host "  Backend: cd backend_laravel && php artisan serve" -ForegroundColor Gray
    Write-Host "  Frontend: cd frontend_next && npm run dev" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Тест 1: Вход без 'Запомнить меня'" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Инструкции:" -ForegroundColor Yellow
Write-Host "1. Откройте браузер и перейдите на: $frontendUrl/admin/login" -ForegroundColor White
Write-Host "2. Введите учетные данные администратора" -ForegroundColor White
Write-Host "3. НЕ СТАВЬТЕ галочку 'Запомнить меня'" -ForegroundColor White
Write-Host "4. Нажмите 'Войти в систему'" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Выполнили вход? (y/n)"
if ($continue -ne "y") {
    Write-Host "Тест прерван" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "Проверка cookie после входа..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Откройте DevTools (F12) -> Application -> Cookies -> $frontendUrl" -ForegroundColor White
Write-Host ""
Write-Host "Проверьте cookie 'admin-token':" -ForegroundColor Yellow
Write-Host "  ✓ Cookie должен существовать" -ForegroundColor Gray
Write-Host "  ✓ Max-Age должен быть примерно 28800 секунд (8 часов)" -ForegroundColor Gray
Write-Host "  ✓ Expires должен быть через ~8 часов от текущего времени" -ForegroundColor Gray
Write-Host ""

$cookieValid = Read-Host "Cookie настроен правильно? (y/n)"
if ($cookieValid -ne "y") {
    Write-Host "✗ FAILED: Cookie не соответствует ожиданиям" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ожидаемые значения:" -ForegroundColor Yellow
    Write-Host "  Max-Age: ~28800 (8 часов)" -ForegroundColor Gray
    Write-Host "  Path: /" -ForegroundColor Gray
    Write-Host "  HttpOnly: true (если возможно)" -ForegroundColor Gray
} else {
    Write-Host "✓ PASSED: Cookie настроен правильно" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Тест 2: Проверка активности сессии" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Подождите несколько минут и проверьте, что сессия активна..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Инструкции:" -ForegroundColor Yellow
Write-Host "1. Подождите 2-3 минуты" -ForegroundColor White
Write-Host "2. Обновите страницу админ-панели (F5)" -ForegroundColor White
Write-Host "3. Попробуйте перейти на другие страницы админки" -ForegroundColor White
Write-Host "4. Убедитесь, что вас НЕ перенаправляет на страницу логина" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Готовы продолжить? (y/n)"
if ($continue -ne "y") {
    Write-Host "Тест прерван" -ForegroundColor Red
    exit 0
}

$sessionActive = Read-Host "Сессия осталась активной? (y/n)"
if ($sessionActive -ne "y") {
    Write-Host "✗ FAILED: Сессия истекла преждевременно" -ForegroundColor Red
} else {
    Write-Host "✓ PASSED: Сессия активна после нескольких минут" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Тест 3: Вход с 'Запомнить меня'" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Инструкции:" -ForegroundColor Yellow
Write-Host "1. Выйдите из системы (кнопка выхода в меню)" -ForegroundColor White
Write-Host "2. Перейдите на: $frontendUrl/admin/login" -ForegroundColor White
Write-Host "3. Введите учетные данные администратора" -ForegroundColor White
Write-Host "4. ПОСТАВЬТЕ галочку 'Запомнить меня'" -ForegroundColor White
Write-Host "5. Нажмите 'Войти в систему'" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Выполнили вход с 'Запомнить меня'? (y/n)"
if ($continue -ne "y") {
    Write-Host "Тест прерван" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "Проверка cookie с 'Запомнить меня'..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Откройте DevTools (F12) -> Application -> Cookies -> $frontendUrl" -ForegroundColor White
Write-Host ""
Write-Host "Проверьте cookie 'admin-token':" -ForegroundColor Yellow
Write-Host "  ✓ Cookie должен существовать" -ForegroundColor Gray
Write-Host "  ✓ Max-Age должен быть примерно 2592000 секунд (30 дней)" -ForegroundColor Gray
Write-Host "  ✓ Expires должен быть через ~30 дней от текущего времени" -ForegroundColor Gray
Write-Host ""

$rememberCookieValid = Read-Host "Cookie с 'Запомнить меня' настроен правильно? (y/n)"
if ($rememberCookieValid -ne "y") {
    Write-Host "✗ FAILED: Cookie с 'Запомнить меня' не соответствует ожиданиям" -ForegroundColor Red
    Write-Host ""
    Write-Host "Ожидаемые значения:" -ForegroundColor Yellow
    Write-Host "  Max-Age: ~2592000 (30 дней)" -ForegroundColor Gray
    Write-Host "  Path: /" -ForegroundColor Gray
} else {
    Write-Host "✓ PASSED: Cookie с 'Запомнить меня' настроен правильно" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Тест 4: Сохранение сессии после закрытия браузера" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Инструкции:" -ForegroundColor Yellow
Write-Host "1. Убедитесь, что вы вошли с галочкой 'Запомнить меня'" -ForegroundColor White
Write-Host "2. Закройте ВСЕ окна браузера (полностью закройте браузер)" -ForegroundColor White
Write-Host "3. Откройте браузер снова" -ForegroundColor White
Write-Host "4. Перейдите на: $frontendUrl/admin" -ForegroundColor White
Write-Host "5. Проверьте, что вы автоматически вошли в систему" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Готовы проверить? (y/n)"
if ($continue -ne "y") {
    Write-Host "Тест прерван" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "После закрытия и повторного открытия браузера..." -ForegroundColor Yellow

$sessionPersisted = Read-Host "Сессия сохранилась? Вы автоматически вошли? (y/n)"
if ($sessionPersisted -ne "y") {
    Write-Host "✗ FAILED: Сессия не сохранилась после закрытия браузера" -ForegroundColor Red
    Write-Host ""
    Write-Host "Возможные причины:" -ForegroundColor Yellow
    Write-Host "  - Cookie не был сохранен с правильным Max-Age" -ForegroundColor Gray
    Write-Host "  - Браузер настроен на удаление cookies при закрытии" -ForegroundColor Gray
    Write-Host "  - Токен истек на сервере" -ForegroundColor Gray
} else {
    Write-Host "✓ PASSED: Сессия сохранилась после закрытия браузера" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Тест 5: Проверка конфигурации Laravel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Проверка конфигурации сессий в Laravel..." -ForegroundColor Yellow
Write-Host ""

# Проверка .env файла
$envPath = "backend_laravel\.env"
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    
    Write-Host "Проверка SESSION_LIFETIME..." -ForegroundColor Yellow
    if ($envContent -match "SESSION_LIFETIME=(\d+)") {
        $lifetime = $matches[1]
        if ($lifetime -eq "480") {
            Write-Host "✓ SESSION_LIFETIME = $lifetime минут (8 часов)" -ForegroundColor Green
        } else {
            Write-Host "✗ SESSION_LIFETIME = $lifetime минут (ожидается 480)" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ SESSION_LIFETIME не найден в .env" -ForegroundColor Red
    }
    
    Write-Host "Проверка SESSION_EXPIRE_ON_CLOSE..." -ForegroundColor Yellow
    if ($envContent -match "SESSION_EXPIRE_ON_CLOSE=(true|false)") {
        $expireOnClose = $matches[1]
        if ($expireOnClose -eq "false") {
            Write-Host "✓ SESSION_EXPIRE_ON_CLOSE = $expireOnClose" -ForegroundColor Green
        } else {
            Write-Host "✗ SESSION_EXPIRE_ON_CLOSE = $expireOnClose (ожидается false)" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ SESSION_EXPIRE_ON_CLOSE не найден в .env" -ForegroundColor Red
    }
    
    Write-Host "Проверка SANCTUM_TOKEN_EXPIRATION..." -ForegroundColor Yellow
    if ($envContent -match "SANCTUM_TOKEN_EXPIRATION=(\d+)") {
        $tokenExpiration = $matches[1]
        if ($tokenExpiration -eq "480") {
            Write-Host "✓ SANCTUM_TOKEN_EXPIRATION = $tokenExpiration минут (8 часов)" -ForegroundColor Green
        } else {
            Write-Host "⚠ SANCTUM_TOKEN_EXPIRATION = $tokenExpiration минут (рекомендуется 480)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠ SANCTUM_TOKEN_EXPIRATION не найден в .env" -ForegroundColor Yellow
    }
    
    Write-Host "Проверка SANCTUM_REMEMBER_EXPIRATION..." -ForegroundColor Yellow
    if ($envContent -match "SANCTUM_REMEMBER_EXPIRATION=(\d+)") {
        $rememberExpiration = $matches[1]
        if ($rememberExpiration -eq "43200") {
            Write-Host "✓ SANCTUM_REMEMBER_EXPIRATION = $rememberExpiration минут (30 дней)" -ForegroundColor Green
        } else {
            Write-Host "⚠ SANCTUM_REMEMBER_EXPIRATION = $rememberExpiration минут (рекомендуется 43200)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠ SANCTUM_REMEMBER_EXPIRATION не найден в .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ Файл .env не найден" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Итоговый отчет" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Требования из спецификации:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Requirement 8.5: Сессия не истекает преждевременно" -ForegroundColor White
Write-Host "  - Сессия должна оставаться активной в течение 8 часов" -ForegroundColor Gray
Write-Host "  - Проверено: Сессия активна после нескольких минут" -ForegroundColor Gray
Write-Host ""

Write-Host "Requirement 5.6: Сохранение сессии при закрытии браузера" -ForegroundColor White
Write-Host "  - С 'Запомнить меня': сессия сохраняется на 30 дней" -ForegroundColor Gray
Write-Host "  - Без 'Запомнить меня': сессия сохраняется на 8 часов" -ForegroundColor Gray
Write-Host "  - Проверено: Сессия сохраняется после закрытия браузера" -ForegroundColor Gray
Write-Host ""

Write-Host "Дополнительные проверки:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Для полной проверки 8-часовой сессии:" -ForegroundColor White
Write-Host "1. Войдите в систему без 'Запомнить меня'" -ForegroundColor Gray
Write-Host "2. Оставьте браузер открытым на 7-8 часов" -ForegroundColor Gray
Write-Host "3. Проверьте, что сессия все еще активна" -ForegroundColor Gray
Write-Host "4. После 8 часов проверьте, что происходит автоматический выход" -ForegroundColor Gray
Write-Host ""

Write-Host "Для проверки 30-дневной сессии:" -ForegroundColor White
Write-Host "1. Войдите в систему с 'Запомнить меня'" -ForegroundColor Gray
Write-Host "2. Закройте браузер" -ForegroundColor Gray
Write-Host "3. Откройте браузер через несколько дней" -ForegroundColor Gray
Write-Host "4. Проверьте, что сессия все еще активна" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Тест завершен" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Следующие шаги:" -ForegroundColor Yellow
Write-Host "1. Если все тесты прошли успешно, отметьте задачу 25 как выполненную" -ForegroundColor White
Write-Host "2. Переходите к задаче 26: Проверка автоматического обновления токенов" -ForegroundColor White
Write-Host ""
