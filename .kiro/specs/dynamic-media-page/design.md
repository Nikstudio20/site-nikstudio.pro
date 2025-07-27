# Design Document

## Overview

The dynamic media page system will transform the existing static media page into a fully manageable admin interface while preserving the exact visual presentation. The system consists of three main components: a backend API for data management, an admin interface for content management, and a dynamic frontend that renders content from the database while maintaining the original styling.

The architecture follows the established patterns from the project's admin system, utilizing Laravel for the backend API, React with TypeScript for the admin interface, and Next.js for the public-facing page. All existing visual components (ServiceSection, ServiceSection_mobile, CarouselWithLightbox) will be preserved and enhanced to accept dynamic data.

## Architecture

### Database Schema

The system will use the following database tables:

**media_page_content**
- id (primary key)
- hero_title (text)
- hero_description (text)
- testimonials_title (text)
- testimonials_subtitle (text)
- process_title (text)
- process_subtitle (text)
- created_at, updated_at

**media_services**
- id (primary key)
- title (text)
- description (text)
- order (integer)
- created_at, updated_at

**media_service_features**
- id (primary key)
- service_id (foreign key to media_services)
- title (text)
- description (json array of paragraphs)
- order (integer)
- created_at, updated_at

**media_service_media**
- id (primary key)
- service_id (foreign key to media_services)
- group_id (integer for pairing main/secondary images)
- media_type ('main' or 'secondary')
- file_type ('image' or 'video')
- file_path (text)
- poster_path (text, nullable for videos)
- alt_text (text)
- order (integer)
- created_at, updated_at

**media_testimonials**
- id (primary key)
- company (text)
- quote (text)
- description (text)
- image_path (text)
- order (integer)
- created_at, updated_at

**media_process_steps**
- id (primary key)
- step_number (text, e.g., "01", "02")
- title (text)
- subtitle (text)
- image_path (text)
- description_left (text)
- description_right (text)
- order (integer)
- created_at, updated_at

### API Endpoints

**Media Page Content Management**
- GET `/api/admin/media-page` - Get all media page content
- PUT `/api/admin/media-page/hero` - Update hero section
- PUT `/api/admin/media-page/testimonials-header` - Update testimonials header
- PUT `/api/admin/media-page/process-header` - Update process header

**Media Services Management**
- GET `/api/admin/media-services` - List all services
- POST `/api/admin/media-services` - Create new service
- GET `/api/admin/media-services/{id}` - Get specific service with features and media
- PUT `/api/admin/media-services/{id}` - Update service
- DELETE `/api/admin/media-services/{id}` - Delete service
- POST `/api/admin/media-services/{id}/reorder` - Reorder services

**Media Service Features Management**
- POST `/api/admin/media-services/{id}/features` - Add feature to service
- PUT `/api/admin/media-services/{serviceId}/features/{featureId}` - Update feature
- DELETE `/api/admin/media-services/{serviceId}/features/{featureId}` - Delete feature
- POST `/api/admin/media-services/{id}/features/reorder` - Reorder features

**Media Service Media Management**
- POST `/api/admin/media-services/{id}/media` - Upload media group (main + secondary)
- PUT `/api/admin/media-services/{serviceId}/media/{groupId}` - Update media group
- DELETE `/api/admin/media-services/{serviceId}/media/{groupId}` - Delete media group
- POST `/api/admin/media-services/{id}/media/reorder` - Reorder media groups

**Testimonials Management**
- GET `/api/admin/media-testimonials` - List all testimonials
- POST `/api/admin/media-testimonials` - Create testimonial
- PUT `/api/admin/media-testimonials/{id}` - Update testimonial
- DELETE `/api/admin/media-testimonials/{id}` - Delete testimonial
- POST `/api/admin/media-testimonials/reorder` - Reorder testimonials

**Process Steps Management**
- GET `/api/admin/media-process-steps` - List all process steps
- POST `/api/admin/media-process-steps` - Create process step
- PUT `/api/admin/media-process-steps/{id}` - Update process step
- DELETE `/api/admin/media-process-steps/{id}` - Delete process step
- POST `/api/admin/media-process-steps/reorder` - Reorder steps

**Public API**
- GET `/api/media-page` - Get complete media page data for public display

## Components and Interfaces

### Backend Models

**MediaPageContent Model**
```php
class MediaPageContent extends Model
{
    protected $fillable = [
        'hero_title', 'hero_description', 
        'testimonials_title', 'testimonials_subtitle',
        'process_title', 'process_subtitle'
    ];
}
```

**MediaService Model**
```php
class MediaService extends Model
{
    protected $fillable = ['title', 'description', 'order'];
    
    public function features()
    {
        return $this->hasMany(MediaServiceFeature::class)->orderBy('order');
    }
    
    public function mediaItems()
    {
        return $this->hasMany(MediaServiceMedia::class)->orderBy('order');
    }
}
```

**MediaServiceFeature Model**
```php
class MediaServiceFeature extends Model
{
    protected $fillable = ['service_id', 'title', 'description', 'order'];
    protected $casts = ['description' => 'array'];
}
```

**MediaServiceMedia Model**
```php
class MediaServiceMedia extends Model
{
    protected $fillable = [
        'service_id', 'group_id', 'media_type', 'file_type',
        'file_path', 'poster_path', 'alt_text', 'order'
    ];
}
```

### Frontend Interfaces

**MediaPageData Interface**
```typescript
interface MediaPageData {
  hero: {
    title: string;
    description: string;
  };
  services: MediaService[];
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
}

interface MediaService {
  id: number;
  title: string;
  description: string;
  order: number;
  features: ServiceFeature[];
  slides: ServiceSlide[];
}

interface ServiceFeature {
  id: number;
  title: string;
  description: string[];
  order: number;
}

interface ServiceSlide {
  mainImage: string;
  secondaryImage: string;
}

interface Testimonial {
  id: number;
  company: string;
  quote: string;
  text: string;
  image: string;
  order: number;
}

interface ProcessStep {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  image: string;
  description: {
    left: string;
    right: string;
  };
  order: number;
}
```

### Admin Interface Components

**MediaPageAdmin Component**
- Main admin dashboard with tabs for different sections
- Hero content management form
- Services list with add/edit/delete actions
- Testimonials management interface
- Process steps management interface

**ServiceBlockDialog Component**
- Modal dialog for creating/editing service blocks
- Form fields for title, description
- Features management sub-section
- Media management sub-section
- Drag-and-drop reordering for features and media

**MediaUploadGroup Component**
- Paired file upload for main and secondary media
- File validation and preview
- Poster upload for video files
- Progress indicators during upload

**TestimonialDialog Component**
- Form for testimonial data entry
- Image upload with preview
- Validation for required fields

**ProcessStepDialog Component**
- Form for process step data
- Dual description text areas (left/right)
- Image upload with preview
- Step number input

## Data Models

### Service Block Data Flow

1. **Admin Input**: Admin creates/edits service through ServiceBlockDialog
2. **API Processing**: Laravel validates and stores service data, features, and media
3. **Database Storage**: Data stored across media_services, media_service_features, and media_service_media tables
4. **Public API**: GET /api/media-page returns transformed data matching original mediaServices format
5. **Frontend Rendering**: ServiceSection and ServiceSection_mobile components receive dynamic data

### Media Upload Processing

1. **File Selection**: Admin selects main and secondary media files
2. **Client Validation**: File size and type validation before upload
3. **Server Upload**: Files uploaded to Laravel storage with validation
4. **Path Normalization**: File paths stored without /storage/ prefix
5. **Database Storage**: Media metadata stored with service association
6. **Public Access**: Files served through Laravel storage URLs

### Data Transformation

The system will include transformation utilities to convert database records into the format expected by existing components:

```typescript
// Transform database services to match original mediaServices format
const transformServicesToOriginalFormat = (services: DatabaseService[]): Service[] => {
  return services.map(service => ({
    id: service.id,
    title: service.title,
    description: service.description,
    slides: transformMediaToSlides(service.mediaItems),
    features: service.features.map(f => ({
      title: f.title,
      description: f.description
    }))
  }));
};
```

## Error Handling

### File Upload Errors
- HTTP 413: File size exceeded limits
- HTTP 422: Invalid file format or missing poster for video
- HTTP 500: Storage or processing errors
- Client-side validation prevents most upload errors

### Data Validation Errors
- Required field validation with Russian error messages
- Text length limits for titles and descriptions
- Order value validation for reordering operations

### Fallback Handling
- Default content display when database is empty
- Graceful degradation for missing media files
- Error boundaries for admin interface components

## Testing Strategy

### Unit Tests
- Model validation and relationships
- API endpoint functionality
- File upload validation
- Data transformation utilities

### Integration Tests
- Complete admin workflow testing
- Public page data loading
- File upload and storage integration
- Database migration and seeding

### Frontend Tests
- Component rendering with dynamic data
- Form validation and submission
- File upload progress and error handling
- Responsive layout preservation

### Manual Testing
- Visual regression testing to ensure layout preservation
- Cross-browser compatibility testing
- Mobile responsiveness verification
- Admin workflow usability testing

The design ensures that the existing visual presentation is completely preserved while adding comprehensive admin management capabilities. All original components remain functional with enhanced data sourcing from the database instead of static imports.