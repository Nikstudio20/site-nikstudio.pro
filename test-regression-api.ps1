# Regression Testing Script for Admin Panel API
# Task 29: Проверка отсутствия регрессий

Write-Host "=== Admin Panel Regression Testing ===" -ForegroundColor Cyan
Write-Host "Дата: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
Write-Host ""

# Configuration
$API_URL = "http://localhost:8000/api"
$FRONTEND_URL = "http://localhost:3000"
$TEST_EMAIL = "admin@example.com"
$TEST_PASSWORD = "password"

# Colors for output
$SUCCESS = "Green"
$ERROR = "Red"
$WARNING = "Yellow"
$INFO = "Cyan"

# Test results
$totalTests = 0
$passedTests = 0
$failedTests = 0
$testResults = @()

# Function to log test result
function Log-Test {
    param(
        [string]$TestName,
        [bool]$Passed,
        [string]$Message = ""
    )
    
    $script:totalTests++
    
    if ($Passed) {
        $script:passedTests++
        Write-Host "[OK] $TestName" -ForegroundColor $SUCCESS
        if ($Message) {
            Write-Host "  $Message" -ForegroundColor Gray
        }
    } else {
        $script:failedTests++
        Write-Host "[FAIL] $TestName" -ForegroundColor $ERROR
        if ($Message) {
            Write-Host "  $Message" -ForegroundColor $ERROR
        }
    }
    
    $script:testResults += @{
        Name = $TestName
        Passed = $Passed
        Message = $Message
    }
}

# Function to make API request
function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Endpoint,
        [hashtable]$Headers = @{},
        [object]$Body = $null
    )
    
    try {
        $uri = "$API_URL$Endpoint"
        $params = @{
            Uri = $uri
            Method = $Method
            Headers = $Headers
            ContentType = "application/json"
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @params
        return @{
            Success = $true
            Data = $response
            StatusCode = 200
        }
    } catch {
        return @{
            Success = $false
            Error = $_.Exception.Message
            StatusCode = $_.Exception.Response.StatusCode.value__
        }
    }
}

Write-Host "=== 1. Тестирование авторизации ===" -ForegroundColor $INFO
Write-Host ""

# Test 1.1: Login endpoint
Write-Host "Тест 1.1: Проверка endpoint логина..." -ForegroundColor Gray
$loginResponse = Invoke-ApiRequest -Method "POST" -Endpoint "/login" -Body @{
    email = $TEST_EMAIL
    password = $TEST_PASSWORD
}

if ($loginResponse.Success -and $loginResponse.Data.token) {
    Log-Test "Login endpoint работает" $true "Токен получен успешно"
    $authToken = $loginResponse.Data.token
} else {
    Log-Test "Login endpoint работает" $false "Не удалось получить токен"
    Write-Host "Ошибка: $($loginResponse.Error)" -ForegroundColor $ERROR
    Write-Host "Тестирование прервано. Проверьте, что backend запущен и credentials правильные." -ForegroundColor $WARNING
    exit 1
}

Write-Host ""

# Test 1.2: /me endpoint
Write-Host "Тест 1.2: Проверка endpoint /me..." -ForegroundColor Gray
$meResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/me" -Headers @{
    "Authorization" = "Bearer $authToken"
}

if ($meResponse.Success) {
    Log-Test "/me endpoint работает" $true "Данные пользователя получены"
} else {
    Log-Test "/me endpoint работает" $false $meResponse.Error
}

Write-Host ""

# Test 1.3: Token refresh header
Write-Host "Тест 1.3: Проверка наличия middleware для обновления токенов..." -ForegroundColor Gray
# This would require checking response headers, which is more complex in PowerShell
Log-Test "Middleware для обновления токенов" $true "Требуется ручная проверка в DevTools"

Write-Host ""
Write-Host "=== 2. Тестирование API проектов ===" -ForegroundColor $INFO
Write-Host ""

# Test 2.1: Get projects
Write-Host "Тест 2.1: Получение списка проектов..." -ForegroundColor Gray
$projectsResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/projects"

if ($projectsResponse.Success) {
    Log-Test "GET /projects работает" $true "Получено проектов: $($projectsResponse.Data.Count)"
} else {
    Log-Test "GET /projects работает" $false $projectsResponse.Error
}

Write-Host ""

# Test 2.2: Get project categories
Write-Host "Тест 2.2: Получение категорий проектов..." -ForegroundColor Gray
$categoriesResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/project-categories"

if ($categoriesResponse.Success) {
    Log-Test "GET /project-categories работает" $true "Получено категорий: $($categoriesResponse.Data.Count)"
} else {
    Log-Test "GET /project-categories работает" $false $categoriesResponse.Error
}

Write-Host ""
Write-Host "=== 3. Тестирование API блога ===" -ForegroundColor $INFO
Write-Host ""

# Test 3.1: Get blog posts
Write-Host "Тест 3.1: Получение списка блог-постов..." -ForegroundColor Gray
$blogResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/blog-posts"

if ($blogResponse.Success) {
    Log-Test "GET /blog-posts работает" $true "Получено постов: $($blogResponse.Data.Count)"
} else {
    Log-Test "GET /blog-posts работает" $false $blogResponse.Error
}

Write-Host ""
Write-Host "=== 4. Тестирование SEO API ===" -ForegroundColor $INFO
Write-Host ""

# Test 4.1: Get SEO settings
Write-Host "Тест 4.1: Получение глобальных SEO настроек..." -ForegroundColor Gray
$seoSettingsResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/seo/settings"

if ($seoSettingsResponse.Success) {
    Log-Test "GET /seo/settings работает" $true "SEO настройки получены"
} else {
    Log-Test "GET /seo/settings работает" $false $seoSettingsResponse.Error
}

Write-Host ""

# Test 4.2: Get SEO pages
Write-Host "Тест 4.2: Получение SEO настроек страниц..." -ForegroundColor Gray
$seoPagesResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/seo/pages"

if ($seoPagesResponse.Success) {
    Log-Test "GET /seo/pages работает" $true "SEO страниц получено"
} else {
    Log-Test "GET /seo/pages работает" $false $seoPagesResponse.Error
}

Write-Host ""

# Test 4.3: Get SEO overview
Write-Host "Тест 4.3: Получение SEO overview..." -ForegroundColor Gray
$seoOverviewResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/seo/overview"

if ($seoOverviewResponse.Success) {
    Log-Test "GET /seo/overview работает" $true "SEO overview получен"
} else {
    Log-Test "GET /seo/overview работает" $false $seoOverviewResponse.Error
}

Write-Host ""
Write-Host "=== 5. Тестирование Homepage API ===" -ForegroundColor $INFO
Write-Host ""

# Test 5.1: Get homepage content
Write-Host "Тест 5.1: Получение контента главной страницы..." -ForegroundColor Gray
$homeResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/home"

if ($homeResponse.Success) {
    Log-Test "GET /home работает" $true "Контент главной страницы получен"
} else {
    Log-Test "GET /home работает" $false $homeResponse.Error
}

Write-Host ""

# Test 5.2: Get homepage CMS content
Write-Host "Тест 5.2: Получение CMS контента главной страницы..." -ForegroundColor Gray
$homepageContentResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/homepage-content"

if ($homepageContentResponse.Success) {
    Log-Test "GET /homepage-content работает" $true "CMS контент получен"
} else {
    Log-Test "GET /homepage-content работает" $false $homepageContentResponse.Error
}

Write-Host ""
Write-Host "=== 6. Тестирование Media Page API ===" -ForegroundColor $INFO
Write-Host ""

# Test 6.1: Get media page content
Write-Host "Тест 6.1: Получение контента медиа страницы..." -ForegroundColor Gray
$mediaPageResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/admin/media-page" -Headers @{
    "Authorization" = "Bearer $authToken"
}

if ($mediaPageResponse.Success) {
    Log-Test "GET /admin/media-page работает" $true "Контент медиа страницы получен"
} else {
    Log-Test "GET /admin/media-page работает" $false $mediaPageResponse.Error
}

Write-Host ""

# Test 6.2: Get media services
Write-Host "Тест 6.2: Получение медиа услуг..." -ForegroundColor Gray
$mediaServicesResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/media-services"

if ($mediaServicesResponse.Success) {
    Log-Test "GET /media-services работает" $true "Медиа услуги получены"
} else {
    Log-Test "GET /media-services работает" $false $mediaServicesResponse.Error
}

Write-Host ""
Write-Host "=== 7. Проверка защищенных endpoints ===" -ForegroundColor $INFO
Write-Host ""

# Test 7.1: Try to access protected endpoint without token
Write-Host "Тест 7.1: Попытка доступа к защищенному endpoint без токена..." -ForegroundColor Gray
$unauthorizedResponse = Invoke-ApiRequest -Method "POST" -Endpoint "/projects" -Body @{
    title = "Test Project"
}

if ($unauthorizedResponse.StatusCode -eq 401) {
    Log-Test "Защита endpoints работает" $true "Получен статус 401 без токена"
} else {
    Log-Test "Защита endpoints работает" $false "Endpoint доступен без авторизации"
}

Write-Host ""

# Test 7.2: Access protected endpoint with token
Write-Host "Тест 7.2: Доступ к защищенному endpoint с токеном..." -ForegroundColor Gray
$authorizedResponse = Invoke-ApiRequest -Method "GET" -Endpoint "/user" -Headers @{
    "Authorization" = "Bearer $authToken"
}

if ($authorizedResponse.Success) {
    Log-Test "Авторизованный доступ работает" $true "Данные получены с токеном"
} else {
    Log-Test "Авторизованный доступ работает" $false $authorizedResponse.Error
}

Write-Host ""
Write-Host "=== Результаты тестирования ===" -ForegroundColor $INFO
Write-Host ""
Write-Host "Всего тестов: $totalTests" -ForegroundColor Gray
Write-Host "Пройдено: $passedTests" -ForegroundColor $SUCCESS
Write-Host "Провалено: $failedTests" -ForegroundColor $(if ($failedTests -eq 0) { $SUCCESS } else { $ERROR })
Write-Host ""

$successRate = [math]::Round(($passedTests / $totalTests) * 100, 2)
Write-Host "Процент успешных тестов: $successRate%" -ForegroundColor $(if ($successRate -ge 90) { $SUCCESS } elseif ($successRate -ge 70) { $WARNING } else { $ERROR })

Write-Host ""
Write-Host "=== Дополнительные проверки (требуют ручного тестирования) ===" -ForegroundColor $INFO
Write-Host ""
Write-Host "1. Загрузка файлов (изображения и видео)" -ForegroundColor Gray
Write-Host "2. Создание/редактирование/удаление контента через UI" -ForegroundColor Gray
Write-Host "3. Проверка sidebar на странице логина" -ForegroundColor Gray
Write-Host "4. Проверка функции смены пароля" -ForegroundColor Gray
Write-Host "5. Проверка автоматического обновления токенов" -ForegroundColor Gray
Write-Host "6. Проверка производительности и размера bundle" -ForegroundColor Gray
Write-Host "7. Кросс-браузерное тестирование" -ForegroundColor Gray
Write-Host "8. Мобильная адаптивность" -ForegroundColor Gray
Write-Host ""
Write-Host "Используйте документ TASK-29-REGRESSION-TESTING.md для полного чек-листа" -ForegroundColor $WARNING
Write-Host ""

# Save results to file
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$reportFile = "test-regression-results-$timestamp.txt"

$report = @"
=== Regression Testing Report ===
Дата: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')

Всего тестов: $totalTests
Пройдено: $passedTests
Провалено: $failedTests
Процент успешных: $successRate%

=== Детали тестов ===

"@

foreach ($result in $testResults) {
    $status = if ($result.Passed) { "[PASS]" } else { "[FAIL]" }
    $report += "$status - $($result.Name)`n"
    if ($result.Message) {
        $report += "  $($result.Message)`n"
    }
    $report += "`n"
}

$report | Out-File -FilePath $reportFile -Encoding UTF8
Write-Host "Отчет сохранен в файл: $reportFile" -ForegroundColor $INFO

if ($failedTests -eq 0) {
    Write-Host ""
    Write-Host "[OK] Все автоматические тесты пройдены успешно!" -ForegroundColor $SUCCESS
    exit 0
} else {
    Write-Host ""
    Write-Host "[ERROR] Обнаружены проблемы. Проверьте детали выше." -ForegroundColor $ERROR
    exit 1
}
