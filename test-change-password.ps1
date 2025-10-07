# Test change password functionality

Write-Host "Testing change password endpoint..." -ForegroundColor Cyan

$API_URL = "http://localhost:8000"

# Step 1: Login first
Write-Host ""
Write-Host "Step 1: Logging in..." -ForegroundColor Yellow

$loginData = @{
    email = "admin@example.com"
    password = "password"
    remember = $false
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$API_URL/api/login" `
        -Method POST `
        -Headers @{
            "Accept" = "application/json"
            "Content-Type" = "application/json"
        } `
        -Body $loginData `
        -ErrorAction Stop
    
    $loginResult = $loginResponse.Content | ConvertFrom-Json
    $token = $loginResult.token
    
    Write-Host "SUCCESS: Logged in" -ForegroundColor Green
    Write-Host "Token: $($token.Substring(0, 30))..." -ForegroundColor Gray
    
} catch {
    Write-Host "FAILED: Could not login" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# Step 2: Try to change password
Write-Host ""
Write-Host "Step 2: Changing password..." -ForegroundColor Yellow

$changePasswordData = @{
    current_password = "password"
    new_password = "password123"
    new_password_confirmation = "password123"
} | ConvertTo-Json

try {
    $changeResponse = Invoke-WebRequest -Uri "$API_URL/api/admin/change-password" `
        -Method POST `
        -Headers @{
            "Accept" = "application/json"
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        } `
        -Body $changePasswordData `
        -ErrorAction Stop
    
    $changeResult = $changeResponse.Content | ConvertFrom-Json
    
    Write-Host ""
    Write-Host "SUCCESS: Password changed!" -ForegroundColor Green
    Write-Host "Message: $($changeResult.message)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Middleware is working correctly!" -ForegroundColor Green
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $errorBody = $_.ErrorDetails.Message
    
    Write-Host ""
    Write-Host "FAILED: Could not change password" -ForegroundColor Red
    Write-Host "Status Code: $statusCode" -ForegroundColor Red
    Write-Host "Error: $errorBody" -ForegroundColor Red
    Write-Host ""
    
    if ($errorBody -match "refresh.token") {
        Write-Host "Middleware registration issue detected!" -ForegroundColor Yellow
        Write-Host "Check bootstrap/app.php for middleware alias registration" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Note: Password was changed to 'password123'" -ForegroundColor Yellow
Write-Host "Changing it back to 'password'..." -ForegroundColor Yellow

# Step 3: Change password back
$revertData = @{
    current_password = "password123"
    new_password = "password"
    new_password_confirmation = "password"
} | ConvertTo-Json

try {
    $revertResponse = Invoke-WebRequest -Uri "$API_URL/api/admin/change-password" `
        -Method POST `
        -Headers @{
            "Accept" = "application/json"
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        } `
        -Body $revertData `
        -ErrorAction Stop
    
    Write-Host "SUCCESS: Password reverted back to 'password'" -ForegroundColor Green
    
} catch {
    Write-Host "WARNING: Could not revert password" -ForegroundColor Yellow
    Write-Host "You may need to manually reset it" -ForegroundColor Yellow
}

Write-Host ""
