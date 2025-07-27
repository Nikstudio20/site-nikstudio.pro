<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MediaProcessStep;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaProcessStepTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_media_process_step()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'process/step1.jpg',
            'description_left' => 'Left description content',
            'description_right' => 'Right description content',
            'order' => 1
        ]);

        $this->assertInstanceOf(MediaProcessStep::class, $step);
        $this->assertEquals('01', $step->step_number);
        $this->assertEquals('Test Step', $step->title);
        $this->assertEquals('Test Subtitle', $step->subtitle);
        $this->assertEquals('process/step1.jpg', $step->image_path);
        $this->assertEquals('Left description content', $step->description_left);
        $this->assertEquals('Right description content', $step->description_right);
        $this->assertEquals(1, $step->order);
    }

    public function test_fillable_attributes()
    {
        $step = new MediaProcessStep();
        $expectedFillable = [
            'step_number',
            'title',
            'subtitle',
            'image_path',
            'description_left',
            'description_right',
            'order'
        ];

        $this->assertEquals($expectedFillable, $step->getFillable());
    }

    public function test_can_update_process_step_order()
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

        $step1->update(['order' => 3]);
        $step2->update(['order' => 1]);

        $this->assertEquals(3, $step1->fresh()->order);
        $this->assertEquals(1, $step2->fresh()->order);
    }

    public function test_can_update_step_content()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Original Title',
            'subtitle' => 'Original Subtitle',
            'image_path' => 'process/original.jpg',
            'description_left' => 'Original left',
            'description_right' => 'Original right',
            'order' => 1
        ]);

        $step->update([
            'step_number' => '02',
            'title' => 'Updated Title',
            'subtitle' => 'Updated Subtitle',
            'image_path' => 'process/updated.jpg',
            'description_left' => 'Updated left description',
            'description_right' => 'Updated right description'
        ]);

        $updatedStep = $step->fresh();
        $this->assertEquals('02', $updatedStep->step_number);
        $this->assertEquals('Updated Title', $updatedStep->title);
        $this->assertEquals('Updated Subtitle', $updatedStep->subtitle);
        $this->assertEquals('process/updated.jpg', $updatedStep->image_path);
        $this->assertEquals('Updated left description', $updatedStep->description_left);
        $this->assertEquals('Updated right description', $updatedStep->description_right);
    }

    public function test_handles_long_descriptions()
    {
        $longLeftDescription = str_repeat('This is a long left description. ', 100);
        $longRightDescription = str_repeat('This is a long right description. ', 100);

        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'process/test.jpg',
            'description_left' => $longLeftDescription,
            'description_right' => $longRightDescription,
            'order' => 1
        ]);

        $this->assertEquals($longLeftDescription, $step->description_left);
        $this->assertEquals($longRightDescription, $step->description_right);
        $this->assertTrue(strlen($step->description_left) > 2000);
        $this->assertTrue(strlen($step->description_right) > 2000);
    }

    public function test_handles_special_characters_in_descriptions()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Шаг с русскими символами',
            'subtitle' => 'Подзаголовок с символами',
            'image_path' => 'process/russian.jpg',
            'description_left' => 'Левое описание с символами: @#$%^&*()_+-={}[]|\\:";\'<>?,./`~',
            'description_right' => 'Правое описание на русском языке с эмодзи 🚀 и символами',
            'order' => 1
        ]);

        $this->assertEquals('Шаг с русскими символами', $step->title);
        $this->assertEquals('Подзаголовок с символами', $step->subtitle);
        $this->assertStringContainsString('@#$%^&*()', $step->description_left);
        $this->assertStringContainsString('🚀', $step->description_right);
    }

    public function test_can_handle_empty_descriptions()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'process/test.jpg',
            'description_left' => '',
            'description_right' => '',
            'order' => 1
        ]);

        $this->assertEquals('', $step->description_left);
        $this->assertEquals('', $step->description_right);
    }

    public function test_can_handle_null_descriptions()
    {
        $step = MediaProcessStep::create([
            'step_number' => '01',
            'title' => 'Test Step',
            'subtitle' => 'Test Subtitle',
            'image_path' => 'process/test.jpg',
            'description_left' => null,
            'description_right' => null,
            'order' => 1
        ]);

        $this->assertNull($step->description_left);
        $this->assertNull($step->description_right);
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

        $stepId = $step->id;
        $step->delete();

        $this->assertNull(MediaProcessStep::find($stepId));
    }
}