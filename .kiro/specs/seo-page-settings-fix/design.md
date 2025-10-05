# SEO Page Settings Fix Design

## Overview

Этот дизайн описывает решение для исправления проблем с подключением SEO-настроек из базы данных. Основные изменения включают:
1. Модификацию функции генерации метаданных для использования настроек конкретных страниц
2. Удаление функции обрезания текста (truncateText) для вывода полного контента
3. Корректную обработку keywords из базы данных
4. Обеспечение правильного fallback на глобальные настройки

## Architecture

### Текущая архитектура

**Frontend (Next.js):**
- `SEOMetadataGenerator` класс в `frontend_next/src/lib/seo-metadata.ts`
- Функции `generateMetadata()` в файлах страниц (page.tsx)
- Использование Next.js Metadata API

**Backend (Laravel):**
- `SEOController` для управления SEO-настройками
- `PageSeoSetting` модель для хранения настроек страниц
- API эндпоинт `/api/seo/pages` для получения настроек

### Проблемы в текущей реализации

1. **Функция `truncateText`** обрезает текст и добавляет "…":
```typescript
private static truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}
```

2. **Функция `generateKeywords`** использует хардкод вместо данных из БД:
```typescript
private static generateKeywords(pageType: string): string[] {
  const baseKeywords = ['NIK Studio', 'дизайн', 'брендинг', 'визуализация'];
  
  switch (pageType) {
    case 'project':
      return [...baseKeywords, 'проекты', 'портфолио', 'кейсы'];
    case 'blog':
      return [...baseKeywords, 'блог', 'статьи', 'новости'];
    case 'home':
    default:
      return [...baseKeywords, 'промышленный дизайн', '3д-анимация', 'видеопродакшн'];
  }
}
```

3. **Функция `generateTitle`** не использует pageSettings для страниц home и media
4. **Функция `generateDescription`** не использует pageSettings для страниц home и media

## Components and Interfaces

### Обновлённые интерфейсы

Интерфейсы остаются без изменений, так как они уже поддерживают необходимую функциональность:

```typescript
export interface PageSeoSettings {
  id: number;
  page_type: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  seo_keywords: string[] | null;
  canonical_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

### Изменения в SEOMetadataGenerator

#### 1. Удаление функции truncateText

Функция `truncateText` будет полностью удалена. Вместо неё будем использовать прямой вывод текста:

```typescript
// УДАЛИТЬ:
private static truncateText(text: string, maxLength: number): string { ... }

// ЗАМЕНИТЬ на прямой вывод:
return text; // без обрезания
```

#### 2. Обновление функции generateTitle

```typescript
private static generateTitle(
  content: ContentWithSEO | null,
  globalSettings: SEOSettings | null,
  pageSettings: PageSeoSettings | null,
  pageType: string
): string {
  const siteTitle = this.getGlobalSetting(globalSettings, 'site_title');
  
  // Для страниц списков и специальных страниц (home, media) используем pageSettings
  if (pageSettings?.seo_title) {
    return pageSettings.seo_title; // БЕЗ truncateText
  }

  // Для индивидуального контента используем content.seo_title
  if (content?.seo_title) {
    return content.seo_title; // БЕЗ truncateText
  }

  // Fallback на content title
  const contentTitle = content?.title || content?.main_title;
  if (contentTitle) {
    return `${contentTitle} | ${siteTitle}`;
  }

  // Default titles по типу страницы
  switch (pageType) {
    case 'project':
      return `Проект | ${siteTitle}`;
    case 'blog':
      return `Блог | ${siteTitle}`;
    case 'projects_list':
      return `Проекты | ${siteTitle}`;
    case 'blog_list':
      return `Блог | ${siteTitle}`;
    case 'media':
      return `Медиа | ${siteTitle}`;
    case 'home':
    default:
      return siteTitle;
  }
}
```

#### 3. Обновление функции generateDescription

```typescript
private static generateDescription(
  content: ContentWithSEO | null,
  globalSettings: SEOSettings | null,
  pageSettings: PageSeoSettings | null,
  _pageType: string
): string {
  // Для страниц списков и специальных страниц используем pageSettings
  if (pageSettings?.seo_description) {
    return pageSettings.seo_description; // БЕЗ truncateText
  }

  // Для индивидуального контента используем content.seo_description
  if (content?.seo_description) {
    return content.seo_description; // БЕЗ truncateText
  }

  // Fallback на content description
  if (content?.description) {
    return content.description; // БЕЗ truncateText
  }

  // Fallback на глобальные настройки
  const globalDescription = this.getGlobalSetting(globalSettings, 'site_description');
  return globalDescription; // БЕЗ truncateText
}
```

#### 4. Новая функция generateKeywords

```typescript
private static generateKeywords(
  pageSettings: PageSeoSettings | null,
  pageType: string
): string[] {
  // Используем keywords из pageSettings если они есть
  if (pageSettings?.seo_keywords && Array.isArray(pageSettings.seo_keywords)) {
    return pageSettings.seo_keywords;
  }

  // Fallback на дефолтные keywords
  const baseKeywords = ['NIK Studio', 'дизайн', 'брендинг', 'визуализация'];
  
  switch (pageType) {
    case 'project':
      return [...baseKeywords, 'проекты', 'портфолио', 'кейсы'];
    case 'blog':
    case 'blog_list':
      return [...baseKeywords, 'блог', 'статьи', 'новости'];
    case 'projects_list':
      return [...baseKeywords, 'проекты', 'портфолио', 'кейсы'];
    case 'media':
      return [...baseKeywords, 'медиа', 'галерея', 'видео'];
    case 'home':
    default:
      return [...baseKeywords, 'промышленный дизайн', '3д-анимация', 'видеопродакшн'];
  }
}
```

#### 5. Обновление функции buildNextjsMetadata

```typescript
private static buildNextjsMetadata(
  seoData: SEOMetadata,
  globalSettings: SEOSettings | null,
  pageSettings: PageSeoSettings | null,
  pageType: string
): Metadata {
  const twitterCardType = this.getGlobalSetting(globalSettings, 'twitter_card_type') as 'summary' | 'summary_large_image';

  // Generate optimized images for different platforms
  const optimizedImages = seoData.image ? {
    openGraph: SocialMediaImageOptimizer.generateOpenGraphImage(seoData.image),
    twitter: SocialMediaImageOptimizer.generateTwitterImage(seoData.image, twitterCardType)
  } : null;

  return {
    title: seoData.title, // УЖЕ БЕЗ truncateText
    description: seoData.description, // УЖЕ БЕЗ truncateText
    keywords: this.generateKeywords(pageSettings, pageType), // ОБНОВЛЕНО
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: seoData.url,
      siteName: this.getGlobalSetting(globalSettings, 'site_title'),
      images: optimizedImages?.openGraph ? [
        {
          url: optimizedImages.openGraph,
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ] : undefined,
      locale: 'ru_RU',
      type: seoData.type,
      publishedTime: seoData.publishedTime,
      modifiedTime: seoData.modifiedTime,
    },
    twitter: {
      card: twitterCardType,
      title: seoData.title,
      description: seoData.description,
      images: optimizedImages?.twitter ? [optimizedImages.twitter] : undefined,
    },
    alternates: {
      canonical: seoData.url
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      ...(globalSettings?.facebook_app_id && {
        'fb:app_id': globalSettings.facebook_app_id
      })
    }
  };
}
```

#### 6. Обновление функции generateMetadata

```typescript
static generateMetadata(props: GenerateMetadataProps): Metadata {
  const endTiming = seoPerformanceMonitor.startTiming('metadata-generation');
  
  try {
    // Try to get cached metadata first
    const cachedMetadata = seoCache.getPageMetadata(props.pageType, props.slug);
    if (cachedMetadata) {
      seoPerformanceMonitor.recordCacheAccess('metadata', true);
      endTiming();
      return this.buildNextjsMetadata(
        cachedMetadata,
        props.globalSettings,
        props.pageSettings || null,
        props.pageType
      );
    }

    seoPerformanceMonitor.recordCacheAccess('metadata', false);
    const seoData = this.generateSEOData(props);
    
    // Cache the generated metadata
    seoCache.cachePageMetadata(props.pageType, props.slug, seoData);
    
    const result = this.buildNextjsMetadata(
      seoData,
      props.globalSettings,
      props.pageSettings || null,
      props.pageType
    );
    endTiming();
    return result;
  } catch (error) {
    endTiming();
    throw error;
  }
}
```

### Изменения в файлах страниц

#### 1. frontend_next/src/app/page.tsx (Главная страница)

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  const pageSettings = await SEOMetadataGenerator.fetchPageSettings('home');
  
  return SEOMetadataGenerator.generateMetadata({
    content: null,
    globalSettings,
    pageSettings,
    pageType: 'home' // ИЗМЕНЕНО: было 'home', остаётся 'home'
  });
}
```

#### 2. frontend_next/src/app/projects/page.tsx (Список проектов)

Уже корректно использует pageSettings, изменений не требуется.

#### 3. frontend_next/src/app/blog/page.tsx (Список блога)

Уже корректно использует pageSettings, изменений не требуется.

#### 4. frontend_next/src/app/media/page.tsx (Страница медиа)

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  const pageSettings = await SEOMetadataGenerator.fetchPageSettings('media');
  
  return SEOMetadataGenerator.generateMetadata({
    content: null,
    globalSettings,
    pageSettings,
    pageType: 'media' // ИЗМЕНЕНО: было 'home', теперь 'media'
  });
}
```

## Data Models

Модели данных остаются без изменений, так как структура базы данных уже поддерживает необходимую функциональность.

### PageSeoSetting Model (Laravel)

```php
class PageSeoSetting extends Model
{
    const PAGE_TYPES = [
        'home' => 'Главная страница',
        'projects_list' => 'Список проектов',
        'blog_list' => 'Список блога',
        'media' => 'Медиа страница',
    ];
    
    protected $fillable = [
        'page_type',
        'seo_title',
        'seo_description',
        'seo_image',
        'seo_keywords',
        'canonical_url',
        'is_active',
    ];
    
    protected $casts = [
        'seo_keywords' => 'array',
        'is_active' => 'boolean',
    ];
}
```

## Error Handling

### Frontend Error Handling

1. **Отсутствие pageSettings**: Fallback на globalSettings
2. **Отсутствие globalSettings**: Использование DEFAULT_SETTINGS
3. **Пустые значения**: Fallback на дефолтные значения по типу страницы
4. **Ошибки API**: Логирование и использование fallback значений

### Backend Error Handling

Изменений в backend не требуется, так как API уже корректно работает.

## Testing Strategy

### Unit Tests

1. **Тест generateTitle без truncateText**:
   - Проверить, что полный title возвращается без "…"
   - Проверить fallback на pageSettings
   - Проверить fallback на globalSettings

2. **Тест generateDescription без truncateText**:
   - Проверить, что полное description возвращается без "…"
   - Проверить fallback на pageSettings
   - Проверить fallback на globalSettings

3. **Тест generateKeywords**:
   - Проверить использование keywords из pageSettings
   - Проверить fallback на дефолтные keywords
   - Проверить корректную обработку массива keywords

### Integration Tests

1. **Тест главной страницы**:
   - Проверить использование pageSettings для home
   - Проверить корректный вывод title, description, keywords

2. **Тест страницы проектов**:
   - Проверить использование keywords из pageSettings

3. **Тест страницы блога**:
   - Проверить использование keywords из pageSettings

4. **Тест страницы медиа**:
   - Проверить использование pageSettings для media
   - Проверить корректный вывод title, description, keywords

### Manual Testing

1. Проверить meta-теги в HTML всех страниц
2. Проверить отсутствие "…" в title и description
3. Проверить корректность keywords в meta-тегах
4. Проверить работу fallback при отсутствии настроек

## Implementation Considerations

### Performance

- Кеширование остаётся без изменений
- Удаление truncateText не влияет на производительность
- Все изменения локальны в SEOMetadataGenerator

### Backward Compatibility

- Все изменения обратно совместимы
- Fallback на globalSettings сохраняется
- Существующие страницы продолжат работать

### Security

- Изменения не влияют на безопасность
- Валидация данных остаётся на уровне backend

### Accessibility

- Изменения не влияют на доступность
- Полный текст улучшает читаемость для screen readers
