# Test login functionality

Write-Host "Testing login endpoint..." -ForegroundColor Cyan

$API_URL = "http://localhost:8000"

# Test data
$loginData = @{
    email = "admin@example.com"
    password = "password"
    remember = $false
} | ConvertTo-Json

Write-Host "Sending login request..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "$API_URL/api/login" `
        -Method POST `
        -Headers @{
            "Accept" = "application/json"
            "Content-Type" = "application/json"
        } `
        -Body $loginData `
        -ErrorAction Stop
    
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host ""
    Write-Host "SUCCESS: Login successful!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Cyan
    Write-Host "  Token: $($result.token.Substring(0, 50))..." -ForegroundColor Gray
    Write-Host "  User: $($result.user.name) ($($result.user.email))" -ForegroundColor Gray
    Write-Host "  Expires At: $($result.expires_at)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Login is working correctly!" -ForegroundColor Green
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $errorBody = $_.ErrorDetails.Message
    
    Write-Host ""
    Write-Host "FAILED: Login error" -ForegroundColor Red
    Write-Host "Status Code: $statusCode" -ForegroundColor Red
    Write-Host "Error: $errorBody" -ForegroundColor Red
    Write-Host ""
    
    if ($errorBody -match "Carbon") {
        Write-Host "This appears to be a Carbon type error." -ForegroundColor Yellow
        Write-Host "Check that all addMinutes() calls use integer values." -ForegroundColor Yellow
    }
}
