# Функциональность порядкового номера для блога

## Обзор
Добавлена возможность управления порядком отображения постов блога через поле `sort_order`.

## Изменения в базе данных
- Добавлено поле `sort_order` (integer, default: 0) в таблицу `blog_posts`
- Посты сортируются по `sort_order` ASC, затем по `created_at` DESC

## API изменения

### Новый endpoint
```
PATCH /api/blog-posts/{id}/sort-order
Content-Type: application/json

{
  "sort_order": 5
}
```

### Обновленные endpoints
Все существующие endpoints теперь включают поле `sort_order`:
- `GET /api/blog-posts` - возвращает посты отсортированные по порядку
- `POST /api/blog-posts` - принимает `sort_order` (опционально, default: 0)
- `POST /api/blog-posts/update` - принимает `sort_order` для обновления

## Frontend изменения

### Админ панель
1. **Таблица постов**: Добавлена колонка "Порядок" с inline редактированием
   - Клик по номеру порядка активирует режим редактирования
   - Enter - сохранить, Escape - отменить
   - Автоматическое обновление списка после изменения

2. **Форма создания**: Добавлено поле "Порядковый номер" (number input, min: 0)

3. **Форма редактирования**: Добавлено поле "Порядковый номер" для изменения порядка

### Интерфейс BlogPost
```typescript
export type BlogPost = {
  id: number
  title: string
  description: string
  image: string
  position: string
  sort_order: number  // Новое поле
  created_at: string
  updated_at: string
  slug: string
  status: boolean | number | string
  seo_title?: string
  seo_description?: string
  seo_image?: string
}
```

## Использование

### Создание поста с определенным порядком
1. Откройте админ панель блога
2. Нажмите "Создать статью"
3. Заполните все поля включая "Порядковый номер"
4. Сохраните

### Изменение порядка существующего поста
**Способ 1: Inline редактирование**
1. В таблице постов кликните на номер в колонке "Порядок"
2. Введите новое значение
3. Нажмите Enter или кнопку ✓

**Способ 2: Через форму редактирования**
1. Нажмите на иконку редактирования поста
2. Измените значение в поле "Порядковый номер"
3. Сохраните изменения

## Технические детали

### Сортировка
Посты сортируются по следующему алгоритму:
```sql
ORDER BY sort_order ASC, created_at DESC
```

### Валидация
- `sort_order` должен быть целым числом >= 0
- При создании поста без указания `sort_order` устанавливается значение 0

### Обработка ошибок
- Валидация на клиенте и сервере
- Уведомления об успехе/ошибке через toast
- Автоматический откат значения при ошибке inline редактирования

## Файлы изменений

### Backend
- `database/migrations/2025_07_23_222305_add_sort_order_to_blog_posts_table.php`
- `app/Models/BlogPost.php`
- `app/Http/Controllers/Api/BlogPostController.php`
- `routes/api.php`

### Frontend
- `frontend_next/src/app/admin/blog/page.tsx`
- `frontend_next/src/app/admin/blog/columns.tsx`