---
inclusion: always
---

# Technology Stack & Development Standards

## Stack Overview
- **Frontend**: Next.js 15.3.3 (App Router), TypeScript, Tailwind CSS 4.x
- **Backend**: Laravel 12.x, PHP 8.2+, PostgreSQL
- **UI**: Radix UI + shadcn/ui components
- **API**: RESTful with Axios, FormData for uploads

## Critical File Upload Constraints (STRICTLY ENFORCED)
- **Images**: 2MB max, jpg/png/webp only
- **Videos**: 50MB max, mp4/webm only, poster image REQUIRED
- **Validation**: Both client-side AND server-side validation mandatory

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

## API Standards
- **Status Codes**: 200/201 (success), 413 (file size), 422 (validation), 500 (error)
- **File Paths**: Remove `/storage/` prefix from API responses
- **Response Format**: Consistent JSON with success/data/message structure

## Code Requirements

### React/TypeScript
- Functional components with hooks only
- Strict TypeScript interfaces for all props/state
- Try-catch blocks for ALL async operations
- Loading states for ALL API calls
- Auto-dismiss messages after exactly 3 seconds
- Disabled submit buttons during processing

### Laravel/PHP
- Laravel naming conventions (singular models)
- Eloquent ORM patterns with proper relationships
- Server-side file validation with size/type checks
- Normalized file paths in responses (no `/storage/` prefix)
- Storage facade for file operations

### UI/UX Standards
- ALL user-facing text MUST be in Russian
- Field-specific validation error messages
- Loading states during async operations
- Card-based admin layouts with Dialog forms
- Responsive-first design approach

## Development Commands
```bash
# Frontend (frontend_next/)
npm run dev     # Development server
npm run build   # Production build
npm run lint    # Code linting

# Backend (backend_laravel/)
php artisan serve    # Development server
php artisan migrate  # Run migrations
composer run dev     # Full dev environment
```