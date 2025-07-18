# Design Document

## Overview

This design enhances the existing video media management system by implementing proper file upload functionality for video poster images across four key forms in the admin interface. The solution replaces text input fields with file upload inputs, adds comprehensive validation, and ensures proper file handling on both frontend and backend.

The enhancement maintains backward compatibility with existing data while providing a more user-friendly interface for managing video poster images.

## Architecture

### Frontend Architecture

The solution follows the existing React component pattern with TypeScript interfaces and state management using React hooks. The implementation leverages the current FormData-based file upload system already established for hero media management.

#### Key Components
- **File Upload Components**: Reusable file input components with validation
- **Form State Management**: Enhanced state management for poster file handling
- **Validation Helpers**: Utility functions for file size and type validation
- **Error Handling**: Consistent error messaging across all forms

#### State Management Pattern
```typescript
// Enhanced file selection state to handle poster files
const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({})

// File selection keys:
// - Regular files: numeric index (0, 1, 2...)
// - Poster files: "poster_" + index ("poster_0", "poster_1"...)
```

### Backend Architecture

The backend leverages the existing Laravel file storage system and maintains the current API endpoint structure. The poster file handling follows the same pattern as existing media file uploads.

#### File Storage Strategy
- **Storage Location**: `storage/app/public/projects/posters/`
- **File Naming**: Unique filename generation to prevent conflicts
- **Path Storage**: Relative paths stored in database for flexibility

#### API Response Format
The existing API response format is maintained, with poster_path fields populated when poster files are uploaded.

## Components and Interfaces

### Frontend Components

#### File Upload Helper Functions
```typescript
// File validation utilities
const validateFileSize = (file: File, fileType: 'image' | 'video'): boolean
const getFileSizeLimit = (fileType: 'image' | 'video'): string
const formatFileSize = (bytes: number): string
const validateImageFile = (file: File): boolean
```

#### Enhanced Form Interfaces
```typescript
interface HeroMediaFormData {
  id?: number;
  group_id: number;
  group_type: 'single' | 'double';
  file_type: 'image' | 'video';
  file_path: string;
  alt_text: string;
  poster_path?: string;
}

interface MediaFormData {
  id?: number;
  group_id: number;
  group_type: 'single' | 'double';
  file_type: 'image' | 'video';
  file_path: string;
  alt_text: string;
  poster_path?: string;
  order: number;
}
```

#### File Selection State Management
```typescript
// Enhanced file selection handlers
const handleFileChange = (index: number, file: File | null) => void
const handlePosterChange = (index: number, file: File | null) => void
const handleFileTypeChange = (index: number, fileType: 'image' | 'video') => void
```

### Backend Components

#### File Upload Processing
The existing `updateHeroMedia` method in `ProjectController` already handles poster file uploads through the `poster_file` FormData field. The same pattern will be extended to block media endpoints.

#### Database Schema
The existing database schema already supports poster_path fields in both:
- `project_detail_hero_media` table
- `project_detail_block_media` table

No database migrations are required.

## Data Models

### File Upload Data Flow

#### Hero Media Creation/Editing
```
FormData Structure:
- hero_media_items[0][file] -> Main media file
- hero_media_items[0][poster_file] -> Poster file (for videos)
- hero_media_items[0][file_type] -> 'image' | 'video'
- hero_media_items[0][alt_text] -> Alt text
- hero_media_items[0][group_id] -> Group ID
- hero_media_items[0][group_type] -> 'single' | 'double'
```

#### Block Media Creation/Editing
```
FormData Structure:
- block_media_items[0][file] -> Main media file
- block_media_items[0][poster_file] -> Poster file (for videos)
- block_media_items[0][file_type] -> 'image' | 'video'
- block_media_items[0][alt_text] -> Alt text
- block_media_items[0][group_id] -> Group ID
- block_media_items[0][group_type] -> 'single' | 'double'
- block_media_items[0][order] -> Order number
```

### File Validation Rules

#### Image Files (including posters)
- **Allowed formats**: jpg, jpeg, png, gif, webp
- **Maximum size**: 2MB
- **MIME type validation**: image/*

#### Video Files
- **Allowed formats**: mp4, mov, avi, webm
- **Maximum size**: 50MB
- **MIME type validation**: video/*
- **Poster requirement**: Mandatory poster image for all video files

## Error Handling

### Client-Side Validation
1. **File Type Validation**: Check file extension and MIME type
2. **File Size Validation**: Enforce size limits before upload
3. **Required Field Validation**: Ensure poster files are selected for videos
4. **Real-time Feedback**: Show validation errors immediately

### Server-Side Validation
1. **Laravel Validation Rules**: Comprehensive server-side validation
2. **File Upload Error Handling**: Handle PHP upload errors gracefully
3. **Storage Error Handling**: Manage file system errors
4. **Database Transaction Safety**: Ensure data consistency

### Error Message Patterns
```typescript
// Consistent error message formatting
const ERROR_MESSAGES = {
  FILE_TOO_LARGE: (limit: string) => `Размер файла не должен превышать ${limit}`,
  INVALID_FILE_TYPE: 'Недопустимый тип файла',
  POSTER_REQUIRED: 'Пожалуйста, выберите постер для видео файла',
  UPLOAD_FAILED: 'Ошибка загрузки файла',
  NETWORK_ERROR: 'Ошибка сети. Попробуйте еще раз'
}
```

## Testing Strategy

### Unit Testing
1. **File Validation Functions**: Test all validation helper functions
2. **Form State Management**: Test file selection and form data handling
3. **API Response Processing**: Test data transformation functions

### Integration Testing
1. **File Upload Flow**: Test complete upload process for each form
2. **Error Handling**: Test various error scenarios
3. **Form Submission**: Test successful form submissions with file uploads

### User Acceptance Testing
1. **Form Usability**: Verify intuitive file selection process
2. **Error Feedback**: Ensure clear error messages for users
3. **File Management**: Test file replacement and deletion scenarios

### Performance Testing
1. **Large File Uploads**: Test with maximum allowed file sizes
2. **Multiple File Uploads**: Test simultaneous file uploads
3. **Network Conditions**: Test under various network conditions

## Implementation Phases

### Phase 1: Helper Functions and Validation
- Implement file validation utility functions
- Add consistent error message handling
- Create reusable file input components

### Phase 2: Hero Media Forms Enhancement
- Update "Добавление новой Hero группы" form
- Update "Редактирование Hero медиа" form
- Implement poster file upload functionality

### Phase 3: Block Media Forms Enhancement
- Update "Добавление новой медиа-группы в блок" form
- Update "Редактирование медиа-группы" form
- Add file type selection to editing form

### Phase 4: Backend API Enhancement
- Extend existing endpoints to handle block media poster uploads
- Ensure consistent file handling across all endpoints
- Add comprehensive server-side validation

### Phase 5: Testing and Refinement
- Comprehensive testing of all forms
- Error handling verification
- Performance optimization
- User experience refinement