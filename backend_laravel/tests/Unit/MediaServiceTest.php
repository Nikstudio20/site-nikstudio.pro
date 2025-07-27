<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use App\Models\MediaServiceMedia;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_media_service()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $this->assertInstanceOf(MediaService::class, $service);
        $this->assertEquals('Test Service', $service->title);
        $this->assertEquals('Test Description', $service->description);
        $this->assertFalse($service->dark_background);
        $this->assertEquals(1, $service->order);
    }

    public function test_fillable_attributes()
    {
        $service = new MediaService();
        $expectedFillable = [
            'title',
            'description',
            'dark_background',
            'order'
        ];

        $this->assertEquals($expectedFillable, $service->getFillable());
    }

    public function test_casts_attributes()
    {
        $service = new MediaService();
        $expectedCasts = [
            'dark_background' => 'boolean',
            'order' => 'integer'
        ];

        foreach ($expectedCasts as $attribute => $cast) {
            $this->assertEquals($cast, $service->getCasts()[$attribute]);
        }
    }

    public function test_has_features_relationship()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $feature = MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Test Feature',
            'description' => ['Test description paragraph'],
            'order' => 1
        ]);

        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $service->features);
        $this->assertEquals(1, $service->features->count());
        $this->assertEquals('Test Feature', $service->features->first()->title);
    }

    public function test_has_media_items_relationship()
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
            'file_path' => 'test/image.jpg',
            'alt_text' => 'Test image',
            'order' => 1
        ]);

        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $service->mediaItems);
        $this->assertEquals(1, $service->mediaItems->count());
        $this->assertEquals('test/image.jpg', $service->mediaItems->first()->file_path);
    }

    public function test_features_ordered_by_order()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Feature 2',
            'description' => ['Description 2'],
            'order' => 2
        ]);

        MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Feature 1',
            'description' => ['Description 1'],
            'order' => 1
        ]);

        $features = $service->features;
        $this->assertEquals('Feature 1', $features->first()->title);
        $this->assertEquals('Feature 2', $features->last()->title);
    }

    public function test_media_items_ordered_by_order()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 2,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'test/image2.jpg',
            'alt_text' => 'Test image 2',
            'order' => 2
        ]);

        MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'test/image1.jpg',
            'alt_text' => 'Test image 1',
            'order' => 1
        ]);

        $mediaItems = $service->mediaItems;
        $this->assertEquals('test/image1.jpg', $mediaItems->first()->file_path);
        $this->assertEquals('test/image2.jpg', $mediaItems->last()->file_path);
    }

    public function test_can_update_service_order()
    {
        $service1 = MediaService::create([
            'title' => 'Service 1',
            'description' => 'Description 1',
            'dark_background' => false,
            'order' => 1
        ]);

        $service2 = MediaService::create([
            'title' => 'Service 2',
            'description' => 'Description 2',
            'dark_background' => false,
            'order' => 2
        ]);

        $service1->update(['order' => 3]);
        $service2->update(['order' => 1]);

        $this->assertEquals(3, $service1->fresh()->order);
        $this->assertEquals(1, $service2->fresh()->order);
    }
}