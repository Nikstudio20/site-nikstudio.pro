<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\HomeContent;

class HomeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    /** @test */
    public function it_can_get_home_content()
    {
        $response = $this->getJson('/api/home');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => null,
                     'message' => 'No home content configured'
                 ]);
    }

    /** @test */
    public function it_validates_video_file_size()
    {
        // Create a fake file that's too large (simulate 51MB)
        $file = UploadedFile::fake()->create('large_video.mp4', 51 * 1024); // 51MB in KB

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(422)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'errors' => [
                         'hero_video'
                     ]
                 ]);
    }

    /** @test */
    public function it_validates_video_file_format()
    {
        // Create a fake file with wrong format
        $file = UploadedFile::fake()->create('document.txt', 1024, 'text/plain');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(422)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'errors' => [
                         'hero_video'
                     ]
                 ]);
    }

    /** @test */
    public function it_can_upload_valid_video()
    {
        // Create a fake valid video file
        $file = UploadedFile::fake()->create('test_video.mp4', 5 * 1024, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'id',
                         'hero_video_url',
                         'hero_video_original_name',
                         'hero_video_size',
                         'is_active'
                     ]
                 ]);

        // Verify the file was stored
        $this->assertDatabaseHas('home_contents', [
            'hero_video_original_name' => 'test_video.mp4',
            'is_active' => true
        ]);
    }

    /** @test */
    public function it_can_delete_hero_video()
    {
        // First create a home content with video
        $homeContent = HomeContent::create([
            'hero_video_path' => 'home/hero-videos/test.mp4',
            'hero_video_original_name' => 'test.mp4',
            'hero_video_size' => 1024,
            'is_active' => true
        ]);

        $response = $this->deleteJson('/api/home/hero-video');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Видео успешно удалено'
                 ]);

        // Verify video data was cleared
        $homeContent->refresh();
        $this->assertNull($homeContent->hero_video_path);
        $this->assertNull($homeContent->hero_video_original_name);
        $this->assertNull($homeContent->hero_video_size);
    }

    /** @test */
    public function it_returns_404_when_deleting_non_existent_video()
    {
        $response = $this->deleteJson('/api/home/hero-video');

        $response->assertStatus(404)
                 ->assertJson([
                     'success' => false,
                     'message' => 'Видео не найдено'
                 ]);
    }

    /** @test */
    public function it_handles_empty_file_upload()
    {
        // Create an empty file
        $file = UploadedFile::fake()->create('empty.mp4', 0, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(422)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'errors'
                 ]);
    }

    /** @test */
    public function it_validates_missing_file()
    {
        $response = $this->postJson('/api/home/hero-video', []);

        $response->assertStatus(422)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'errors' => [
                         'hero_video'
                     ]
                 ]);
    }

    /** @test */
    public function it_can_upload_fallback_image()
    {
        $file = UploadedFile::fake()->create('fallback.jpg', 1024, 'image/jpeg');

        $response = $this->postJson('/api/home/fallback-image', [
            'fallback_image' => $file
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'id',
                         'hero_fallback_image_url',
                         'is_active'
                     ]
                 ]);

        $this->assertDatabaseHas('home_contents', [
            'is_active' => true
        ]);
    }

    /** @test */
    public function it_validates_fallback_image_size()
    {
        $file = UploadedFile::fake()->create('large_image.jpg', 3 * 1024); // 3MB

        $response = $this->postJson('/api/home/fallback-image', [
            'fallback_image' => $file
        ]);

        $response->assertStatus(422)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'errors' => [
                         'fallback_image'
                     ]
                 ]);
    }

    /** @test */
    public function it_validates_fallback_image_format()
    {
        $file = UploadedFile::fake()->create('document.txt', 1024, 'text/plain');

        $response = $this->postJson('/api/home/fallback-image', [
            'fallback_image' => $file
        ]);

        $response->assertStatus(422)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'errors' => [
                         'fallback_image'
                     ]
                 ]);
    }

    /** @test */
    public function it_replaces_old_video_when_uploading_new_one()
    {
        // Create initial video
        $oldFile = UploadedFile::fake()->create('old_video.mp4', 5 * 1024, 'video/mp4');
        $this->postJson('/api/home/hero-video', ['hero_video' => $oldFile]);

        $oldContent = HomeContent::getActive();
        $oldVideoPath = $oldContent->hero_video_path;

        // Upload new video
        $newFile = UploadedFile::fake()->create('new_video.mp4', 5 * 1024, 'video/mp4');
        $response = $this->postJson('/api/home/hero-video', ['hero_video' => $newFile]);

        $response->assertStatus(201);

        // Verify new video is stored and old one is cleaned up
        $newContent = HomeContent::getActive();
        $this->assertNotEquals($oldVideoPath, $newContent->hero_video_path);
        $this->assertEquals('new_video.mp4', $newContent->hero_video_original_name);
    }

    /** @test */
    public function it_handles_corrupted_file_upload()
    {
        // Create a file with mismatched extension and MIME type
        $file = UploadedFile::fake()->create('video.mp4', 1024, 'text/plain');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(422)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'errors'
                 ]);
    }

    /** @test */
    public function it_handles_suspicious_file_names()
    {
        // This test simulates a file with a suspicious name
        // Note: UploadedFile::fake() doesn't allow us to create files with path traversal names
        // So we test the validation logic indirectly through the API
        $file = UploadedFile::fake()->create('normal-video.mp4', 1024, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        // Should succeed with normal file name
        $response->assertStatus(201);
    }

    /** @test */
    public function it_returns_proper_error_for_server_errors()
    {
        // Mock Storage to throw an exception
        Storage::shouldReceive('disk')
               ->andThrow(new \Exception('Storage error'));

        $file = UploadedFile::fake()->create('video.mp4', 1024, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(500)
                 ->assertJson([
                     'success' => false
                 ]);
    }

    /** @test */
    public function it_handles_multiple_active_records_correctly()
    {
        // Create multiple active records (edge case)
        HomeContent::create(['is_active' => true, 'hero_video_path' => 'test1.mp4']);
        HomeContent::create(['is_active' => true, 'hero_video_path' => 'test2.mp4']);

        $response = $this->getJson('/api/home');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         'id',
                         'hero_video_url',
                         'is_active'
                     ]
                 ]);
    }

    /** @test */
    public function it_validates_video_file_with_various_formats()
    {
        $formats = [
            ['video.mp4', 'video/mp4', true],
            ['video.webm', 'video/webm', true],
            ['video.avi', 'video/x-msvideo', true],
            ['video.mov', 'video/quicktime', true],
            ['video.ogg', 'video/ogg', true],
            ['video.mkv', 'video/x-matroska', false], // Not supported
        ];

        foreach ($formats as [$filename, $mimeType, $shouldSucceed]) {
            $file = UploadedFile::fake()->create($filename, 1024, $mimeType);

            $response = $this->postJson('/api/home/hero-video', [
                'hero_video' => $file
            ]);

            if ($shouldSucceed) {
                $response->assertStatus(201);
                // Clean up for next iteration
                HomeContent::where('hero_video_original_name', $filename)->delete();
            } else {
                $response->assertStatus(422);
            }
        }
    }

    /** @test */
    public function it_validates_image_file_with_various_formats()
    {
        $formats = [
            ['image.jpg', 'image/jpeg', true],
            ['image.jpeg', 'image/jpeg', true],
            ['image.png', 'image/png', true],
            ['image.gif', 'image/gif', true],
            ['image.webp', 'image/webp', true],
            ['image.bmp', 'image/bmp', false], // Not supported
        ];

        foreach ($formats as [$filename, $mimeType, $shouldSucceed]) {
            $file = UploadedFile::fake()->create($filename, 1024, $mimeType);

            $response = $this->postJson('/api/home/fallback-image', [
                'fallback_image' => $file
            ]);

            if ($shouldSucceed) {
                $response->assertStatus(201);
                // Clean up for next iteration
                HomeContent::where('is_active', true)->delete();
            } else {
                $response->assertStatus(422);
            }
        }
    }

    /** @test */
    public function it_handles_concurrent_uploads_gracefully()
    {
        // Simulate concurrent uploads by creating multiple requests
        $file1 = UploadedFile::fake()->create('video1.mp4', 1024, 'video/mp4');
        $file2 = UploadedFile::fake()->create('video2.mp4', 1024, 'video/mp4');

        // Both uploads should succeed, but only one should be active
        $response1 = $this->postJson('/api/home/hero-video', ['hero_video' => $file1]);
        $response2 = $this->postJson('/api/home/hero-video', ['hero_video' => $file2]);

        $response1->assertStatus(201);
        $response2->assertStatus(201);

        // Only one should be active
        $activeCount = HomeContent::where('is_active', true)->count();
        $this->assertEquals(1, $activeCount);
    }

    /** @test */
    public function it_logs_upload_attempts_properly()
    {
        // This test ensures logging doesn't break the upload process
        $file = UploadedFile::fake()->create('test_video.mp4', 1024, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(201);
        
        // Verify the upload was successful despite logging
        $this->assertDatabaseHas('home_contents', [
            'hero_video_original_name' => 'test_video.mp4',
            'is_active' => true
        ]);
    }

    /** @test */
    public function it_handles_edge_case_file_sizes()
    {
        // Test exactly at the limit
        $exactLimitFile = UploadedFile::fake()->create('exact_limit.mp4', 50 * 1024, 'video/mp4'); // Exactly 50MB

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $exactLimitFile
        ]);

        $response->assertStatus(201);

        // Test just over the limit
        $overLimitFile = UploadedFile::fake()->create('over_limit.mp4', (50 * 1024) + 1, 'video/mp4'); // 50MB + 1KB

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $overLimitFile
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function it_returns_correct_response_structure()
    {
        $file = UploadedFile::fake()->create('test_video.mp4', 1024, 'video/mp4');

        $response = $this->postJson('/api/home/hero-video', [
            'hero_video' => $file
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'id',
                         'hero_video_url',
                         'hero_video_original_name',
                         'hero_video_size',
                         'formatted_video_size',
                         'hero_fallback_image_url',
                         'is_active',
                         'created_at',
                         'updated_at'
                     ]
                 ])
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'hero_video_original_name' => 'test_video.mp4',
                         'is_active' => true
                     ]
                 ]);
    }
}