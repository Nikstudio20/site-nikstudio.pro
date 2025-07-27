# Исправление ошибок на странице медиа

## Проблема
На странице `/media` не отображались изображения из-за ошибок в Footer и FooterMobile компонентах при загрузке категорий проектов. Ошибка: "Network Error" в mediaApi.ts.

## Исправления

### 1. Исправлен API URL в переменных окружения
**Файл:** `frontend_next/.env.local`
```
# Было:
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Стало:
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Исправлен путь в mediaApi.ts
**Файл:** `frontend_next/src/services/mediaApi.ts`
```typescript
// Было:
const response = await axios.get(`${API_BASE_URL}/public/media-page`, {

// Стало:
const response = await axios.get(`${API_BASE_URL}/api/public/media-page`, {
```

### 3. Добавлены тестовые категории проектов
**Файл:** `backend_laravel/database/seeders/ProjectCategorySeeder.php`
- Создан сидер для добавления тестовых категорий
- Добавлены категории: Веб-разработка, Мобильные приложения, Дизайн интерфейсов, Брендинг, Маркетинг

## Результат тестирования

✅ **API эндпоинты работают корректно:**
- `/api/project-categories` - возвращает список категорий
- `/api/public/media-page` - возвращает данные для медиа страницы

✅ **Структура данных соответствует ожидаемой:**
- Категории проектов имеют правильную структуру (id, name, slug, sort_order)
- Медиа данные содержат все необходимые секции (hero, services, testimonials, process)

## Что нужно сделать для применения исправлений

1. **Перезапустить Next.js сервер** для применения изменений в `.env.local`:
   ```bash
   cd frontend_next
   npm run dev
   ```

2. **Проверить работу страницы:**
   - Открыть `http://localhost:3000/media`
   - Убедиться, что изображения загружаются
   - Проверить, что Footer больше не показывает ошибки в консоли

## Дополнительные улучшения

- Добавлены тестовые категории проектов для более полного тестирования
- API возвращает корректные данные в ожидаемом формате
- Все изображения должны отображаться через компонент OptimizedImage

## Техническая информация

- **Backend API:** Laravel работает на `http://localhost:8000`
- **Frontend:** Next.js работает на `http://localhost:3000`
- **База данных:** PostgreSQL с корректными миграциями
- **Изображения:** Обрабатываются через Laravel Storage с символической ссылкой в public/storage