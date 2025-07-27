# Руководство по обработке ошибок и валидации

Этот документ описывает систему обработки ошибок и валидации в проекте динамической медиа-страницы.

## Компоненты системы

### 1. Валидация форм (`/src/utils/validation.ts`)

Содержит утилиты для валидации различных типов данных:

- `validateFileSize()` - проверка размера файлов
- `validateFileType()` - проверка типа файлов  
- `validateFile()` - комплексная валидация файлов
- `validateTextField()` - валидация текстовых полей
- Специализированные валидаторы для форм (герой, сервисы, отзывы, процессы)

### 2. Обработка ошибок API (`/src/utils/apiErrorHandler.ts`)

Универсальная система для работы с API:

- `handleFetchError()` - обработка ошибок fetch запросов
- `apiRequest()` - универсальная функция для API запросов
- `apiFormDataRequest()` - для загрузки файлов
- `useErrorHandler()` - React хук для обработки ошибок

### 3. Границы ошибок (`/src/components/ErrorBoundary.tsx`)

React компонент для перехвата и обработки ошибок рендеринга:

- Автоматический перехват ошибок в дереве компонентов
- Пользовательский интерфейс для отображения ошибок
- Возможность повторной попытки
- Детали ошибок в режиме разработки

### 4. Обработка медиа-файлов (`/src/components/MediaFallback.tsx`)

Компоненты для обработки поврежденных или недоступных медиа:

- `MediaFallback` - fallback для изображений и видео
- `AdminMediaError` - отображение ошибок в админ-панели
- Автоматическое определение типа медиа
- Состояния загрузки

### 5. Компоненты форм (`/src/components/ui/form-field.tsx`)

Переиспользуемые компоненты форм с встроенной валидацией:

- `FormInputField` - текстовые поля
- `FormTextareaField` - многострочные поля
- `FormFileField` - загрузка файлов
- Автоматическое отображение ошибок
- Поддержка accessibility

### 6. Хуки для форм (`/src/hooks/useFormValidation.ts`)

React хуки для управления состоянием форм:

- `useFormValidation` - комплексное управление формами
- `useFileUpload` - специализированный хук для загрузки файлов
- Автоматическая валидация
- Обработка ошибок API

### 7. Система уведомлений (`/src/components/ui/notification.tsx`)

Компоненты для отображения уведомлений:

- `Notification` - отдельное уведомление
- `NotificationContainer` - контейнер для уведомлений
- `useNotifications` - хук для управления уведомлениями
- Автоматическое скрытие через 3 секунды

## Типы ошибок и их обработка

### 1. Ошибки валидации (HTTP 422)

```typescript
// Автоматически обрабатываются в useFormValidation
const { handleSubmit, errors } = useFormValidation({
  validate: validateServiceForm,
  onSubmit: async (values) => {
    await apiRequest('/api/services', {
      method: 'POST',
      body: JSON.stringify(values)
    });
  }
});
```

### 2. Ошибки размера файла (HTTP 413)

```typescript
// Обрабатываются в validateFile и apiFormDataRequest
const validation = validateFile(file, 'image');
if (!validation.isValid) {
  setError(validation.error);
}
```

### 3. Сетевые ошибки

```typescript
// Автоматически обрабатываются в apiRequest
try {
  await apiRequest('/api/data');
} catch (error) {
  // error содержит понятное сообщение на русском языке
  showError(handleError(error));
}
```

### 4. Ошибки рендеринга

```jsx
// Автоматически перехватываются ErrorBoundary
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

## Рекомендации по использованию

### 1. Валидация форм

```typescript
// Используйте специализированные валидаторы
const validation = validateServiceForm(title, description);
if (!validation.isValid) {
  setErrors(validation.errors);
}

// Или используйте хук useFormValidation
const form = useFormValidation({
  initialValues: { title: '', description: '' },
  validate: validateServiceForm,
  onSubmit: handleSubmit
});
```

### 2. Загрузка файлов

```typescript
// Используйте хук useFileUpload
const fileUpload = useFileUpload({
  onUpload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await apiFormDataRequest('/api/upload', formData);
  },
  validateFile: (file) => validateFile(file, 'image')
});
```

### 3. API запросы

```typescript
// Используйте apiRequest для обычных запросов
const data = await apiRequest('/api/data', {
  method: 'POST',
  body: JSON.stringify(payload)
});

// Используйте apiFormDataRequest для загрузки файлов
const result = await apiFormDataRequest('/api/upload', formData);
```

### 4. Уведомления

```typescript
// Используйте хук useNotifications
const { showSuccess, showError } = useNotifications();

try {
  await saveData();
  showSuccess('Данные успешно сохранены');
} catch (error) {
  showError(handleError(error));
}
```

## Сообщения об ошибках

Все сообщения об ошибках отображаются на русском языке:

- **Валидация**: "Поле обязательно для заполнения"
- **Размер файла**: "Размер файла превышает максимально допустимый (2 МБ)"
- **Тип файла**: "Неподдерживаемый тип файла. Разрешены: JPG, PNG, WebP"
- **Сеть**: "Ошибка сети. Проверьте подключение к интернету"
- **Сервер**: "Внутренняя ошибка сервера. Попробуйте позже"

## Ограничения файлов

### Изображения
- **Максимальный размер**: 2 МБ
- **Разрешенные форматы**: JPG, PNG, WebP
- **Валидация**: клиентская и серверная

### Видео
- **Максимальный размер**: 50 МБ  
- **Разрешенные форматы**: MP4, WebM
- **Требования**: обязательный постер для видео
- **Валидация**: клиентская и серверная

## Accessibility

Все компоненты форм поддерживают accessibility:

- Правильные ARIA атрибуты
- Связь между полями и ошибками через `aria-describedby`
- Семантическая разметка
- Поддержка клавиатурной навигации

## Тестирование

Для тестирования системы обработки ошибок:

1. Попробуйте загрузить файл большого размера
2. Попробуйте загрузить файл неподдерживаемого формата
3. Отправьте форму с пустыми обязательными полями
4. Отключите интернет и попробуйте отправить форму
5. Проверьте отображение ошибок в различных компонентах