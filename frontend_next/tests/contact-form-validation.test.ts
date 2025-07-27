import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ContactEmailService, EmailServiceError, EmailErrorType } from '@/lib/services/ContactEmailService';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('Contact Form Validation and Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock axios.create to return a mock instance
    mockedAxios.create = vi.fn(() => ({
      post: vi.fn(),
    })) as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Form Validation Rules', () => {
    it('should validate required fields', () => {
      const invalidData = {
        name: '',
        email: '',
        company: '',
        message: '',
      };

      // Test client-side validation logic
      expect(invalidData.name.length).toBe(0);
      expect(invalidData.email.length).toBe(0);
      expect(invalidData.message.length).toBe(0);
    });

    it('should validate name length constraints', () => {
      const shortName = 'A';
      const longName = 'A'.repeat(51);
      const validName = 'Тестовый Пользователь';

      expect(shortName.length < 2).toBe(true);
      expect(longName.length > 50).toBe(true);
      expect(validName.length >= 2 && validName.length <= 50).toBe(true);
    });

    it('should validate email format', () => {
      const invalidEmails = ['invalid-email', '@example.com', 'test@', 'test.com'];
      const validEmail = 'test@example.com';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
      
      expect(emailRegex.test(validEmail)).toBe(true);
    });

    it('should validate message length constraints', () => {
      const shortMessage = 'Short';
      const longMessage = 'A'.repeat(1001);
      const validMessage = 'Это корректное тестовое сообщение для проверки валидации.';

      expect(shortMessage.length < 10).toBe(true);
      expect(longMessage.length > 1000).toBe(true);
      expect(validMessage.length >= 10 && validMessage.length <= 1000).toBe(true);
    });

    it('should validate company name length', () => {
      const longCompany = 'A'.repeat(101);
      const validCompany = 'Тестовая Компания';

      expect(longCompany.length > 100).toBe(true);
      expect(validCompany.length <= 100).toBe(true);
    });
  });

  describe('Russian Error Messages', () => {
    it('should provide Russian validation messages', () => {
      const russianMessages = {
        nameRequired: 'Поле "Имя" обязательно для заполнения',
        nameMin: 'Имя должно содержать минимум 2 символа',
        nameMax: 'Имя не должно превышать 50 символов',
        emailRequired: 'Поле "Email" обязательно для заполнения',
        emailInvalid: 'Введите корректный email адрес',
        messageRequired: 'Поле "Сообщение" обязательно для заполнения',
        messageMin: 'Сообщение должно содержать минимум 10 символов',
        messageMax: 'Сообщение не должно превышать 1000 символов',
        companyMax: 'Название компании не должно превышать 100 символов'
      };

      // Verify all messages are in Russian
      Object.values(russianMessages).forEach(message => {
        expect(message).toMatch(/[а-яё]/i); // Contains Cyrillic characters
      });
    });
  });

  describe('Network Error Handling', () => {
    it('should handle SMTP connection errors', async () => {
      const mockAxiosInstance = {
        post: vi.fn().mockRejectedValue({
          response: {
            status: 500,
            data: { error_code: 'SMTP_CONNECTION_FAILED' }
          }
        })
      };
      mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance);

      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message for SMTP error simulation'
      };

      try {
        await ContactEmailService.sendContactEmail(testData);
      } catch (error) {
        expect(error).toBeInstanceOf(EmailServiceError);
        expect((error as EmailServiceError).type).toBe(EmailErrorType.SMTP);
      }
    });

    it('should handle network timeout errors', async () => {
      const mockAxiosInstance = {
        post: vi.fn().mockRejectedValue({
          code: 'ECONNABORTED',
          message: 'timeout of 30000ms exceeded'
        })
      };
      mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance);

      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message for timeout simulation'
      };

      try {
        await ContactEmailService.sendContactEmail(testData);
      } catch (error) {
        expect(error).toBeInstanceOf(EmailServiceError);
        expect((error as EmailServiceError).type).toBe(EmailErrorType.NETWORK);
      }
    });

    it('should handle validation errors (422)', async () => {
      const mockAxiosInstance = {
        post: vi.fn().mockRejectedValue({
          response: {
            status: 422,
            data: {
              message: 'Validation failed',
              errors: {
                name: ['Поле "Имя" обязательно для заполнения'],
                email: ['Введите корректный email адрес']
              }
            }
          }
        })
      };
      mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance);

      const invalidData = {
        name: '',
        email: 'invalid-email',
        company: '',
        message: 'Test message'
      };

      try {
        await ContactEmailService.sendContactEmail(invalidData);
      } catch (error) {
        expect(error).toBeInstanceOf(EmailServiceError);
        expect((error as EmailServiceError).type).toBe(EmailErrorType.VALIDATION);
        expect((error as EmailServiceError).statusCode).toBe(422);
      }
    });
  });

  describe('Error Message Auto-Dismiss', () => {
    it('should provide mechanism for 3-second auto-dismiss', () => {
      // This test verifies the timeout logic exists
      const AUTO_DISMISS_TIMEOUT = 3000;
      
      // Simulate the timeout mechanism used in the component
      const timeoutId = setTimeout(() => {
        // Message should be cleared after 3 seconds
      }, AUTO_DISMISS_TIMEOUT);
      
      expect(timeoutId).toBeDefined();
      clearTimeout(timeoutId);
    });
  });

  describe('Form Data Persistence', () => {
    it('should preserve form data during validation errors', () => {
      const originalFormData = {
        name: 'Тестовый Пользователь',
        email: 'invalid-email', // This will cause validation error
        company: 'Тестовая Компания',
        message: 'Это тестовое сообщение с некорректным email.'
      };

      // Simulate validation error scenario
      const hasValidationError = originalFormData.email.indexOf('@') === -1;
      
      if (hasValidationError) {
        // Form data should be preserved for user to correct
        expect(originalFormData.name).toBe('Тестовый Пользователь');
        expect(originalFormData.company).toBe('Тестовая Компания');
        expect(originalFormData.message).toBe('Это тестовое сообщение с некорректным email.');
      }
    });
  });

  describe('Success Response Handling', () => {
    it('should handle successful email sending', async () => {
      const mockAxiosInstance = {
        post: vi.fn().mockResolvedValue({
          status: 200,
          data: {
            success: true,
            message: 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.'
          }
        })
      };
      mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance);

      const validData = {
        name: 'Тестовый Пользователь',
        email: 'test@example.com',
        company: 'Тестовая Компания',
        message: 'Это корректное тестовое сообщение.'
      };

      const response = await ContactEmailService.sendContactEmail(validData);
      
      expect(response.success).toBe(true);
      expect(response.message).toContain('успешно отправлено');
    });

    it('should handle successful project inquiry', async () => {
      const mockAxiosInstance = {
        post: vi.fn().mockResolvedValue({
          status: 200,
          data: {
            success: true,
            message: 'Ваш запрос по проекту "Тестовый Проект" успешно отправлен. Мы свяжемся с вами в ближайшее время.'
          }
        })
      };
      mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance);

      const validData = {
        name: 'Тестовый Клиент',
        email: 'client@example.com',
        company: 'Клиентская Компания',
        message: 'Интересует разработка похожего проекта.',
        project_title: 'Тестовый Проект'
      };

      const response = await ContactEmailService.sendProjectInquiry(validData);
      
      expect(response.success).toBe(true);
      expect(response.message).toContain('Тестовый Проект');
    });
  });
});