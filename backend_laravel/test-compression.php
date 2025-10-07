<?php

/**
 * Test script to verify gzip compression is working
 * 
 * Usage:
 * 1. Start Laravel server: php artisan serve
 * 2. Run this script: php test-compression.php
 * 
 * This script will test an API endpoint with and without gzip compression
 */

// Test endpoint - adjust this to match your API endpoint
$apiUrl = 'http://localhost:8000/api/projects';

echo "=== Testing Gzip Compression ===\n\n";

// Test 1: Request WITHOUT gzip
echo "Test 1: Request WITHOUT Accept-Encoding header\n";
echo "-------------------------------------------\n";

$ch1 = curl_init($apiUrl);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch1, CURLOPT_HEADER, true);
curl_setopt($ch1, CURLOPT_NOBODY, false);

$response1 = curl_exec($ch1);
$headerSize1 = curl_getinfo($ch1, CURLINFO_HEADER_SIZE);
$headers1 = substr($response1, 0, $headerSize1);
$body1 = substr($response1, $headerSize1);

echo "Response size: " . strlen($body1) . " bytes\n";
echo "Content-Encoding: " . (preg_match('/Content-Encoding: (.+)/i', $headers1, $matches) ? $matches[1] : 'none') . "\n";
curl_close($ch1);

echo "\n";

// Test 2: Request WITH gzip
echo "Test 2: Request WITH Accept-Encoding: gzip\n";
echo "-------------------------------------------\n";

$ch2 = curl_init($apiUrl);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_HEADER, true);
curl_setopt($ch2, CURLOPT_NOBODY, false);
curl_setopt($ch2, CURLOPT_ENCODING, 'gzip'); // This automatically adds Accept-Encoding and decompresses

$response2 = curl_exec($ch2);
$headerSize2 = curl_getinfo($ch2, CURLINFO_HEADER_SIZE);
$headers2 = substr($response2, 0, $headerSize2);
$body2 = substr($response2, $headerSize2);
$downloadSize = curl_getinfo($ch2, CURLINFO_SIZE_DOWNLOAD);

echo "Downloaded size: " . $downloadSize . " bytes (compressed)\n";
echo "Decompressed size: " . strlen($body2) . " bytes\n";
echo "Content-Encoding: " . (preg_match('/Content-Encoding: (.+)/i', $headers2, $matches) ? trim($matches[1]) : 'none') . "\n";
curl_close($ch2);

echo "\n";

// Calculate compression ratio
if (strlen($body1) > 0 && $downloadSize > 0) {
    $ratio = (1 - ($downloadSize / strlen($body1))) * 100;
    echo "=== Results ===\n";
    echo "Original size: " . strlen($body1) . " bytes\n";
    echo "Compressed size: " . $downloadSize . " bytes\n";
    echo "Compression ratio: " . number_format($ratio, 2) . "%\n";
    echo "Savings: " . (strlen($body1) - $downloadSize) . " bytes\n";
} else {
    echo "Could not calculate compression ratio\n";
}

echo "\n";
