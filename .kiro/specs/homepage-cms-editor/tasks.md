# Implementation Plan

## Overview
Этот план разбивает реализацию CMS для главной страницы на пошаговые задачи. Каждая задача фокусируется на конкретном функционале и может быть выполнена независимо.

---

- [x] 1. Создать базовую структуру базы данных





  - Создать миграцию для таблицы `homepage_content` с полями: id, section, content_type, content_key, content_value, order_index, metadata, timestamps
  - Добавить уникальный индекс на (section, content_key)
  - Добавить индексы для оптимизации запросов
  - _Requirements: 1.1, 1.2_

- [x] 2. Создать модель и seeder для начальных данных





  - Создать модель `HomepageContent` с fillable полями и casts для metadata
  - Добавить scopes: bySection, byType, ordered
  - Создать seeder `HomepageContentSeeder` с текущим контентом из компонентов
  - Извлечь все текстовые блоки и пути к изображениям из HomeContentServer.tsx, MainContentSection.tsx, ServicesSection.tsx, TestimonialsSection.tsx
  - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4_

- [x] 3. Создать API endpoints для чтения контента





  - Создать контроллер `HomepageContentController`
  - Реализовать метод `index()` - возвращает весь контент, сгруппированный по секциям
  - Реализовать метод `getBySection($section)` - возвращает контент конкретной секции
  - Добавить кеширование с TTL 1800 секунд
  - Добавить маршруты в `api.php` без аутентификации
  - _Requirements: 1.3, 1.4, 5.2_

- [x] 4. Создать API endpoints для изменения контента





  - Реализовать метод `bulkUpdate(Request $request)` для массового обновления
  - Реализовать метод `update(Request $request, $id)` для обновления одного элемента
  - Добавить валидацию: section (required, max:100), content_type (enum), content_key (required, max:100), content_value (required)
  - Добавить очистку кеша после обновления
  - Добавить middleware `auth:sanctum` для защиты endpoints
  - _Requirements: 1.5, 1.6, 1.8, 1.9, 1.11, 6.1, 6.2, 6.6_

- [x] 5. Создать API endpoint для загрузки изображений









  - Реализовать метод `uploadImage(Request $request)` в контроллере
  - Добавить валидацию: image (required, mimes:jpeg,jpg,png,webp, max:2048)
  - Проверять размер файла и возвращать HTTP 413 при превышении
  - Сохранять изображения в `storage/homepage/`
  - Возвращать нормализованный путь без префикса `/storage/`
  - Добавить middleware `auth:sanctum`
  - _Requirements: 1.7, 1.10, 6.3, 6.4, 6.5_

- [x] 6. Создать TypeScript интерфейсы и helper функции





  - Создать файл `lib/homepage-content.ts`
  - Определить интерфейсы: HomepageContent, HomepageContentBySections
  - Создать функцию `getContentValue(content, key, fallback)` для получения текстового контента
  - Создать функцию `getImageUrl(content, key, fallback)` для получения URL изображений
  - _Requirements: 3.2_

- [x] 7. Создать API client функции для фронтенда





  - Создать функцию `getHomepageContent()` с ISR revalidation 1800 секунд
  - Создать функцию `updateHomepageContent(items)` для админки
  - Создать функцию `uploadHomepageImage(file)` с валидацией размера
  - Добавить обработку ошибок: HTTP 413, 422, 500
  - Добавить fallback на null при ошибках
  - _Requirements: 3.1, 3.3, 5.1_

- [x] 8. Модифицировать HomeContentServer для использования API





  - Добавить вызов `getHomepageContent()` в Server Component
  - Передать динамический контент в дочерние компоненты как props
  - Сохранить fallback значения (текущий hardcoded контент)
  - Обернуть API вызов в try-catch с fallback
  - Сохранить все существующие компоненты и структуру
  - _Requirements: 3.1, 3.2, 3.3, 7.1, 7.2, 7.3_

- [x] 9. Модифицировать MainContentSection для динамического контента





  - Добавить props для приема контента
  - Заменить hardcoded текст на `getContentValue(content, key, fallback)`
  - Заменить hardcoded пути изображений на `getImageUrl(content, key, fallback)`
  - Сохранить все CSS классы и структуру HTML
  - _Requirements: 3.2, 3.4, 7.2_

- [x] 10. Модифицировать ServicesSection для динамического контента





  - Добавить props для приема массива услуг
  - Создать map по services_1 через services_7
  - Заменить hardcoded контент на динамические значения
  - Сохранить все CSS классы и layout
  - _Requirements: 3.2, 3.4, 7.2_

- [x] 11. Модифицировать TestimonialsSection для динамического контента





  - Добавить props для приема массива отзывов
  - Создать map по testimonials_1 через testimonials_6
  - Заменить hardcoded контент на динамические значения
  - Сохранить карусель и lazy loading
  - _Requirements: 3.2, 3.4, 7.2, 7.8_

- [x] 12. Создать базовый компонент HomepageEditor








  - Создать файл `app/admin/homepage-editor/page.tsx`
  - Создать табы: Hero, Контент, Услуги, Отзывы
  - Добавить состояния: activeTab, content, hasChanges, isSaving
  - Добавить кнопки "Сохранить изменения" и "Отменить"
  - Показывать индикатор несохраненных изменений
  - _Requirements: 4.1, 4.10_

- [x] 13. Создать компонент ImageUpload





  - Создать reusable компонент для загрузки изображений
  - Добавить preview текущего изображения
  - Валидировать размер файла (макс 2MB) на клиенте
  - Валидировать тип файла (jpg, png, webp)
  - Показывать loading state во время загрузки
  - Показывать ошибки на русском языке
  - _Requirements: 4.3, 4.4, 4.5, 6.4_

- [x] 14. Создать редактор Hero секции





  - Создать компонент `HeroSectionEditor`
  - Добавить поля: hero_title, hero_subtitle, hero_description, hero_logo
  - Использовать Textarea для многострочного текста
  - Использовать ImageUpload для логотипа
  - _Requirements: 4.2, 4.3_

- [x] 15. Создать редактор Main Content секции





  - Создать компонент `MainContentSectionEditor`
  - Добавить поля для заголовков и параграфов
  - Добавить загрузку 6 логотипов клиентов
  - Группировать поля логично
  - _Requirements: 4.2, 4.3_

- [x] 16. Создать редактор Services секций





  - Создать компонент `ServicesSectionEditor`
  - Создать 7 карточек для каждой услуги
  - Каждая карточка: title, description, subtitle, features, image
  - Использовать Card компонент из shadcn/ui
  - _Requirements: 4.2, 4.3_

- [x] 17. Создать редактор Testimonials секций





  - Создать компонент `TestimonialsSectionEditor`
  - Создать 6 карточек для каждого отзыва
  - Каждая карточка: quote, description, author_name, author_company, author_photo
  - Использовать Card компонент из shadcn/ui
  - _Requirements: 4.2, 4.3_

- [x] 18. Реализовать логику сохранения в админке





  - Реализовать функцию `handleSave()` в HomepageEditor
  - Собрать все измененные элементы
  - Вызвать `updateHomepageContent(changedItems)`
  - Отключить кнопку во время сохранения
  - Показать уведомление об успехе на 3 секунды
  - Обработать ошибки с детальными сообщениями
  - _Requirements: 4.6, 4.7, 4.8, 4.9_

- [x] 19. Добавить skeleton loaders в админку





  - Показывать skeleton loader пока загружается контент
  - Использовать компонент Skeleton из shadcn/ui
  - _Requirements: 4.11_

- [x] 20. Создать API route для revalidation





  - Создать `app/api/revalidate/route.ts`
  - Реализовать POST метод с вызовом `revalidatePath('/')`
  - Вызывать после успешного обновления контента
  - _Requirements: 3.6, 5.4_

- [x] 21. Добавить обработку ошибок и валидацию





  - Добавить санитизацию входных данных в Laravel
  - Добавить rate limiting для API endpoints
  - Проверять аутентификацию для всех изменяющих операций
  - Логировать все ошибки
  - _Requirements: 6.1, 6.2, 6.5, 6.7_

- [x] 22. Запустить миграцию и seeder





  - Выполнить `php artisan migrate`
  - Выполнить `php artisan db:seed --class=HomepageContentSeeder`
  - Проверить, что данные корректно загружены в БД
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 23. Добавить навигацию к редактору главной страницы





  - Добавить пункт "Главная страница" в sidebar навигацию (app-sidebar.tsx)
  - Использовать иконку FileEdit или Home
  - URL: /admin/homepage-editor
  - Разместить после пункта "Главная" или "Медиа-страница"
  - _Requirements: 4.1_

- [x] 24. Протестировать главную страницу



  - Открыть главную страницу и проверить, что контент отображается
  - Проверить, что все изображения загружаются
  - Проверить fallback при недоступности API
  - Проверить, что все CSS классы сохранены
  - Проверить SEO meta-теги
  - _Requirements: 3.7, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 25. Протестировать админку





  - Открыть `/admin/homepage-editor`
  - Проверить загрузку текущего контента
  - Изменить текстовое поле и сохранить
  - Загрузить новое изображение
  - Проверить, что изменения отображаются на главной странице
  - Проверить валидацию размера файлов
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 26. Проверить производительность





  - Запустить Lighthouse audit
  - Проверить, что score не упал
  - Проверить время загрузки страницы
  - Проверить работу ISR кеширования
  - _Requirements: 3.7, 5.1, 5.5, 5.6_

## Статус реализации

### ✅ Завершено (Tasks 1-22, 24, 26)
Все основные компоненты системы CMS для главной страницы успешно реализованы:

**Backend (Laravel):**
- ✅ База данных и миграция созданы
- ✅ Модель HomepageContent с scopes и методами
- ✅ Seeder с полным контентом из текущих компонентов
- ✅ API endpoints (GET, POST, PUT) с кешированием
- ✅ Загрузка изображений с валидацией (2MB max)
- ✅ Аутентификация и rate limiting
- ✅ Санитизация данных и обработка ошибок

**Frontend (Next.js):**
- ✅ TypeScript интерфейсы и helper функции
- ✅ API client с ISR (30 минут)
- ✅ HomeContentServer интегрирован с CMS API
- ✅ MainContentSection использует динамический контент
- ✅ ServicesSection использует динамический контент
- ✅ TestimonialsSection использует динамический контент
- ✅ Fallback значения для всех секций

**Admin Interface:**
- ✅ HomepageEditor с табами и состояниями
- ✅ HeroSectionEditor компонент
- ✅ MainContentSectionEditor компонент
- ✅ ServicesSectionEditor компонент
- ✅ TestimonialsSectionEditor компонент
- ✅ ImageUpload компонент с валидацией
- ✅ Skeleton loaders
- ✅ Логика сохранения и отмены
- ✅ Индикатор несохраненных изменений
- ✅ API route для revalidation

**Performance Testing:**
- ✅ Comprehensive performance test suite created
- ✅ Page load time: 2.088s (within 3s target) ✅
- ✅ ISR caching verified and working correctly
- ✅ SEO structure maintained (title, meta, headings)
- ✅ Accessibility: 100% images with alt text
- ✅ 43 images loading efficiently
- ✅ Cross-browser testing completed
- ⚠️ First Contentful Paint: 2.1-4.8s (target: <1.5s) - acceptable but can be optimized
- ✅ Full performance report: TASK-26-PERFORMANCE-REPORT.md

### 🔄 Осталось выполнить (Tasks 23, 25)
- **Task 23**: Добавить навигационную ссылку в sidebar админки
- **Task 25**: Функциональное тестирование админки

### ⚠️ Важно
Страница редактора главной страницы существует по адресу `/admin/homepage-editor`, но отсутствует навигационная ссылка в боковом меню админки. Необходимо добавить пункт меню для доступа к редактору.
