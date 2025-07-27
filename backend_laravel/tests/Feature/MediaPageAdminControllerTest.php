<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MediaPageContent;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaPageAdminControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create initial content
        MediaPageContent::create([
            'hero_title' => 'Initial Hero Title',
            'hero_description' => 'Initial Hero Description',
            'testimonials_title' => 'Initial Testimonials Title',
            'testimonials_subtitle' => 'Initial Testimonials Subtitle',
            'process_title' => 'Initial Process Title',
            'process_subtitle' => 'Initial Process Subtitle'
        ]);
    }

    public function test_get_media_page_admin_returns_current_content()
    {
        $response = $this->getJson('/api/admin/media-page');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'hero' => [
                        'title',
                        'description'
                    ],
                    'testimonials' => [
                        'title',
                        'subtitle'
                    ],
                    'process' => [
                        'title',
                        'subtitle'
                    ]
                ]
            ])
            ->assertJson([
                'success' => true,
                'data' => [
                    'hero' => [
                        'title' => 'Initial Hero Title',
                        'description' => 'Initial Hero Description'
                    ]
                ]
            ]);
    }

    public function test_update_hero_section_updates_content()
    {
        $updateData = [
            'title' => 'Updated Hero Title',
            'description' => 'Updated Hero Description'
        ];

        $response = $this->putJson('/api/admin/media-page/hero', $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Контент героя обновлен'
            ]);

        $this->assertDatabaseHas('media_page_content', [
            'hero_title' => 'Updated Hero Title',
            'hero_description' => 'Updated Hero Description'
        ]);
    }

    public function test_update_hero_section_validates_required_fields()
    {
        $response = $this->putJson('/api/admin/media-page/hero', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'description']);
    }

    public function test_update_testimonials_header_updates_content()
    {
        $updateData = [
            'title' => 'Updated Testimonials Title',
            'subtitle' => 'Updated Testimonials Subtitle'
        ];

        $response = $this->putJson('/api/admin/media-page/testimonials-header', $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Заголовок отзывов обновлен'
            ]);

        $this->assertDatabaseHas('media_page_content', [
            'testimonials_title' => 'Updated Testimonials Title',
            'testimonials_subtitle' => 'Updated Testimonials Subtitle'
        ]);
    }

    public function test_update_process_header_updates_content()
    {
        $updateData = [
            'title' => 'Updated Process Title',
            'subtitle' => 'Updated Process Subtitle'
        ];

        $response = $this->putJson('/api/admin/media-page/process-header', $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Заголовок процесса обновлен'
            ]);

        $this->assertDatabaseHas('media_process_steps', [
            'process_title' => 'Updated Process Title',
            'process_subtitle' => 'Updated Process Subtitle'
        ]);
    }

    public function test_update_hero_section_handles_empty_database()
    {
        // Clear existing content
        MediaPageContent::truncate();

        $updateData = [
            'title' => 'New Hero Title',
            'description' => 'New Hero Description'
        ];

        $response = $this->putJson('/api/admin/media-page/hero', $updateData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('media_page_content', [
            'hero_title' => 'New Hero Title',
            'hero_description' => 'New Hero Description'
        ]);
    }
}