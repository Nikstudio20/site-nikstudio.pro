# Test Script for Automatic Token Refresh - Task 26
# Simple version without encoding issues

Write-Host "========================================"
Write-Host "Token Refresh Testing - Task 26"
Write-Host "========================================"
Write-Host ""

# Configuration
$API_URL = "http://localhost:8000"
$FRONTEND_URL = "http://localhost:3000"

Write-Host "Configuration:"
Write-Host "  Backend API: $API_URL"
Write-Host "  Frontend: $FRONTEND_URL"
Write-Host ""

# Test 1: Check if backend is running
Write-Host "Test 1: Check Backend Status"
Write-Host "----------------------------------------"

try {
    $healthCheck = Invoke-WebRequest -Uri "$API_URL/api/health" -Method GET -TimeoutSec 5 -ErrorAction SilentlyContinue
    Write-Host "[OK] Backend is running" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Backend may not be running at $API_URL" -ForegroundColor Yellow
    Write-Host "  Please start backend: cd backend_laravel && php artisan serve" -ForegroundColor Gray
}

Write-Host ""

# Test 2: Check middleware file exists
Write-Host "Test 2: Check RefreshTokenMiddleware"
Write-Host "----------------------------------------"

$middlewarePath = "backend_laravel\app\Http\Middleware\RefreshTokenMiddleware.php"
if (Test-Path $middlewarePath) {
    Write-Host "[OK] RefreshTokenMiddleware.php exists" -ForegroundColor Green
    
    $middlewareContent = Get-Content $middlewarePath -Raw
    if ($middlewareContent -match "X-New-Token") {
        Write-Host "[OK] Middleware sets X-New-Token header" -ForegroundColor Green
    }
    if ($middlewareContent -match "X-Token-Expires-At") {
        Write-Host "[OK] Middleware sets X-Token-Expires-At header" -ForegroundColor Green
    }
} else {
    Write-Host "[ERROR] RefreshTokenMiddleware.php not found" -ForegroundColor Red
}

Write-Host ""

# Test 3: Check API client
Write-Host "Test 3: Check API Client Configuration"
Write-Host "----------------------------------------"

$apiClientPath = "frontend_next\src\lib\api.ts"
if (Test-Path $apiClientPath) {
    Write-Host "[OK] api.ts exists" -ForegroundColor Green
    
    $apiContent = Get-Content $apiClientPath -Raw
    if ($apiContent -match "X-New-Token") {
        Write-Host "[OK] API client handles X-New-Token header" -ForegroundColor Green
    }
    if ($apiContent -match "response\.headers\['x-new-token'\]") {
        Write-Host "[OK] Response interceptor configured" -ForegroundColor Green
    }
} else {
    Write-Host "[ERROR] api.ts not found" -ForegroundColor Red
}

Write-Host ""

# Test 4: Check useTokenRefresh hook
Write-Host "Test 4: Check useTokenRefresh Hook"
Write-Host "----------------------------------------"

$hookPath = "frontend_next\src\hooks\useTokenRefresh.ts"
if (Test-Path $hookPath) {
    Write-Host "[OK] useTokenRefresh.ts exists" -ForegroundColor Green
    
    $hookContent = Get-Content $hookPath -Raw
    if ($hookContent -match "5 \* 60 \* 1000") {
        Write-Host "[OK] Hook checks token every 5 minutes" -ForegroundColor Green
    }
    if ($hookContent -match "30 \* 60 \* 1000") {
        Write-Host "[OK] Hook refreshes 30 minutes before expiration" -ForegroundColor Green
    }
} else {
    Write-Host "[ERROR] useTokenRefresh.ts not found" -ForegroundColor Red
}

Write-Host ""

# Test 5: Check CORS configuration
Write-Host "Test 5: Check CORS Configuration"
Write-Host "----------------------------------------"

$corsPath = "backend_laravel\config\cors.php"
if (Test-Path $corsPath) {
    Write-Host "[OK] cors.php exists" -ForegroundColor Green
    
    $corsContent = Get-Content $corsPath -Raw
    if ($corsContent -match "X-New-Token") {
        Write-Host "[OK] X-New-Token in exposed_headers" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] X-New-Token may not be in exposed_headers" -ForegroundColor Yellow
    }
    if ($corsContent -match "supports_credentials.*true") {
        Write-Host "[OK] supports_credentials is true" -ForegroundColor Green
    }
} else {
    Write-Host "[ERROR] cors.php not found" -ForegroundColor Red
}

Write-Host ""

# Test 6: Check admin layout integration
Write-Host "Test 6: Check Admin Layout Integration"
Write-Host "----------------------------------------"

$layoutPath = "frontend_next\src\app\admin\layout.tsx"
if (Test-Path $layoutPath) {
    Write-Host "[OK] admin layout.tsx exists" -ForegroundColor Green
    
    $layoutContent = Get-Content $layoutPath -Raw
    if ($layoutContent -match "useTokenRefresh") {
        Write-Host "[OK] useTokenRefresh hook integrated in layout" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] useTokenRefresh may not be integrated" -ForegroundColor Yellow
    }
} else {
    Write-Host "[ERROR] admin layout.tsx not found" -ForegroundColor Red
}

Write-Host ""

# Summary
Write-Host "========================================"
Write-Host "Testing Summary"
Write-Host "========================================"
Write-Host ""
Write-Host "Automated checks completed." -ForegroundColor Green
Write-Host ""
Write-Host "Manual Testing Instructions:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start both servers:" -ForegroundColor White
Write-Host "   Backend:  cd backend_laravel && php artisan serve"
Write-Host "   Frontend: cd frontend_next && npm run dev"
Write-Host ""
Write-Host "2. Open browser and navigate to:" -ForegroundColor White
Write-Host "   http://localhost:3000/admin/login"
Write-Host ""
Write-Host "3. Open DevTools (F12) and check:" -ForegroundColor White
Write-Host "   - Network tab: Look for X-New-Token in response headers"
Write-Host "   - Console tab: Look for token refresh messages"
Write-Host "   - Application tab: Check admin-token cookie updates"
Write-Host ""
Write-Host "4. For detailed monitoring, open:" -ForegroundColor White
Write-Host "   test-token-refresh-monitor.html in your browser"
Write-Host ""
Write-Host "5. To simulate token expiration:" -ForegroundColor White
Write-Host "   In browser console, run:"
Write-Host "   const exp = new Date(Date.now() + 25 * 60 * 1000);"
Write-Host "   localStorage.setItem('admin-token-expires-at', exp.toISOString());"
Write-Host ""
Write-Host "For detailed testing guide, see:" -ForegroundColor Cyan
Write-Host "  TASK-26-TOKEN-REFRESH-TESTING.md"
Write-Host ""
