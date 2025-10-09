# Исправление ошибок при работе с видео на главной странице

## Проблемы

При редактировании главной страницы в админке (`/admin/homepage-editor`) возникали следующие ошибки:

1. **При удалении главного видео**: Ошибка `Unauthenticated` (401)
2. **При загрузке видео**: Видео не отображалось после успешной загрузки

## Причины

### Проблема 1: Отсутствие токена аутентификации
Компоненты `AdminHeroVideoManager` и `ServiceVideoManager` использовали прямые вызовы `fetch()` и `XMLHttpRequest` без передачи токена авторизации. Это приводило к тому, что защищенные API endpoints отклоняли запросы как неавторизованные.

### Проблема 2: Неправильная обработка ответа axios
`apiClient` (axios instance) возвращает полный response объект с структурой `{ data: {...}, status: 200, ... }`, но код пытался обращаться к `response.success` напрямую, вместо `response.data.success`. Это приводило к тому, что после успешной загрузки видео не обновлялось состояние компонента.

## Решение

### Изменения в `AdminHeroVideoManager.tsx`

1. **Добавлен импорт** централизованного API клиента:
   ```typescript
   import apiClient from "@/lib/api";
   ```

2. **Метод `fetchCurrentVideo`** - переписан с использованием `apiClient`:
   ```typescript
   const axiosResponse = await apiClient.get('/api/home');
   const response: ApiResponse = axiosResponse.data;
   setCurrentVideo(response.data || null);
   ```
   - Заменен `fetch()` на `apiClient.get()`
   - Правильное извлечение данных из axios response
   - Автоматическая передача токена авторизации через interceptor

3. **Метод `handleVideoUpload`** - переписан с использованием `apiClient`:
   ```typescript
   const axiosResponse = await apiClient.post('/api/home/hero-video', formData, {...});
   const response: ApiResponse = axiosResponse.data;
   ```
   - Заменен `XMLHttpRequest` на `apiClient.post()`
   - Правильное извлечение данных из axios response
   - Сохранена функциональность отслеживания прогресса через `onUploadProgress`
   - Автоматическая передача токена авторизации

4. **Метод `handleVideoDelete`** - переписан с использованием `apiClient`:
   ```typescript
   const axiosResponse = await apiClient.delete('/api/home/hero-video');
   const response: ApiResponse = axiosResponse.data;
   ```
   - Заменен `fetch()` на `apiClient.delete()`
   - Правильное извлечение данных из axios response
   - Автоматическая передача токена авторизации

5. **Добавлено детальное логирование** для отладки:
   - Проверка наличия токена перед каждым запросом
   - Логирование всех ошибок с деталями
   - Префикс `[AdminHeroVideoManager]` для всех логов

### Изменения в `ServiceVideoManager.tsx`

Аналогичные изменения применены к компоненту `ServiceVideoManager`:

1. Добавлен импорт `apiClient`
2. Все методы (`fetchCurrentVideo`, `handleVideoUpload`, `handleVideoDelete`) переписаны с использованием `apiClient`
3. Правильное извлечение данных из axios response (`axiosResponse.data`)
4. Удалена константа `API_BASE_URL` (не нужна, так как `apiClient` уже настроен)

### Изменения в `api.ts`

Добавлено детальное логирование в interceptors:

1. **Request interceptor**:
   ```typescript
   console.log('[API Client] Request interceptor:', {
     url: config.url,
     method: config.method,
     hasToken: !!token,
     tokenPreview: token ? token.substring(0, 20) + '...' : 'NO TOKEN'
   });
   ```

2. **Response interceptor**:
   ```typescript
   console.log('[API Client] Response received:', {
     url: response.config.url,
     status: response.status,
     hasNewToken: !!response.headers['x-new-token']
   });
   ```

3. **Error interceptor**:
   ```typescript
   console.error('[API Client] Response error:', {
     url: error.config?.url,
     status: error.response?.status,
     statusText: error.response?.statusText,
     message: error.message,
     data: error.response?.data
   });
   ```

## Преимущества нового подхода

1. **Централизованная аутентификация**: Токен автоматически добавляется ко всем запросам через interceptor
2. **Автоматическое обновление токенов**: `apiClient` обрабатывает обновление токенов через заголовок `X-New-Token`
3. **Единообразная обработка ошибок**: Все ошибки 401 автоматически перенаправляют на страницу логина
4. **Правильная обработка ответов**: Корректное извлечение данных из axios response
5. **Упрощенный код**: Меньше дублирования логики аутентификации
6. **Лучшая поддержка**: Использование axios вместо нативных API для лучшей кросс-браузерной совместимости
7. **Детальное логирование**: Легко отследить проблемы через консоль браузера

## Тестирование

После внесения изменений необходимо протестировать:

1. ✅ Загрузка текущего видео при открытии страницы
2. ✅ Загрузка нового главного видео
3. ✅ Удаление главного видео
4. ✅ Загрузка видео для секции услуг
5. ✅ Удаление видео секции услуг
6. ✅ Отображение прогресса загрузки
7. ✅ Обработка ошибок валидации (размер файла, формат)
8. ✅ Автоматическое обновление токена при длительной работе

## Затронутые файлы

- `frontend_next/src/components/admin/AdminHeroVideoManager.tsx` - исправлена обработка ответов
- `frontend_next/src/components/admin/ServiceVideoManager.tsx` - исправлена обработка ответов
- `frontend_next/src/lib/api.ts` - добавлено детальное логирование
- `frontend_next/src/app/admin/test-auth/page.tsx` - создана тестовая страница (новый файл)

## Примечания

- Все изменения обратно совместимы
- Не требуется изменений на бэкенде
- Функциональность отслеживания прогресса загрузки сохранена
- Все сообщения об ошибках остались на русском языке
