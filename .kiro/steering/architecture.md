---
inclusion: always
---

# Architecture & Development Standards

## Technology Stack
- **Frontend**: Next.js 15.3.3 (App Router), TypeScript, Tailwind CSS 4.x
- **Backend**: Laravel 12.x, PHP 8.2+, PostgreSQL
- **UI**: Radix UI + shadcn/ui components
- **API**: RESTful with FormData uploads

## Critical File Upload Requirements

### Media Constraints (STRICTLY ENFORCED)
- **Images**: 2MB max, jpg/png/webp formats only
- **Videos**: 50MB max, mp4/webm formats only
- **Video Posters**: REQUIRED for all video uploads
- **Validation**: MUST implement both client-side AND server-side validation

### Required Implementation Pattern
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

### File Path Handling
- API responses MUST remove `/storage/` prefix from file paths
- Use Laravel storage URLs for public file access
- Handle both single files and media arrays consistently

## API Response Standards

### HTTP Status Codes
- **200/201**: Success with data payload
- **413**: File size exceeded (handle specifically in UI)
- **422**: Validation errors with field-specific messages
- **500**: Server error with user-friendly message

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed"
}
```

## React Component Standards

### Component Structure
- Functional components with hooks only
- TypeScript interfaces for all props/state at file top
- Single responsibility principle per component
- Try-catch blocks for ALL async operations

### State Management
- Loading states for ALL API calls
- Auto-dismiss messages after exactly 3 seconds
- Disabled submit buttons during processing
- Proper useEffect dependency arrays

### Admin Interface Patterns
- Card-based layouts with Dialog forms
- AlertDialog for destructive actions
- Field-specific validation error messages
- Skeleton loaders for content loading states

## Laravel Backend Standards

### API Controllers
- Consistent JSON response format
- Laravel validation rules with server-side file validation
- Storage facade for file operations
- Normalized file paths in responses (no `/storage/` prefix)

### Models & Database
- Laravel naming conventions (singular models)
- Eloquent relationships and ORM patterns
- Fillable/guarded properties properly defined

## Data Models
- **Project**: title, slug, category, description
- **ProjectDetail**: hero media, content blocks, gallery sections
- **BlogPost**: rich content with multiple block types
- **Media**: images/videos with strict validation constraints

## Code Quality Requirements
- **Language**: ALL user-facing text MUST be in Russian
- **TypeScript**: Strict typing for all React components
- **Error Handling**: User-friendly messages with field-specific validation
- **Design**: Responsive-first approach with mobile considerations
- **Security**: Input sanitization, CSRF protection, authentication for admin routes

## Development Commands

### Frontend (frontend_next/)
```bash
npm run dev     # Development server
npm run build   # Production build
npm run lint    # Code linting
```

### Backend (backend_laravel/)
```bash
php artisan serve    # Development server
php artisan migrate  # Run migrations
composer run dev     # Full dev environment
```