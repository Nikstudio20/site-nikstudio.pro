# Тест поддержки SVG файлов

## Что было исправлено:

### Frontend (React/TypeScript):
1. **utils.ts** - Добавлен SVG в `validateImageFile()` функцию
2. **EnhancedFileUpload.tsx** - Обновлены константы и сообщения для поддержки SVG
3. **MediaUploadGroup.tsx** - Добавлена поддержка SVG в валидацию и сообщения
4. **Страницы админки** - Обновлены accept атрибуты для поддержки .svg файлов:
   - `/admin/projects/page.tsx`
   - `/admin/projects/columns.tsx`
   - `/admin/projects/[slug]/page.tsx` (через компоненты)
5. **SEO компоненты** - Добавлена поддержка SVG:
   - `PageSEOSettings.tsx`
   - `GlobalSEOSettings.tsx`
   - `ContentSEOManager.tsx`

### Backend (Laravel/PHP):
1. **Контроллеры** - Обновлена валидация mimes для поддержки SVG:
   - `MediaProcessStepsController.php`
   - `MediaTestimonialsController.php`
   - `MediaPageController.php`
   - `BlogPostController.php`
   - `ProjectController.php`
   - `SEOController.php`
   - `HomeController.php`

2. **Валидация** - Добавлен `image/svg+xml` MIME тип и `svg` расширение

## Как протестировать:

1. Перейдите на страницу `/admin/projects/[slug]`
2. В секции "Блоки проекта" нажмите "Добавить медиа-группу"
3. Попробуйте загрузить SVG файл - теперь он должен приниматься
4. Также протестируйте редактирование существующей медиа-группы

## Поддерживаемые форматы изображений:
- JPG/JPEG
- PNG
- GIF
- WebP
- **SVG** (новый)

Максимальный размер для всех изображений: 2 МБ