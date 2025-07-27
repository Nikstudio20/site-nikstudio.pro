<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaPageContent;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaPageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_media_page_content()
    {
        // Create test data
        MediaPageContent::create([
            'hero_title' => 'Test Hero Title',
            'hero_description' => 'Test Hero Description',
            'testimonials_title' => 'Test Testimonials Title',
            'testimonials_subtitle' => 'Test Testimonials Subtitle',
            'process_title' => 'Test Process Title',
            'process_subtitle' => 'Test Process Subtitle'
        ]);

        $response = $this->getJson('/api/admin/media-page');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'hero_title' => 'Test Hero Title',
                        'hero_description' => 'Test Hero Description',
                        'testimonials_title' => 'Test Testimonials Title',
                        'testimonials_subtitle' => 'Test Testimonials Subtitle',
                        'process_title' => 'Test Process Title',
                        'process_subtitle' => 'Test Process Subtitle'
                    ]
                ]);
    }

    public function test_can_update_hero_section()
    {
        $data = [
            'hero_title' => 'Updated Hero Title',
            'hero_description' => 'Updated Hero Description'
        ];

        $response = $this->putJson('/api/admin/media-page/hero', $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Секция героя успешно обновлена',
                    'data' => [
                        'hero_title' => 'Updated Hero Title',
                        'hero_description' => 'Updated Hero Description'
                    ]
                ]);

        $this->assertDatabaseHas('media_page_content', [
            'hero_title' => 'Updated Hero Title',
            'hero_description' => 'Updated Hero Description'
        ]);
    }

    public function test_hero_validation_fails_with_empty_data()
    {
        $response = $this->putJson('/api/admin/media-page/hero', []);

        $response->assertStatus(422)
                ->assertJson([
                    'success' => false,
                    'message' => 'Ошибка валидации данных'
                ])
                ->assertJsonValidationErrors(['hero_title', 'hero_description']);
    }

    public function test_can_update_testimonials_header()
    {
        $data = [
            'testimonials_title' => 'Updated Testimonials Title',
            'testimonials_subtitle' => 'Updated Testimonials Subtitle'
        ];

        $response = $this->putJson('/api/admin/media-page/testimonials-header', $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Заголовок отзывов успешно обновлен'
                ]);
    }

    public function test_can_update_process_header()
    {
        $data = [
            'process_title' => 'Updated Process Title',
            'process_subtitle' => 'Updated Process Subtitle'
        ];

        $response = $this->putJson('/api/admin/media-page/process-header', $data);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Заголовок процесса успешно обновлен'
                ]);
    }
}