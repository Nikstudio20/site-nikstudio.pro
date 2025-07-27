<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaService;
use App\Models\MediaServiceFeature;
use App\Models\MediaServiceMedia;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaServicesControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_media_services()
    {
        MediaService::create([
            'title' => 'Service 1',
            'description' => 'Description 1',
            'order' => 1
        ]);

        MediaService::create([
            'title' => 'Service 2',
            'description' => 'Description 2',
            'order' => 2
        ]);

        $response = $this->getJson('/api/media-services');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'description',
                        'order'
                    ]
                ]
            ]);
    }

    public function test_can_create_media_service()
    {
        $serviceData = [
            'title' => 'New Service',
            'description' => 'New Service Description'
        ];

        $response = $this->postJson('/api/media-services', $serviceData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Медиа услуга создана'
            ]);

        $this->assertDatabaseHas('media_services', [
            'title' => 'New Service',
            'description' => 'New Service Description'
        ]);
    }

    public function test_create_media_service_validates_required_fields()
    {
        $response = $this->postJson('/api/media-services', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'description']);
    }

    public function test_can_show_media_service_with_relationships()
    {
        $service = MediaService::create([
            'title' => 'Test Service',
            'description' => 'Test Description',
            'order' => 1
        ]);

        MediaServiceFeature::create([
            'service_id' => $service->id,
            'title' => 'Feature 1',
            'description' => ['Paragraph 1'],
            'order' => 1
        ]);

        MediaServiceMedia::create([
            'service_id' => $service->id,
            'group_id' => 1,
            'media_type' => 'main',
            'file_type' => 'image',
            'file_path' => 'test.jpg',
            'alt_text' => 'Test',
            'order' => 1
        ]);

        $response = $this->getJson("/api/media-services/{$service->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'title',
                    'description',
                    'features' => [
                        '*' => [
                            'id',
                            'title',
                            'description',
                            'order'
                        ]
                    ],
                    'media_items' => [
                        '*' => [
                            'id',
                            'group_id',
                            'media_type',
                            'file_type',
                            'file_path'
                        ]
                    ]
                ]
            ]);
    }

    public function test_can_update_media_service()
    {
        $service = MediaService::create([
            'title' => 'Original Title',
            'description' => 'Original Description',
            'order' => 1
        ]);

        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description'
        ];

        $response = $this->putJson("/api/media-services/{$service->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Медиа услуга обновлена'
            ]);

        $this->assertDatabaseHas('media_services', [
            'id' => $service->id,
            'title' => 'Updated Title',
            'description' => 'Updated Description'
        ]);
    }

    public function test_can_delete_media_service()
    {
        $service = MediaService::create([
            'title' => 'Service to Delete',
            'description' => 'Description',
            'order' => 1
        ]);

        $response = $this->deleteJson("/api/media-services/{$service->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Медиа услуга удалена'
            ]);

        $this->assertDatabaseMissing('media_services', [
            'id' => $service->id
        ]);
    }

    public function test_delete_nonexistent_service_returns_404()
    {
        $response = $this->deleteJson('/api/media-services/999');

        $response->assertStatus(404);
    }
}