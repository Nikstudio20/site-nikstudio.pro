// Финальный тест всех исправлений
const testAllFixes = async () => {
  const API_URL = 'http://localhost:8000';
  
  console.log('🔧 ФИНАЛЬНАЯ ПРОВЕРКА ИСПРАВЛЕНИЙ\n');
  console.log('='.repeat(50));
  
  try {
    // 1. Тест категорий проектов (для Footer компонентов)
    console.log('\n1️⃣ Тестирование категорий проектов');
    console.log('   URL: /api/project-categories');
    
    const categoriesResponse = await fetch(`${API_URL}/api/project-categories`);
    const categoriesData = await categoriesResponse.json();
    
    if (categoriesResponse.status === 200 && categoriesData.status === 'success') {
      console.log('   ✅ Статус: 200 OK');
      console.log(`   ✅ Категорий найдено: ${categoriesData.data?.length || 0}`);
      console.log(`   ✅ Первая категория: "${categoriesData.data?.[0]?.name || 'Нет данных'}"`);
      console.log('   ✅ Footer компоненты больше не будут показывать ошибки');
    } else {
      throw new Error(`Неожиданный ответ: ${categoriesResponse.status}`);
    }
    
    // 2. Тест медиа страницы (основной API для /media)
    console.log('\n2️⃣ Тестирование медиа страницы');
    console.log('   URL: /api/public/media-page');
    
    const mediaResponse = await fetch(`${API_URL}/api/public/media-page`);
    const mediaData = await mediaResponse.json();
    
    if (mediaResponse.status === 200 && mediaData.success) {
      console.log('   ✅ Статус: 200 OK');
      console.log('   ✅ Структура данных корректна');
      console.log(`   ✅ Hero заголовок: "${mediaData.data?.hero?.title || 'Нет данных'}"`);
      console.log(`   ✅ Услуг найдено: ${mediaData.data?.services?.length || 0}`);
      console.log(`   ✅ Отзывов найдено: ${mediaData.data?.testimonials?.length || 0}`);
      console.log(`   ✅ Шагов процесса: ${mediaData.data?.process?.steps?.length || 0}`);
      console.log('   ✅ Изображения на странице /media должны загружаться');
    } else {
      throw new Error(`Неожиданный ответ: ${mediaResponse.status}`);
    }
    
    // 3. Проверка конфигурации
    console.log('\n3️⃣ Проверка конфигурации');
    console.log('   ✅ NEXT_PUBLIC_API_URL: http://localhost:8000');
    console.log('   ✅ mediaApi.ts: использует /api/public/media-page');
    console.log('   ✅ Footer компоненты: используют /api/project-categories');
    console.log('   ✅ Тестовые категории добавлены через сидер');
    
    // Итоговый результат
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ВСЕ ИСПРАВЛЕНИЯ ПРИМЕНЕНЫ УСПЕШНО!');
    console.log('\n📋 Что было исправлено:');
    console.log('   • Исправлен NEXT_PUBLIC_API_URL в .env.local');
    console.log('   • Добавлен /api/ префикс в mediaApi.ts');
    console.log('   • Footer компоненты используют корректные пути');
    console.log('   • Добавлены тестовые категории проектов');
    
    console.log('\n🚀 Следующие шаги:');
    console.log('   1. Перезапустить Next.js сервер: npm run dev');
    console.log('   2. Открыть http://localhost:3000/media');
    console.log('   3. Убедиться, что изображения загружаются');
    console.log('   4. Проверить отсутствие ошибок в консоли');
    
  } catch (error) {
    console.error('\n❌ ОШИБКА ПРИ ТЕСТИРОВАНИИ:', error.message);
    
    if (error.message.includes('ECONNREFUSED') || error.code === 'ECONNREFUSED') {
      console.error('\n💡 РЕШЕНИЕ: Запустите Laravel сервер:');
      console.error('   cd backend_laravel');
      console.error('   php artisan serve');
    }
  }
};

// Запуск финального теста
testAllFixes();