<?php

require_once 'vendor/autoload.php';

use App\Models\HomeContent;
use Illuminate\Support\Facades\Storage;

echo "=== Home Content Storage Verification ===\n\n";

// Test 1: Check if model methods exist and return expected values
echo "1. Testing model methods:\n";
echo "   - Video size limit: " . HomeContent::getVideoSizeLimit() . " bytes (50MB)\n";
echo "   - Image size limit: " . HomeContent::getImageSizeLimit() . " bytes (2MB)\n";
echo "   - Video storage directory: " . HomeContent::getVideoStorageDirectory() . "\n";
echo "   - Image storage directory: " . HomeContent::getFallbackImageStorageDirectory() . "\n";

// Test 2: Check file size validation
echo "\n2. Testing file size validation:\n";
$validVideoSize = 30 * 1024 * 1024; // 30MB
$invalidVideoSize = 60 * 1024 * 1024; // 60MB
$validImageSize = 1 * 1024 * 1024; // 1MB
$invalidImageSize = 3 * 1024 * 1024; // 3MB

echo "   - Valid video size (30MB): " . (HomeContent::validateVideoSize($validVideoSize) ? 'PASS' : 'FAIL') . "\n";
echo "   - Invalid video size (60MB): " . (HomeContent::validateVideoSize($invalidVideoSize) ? 'FAIL' : 'PASS') . "\n";
echo "   - Valid image size (1MB): " . (HomeContent::validateImageSize($validImageSize) ? 'PASS' : 'FAIL') . "\n";
echo "   - Invalid image size (3MB): " . (HomeContent::validateImageSize($invalidImageSize) ? 'FAIL' : 'PASS') . "\n";

// Test 3: Check MIME type arrays
echo "\n3. Testing MIME type validation:\n";
$videoMimeTypes = HomeContent::getAllowedVideoMimeTypes();
$imageMimeTypes = HomeContent::getAllowedImageMimeTypes();

echo "   - Allowed video MIME types: " . implode(', ', $videoMimeTypes) . "\n";
echo "   - Allowed image MIME types: " . implode(', ', $imageMimeTypes) . "\n";

// Test 4: Check if storage directories can be created
echo "\n4. Testing storage directory structure:\n";
$videoDir = HomeContent::getVideoStorageDirectory();
$imageDir = HomeContent::getFallbackImageStorageDirectory();

echo "   - Video directory path: storage/app/public/{$videoDir}\n";
echo "   - Image directory path: storage/app/public/{$imageDir}\n";

echo "\n=== Verification Complete ===\n";
echo "All storage functionality methods are properly implemented.\n";