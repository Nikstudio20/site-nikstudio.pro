import axios from 'axios';
import { MediaPageData } from '@/types/media';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Fetch media page data from public API
 */
export const fetchMediaPageData = async (): Promise<MediaPageData> => {
  try {
    console.log('🌐 Запрос к API:', `${API_BASE_URL}/api/public/media-page`);
    
    const response = await axios.get(`${API_BASE_URL}/api/public/media-page`, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Ответ от API:', {
      status: response.status,
      success: (response.data as any).success,
      dataExists: !!(response.data as any).data,
      fullResponse: response.data
    });

    if ((response.data as any).success && (response.data as any).data) {
      console.log('✅ Данные успешно получены от API');
      console.log('👥 Отзывы в ответе API:', (response.data as any).data.testimonials);
      return (response.data as any).data;
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    console.error('❌ Ошибка при получении данных от API:', error);
    throw error;
  }
};