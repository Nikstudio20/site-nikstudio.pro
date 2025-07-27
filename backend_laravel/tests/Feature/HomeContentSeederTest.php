<?php

namespace Tests\Feature;

use App\Models\HomeContent;
use Database\Seeders\HomeContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use Tests\TestCase;

class HomeContentSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_content_seeder_creates_default_record()
    {
        // Run the seeder
        $this->seed(HomeContentSeeder::class);

        // Assert that a home content record was created
        $this->assertDatabaseHas('home_contents', [
            'is_active' => true,
            'hero_fallback_image_path' => 'home/fallback-images/default-hero-fallback.jpg',
        ]);

        // Assert that only one active record exists
        $this->assertEquals(1, HomeContent::where('is_active', true)->count());
    }

    public function test_home_content_seeder_creates_storage_directories()
    {
        // Run the seeder
        $this->seed(HomeContentSeeder::class);

        // Assert that storage directories exist
        $this->assertTrue(File::exists(storage_path('app/public/home/hero-videos')));
        $this->assertTrue(File::exists(storage_path('app/public/home/fallback-images')));
    }

    public function test_home_content_seeder_creates_fallback_image()
    {
        // Run the seeder
        $this->seed(HomeContentSeeder::class);

        // Assert that the default fallback image was created
        $this->assertTrue(File::exists(storage_path('app/public/home/fallback-images/default-hero-fallback.jpg')));
    }

    public function test_home_content_factory_creates_basic_record()
    {
        $homeContent = HomeContent::factory()->create();

        $this->assertInstanceOf(HomeContent::class, $homeContent);
        $this->assertTrue($homeContent->is_active);
        $this->assertNotNull($homeContent->hero_fallback_image_path);
    }

    public function test_home_content_factory_with_video_state()
    {
        $homeContent = HomeContent::factory()->withVideo()->create();

        $this->assertNotNull($homeContent->hero_video_path);
        $this->assertNotNull($homeContent->hero_video_original_name);
        $this->assertNotNull($homeContent->hero_video_size);
        $this->assertEquals('sample-hero-video.mp4', $homeContent->hero_video_original_name);
    }

    public function test_home_content_factory_inactive_state()
    {
        $homeContent = HomeContent::factory()->inactive()->create();

        $this->assertFalse($homeContent->is_active);
    }

    public function test_home_content_factory_large_video_state()
    {
        $homeContent = HomeContent::factory()->withLargeVideo()->create();

        $this->assertEquals(45 * 1024 * 1024, $homeContent->hero_video_size); // 45MB
        $this->assertEquals('large-hero-video.mp4', $homeContent->hero_video_original_name);
    }
}