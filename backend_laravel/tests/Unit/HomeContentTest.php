<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\HomeContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class HomeContentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    /** @test */
    public function it_can_validate_video_file_size()
    {
        $validSize = 30 * 1024 * 1024; // 30MB
        $invalidSize = 60 * 1024 * 1024; // 60MB

        $this->assertTrue(HomeContent::validateVideoSize($validSize));
        $this->assertFalse(HomeContent::validateVideoSize($invalidSize));
    }

    /** @test */
    public function it_can_validate_image_file_size()
    {
        $validSize = 1 * 1024 * 1024; // 1MB
        $invalidSize = 3 * 1024 * 1024; // 3MB

        $this->assertTrue(HomeContent::validateImageSize($validSize));
        $this->assertFalse(HomeContent::validateImageSize($invalidSize));
    }

    /** @test */
    public function it_can_validate_video_format()
    {
        $validVideoFile = UploadedFile::fake()->create('video.mp4', 1000, 'video/mp4');
        $invalidVideoFile = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');

        $this->assertTrue(HomeContent::validateVideoFormat($validVideoFile));
        $this->assertFalse(HomeContent::validateVideoFormat($invalidVideoFile));
    }

    /** @test */
    public function it_can_validate_image_format()
    {
        $validImageFile = UploadedFile::fake()->create('image.jpg', 1000, 'image/jpeg');
        $invalidImageFile = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');

        $this->assertTrue(HomeContent::validateImageFormat($validImageFile));
        $this->assertFalse(HomeContent::validateImageFormat($invalidImageFile));
    }

    /** @test */
    public function it_can_store_video_file_with_proper_naming()
    {
        $videoFile = UploadedFile::fake()->create('test-video.mp4', 1000, 'video/mp4');
        
        $storedPath = HomeContent::storeVideoFile($videoFile);
        
        $this->assertStringStartsWith('home/hero-videos/hero-video-', $storedPath);
        $this->assertStringEndsWith('.mp4', $storedPath);
        Storage::disk('public')->assertExists($storedPath);
    }

    /** @test */
    public function it_can_store_fallback_image_with_proper_naming()
    {
        $imageFile = UploadedFile::fake()->create('test-image.jpg', 1000, 'image/jpeg');
        
        $storedPath = HomeContent::storeFallbackImage($imageFile);
        
        $this->assertStringStartsWith('home/fallback-images/hero-fallback-', $storedPath);
        $this->assertStringEndsWith('.jpg', $storedPath);
        Storage::disk('public')->assertExists($storedPath);
    }

    /** @test */
    public function it_can_check_if_video_file_exists()
    {
        $homeContent = HomeContent::create([
            'hero_video_path' => 'home/hero-videos/test-video.mp4',
            'is_active' => true,
        ]);

        // File doesn't exist yet
        $this->assertFalse($homeContent->videoFileExists());

        // Create the file
        Storage::disk('public')->put('home/hero-videos/test-video.mp4', 'fake video content');
        
        // Now it should exist
        $this->assertTrue($homeContent->videoFileExists());
    }

    /** @test */
    public function it_can_get_video_metadata()
    {
        $homeContent = HomeContent::create([
            'hero_video_path' => 'home/hero-videos/test-video.mp4',
            'hero_video_original_name' => 'original-video.mp4',
            'hero_video_size' => 1024000,
            'is_active' => true,
        ]);

        // No metadata when file doesn't exist
        $this->assertNull($homeContent->getVideoMetadata());

        // Create the file
        Storage::disk('public')->put('home/hero-videos/test-video.mp4', 'fake video content');
        
        $metadata = $homeContent->getVideoMetadata();
        
        $this->assertIsArray($metadata);
        $this->assertEquals('home/hero-videos/test-video.mp4', $metadata['path']);
        $this->assertEquals('original-video.mp4', $metadata['original_name']);
        $this->assertEquals(1024000, $metadata['size']);
        $this->assertArrayHasKey('url', $metadata);
        $this->assertArrayHasKey('formatted_size', $metadata);
    }

    /** @test */
    public function it_can_cleanup_old_video_files()
    {
        $videoPath = 'home/hero-videos/old-video.mp4';
        
        // Create a fake video file
        Storage::disk('public')->put($videoPath, 'fake video content');
        Storage::disk('public')->assertExists($videoPath);
        
        // Clean up the file
        HomeContent::cleanupOldVideo($videoPath);
        
        // File should be deleted
        Storage::disk('public')->assertMissing($videoPath);
    }

    /** @test */
    public function it_can_cleanup_old_image_files()
    {
        $imagePath = 'home/fallback-images/old-image.jpg';
        
        // Create a fake image file
        Storage::disk('public')->put($imagePath, 'fake image content');
        Storage::disk('public')->assertExists($imagePath);
        
        // Clean up the file
        HomeContent::cleanupOldImage($imagePath);
        
        // File should be deleted
        Storage::disk('public')->assertMissing($imagePath);
    }

    /** @test */
    public function it_returns_correct_file_size_limits()
    {
        $this->assertEquals(50 * 1024 * 1024, HomeContent::getVideoSizeLimit());
        $this->assertEquals(2 * 1024 * 1024, HomeContent::getImageSizeLimit());
    }

    /** @test */
    public function it_returns_correct_storage_directories()
    {
        $this->assertEquals('home/hero-videos', HomeContent::getVideoStorageDirectory());
        $this->assertEquals('home/fallback-images', HomeContent::getFallbackImageStorageDirectory());
    }

    /** @test */
    public function it_can_get_active_home_content()
    {
        // Create inactive content
        HomeContent::create([
            'hero_video_path' => 'test1.mp4',
            'is_active' => false,
        ]);

        // Create active content
        $activeContent = HomeContent::create([
            'hero_video_path' => 'test2.mp4',
            'is_active' => true,
        ]);

        $retrieved = HomeContent::getActive();
        
        $this->assertNotNull($retrieved);
        $this->assertEquals($activeContent->id, $retrieved->id);
        $this->assertTrue($retrieved->is_active);
    }

    /** @test */
    public function it_can_set_as_active_and_deactivate_others()
    {
        // Create multiple home content records
        $content1 = HomeContent::create([
            'hero_video_path' => 'test1.mp4',
            'is_active' => true,
        ]);

        $content2 = HomeContent::create([
            'hero_video_path' => 'test2.mp4',
            'is_active' => false,
        ]);

        // Set content2 as active
        $content2->setAsActive();

        // Refresh from database
        $content1->refresh();
        $content2->refresh();

        $this->assertFalse($content1->is_active);
        $this->assertTrue($content2->is_active);
    }

    /** @test */
    public function it_formats_file_size_correctly()
    {
        $homeContent = HomeContent::create([
            'hero_video_size' => 1024, // 1KB
            'is_active' => true,
        ]);

        $this->assertEquals('1.0 KB', $homeContent->formatted_video_size);

        $homeContent->update(['hero_video_size' => 1024 * 1024]); // 1MB
        $this->assertEquals('1.0 MB', $homeContent->formatted_video_size);

        $homeContent->update(['hero_video_size' => 500]); // 500 bytes
        $this->assertEquals('500 B', $homeContent->formatted_video_size);
    }

    /** @test */
    public function it_returns_null_for_missing_video_url()
    {
        $homeContent = HomeContent::create([
            'hero_video_path' => null,
            'is_active' => true,
        ]);

        $this->assertNull($homeContent->hero_video_url);
    }

    /** @test */
    public function it_returns_null_for_missing_fallback_image_url()
    {
        $homeContent = HomeContent::create([
            'hero_fallback_image_path' => null,
            'is_active' => true,
        ]);

        $this->assertNull($homeContent->hero_fallback_image_url);
    }

    /** @test */
    public function it_validates_file_name_security()
    {
        $this->assertTrue(HomeContent::validateFileName('valid-file.mp4'));
        $this->assertTrue(HomeContent::validateFileName('test_video.mp4'));
        
        // Invalid file names
        $this->assertFalse(HomeContent::validateFileName(''));
        $this->assertFalse(HomeContent::validateFileName('../../../etc/passwd'));
        $this->assertFalse(HomeContent::validateFileName('file/with/slash.mp4'));
        $this->assertFalse(HomeContent::validateFileName('file\\with\\backslash.mp4'));
        $this->assertFalse(HomeContent::validateFileName("file\0with\0null.mp4"));
        $this->assertFalse(HomeContent::validateFileName(str_repeat('a', 256) . '.mp4')); // Too long
    }

    /** @test */
    public function it_validates_file_extension_for_videos()
    {
        $validVideoFile = UploadedFile::fake()->create('video.mp4', 1000, 'video/mp4');
        $invalidVideoFile = UploadedFile::fake()->create('video.txt', 1000, 'text/plain');

        $this->assertTrue(HomeContent::validateFileExtension($validVideoFile, 'video'));
        $this->assertFalse(HomeContent::validateFileExtension($invalidVideoFile, 'video'));
    }

    /** @test */
    public function it_validates_file_extension_for_images()
    {
        $validImageFile = UploadedFile::fake()->create('image.jpg', 1000, 'image/jpeg');
        $invalidImageFile = UploadedFile::fake()->create('image.txt', 1000, 'text/plain');

        $this->assertTrue(HomeContent::validateFileExtension($validImageFile, 'image'));
        $this->assertFalse(HomeContent::validateFileExtension($invalidImageFile, 'image'));
    }

    /** @test */
    public function it_validates_file_integrity()
    {
        // Valid file
        $validFile = UploadedFile::fake()->create('video.mp4', 5000, 'video/mp4');
        $this->assertNull(HomeContent::validateFileIntegrity($validFile));

        // Empty file
        $emptyFile = UploadedFile::fake()->create('empty.mp4', 0, 'video/mp4');
        $issues = HomeContent::validateFileIntegrity($emptyFile);
        $this->assertIsArray($issues);
        $this->assertContains('File is empty', $issues);

        // Very small file
        $smallFile = UploadedFile::fake()->create('small.mp4', 500, 'video/mp4');
        $issues = HomeContent::validateFileIntegrity($smallFile);
        $this->assertIsArray($issues);
        $this->assertContains('File is suspiciously small', $issues);
    }

    /** @test */
    public function it_gets_comprehensive_file_validation_errors()
    {
        // Valid video file
        $validFile = UploadedFile::fake()->create('video.mp4', 5000, 'video/mp4');
        $errors = HomeContent::getFileValidationErrors($validFile, 'video');
        $this->assertEmpty($errors);

        // Invalid file (too large)
        $largeFile = UploadedFile::fake()->create('large.mp4', 60 * 1024 * 1024, 'video/mp4'); // 60MB
        $errors = HomeContent::getFileValidationErrors($largeFile, 'video');
        $this->assertNotEmpty($errors);
        $this->assertContains('Video file size exceeds 50MB limit', $errors);

        // Invalid image file (wrong format)
        $wrongFormatFile = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');
        $errors = HomeContent::getFileValidationErrors($wrongFormatFile, 'image');
        $this->assertNotEmpty($errors);
        $this->assertTrue(in_array('Invalid file extension. Allowed: JPG, JPEG, PNG, GIF, WebP', $errors) || 
                         in_array('Invalid image file format', $errors));
    }

    /** @test */
    public function it_cleans_up_all_files()
    {
        // Create fake files
        $videoPath = 'home/hero-videos/test-video.mp4';
        $imagePath = 'home/fallback-images/test-image.jpg';
        
        Storage::disk('public')->put($videoPath, 'fake video content');
        Storage::disk('public')->put($imagePath, 'fake image content');
        
        $homeContent = HomeContent::create([
            'hero_video_path' => $videoPath,
            'hero_fallback_image_path' => $imagePath,
            'is_active' => true,
        ]);

        // Clean up all files
        $homeContent->cleanupAllFiles();

        // Files should be deleted
        Storage::disk('public')->assertMissing($videoPath);
        Storage::disk('public')->assertMissing($imagePath);
    }

    /** @test */
    public function it_checks_storage_health()
    {
        $status = HomeContent::checkStorageHealth();
        
        $this->assertIsArray($status);
        $this->assertArrayHasKey('healthy', $status);
        $this->assertArrayHasKey('issues', $status);
        $this->assertArrayHasKey('info', $status);
        $this->assertIsBool($status['healthy']);
        $this->assertIsArray($status['issues']);
        $this->assertIsArray($status['info']);
    }

    /** @test */
    public function it_returns_allowed_mime_types()
    {
        $videoMimeTypes = HomeContent::getAllowedVideoMimeTypes();
        $imageMimeTypes = HomeContent::getAllowedImageMimeTypes();

        $this->assertIsArray($videoMimeTypes);
        $this->assertIsArray($imageMimeTypes);
        $this->assertContains('video/mp4', $videoMimeTypes);
        $this->assertContains('image/jpeg', $imageMimeTypes);
    }

    /** @test */
    public function it_handles_null_cleanup_gracefully()
    {
        // Should not throw errors when cleaning up null paths
        HomeContent::cleanupOldVideo(null);
        HomeContent::cleanupOldImage(null);
        
        // Should not throw errors when cleaning up non-existent files
        HomeContent::cleanupOldVideo('non-existent-path.mp4');
        HomeContent::cleanupOldImage('non-existent-path.jpg');
        
        $this->assertTrue(true); // Test passes if no exceptions are thrown
    }
}