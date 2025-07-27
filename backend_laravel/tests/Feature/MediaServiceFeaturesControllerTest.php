<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaServiceFeaturesControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'dark_background' => false,
            'order' => 1
        ]);
    }

    public function test_can_create_feature_for_service()
    {
        $data = [
            'title' => 'New Feature',
            'description' => ['First paragraph', 'Second paragraph']
        ];

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/features", $data);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Функция успешно добавлена',
                    'data' => [
                        'title' => 'New Feature',
                        'description' => ['First paragraph', 'Second paragraph'],
                        'service_id' => $this->service->id
                    ]
                ]);

        $this->assertDatabaseHas('media_service_features', [
            'service_id' => $this->service->id,
            'title' => 'New Feature'
        ]);
    }

    public function test_create_feature_validation_fails_with_empty_data()
    {
        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/features", []);

        $response->assertStatus(422)
                ->assertJson([
                    'success' => false,
                    'message' => 'Ошибка валидации данных'
                ])
                ->assertJsonValidationErrors(['title', 'description']);
    }

    public function test_create_feature_validation_fails_with_invalid_description()
    {
        $data = [
            'title' => 'Valid Title',
            'description' => 'Not an array' // Should be array
        ];

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/features", $data);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['description']);
    }

    public function test_create_feature_validation_fails_with_empty_description_array()
    {
        $data = [
            'title' => 'Valid Title',
            'description' => [] // Empty array
        ];

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/features", $data);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['description']);
    }

    public function test_can_update_feature()
    {
        $feature = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Original Feature',
            'description' => ['Original paragraph'],
            'order' => 1
        ]);

        $data = [
            'title' => 'Updated Feature',
            'description' => ['Updated paragraph 1', 'Updated paragraph 2']
        ];

        $response = $this->putJson("/api/admin/media-services/{$this->service->id}/features/{$feature->id}", $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Функция успешно обновлена',
                    'data' => [
                        'title' => 'Updated Feature',
                        'description' => ['Updated paragraph 1', 'Updated paragraph 2']
                    ]
                ]);

        $this->assertDatabaseHas('media_service_features', [
            'id' => $feature->id,
            'title' => 'Updated Feature'
        ]);
    }

    public function test_update_feature_validation_fails()
    {
        $feature = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Test Feature',
            'description' => ['Test description'],
            'order' => 1
        ]);

        $response = $this->putJson("/api/admin/media-services/{$this->service->id}/features/{$feature->id}", [
            'title' => '', // Empty title
            'description' => ['Valid description']
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['title']);
    }

    public function test_can_delete_feature()
    {
        $feature = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Test Feature',
            'description' => ['Test description'],
            'order' => 1
        ]);

        $response = $this->deleteJson("/api/admin/media-services/{$this->service->id}/features/{$feature->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Функция успешно удалена'
                ]);

        $this->assertDatabaseMissing('media_service_features', [
            'id' => $feature->id
        ]);
    }

    public function test_can_reorder_features()
    {
        $feature1 = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Feature 1',
            'description' => ['Description 1'],
            'order' => 1
        ]);

        $feature2 = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Feature 2',
            'description' => ['Description 2'],
            'order' => 2
        ]);

        $feature3 = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Feature 3',
            'description' => ['Description 3'],
            'order' => 3
        ]);

        $data = [
            'order' => [
                ['id' => $feature3->id, 'order' => 1],
                ['id' => $feature1->id, 'order' => 2],
                ['id' => $feature2->id, 'order' => 3]
            ]
        ];

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/features/reorder", $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Порядок функций успешно обновлен'
                ]);

        $this->assertEquals(2, $feature1->fresh()->order);
        $this->assertEquals(3, $feature2->fresh()->order);
        $this->assertEquals(1, $feature3->fresh()->order);
    }

    public function test_reorder_features_validation_fails()
    {
        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/features/reorder", [
            'order' => 'invalid'
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['order']);
    }

    public function test_returns_404_for_nonexistent_service()
    {
        $response = $this->postJson('/api/admin/media-services/999/features', [
            'title' => 'Test Feature',
            'description' => ['Test description']
        ]);

        $response->assertStatus(404)
                ->assertJson([
                    'success' => false,
                    'message' => 'Блок услуги не найден'
                ]);
    }

    public function test_returns_404_for_nonexistent_feature()
    {
        $response = $this->putJson("/api/admin/media-services/{$this->service->id}/features/999", [
            'title' => 'Updated Feature',
            'description' => ['Updated description']
        ]);

        $response->assertStatus(404)
                ->assertJson([
                    'success' => false,
                    'message' => 'Функция не найдена'
                ]);
    }

    public function test_feature_belongs_to_correct_service()
    {
        $otherService = MediaService::create([
            'title' => 'Other Service',
            'description' => 'Other Description',
            'dark_background' => false,
            'order' => 2
        ]);

        $feature = MediaServiceFeature::create([
            'service_id' => $otherService->id,
            'title' => 'Other Feature',
            'description' => ['Other description'],
            'order' => 1
        ]);

        // Try to access feature from wrong service
        $response = $this->putJson("/api/admin/media-services/{$this->service->id}/features/{$feature->id}", [
            'title' => 'Updated Feature',
            'description' => ['Updated description']
        ]);

        $response->assertStatus(404)
                ->assertJson([
                    'success' => false,
                    'message' => 'Функция не найдена'
                ]);
    }

    public function test_feature_order_auto_increments()
    {
        $feature1 = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Feature 1',
            'description' => ['Description 1']
        ]);

        $feature2 = MediaServiceFeature::create([
            'service_id' => $this->service->id,
            'title' => 'Feature 2',
            'description' => ['Description 2']
        ]);

        $this->assertTrue($feature2->order > $feature1->order);
    }

    public function test_handles_complex_description_arrays()
    {
        $complexDescription = [
            'Первый параграф с русским текстом',
            'Second paragraph with English text',
            'Третий параграф с символами: @#$%^&*()',
            'Fourth paragraph with emojis 🚀 🎉 ✨',
            'Fifth paragraph with very long text: ' . str_repeat('Lorem ipsum ', 50)
        ];

        $data = [
            'title' => 'Complex Feature',
            'description' => $complexDescription
        ];

        $response = $this->postJson("/api/admin/media-services/{$this->service->id}/features", $data);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'title' => 'Complex Feature',
                        'description' => $complexDescription
                    ]
                ]);
    }
}