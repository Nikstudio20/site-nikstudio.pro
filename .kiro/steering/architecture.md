---
inclusion: always
---

# Project Architecture

## Directory Structure

### Frontend (`frontend_next/`)
```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin interface pages
│   │   └── projects/      # Project management
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── home/              # Home page
│   ├── media/             # Media gallery
│   └── projects/          # Public project showcase
├── components/            # Reusable React components
│   └── ui/               # UI component library
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

### Backend (`backend_laravel/`)
```
app/
├── Http/
│   ├── Controllers/      # API controllers
│   └── Middleware/       # HTTP middleware
├── Models/               # Eloquent models
│   ├── BlogPost.php
│   ├── Project.php
│   ├── ProjectDetail.php
│   └── ProjectCategory.php
└── Providers/            # Service providers
```

## Data Models

### Core Entities
- **Project**: Main project entity with basic information
- **ProjectDetail**: Extended project information with hero media and content blocks
- **ProjectCategory**: Project categorization
- **ProjectDetailBlock**: Content blocks within project details
- **ProjectDetailBlockMedia**: Media items within content blocks
- **ProjectDetailHeroMedia**: Hero section media items
- **BlogPost**: Blog post entity
- **BlogPostBlock**: Content blocks within blog posts

### Media Management
- Supports both images and videos
- Video files require poster images
- Media items are organized in groups (single or double layouts)
- File validation for size and type

## API Patterns

### RESTful Endpoints
- `GET /api/projects` - List projects
- `GET /api/projects/{slug}` - Get project details
- `POST /api/projects/{slug}/detail` - Create project details
- `PUT /api/projects/{slug}/detail` - Update project details
- `POST /api/projects/{slug}/detail/update-media` - Update media
- `DELETE /api/projects/{slug}/detail/hero-media/{id}` - Delete hero media
- `POST /api/projects/{slug}/blocks` - Create project blocks
- `PUT /api/projects/{slug}/blocks/{id}` - Update project blocks
- `DELETE /api/projects/{slug}/blocks/{id}` - Delete project blocks

### File Upload Handling
- Uses FormData for multipart uploads
- Validates file sizes (images: 2MB, videos: 50MB)
- Handles poster images for video files
- Returns normalized file paths in responses