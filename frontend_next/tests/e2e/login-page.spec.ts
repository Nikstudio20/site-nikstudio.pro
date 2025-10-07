import { test, expect } from '@playwright/test';

test.describe('Task 22: Login Page Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Очищаем cookies перед каждым тестом
    await page.context().clearCookies();
    await page.goto('/admin/login');
  });

  test('Sub-task 1: Sidebar should be hidden on login page', async ({ page }) => {
    // Проверяем, что sidebar не отображается на странице логина
    const sidebar = page.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).not.toBeVisible();
    
    // Проверяем, что кнопка выхода не отображается
    const logoutButton = page.getByRole('button', { name: /выйти/i });
    await expect(logoutButton).not.toBeVisible();
    
    console.log('✓ Sidebar is hidden on login page');
  });

  test('Sub-task 2: Form should have correct autocomplete attributes', async ({ page }) => {
    // Проверяем, что форма имеет правильный метод
    const form = page.locator('form');
    await expect(form).toHaveAttribute('method', 'post');
    
    // Проверяем autocomplete для username
    const usernameInput = page.locator('input[name="username"]');
    await expect(usernameInput).toHaveAttribute('autocomplete', 'username');
    await expect(usernameInput).toHaveAttribute('type', 'text');
    
    // Проверяем autocomplete для password
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Проверяем, что нет autocomplete="off"
    const inputsWithAutocompleteOff = page.locator('input[autocomplete="off"]');
    await expect(inputsWithAutocompleteOff).toHaveCount(0);
    
    console.log('✓ Form has correct autocomplete attributes');
  });

  test('Sub-task 3: Remember me checkbox should be present and functional', async ({ page }) => {
    // Проверяем наличие чекбокса "Запомнить меня"
    const rememberCheckbox = page.locator('#remember');
    await expect(rememberCheckbox).toBeVisible();
    
    // Проверяем label
    const rememberLabel = page.locator('label[for="remember"]');
    await expect(rememberLabel).toContainText('Запомнить меня');
    
    // Проверяем, что чекбокс можно отметить
    await rememberCheckbox.click();
    await expect(rememberCheckbox).toBeChecked();
    
    // Проверяем, что чекбокс можно снять
    await rememberCheckbox.click();
    await expect(rememberCheckbox).not.toBeChecked();
    
    console.log('✓ Remember me checkbox is present and functional');
  });

  test('Sub-task 4: Form fields should be properly labeled and accessible', async ({ page }) => {
    // Проверяем наличие всех необходимых полей
    const usernameLabel = page.locator('label[for="username"]');
    await expect(usernameLabel).toContainText('Логин');
    
    const passwordLabel = page.locator('label[for="password"]');
    await expect(passwordLabel).toContainText('Пароль');
    
    // Проверяем наличие кнопки входа
    const submitButton = page.getByRole('button', { name: /войти в систему/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    
    console.log('✓ Form fields are properly labeled and accessible');
  });

  test('Sub-task 5: Login form should have proper structure', async ({ page }) => {
    // Проверяем заголовок страницы
    const heading = page.getByRole('heading', { name: /вход в админ-панель/i });
    await expect(heading).toBeVisible();
    
    // Проверяем наличие карточки с формой
    const card = page.locator('.space-y-4').first();
    await expect(card).toBeVisible();
    
    // Проверяем, что форма содержит все необходимые элементы
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    const usernameInput = form.locator('input[name="username"]');
    const passwordInput = form.locator('input[name="password"]');
    const rememberCheckbox = form.locator('#remember');
    const submitButton = form.getByRole('button', { type: 'submit' });
    
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(rememberCheckbox).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    console.log('✓ Login form has proper structure');
  });

  test('Sub-task 6: Form validation should work', async ({ page }) => {
    // Проверяем, что поля обязательны для заполнения
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    
    await expect(usernameInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('required', '');
    
    console.log('✓ Form validation attributes are present');
  });

  test('Sub-task 7: Loading state should work during submission', async ({ page }) => {
    // Заполняем форму
    await page.fill('input[name="username"]', 'test@example.com');
    await page.fill('input[name="password"]', 'testpassword');
    
    // Нажимаем кнопку входа
    const submitButton = page.getByRole('button', { name: /войти в систему/i });
    
    // Перехватываем запрос для проверки loading состояния
    await page.route('**/api/login', async route => {
      // Задержка для проверки loading состояния
      await page.waitForTimeout(100);
      await route.abort();
    });
    
    await submitButton.click();
    
    // Проверяем, что кнопка показывает loading состояние
    await expect(submitButton).toContainText('Вход...');
    await expect(submitButton).toBeDisabled();
    
    console.log('✓ Loading state works during submission');
  });
});

test.describe('Task 22: Integration with Backend', () => {
  test('Sub-task 8: Verify form submits correct data structure', async ({ page }) => {
    await page.goto('/admin/login');
    
    let requestData: any = null;
    
    // Перехватываем запрос к API
    await page.route('**/api/login', async route => {
      const request = route.request();
      requestData = request.postDataJSON();
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Test response'
        })
      });
    });
    
    // Заполняем форму
    await page.fill('input[name="username"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Отмечаем "Запомнить меня"
    await page.click('#remember');
    
    // Отправляем форму
    await page.click('button[type="submit"]');
    
    // Ждем отправки запроса
    await page.waitForTimeout(500);
    
    // Проверяем структуру данных
    expect(requestData).toBeTruthy();
    expect(requestData.email).toBe('admin@example.com');
    expect(requestData.password).toBe('password123');
    expect(requestData.remember).toBe(true);
    
    console.log('✓ Form submits correct data structure with remember flag');
  });
});

test.describe('Task 22: Visual and UX Checks', () => {
  test('Sub-task 9: Page should be responsive and centered', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Проверяем, что контейнер центрирован
    const container = page.locator('.min-h-screen');
    await expect(container).toHaveClass(/flex items-center justify-center/);
    
    // Проверяем максимальную ширину формы
    const formContainer = page.locator('.max-w-md');
    await expect(formContainer).toBeVisible();
    
    console.log('✓ Page is responsive and centered');
  });

  test('Sub-task 10: All text should be in Russian', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Проверяем русский текст в заголовках
    await expect(page.getByText('Вход в админ-панель')).toBeVisible();
    await expect(page.getByText('Авторизация')).toBeVisible();
    await expect(page.getByText('Логин')).toBeVisible();
    await expect(page.getByText('Пароль')).toBeVisible();
    await expect(page.getByText('Запомнить меня')).toBeVisible();
    await expect(page.getByText('Войти в систему')).toBeVisible();
    
    console.log('✓ All text is in Russian');
  });
});
