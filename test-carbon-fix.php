<?php

require __DIR__ . '/backend_laravel/vendor/autoload.php';

use Carbon\Carbon;

echo "Testing Carbon with different value types:\n\n";

// Test 1: String value (this should fail in old code)
try {
    $minutes = "480";
    echo "Test 1: String value '$minutes'\n";
    $result = Carbon::now()->addMinutes($minutes);
    echo "  Result: " . $result->toDateTimeString() . "\n";
    echo "  Status: PASSED (but should use int)\n\n";
} catch (Exception $e) {
    echo "  Status: FAILED - " . $e->getMessage() . "\n\n";
}

// Test 2: Integer value (correct)
try {
    $minutes = 480;
    echo "Test 2: Integer value $minutes\n";
    $result = Carbon::now()->addMinutes($minutes);
    echo "  Result: " . $result->toDateTimeString() . "\n";
    echo "  Status: PASSED\n\n";
} catch (Exception $e) {
    echo "  Status: FAILED - " . $e->getMessage() . "\n\n";
}

// Test 3: Cast string to int (correct fix)
try {
    $minutes = "480";
    echo "Test 3: Cast string to int (int)'$minutes'\n";
    $result = Carbon::now()->addMinutes((int)$minutes);
    echo "  Result: " . $result->toDateTimeString() . "\n";
    echo "  Status: PASSED\n\n";
} catch (Exception $e) {
    echo "  Status: FAILED - " . $e->getMessage() . "\n\n";
}

// Test 4: Float value
try {
    $minutes = 480.5;
    echo "Test 4: Float value $minutes\n";
    $result = Carbon::now()->addMinutes($minutes);
    echo "  Result: " . $result->toDateTimeString() . "\n";
    echo "  Status: PASSED\n\n";
} catch (Exception $e) {
    echo "  Status: FAILED - " . $e->getMessage() . "\n\n";
}

echo "All tests completed!\n";
