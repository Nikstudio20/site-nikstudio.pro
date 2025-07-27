<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaPageContent;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use App\Models\MediaServiceMedia;
use App\Models\MediaTestimonial;
use App\Models\MediaProcessStep;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaPagePublicControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test data
        $this->createTestData();
    }

    private function createTestData()
    {
        // Create page content
        MediaPageContent::create([
            'hero_title' => 'Test Hero Title',
            'hero_description' => 'Test Hero Description',
            'testimonials_title' => 'Test Testimonials Title',
            'testimonials_subtitle' => 'Test Testimonials Subtitle',
            'process_title' => 'Test Process Title',
            'process_subtitle' => 'Test Process Subtitle'
        ]);

        // Create services with features and media
        $service1 = MediaService::create([
            'title' => 'Test Service 1',
            'description' => 'Test Service 1 Description',
            'order' => 1
        ]);

        $service2 = MediaService::create([
            'title' => 'Test Service 2', 
            'description' => 'Test Service 2 Description',
            'order' => 2
        ]);

        // Create features for services
        MediaServiceFeature::create([
            'service_id' => $service1->id,
            'title' => 'Feature 1',
            'description' => ['Paragraph 1', 'Paragraph 2'],
            'order' => 1
        ]);

        MediaServiceFeature::create([
            'service_id' => $service1->id,
            'title' => 'Feature 2',
            'description' => ['Feature 2 description'],
            'order' => 2
        ]);

        // Create media for services
        MediaServiceMedia::create([
            'service_id' => $service1->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'test-main-1.jpg',
            'alt_text' => 'Test Main Image 1',
            'order' => 1
        ]);

        MediaServiceMedia::create([
            'service_id' => $service1->id,
            'group_id' => 1,
            'media_type' => 'secondary',
            'file_type' => 'image',
            'file_path' => 'test-secondary-1.jpg',
            'alt_text' => 'Test Secondary Image 1',
            'order' => 1
        ]);

        // Create testimonials
        MediaTestimonial::create([
            'company' => 'Test Company 1',
            'quote' => 'Test Quote 1',
            'description' => 'Test Description 1',
            'image_path' => 'testimonial-1.jpg',
            'order' => 1
        ]);

        MediaTestimonial::create([
            'company' => 'Test Company 2',
            'quote' => 'Test Quote 2', 
            'description' => 'Test Description 2',
            'image_path' => 'testimonial-2.jpg',
            'order' => 2
        ]);

        // Create process steps
        MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step 1',
            'subtitle' => 'Test Subtitle 1',
            'image_path' => 'process-1.jpg',
            'description_left' => 'Left description 1',
            'description_right' => 'Right description 1',
            'order' => 1
        ]);

        MediaProcessStep::create([
            'step_number' => '02',
            'title' => 'Test Step 2',
            'subtitle' => 'Test Subtitle 2',
            'image_path' => 'process-2.jpg',
            'description_left' => 'Left description 2',
            'description_right' => 'Right description 2',
            'order' => 2
        ]);
    }

    public function test_get_media_page_returns_complete_data_structure()
    {
        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'hero' => [
                        'title',
                        'description'
                    ],
                    'services' => [
                        '*' => [
                            'id',
                            'title',
                            'description',
                            'order',
                            'features' => [
                                '*' => [
                                    'id',
                                    'title',
                                    'description',
                                    'order'
                                ]
                            ],
                            'slides' => [
                                '*' => [
                                    'mainImage',
                                    'secondaryImage'
                                ]
                            ]
                        ]
                    ],
                    'testimonials' => [
                        'title',
                        'subtitle',
                        'items' => [
                            '*' => [
                                'id',
                                'company',
                                'quote',
                                'text',
                                'image',
                                'order'
                            ]
                        ]
                    ],
                    'process' => [
                        'title',
                        'subtitle',
                        'steps' => [
                            '*' => [
                                'id',
                                'stepNumber',
                                'title',
                                'subtitle',
                                'image',
                                'description' => [
                                    'left',
                                    'right'
                                ],
                                'order'
                            ]
                        ]
                    ]
                ]
            ]);
    }

    public function test_get_media_page_returns_correct_hero_data()
    {
        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'hero' => [
                        'title' => 'Test Hero Title',
                        'description' => 'Test Hero Description'
                    ]
                ]
            ]);
    }

    public function test_get_media_page_returns_services_with_features_and_media()
    {
        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        
        $this->assertCount(2, $data['services']);
        
        $service1 = $data['services'][0];
        $this->assertEquals('Test Service 1', $service1['title']);
        $this->assertEquals('Test Service 1 Description', $service1['description']);
        $this->assertCount(2, $service1['features']);
        $this->assertCount(1, $service1['slides']);
        
        // Check feature structure
        $feature1 = $service1['features'][0];
        $this->assertEquals('Feature 1', $feature1['title']);
        $this->assertEquals(['Paragraph 1', 'Paragraph 2'], $feature1['description']);
        
        // Check slide structure
        $slide1 = $service1['slides'][0];
        $this->assertEquals('test-main-1.jpg', $slide1['mainImage']);
        $this->assertEquals('test-secondary-1.jpg', $slide1['secondaryImage']);
    }

    public function test_get_media_page_returns_testimonials_data()
    {
        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        
        $this->assertEquals('Test Testimonials Title', $data['testimonials']['title']);
        $this->assertEquals('Test Testimonials Subtitle', $data['testimonials']['subtitle']);
        $this->assertCount(2, $data['testimonials']['items']);
        
        $testimonial1 = $data['testimonials']['items'][0];
        $this->assertEquals('Test Company 1', $testimonial1['company']);
        $this->assertEquals('Test Quote 1', $testimonial1['quote']);
        $this->assertEquals('Test Description 1', $testimonial1['text']);
        $this->assertEquals('testimonial-1.jpg', $testimonial1['image']);
    }

    public function test_get_media_page_returns_process_steps_data()
    {
        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        
        $this->assertEquals('Test Process Title', $data['process']['title']);
        $this->assertEquals('Test Process Subtitle', $data['process']['subtitle']);
        $this->assertCount(2, $data['process']['steps']);
        
        $step1 = $data['process']['steps'][0];
        $this->assertEquals('01', $step1['stepNumber']);
        $this->assertEquals('Test Step 1', $step1['title']);
        $this->assertEquals('Test Subtitle 1', $step1['subtitle']);
        $this->assertEquals('process-1.jpg', $step1['image']);
        $this->assertEquals('Left description 1', $step1['description']['left']);
        $this->assertEquals('Right description 1', $step1['description']['right']);
    }

    public function test_get_media_page_handles_empty_database()
    {
        // Clear all test data
        MediaPageContent::truncate();
        MediaService::truncate();
        MediaServiceFeature::truncate();
        MediaServiceMedia::truncate();
        MediaTestimonial::truncate();
        MediaProcessStep::truncate();

        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'hero' => [
                        'title' => '',
                        'description' => ''
                    ],
                    'services' => [],
                    'testimonials' => [
                        'title' => '',
                        'subtitle' => '',
                        'items' => []
                    ],
                    'process' => [
                        'title' => '',
                        'subtitle' => '',
                        'steps' => []
                    ]
                ]
            ]);
    }

    public function test_get_media_page_orders_data_correctly()
    {
        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        
        // Check services are ordered correctly
        $this->assertEquals('Test Service 1', $data['services'][0]['title']);
        $this->assertEquals('Test Service 2', $data['services'][1]['title']);
        
        // Check features are ordered correctly within service
        $service1Features = $data['services'][0]['features'];
        $this->assertEquals('Feature 1', $service1Features[0]['title']);
        $this->assertEquals('Feature 2', $service1Features[1]['title']);
        
        // Check testimonials are ordered correctly
        $testimonials = $data['testimonials']['items'];
        $this->assertEquals('Test Company 1', $testimonials[0]['company']);
        $this->assertEquals('Test Company 2', $testimonials[1]['company']);
        
        // Check process steps are ordered correctly
        $steps = $data['process']['steps'];
        $this->assertEquals('01', $steps[0]['stepNumber']);
        $this->assertEquals('02', $steps[1]['stepNumber']);
    }

    public function test_get_media_page_transforms_media_to_slides_correctly()
    {
        // Add more media groups to test transformation
        MediaServiceMedia::create([
            'service_id' => 1,
            'group_id' => 2,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'test-main-2.jpg',
            'alt_text' => 'Test Main Image 2',
            'order' => 2
        ]);

        MediaServiceMedia::create([
            'service_id' => 1,
            'group_id' => 2,
            'media_type' => 'secondary',
            'file_type' => 'image',
            'file_path' => 'test-secondary-2.jpg',
            'alt_text' => 'Test Secondary Image 2',
            'order' => 2
        ]);

        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        $service1 = $data['services'][0];
        
        $this->assertCount(2, $service1['slides']);
        
        $slide1 = $service1['slides'][0];
        $this->assertEquals('test-main-1.jpg', $slide1['mainImage']);
        $this->assertEquals('test-secondary-1.jpg', $slide1['secondaryImage']);
        
        $slide2 = $service1['slides'][1];
        $this->assertEquals('test-main-2.jpg', $slide2['mainImage']);
        $this->assertEquals('test-secondary-2.jpg', $slide2['secondaryImage']);
    }

    public function test_get_media_page_handles_missing_secondary_media()
    {
        // Create media group with only main image
        MediaServiceMedia::create([
            'service_id' => 2,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'test-main-only.jpg',
            'alt_text' => 'Test Main Only',
            'order' => 1
        ]);

        $response = $this->getJson('/api/public/media-page');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        $service2 = $data['services'][1];
        
        $this->assertCount(1, $service2['slides']);
        
        $slide = $service2['slides'][0];
        $this->assertEquals('test-main-only.jpg', $slide['mainImage']);
        $this->assertEquals('', $slide['secondaryImage']);
    }}
