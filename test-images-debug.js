// Тест для отладки изображений на медиа странице
const testImagesDebug = async () => {
  const API_URL = 'http://localhost:8000';
  
  console.log('🖼️ ОТЛАДКА ИЗОБРАЖЕНИЙ НА МЕДИА СТРАНИЦЕ');
  console.log('='.repeat(60));
  
  try {
    // 1. Получаем данные медиа страницы
    console.log('\n1️⃣ Получение данных медиа страницы...');
    const response = await fetch(`${API_URL}/api/public/media-page`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('API вернул ошибку');
    }
    
    console.log('✅ Данные получены успешно');
    
    // 2. Анализируем изображения в услугах
    console.log('\n2️⃣ Анализ изображений в услугах:');
    if (data.data.services && data.data.services.length > 0) {
      data.data.services.forEach((service, index) => {
        console.log(`\n   Услуга ${index + 1}: "${service.title}"`);
        if (service.media && service.media.length > 0) {
          service.media.forEach((mediaGroup, mediaIndex) => {
            console.log(`     Медиа группа ${mediaIndex + 1}:`);
            if (mediaGroup.main) {
              console.log(`       Основное изображение: ${mediaGroup.main.src}`);
              console.log(`       Полный URL: ${API_URL}/storage/${mediaGroup.main.src}`);
            }
            if (mediaGroup.secondary) {
              Object.entries(mediaGroup.secondary).forEach(([key, img]) => {
                console.log(`       Дополнительное (${key}): ${img.src}`);
                console.log(`       Полный URL: ${API_URL}/storage/${img.src}`);
              });
            }
          });
        } else {
          console.log('     ⚠️ Нет медиа файлов');
        }
      });
    } else {
      console.log('   ⚠️ Нет услуг');
    }
    
    // 3. Анализируем изображения в отзывах
    console.log('\n3️⃣ Анализ изображений в отзывах:');
    if (data.data.testimonials && data.data.testimonials.items && data.data.testimonials.items.length > 0) {
      data.data.testimonials.items.forEach((testimonial, index) => {
        console.log(`\n   Отзыв ${index + 1}: "${testimonial.company}"`);
        if (testimonial.image) {
          console.log(`     Изображение: ${testimonial.image}`);
          console.log(`     Полный URL: ${API_URL}/storage/${testimonial.image}`);
        } else {
          console.log('     ⚠️ Нет изображения');
        }
      });
    } else {
      console.log('   ⚠️ Нет отзывов');
    }
    
    // 4. Анализируем изображения в процессе
    console.log('\n4️⃣ Анализ изображений в процессе:');
    if (data.data.process && data.data.process.steps && data.data.process.steps.length > 0) {
      data.data.process.steps.forEach((step, index) => {
        console.log(`\n   Шаг ${index + 1}: "${step.title}"`);
        if (step.image) {
          console.log(`     Изображение: ${step.image}`);
          console.log(`     Полный URL: ${API_URL}/storage/${step.image}`);
        } else {
          console.log('     ⚠️ Нет изображения');
        }
      });
    } else {
      console.log('   ⚠️ Нет шагов процесса');
    }
    
    // 5. Тестируем доступность изображений
    console.log('\n5️⃣ Тестирование доступности изображений:');
    
    // Тестируем первое изображение из услуг
    if (data.data.services?.[0]?.media?.[0]?.main?.src) {
      const testImageUrl = `${API_URL}/storage/${data.data.services[0].media[0].main.src}`;
      console.log(`\n   Тестируем: ${testImageUrl}`);
      
      try {
        const imageResponse = await fetch(testImageUrl, { method: 'HEAD' });
        console.log(`   Статус: ${imageResponse.status} ${imageResponse.statusText}`);
        if (imageResponse.ok) {
          console.log('   ✅ Изображение доступно');
        } else {
          console.log('   ❌ Изображение недоступно');
        }
      } catch (error) {
        console.log(`   ❌ Ошибка при проверке: ${error.message}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📋 РЕЗЮМЕ:');
    console.log('• Добавлена отладочная информация в компоненты');
    console.log('• Создан LaravelImage компонент для обхода Next.js Image API');
    console.log('• Обновлена страница медиа для использования LaravelImage');
    console.log('• Настроена правильная обработка Laravel изображений');
    
    console.log('\n🚀 СЛЕДУЮЩИЕ ШАГИ:');
    console.log('1. Перезапустить Next.js сервер: npm run dev');
    console.log('2. Открыть http://localhost:3000/media');
    console.log('3. Проверить консоль браузера на отладочную информацию');
    console.log('4. Убедиться, что изображения загружаются');
    
  } catch (error) {
    console.error('\n❌ ОШИБКА:', error.message);
  }
};

// Запуск теста
testImagesDebug();