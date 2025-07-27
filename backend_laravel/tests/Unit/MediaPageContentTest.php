<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MediaPageContent;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaPageContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_media_page_content()
    {
        $content = MediaPageContent::create([
            'hero_title' => 'Test Hero Title',
            'hero_description' => 'Test Hero Description',
            'testimonials_title' => 'Test Testimonials Title',
            'testimonials_subtitle' => 'Test Testimonials Subtitle',
            'process_title' => 'Test Process Title',
            'process_subtitle' => 'Test Process Subtitle'
        ]);

        $this->assertInstanceOf(MediaPageContent::class, $content);
        $this->assertEquals('Test Hero Title', $content->hero_title);
        $this->assertEquals('Test Hero Description', $content->hero_description);
        $this->assertEquals('Test Testimonials Title', $content->testimonials_title);
        $this->assertEquals('Test Testimonials Subtitle', $content->testimonials_subtitle);
        $this->assertEquals('Test Process Title', $content->process_title);
        $this->assertEquals('Test Process Subtitle', $content->process_subtitle);
    }

    public function test_fillable_attributes()
    {
        $content = new MediaPageContent();
        $expectedFillable = [
            'hero_title',
            'hero_description',
            'testimonials_title',
            'testimonials_subtitle',
            'process_title',
            'process_subtitle'
        ];

        $this->assertEquals($expectedFillable, $content->getFillable());
    }

    public function test_table_name()
    {
        $content = new MediaPageContent();
        $this->assertEquals('media_page_content', $content->getTable());
    }

    public function test_can_update_hero_content()
    {
        $content = MediaPageContent::create([
            'hero_title' => 'Original Title',
            'hero_description' => 'Original Description',
            'testimonials_title' => 'Test Testimonials',
            'testimonials_subtitle' => 'Test Subtitle',
            'process_title' => 'Test Process',
            'process_subtitle' => 'Test Process Subtitle'
        ]);

        $content->update([
            'hero_title' => 'Updated Title',
            'hero_description' => 'Updated Description'
        ]);

        $this->assertEquals('Updated Title', $content->fresh()->hero_title);
        $this->assertEquals('Updated Description', $content->fresh()->hero_description);
    }

    public function test_can_update_testimonials_header()
    {
        $content = MediaPageContent::create([
            'hero_title' => 'Test Hero',
            'hero_description' => 'Test Description',
            'testimonials_title' => 'Original Testimonials',
            'testimonials_subtitle' => 'Original Subtitle',
            'process_title' => 'Test Process',
            'process_subtitle' => 'Test Process Subtitle'
        ]);

        $content->update([
            'testimonials_title' => 'Updated Testimonials',
            'testimonials_subtitle' => 'Updated Subtitle'
        ]);

        $this->assertEquals('Updated Testimonials', $content->fresh()->testimonials_title);
        $this->assertEquals('Updated Subtitle', $content->fresh()->testimonials_subtitle);
    }

    public function test_can_update_process_header()
    {
        $content = MediaPageContent::create([
            'hero_title' => 'Test Hero',
            'hero_description' => 'Test Description',
            'testimonials_title' => 'Test Testimonials',
            'testimonials_subtitle' => 'Test Subtitle',
            'process_title' => 'Original Process',
            'process_subtitle' => 'Original Process Subtitle'
        ]);

        $content->update([
            'process_title' => 'Updated Process',
            'process_subtitle' => 'Updated Process Subtitle'
        ]);

        $this->assertEquals('Updated Process', $content->fresh()->process_title);
        $this->assertEquals('Updated Process Subtitle', $content->fresh()->process_subtitle);
    }
}