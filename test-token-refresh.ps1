# Test Script for Automatic Token Refresh
# Task 26: Token Refresh Testing

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Token Refresh Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$API_URL = "http://localhost:8000"
$FRONTEND_URL = "http://localhost:3000"

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  Backend API: $API_URL" -ForegroundColor Gray
Write-Host "  Frontend: $FRONTEND_URL" -ForegroundColor Gray
Write-Host ""

# Test 1: Check if backend is running
Write-Host "Test 1: Backend availability check" -ForegroundColor Green
Write-Host "-----------------------------------" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "$API_URL/api/health" -Method GET -TimeoutSec 5 -ErrorAction SilentlyContinue
    Write-Host "Backend is running" -ForegroundColor Green
} catch {
    Write-Host "Backend is not running or not accessible" -ForegroundColor Yellow
    Write-Host "Please start backend: cd backend_laravel && php artisan serve" -ForegroundColor Gray
}

Write-Host ""

# Test 2: Check middleware registration
Write-Host "Test 2: Middleware registration check" -ForegroundColor Green
Write-Host "--------------------------------------" -ForegroundColor Gray

$kernelPath = "backend_laravel/app/Http/Kernel.php"
if (Test-Path $kernelPath) {
    $kernelContent = Get-Content $kernelPath -Raw
    
    if ($kernelContent -match "RefreshTokenMiddleware") {
        Write-Host "RefreshTokenMiddleware is registered" -ForegroundColor Green
    } else {
        Write-Host "RefreshTokenMiddleware NOT found in Kernel.php" -ForegroundColor Yellow
    }
} else {
    Write-Host "Kernel.php not found" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Check CORS configuration
Write-Host "Test 3: CORS configuration check" -ForegroundColor Green
Write-Host "---------------------------------" -ForegroundColor Gray

$corsPath = "backend_laravel/config/cors.php"
if (Test-Path $corsPath) {
    $corsContent = Get-Content $corsPath -Raw
    
    if ($corsContent -match "X-New-Token") {
        Write-Host "X-New-Token is in exposed headers" -ForegroundColor Green
    } else {
        Write-Host "X-New-Token NOT in exposed headers" -ForegroundColor Yellow
        Write-Host "Add 'X-New-Token' to exposed_headers in config/cors.php" -ForegroundColor Red
    }
} else {
    Write-Host "cors.php not found" -ForegroundColor Yellow
}

Write-Host ""

# Test 4: Check frontend hook integration
Write-Host "Test 4: Frontend hook integration check" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

$layoutPath = "frontend_next/src/app/admin/layout.tsx"
if (Test-Path $layoutPath) {
    $layoutContent = Get-Content $layoutPath -Raw
    
    if ($layoutContent -match "useTokenRefresh") {
        Write-Host "useTokenRefresh hook is integrated" -ForegroundColor Green
    } else {
        Write-Host "useTokenRefresh hook NOT found in layout" -ForegroundColor Yellow
    }
} else {
    Write-Host "admin layout.tsx not found" -ForegroundColor Yellow
}

Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Automated tests completed." -ForegroundColor Green
Write-Host "For full testing, perform manual testing in browser." -ForegroundColor Yellow
Write-Host ""
Write-Host "Manual testing steps:" -ForegroundColor Cyan
Write-Host "  1. Open browser and go to http://localhost:3000/admin/login" -ForegroundColor White
Write-Host "  2. Login with admin credentials" -ForegroundColor White
Write-Host "  3. Open DevTools (F12) and check Network tab" -ForegroundColor White
Write-Host "  4. Look for X-New-Token header in API responses" -ForegroundColor White
Write-Host "  5. Check Console for token refresh messages" -ForegroundColor White
Write-Host "  6. Monitor cookies in Application tab" -ForegroundColor White
Write-Host ""
Write-Host "Or open test-token-refresh-monitor.html for interactive monitoring" -ForegroundColor Cyan
Write-Host ""
