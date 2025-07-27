<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\HomeContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class HomeContentApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_can_get_home_content()
    {
        $response = $this->getJson('/api/home');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => null,
                     'message' => 'No home content configured'
                 ]);
    }

    public function test_can_upload_hero_video()
    {
        $videoFile = UploadedFile::fake()->create('test-video.mp4', 1000, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $videoFile
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Видео успешно загружено'
                 ]);

        $this->assertDatabaseHas('home_contents', [
            'hero_video_original_name' => 'test-video.mp4',
            'is_active' => true
        ]);
    }

    public function test_can_upload_fallback_image()
    {
        $imageFile = UploadedFile::fake()->create('test-image.jpg', 500, 'image/jpeg');

        $response = $this->postJson('/api/home/fallback-image', [
            'fallback_image' => $imageFile
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Изображение успешно загружено'
                 ]);

        $this->assertDatabaseHas('home_contents', [
            'is_active' => true
        ]);
    }

    public function test_validates_video_file_size()
    {
        // Create a file that's too large (over 50MB)
        $largeVideoFile = UploadedFile::fake()->create('large-video.mp4', 60000, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $largeVideoFile
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['hero_video']);
    }

    public function test_validates_image_file_size()
    {
        // Create a file that's too large (over 2MB)
        $largeImageFile = UploadedFile::fake()->create('large-image.jpg', 3000, 'image/jpeg');

        $response = $this->postJson('/api/home/fallback-image', [
            'fallback_image' => $largeImageFile
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['fallback_image']);
    }

    public function test_validates_video_file_format()
    {
        $invalidFile = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $invalidFile
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['hero_video']);
    }

    public function test_can_delete_hero_video()
    {
        // First create a home content with video
        $homeContent = HomeContent::create([
            'hero_video_path' => 'home/hero-videos/test-video.mp4',
            'hero_video_original_name' => 'test-video.mp4',
            'hero_video_size' => 1000,
            'is_active' => true
        ]);

        // Create the actual file
        Storage::disk('public')->put('home/hero-videos/test-video.mp4', 'fake video content');

        $response = $this->deleteJson('/api/home/hero-video');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Видео успешно удалено'
                 ]);

        // Check that video fields are cleared
        $homeContent->refresh();
        $this->assertNull($homeContent->hero_video_path);
        $this->assertNull($homeContent->hero_video_original_name);
        $this->assertNull($homeContent->hero_video_size);

        // Check that file is deleted
        Storage::disk('public')->assertMissing('home/hero-videos/test-video.mp4');
    }
}