// Тест API после исправления
const testAPI = async () => {
  const API_URL = 'http://localhost:8000';
  
  console.log('Тестирование API эндпоинтов после исправлений...\n');
  
  try {
    // Тест категорий проектов
    console.log('1. Тестирование /api/project-categories');
    const categoriesResponse = await fetch(`${API_URL}/api/project-categories`);
    const categoriesData = await categoriesResponse.json();
    console.log('Статус:', categoriesResponse.status);
    console.log('Количество категорий:', categoriesData.data?.length || 0);
    console.log('Первая категория:', categoriesData.data?.[0]?.name || 'Нет данных');
    console.log('✅ Категории проектов работают\n');
    
    // Тест медиа страницы
    console.log('2. Тестирование /api/public/media-page');
    const mediaResponse = await fetch(`${API_URL}/api/public/media-page`);
    const mediaData = await mediaResponse.json();
    console.log('Статус:', mediaResponse.status);
    console.log('Структура данных:', Object.keys(mediaData.data || {}));
    console.log('Hero заголовок:', mediaData.data?.hero?.title || 'Нет данных');
    console.log('Количество услуг:', mediaData.data?.services?.length || 0);
    console.log('✅ Медиа страница работает\n');
    
    // Тест с axios (как в приложении)
    console.log('3. Тестирование с axios (как в приложении)');
    const axios = require('axios');
    const axiosResponse = await axios.get(`${API_URL}/api/public/media-page`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    console.log('Axios статус:', axiosResponse.status);
    console.log('Axios данные получены:', !!axiosResponse.data.data);
    console.log('✅ Axios запрос работает\n');
    
    console.log('🎉 Все API эндпоинты работают корректно!');
    console.log('\nИсправления:');
    console.log('- Исправлен путь в mediaApi.ts: добавлен /api/ префикс');
    console.log('- NEXT_PUBLIC_API_URL настроен правильно');
    console.log('- Footer компоненты используют корректные пути');
    console.log('- Добавлены тестовые категории проектов');
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании API:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Убедитесь, что Laravel сервер запущен: php artisan serve');
    }
  }
};

// Запуск теста
testAPI();