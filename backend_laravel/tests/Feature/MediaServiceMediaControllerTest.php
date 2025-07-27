<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaService;
use App\Models\MediaServiceMedia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MediaServiceMediaControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        
        $this->service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);
    }

    public function test_can_upload_image_media_group()
    {
        $mainImage = UploadedFile::fake()->image('main.jpg', 800, 600)->size(1024); // 1MB
        $secondaryImage = UploadedFile::fake()->image('secondary.jpg', 800, 600)->size(1024); // 1MB

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $mainImage,
            'secondary_file' => $secondaryImage,
            'main_alt' => 'Main image alt text',
            'secondary_alt' => 'Secondary image alt text'
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Медиа-группа успешно загружена'
                ]);

        $this->assertDatabaseHas('media_service_media', [
            'service_id' => $this->service->id,
            'media_type' => 'main',
            'file_type' => 'image',
            'alt_text' => 'Main image alt text'
        ]);

        $this->assertDatabaseHas('media_service_media', [
            'service_id' => $this->service->id,
            'media_type' => 'secondary',
            'file_type' => 'image',
            'alt_text' => 'Secondary image alt text'
        ]);
    }

    public function test_can_upload_video_media_with_poster()
    {
        $video = UploadedFile::fake()->create('video.mp4', 10240, 'video/mp4'); // 10MB
        $poster = UploadedFile::fake()->image('poster.jpg', 800, 600)->size(1024); // 1MB

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $video,
            'main_poster' => $poster,
            'main_alt' => 'Video alt text'
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Медиа-группа успешно загружена'
                ]);

        $this->assertDatabaseHas('media_service_media', [
            'service_id' => $this->service->id,
            'media_type' => 'main',
            'file_type' => 'video',
            'alt_text' => 'Video alt text'
        ]);

        $mediaItem = MediaServiceMedia::where([
            'service_id' => $this->service->id,
            'media_type' => 'main',
            'file_type' => 'video'
        ])->first();

        $this->assertNotNull($mediaItem->poster_path);
    }

    public function test_upload_validation_fails_with_oversized_image()
    {
        $oversizedImage = UploadedFile::fake()->image('large.jpg', 2000, 2000)->size(3072); // 3MB

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $oversizedImage,
            'main_alt' => 'Alt text'
        ]);

        $response->assertStatus(413)
                ->assertJson([
                    'success' => false,
                    'message' => 'Размер файла превышает допустимый лимит'
                ]);
    }

    public function test_upload_validation_fails_with_oversized_video()
    {
        $oversizedVideo = UploadedFile::fake()->create('large.mp4', 52428800, 'video/mp4'); // 50MB+

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $oversizedVideo,
            'main_alt' => 'Alt text'
        ]);

        $response->assertStatus(413)
                ->assertJson([
                    'success' => false,
                    'message' => 'Размер файла превышает допустимый лимит'
                ]);
    }

    public function test_upload_validation_fails_with_invalid_file_type()
    {
        $textFile = UploadedFile::fake()->create('document.txt', 100, 'text/plain');

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $textFile,
            'main_alt' => 'Alt text'
        ]);

        $response->assertStatus(422)
                ->assertJson([
                    'success' => false,
                    'message' => 'Ошибка валидации данных'
                ])
                ->assertJsonValidationErrors(['main_file']);
    }

    public function test_video_upload_requires_poster()
    {
        $video = UploadedFile::fake()->create('video.mp4', 10240, 'video/mp4');

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $video,
            'main_alt' => 'Video alt text'
            // Missing poster
        ]);

        $response->assertStatus(422)
                ->assertJson([
                    'success' => false,
                    'message' => 'Для видео файлов обязательно загрузить постер'
                ]);
    }

    public function test_upload_validation_fails_without_main_file()
    {
        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_alt' => 'Alt text'
            // Missing main_file
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['main_file']);
    }

    public function test_can_update_media_group()
    {
        // Create initial media group
        $mainMedia = MediaServiceMedia::create([
            'service_id' => $this->service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/old-main.jpg',
            'alt_text' => 'Old main alt',
            'order' => 1
        ]);

        $secondaryMedia = MediaServiceMedia::create([
            'service_id' => $this->service->id,
            'group_id' => 1,
            'media_type' => 'secondary',
            'file_type' => 'image',
            'file_path' => 'media/old-secondary.jpg',
            'alt_text' => 'Old secondary alt',
            'order' => 1
        ]);

        $newMainImage = UploadedFile::fake()->image('new-main.jpg', 800, 600)->size(1024);

        $response = $this->putJson("/api/admin/media-services/{$this->service->id}/media/1", [
            'main_file' => $newMainImage,
            'main_alt' => 'New main alt text',
            'secondary_alt' => 'Updated secondary alt'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Медиа-группа успешно обновлена'
                ]);

        $updatedMainMedia = $mainMedia->fresh();
        $this->assertEquals('New main alt text', $updatedMainMedia->alt_text);
        $this->assertNotEquals('media/old-main.jpg', $updatedMainMedia->file_path);

        $updatedSecondaryMedia = $secondaryMedia->fresh();
        $this->assertEquals('Updated secondary alt', $updatedSecondaryMedia->alt_text);
    }

    public function test_can_delete_media_group()
    {
        $mainMedia = MediaServiceMedia::create([
            'service_id' => $this->service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/main.jpg',
            'alt_text' => 'Main alt',
            'order' => 1
        ]);

        $secondaryMedia = MediaServiceMedia::create([
            'service_id' => $this->service->id,
            'group_id' => 1,
            'media_type' => 'secondary',
            'file_type' => 'image',
            'file_path' => 'media/secondary.jpg',
            'alt_text' => 'Secondary alt',
            'order' => 1
        ]);

        $response = $this->deleteJson("/api/admin/media-services/{$this->service->id}/media/1");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Медиа-группа успешно удалена'
                ]);

        $this->assertDatabaseMissing('media_service_media', ['id' => $mainMedia->id]);
        $this->assertDatabaseMissing('media_service_media', ['id' => $secondaryMedia->id]);
    }

    public function test_can_reorder_media_groups()
    {
        // Create multiple media groups
        MediaServiceMedia::create([
            'service_id' => $this->service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/group1.jpg',
            'alt_text' => 'Group 1',
            'order' => 1
        ]);

        MediaServiceMedia::create([
            'service_id' => $this->service->id,
            'group_id' => 2,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/group2.jpg',
            'alt_text' => 'Group 2',
            'order' => 2
        ]);

        MediaServiceMedia::create([
            'service_id' => $this->service->id,
            'group_id' => 3,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/group3.jpg',
            'alt_text' => 'Group 3',
            'order' => 3
        ]);

        $data = [
            'order' => [
                ['group_id' => 3, 'order' => 1],
                ['group_id' => 1, 'order' => 2],
                ['group_id' => 2, 'order' => 3]
            ]
        ];

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media/reorder", $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Порядок медиа-групп успешно обновлен'
                ]);

        $group1Media = MediaServiceMedia::where('group_id', 1)->first();
        $group2Media = MediaServiceMedia::where('group_id', 2)->first();
        $group3Media = MediaServiceMedia::where('group_id', 3)->first();

        $this->assertEquals(2, $group1Media->order);
        $this->assertEquals(3, $group2Media->order);
        $this->assertEquals(1, $group3Media->order);
    }

    public function test_returns_404_for_nonexistent_service()
    {
        $image = UploadedFile::fake()->image('test.jpg');

        $response = $this->postJson('/api/admin/media-services/999/media', [
            'main_file' => $image,
            'main_alt' => 'Alt text'
        ]);

        $response->assertStatus(404)
                ->assertJson([
                    'success' => false,
                    'message' => 'Блок услуги не найден'
                ]);
    }

    public function test_returns_404_for_nonexistent_media_group()
    {
        $response = $this->deleteJson("/api/admin/media-services/{$this->service->id}/media/999");

        $response->assertStatus(404)
                ->assertJson([
                    'success' => false,
                    'message' => 'Медиа-группа не найдена'
                ]);
    }

    public function test_file_paths_normalized_in_response()
    {
        $image = UploadedFile::fake()->image('test.jpg', 800, 600)->size(1024);

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $image,
            'main_alt' => 'Alt text'
        ]);

        $response->assertStatus(201);
        
        $responseData = $response->json('data');
        $this->assertStringNotContainsString('/storage/', $responseData['main']['file_path']);
    }

    public function test_handles_mixed_media_types_in_group()
    {
        $image = UploadedFile::fake()->image('image.jpg', 800, 600)->size(1024);
        $video = UploadedFile::fake()->create('video.mp4', 10240, 'video/mp4');
        $poster = UploadedFile::fake()->image('poster.jpg', 800, 600)->size(1024);

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/media", [
            'main_file' => $image,
            'secondary_file' => $video,
            'secondary_poster' => $poster,
            'main_alt' => 'Image alt',
            'secondary_alt' => 'Video alt'
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('media_service_media', [
            'service_id' => $this->service->id,
            'media_type' => 'main',
            'file_type' => 'image'
        ]);

        $this->assertDatabaseHas('media_service_media', [
            'service_id' => $this->service->id,
            'media_type' => 'secondary',
            'file_type' => 'video'
        ]);
    }
}