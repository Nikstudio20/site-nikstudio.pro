# Lighthouse Audit Script for Next.js Performance Optimization
# Usage: .\scripts\run-lighthouse-audit.ps1 [phase-name]

param(
    [string]$Phase = "phase-1"
)

$OutputDir = ".\lighthouse-reports\$Phase"
$SiteUrl = "http://localhost:3000"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Running Lighthouse Audit - $Phase" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if server is running
try {
    $response = Invoke-WebRequest -Uri $SiteUrl -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Server is running at $SiteUrl" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Next.js server is not running at $SiteUrl" -ForegroundColor Red
    Write-Host "Please start the server first:" -ForegroundColor Yellow
    Write-Host "  npm run build" -ForegroundColor Yellow
    Write-Host "  npm run start" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Create output directory
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

Write-Host "Running unlighthouse for all pages..." -ForegroundColor Yellow
Write-Host ""

# Run unlighthouse
npx unlighthouse --site $SiteUrl --desktop --outputPath $OutputDir

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Audit Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Results saved to: $OutputDir" -ForegroundColor Green
Write-Host ""
Write-Host "To view results:" -ForegroundColor Yellow
Write-Host "  - Open the HTML reports in $OutputDir" -ForegroundColor Yellow
Write-Host "  - Or check the JSON files for detailed metrics" -ForegroundColor Yellow
Write-Host ""
