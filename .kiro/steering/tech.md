---
inclusion: always
---

# Technology Stack

## Frontend
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript
- **UI Components**: Custom components with Radix UI primitives, shadcdn ui
- **Styling**: Tailwind CSS 4.x
- **State Management**: React hooks
- **API Communication**: Axios
- **Media Handling**: 
  - react-dropzone for file uploads
  - Various libraries for media display (swiper, react-slick, react-modal-image)

## Backend
- **Framework**: Laravel 12.x
- **Language**: PHP 8.2+
- **Database**: Postgres
- **API**: RESTful API endpoints
- **File Storage**: Laravel storage system

## Common Commands

### Frontend (Next.js)
```bash
# Navigate to frontend directory
cd frontend_next

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Backend (Laravel)
```bash
# Navigate to backend directory
cd backend_laravel

# Install PHP dependencies
composer install

# Set up environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Start development server
php artisan serve

# Run tests
php artisan test

# Combined dev environment (server, queue, logs, vite)
composer run dev
```

## Development Standards
- TypeScript for type safety in frontend code
- Laravel conventions for backend code organization
- RESTful API design principles
- Responsive design using Tailwind CSS
- Component-based architecture in React