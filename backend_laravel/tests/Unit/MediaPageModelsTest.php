<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MediaPageContent;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use App\Models\MediaServiceMedia;
use App\Models\MediaTestimonial;
use App\Models\MediaProcessStep;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaPageModelsTest extends TestCase
{
    use RefreshDatabase;

    public function test_media_page_content_can_be_created()
    {
        $content = MediaPageContent::create([
            'hero_title' => 'Test Title',
            'hero_description' => 'Test Description',
            'testimonials_title' => 'Testimonials Title',
            'testimonials_subtitle' => 'Testimonials Subtitle',
            'process_title' => 'Process Title',
            'process_subtitle' => 'Process Subtitle'
        ]);

        $this->assertDatabaseHas('media_page_content', [
            'hero_title' => 'Test Title',
            'hero_description' => 'Test Description'
        ]);
    }

    public function test_media_service_can_be_created()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'order' => 1
        ]);

        $this->assertDatabaseHas('media_services', [
            'title' => 'Test Service',
            'description' => 'Test Description',
            'order' => 1
        ]);
    }

    public function test_media_service_has_features_relationship()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'order' => 1
        ]);

        $feature = MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Test Feature',
            'description' => ['Paragraph 1', 'Paragraph 2'],
            'order' => 1
        ]);

        $this->assertTrue($service->features()->exists());
        $this->assertEquals('Test Feature', $service->features->first()->title);
        $this->assertEquals(['Paragraph 1', 'Paragraph 2'], $service->features->first()->description);
    }

    public function test_media_service_has_media_items_relationship()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'order' => 1
        ]);

        $media = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'test.jpg',
            'alt_text' => 'Test Image',
            'order' => 1
        ]);

        $this->assertTrue($service->mediaItems()->exists());
        $this->assertEquals('test.jpg', $service->mediaItems->first()->file_path);
    }

    public function test_media_testimonial_can_be_created()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Test Company',
            'quote' => 'Test Quote',
            'description' => 'Test Description',
            'image_path' => 'testimonial.jpg',
            'order' => 1
        ]);

        $this->assertDatabaseHas('media_testimonials', [
            'company' => 'Test Company',
            'quote' => 'Test Quote'
        ]);
    }

    public function test_media_process_step_can_be_created()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'step.jpg',
            'description_left' => 'Left description',
            'description_right' => 'Right description',
            'order' => 1
        ]);

        $this->assertDatabaseHas('media_process_steps', [
            'step_number' => '01',
            'title' => 'Test Step'
        ]);
    }

    public function test_media_service_feature_description_is_cast_to_array()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'order' => 1
        ]);

        $feature = MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Test Feature',
            'description' => ['Paragraph 1', 'Paragraph 2'],
            'order' => 1
        ]);

        $retrievedFeature = MediaServiceFeature::find($feature->id);
        $this->assertIsArray($retrievedFeature->description);
        $this->assertEquals(['Paragraph 1', 'Paragraph 2'], $retrievedFeature->description);
    }
}