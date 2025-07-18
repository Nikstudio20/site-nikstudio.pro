---
inclusion: always
---

# Coding Standards

## TypeScript/React Standards

### Component Structure
- Use functional components with hooks
- Implement proper TypeScript interfaces for all props and state
- Use descriptive component and variable names
- Keep components focused on single responsibilities

### State Management
- Use React hooks (useState, useEffect, etc.) for local state
- Implement proper error handling with try-catch blocks
- Use loading states for async operations
- Clear success/error messages after timeout (typically 3 seconds)

### File Upload Patterns
```typescript
// File validation helper functions
const validateFileSize = (file: File, fileType: 'image' | 'video'): boolean => {
  const maxSize = fileType === 'image' ? 2 * 1024 * 1024 : 50 * 1024 * 1024; // 2MB for images, 50MB for videos
  return file.size <= maxSize;
};

const getFileSizeLimit = (fileType: 'image' | 'video'): string => {
  return fileType === 'image' ? '2 MB' : '50 MB';
};

const formatFileSize = (bytes: number): string => {
  return bytes < 1024 * 1024 
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
```

### API Communication
- Use FormData for file uploads
- Implement proper error handling for HTTP responses
- Check for specific status codes (413 for file size limits)
- Normalize file paths in responses

### Form Handling
- Validate required fields before submission
- Show specific error messages for validation failures
- Reset form state after successful operations
- Handle file selection with proper state management

## PHP/Laravel Standards

### Model Conventions
- Use Eloquent relationships properly
- Implement proper model factories and seeders
- Follow Laravel naming conventions for models and relationships

### API Controller Patterns
- Return consistent JSON response format
- Use proper HTTP status codes
- Implement proper validation rules
- Handle file uploads with Laravel's storage system

### File Storage
- Use Laravel's storage facade for file operations
- Implement proper file validation
- Return normalized file paths in API responses
- Handle different file types (images, videos) appropriately

## General Principles

### Error Handling
- Provide user-friendly error messages
- Log detailed errors for debugging
- Handle edge cases gracefully
- Validate input on both client and server sides

### Performance
- Optimize file upload sizes
- Use appropriate image/video compression
- Implement proper loading states
- Cache frequently accessed data

### Security
- Validate file types and sizes
- Sanitize user inputs
- Use proper authentication for admin routes
- Implement CSRF protection