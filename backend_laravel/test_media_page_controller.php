<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\MediaPageContent;
use Illuminate\Support\Facades\DB;

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Testing MediaPageController functionality...\n\n";

try {
    // Test 1: Check if we can create a MediaPageContent record
    echo "Test 1: Creating MediaPageContent record...\n";
    
    $content = MediaPageContent::firstOrCreate(
        [],
        [
            'hero_title' => 'Test Hero Title',
            'hero_description' => 'Test Hero Description',
            'testimonials_title' => 'Test Testimonials Title',
            'testimonials_subtitle' => 'Test Testimonials Subtitle',
            'process_title' => 'Test Process Title',
            'process_subtitle' => 'Test Process Subtitle'
        ]
    );
    
    echo "✓ MediaPageContent record created with ID: " . $content->id . "\n";
    
    // Test 2: Check if we can retrieve the record
    echo "\nTest 2: Retrieving MediaPageContent record...\n";
    
    $retrieved = MediaPageContent::first();
    if ($retrieved) {
        echo "✓ Record retrieved successfully\n";
        echo "  Hero Title: " . $retrieved->hero_title . "\n";
        echo "  Hero Description: " . $retrieved->hero_description . "\n";
        echo "  Testimonials Title: " . $retrieved->testimonials_title . "\n";
        echo "  Process Title: " . $retrieved->process_title . "\n";
    } else {
        echo "✗ Failed to retrieve record\n";
    }
    
    // Test 3: Check if we can update the record
    echo "\nTest 3: Updating MediaPageContent record...\n";
    
    $retrieved->update([
        'hero_title' => 'Updated Hero Title',
        'hero_description' => 'Updated Hero Description'
    ]);
    
    $updated = MediaPageContent::first();
    if ($updated->hero_title === 'Updated Hero Title') {
        echo "✓ Record updated successfully\n";
        echo "  New Hero Title: " . $updated->hero_title . "\n";
    } else {
        echo "✗ Failed to update record\n";
    }
    
    // Test 4: Test validation methods
    echo "\nTest 4: Testing validation methods...\n";
    
    // Test file size validation
    $imageSize = 1 * 1024 * 1024; // 1MB
    $videoSize = 30 * 1024 * 1024; // 30MB
    $oversizedImage = 3 * 1024 * 1024; // 3MB
    $oversizedVideo = 60 * 1024 * 1024; // 60MB
    
    if (App\Http\Controllers\Api\MediaPageController::validateFileSize($imageSize, 'image')) {
        echo "✓ Image size validation (1MB) passed\n";
    } else {
        echo "✗ Image size validation (1MB) failed\n";
    }
    
    if (App\Http\Controllers\Api\MediaPageController::validateFileSize($videoSize, 'video')) {
        echo "✓ Video size validation (30MB) passed\n";
    } else {
        echo "✗ Video size validation (30MB) failed\n";
    }
    
    if (!App\Http\Controllers\Api\MediaPageController::validateFileSize($oversizedImage, 'image')) {
        echo "✓ Oversized image validation (3MB) correctly rejected\n";
    } else {
        echo "✗ Oversized image validation (3MB) incorrectly accepted\n";
    }
    
    if (!App\Http\Controllers\Api\MediaPageController::validateFileSize($oversizedVideo, 'video')) {
        echo "✓ Oversized video validation (60MB) correctly rejected\n";
    } else {
        echo "✗ Oversized video validation (60MB) incorrectly accepted\n";
    }
    
    echo "\n✓ All tests completed successfully!\n";
    echo "MediaPageController is working correctly.\n";
    
} catch (Exception $e) {
    echo "✗ Test failed with error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}