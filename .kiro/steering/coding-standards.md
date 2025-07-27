---
inclusion: always
---

# Coding Standards

## TypeScript/React Standards

### Component Structure
- Functional components with hooks only
- TypeScript interfaces for all props/state at file top
- Single responsibility principle per component
- Descriptive semantic naming conventions

### State Management & Error Handling
- React hooks (useState, useEffect) for local state
- Try-catch blocks for ALL async operations
- Loading states during API calls
- Auto-dismiss messages after exactly 3 seconds
- Proper useEffect dependency arrays

### File Upload Implementation
```typescript
const validateFileSize = (file: File, type: 'image' | 'video'): boolean => {
  const maxSize = type === 'image' ? 2 * 1024 * 1024 : 50 * 1024 * 1024;
  return file.size <= maxSize;
};

// ALWAYS use FormData for uploads
const formData = new FormData();
formData.append('file', file);
if (posterFile) formData.append('poster', posterFile);
```

### API Communication
- FormData for all file uploads
- Handle HTTP 413 specifically for file size errors
- Remove `/storage/` prefix from file paths in responses
- Poster images REQUIRED for all videos
- Consistent error response handling with field-specific messages

## Laravel/PHP Standards

### API Controllers
- Consistent JSON response format with success/data/message structure
- HTTP status codes: 200/201 (success), 413 (file size), 422 (validation), 500 (error)
- Laravel validation rules with server-side file validation
- Storage facade for file operations

### Models & Storage
- Laravel naming conventions (singular models)
- Eloquent relationships and ORM patterns
- Fillable/guarded properties
- Normalized file paths in API responses (no `/storage/` prefix)

## Critical Media Constraints

### File Limits (STRICTLY ENFORCED)
- **Images**: 2MB max, jpg/png/webp formats only
- **Videos**: 50MB max, mp4/webm formats only, poster image REQUIRED
- **Validation**: MUST implement both client-side AND server-side validation

### UI/UX Requirements
- ALL user-facing text MUST be in Russian
- Loading states for ALL async operations
- Field-specific validation error messages
- Disabled submit buttons during processing
- Auto-dismiss notifications after exactly 3 seconds

### Security & Performance
- File type and size validation on both ends
- Input sanitization and CSRF protection
- Authentication for admin routes
- Skeleton loaders for content loading states