@echo off
echo ========================================
echo   SEO Management System - Quick Start
echo ========================================
echo.

echo [1/3] Starting Laravel Backend...
cd backend_laravel
start "Laravel Server" cmd /k "php artisan serve"
echo Laravel server starting on http://localhost:8000
echo.

echo [2/3] Waiting for Laravel to start...
timeout /t 3 /nobreak > nul
echo.

echo [3/3] Starting Next.js Frontend...
cd ../frontend_next
start "Next.js Server" cmd /k "npm run dev"
echo Next.js server starting on http://localhost:3000
echo.

echo ========================================
echo   System Status
echo ========================================
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:3000/admin/seo
echo Test:     http://localhost:3000/admin/seo-test
echo.
echo Press any key to exit...
pause > nul