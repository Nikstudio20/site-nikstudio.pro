# SEO Management System Design

## Overview

The SEO management system provides comprehensive search engine optimization for the portfolio website, including automatic metadata generation for public pages and admin interface tools for customizing SEO settings. The system leverages Next.js 15's built-in metadata API and implements structured data generation, social media optimization, and performance-optimized SEO delivery.

## Architecture

### Frontend Architecture (Next.js)
- **Metadata API**: Utilizes Next.js 15's `generateMetadata` function for dynamic SEO
- **SEO Components**: Reusable components for structured data and Open Graph tags
- **Admin Interface**: React components for SEO metadata editing with live preview
- **Caching Layer**: Next.js static generation for optimal SEO performance

### Backend Architecture (Laravel)
- **SEO Models**: Database models for storing custom SEO metadata
- **API Endpoints**: RESTful endpoints for CRUD operations on SEO data
- **Global Settings**: System-wide SEO configuration management
- **Image Processing**: Optimized social media image generation

### Database Schema Extensions
```sql
-- Global SEO settings table
CREATE TABLE seo_settings (
    id BIGINT PRIMARY KEY,
    site_title VARCHAR(255),
    site_description TEXT,
    default_image VARCHAR(255),
    twitter_card_type VARCHAR(50),
    facebook_app_id VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- SEO metadata for projects
ALTER TABLE projects ADD COLUMN seo_title VARCHAR(255);
ALTER TABLE projects ADD COLUMN seo_description TEXT;
ALTER TABLE projects ADD COLUMN seo_image VARCHAR(255);

-- SEO metadata for blog posts
ALTER TABLE blog_posts ADD COLUMN seo_title VARCHAR(255);
ALTER TABLE blog_posts ADD COLUMN seo_description TEXT;
ALTER TABLE blog_posts ADD COLUMN seo_image VARCHAR(255);
```

## Components and Interfaces

### Frontend Components

#### SEO Metadata Generator
```typescript
interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
}

interface GenerateMetadataProps {
  content: Project | BlogPost | null;
  globalSettings: SEOSettings;
  pageType: 'project' | 'blog' | 'home';
}
```

#### Admin SEO Editor Component
```typescript
interface SEOEditorProps {
  initialData: {
    seo_title?: string;
    seo_description?: string;
    seo_image?: string;
  };
  contentTitle: string;
  contentDescription: string;
  onSave: (seoData: SEOData) => void;
  showPreview?: boolean;
}

interface SEOPreviewProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}
```

#### Structured Data Component
```typescript
interface StructuredDataProps {
  type: 'Organization' | 'Article' | 'CreativeWork';
  data: any;
}
```

### Backend Models and Controllers

#### SEO Settings Model
```php
class SEOSettings extends Model
{
    protected $table = 'seo_settings';
    
    protected $fillable = [
        'site_title',
        'site_description', 
        'default_image',
        'twitter_card_type',
        'facebook_app_id'
    ];
    
    public static function getGlobalSettings(): array;
    public function updateGlobalSettings(array $data): bool;
}
```

#### SEO Controller
```php
class SEOController extends Controller
{
    public function getGlobalSettings(): JsonResponse;
    public function updateGlobalSettings(Request $request): JsonResponse;
    public function generateMetadata(string $type, string $slug): JsonResponse;
}
```

## Data Models

### SEO Settings Structure
```typescript
interface SEOSettings {
  id: number;
  site_title: string;
  site_description: string;
  default_image: string | null;
  twitter_card_type: 'summary' | 'summary_large_image';
  facebook_app_id: string | null;
  created_at: string;
  updated_at: string;
}
```

### Content SEO Extensions
```typescript
interface ProjectWithSEO extends Project {
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
}

interface BlogPostWithSEO extends BlogPost {
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
}
```

### Structured Data Schemas
```typescript
interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization" | "Person";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image?: string;
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: OrganizationSchema;
  datePublished: string;
  dateModified: string;
}

interface CreativeWorkSchema {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  image?: string;
  creator: {
    "@type": "Person";
    name: string;
  };
  dateCreated: string;
}
```

## Error Handling

### Frontend Error Handling
- **Metadata Generation Failures**: Fallback to default metadata without breaking page rendering
- **Image Loading Errors**: Graceful degradation to default social media images
- **API Failures**: Show user-friendly error messages in admin interface
- **Validation Errors**: Real-time validation feedback for SEO field lengths

### Backend Error Handling
- **Database Failures**: Return appropriate HTTP status codes with error messages
- **File Upload Errors**: Handle SEO image upload failures gracefully
- **Validation Failures**: Return structured validation error responses
- **Missing Data**: Provide sensible defaults for missing SEO metadata

### Error Response Format
```typescript
interface SEOErrorResponse {
  success: false;
  message: string;
  errors?: {
    [field: string]: string[];
  };
  fallback_data?: SEOMetadata;
}
```

## Testing Strategy

### Unit Tests
- **Metadata Generation**: Test automatic metadata generation from content
- **Validation Logic**: Test SEO field validation (title/description lengths)
- **Structured Data**: Test JSON-LD generation for different content types
- **Fallback Mechanisms**: Test behavior when SEO data is missing

### Integration Tests
- **API Endpoints**: Test CRUD operations for SEO settings and metadata
- **Database Operations**: Test SEO data persistence and retrieval
- **Image Processing**: Test SEO image upload and optimization
- **Cache Invalidation**: Test metadata cache updates

### End-to-End Tests
- **SEO Metadata Rendering**: Verify correct meta tags in page HTML
- **Social Media Previews**: Test Open Graph and Twitter Card rendering
- **Admin Interface**: Test SEO editing workflow and live preview
- **Search Engine Compatibility**: Validate structured data with Google's tools

### Performance Tests
- **Page Load Impact**: Ensure SEO enhancements don't slow page loading
- **Metadata Generation Speed**: Test dynamic metadata generation performance
- **Cache Effectiveness**: Verify SEO data caching reduces database queries
- **Image Optimization**: Test social media image processing performance

### Test Data Requirements
```typescript
const testSEOData = {
  globalSettings: {
    site_title: "NIK Studio - Тестовый сайт",
    site_description: "Тестовое описание для SEO тестирования",
    default_image: "/test-images/default-og.jpg"
  },
  projectSEO: {
    seo_title: "Тестовый проект - NIK Studio",
    seo_description: "Описание тестового проекта для проверки SEO",
    seo_image: "/test-images/project-og.jpg"
  },
  blogPostSEO: {
    seo_title: "Тестовая статья блога - NIK Studio", 
    seo_description: "Описание тестовой статьи для проверки SEO блога",
    seo_image: "/test-images/blog-og.jpg"
  }
};
```

## Implementation Considerations

### Performance Optimization
- **Static Generation**: Use Next.js static generation for SEO-critical pages
- **Image Optimization**: Optimize social media images for different platforms
- **Caching Strategy**: Cache generated metadata to reduce computation
- **Lazy Loading**: Load SEO preview components only when needed in admin

### SEO Best Practices
- **Title Length**: Enforce 60-character limit for page titles
- **Description Length**: Enforce 160-character limit for meta descriptions
- **Image Requirements**: Ensure social media images meet platform specifications
- **Structured Data**: Follow Schema.org standards for structured data

### Accessibility Considerations
- **Screen Reader Support**: Ensure SEO admin interface is accessible
- **Keyboard Navigation**: Support keyboard navigation in SEO editor
- **Color Contrast**: Maintain proper contrast in SEO preview components
- **Focus Management**: Proper focus management in SEO editing dialogs

### Security Considerations
- **Input Sanitization**: Sanitize all SEO metadata inputs
- **File Upload Security**: Secure handling of SEO image uploads
- **XSS Prevention**: Prevent XSS attacks through meta tag injection
- **Admin Authentication**: Ensure only authenticated admins can edit SEO settings