<?php

// Simple test script to debug the upload issue
$url = 'http://localhost:8000/api/services/video_production/video';

// Create a simple test file
$testFile = tempnam(sys_get_temp_dir(), 'test_video');
file_put_contents($testFile, 'fake video content for testing');

$postData = [
    'video' => new CURLFile($testFile, 'video/mp4', 'test.mp4')
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);
unlink($testFile);

echo "HTTP Code: $httpCode\n";
echo "Response: $response\n";
if ($error) {
    echo "cURL Error: $error\n";
}