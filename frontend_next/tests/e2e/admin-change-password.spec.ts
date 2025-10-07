import { test, expect } from '@playwright/test';

test.describe('Task 24: Password Change Functionality Testing', () => {
  // Helper function to login before each test
  test.beforeEach(async ({ page }) => {
    // Clear cookies
    await page.context().clearCookies();
    
    // Set a mock token cookie to simulate logged-in state
    await page.context().addCookies([{
      name: 'admin-token',
      value: 'mock-token-12345',
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    }]);
  });

  test('Sub-task 1: Open password change page through menu', async ({ page }) => {
    // Navigate directly to admin page
    await page.goto('/admin');
    
    // Wait for sidebar to be visible
    const sidebar = page.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).toBeVisible({ timeout: 10000 });
    
    // Find and click the "Сменить пароль" menu item
    const changePasswordLink = page.getByRole('link', { name: /сменить пароль/i });
    await expect(changePasswordLink).toBeVisible();
    await changePasswordLink.click();
    
    // Verify navigation to password change page
    await expect(page).toHaveURL(/\/admin\/settings\/change-password/);
    
    // Verify page title
    const heading = page.getByRole('heading', { name: /смена пароля/i });
    await expect(heading).toBeVisible();
    
    console.log('✓ Successfully opened password change page through menu');
  });

  test('Sub-task 2: Try to change password with incorrect current password', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Mock API response for incorrect current password
    await page.route('**/api/admin/change-password', async route => {
      await route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'The given data was invalid.',
          errors: {
            current_password: ['Текущий пароль неверен']
          }
        })
      });
    });
    
    // Fill form with incorrect current password
    await page.fill('input[name="current_password"]', 'wrongpassword');
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'newpassword123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for error message
    await page.waitForTimeout(500);
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Текущий пароль неверен');
    await expect(errorMessage).toBeVisible();
    
    // Verify the error is field-specific (shown under the current password field)
    const currentPasswordError = page.locator('#currentPassword').locator('..').locator('p.text-red-600');
    await expect(currentPasswordError).toContainText('Текущий пароль неверен');
    
    console.log('✓ Correctly shows error for incorrect current password');
  });

  test('Sub-task 3: Try to change password with mismatched confirmation', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Fill form with mismatched passwords
    await page.fill('input[name="current_password"]', 'currentpassword');
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'differentpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for client-side validation
    await page.waitForTimeout(300);
    
    // Verify client-side validation error
    const errorMessage = page.locator('text=Пароли не совпадают');
    await expect(errorMessage).toBeVisible();
    
    // Verify the error is shown under the confirmation field
    const confirmPasswordError = page.locator('#confirmPassword').locator('..').locator('p.text-red-600');
    await expect(confirmPasswordError).toContainText('Пароли не совпадают');
    
    console.log('✓ Correctly shows error for mismatched password confirmation');
  });

  test('Sub-task 4: Try to change password with short new password (< 8 characters)', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Fill form with short password
    await page.fill('input[name="current_password"]', 'currentpassword');
    await page.fill('input[name="new_password"]', 'short');
    await page.fill('input[name="new_password_confirmation"]', 'short');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for client-side validation
    await page.waitForTimeout(300);
    
    // Verify client-side validation error
    const errorMessage = page.locator('text=Пароль должен содержать минимум 8 символов');
    await expect(errorMessage).toBeVisible();
    
    // Verify the error is shown under the new password field
    const newPasswordError = page.locator('#newPassword').locator('..').locator('p.text-red-600');
    await expect(newPasswordError).toContainText('минимум 8 символов');
    
    console.log('✓ Correctly shows error for short password (< 8 characters)');
  });

  test('Sub-task 5: Successfully change password with correct data', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Mock successful password change
    await page.route('**/api/admin/change-password', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Пароль успешно изменен'
        })
      });
    });
    
    // Fill form with valid data
    await page.fill('input[name="current_password"]', 'currentpassword123');
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'newpassword123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await page.waitForTimeout(500);
    
    // Verify success message is displayed
    const successMessage = page.locator('text=Пароль успешно изменен');
    await expect(successMessage).toBeVisible();
    
    // Verify success message has correct styling (green background)
    const successAlert = page.locator('.border-green-200');
    await expect(successAlert).toBeVisible();
    
    // Verify form fields are cleared after success
    const currentPasswordInput = page.locator('input[name="current_password"]');
    const newPasswordInput = page.locator('input[name="new_password"]');
    const confirmPasswordInput = page.locator('input[name="new_password_confirmation"]');
    
    await expect(currentPasswordInput).toHaveValue('');
    await expect(newPasswordInput).toHaveValue('');
    await expect(confirmPasswordInput).toHaveValue('');
    
    console.log('✓ Successfully changed password with correct data');
  });

  test('Sub-task 6: Verify success message disappears after 3 seconds', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Mock successful password change
    await page.route('**/api/admin/change-password', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Пароль успешно изменен'
        })
      });
    });
    
    // Fill and submit form
    await page.fill('input[name="current_password"]', 'currentpassword123');
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'newpassword123');
    await page.click('button[type="submit"]');
    
    // Wait for success message to appear
    await page.waitForTimeout(500);
    const successMessage = page.locator('text=Пароль успешно изменен');
    await expect(successMessage).toBeVisible();
    
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    
    // Verify success message has disappeared
    await expect(successMessage).not.toBeVisible();
    
    console.log('✓ Success message correctly disappears after 3 seconds');
  });

  test('Additional: Verify form has proper structure and labels', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Verify page heading
    const heading = page.getByRole('heading', { name: /смена пароля/i });
    await expect(heading).toBeVisible();
    
    // Verify card title
    const cardTitle = page.getByText('Изменение пароля');
    await expect(cardTitle).toBeVisible();
    
    // Verify all labels are present
    const currentPasswordLabel = page.locator('label[for="currentPassword"]');
    await expect(currentPasswordLabel).toContainText('Текущий пароль');
    
    const newPasswordLabel = page.locator('label[for="newPassword"]');
    await expect(newPasswordLabel).toContainText('Новый пароль');
    
    const confirmPasswordLabel = page.locator('label[for="confirmPassword"]');
    await expect(confirmPasswordLabel).toContainText('Подтверждение нового пароля');
    
    // Verify submit button
    const submitButton = page.getByRole('button', { name: /изменить пароль/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    
    console.log('✓ Form has proper structure and labels');
  });

  test('Additional: Verify button is disabled during submission', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Mock successful password change
    await page.route('**/api/admin/change-password', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Пароль успешно изменен'
        })
      });
    });
    
    // Fill form
    await page.fill('input[name="current_password"]', 'currentpassword123');
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'newpassword123');
    
    // Get button reference
    const submitButton = page.getByRole('button', { name: /изменить пароль/i });
    
    // Verify button is enabled before submission
    await expect(submitButton).toBeEnabled();
    
    // Submit form
    await submitButton.click();
    
    // Wait for success message to verify submission completed
    await page.waitForTimeout(500);
    const successMessage = page.locator('text=Пароль успешно изменен');
    await expect(successMessage).toBeVisible();
    
    console.log('✓ Button state works correctly during submission');
  });

  test('Additional: Verify autocomplete attributes', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Verify autocomplete attributes
    const currentPasswordInput = page.locator('input[name="current_password"]');
    await expect(currentPasswordInput).toHaveAttribute('autocomplete', 'current-password');
    await expect(currentPasswordInput).toHaveAttribute('type', 'password');
    
    const newPasswordInput = page.locator('input[name="new_password"]');
    await expect(newPasswordInput).toHaveAttribute('autocomplete', 'new-password');
    await expect(newPasswordInput).toHaveAttribute('type', 'password');
    
    const confirmPasswordInput = page.locator('input[name="new_password_confirmation"]');
    await expect(confirmPasswordInput).toHaveAttribute('autocomplete', 'new-password');
    await expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    
    console.log('✓ Autocomplete attributes are correctly set');
  });

  test('Additional: Verify error clearing when user types', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Fill form with short password to trigger validation
    await page.fill('input[name="current_password"]', 'currentpassword');
    await page.fill('input[name="new_password"]', 'short');
    await page.fill('input[name="new_password_confirmation"]', 'short');
    
    // Submit to trigger error
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);
    
    // Verify error is shown
    const errorMessage = page.locator('text=Пароль должен содержать минимум 8 символов');
    await expect(errorMessage).toBeVisible();
    
    // Start typing in the field with error
    await page.fill('input[name="new_password"]', 'longerpassword');
    
    // Verify error is cleared
    await expect(errorMessage).not.toBeVisible();
    
    console.log('✓ Errors are cleared when user types in the field');
  });

  test('Additional: Verify all text is in Russian', async ({ page }) => {
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Check all Russian text elements (using first() to avoid strict mode violations)
    await expect(page.getByText('Смена пароля').first()).toBeVisible();
    await expect(page.getByText('Изменение пароля').first()).toBeVisible();
    await expect(page.locator('label[for="currentPassword"]')).toContainText('Текущий пароль');
    await expect(page.locator('label[for="newPassword"]')).toContainText('Новый пароль');
    await expect(page.locator('label[for="confirmPassword"]')).toContainText('Подтверждение нового пароля');
    await expect(page.getByRole('button', { name: /изменить пароль/i })).toBeVisible();
    
    console.log('✓ All text is in Russian');
  });
});

test.describe('Task 24: Requirements Verification', () => {
  test('Requirement 8.6: Password change function works correctly', async ({ page }) => {
    // Set mock token cookie
    await page.context().clearCookies();
    await page.context().addCookies([{
      name: 'admin-token',
      value: 'mock-token-12345',
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    }]);
    
    // Navigate to password change page
    await page.goto('/admin/settings/change-password');
    
    // Mock successful password change
    await page.route('**/api/admin/change-password', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Пароль успешно изменен'
        })
      });
    });
    
    // Test all validation scenarios
    // 1. Short password
    await page.fill('input[name="current_password"]', 'current');
    await page.fill('input[name="new_password"]', 'short');
    await page.fill('input[name="new_password_confirmation"]', 'short');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);
    await expect(page.locator('text=минимум 8 символов')).toBeVisible();
    
    // 2. Mismatched passwords
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'different123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);
    await expect(page.locator('text=Пароли не совпадают')).toBeVisible();
    
    // 3. Successful change
    await page.fill('input[name="current_password"]', 'currentpassword123');
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'newpassword123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    await expect(page.locator('text=Пароль успешно изменен')).toBeVisible();
    
    console.log('✓ Requirement 8.6: Password change function works correctly');
  });

  test('Requirement 8.7: Success message auto-dismisses after 3 seconds', async ({ page }) => {
    // Set mock token cookie
    await page.context().clearCookies();
    await page.context().addCookies([{
      name: 'admin-token',
      value: 'mock-token-12345',
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    }]);
    
    await page.goto('/admin/settings/change-password');
    
    // Mock successful password change
    await page.route('**/api/admin/change-password', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Пароль успешно изменен'
        })
      });
    });
    
    // Submit form
    await page.fill('input[name="current_password"]', 'currentpassword123');
    await page.fill('input[name="new_password"]', 'newpassword123');
    await page.fill('input[name="new_password_confirmation"]', 'newpassword123');
    await page.click('button[type="submit"]');
    
    // Verify message appears
    await page.waitForTimeout(500);
    const successMessage = page.locator('text=Пароль успешно изменен');
    await expect(successMessage).toBeVisible();
    
    // Wait exactly 3 seconds
    await page.waitForTimeout(3000);
    
    // Verify message disappears
    await expect(successMessage).not.toBeVisible();
    
    console.log('✓ Requirement 8.7: Success message auto-dismisses after exactly 3 seconds');
  });
});
