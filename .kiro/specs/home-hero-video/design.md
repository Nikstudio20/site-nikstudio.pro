# Design Document

## Overview

This feature will implement a home page hero video system that replaces the current static image with a dynamic video element. The system will include both frontend video display functionality and backend admin management capabilities with proper file validation and storage.

The solution follows the existing application patterns for media management, similar to the project detail media system, but simplified for a single home page hero video.

## Architecture

### Frontend Architecture
- **Home Page Component**: Modified to display video instead of static image
- **Admin Interface**: New section for hero video management
- **Video Component**: Reusable video player component with autoplay and loop functionality
- **File Upload Component**: Reusable component for video file selection and validation

### Backend Architecture
- **HomeContent Model**: New model to store home page configuration including hero video
- **HomeController**: New API controller for home page content management
- **File Storage**: Laravel storage system for video file management
- **Database**: New table for home page content configuration

## Components and Interfaces

### Frontend Components

#### 1. HeroVideoSection Component
```typescript
interface HeroVideoSectionProps {
  videoUrl?: string;
  fallbackImage?: string;
  className?: string;
}

// Features:
// - Autoplay without sound
// - Loop continuously
// - Responsive sizing
// - Fallback to image if no video
// - Error handling for failed video loads
```

#### 2. AdminHeroVideoManager Component
```typescript
interface AdminHeroVideoManagerProps {
  currentVideo?: HomeContent;
  onVideoUpdate: (video: HomeContent) => void;
}

// Features:
// - Current video preview
// - File upload with validation
// - Progress indicator during upload
// - Success/error message display
// - File size and format validation
```

#### 3. VideoUploadForm Component
```typescript
interface VideoUploadFormProps {
  onFileSelect: (file: File) => void;
  maxSize: number;
  acceptedFormats: string[];
  loading: boolean;
}

// Features:
// - Drag and drop support
// - File format validation
// - File size validation (50MB limit)
// - Upload progress display
// - Error message display
```

### Backend Components

#### 1. HomeContent Model
```php
class HomeContent extends Model
{
    protected $fillable = [
        'hero_video_path',
        'hero_video_original_name',
        'hero_video_size',
        'hero_fallback_image_path',
        'is_active'
    ];
    
    // Accessor for full video URL
    // File validation methods
    // Storage cleanup methods
}
```

#### 2. HomeController
```php
class HomeController extends Controller
{
    // GET /api/home - Get current home content
    // POST /api/home/hero-video - Upload new hero video
    // PUT /api/home/hero-video - Update hero video settings
    // DELETE /api/home/hero-video - Remove hero video
}
```

## Data Models

### HomeContent Table Schema
```sql
CREATE TABLE home_contents (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hero_video_path VARCHAR(255) NULL,
    hero_video_original_name VARCHAR(255) NULL,
    hero_video_size BIGINT UNSIGNED NULL,
    hero_fallback_image_path VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### API Response Format
```json
{
    "success": true,
    "data": {
        "id": 1,
        "hero_video_url": "http://localhost:8000/storage/home/hero-video.mp4",
        "hero_video_original_name": "company-intro.mp4",
        "hero_video_size": 45678901,
        "hero_fallback_image_url": "http://localhost:8000/storage/home/fallback.jpg",
        "is_active": true,
        "created_at": "2025-01-18T10:00:00.000000Z",
        "updated_at": "2025-01-18T10:00:00.000000Z"
    }
}
```

## Error Handling

### Frontend Error Scenarios
1. **Video Load Failure**: Fallback to static image with error logging
2. **File Upload Errors**: Display specific error messages based on failure type
3. **File Size Validation**: Prevent upload and show size limit message
4. **Network Errors**: Retry mechanism with user feedback
5. **Unsupported Format**: Clear message about accepted video formats

### Backend Error Scenarios
1. **File Size Exceeded**: Return 413 status with descriptive message
2. **Invalid File Format**: Return 422 status with format requirements
3. **Storage Failure**: Return 500 status with generic error message
4. **Database Errors**: Log detailed error, return generic message to client
5. **Missing File**: Handle gracefully with appropriate HTTP status

### Error Response Format
```json
{
    "success": false,
    "message": "File size exceeds the maximum limit of 50MB",
    "errors": {
        "hero_video": ["The video file must be smaller than 50MB"]
    }
}
```

## Testing Strategy

### Frontend Testing
1. **Component Tests**: Test video player functionality, file upload validation
2. **Integration Tests**: Test admin interface interactions with API
3. **Visual Tests**: Verify responsive design across different screen sizes
4. **Accessibility Tests**: Ensure video controls are accessible
5. **Error Handling Tests**: Test various error scenarios and user feedback

### Backend Testing
1. **Unit Tests**: Test model methods, file validation logic
2. **Feature Tests**: Test API endpoints with various file types and sizes
3. **Storage Tests**: Test file upload, storage, and cleanup operations
4. **Validation Tests**: Test file size and format validation rules
5. **Error Handling Tests**: Test error responses for various failure scenarios

### Test Data Requirements
- Sample video files of various sizes (under and over 50MB)
- Different video formats (MP4, AVI, MOV, etc.)
- Corrupted video files for error testing
- Large file samples for performance testing

## File Storage Strategy

### Storage Structure
```
storage/app/public/
└── home/
    ├── hero-videos/
    │   └── hero-video-{timestamp}.mp4
    └── fallback-images/
        └── hero-fallback-{timestamp}.jpg
```

### File Management
- **Upload**: Store in `home/hero-videos/` directory
- **Naming**: Use timestamp-based naming to prevent conflicts
- **Cleanup**: Remove old video files when new ones are uploaded
- **URL Generation**: Use Laravel's storage URL helper for consistent paths
- **Validation**: Check file type, size, and basic integrity

## Security Considerations

### File Upload Security
- Validate file MIME types on server side
- Limit file size to prevent storage abuse
- Sanitize file names to prevent path traversal
- Store files outside web root when possible
- Implement rate limiting for upload endpoints

### Access Control
- Protect admin endpoints with authentication
- Validate user permissions for content management
- Log all administrative actions for audit trail
- Implement CSRF protection for form submissions

## Performance Considerations

### Video Optimization
- Recommend optimal video formats and codecs
- Consider implementing video compression on upload
- Use appropriate video resolution for web display
- Implement lazy loading for video content
- Consider CDN integration for video delivery

### Frontend Performance
- Preload video metadata for faster playback
- Implement proper video buffering strategies
- Use appropriate video poster images
- Optimize component re-rendering
- Implement proper error boundaries

### Backend Performance
- Stream file uploads for large files
- Implement proper file validation without loading entire file
- Use database indexing for home content queries
- Implement caching for frequently accessed content
- Monitor storage usage and cleanup old files