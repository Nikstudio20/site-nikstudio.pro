<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaTestimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MediaTestimonialsControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_can_list_all_testimonials()
    {
        MediaTestimonial::create([
            'company' => 'Company 1',
            'quote' => 'Quote 1',
            'description' => 'Description 1',
            'image_path' => 'testimonials/image1.jpg',
            'order' => 1
        ]);

        MediaTestimonial::create([
            'company' => 'Company 2',
            'quote' => 'Quote 2',
            'description' => 'Description 2',
            'image_path' => 'testimonials/image2.jpg',
            'order' => 2
        ]);

        $response = $this->getJson('/api/admin/media-testimonials');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        [
                            'company' => 'Company 1',
                            'quote' => 'Quote 1',
                            'description' => 'Description 1',
                            'order' => 1
                        ],
                        [
                            'company' => 'Company 2',
                            'quote' => 'Quote 2',
                            'description' => 'Description 2',
                            'order' => 2
                        ]
                    ]
                ]);
    }

    public function test_can_create_testimonial_with_image()
    {
        $image = UploadedFile::fake()->image('testimonial.jpg', 400, 400)->size(1024); // 1MB

        $response = $this->postJson('/api/admin/media-testimonials', [
            'company' => 'Test Company',
            'quote' => 'This is a great service!',
            'description' => 'We are very satisfied with the results.',
            'image' => $image
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Отзыв успешно создан',
                    'data' => [
                        'company' => 'Test Company',
                        'quote' => 'This is a great service!',
                        'description' => 'We are very satisfied with the results.'
                    ]
                ]);

        $this->assertDatabaseHas('media_testimonials', [
            'company' => 'Test Company',
            'quote' => 'This is a great service!',
            'description' => 'We are very satisfied with the results.'
        ]);
    }

    public function test_create_testimonial_validation_fails_with_empty_data()
    {
        $response = $this->postJson('/api/admin/media-testimonials', []);

        $response->assertStatus(422)
                ->assertJson([
                    'success' => false,
                    'message' => 'Ошибка валидации данных'
                ])
                ->assertJsonValidationErrors(['company', 'quote', 'description', 'image']);
    }

    public function test_create_testimonial_validation_fails_with_oversized_image()
    {
        $oversizedImage = UploadedFile::fake()->image('large.jpg', 2000, 2000)->size(3072); // 3MB

        $response = $this->postJson('/api/admin/media-testimonials', [
            'company' => 'Test Company',
            'quote' => 'Test quote',
            'description' => 'Test description',
            'image' => $oversizedImage
        ]);

        $response->assertStatus(413)
                ->assertJson([
                    'success' => false,
                    'message' => 'Размер файла превышает допустимый лимит'
                ]);
    }

    public function test_create_testimonial_validation_fails_with_invalid_image_type()
    {
        $textFile = UploadedFile::fake()->create('document.txt', 100, 'text/plain');

        $response = $this->postJson('/api/admin/media-testimonials', [
            'company' => 'Test Company',
            'quote' => 'Test quote',
            'description' => 'Test description',
            'image' => $textFile
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['image']);
    }

    public function test_can_update_testimonial()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Original Company',
            'quote' => 'Original quote',
            'description' => 'Original description',
            'image_path' => 'testimonials/original.jpg',
            'order' => 1
        ]);

        $response = $this->putJson("/api/admin/media-testimonials/{$testimonial->id}", [
            'company' => 'Updated Company',
            'quote' => 'Updated quote',
            'description' => 'Updated description'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Отзыв успешно обновлен',
                    'data' => [
                        'company' => 'Updated Company',
                        'quote' => 'Updated quote',
                        'description' => 'Updated description'
                    ]
                ]);

        $this->assertDatabaseHas('media_testimonials', [
            'id' => $testimonial->id,
            'company' => 'Updated Company',
            'quote' => 'Updated quote',
            'description' => 'Updated description'
        ]);
    }

    public function test_can_update_testimonial_with_new_image()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Test Company',
            'quote' => 'Test quote',
            'description' => 'Test description',
            'image_path' => 'testimonials/old.jpg',
            'order' => 1
        ]);

        $newImage = UploadedFile::fake()->image('new.jpg', 400, 400)->size(1024);

        $response = $this->putJson("/api/admin/media-testimonials/{$testimonial->id}", [
            'company' => 'Updated Company',
            'quote' => 'Updated quote',
            'description' => 'Updated description',
            'image' => $newImage
        ]);

        $response->assertStatus(200);

        $updatedTestimonial = $testimonial->fresh();
        $this->assertEquals('Updated Company', $updatedTestimonial->company);
        $this->assertNotEquals('testimonials/old.jpg', $updatedTestimonial->image_path);
    }

    public function test_update_testimonial_validation_fails()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Test Company',
            'quote' => 'Test quote',
            'description' => 'Test description',
            'image_path' => 'testimonials/test.jpg',
            'order' => 1
        ]);

        $response = $this->putJson("/api/admin/media-testimonials/{$testimonial->id}", [
            'company' => '', // Empty company
            'quote' => 'Valid quote',
            'description' => 'Valid description'
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['company']);
    }

    public function test_can_delete_testimonial()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Test Company',
            'quote' => 'Test quote',
            'description' => 'Test description',
            'image_path' => 'testimonials/test.jpg',
            'order' => 1
        ]);

        $response = $this->deleteJson("/api/admin/media-testimonials/{$testimonial->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Отзыв успешно удален'
                ]);

        $this->assertDatabaseMissing('media_testimonials', [
            'id' => $testimonial->id
        ]);
    }

    public function test_can_reorder_testimonials()
    {
        $testimonial1 = MediaTestimonial::create([
            'company' => 'Company 1',
            'quote' => 'Quote 1',
            'description' => 'Description 1',
            'image_path' => 'testimonials/image1.jpg',
            'order' => 1
        ]);

        $testimonial2 = MediaTestimonial::create([
            'company' => 'Company 2',
            'quote' => 'Quote 2',
            'description' => 'Description 2',
            'image_path' => 'testimonials/image2.jpg',
            'order' => 2
        ]);

        $testimonial3 = MediaTestimonial::create([
            'company' => 'Company 3',
            'quote' => 'Quote 3',
            'description' => 'Description 3',
            'image_path' => 'testimonials/image3.jpg',
            'order' => 3
        ]);

        $data = [
            'order' => [
                ['id' => $testimonial3->id, 'order' => 1],
                ['id' => $testimonial1->id, 'order' => 2],
                ['id' => $testimonial2->id, 'order' => 3]
            ]
        ];

        $response = $this->postJson('/api/admin/media-testimonials/reorder', $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Порядок отзывов успешно обновлен'
                ]);

        $this->assertEquals(2, $testimonial1->fresh()->order);
        $this->assertEquals(3, $testimonial2->fresh()->order);
        $this->assertEquals(1, $testimonial3->fresh()->order);
    }

    public function test_reorder_validation_fails_with_invalid_data()
    {
        $response = $this->postJson('/api/admin/media-testimonials/reorder', [
            'order' => 'invalid'
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['order']);
    }

    public function test_returns_404_for_nonexistent_testimonial()
    {
        $response = $this->putJson('/api/admin/media-testimonials/999', [
            'company' => 'Updated Company',
            'quote' => 'Updated quote',
            'description' => 'Updated description'
        ]);

        $response->assertStatus(404)
                ->assertJson([
                    'success' => false,
                    'message' => 'Отзыв не найден'
                ]);
    }

    public function test_testimonials_returned_in_order()
    {
        MediaTestimonial::create([
            'company' => 'Company 3',
            'quote' => 'Quote 3',
            'description' => 'Description 3',
            'image_path' => 'testimonials/image3.jpg',
            'order' => 3
        ]);

        MediaTestimonial::create([
            'company' => 'Company 1',
            'quote' => 'Quote 1',
            'description' => 'Description 1',
            'image_path' => 'testimonials/image1.jpg',
            'order' => 1
        ]);

        MediaTestimonial::create([
            'company' => 'Company 2',
            'quote' => 'Quote 2',
            'description' => 'Description 2',
            'image_path' => 'testimonials/image2.jpg',
            'order' => 2
        ]);

        $response = $this->getJson('/api/admin/media-testimonials');

        $response->assertStatus(200);
        
        $testimonials = $response->json('data');
        $this->assertEquals('Company 1', $testimonials[0]['company']);
        $this->assertEquals('Company 2', $testimonials[1]['company']);
        $this->assertEquals('Company 3', $testimonials[2]['company']);
    }

    public function test_image_path_normalized_in_response()
    {
        $image = UploadedFile::fake()->image('test.jpg', 400, 400)->size(1024);

        $response = $this->postJson('/api/admin/media-testimonials', [
            'company' => 'Test Company',
            'quote' => 'Test quote',
            'description' => 'Test description',
            'image' => $image
        ]);

        $response->assertStatus(201);
        
        $responseData = $response->json('data');
        $this->assertStringNotContainsString('/storage/', $responseData['image_path']);
    }

    public function test_handles_russian_text_content()
    {
        $image = UploadedFile::fake()->image('russian.jpg', 400, 400)->size(1024);

        $response = $this->postJson('/api/admin/media-testimonials', [
            'company' => 'Российская Компания "Тест"',
            'quote' => 'Отличная работа! Мы очень довольны результатом.',
            'description' => 'Подробное описание нашего опыта сотрудничества с компанией.',
            'image' => $image
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'company' => 'Российская Компания "Тест"',
                        'quote' => 'Отличная работа! Мы очень довольны результатом.',
                        'description' => 'Подробное описание нашего опыта сотрудничества с компанией.'
                    ]
                ]);
    }
}