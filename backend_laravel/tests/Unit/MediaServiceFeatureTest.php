<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaServiceFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_media_service_feature()
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
            'description' => ['First paragraph', 'Second paragraph'],
            'order' => 1
        ]);

        $this->assertInstanceOf(MediaServiceFeature::class, $feature);
        $this->assertEquals($service->id, $feature->service_id);
        $this->assertEquals('Test Feature', $feature->title);
        $this->assertEquals(['First paragraph', 'Second paragraph'], $feature->description);
        $this->assertEquals(1, $feature->order);
    }

    public function test_fillable_attributes()
    {
        $feature = new MediaServiceFeature();
        $expectedFillable = [
            'service_id',
            'title',
            'description',
            'order'
        ];

        $this->assertEquals($expectedFillable, $feature->getFillable());
    }

    public function test_casts_description_to_array()
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
            'description' => ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'],
            'order' => 1
        ]);

        $this->assertIsArray($feature->description);
        $this->assertEquals(3, count($feature->description));
        $this->assertEquals('Paragraph 1', $feature->description[0]);
        $this->assertEquals('Paragraph 2', $feature->description[1]);
        $this->assertEquals('Paragraph 3', $feature->description[2]);
    }

    public function test_belongs_to_service()
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
            'description' => ['Test description'],
            'order' => 1
        ]);

        $this->assertInstanceOf(MediaService::class, $feature->service);
        $this->assertEquals($service->id, $feature->service->id);
        $this->assertEquals('Test Service', $feature->service->title);
    }

    public function test_can_update_feature_order()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);

        $feature1 = MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Feature 1',
            'description' => ['Description 1'],
            'order' => 1
        ]);

        $feature2 = MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Feature 2',
            'description' => ['Description 2'],
            'order' => 2
        ]);

        $feature1->update(['order' => 3]);
        $feature2->update(['order' => 1]);

        $this->assertEquals(3, $feature1->fresh()->order);
        $this->assertEquals(1, $feature2->fresh()->order);
    }

    public function test_can_update_description_array()
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
            'description' => ['Original paragraph'],
            'order' => 1
        ]);

        $feature->update([
            'description' => ['Updated paragraph 1', 'Updated paragraph 2']
        ]);

        $updatedFeature = $feature->fresh();
        $this->assertEquals(['Updated paragraph 1', 'Updated paragraph 2'], $updatedFeature->description);
        $this->assertEquals(2, count($updatedFeature->description));
    }

    public function test_handles_empty_description_array()
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
            'description' => [],
            'order' => 1
        ]);

        $this->assertIsArray($feature->description);
        $this->assertEquals(0, count($feature->description));
    }
}