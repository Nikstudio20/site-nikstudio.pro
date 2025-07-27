<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaProcessStep;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MediaProcessStepsControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_can_list_all_process_steps()
    {
        MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Step 1',
            'subtitle' => 'Subtitle 1',
            'image_path' => 'process/step1.jpg',
            'description_left' => 'Left description 1',
            'description_right' => 'Right description 1',
            'order' => 1
        ]);

        MediaProcessStep::create([
            'step_number' => '02',
            'title' => 'Step 2',
            'subtitle' => 'Subtitle 2',
            'image_path' => 'process/step2.jpg',
            'description_left' => 'Left description 2',
            'description_right' => 'Right description 2',
            'order' => 2
        ]);

        $response = $this->getJson('/api/admin/media-process-steps');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        [
                            'step_number' => '01',
                            'title' => 'Step 1',
                            'subtitle' => 'Subtitle 1',
                            'description_left' => 'Left description 1',
                            'description_right' => 'Right description 1',
                            'order' => 1
                        ],
                        [
                            'step_number' => '02',
                            'title' => 'Step 2',
                            'subtitle' => 'Subtitle 2',
                            'description_left' => 'Left description 2',
                            'description_right' => 'Right description 2',
                            'order' => 2
                        ]
                    ]
                ]);
    }

    public function test_can_create_process_step_with_image()
    {
        $image = UploadedFile::fake()->image('process.jpg', 800, 600)->size(1024); // 1MB

        $response = $this->postJson('/api/admin/media-process-steps', [
            'step_number' => '01',
            'title' => 'New Process Step',
            'subtitle' => 'Step Subtitle',
            'description_left' => 'Left side description content',
            'description_right' => 'Right side description content',
            'image' => $image
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Шаг процесса успешно создан',
                    'data' => [
                        'step_number' => '01',
                        'title' => 'New Process Step',
                        'subtitle' => 'Step Subtitle',
                        'description_left' => 'Left side description content',
                        'description_right' => 'Right side description content'
                    ]
                ]);

        $this->assertDatabaseHas('media_process_steps', [
            'step_number' => '01',
            'title' => 'New Process Step',
            'subtitle' => 'Step Subtitle',
            'description_left' => 'Left side description content',
            'description_right' => 'Right side description content'
        ]);
    }

    public function test_create_process_step_validation_fails_with_empty_data()
    {
        $response = $this->postJson('/api/admin/media-process-steps', []);

        $response->assertStatus(422)
                ->assertJson([
                    'success' => false,
                    'message' => 'Ошибка валидации данных'
                ])
                ->assertJsonValidationErrors([
                    'step_number', 
                    'title', 
                    'subtitle', 
                    'description_left', 
                    'description_right', 
                    'image'
                ]);
    }

    public function test_create_process_step_validation_fails_with_oversized_image()
    {
        $oversizedImage = UploadedFile::fake()->image('large.jpg', 2000, 2000)->size(3072); // 3MB

        $response = $this->postJson('/api/admin/media-process-steps', [
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'description_left' => 'Left description',
            'description_right' => 'Right description',
            'image' => $oversizedImage
        ]);

        $response->assertStatus(413)
                ->assertJson([
                    'success' => false,
                    'message' => 'Размер файла превышает допустимый лимит'
                ]);
    }

    public function test_create_process_step_validation_fails_with_invalid_image_type()
    {
        $textFile = UploadedFile::fake()->create('document.txt', 100, 'text/plain');

        $response = $this->postJson('/api/admin/media-process-steps', [
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'description_left' => 'Left description',
            'description_right' => 'Right description',
            'image' => $textFile
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['image']);
    }

    public function test_can_update_process_step()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Original Step',
            'subtitle' => 'Original Subtitle',
            'image_path' => 'process/original.jpg',
            'description_left' => 'Original left',
            'description_right' => 'Original right',
            'order' => 1
        ]);

        $response = $this->putJson("/api/admin/media-process-steps/{$step->id}", [
            'step_number' => '02',
            'title' => 'Updated Step',
            'subtitle' => 'Updated Subtitle',
            'description_left' => 'Updated left description',
            'description_right' => 'Updated right description'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Шаг процесса успешно обновлен',
                    'data' => [
                        'step_number' => '02',
                        'title' => 'Updated Step',
                        'subtitle' => 'Updated Subtitle',
                        'description_left' => 'Updated left description',
                        'description_right' => 'Updated right description'
                    ]
                ]);

        $this->assertDatabaseHas('media_process_steps', [
            'id' => $step->id,
            'step_number' => '02',
            'title' => 'Updated Step',
            'subtitle' => 'Updated Subtitle',
            'description_left' => 'Updated left description',
            'description_right' => 'Updated right description'
        ]);
    }

    public function test_can_update_process_step_with_new_image()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'process/old.jpg',
            'description_left' => 'Left description',
            'description_right' => 'Right description',
            'order' => 1
        ]);

        $newImage = UploadedFile::fake()->image('new.jpg', 800, 600)->size(1024);

        $response = $this->putJson("/api/admin/media-process-steps/{$step->id}", [
            'step_number' => '01',
            'title' => 'Updated Step',
            'subtitle' => 'Updated Subtitle',
            'description_left' => 'Updated left',
            'description_right' => 'Updated right',
            'image' => $newImage
        ]);

        $response->assertStatus(200);

        $updatedStep = $step->fresh();
        $this->assertEquals('Updated Step', $updatedStep->title);
        $this->assertNotEquals('process/old.jpg', $updatedStep->image_path);
    }

    public function test_update_process_step_validation_fails()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'process/test.jpg',
            'description_left' => 'Left description',
            'description_right' => 'Right description',
            'order' => 1
        ]);

        $response = $this->putJson("/api/admin/media-process-steps/{$step->id}", [
            'step_number' => '', // Empty step number
            'title' => 'Valid Title',
            'subtitle' => 'Valid Subtitle',
            'description_left' => 'Valid left',
            'description_right' => 'Valid right'
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['step_number']);
    }

    public function test_can_delete_process_step()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'process/test.jpg',
            'description_left' => 'Left description',
            'description_right' => 'Right description',
            'order' => 1
        ]);

        $response = $this->deleteJson("/api/admin/media-process-steps/{$step->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Шаг процесса успешно удален'
                ]);

        $this->assertDatabaseMissing('media_process_steps', [
            'id' => $step->id
        ]);
    }

    public function test_can_reorder_process_steps()
    {
        $step1 = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Step 1',
            'subtitle' => 'Subtitle 1',
            'image_path' => 'process/step1.jpg',
            'description_left' => 'Left 1',
            'description_right' => 'Right 1',
            'order' => 1
        ]);

        $step2 = MediaProcessStep::create([
            'step_number' => '02',
            'title' => 'Step 2',
            'subtitle' => 'Subtitle 2',
            'image_path' => 'process/step2.jpg',
            'description_left' => 'Left 2',
            'description_right' => 'Right 2',
            'order' => 2
        ]);

        $step3 = MediaProcessStep::create([
            'step_number' => '03',
            'title' => 'Step 3',
            'subtitle' => 'Subtitle 3',
            'image_path' => 'process/step3.jpg',
            'description_left' => 'Left 3',
            'description_right' => 'Right 3',
            'order' => 3
        ]);

        $data = [
            'order' => [
                ['id' => $step3->id, 'order' => 1],
                ['id' => $step1->id, 'order' => 2],
                ['id' => $step2->id, 'order' => 3]
            ]
        ];

        $response = $this->postJson('/api/admin/media-process-steps/reorder', $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Порядок шагов процесса успешно обновлен'
                ]);

        $this->assertEquals(2, $step1->fresh()->order);
        $this->assertEquals(3, $step2->fresh()->order);
        $this->assertEquals(1, $step3->fresh()->order);
    }

    public function test_reorder_validation_fails_with_invalid_data()
    {
        $response = $this->postJson('/api/admin/media-process-steps/reorder', [
            'order' => 'invalid'
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['order']);
    }

    public function test_returns_404_for_nonexistent_process_step()
    {
        $response = $this->putJson('/api/admin/media-process-steps/999', [
            'step_number' => '01',
            'title' => 'Updated Step',
            'subtitle' => 'Updated Subtitle',
            'description_left' => 'Updated left',
            'description_right' => 'Updated right'
        ]);

        $response->assertStatus(404)
                ->assertJson([
                    'success' => false,
                    'message' => 'Шаг процесса не найден'
                ]);
    }

    public function test_process_steps_returned_in_order()
    {
        MediaProcessStep::create([
            'step_number' => '03',
            'title' => 'Step 3',
            'subtitle' => 'Subtitle 3',
            'image_path' => 'process/step3.jpg',
            'description_left' => 'Left 3',
            'description_right' => 'Right 3',
            'order' => 3
        ]);

        MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Step 1',
            'subtitle' => 'Subtitle 1',
            'image_path' => 'process/step1.jpg',
            'description_left' => 'Left 1',
            'description_right' => 'Right 1',
            'order' => 1
        ]);

        MediaProcessStep::create([
            'step_number' => '02',
            'title' => 'Step 2',
            'subtitle' => 'Subtitle 2',
            'image_path' => 'process/step2.jpg',
            'description_left' => 'Left 2',
            'description_right' => 'Right 2',
            'order' => 2
        ]);

        $response = $this->getJson('/api/admin/media-process-steps');

        $response->assertStatus(200);
        
        $steps = $response->json('data');
        $this->assertEquals('Step 1', $steps[0]['title']);
        $this->assertEquals('Step 2', $steps[1]['title']);
        $this->assertEquals('Step 3', $steps[2]['title']);
    }

    public function test_image_path_normalized_in_response()
    {
        $image = UploadedFile::fake()->image('test.jpg', 800, 600)->size(1024);

        $response = $this->postJson('/api/admin/media-process-steps', [
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'description_left' => 'Left description',
            'description_right' => 'Right description',
            'image' => $image
        ]);

        $response->assertStatus(201);
        
        $responseData = $response->json('data');
        $this->assertStringNotContainsString('/storage/', $responseData['image_path']);
    }

    public function test_handles_russian_text_content()
    {
        $image = UploadedFile::fake()->image('russian.jpg', 800, 600)->size(1024);

        $response = $this->postJson('/api/admin/media-process-steps', [
            'step_number' => '01',
            'title' => 'Первый шаг процесса',
            'subtitle' => 'Подзаголовок шага',
            'description_left' => 'Описание левой части с русским текстом и символами.',
            'description_right' => 'Описание правой части процесса на русском языке.',
            'image' => $image
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'step_number' => '01',
                        'title' => 'Первый шаг процесса',
                        'subtitle' => 'Подзаголовок шага',
                        'description_left' => 'Описание левой части с русским текстом и символами.',
                        'description_right' => 'Описание правой части процесса на русском языке.'
                    ]
                ]);
    }

    public function test_handles_empty_descriptions()
    {
        $image = UploadedFile::fake()->image('test.jpg', 800, 600)->size(1024);

        $response = $this->postJson('/api/admin/media-process-steps', [
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'description_left' => '',
            'description_right' => '',
            'image' => $image
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['description_left', 'description_right']);
    }
}