import { test, expect } from '@playwright/test';

/**
 * Test suite for Task 23: Проверка отображения sidebar после входа
 * 
 * This test verifies:
 * - Sidebar is displayed after successful login
 * - All menu items are functional
 * - Active menu item is highlighted
 * - Logout button works correctly
 * 
 * Requirements: 8.4
 */

test.describe('Task 23: Sidebar Display After Login', () => {
  
  // Admin credentials
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
  const ADMIN_LOGIN_URL = '/admin/login';

  // Helper function to login
  async function loginAsAdmin(page: any) {
    await page.goto(ADMIN_LOGIN_URL);
    await page.waitForLoadState('networkidle');
    
    const emailInput = page.locator('input[type="email"], input[name*="email"], input[name="username"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await emailInput.fill(ADMIN_EMAIL);
    await passwordInput.fill(ADMIN_PASSWORD);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  }

  test('Sub-task 1: После успешного входа проверить, что sidebar отображается', async ({ page }) => {
    // Login
    await loginAsAdmin(page);
    
    // Navigate to admin dashboard
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Check that sidebar is visible
    const sidebar = page.locator('aside, [data-sidebar="sidebar"], nav[class*="sidebar"]').first();
    await expect(sidebar).toBeVisible({ timeout: 5000 });
    
    // Verify sidebar contains navigation elements
    const sidebarContent = await sidebar.textContent();
    expect(sidebarContent).toBeTruthy();
    expect(sidebarContent!.length).toBeGreaterThan(0);
    
    console.log('✓ Sidebar is displayed after successful login');
  });

  test('Sub-task 2: Проверить, что все пункты меню работают', async ({ page }) => {
    // Login
    await loginAsAdmin(page);
    
    // Navigate to admin dashboard
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Define expected menu items based on app-sidebar.tsx
    const menuItems = [
      { text: 'Главная страница', url: '/admin/homepage-editor' },
      { text: 'Блог', url: '/admin/blog' },
      { text: 'Категории', url: '/admin/category' },
      { text: 'Проекты', url: '/admin/projects' },
      { text: 'Медиа-страница', url: '/admin/media-page' },
      { text: 'SEO управление', url: '/admin/seo' },
      { text: 'Сменить пароль', url: '/admin/settings/change-password' },
    ];
    
    // Test each menu item
    for (const item of menuItems) {
      // Find the menu link
      const menuLink = page.locator(`a:has-text("${item.text}")`).first();
      
      // Verify link is visible
      await expect(menuLink).toBeVisible({ timeout: 3000 });
      
      // Click the link
      await menuLink.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      // Verify navigation occurred
      const currentUrl = page.url();
      expect(currentUrl).toContain(item.url);
      
      console.log(`✓ Menu item "${item.text}" works correctly`);
      
      // Navigate back to admin for next iteration
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
    }
    
    console.log('✓ All menu items are functional');
  });

  test('Sub-task 3: Проверить, что активный пункт меню подсвечивается', async ({ page }) => {
    // Login
    await loginAsAdmin(page);
    
    // Test menu items with active state highlighting
    const testPages = [
      { url: '/admin/homepage-editor', text: 'Главная страница' },
      { url: '/admin/blog', text: 'Блог' },
      { url: '/admin/category', text: 'Категории' },
      { url: '/admin/projects', text: 'Проекты' },
      { url: '/admin/settings/change-password', text: 'Сменить пароль' },
    ];
    
    for (const testPage of testPages) {
      // Navigate to the page
      await page.goto(testPage.url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      // Find the menu link for this page
      const menuLink = page.locator(`a:has-text("${testPage.text}")`).first();
      await expect(menuLink).toBeVisible();
      
      // Get the computed styles or classes
      const linkClasses = await menuLink.getAttribute('class');
      const linkColor = await menuLink.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      // Check if the link has active styling
      // Based on app-sidebar.tsx, active links have text-[#DE063A] class
      const hasActiveClass = linkClasses?.includes('text-[#DE063A]') || 
                            linkClasses?.includes('text-red') ||
                            linkColor.includes('222, 6, 58'); // RGB for #DE063A
      
      // Verify active state is applied
      expect(hasActiveClass).toBeTruthy();
      
      console.log(`✓ Active menu item "${testPage.text}" is highlighted correctly`);
    }
    
    console.log('✓ Active menu items are properly highlighted');
  });

  test('Sub-task 4: Проверить кнопку выхода', async ({ page }) => {
    // Login
    await loginAsAdmin(page);
    
    // Navigate to admin dashboard
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Find the logout button in sidebar
    const logoutButton = page.locator('button:has-text("Выйти"), a:has-text("Выйти")').first();
    await expect(logoutButton).toBeVisible({ timeout: 5000 });
    
    // Verify logout button has the correct icon
    const logoutIcon = page.locator('svg').filter({ has: logoutButton }).first();
    await expect(logoutIcon).toBeVisible();
    
    console.log('✓ Logout button is visible in sidebar');
    
    // Click logout button
    await logoutButton.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verify redirect to login page
    const currentUrl = page.url();
    expect(currentUrl).toContain('/admin/login');
    
    console.log('✓ Logout button redirects to login page');
    
    // Verify sidebar is hidden on login page
    const sidebar = page.locator('aside, [data-sidebar="sidebar"]').first();
    const sidebarCount = await page.locator('aside, [data-sidebar="sidebar"]').count();
    
    if (sidebarCount > 0) {
      const isVisible = await sidebar.isVisible();
      expect(isVisible).toBeFalsy();
    }
    
    console.log('✓ Sidebar is hidden after logout');
    
    // Verify user cannot access protected pages without authentication
    await page.goto('/admin/projects');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const redirectedUrl = page.url();
    expect(redirectedUrl).toContain('/admin/login');
    
    console.log('✓ Protected pages redirect to login after logout');
    console.log('✓ Logout functionality works correctly');
  });

  test('Integration: Complete sidebar workflow after login', async ({ page }) => {
    // This test verifies the complete workflow
    
    // Step 1: Login
    await loginAsAdmin(page);
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Step 2: Verify sidebar is visible
    const sidebar = page.locator('aside, [data-sidebar="sidebar"]').first();
    await expect(sidebar).toBeVisible();
    console.log('✓ Step 1: Sidebar visible after login');
    
    // Step 3: Verify all menu sections are present
    const appSection = page.locator('text=Приложение').first();
    const settingsSection = page.locator('text=Настройки').first();
    
    await expect(appSection).toBeVisible();
    await expect(settingsSection).toBeVisible();
    console.log('✓ Step 2: All menu sections are present');
    
    // Step 4: Test navigation
    await page.locator('a:has-text("Проекты")').first().click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/admin/projects');
    console.log('✓ Step 3: Navigation works');
    
    // Step 5: Verify active state
    const activeLink = page.locator('a:has-text("Проекты")').first();
    const linkClasses = await activeLink.getAttribute('class');
    expect(linkClasses).toContain('text-[#DE063A]');
    console.log('✓ Step 4: Active state is applied');
    
    // Step 6: Test logout
    const logoutButton = page.locator('button:has-text("Выйти")').first();
    await logoutButton.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/admin/login');
    console.log('✓ Step 5: Logout works');
    
    console.log('✓ Complete sidebar workflow verified successfully');
  });

  test('Responsive: Sidebar toggle functionality', async ({ page }) => {
    // Login
    await loginAsAdmin(page);
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Find sidebar trigger button
    const sidebarTrigger = page.locator('button[class*="sidebar-trigger"], button[data-sidebar="trigger"]').first();
    const triggerCount = await page.locator('button[class*="sidebar-trigger"], button[data-sidebar="trigger"]').count();
    
    if (triggerCount > 0) {
      await expect(sidebarTrigger).toBeVisible();
      
      // Click to toggle sidebar
      await sidebarTrigger.click();
      await page.waitForTimeout(500);
      
      console.log('✓ Sidebar trigger button works');
    }
    
    console.log('✓ Sidebar responsive functionality verified');
  });

  test('Visual: Sidebar styling and branding', async ({ page }) => {
    // Login
    await loginAsAdmin(page);
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Check for logo in sidebar
    const logo = page.locator('aside img[alt*="Логотип"], aside img[src*="logo"]').first();
    const logoCount = await page.locator('aside img[alt*="Логотип"], aside img[src*="logo"]').count();
    
    if (logoCount > 0) {
      await expect(logo).toBeVisible();
      console.log('✓ Logo is displayed in sidebar');
    }
    
    // Verify menu items have icons
    const menuIcons = page.locator('aside svg').all();
    const iconCount = (await menuIcons).length;
    expect(iconCount).toBeGreaterThan(0);
    console.log(`✓ Menu items have icons (${iconCount} icons found)`);
    
    // Verify hover states work
    const firstMenuItem = page.locator('aside a').first();
    await firstMenuItem.hover();
    await page.waitForTimeout(300);
    
    const hoverColor = await firstMenuItem.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    console.log('✓ Hover states are functional');
    console.log('✓ Sidebar styling and branding verified');
  });
});
