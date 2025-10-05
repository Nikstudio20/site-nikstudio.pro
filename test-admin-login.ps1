# Test Admin Login

Write-Host "=== Testing Admin Login ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Login with username "admin"
Write-Host "Test 1: Login with username 'admin'..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "admin"
        password = "MLCdJIqUJyvFwV1"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/login" `
        -Method POST `
        -Body $loginBody `
        -ContentType "application/json" `
        -UseBasicParsing `
        -ErrorAction Stop

    $data = $response.Content | ConvertFrom-Json
    
    if ($data.success -and $data.token) {
        Write-Host "OK Login successful with username 'admin'" -ForegroundColor Green
        Write-Host "  User: $($data.user.name)" -ForegroundColor Gray
        Write-Host "  Email: $($data.user.email)" -ForegroundColor Gray
        Write-Host "  Token: $($data.token.Substring(0, 20))..." -ForegroundColor Gray
        $token = $data.token
    } else {
        Write-Host "FAIL Login failed" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "FAIL Login request failed" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Update homepage content with token
Write-Host "Test 2: Update homepage content with token..." -ForegroundColor Yellow
try {
    $updateBody = @{
        items = @(
            @{
                section = "hero"
                content_key = "title"
                content_value = "Test from admin user $(Get-Date -Format 'HH:mm:ss')"
                content_type = "text"
                order_index = 0
            }
        )
    } | ConvertTo-Json -Depth 10

    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/homepage-content" `
        -Method POST `
        -Body $updateBody `
        -ContentType "application/json" `
        -Headers @{
            "Authorization" = "Bearer $token"
            "Accept" = "application/json"
        } `
        -UseBasicParsing `
        -ErrorAction Stop

    $data = $response.Content | ConvertFrom-Json
    
    if ($data.success) {
        Write-Host "OK Content updated successfully" -ForegroundColor Green
    } else {
        Write-Host "FAIL Content update failed" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "FAIL Content update request failed" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== All Tests Passed ===" -ForegroundColor Green
Write-Host ""
Write-Host "Login credentials for frontend:" -ForegroundColor Cyan
Write-Host "  Логин: admin" -ForegroundColor White
Write-Host "  Пароль: MLCdJIqUJyvFwV1" -ForegroundColor White
Write-Host ""
Write-Host "Now test in browser:" -ForegroundColor Yellow
Write-Host "1. Go to http://localhost:3000/admin/login" -ForegroundColor White
Write-Host "2. Enter: admin / MLCdJIqUJyvFwV1" -ForegroundColor White
Write-Host "3. Go to http://localhost:3000/admin/homepage-editor" -ForegroundColor White
Write-Host "4. Change Hero title and click Save" -ForegroundColor White
Write-Host ""
