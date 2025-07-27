<?php

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use App\Models\MediaPageContent;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use App\Models\MediaServiceMedia;
use App\Models\MediaTestimonial;
use App\Models\MediaProcessStep;

// Bootstrap Laravel application
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== Dynamic Media Page Functionality Test ===\n\n";

try {
    // Test 1: Check if models can be created
    echo "Test 1: Creating MediaPageContent...\n";
    $content = MediaPageContent::create([
        'hero_title' => 'Test Hero Title',
        'hero_description' => 'Test Hero Description',
        'testimonials_title' => 'Test Testimonials Title',
        'testimonials_subtitle' => 'Test Testimonials Subtitle',
        'process_title' => 'Test Process Title',
        'process_subtitle' => 'Test Process Subtitle'
    ]);
    echo "✅ MediaPageContent created with ID: {$content->id}\n\n";

    // Test 2: Create MediaService with relationships
    echo "Test 2: Creating MediaService with features and media...\n";
    $service = MediaService::create([
        'title' => 'Test Service',
        'description' => 'Test Service Description',
        'order' => 1
    ]);
    echo "✅ MediaService created with ID: {$service->id}\n";

    // Create feature
    $feature = MediaServiceFeature::create([
        'service_id' => $service->id,
        'title' => 'Test Feature',
        'description' => ['Paragraph 1', 'Paragraph 2'],
        'order' => 1
    ]);
    echo "✅ MediaServiceFeature created with ID: {$feature->id}\n";

    // Create media
    $media = MediaServiceMedia::create([
        'service_id' => $service->id,
        'group_id' => 1,
        'media_type' => 'main',
        'file_type' => 'image',
        'file_path' => 'test-image.jpg',
        'alt_text' => 'Test Image',
        'order' => 1
    ]);
    echo "✅ MediaServiceMedia created with ID: {$media->id}\n\n";

    // Test 3: Test relationships
    echo "Test 3: Testing model relationships...\n";
    $serviceWithRelations = MediaService::with(['features', 'mediaItems'])->find($service->id);
    echo "✅ Service has " . $serviceWithRelations->features->count() . " features\n";
    echo "✅ Service has " . $serviceWithRelations->mediaItems->count() . " media items\n\n";

    // Test 4: Create testimonial
    echo "Test 4: Creating MediaTestimonial...\n";
    $testimonial = MediaTestimonial::create([
        'company' => 'Test Company',
        'quote' => 'Test Quote',
        'description' => 'Test Description',
        'image_path' => 'testimonial.jpg',
        'order' => 1
    ]);
    echo "✅ MediaTestimonial created with ID: {$testimonial->id}\n\n";

    // Test 5: Create process step
    echo "Test 5: Creating MediaProcessStep...\n";
    $step = MediaProcessStep::create([
        'step_number' => '01',
        'title' => 'Test Step',
        'subtitle' => 'Test Subtitle',
        'image_path' => 'step.jpg',
        'description_left' => 'Left description',
        'description_right' => 'Right description',
        'order' => 1
    ]);
    echo "✅ MediaProcessStep created with ID: {$step->id}\n\n";

    // Test 6: Test data retrieval for public API
    echo "Test 6: Testing data retrieval for public API...\n";
    
    $heroData = MediaPageContent::first();
    $services = MediaService::with(['features', 'mediaItems'])->orderBy('order')->get();
    $testimonials = MediaTestimonial::orderBy('order')->get();
    $processSteps = MediaProcessStep::orderBy('order')->get();
    
    echo "✅ Retrieved hero data: {$heroData->hero_title}\n";
    echo "✅ Retrieved {$services->count()} services\n";
    echo "✅ Retrieved {$testimonials->count()} testimonials\n";
    echo "✅ Retrieved {$processSteps->count()} process steps\n\n";

    // Test 7: Test data transformation (simulate controller logic)
    echo "Test 7: Testing data transformation...\n";
    
    $transformedServices = $services->map(function ($service) {
        $mediaGroups = $service->mediaItems->groupBy('group_id');
        $slides = $mediaGroups->map(function ($group) {
            $main = $group->where('media_type', 'main')->first();
            $secondary = $group->where('media_type', 'secondary')->first();
            
            return [
                'mainImage' => $main ? $main->file_path : '',
                'secondaryImage' => $secondary ? $secondary->file_path : ''
            ];
        })->values();

        return [
            'id' => $service->id,
            'title' => $service->title,
            'description' => $service->description,
            'order' => $service->order,
            'features' => $service->features->map(function ($feature) {
                return [
                    'id' => $feature->id,
                    'title' => $feature->title,
                    'description' => $feature->description,
                    'order' => $feature->order
                ];
            }),
            'slides' => $slides
        ];
    });
    
    echo "✅ Data transformation successful\n";
    echo "✅ First service has " . $transformedServices->first()['slides']->count() . " slides\n\n";

    // Clean up test data
    echo "Cleaning up test data...\n";
    MediaServiceMedia::where('service_id', $service->id)->delete();
    MediaServiceFeature::where('service_id', $service->id)->delete();
    MediaService::where('id', $service->id)->delete();
    MediaTestimonial::where('id', $testimonial->id)->delete();
    MediaProcessStep::where('id', $step->id)->delete();
    MediaPageContent::where('id', $content->id)->delete();
    echo "✅ Test data cleaned up\n\n";

    echo "=== ALL TESTS PASSED ===\n";
    echo "The dynamic media page functionality is working correctly!\n";

} catch (Exception $e) {
    echo "❌ Test failed with error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}