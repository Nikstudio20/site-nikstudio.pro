# Исправление SEO-настроек для страниц списков

## Проблема
SEO-настройки из базы данных (title, description, keywords) не подтягивались для следующих страниц:
- Главная страница (`/`)
- Список проектов (`/projects`)
- Список блогов (`/blog`)
- Медиа страница (`/media`)

## Решение

### 1. Обновлены страницы для загрузки SEO-настроек

#### `frontend_next/src/app/page.tsx` (Главная)
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  const pageSettings = await SEOMetadataGenerator.fetchPageSettings('home');
  
  return SEOMetadataGenerator.generateMetadata({
    content: null,
    globalSettings,
    pageSettings,
    pageType: 'home'
  });
}
```

#### `frontend_next/src/app/projects/page.tsx` (Список проектов)
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  const pageSettings = await SEOMetadataGenerator.fetchPageSettings('projects_list');
  
  return SEOMetadataGenerator.generateMetadata({
    content: null,
    globalSettings,
    pageSettings,
    pageType: 'projects_list'
  });
}
```

#### `frontend_next/src/app/blog/page.tsx` (Список блогов)
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  const pageSettings = await SEOMetadataGenerator.fetchPageSettings('blog_list');
  
  return SEOMetadataGenerator.generateMetadata({
    content: null,
    globalSettings,
    pageSettings,
    pageType: 'blog_list'
  });
}
```

### 2. Рефакторинг страницы Media

Страница `/media` была клиентским компонентом ("use client"), что не позволяло использовать `generateMetadata`.

**Изменения:**
- Создан новый файл `frontend_next/src/app/media/MediaPageClient.tsx` - клиентский компонент с всей логикой
- Обновлён `frontend_next/src/app/media/page.tsx` - серверный компонент с SEO metadata

```typescript
// frontend_next/src/app/media/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  const pageSettings = await SEOMetadataGenerator.fetchPageSettings('media');
  
  return SEOMetadataGenerator.generateMetadata({
    content: null,
    globalSettings,
    pageSettings,
    pageType: 'home'
  });
}

export default function MediaPage() {
  return <MediaPageClient />;
}
```

## Типы страниц в базе данных

Согласно `backend_laravel/app/Models/PageSeoSetting.php`:

```php
const PAGE_TYPES = [
    'home' => 'Главная страница',
    'projects_list' => 'Список проектов',
    'blog_list' => 'Список блога',
    'media' => 'Медиа',
];
```

## Приоритет SEO-данных

Система `SEOMetadataGenerator` использует следующий приоритет:

1. **Для индивидуальных страниц (проект/блог):**
   - `content.seo_title` / `content.seo_description` / `content.seo_image`
   - `content.title` / `content.description` / `content.main_image`
   - Глобальные настройки

2. **Для страниц списков:**
   - `pageSettings.seo_title` / `pageSettings.seo_description` / `pageSettings.seo_image` ✅ **ТЕПЕРЬ РАБОТАЕТ**
   - Глобальные настройки

## API Endpoints

- `GET /api/seo/settings` - глобальные SEO-настройки
- `GET /api/seo/pages` - SEO-настройки для всех типов страниц

## Кеширование

- Глобальные настройки: 5 минут (300 секунд)
- Настройки страниц: 5 минут (300 секунд)
- ISR (Incremental Static Regeneration) для страниц

## Проверка

После деплоя проверьте:
1. Откройте админ-панель `/admin/seo-settings`
2. Настройте SEO для каждого типа страницы
3. Проверьте мета-теги в исходном коде страниц:
   - `<title>` - должен содержать `seo_title` из базы
   - `<meta name="description">` - должен содержать `seo_description`
   - Open Graph теги должны использовать `seo_image`

## Файлы изменены

- ✅ `frontend_next/src/app/page.tsx`
- ✅ `frontend_next/src/app/projects/page.tsx`
- ✅ `frontend_next/src/app/blog/page.tsx`
- ✅ `frontend_next/src/app/media/page.tsx` (новый серверный компонент)
- ✅ `frontend_next/src/app/media/MediaPageClient.tsx` (новый клиентский компонент)

## Функционал и дизайн

✅ Все изменения сделаны аккуратно:
- Не затронута вёрстка и стили
- Сохранён весь функционал страниц
- Добавлена только загрузка SEO-настроек из базы данных
