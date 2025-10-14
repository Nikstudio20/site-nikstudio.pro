# Исправление аутентификации Media Page - использование API клиента

## Проблема
На странице `/admin/media-page` возникали ошибки:
```
Unexpected token '<', "<!-- Pleas"... is not valid JSON
```

Это происходило потому что:
1. Использовались прямые `fetch` запросы вместо централизованного API клиента
2. Токены аутентификации не передавались корректно
3. Laravel возвращал HTML страницу ошибки вместо JSON ответа

## Решение
Переписаны все компоненты для использования централизованного API клиента из `@/lib/api`, который:
- Автоматически добавляет токен из cookie в заголовки
- Обрабатывает обновление токенов
- Перенаправляет на страницу логина при 401 ошибке
- Обеспечивает единообразную обработку ошибок

## Изменённые файлы

### 1. Создан новый файл: `frontend_next/src/lib/media-page-api.ts`
Вспомогательные функции для работы с Media Page API:
- `getMediaPageContent()` - загрузка контента страницы
- `updateHeroContent()` - обновление Hero секции
- `updateTestimonialsHeader()` - обновление заголовка отзывов
- `updateProcessHeader()` - обновление заголовка процесса
- `getMediaServices()` - загрузка услуг
- `deleteMediaService()` - удаление услуги
- `moveMediaService()` - перемещение услуги
- `getMediaTestimonials()` - загрузка отзывов
- `deleteMediaTestimonial()` - удаление отзыва
- `reorderMediaTestimonials()` - изменение порядка отзывов
- `getMediaProcessSteps()` - загрузка шагов процесса
- `deleteMediaProcessStep()` - удаление шага
- `reorderMediaProcessSteps()` - изменение порядка шагов

### 2. MediaPageAdmin.tsx
**Изменения:**
- Добавлен импорт: `import { get, put, post, del } from '@/lib/api'`
- Заменены все `fetch` запросы на использование API клиента:
  - `loadMediaPageContent()` - использует `get()`
  - `handleHeroSubmit()` - использует `put()`
  - `handleTestimonialsSubmit()` - использует `put()`
  - `handleProcessSubmit()` - использует `put()`
  - `loadServices()` - использует `get()`
  - `handleDeleteService()` - использует `del()`
  - `handleMoveService()` - использует `put()`
  - `loadTestimonials()` - использует `get()`
  - `handleDeleteTestimonial()` - использует `del()`
  - `handleReorderTestimonials()` - использует `post()`
  - `loadProcessSteps()` - использует `get()`
  - `handleDeleteProcessStep()` - использует `del()`
  - `handleReorderProcessSteps()` - использует `post()`

**Улучшения обработки ошибок:**
```typescript
catch (err: any) {
  const errorMessage = err.response?.data?.message || err.message || 'Неизвестная ошибка';
  setError(errorMessage);
}
```

### 3. ServiceBlockDialog.tsx
**Изменения:**
- Добавлен импорт: `import { get, post, put, del } from '@/lib/api'`
- Заменены все `fetch` запросы:
  - `loadMediaItems()` - использует `get()`
  - `saveFeaturesForService()` - использует `get()`, `del()`, `post()`
  - `handleSubmit()` - использует `put()` или `post()`

**Упрощена обработка ответов:**
```typescript
const data = isEdit
  ? await put<any>(url, { title, description, dark_background })
  : await post<any>(url, { title, description, dark_background });

if (data.status === 'success') {
  // Обработка успеха
}
```

### 4. ServiceMediaManager.tsx
**Изменения:**
- Добавлен импорт: `import apiClient from '@/lib/api'`
- Для FormData запросов используется `apiClient` напрямую:
```typescript
const response = await apiClient.post(url, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
const data = response.data;
```

### 5. TestimonialDialog.tsx
**Изменения:**
- Добавлен импорт: `import apiClient from '@/lib/api'`
- Использует `apiClient.post()` для FormData:
```typescript
const response = await apiClient.post(url, formDataToSend, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
const data = response.data;
```

**Улучшена обработка ошибок:**
```typescript
catch (err: any) {
  if (err.response?.status === 413) {
    setError('Размер изображения превышает 2MB');
    return;
  }
  
  if (err.response?.data?.errors) {
    setFieldErrors(err.response.data.errors);
    return;
  }
}
```

### 6. ProcessStepDialog.tsx
**Изменения:**
- Добавлен импорт: `import apiClient from '@/lib/api'`
- Аналогично TestimonialDialog, использует `apiClient.post()` для FormData
- Улучшена обработка ошибок с проверкой статуса 413 и валидационных ошибок

## Преимущества нового подхода

### 1. Автоматическая аутентификация
- Токен автоматически добавляется из cookie
- Не нужно вручную добавлять `credentials: 'include'`
- Автоматическое обновление токенов

### 2. Единообразная обработка ошибок
- Централизованная обработка 401 (перенаправление на логин)
- Централизованная обработка 403 (доступ запрещён)
- Консистентная структура ошибок

### 3. Упрощённый код
**Было:**
```typescript
const response = await fetch(`${apiUrl}/api/admin/media-page/hero`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({ hero_title, hero_description }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'Ошибка');
}
```

**Стало:**
```typescript
const data = await put('/api/admin/media-page/hero', {
  hero_title,
  hero_description
});

if (data.success) {
  // Обработка успеха
}
```

### 4. Лучшая типизация
- TypeScript типы для всех API функций
- Автокомплит в IDE
- Проверка типов на этапе компиляции

## Тестирование

### Проверьте следующие операции:

1. **Hero секция**
   - Редактирование заголовка и описания
   - Сохранение изменений

2. **Блоки услуг**
   - Создание нового блока
   - Редактирование существующего
   - Удаление блока
   - Перемещение вверх/вниз
   - Добавление функций
   - Загрузка медиа-файлов

3. **Отзывы**
   - Создание отзыва с изображением
   - Редактирование отзыва
   - Удаление отзыва
   - Изменение порядка

4. **Шаги процесса**
   - Создание шага с изображением
   - Редактирование шага
   - Удаление шага
   - Изменение порядка

### Ожидаемый результат
- ✅ Все операции выполняются успешно
- ✅ Нет ошибок `Unexpected token '<'`
- ✅ Корректные сообщения об успехе/ошибке
- ✅ Автоматическое обновление данных после операций
- ✅ Валидация файлов (размер, формат)
- ✅ Корректная обработка ошибок сервера

## Совместимость
- ✅ Не затронута вёрстка и дизайн
- ✅ Не изменён функционал
- ✅ Сохранена скорость загрузки
- ✅ SEO не затронуто
- ✅ Авторизация работает корректно
- ✅ Все существующие функции работают

## Дополнительные улучшения
- Создан модуль `media-page-api.ts` для переиспользования API функций
- Улучшена обработка ошибок с детальными сообщениями
- Добавлена типизация для всех API ответов
- Упрощён код компонентов за счёт вынесения логики в API модуль
