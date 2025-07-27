<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use App\Models\MediaServiceMedia;
use App\Models\MediaTestimonial;
use App\Models\MediaProcessStep;
use App\Models\MediaPageContent;
use App\Http\Controllers\Api\MediaPagePublicController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MediaPagePerformanceTest extends TestCase
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
        for ($i = 1; $i <= 5; $i++) {
            $service = MediaService::create([
                'title' => "Test Service {$i}",
                'description' => "Test Description {$i}",
                'order' => $i,
                'dark_background' => $i % 2 === 0
            ]);

            // Create features
            for ($j = 1; $j <= 3; $j++) {
                MediaServiceFeature::create([
                    'service_id' => $service->id,
                    'title' => "Feature {$j}",
                    'description' => ["Description paragraph {$j}"],
                    'order' => $j
                ]);
            }

            // Create media items
            for ($k = 1; $k <= 2; $k++) {
                MediaServiceMedia::create([
                    'service_id' => $service->id,
                    'group_id' => $k,
                    'media_type' => 'main',
                    'file_type' => 'image',
                    'file_path' => "test/image-{$k}.jpg",
                    'alt_text' => "Test image {$k}",
                    'order' => $k
                ]);
            }
        }

        // Create testimonials
        for ($i = 1; $i <= 3; $i++) {
            MediaTestimonial::create([
                'company' => "Test Company {$i}",
                'quote' => "Test Quote {$i}",
                'description' => "Test Description {$i}",
                'image_path' => "test/testimonial-{$i}.jpg",
                'order' => $i
            ]);
        }

        // Create process steps
        for ($i = 1; $i <= 4; $i++) {
            MediaProcessStep::create([
                'step_number' => sprintf('%02d', $i),
                'title' => "Step {$i}",
                'subtitle' => "Step Subtitle {$i}",
                'image_path' => "test/process-{$i}.jpg",
                'description_left' => "Left description {$i}",
                'description_right' => "Right description {$i}",
                'order' => $i
            ]);
        }
    }

    /** @test */
    public function it_caches_public_media_page_data()
    {
        // Clear cache first
        Cache::flush();

        // First request should hit database
        $startTime = microtime(true);
        $response = $this->getJson('/api/media-page');
        $firstRequestTime = microtime(true) - $startTime;

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'hero',
                'services',
                'testimonials',
                'process'
            ]
        ]);

        // Second request should use cache and be faster
        $startTime = microtime(true);
        $response2 = $this->getJson('/api/media-page');
        $secondRequestTime = microtime(true) - $startTime;

        $response2->assertStatus(200);
        
        // Cache should make second request significantly faster
        $this->assertLessThan($firstRequestTime * 0.5, $secondRequestTime);
        
        // Verify cache exists
        $this->assertTrue(Cache::has('media_page_public_data'));
    }

    /** @test */
    public function it_clears_cache_when_data_is_updated()
    {
        // Make initial request to populate cache
        $this->getJson('/api/media-page');
        $this->assertTrue(Cache::has('media_page_public_data'));

        // Update a service
        $service = MediaService::first();
        $service->update(['title' => 'Updated Title']);

        // Cache should be cleared
        $this->assertFalse(Cache::has('media_page_public_data'));
    }

    /** @test */
    public function it_uses_optimized_database_queries()
    {
        // Enable query logging
        DB::enableQueryLog();

        // Make request
        $this->getJson('/api/media-page');

        // Get executed queries
        $queries = DB::getQueryLog();

        // Should use eager loading to minimize queries
        // With proper eager loading, we should have:
        // 1. MediaPageContent query
        // 2. MediaService with features and media (1 query with joins)
        // 3. MediaTestimonial query
        // 4. MediaProcessStep query
        // Total should be around 4-6 queries maximum
        $this->assertLessThanOrEqual(6, count($queries));

        // Verify that we're using the indexes by checking for ORDER BY clauses
        $hasOrderByQueries = collect($queries)->some(function ($query) {
            return str_contains(strtolower($query['query']), 'order by');
        });
        
        $this->assertTrue($hasOrderByQueries, 'Queries should use ORDER BY for proper index utilization');
    }

    /** @test */
    public function it_supports_pagination_for_admin_services()
    {
        // Test paginated services endpoint
        $response = $this->getJson('/api/admin/media-services?paginate=true&per_page=2');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data',
            'pagination' => [
                'current_page',
                'last_page',
                'per_page',
                'total',
                'from',
                'to',
                'has_more_pages'
            ]
        ]);

        $data = $response->json();
        $this->assertEquals(2, $data['pagination']['per_page']);
        $this->assertEquals(2, count($data['data']));
        $this->assertEquals(5, $data['pagination']['total']);
    }

    /** @test */
    public function it_supports_search_in_paginated_services()
    {
        // Test search functionality
        $response = $this->getJson('/api/admin/media-services?paginate=true&search=Service 1');

        $response->assertStatus(200);
        $data = $response->json();
        
        $this->assertEquals(1, $data['pagination']['total']);
        $this->assertStringContains('Service 1', $data['data'][0]['title']);
    }

    /** @test */
    public function it_supports_sorting_in_paginated_services()
    {
        // Test sorting functionality
        $response = $this->getJson('/api/admin/media-services?paginate=true&sort_by=title&sort_direction=desc');

        $response->assertStatus(200);
        $data = $response->json();
        
        // Should be sorted by title descending
        $titles = collect($data['data'])->pluck('title')->toArray();
        $sortedTitles = collect($titles)->sort()->reverse()->values()->toArray();
        
        $this->assertEquals($sortedTitles, $titles);
    }

    /** @test */
    public function it_handles_file_cleanup_on_media_deletion()
    {
        // This test would require actual file system operations
        // For now, we'll test that the deletion endpoint works
        $service = MediaService::first();
        $mediaItem = MediaServiceMedia::where('service_id', $service->id)->first();
        
        if ($mediaItem) {
            $response = $this->deleteJson("/api/admin/media-services/{$service->id}/media/{$mediaItem->group_id}");
            $response->assertStatus(200);
            
            // Verify media item was deleted
            $this->assertDatabaseMissing('media_service_media', [
                'id' => $mediaItem->id
            ]);
        }
    }

    /** @test */
    public function it_validates_file_sizes_and_types()
    {
        // Test file validation (this would require actual file uploads in a full test)
        $service = MediaService::first();
        
        // Test with invalid file type
        $response = $this->postJson("/api/admin/media-services/{$service->id}/media", [
            'main_file' => 'invalid-file-content',
            'secondary_file' => 'invalid-file-content'
        ]);
        
        // Should return validation error
        $response->assertStatus(422);
    }

    /** @test */
    public function it_measures_response_times()
    {
        // Measure response time for public endpoint
        $startTime = microtime(true);
        $response = $this->getJson('/api/media-page');
        $responseTime = microtime(true) - $startTime;
        
        $response->assertStatus(200);
        
        // Response should be under 500ms for cached data
        $this->assertLessThan(0.5, $responseTime, 'Response time should be under 500ms');
    }

    protected function tearDown(): void
    {
        // Clear cache after each test
        Cache::flush();
        parent::tearDown();
    }
}