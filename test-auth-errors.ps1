# Test script for authorization error handling - Task 27

Write-Host "========================================"
Write-Host "Authorization Error Handling Test"
Write-Host "Task 27 from admin-auth-improvements"
Write-Host "========================================"
Write-Host ""

$API_URL = "http://localhost:8000"

# Test 1: Check 401 error without token
function Test-401Error {
    Write-Host "Test 1: Checking 401 error" -ForegroundColor Cyan
    Write-Host "Sending request without token..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "$API_URL/api/me" -Method GET -Headers @{"Accept" = "application/json"} -ErrorAction Stop
        Write-Host "FAIL: Expected 401, got $($response.StatusCode)" -ForegroundColor Red
        return $false
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 401) {
            Write-Host "SUCCESS: Got 401 Unauthorized" -ForegroundColor Green
            return $true
        } else {
            Write-Host "FAIL: Expected 401, got $statusCode" -ForegroundColor Red
            return $false
        }
    }
}

# Test 2: Check error handling in API client
function Test-ApiClientHandling {
    Write-Host ""
    Write-Host "Test 2: Checking API client error handling" -ForegroundColor Cyan
    
    $apiFilePath = "frontend_next/src/lib/api.ts"
    
    if (-not (Test-Path $apiFilePath)) {
        Write-Host "FAIL: File not found" -ForegroundColor Red
        return $false
    }
    
    $content = Get-Content $apiFilePath -Raw -Encoding UTF8
    
    $checks = @(
        "error.response?.status === 401",
        "error.response?.status === 403",
        "removeTokenFromCookie",
        "window.location.href",
        "interceptors.response.use"
    )
    
    $allPassed = $true
    
    foreach ($check in $checks) {
        if ($content -match [regex]::Escape($check)) {
            Write-Host "  PASS: Found $check" -ForegroundColor Green
        } else {
            Write-Host "  FAIL: Missing $check" -ForegroundColor Red
            $allPassed = $false
        }
    }
    
    return $allPassed
}

# Main execution
Write-Host "Starting automated tests..." -ForegroundColor Cyan
Write-Host ""

$test1 = Test-401Error
$test2 = Test-ApiClientHandling

Write-Host ""
Write-Host "========================================"
Write-Host "TEST RESULTS"
Write-Host "========================================"
Write-Host ""

$passed = 0
$total = 2

if ($test1) { 
    Write-Host "Test 1: PASSED" -ForegroundColor Green
    $passed++
} else { 
    Write-Host "Test 1: FAILED" -ForegroundColor Red
}

if ($test2) { 
    Write-Host "Test 2: PASSED" -ForegroundColor Green
    $passed++
} else { 
    Write-Host "Test 2: FAILED" -ForegroundColor Red
}

Write-Host ""
Write-Host "Result: $passed of $total tests passed"
Write-Host ""
Write-Host "For interactive testing, open:"
Write-Host "  test-auth-error-handling.html"
Write-Host ""
