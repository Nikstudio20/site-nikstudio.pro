# Test script for Homepage Admin Interface
# This script tests all the requirements for Task 25

Write-Host "=== Homepage Admin Interface Testing ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if backend is running
Write-Host "Test 1: Checking backend API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/homepage-content" -Method GET -UseBasicParsing -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "OK Backend API is running and responding" -ForegroundColor Green
        $content = $response.Content | ConvertFrom-Json
        Write-Host "  - Loaded sections: $($content.data.PSObject.Properties.Name -join ', ')" -ForegroundColor Gray
    }
} catch {
    Write-Host "FAIL Backend API is not responding" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Please start the backend with: cd backend_laravel; php artisan serve" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 2: Check if frontend is running
Write-Host "Test 2: Checking frontend server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "OK Frontend is running" -ForegroundColor Green
    }
} catch {
    Write-Host "FAIL Frontend is not responding" -ForegroundColor Red
    Write-Host "  Please start the frontend with: cd frontend_next; npm run dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 3: Check admin page accessibility
Write-Host "Test 3: Checking admin page accessibility..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/admin/homepage-editor" -Method GET -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "OK Admin page is accessible at /admin/homepage-editor" -ForegroundColor Green
    }
} catch {
    Write-Host "FAIL Admin page is not accessible" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 4: Verify content structure
Write-Host "Test 4: Verifying content structure..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/homepage-content" -Method GET -UseBasicParsing -ErrorAction Stop
    $data = ($response.Content | ConvertFrom-Json).data
    
    $requiredSections = @('hero', 'main_content', 'services_1', 'services_2', 'services_3', 'services_4', 'services_5', 'services_6', 'services_7', 'testimonials_1', 'testimonials_2', 'testimonials_3', 'testimonials_4', 'testimonials_5', 'testimonials_6')
    $missingSections = @()
    
    foreach ($section in $requiredSections) {
        if (-not $data.PSObject.Properties.Name.Contains($section)) {
            $missingSections += $section
        }
    }
    
    if ($missingSections.Count -eq 0) {
        Write-Host "OK All required sections are present" -ForegroundColor Green
    } else {
        Write-Host "FAIL Missing sections: $($missingSections -join ', ')" -ForegroundColor Red
    }
} catch {
    Write-Host "FAIL Failed to verify content structure" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 5: Check image validation
Write-Host "Test 5: Testing image validation..." -ForegroundColor Yellow
Write-Host "  Note: This requires manual testing in the browser" -ForegroundColor Gray
Write-Host "  - Try uploading an image larger than 2MB" -ForegroundColor Gray
Write-Host "  - Try uploading a non-image file" -ForegroundColor Gray
Write-Host "  - Verify error messages appear in Russian" -ForegroundColor Gray

Write-Host ""

# Summary
Write-Host "=== Test Summary ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Automated tests completed. Please perform manual testing:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Manual Test Checklist:" -ForegroundColor Cyan
Write-Host "1. Open http://localhost:3000/admin/homepage-editor" -ForegroundColor White
Write-Host "2. Verify current content loads in all tabs (Hero, Content, Services, Testimonials)" -ForegroundColor White
Write-Host "3. Change a text field and click Save Changes button" -ForegroundColor White
Write-Host "4. Verify success message appears for 3 seconds" -ForegroundColor White
Write-Host "5. Upload a new image (less than 2MB, jpg/png/webp)" -ForegroundColor White
Write-Host "6. Verify image preview updates" -ForegroundColor White
Write-Host "7. Try uploading an image larger than 2MB and verify error message" -ForegroundColor White
Write-Host "8. Try uploading invalid file type and verify error message" -ForegroundColor White
Write-Host "9. Open http://localhost:3000 and verify changes appear on homepage" -ForegroundColor White
Write-Host "10. Verify Cancel button reverts unsaved changes" -ForegroundColor White
Write-Host ""
Write-Host "All error messages should be in Russian!" -ForegroundColor Yellow
Write-Host ""
