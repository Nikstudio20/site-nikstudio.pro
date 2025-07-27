# Home Hero Video Storage Implementation

## Overview

This document describes the file storage and cleanup functionality implemented for the home hero video feature. The implementation provides comprehensive file management capabilities including video and image storage, validation, cleanup, and URL generation.

## Storage Structure

```
storage/app/public/
└── home/
    ├── hero-videos/
    │   └── hero-video-{timestamp}.{extension}
    └── fallback-images/
        └── hero-fallback-{timestamp}.{extension}
```

## Model Methods (HomeContent)

### File Storage Methods

- `storeVideoFile($file)` - Store video file with timestamp-based naming
- `storeFallbackImage($file)` - Store fallback image with timestamp-based naming
- `getVideoStorageDirectory()` - Returns 'home/hero-videos'
- `getFallbackImageStorageDirectory()` - Returns 'home/fallback-images'

### File Validation Methods

- `validateVideoSize($fileSize)` - Validates video file size (50MB limit)
- `validateImageSize($fileSize)` - Validates image file size (2MB limit)
- `validateVideoFormat($file)` - Validates video MIME type
- `validateImageFormat($file)` - Validates image MIME type
- `getAllowedVideoMimeTypes()` - Returns array of allowed video MIME types
- `getAllowedImageMimeTypes()` - Returns array of allowed image MIME types
- `getVideoSizeLimit()` - Returns 52428800 (50MB in bytes)
- `getImageSizeLimit()` - Returns 2097152 (2MB in bytes)

### File Cleanup Methods

- `cleanupOldVideo($path)` - Delete old video file from storage
- `cleanupOldImage($path)` - Delete old image file from storage
- `cleanupAllFiles()` - Clean up all files associated with the record

### File Existence and Metadata

- `videoFileExists()` - Check if video file exists in storage
- `fallbackImageExists()` - Check if fallback image file exists in storage
- `getVideoMetadata()` - Get comprehensive video file metadata

### URL Accessors

- `getHeroVideoUrlAttribute()` - Get full URL for hero video
- `getHeroFallbackImageUrlAttribute()` - Get full URL for fallback image
- `getFormattedVideoSizeAttribute()` - Get human-readable file size

## API Endpoints

### GET /api/home
Returns current home content configuration including video and image URLs.

### POST /api/home/hero-video
Upload new hero video with validation:
- File size limit: 50MB
- Allowed formats: MP4, MOV, AVI, WebM
- Automatic cleanup of old video files

### POST /api/home/fallback-image
Upload fallback image with validation:
- File size limit: 2MB
- Allowed formats: JPEG, PNG, GIF, WebP
- Automatic cleanup of old image files

### DELETE /api/home/hero-video
Delete current hero video and clean up associated files.

## File Validation

### Video Files
- **Size Limit**: 50MB (52,428,800 bytes)
- **MIME Types**: 
  - video/mp4
  - video/mpeg
  - video/quicktime
  - video/x-msvideo (AVI)
  - video/webm

### Image Files
- **Size Limit**: 2MB (2,097,152 bytes)
- **MIME Types**:
  - image/jpeg
  - image/png
  - image/gif
  - image/webp

## File Naming Convention

### Video Files
Format: `hero-video-{YYYY-MM-DD_HH-mm-ss}.{extension}`
Example: `hero-video-2025-01-18_14-30-45.mp4`

### Image Files
Format: `hero-fallback-{YYYY-MM-DD_HH-mm-ss}.{extension}`
Example: `hero-fallback-2025-01-18_14-30-45.jpg`

## Automatic Cleanup

The system automatically handles file cleanup in the following scenarios:

1. **Video Upload**: When a new video is uploaded, the old video file is automatically deleted
2. **Image Upload**: When a new fallback image is uploaded, the old image file is automatically deleted
3. **Video Deletion**: When a video is deleted via API, the file is removed from storage
4. **Record Cleanup**: The `cleanupAllFiles()` method can clean up all files associated with a record

## Error Handling

The implementation includes comprehensive error handling for:

- File upload errors (size, format, corruption)
- Storage failures
- File validation errors
- Missing file scenarios
- Network and server errors

## Security Features

- Server-side file validation
- MIME type checking
- File size limits
- Secure file storage outside web root
- Proper error logging without exposing sensitive information

## Testing

The implementation includes comprehensive tests covering:

- File size validation
- MIME type validation
- File storage operations
- Cleanup functionality
- API endpoint testing
- Error scenario handling

## Usage Examples

### Upload Video File
```php
$file = $request->file('hero_video');
$path = HomeContent::storeVideoFile($file);
```

### Validate File
```php
if (!HomeContent::validateVideoSize($file->getSize())) {
    // Handle size error
}

if (!HomeContent::validateVideoFormat($file)) {
    // Handle format error
}
```

### Cleanup Old Files
```php
HomeContent::cleanupOldVideo($oldPath);
```

### Get File Metadata
```php
$metadata = $homeContent->getVideoMetadata();
// Returns array with path, url, size, mime_type, etc.
```

This implementation provides a robust, secure, and maintainable file storage system for the home hero video feature.