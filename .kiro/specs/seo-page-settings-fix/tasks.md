# Implementation Plan

- [x] 1. Обновить функцию generateTitle в SEOMetadataGenerator





  - Удалить вызовы truncateText из функции generateTitle
  - Обеспечить использование pageSettings.seo_title для всех типов страниц
  - Сохранить fallback логику на globalSettings и дефолтные значения
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [x] 2. Обновить функцию generateDescription в SEOMetadataGenerator





  - Удалить вызовы truncateText из функции generateDescription
  - Обеспечить использование pageSettings.seo_description для всех типов страниц
  - Сохранить fallback логику на globalSettings и дефолтные значения
  - _Requirements: 1.2, 4.2, 5.2_

- [x] 3. Обновить функцию generateKeywords в SEOMetadataGenerator





  - Добавить параметр pageSettings в функцию generateKeywords
  - Реализовать использование pageSettings.seo_keywords если они доступны
  - Сохранить fallback логику на дефолтные keywords
  - Обеспечить корректную обработку массива keywords
  - _Requirements: 1.3, 2.1, 3.1, 4.3, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 4. Удалить функцию truncateText из SEOMetadataGenerator





  - Полностью удалить приватную функцию truncateText
  - Убедиться, что все вызовы этой функции удалены
  - _Requirements: 5.1, 5.2, 5.4, 5.5_

- [x] 5. Обновить функцию buildNextjsMetadata





  - Добавить параметры pageSettings и pageType в функцию
  - Обновить вызов generateKeywords с новыми параметрами
  - Убедиться, что title и description передаются без обрезания
  - _Requirements: 1.3, 2.1, 3.1, 4.3, 6.5_

- [x] 6. Обновить функцию generateMetadata





  - Передать pageSettings и pageType в buildNextjsMetadata
  - Обеспечить корректную работу с кешированием
  - _Requirements: 1.5, 2.2, 3.2, 4.5_

- [x] 7. Исправить generateMetadata в frontend_next/src/app/media/page.tsx





  - Изменить pageType с 'home' на 'media'
  - Убедиться, что pageSettings корректно передаются
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 8. Проверить корректность работы всех страниц






  - Проверить главную страницу (home) - title, description, keywords из БД
  - Проверить страницу проектов (projects_list) - keywords из БД
  - Проверить страницу блога (blog_list) - keywords из БД
  - Проверить страницу медиа (media) - title, description, keywords из БД
  - Убедиться в отсутствии "…" в конце текстов
  - Проверить работу fallback при отсутствии настроек
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 3.1, 3.2, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 9. Проверить сохранение функционала, дизайна и вёрстки





  - Убедиться, что все страницы отображаются корректно
  - Проверить отсутствие ошибок в консоли браузера
  - Проверить корректность meta-тегов в HTML
  - Убедиться, что производительность не ухудшилась
  - Проверить работу кеширования SEO-данных
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
