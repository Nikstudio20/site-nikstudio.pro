<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MediaService;
use App\Models\MediaServiceMedia;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaServiceMediaTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_media_service_media()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $media = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/test-image.jpg',
            'poster_path' => null,
            'alt_text' => 'Test image',
            'order' => 1
        ]);

        $this->assertInstanceOf(MediaServiceMedia::class, $media);
        $this->assertEquals($service->id, $media->service_id);
        $this->assertEquals(1, $media->group_id);
        $this->assertEquals('main', $media->media_type);
        $this->assertEquals('image', $media->file_type);
        $this->assertEquals('media/test-image.jpg', $media->file_path);
        $this->assertNull($media->poster_path);
        $this->assertEquals('Test image', $media->alt_text);
        $this->assertEquals(1, $media->order);
    }

    public function test_can_create_video_media_with_poster()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $media = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'video',
            'file_path' => 'media/test-video.mp4',
            'poster_path' => 'media/test-poster.jpg',
            'alt_text' => 'Test video',
            'order' => 1
        ]);

        $this->assertEquals('video', $media->file_type);
        $this->assertEquals('media/test-video.mp4', $media->file_path);
        $this->assertEquals('media/test-poster.jpg', $media->poster_path);
    }

    public function test_fillable_attributes()
    {
        $media = new MediaServiceMedia();
        $expectedFillable = [
            'service_id',
            'group_id',
            'media_type',
            'file_type',
            'file_path',
            'poster_path',
            'alt_text',
            'order'
        ];

        $this->assertEquals($expectedFillable, $media->getFillable());
    }

    public function test_table_name()
    {
        $media = new MediaServiceMedia();
        $this->assertEquals('media_service_media', $media->getTable());
    }

    public function test_belongs_to_service()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $media = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/test-image.jpg',
            'alt_text' => 'Test image',
            'order' => 1
        ]);

        $this->assertInstanceOf(MediaService::class, $media->service);
        $this->assertEquals($service->id, $media->service->id);
        $this->assertEquals('Test Service', $media->service->title);
    }

    public function test_can_create_paired_media_group()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $mainMedia = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/main-image.jpg',
            'alt_text' => 'Main image',
            'order' => 1
        ]);

        $secondaryMedia = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'secondary',
            'file_type' => 'image',
            'file_path' => 'media/secondary-image.jpg',
            'alt_text' => 'Secondary image',
            'order' => 1
        ]);

        $this->assertEquals(1, $mainMedia->group_id);
        $this->assertEquals(1, $secondaryMedia->group_id);
        $this->assertEquals('main', $mainMedia->media_type);
        $this->assertEquals('secondary', $secondaryMedia->media_type);
    }

    public function test_can_update_media_order()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $media1 = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/image1.jpg',
            'alt_text' => 'Image 1',
            'order' => 1
        ]);

        $media2 = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 2,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/image2.jpg',
            'alt_text' => 'Image 2',
            'order' => 2
        ]);

        $media1->update(['order' => 3]);
        $media2->update(['order' => 1]);

        $this->assertEquals(3, $media1->fresh()->order);
        $this->assertEquals(1, $media2->fresh()->order);
    }

    public function test_handles_different_file_types()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $imageMedia = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'media/test.jpg',
            'alt_text' => 'Test image',
            'order' => 1
        ]);

        $videoMedia = MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 2,
            'media_type' => 'main',
            'file_type' => 'video',
            'file_path' => 'media/test.mp4',
            'poster_path' => 'media/poster.jpg',
            'alt_text' => 'Test video',
            'order' => 2
        ]);

        $this->assertEquals('image', $imageMedia->file_type);
        $this->assertEquals('video', $videoMedia->file_type);
        $this->assertNull($imageMedia->poster_path);
        $this->assertNotNull($videoMedia->poster_path);
    }
}