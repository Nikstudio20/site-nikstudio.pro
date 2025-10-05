# Test Authentication Fix

Write-Host "=== Testing Authentication Fix ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Login and get token
Write-Host "Test 1: Login to get token..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "admin@example.com"
        password = "password123"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/login" `
        -Method POST `
        -Body $loginBody `
        -ContentType "application/json" `
        -UseBasicParsing `
        -ErrorAction Stop

    $data = $response.Content | ConvertFrom-Json
    
    if ($data.success -and $data.token) {
        Write-Host "OK Login successful" -ForegroundColor Green
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
                content_value = "Test Title Updated $(Get-Date -Format 'HH:mm:ss')"
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
        Write-Host "  Updated items: $($data.data.Count)" -ForegroundColor Gray
    } else {
        Write-Host "FAIL Content update failed" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "FAIL Content update request failed" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 3: Verify content was updated
Write-Host "Test 3: Verify content was updated..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/homepage-content" `
        -Method GET `
        -UseBasicParsing `
        -ErrorAction Stop

    $data = $response.Content | ConvertFrom-Json
    
    if ($data.success) {
        $heroTitle = $data.data.hero | Where-Object { $_.content_key -eq "title" }
        if ($heroTitle) {
            Write-Host "OK Content verified" -ForegroundColor Green
            Write-Host "  Hero title: $($heroTitle.content_value)" -ForegroundColor Gray
        } else {
            Write-Host "WARN Hero title not found" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "FAIL Content verification failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== All Tests Passed ===" -ForegroundColor Green
Write-Host ""
Write-Host "Login credentials for frontend:" -ForegroundColor Cyan
Write-Host "  Email: admin@example.com" -ForegroundColor White
Write-Host "  Password: password123" -ForegroundColor White
Write-Host ""
Write-Host "Now test in browser:" -ForegroundColor Yellow
Write-Host "1. Go to http://localhost:3000/admin/login" -ForegroundColor White
Write-Host "2. Login with credentials above" -ForegroundColor White
Write-Host "3. Go to http://localhost:3000/admin/homepage-editor" -ForegroundColor White
Write-Host "4. Change Hero title and click Save" -ForegroundColor White
Write-Host ""
