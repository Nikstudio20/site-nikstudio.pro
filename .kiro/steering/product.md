---
inclusion: always
---

# Product Requirements & Standards

## Application Overview
Portfolio/project showcase platform with admin CMS featuring:
- **Public Frontend**: Next.js project/blog showcase
- **Admin Interface**: Content management system
- **Backend API**: Laravel data/media management

## Content Models

### Projects
- **Core Fields**: title, slug, category, description
- **Rich Content**: hero media, content blocks, gallery sections
- **Media Layout**: single/double layout options for galleries

### Blog Posts
- Rich content with multiple block types
- Integrated media throughout content
- Category/tag organization

## Critical Media Constraints

### File Limits (STRICTLY ENFORCED)
- **Images**: 2MB max, jpg/png/webp only
- **Videos**: 50MB max, mp4/webm only, poster image REQUIRED
- **Validation**: Both client-side AND server-side validation mandatory
- **Error Codes**: HTTP 413 for size limits, 422 for validation failures

### Upload Implementation Requirements
```typescript
// Required validation pattern
const validateFileSize = (file: File, type: 'image' | 'video'): boolean => {
  const maxSize = type === 'image' ? 2 * 1024 * 1024 : 50 * 1024 * 1024;
  return file.size <= maxSize;
};
```

## UI/UX Standards

### Language & Messaging
- ALL user-facing text MUST be in Russian
- Field-specific validation error messages
- Auto-dismiss notifications after exactly 3 seconds

### Interface Patterns
- Card-based admin layouts with consistent spacing
- Dialog forms for all CRUD operations
- Loading states for ALL async operations
- Disabled buttons during processing (prevent double-submission)
- Clear file size indicators before upload
- Progress feedback during upload process

## Development Priorities
1. **Media Handling**: Robust validation with proper error feedback
2. **Admin Workflows**: Intuitive CRUD with consistent patterns
3. **Responsive Design**: Mobile-first, touch-friendly interfaces
4. **Upload Reliability**: Size validation, progress indication, error recovery