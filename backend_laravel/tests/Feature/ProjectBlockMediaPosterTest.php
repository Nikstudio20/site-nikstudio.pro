<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Project;
use App\Models\ProjectDetail;
use App\Models\ProjectDetailBlock;
use App\Models\ProjectDetailBlockMedia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProjectBlockMediaPosterTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    /** @test */
    public function it_can_create_block_media_with_poster()
    {
        // Create test project structure
        $project = Project::factory()->create(['slug' => 'test-project']);
        $detail = ProjectDetail::factory()->create(['project_id' => $project->id]);
        $block = ProjectDetailBlock::factory()->create(['project_detail_id' => $detail->id]);

        // Create test files
        $videoFile = UploadedFile::fake()->create('video.mp4', 1024, 'video/mp4');
        $posterFile = UploadedFile::fake()->image('poster.jpg', 800, 600);

        $response = $this->postJson("/api/projects/{$project->slug}/blocks/{$block->id}/media", [
            'group_type' => 'single',
            'media_items' => [
                [
                    'file_type' => 'video',
                    'alt_text' => 'Test video',
                    'order' => 1,
                    'group_id' => 1
                ]
            ]
        ], [
            'media_items.0.file' => $videoFile,
            'media_items.0.poster' => $posterFile
        ]);

        $response->assertStatus(201);
        $response->assertJson(['success' => true]);

        // Verify database record
        $this->assertDatabaseHas('project_detail_block_media', [
            'project_detail_block_id' => $block->id,
            'file_type' => 'video',
            'alt_text' => 'Test video'
        ]);

        // Verify poster path is stored
        $mediaRecord = ProjectDetailBlockMedia::where('project_detail_block_id', $block->id)->first();
        $this->assertNotNull($mediaRecord->poster_path);
        $this->assertStringContains('/storage/', $mediaRecord->poster_path);

        // Verify files were stored
        Storage::disk('public')->assertExists(str_replace('/storage/', '', $mediaRecord->file_path));
        Storage::disk('public')->assertExists(str_replace('/storage/', '', $mediaRecord->poster_path));
    }

    /** @test */
    public function it_can_update_block_media_with_poster()
    {
        // Create test project structure
        $project = Project::factory()->create(['slug' => 'test-project']);
        $detail = ProjectDetail::factory()->create(['project_id' => $project->id]);
        $block = ProjectDetailBlock::factory()->create(['project_detail_id' => $detail->id]);

        // Create existing media record
        $existingMedia = ProjectDetailBlockMedia::create([
            'project_detail_block_id' => $block->id,
            'group_id' => 1,
            'group_type' => 'single',
            'file_type' => 'video',
            'file_path' => '/storage/old-video.mp4',
            'alt_text' => 'Old video',
            'order' => 1
        ]);

        // Create new test files
        $newVideoFile = UploadedFile::fake()->create('new-video.mp4', 1024, 'video/mp4');
        $newPosterFile = UploadedFile::fake()->image('new-poster.jpg', 800, 600);

        $response = $this->putJson("/api/projects/{$project->slug}/blocks/{$block->id}/media/1", [
            'group_type' => 'single',
            'media_items' => [
                [
                    'file_type' => 'video',
                    'alt_text' => 'Updated video',
                    'order' => 1,
                    'group_id' => 1
                ]
            ]
        ], [
            'media_items.0.file' => $newVideoFile,
            'media_items.0.poster' => $newPosterFile
        ]);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        // Verify updated record
        $updatedMedia = ProjectDetailBlockMedia::where('project_detail_block_id', $block->id)->first();
        $this->assertEquals('Updated video', $updatedMedia->alt_text);
        $this->assertNotNull($updatedMedia->poster_path);
        $this->assertStringContains('/storage/', $updatedMedia->poster_path);
    }

    /** @test */
    public function it_validates_poster_file_size()
    {
        // Create test project structure
        $project = Project::factory()->create(['slug' => 'test-project']);
        $detail = ProjectDetail::factory()->create(['project_id' => $project->id]);
        $block = ProjectDetailBlock::factory()->create(['project_detail_id' => $detail->id]);

        // Create oversized poster file (3MB)
        $videoFile = UploadedFile::fake()->create('video.mp4', 1024, 'video/mp4');
        $oversizedPoster = UploadedFile::fake()->create('large-poster.jpg', 3072, 'image/jpeg');

        $response = $this->postJson("/api/projects/{$project->slug}/blocks/{$block->id}/media", [
            'group_type' => 'single',
            'media_items' => [
                [
                    'file_type' => 'video',
                    'alt_text' => 'Test video',
                    'order' => 1,
                    'group_id' => 1
                ]
            ]
        ], [
            'media_items.0.file' => $videoFile,
            'media_items.0.poster' => $oversizedPoster
        ]);

        $response->assertStatus(422);
        $response->assertJson(['success' => false]);
        $response->assertJsonValidationErrors(['media_items.0.poster']);
    }
}