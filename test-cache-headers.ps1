# PowerShell Script to Test Cache Headers
# Usage: .\test-cache-headers.ps1

Write-Host "=== Testing Browser Cache Headers ===" -ForegroundColor Cyan
Write-Host ""

# Test URLs
$backendUrl = "http://localhost:8000"
$frontendUrl = "http://localhost:3000"

function Test-CacheHeaders {
    param(
        [string]$url,
        [string]$description,
        [string]$expectedCache
    )
    
    Write-Host "Testing: $description" -ForegroundColor Yellow
    Write-Host "URL: $url"
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -ErrorAction Stop
        
        $cacheControl = $response.Headers['Cache-Control']
        $expires = $response.Headers['Expires']
        
        if ($cacheControl -like "*$expectedCache*") {
            Write-Host "Cache-Control: $cacheControl" -ForegroundColor Green
            Write-Host "PASS" -ForegroundColor Green
        } else {
            Write-Host "Cache-Control: $cacheControl" -ForegroundColor Red
            Write-Host "FAIL - Expected: $expectedCache" -ForegroundColor Red
        }
        
        if ($expires) {
            Write-Host "Expires: $expires" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "ERROR: Cannot connect to $url" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    
    Write-Host ""
}

# Backend Tests
Write-Host "=== Backend Laravel Tests ===" -ForegroundColor Cyan
Write-Host "Note: Backend must be running on port 8000" -ForegroundColor Gray
Write-Host ""

# Test API endpoint (should not be cached)
Test-CacheHeaders -url "$backendUrl/api/projects" -description "API Endpoint" -expectedCache "no-cache"

# Frontend Tests
Write-Host "=== Frontend Next.js Tests ===" -ForegroundColor Cyan
Write-Host "Note: Frontend must be running on port 3000" -ForegroundColor Gray
Write-Host ""

# Test public images
Test-CacheHeaders -url "$frontendUrl/file.svg" -description "SVG File" -expectedCache "max-age=31536000"

Write-Host "=== Manual Verification Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open browser DevTools with F12" -ForegroundColor White
Write-Host "2. Go to Network tab" -ForegroundColor White
Write-Host "3. Load a page with static assets" -ForegroundColor White
Write-Host "4. Click on a static asset" -ForegroundColor White
Write-Host "5. Check Response Headers for Cache-Control" -ForegroundColor White
Write-Host ""

Write-Host "=== Test Complete ===" -ForegroundColor Cyan
