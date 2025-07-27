<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\HomeContent;

class HomeVideoIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    /** @test */
    public function it_handles_complete_video_upload_workflow()
    {
        // Step 1: Verify no content exists initially
        $response = $this->getJson('/api/home');
        $response->assertStatus(200)
                 ->assertJson(['success' => true, 'data' => null]);

        // Step 2: Upload a video
        $videoFile = UploadedFile::fake()->create('hero-video.mp4', 10 * 1024, 'video/mp4');
        $uploadResponse = $this->postJson('/api/home/hero-video', [
            'hero_video' => $videoFile
        ]);

        $uploadResponse->assertStatus(201)
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

        $videoData = $uploadResponse->json('data');

        // Step 3: Verify video is now available via GET
        $getResponse = $this->getJson('/api/home');
        $getResponse->assertStatus(200)
                    ->assertJson([
                        'success' => true,
                        'data' => [
                            'id' => $videoData['id'],
                            'hero_video_original_name' => 'hero-video.mp4',
                            'is_active' => true
                        ]
                    ]);

        // Step 4: Upload a fallback image
        $imageFile = UploadedFile::fake()->create('fallback.jpg', 1024, 'image/jpeg');
        $imageResponse = $this->postJson('/api/home/fallback-image', [
            'fallback_image' => $imageFile
        ]);

        $imageResponse->assertStatus(201);

        // Step 5: Verify both video and image are available
        $finalResponse = $this->getJson('/api/home');
        $finalData = $finalResponse->json('data');
        
        $this->assertNotNull($finalData['hero_video_url']);
        $this->assertNotNull($finalData['hero_fallback_image_url']);

        // Step 6: Replace the video with a new one
        $newVideoFile = UploadedFile::fake()->create('new-hero-video.mp4', 15 * 1024, 'video/mp4');
        $replaceResponse = $this->postJson('/api/home/hero-video', [
            'hero_video' => $newVideoFile
        ]);

        $replaceResponse->assertStatus(201);

        // Step 7: Verify old video was replaced
        $updatedResponse = $this->getJson('/api/home');
        $updatedData = $updatedResponse->json('data');
        
        $this->assertEquals('new-hero-video.mp4', $updatedData['hero_video_original_name']);
        $this->assertNotEquals($videoData['hero_video_url'], $updatedData['hero_video_url']);

        // Step 8: Delete the video
        $deleteResponse = $this->deleteJson('/api/home/hero-video');
        $deleteResponse->assertStatus(200)
                       ->assertJson(['success' => true]);

        // Step 9: Verify video is deleted but fallback image remains
        $finalCheckResponse = $this->getJson('/api/home');
        $finalCheckData = $finalCheckResponse->json('data');
        
        $this->assertNull($finalCheckData['hero_video_url']);
        $this->assertNull($finalCheckData['hero_video_original_name']);
        $this->assertNotNull($finalCheckData['hero_fallback_image_url']);
    }

    /** @test */
    public function it_handles_error_recovery_workflow()
    {
        // Step 1: Try to upload invalid file
        $invalidFile = UploadedFile::fake()->create('document.pdf', 1024, 'application/pdf');
        $errorResponse = $this->postJson('/api/home/hero-video', [
            'hero_video' => $invalidFile
        ]);

        $errorResponse->assertStatus(422);

        // Step 2: Verify no content was created
        $checkResponse = $this->getJson('/api/home');
        $checkResponse->assertJson(['success' => true, 'data' => null]);

        // Step 3: Upload valid file after error
        $validFile = UploadedFile::fake()->create('valid-video.mp4', 5 * 1024, 'video/mp4');
        $successResponse = $this->postJson('/api/home/hero-video', [
            'hero_video' => $validFile
        ]);

        $successResponse->assertStatus(201);

        // Step 4: Verify valid upload succeeded
        $finalResponse = $this->getJson('/api/home');
        $finalResponse->assertJsonPath('data.hero_video_original_name', 'valid-video.mp4');
    }

    /** @test */
    public function it_handles_storage_cleanup_workflow()
    {
        // Step 1: Upload first video
        $video1 = UploadedFile::fake()->create('video1.mp4', 5 * 1024, 'video/mp4');
        $response1 = $this->postJson('/api/home/hero-video', ['hero_video' => $video1]);
        $response1->assertStatus(201);
        
        $data1 = $response1->json('data');
        $path1 = HomeContent::find($data1['id'])->hero_video_path;

        // Verify first file exists in storage
        Storage::disk('public')->assertExists($path1);

        // Step 2: Upload second video (should replace first)
        $video2 = UploadedFile::fake()->create('video2.mp4', 7 * 1024, 'video/mp4');
        $response2 = $this->postJson('/api/home/hero-video', ['hero_video' => $video2]);
        $response2->assertStatus(201);

        $data2 = $response2->json('data');
        $path2 = HomeContent::find($data2['id'])->hero_video_path;

        // Verify second file exists and first file was cleaned up
        Storage::disk('public')->assertExists($path2);
        Storage::disk('public')->assertMissing($path1);

        // Step 3: Delete video
        $deleteResponse = $this->deleteJson('/api/home/hero-video');
        $deleteResponse->assertStatus(200);

        // Verify second file was cleaned up
        Storage::disk('public')->assertMissing($path2);
    }

    /** @test */
    public function it_handles_concurrent_operations_workflow()
    {
        // Step 1: Create initial content
        $initialVideo = UploadedFile::fake()->create('initial.mp4', 3 * 1024, 'video/mp4');
        $this->postJson('/api/home/hero-video', ['hero_video' => $initialVideo]);

        // Step 2: Simulate concurrent operations
        $video1 = UploadedFile::fake()->create('concurrent1.mp4', 4 * 1024, 'video/mp4');
        $video2 = UploadedFile::fake()->create('concurrent2.mp4', 5 * 1024, 'video/mp4');
        $image1 = UploadedFile::fake()->create('fallback1.jpg', 1024, 'image/jpeg');

        // Execute concurrent requests
        $responses = [
            $this->postJson('/api/home/hero-video', ['hero_video' => $video1]),
            $this->postJson('/api/home/hero-video', ['hero_video' => $video2]),
            $this->postJson('/api/home/fallback-image', ['fallback_image' => $image1])
        ];

        // All should succeed
        foreach ($responses as $response) {
            $response->assertStatus(201);
        }

        // Step 3: Verify final state is consistent
        $finalResponse = $this->getJson('/api/home');
        $finalData = $finalResponse->json('data');

        $this->assertNotNull($finalData['hero_video_url']);
        $this->assertNotNull($finalData['hero_fallback_image_url']);
        $this->assertTrue($finalData['is_active']);

        // Only one active record should exist
        $activeCount = HomeContent::where('is_active', true)->count();
        $this->assertEquals(1, $activeCount);
    }

    /** @test */
    public function it_handles_file_validation_edge_cases_workflow()
    {
        $testCases = [
            // [filename, size_kb, mime_type, expected_status, description]
            ['tiny.mp4', 0, 'video/mp4', 422, 'empty file'],
            ['small.mp4', 0.5, 'video/mp4', 422, 'very small file'],
            ['normal.mp4', 1024, 'video/mp4', 201, 'normal file'],
            ['large.mp4', 50 * 1024, 'video/mp4', 201, 'exactly at limit'],
            ['toolarge.mp4', (50 * 1024) + 1, 'video/mp4', 422, 'over limit'],
            ['wrong.mp4', 1024, 'text/plain', 422, 'wrong mime type'],
        ];

        foreach ($testCases as [$filename, $sizeKb, $mimeType, $expectedStatus, $description]) {
            // Clean up before each test
            HomeContent::query()->delete();

            $file = UploadedFile::fake()->create($filename, $sizeKb, $mimeType);
            $response = $this->postJson('/api/home/hero-video', ['hero_video' => $file]);

            $response->assertStatus($expectedStatus, "Failed for case: {$description}");

            if ($expectedStatus === 201) {
                // Verify successful upload
                $this->assertDatabaseHas('home_contents', [
                    'hero_video_original_name' => $filename,
                    'is_active' => true
                ]);
            } else {
                // Verify no content was created on error
                $this->assertDatabaseMissing('home_contents', [
                    'hero_video_original_name' => $filename
                ]);
            }
        }
    }

    /** @test */
    public function it_handles_database_consistency_workflow()
    {
        // Step 1: Create content with video
        $video = UploadedFile::fake()->create('test.mp4', 5 * 1024, 'video/mp4');
        $videoResponse = $this->postJson('/api/home/hero-video', ['hero_video' => $video]);
        $videoResponse->assertStatus(201);

        $videoData = $videoResponse->json('data');
        $homeContentId = $videoData['id'];

        // Step 2: Add fallback image to same record
        $image = UploadedFile::fake()->create('fallback.jpg', 1024, 'image/jpeg');
        $imageResponse = $this->postJson('/api/home/fallback-image', ['fallback_image' => $image]);
        $imageResponse->assertStatus(201);

        // Step 3: Verify both are in the same record
        $homeContent = HomeContent::find($homeContentId);
        $this->assertNotNull($homeContent->hero_video_path);
        $this->assertNotNull($homeContent->hero_fallback_image_path);
        $this->assertTrue($homeContent->is_active);

        // Step 4: Replace video, verify image remains
        $newVideo = UploadedFile::fake()->create('new.mp4', 6 * 1024, 'video/mp4');
        $newVideoResponse = $this->postJson('/api/home/hero-video', ['hero_video' => $newVideo]);
        $newVideoResponse->assertStatus(201);

        $homeContent->refresh();
        $this->assertEquals('new.mp4', $homeContent->hero_video_original_name);
        $this->assertNotNull($homeContent->hero_fallback_image_path); // Image should remain

        // Step 5: Delete video, verify image remains
        $deleteResponse = $this->deleteJson('/api/home/hero-video');
        $deleteResponse->assertStatus(200);

        $homeContent->refresh();
        $this->assertNull($homeContent->hero_video_path);
        $this->assertNull($homeContent->hero_video_original_name);
        $this->assertNotNull($homeContent->hero_fallback_image_path); // Image should still remain
    }

    /** @test */
    public function it_handles_api_response_consistency_workflow()
    {
        // Step 1: Test empty state response
        $emptyResponse = $this->getJson('/api/home');
        $emptyResponse->assertStatus(200)
                     ->assertExactJson([
                         'success' => true,
                         'data' => null,
                         'message' => 'No home content configured'
                     ]);

        // Step 2: Upload video and test response structure
        $video = UploadedFile::fake()->create('test.mp4', 5 * 1024, 'video/mp4');
        $uploadResponse = $this->postJson('/api/home/hero-video', ['hero_video' => $video]);
        
        $uploadResponse->assertStatus(201)
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
                      ]);

        // Step 3: Test GET response after upload
        $getResponse = $this->getJson('/api/home');
        $getResponse->assertStatus(200)
                   ->assertJsonStructure([
                       'success',
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
                   ]);

        // Step 4: Test delete response
        $deleteResponse = $this->deleteJson('/api/home/hero-video');
        $deleteResponse->assertStatus(200)
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
                      ]);

        // Verify video fields are null after deletion
        $deleteData = $deleteResponse->json('data');
        $this->assertNull($deleteData['hero_video_url']);
        $this->assertNull($deleteData['hero_video_original_name']);
        $this->assertNull($deleteData['hero_video_size']);
    }
}