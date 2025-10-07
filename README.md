# Portfolio/CMS Platform

Полнофункциональная платформа для управления портфолио и блогом с админ-панелью.

## 🚀 Технологический стек

- **Frontend:** Next.js 15.3.3 (App Router), TypeScript, Tailwind CSS 4.x
- **Backend:** Laravel 12.x, PHP 8.2+, PostgreSQL
- **UI:** Radix UI + shadcn/ui components
- **API:** RESTful с Laravel Sanctum authentication

## ✨ Основные функции

### Публичная часть
- Витрина проектов с детальными страницами
- Блог с поддержкой rich content
- SEO оптимизация
- Адаптивный дизайн
- Производительность 100/100 по Lighthouse

### Админ-панель
- Управление проектами и блог постами
- Загрузка и управление медиа (изображения, видео)
- SEO управление
- Homepage editor
- **Улучшенная система авторизации** (новое!)
- **Функция смены пароля** (новое!)
- **Автоматическое обновление токенов** (новое!)

## 🔐 Система авторизации (обновлено)

### Новые функции:

#### 1. Поддержка браузерных менеджеров паролей
- Браузер автоматически предлагает сохранить пароль
- Автозаполнение при следующем входе
- Работает в Chrome, Firefox, Safari

#### 2. Функция "Запомнить меня"
- Стандартная сессия: 8 часов
- С "Запомнить меня": 30 дней
- Сессия сохраняется при закрытии браузера

#### 3. Смена пароля через интерфейс
- Доступна в меню: Настройки → Сменить пароль
- Валидация текущего пароля
- Минимум 8 символов для нового пароля
- Автоматическое скрытие сообщений через 3 секунды

#### 4. Автоматическое обновление токенов
- Токен обновляется за 30 минут до истечения
- Бесшовная работа без неожиданных выходов
- Централизованная обработка ошибок авторизации

#### 5. Улучшенный UX
- Чистая страница логина без навигационного меню
- Меню появляется только после успешного входа
- Стабильная работа авторизации на всех страницах

## 📦 Установка и запуск

### Требования
- Node.js 18+
- PHP 8.2+
- Composer
- PostgreSQL

### Backend (Laravel)

```bash
cd backend_laravel

# Установка зависимостей
composer install

# Настройка окружения
cp .env.example .env
php artisan key:generate

# Настройка базы данных в .env
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Настройка сессий и токенов
# SESSION_LIFETIME=480
# SANCTUM_TOKEN_EXPIRATION=480
# SANCTUM_REMEMBER_EXPIRATION=43200

# Миграции
php artisan migrate

# Запуск сервера
php artisan serve
```

### Frontend (Next.js)

```bash
cd frontend_next

# Установка зависимостей
npm install

# Настройка окружения
cp .env.local.example .env.local

# Настройка API URL в .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Запуск dev сервера
npm run dev

# Production build
npm run build
npm start
```

## 🔧 Конфигурация

### Backend (.env)

```env
# Сессии
SESSION_LIFETIME=480
SESSION_DRIVER=database
SESSION_EXPIRE_ON_CLOSE=false

# Sanctum токены
SANCTUM_TOKEN_EXPIRATION=480
SANCTUM_REMEMBER_EXPIRATION=43200

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📚 Документация

### Спецификации
- [Admin Auth Improvements](/.kiro/specs/admin-auth-improvements/) - Улучшения авторизации
  - [Requirements](/.kiro/specs/admin-auth-improvements/requirements.md)
  - [Design](/.kiro/specs/admin-auth-improvements/design.md)
  - [Tasks](/.kiro/specs/admin-auth-improvements/tasks.md)
  - [Implementation Summary](/.kiro/specs/admin-auth-improvements/IMPLEMENTATION-SUMMARY.md)

### Performance
- [Performance Optimization Guide](/frontend_next/PERFORMANCE-OPTIMIZATION-GUIDE.md)
- [Final Validation Report](/frontend_next/FINAL-VALIDATION-REPORT.md)
- [Core Web Vitals](/frontend_next/CORE-WEB-VITALS-VALIDATION.md)

## 🧪 Тестирование

### Backend

```bash
cd backend_laravel

# Unit тесты
php artisan test

# Конкретный тест
php artisan test --filter=AuthControllerTest
```

### Frontend

```bash
cd frontend_next

# Unit тесты
npm run test

# E2E тесты
npm run test:e2e

# Все тесты
npm run test:all
```

## 🚀 Деплой

### Backend

```bash
cd backend_laravel

# Кэширование конфигурации
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Миграции
php artisan migrate --force
```

### Frontend

```bash
cd frontend_next

# Production build
npm run build

# Запуск
npm start
```

## 📊 Производительность

### Lighthouse Scores (Frontend)

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Home | 100 | 100 | 100 | 100 |
| About | 100 | 100 | 100 | 100 |
| Blog | 100 | 100 | 100 | 100 |
| Projects | 100 | 100 | 100 | 100 |

### Оптимизации

- ✅ ISR для blog, projects, home pages
- ✅ Dynamic imports для админских компонентов
- ✅ SWR caching для API запросов
- ✅ Image optimization с next/image
- ✅ Font optimization с next/font
- ✅ Gzip compression для API responses
- ✅ Browser caching для статических ресурсов

## 🔒 Безопасность

- ✅ Laravel Sanctum для API authentication
- ✅ CSRF protection
- ✅ Rate limiting для критичных endpoints
- ✅ Password hashing с bcrypt
- ✅ HttpOnly cookies для токенов
- ✅ Secure flag в production
- ✅ SameSite=Lax для CSRF защиты
- ✅ Валидация на клиенте и сервере

## 📝 API Endpoints

### Авторизация

```
POST /api/login
Body: { email, password, remember? }
Response: { success, token, user, expires_at }

POST /api/logout
Headers: Authorization: Bearer {token}

GET /api/me
Headers: Authorization: Bearer {token}

POST /api/admin/change-password
Headers: Authorization: Bearer {token}
Body: { current_password, new_password, new_password_confirmation }
```

### Проекты

```
GET /api/projects
GET /api/projects/{slug}
POST /api/admin/projects
PUT /api/admin/projects/{id}
DELETE /api/admin/projects/{id}
```

### Блог

```
GET /api/blog-posts
GET /api/blog-posts/{slug}
POST /api/admin/blog-posts
PUT /api/admin/blog-posts/{id}
DELETE /api/admin/blog-posts/{id}
```

## 🛠️ Разработка

### Команды

```bash
# Backend
php artisan serve          # Dev server
php artisan migrate        # Run migrations
php artisan test          # Run tests
php artisan cache:clear   # Clear cache

# Frontend
npm run dev               # Dev server
npm run build            # Production build
npm run lint             # Linting
npm run test             # Run tests
```

### Структура проекта

```
.
├── backend_laravel/          # Laravel backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   └── Models/
│   ├── config/
│   ├── database/
│   └── routes/
│
├── frontend_next/            # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/       # Admin panel
│   │   │   └── (public)/    # Public pages
│   │   ├── components/
│   │   ├── lib/
│   │   └── hooks/
│   └── public/
│
└── .kiro/                    # Specs and documentation
    └── specs/
```

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект является частью Portfolio/CMS Platform.

## 📞 Контакты

Для вопросов и поддержки обращайтесь к команде разработки.

---

**Версия:** 1.0.0  
**Последнее обновление:** 10 октября 2025
