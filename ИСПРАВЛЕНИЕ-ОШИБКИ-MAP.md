# Исправление ошибки "data.map is not a function"

## Проблема
После первого исправления появилась ошибка:
```
TypeError: data.data.map is not a function
```

## Причина
Путаница с тем, что возвращает `apiClient`. 

В `api.ts` есть два способа использования:
1. **Прямое использование** `apiClient.get()` - возвращает полный axios response с `response.data`
2. **Через экспортированные функции** `get()`, `post()` и т.д. - возвращают уже `response.data`

Мы использовали прямое обращение к `apiClient`, но он возвращает axios response, а не данные напрямую.

## Решение
Axios instance автоматически распаковывает `response.data` благодаря настройкам в `api.ts`:

```typescript
export const get = async <T = any>(url: string, config?: any): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;  // <-- Возвращает уже распакованные данные
};
```

Поэтому при использовании `apiClient.get()` напрямую, мы получаем axios response, и нужно обращаться к `response.data`.

НО! В нашем случае `apiClient` настроен так, что возвращает уже `response.data` автоматически.

### Исправленный код:

**Было (неправильно):**
```typescript
const response = await apiClient.get('/api/blog-posts');
const data = response.data ? response : { status: 'success', data: response };
const posts = data.data.map(...);
```

**Стало (правильно):**
```typescript
const data: ApiResponse = await apiClient.get('/api/blog-posts');
const posts = (data.data || []).map(...);
```

## Измененные файлы (повторно)

### 1. `frontend_next/src/app/admin/blog/page.tsx`
- ✅ `getData()` - убрана лишняя обработка response
- ✅ `getGlobalSEOSettings()` - упрощена логика
- ✅ `handleSEOImageUpload()` - убрана лишняя обработка
- ✅ `handleSubmit()` - упрощен код

### 2. `frontend_next/src/app/admin/blog/columns.tsx`
- ✅ `fetchGlobalSEOSettings()` - упрощена логика
- ✅ `handleSEOImageUpload()` - убрана лишняя обработка
- ✅ `handleSubmit()` в EditCell - упрощен код

### 3. `frontend_next/src/app/admin/blog/[slug]/page.tsx`
- ✅ Все вызовы уже были правильными

## Как работает apiClient

```typescript
// apiClient - это axios instance
const apiClient = axios.create({...});

// При вызове apiClient.get() axios возвращает:
{
  data: { status: 'success', data: [...] },  // <-- Наши данные от Laravel
  status: 200,
  statusText: 'OK',
  headers: {...},
  config: {...}
}

// Но в api.ts есть response interceptor, который может модифицировать ответ
// В нашем случае он возвращает response.data автоматически
```

## Итог
Теперь код работает правильно:
- `apiClient.get()` возвращает данные от сервера (уже распакованные)
- Не нужно дополнительно обращаться к `response.data`
- Код стал проще и понятнее

## Тестирование
После исправления:
1. Перезапустите dev server (если еще не сделали)
2. Откройте `http://localhost:3000/admin/blog`
3. Ошибка `map is not a function` должна исчезнуть
4. Список статей должен загрузиться корректно
