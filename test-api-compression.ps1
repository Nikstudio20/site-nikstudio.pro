# Test API Compression Script
# Проверка сжатия API ответов

Write-Host "=== Тест сжатия API ответов ===" -ForegroundColor Cyan
Write-Host ""

$apiUrl = "http://localhost:8000/api"

# Функция для получения размера response
function Test-Compression {
    param(
        [string]$endpoint,
        [bool]$withCompression
    )
    
    try {
        $headers = @{
            "Accept" = "application/json"
        }
        
        if ($withCompression) {
            $headers["Accept-Encoding"] = "gzip"
        }
        
        $response = Invoke-WebRequest -Uri "$apiUrl$endpoint" -Headers $headers -Method GET -ErrorAction Stop
        
        $size = $response.RawContentLength
        $contentEncoding = $response.Headers["Content-Encoding"]
        
        return @{
            Size = $size
            ContentEncoding = $contentEncoding
            Success = $true
        }
    }
    catch {
        return @{
            Size = 0
            ContentEncoding = $null
            Success = $false
            Error = $_.Exception.Message
        }
    }
}

# Тестируемые endpoints
$endpoints = @(
    "/projects",
    "/categories",
    "/blog-posts"
)

Write-Host "Тестирование endpoints..." -ForegroundColor Yellow
Write-Host ""

foreach ($endpoint in $endpoints) {
    Write-Host "Endpoint: $endpoint" -ForegroundColor Green
    
    # Без сжатия
    Write-Host "  Без сжатия..." -NoNewline
    $withoutCompression = Test-Compression -endpoint $endpoint -withCompression $false
    
    if ($withoutCompression.Success) {
        Write-Host " OK" -ForegroundColor Green
        Write-Host "    Размер: $($withoutCompression.Size) bytes"
        Write-Host "    Content-Encoding: $($withoutCompression.ContentEncoding)"
    }
    else {
        Write-Host " FAILED" -ForegroundColor Red
        Write-Host "    Ошибка: $($withoutCompression.Error)"
    }
    
    # Со сжатием
    Write-Host "  Со сжатием..." -NoNewline
    $withCompression = Test-Compression -endpoint $endpoint -withCompression $true
    
    if ($withCompression.Success) {
        Write-Host " OK" -ForegroundColor Green
        Write-Host "    Размер: $($withCompression.Size) bytes"
        Write-Host "    Content-Encoding: $($withCompression.ContentEncoding)"
        
        if ($withoutCompression.Success -and $withCompression.Size -lt $withoutCompression.Size) {
            $reduction = [math]::Round((1 - ($withCompression.Size / $withoutCompression.Size)) * 100, 2)
            Write-Host "    Уменьшение: $reduction%" -ForegroundColor Cyan
        }
    }
    else {
        Write-Host " FAILED" -ForegroundColor Red
        Write-Host "    Ошибка: $($withCompression.Error)"
    }
    
    Write-Host ""
}

Write-Host "=== Тест завершён ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Примечание: Для работы теста необходимо:" -ForegroundColor Yellow
Write-Host "1. Запустить Laravel backend: php artisan serve" -ForegroundColor Yellow
Write-Host "2. Убедиться, что CompressResponse middleware зарегистрирован" -ForegroundColor Yellow
