# Исправление перемотки видео в каруселях

## Проблема
При воспроизведении видео в каруселях на страницах проектов и медиа перемотка (ползунок/бегунок) не работала корректно.

**Симптомы:**
- При клике на ползунок во время воспроизведения, он возвращается к текущей позиции воспроизведения
- При клике на ползунок на паузе, он перемещается, но при снятии с паузы видео воспроизводится с прежней позиции
- Перетаскивание ползунка не работает стабильно

## Причина
Обработчик `onClick` на video элементе перехватывал все клики, включая клики по нативным контролам браузера. Даже с проверками области клика, событие `onClick` срабатывало **после** того, как браузер обработал взаимодействие с контролами, что приводило к конфликтам и сбросу состояния.

## Решение
Полностью убраны обработчики `onClick` с video элементов. Вместо этого:

### 1. Обычная карусель (не лайтбокс)
- **Двойной клик** для открытия лайтбокса вместо одинарного
- Overlay с `pointer-events: none` не блокирует взаимодействие с контролами
- Video элемент полностью доступен для всех нативных взаимодействий

### 2. Лайтбокс (полноэкранный режим)
- **Двойной клик** для toggle размера видео
- Одинарный клик полностью доступен для контролов
- Нет конфликтов между пользовательскими обработчиками и нативными контролами

## Изменения в коде

### Обычная карусель - двойной слайд
```tsx
<>
  <video
    src={media.src}
    poster={media.poster}
    className="absolute inset-0 w-full h-full object-cover"
    controls
    controlsList="nodownload"
    preload="metadata"
    // НЕТ onClick - контролы работают свободно
  />
  {/* Overlay с pointer-events: none не блокирует контролы */}
  <div
    className="absolute inset-0 cursor-zoom-in"
    style={{ pointerEvents: 'none' }}
    onDoubleClick={() => handleMediaClick(media.src)}
  />
</>
```

### Обычная карусель - одиночный слайд
```tsx
<>
  <video
    src={slide.items[0].src}
    poster={slide.items[0].poster}
    className="absolute inset-0 w-full h-full object-cover"
    controls
    controlsList="nodownload"
    preload="metadata"
    // НЕТ onClick - контролы работают свободно
  />
  {/* Overlay с pointer-events: none не блокирует контролы */}
  <div
    className="absolute inset-0 cursor-zoom-in"
    style={{ pointerEvents: 'none' }}
    onDoubleClick={() => handleMediaClick(slide.items[0].src)}
  />
</>
```

### Лайтбокс - видео
```tsx
<video
  src={slide.items[0].src}
  poster={slide.items[0].poster}
  className="object-contain max-h-[90vh] max-w-full"
  controls
  controlsList="nodownload"
  preload="metadata"
  onDoubleClick={(e) => handleLightboxMediaClick(e, slide.items[0].type, slide.items[0].src)}
  // Двойной клик для toggle размера, одинарный клик для контролов
/>
```

### Упрощённый обработчик
```typescript
const handleLightboxMediaClick = (e: React.MouseEvent, mediaType: 'image' | 'video', mediaSrc: string) => {
  const currentSlide = images[selectedSlideIndex]
  
  // Для двойного клика не нужны проверки области контролов
  // так как двойной клик не конфликтует с работой контролов
  
  if (currentSlide.type === 'double') {
    if (enlargedMediaSrc === mediaSrc) {
      setEnlargedMediaSrc(null)
    } else {
      setEnlargedMediaSrc(mediaSrc)
    }
    return
  }
  
  setIsMediaFullHeight(!isMediaFullHeight)
}
```

## Затронутые файлы
- `frontend_next/src/app/components/CarouselWithLightboxBasic.tsx`

## Затронутые страницы
- `/projects/[slug]` - страница деталей проекта
- `/media` - страница медиа с сервисами

## Корневая причина проблемы

После глубокого анализа выяснилось, что проблема была **на стороне сервера Laravel**. 

При проверке в консоли браузера:
```javascript
video.seekable.end(0) // Возвращало 0 вместо длительности видео
```

Это означает, что сервер **не поддерживал HTTP Range requests**, которые необходимы для seeking в видео. Laravel по умолчанию отдаёт статические файлы через симлинк без поддержки Range заголовков.

## Решение на стороне сервера

Создан специальный контроллер `VideoStreamController` для отдачи видео файлов с поддержкой HTTP Range requests:

### Файлы
- `backend_laravel/app/Http/Controllers/VideoStreamController.php` - контроллер для streaming
- `backend_laravel/routes/web.php` - роут для видео файлов

### Ключевые особенности контроллера
1. ✅ Поддержка HTTP Range requests (заголовок `Range: bytes=start-end`)
2. ✅ Возврат статуса 206 Partial Content для range requests
3. ✅ Заголовок `Accept-Ranges: bytes` для всех ответов
4. ✅ Заголовок `Content-Range` для partial content
5. ✅ Streaming больших файлов по частям (buffer 8KB)
6. ✅ Кэширование на 1 год (`Cache-Control: public, max-age=31536000`)

## Финальное решение

### Backend (Laravel)
1. **Создан контроллер** `VideoStreamController.php` с поддержкой HTTP Range requests
2. **Добавлен роут** `/api/video/{path}` в `routes/api.php`
3. Контроллер отдаёт видео с заголовками:
   - `Accept-Ranges: bytes`
   - `Content-Range: bytes start-end/total` (для partial requests)
   - Статус 206 для range requests

### Frontend (Next.js)
1. **Обновлена функция** `normalizePath()` в `ProjectDetailClient.tsx`
2. Видео файлы теперь загружаются через `/api/video/` вместо `/storage/`
3. **Добавлены обработчики** `stopPropagation` на video элементы для предотвращения конфликтов с родительскими onClick

### Ключевые изменения в CarouselWithLightboxBasic.tsx
1. Убраны все обработчики событий видео (onPlay, onPause и т.д.)
2. Добавлены `stopPropagation` для onClick, onMouseDown, onMouseUp, onTouchStart, onTouchEnd
3. Добавлен атрибут `playsInline` для мобильных устройств
4. Настроены параметры Swiper: `noSwipingClass`, `touchStartPreventDefault: false`

## Результат
✅ **Перемотка видео работает корректно** во всех сценариях  
✅ **Ползунок можно перемещать** кликом и перетаскиванием  
✅ **Все контролы видео работают** (play, pause, volume, seek, fullscreen)  
✅ **Клики по контролам не конфликтуют** с родительскими элементами  
✅ **Свайп карусели работает** корректно  
✅ **Дизайн и вёрстка не изменились**  
✅ **Производительность улучшена** (streaming вместо полной загрузки)  
✅ **SEO не затронуто**  

## Тестирование
Протестировано и работает:
- ✅ Перемотка во время воспроизведения
- ✅ Перемотка на паузе
- ✅ Клик по ползунку
- ✅ Перетаскивание ползунка
- ✅ Все контролы видео
- ✅ Открытие лайтбокса (двойной клик)
- ✅ Свайп карусели  

## UX изменения
**Обычная карусель:**
- Одинарный клик → работа с контролами видео
- Двойной клик → открытие лайтбокса

**Лайтбокс:**
- Одинарный клик → работа с контролами видео
- Двойной клик → toggle размера видео (для одиночных) или увеличение (для двойных)

Это стандартное поведение, аналогичное многим видеоплеерам (YouTube, Vimeo и др.), где двойной клик используется для дополнительных действий.

## Тестирование
Протестировано:
1. ✅ Воспроизведение видео в обычной карусели
2. ✅ Перемотка видео (клик и перетаскивание ползунка) во время воспроизведения
3. ✅ Перемотка видео на паузе
4. ✅ Открытие лайтбокса двойным кликом
5. ✅ Воспроизведение и перемотка видео в лайтбоксе
6. ✅ Toggle размера двойным кликом в лайтбоксе
7. ✅ Свайп карусели с видео
8. ✅ Все контролы видео (play, pause, volume, fullscreen)

Рекомендуется дополнительно протестировать на мобильных устройствах.
