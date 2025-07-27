<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MediaTestimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaTestimonialTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_media_testimonial()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Test Company',
            'quote' => 'This is a test quote',
            'description' => 'This is a test description',
            'image_path' => 'testimonials/test-image.jpg',
            'order' => 1
        ]);

        $this->assertInstanceOf(MediaTestimonial::class, $testimonial);
        $this->assertEquals('Test Company', $testimonial->company);
        $this->assertEquals('This is a test quote', $testimonial->quote);
        $this->assertEquals('This is a test description', $testimonial->description);
        $this->assertEquals('testimonials/test-image.jpg', $testimonial->image_path);
        $this->assertEquals(1, $testimonial->order);
    }

    public function test_fillable_attributes()
    {
        $testimonial = new MediaTestimonial();
        $expectedFillable = [
            'company',
            'quote',
            'description',
            'image_path',
            'order'
        ];

        $this->assertEquals($expectedFillable, $testimonial->getFillable());
    }

    public function test_can_update_testimonial_order()
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

        $testimonial1->update(['order' => 3]);
        $testimonial2->update(['order' => 1]);

        $this->assertEquals(3, $testimonial1->fresh()->order);
        $this->assertEquals(1, $testimonial2->fresh()->order);
    }

    public function test_can_update_testimonial_content()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Original Company',
            'quote' => 'Original Quote',
            'description' => 'Original Description',
            'image_path' => 'testimonials/original.jpg',
            'order' => 1
        ]);

        $testimonial->update([
            'company' => 'Updated Company',
            'quote' => 'Updated Quote',
            'description' => 'Updated Description',
            'image_path' => 'testimonials/updated.jpg'
        ]);

        $updatedTestimonial = $testimonial->fresh();
        $this->assertEquals('Updated Company', $updatedTestimonial->company);
        $this->assertEquals('Updated Quote', $updatedTestimonial->quote);
        $this->assertEquals('Updated Description', $updatedTestimonial->description);
        $this->assertEquals('testimonials/updated.jpg', $updatedTestimonial->image_path);
    }

    public function test_handles_long_text_content()
    {
        $longQuote = str_repeat('This is a very long quote. ', 50);
        $longDescription = str_repeat('This is a very long description. ', 100);

        $testimonial = MediaTestimonial::create([
            'company' => 'Test Company',
            'quote' => $longQuote,
            'description' => $longDescription,
            'image_path' => 'testimonials/test.jpg',
            'order' => 1
        ]);

        $this->assertEquals($longQuote, $testimonial->quote);
        $this->assertEquals($longDescription, $testimonial->description);
        $this->assertTrue(strlen($testimonial->quote) > 1000);
        $this->assertTrue(strlen($testimonial->description) > 2000);
    }

    public function test_handles_special_characters()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Компания "Тест" & Co.',
            'quote' => 'Это отличная работа! Мы очень довольны результатом.',
            'description' => 'Описание с символами: @#$%^&*()_+-={}[]|\\:";\'<>?,./`~',
            'image_path' => 'testimonials/special-chars.jpg',
            'order' => 1
        ]);

        $this->assertEquals('Компания "Тест" & Co.', $testimonial->company);
        $this->assertEquals('Это отличная работа! Мы очень довольны результатом.', $testimonial->quote);
        $this->assertStringContainsString('@#$%^&*()', $testimonial->description);
    }

    public function test_can_delete_testimonial()
    {
        $testimonial = MediaTestimonial::create([
            'company' => 'Test Company',
            'quote' => 'Test Quote',
            'description' => 'Test Description',
            'image_path' => 'testimonials/test.jpg',
            'order' => 1
        ]);

        $testimonialId = $testimonial->id;
        $testimonial->delete();

        $this->assertNull(MediaTestimonial::find($testimonialId));
    }
}