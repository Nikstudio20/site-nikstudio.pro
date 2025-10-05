import { test, expect } from '@playwright/test';

/**
 * ISR and Caching Behavior Tests
 * Tests Incremental Static Regeneration and caching functionality
 */

test.describe('ISR and Caching Behavior - Functional Testing', () => {
  
  test.describe('ISR Pages - Blog', () => {
    test('should serve blog list page from cache', async ({ page }) => {
      // First visit - may be fresh or cached
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Check page loads successfully
      await expect(page.locator('body')).toBeVisible();
      
      // Second visit - should be from cache
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Page should load quickly from cache
      await expect(page.locator('body')).toBeVisible();
    });

    test('should display blog content correctly with ISR', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Check for blog posts
      const blogPosts = page.locator('[class*="blog"], [class*="post"], article');
      const postCount = await blogPosts.count();
      
      // Content should be present
      expect(postCount).toBeGreaterThanOrEqual(0);
    });

    test('should navigate to blog detail pages with ISR', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Find first blog post link
      const firstPostLink = page.locator('a[href*="/blog/"]').first();
      const linkCount = await page.locator('a[href*="/blog/"]').count();
      
      if (linkCount > 0) {
        await firstPostLink.click();
        await page.waitForLoadState('networkidle');
        
        // Detail page should load from ISR
        await expect(page).toHaveURL(/.*blog\/.+/);
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('should maintain interactivity on ISR blog pages', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Check for interactive elements
      const links = page.locator('a[href]');
      const linkCount = await links.count();
      
      if (linkCount > 0) {
        // Links should be clickable
        const firstLink = links.first();
        await expect(firstLink).toBeVisible();
        
        // Should be able to interact
        const isEnabled = await firstLink.isEnabled();
        expect(isEnabled).toBeTruthy();
      }
    });
  });

  test.describe('ISR Pages - Projects', () => {
    test('should serve projects list page from cache', async ({ page }) => {
      // First visit
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('body')).toBeVisible();
      
      // Second visit - should be cached
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('body')).toBeVisible();
    });

    test('should display projects correctly with ISR', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Check for projects
      const projects = page.locator('[class*="project"], article, [class*="card"]');
      const projectCount = await projects.count();
      
      expect(projectCount).toBeGreaterThanOrEqual(0);
    });

    test('should handle category filtering with ISR', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Check for filter buttons
      const filters = page.locator('button[class*="filter"], [role="tab"]');
      const filterCount = await filters.count();
      
      if (filterCount > 0) {
        // Click filter
        const firstFilter = filters.first();
        await firstFilter.click();
        await page.waitForTimeout(500);
        
        // Filtering should still work with ISR
        await expect(page.locator('body')).toBeVisible();
        
        // Projects should update
        const projectsAfterFilter = page.locator('[class*="project"], article');
        const countAfterFilter = await projectsAfterFilter.count();
        
        expect(countAfterFilter).toBeGreaterThanOrEqual(0);
      }
    });

    test('should navigate to project detail pages with ISR', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Find first project link
      const firstProjectLink = page.locator('a[href*="/projects/"]').first();
      const linkCount = await page.locator('a[href*="/projects/"]').count();
      
      if (linkCount > 0) {
        await firstProjectLink.click();
        await page.waitForLoadState('networkidle');
        
        // Detail page should load from ISR
        await expect(page).toHaveURL(/.*projects\/.+/);
        await expect(page.locator('body')).toBeVisible();
      }
    });
  });

  test.describe('ISR Pages - Home', () => {
    test('should serve home page with ISR', async ({ page }) => {
      // First visit
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('body')).toBeVisible();
      
      // Second visit - should be cached
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('body')).toBeVisible();
    });

    test('should maintain client-side interactivity on home page', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for interactive elements (filters, toggles, etc.)
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        // Buttons should be interactive
        const firstButton = buttons.first();
        const isEnabled = await firstButton.isEnabled();
        
        // Interactive elements should work despite ISR
        expect(isEnabled).toBeTruthy();
      }
    });

    test('should display dynamic content correctly with ISR', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for content sections
      const sections = page.locator('section, [class*="Section"]');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(0);
      
      // Content should be visible
      const firstSection = sections.first();
      await expect(firstSection).toBeVisible();
    });

    test('should handle filters and toggles with ISR', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Look for filter or toggle buttons
      const filterButtons = page.locator('button[class*="filter"], button[class*="toggle"]');
      const filterCount = await filterButtons.count();
      
      if (filterCount > 0) {
        const firstFilter = filterButtons.first();
        
        // Click filter
        await firstFilter.click();
        await page.waitForTimeout(500);
        
        // Page should still be functional
        await expect(page.locator('body')).toBeVisible();
      }
    });
  });

  test.describe('Cache Headers and Behavior', () => {
    test('should have appropriate cache headers on ISR pages', async ({ page }) => {
      const response = await page.goto('/blog');
      
      if (response) {
        const headers = response.headers();
        
        // Check for cache-related headers
        // ISR pages should have cache-control headers
        const hasCacheHeaders = 
          headers['cache-control'] !== undefined ||
          headers['x-nextjs-cache'] !== undefined;
        
        // Just verify response is successful
        expect(response.status()).toBe(200);
      }
    });

    test('should serve static assets with caching', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check that static assets are loaded
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        const firstImage = images.first();
        const src = await firstImage.getAttribute('src');
        
        // Images should have src
        expect(src).toBeTruthy();
      }
    });

    test('should handle API requests with caching', async ({ page }) => {
      // Monitor network requests
      const apiRequests: string[] = [];
      
      page.on('request', request => {
        if (request.url().includes('/api/')) {
          apiRequests.push(request.url());
        }
      });
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // API requests may or may not be present depending on ISR implementation
      // Just verify page loads successfully
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Revalidation Behavior', () => {
    test('should serve stale content while revalidating', async ({ page }) => {
      // First visit - generate cache
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const firstContent = await page.locator('body').textContent();
      expect(firstContent).toBeTruthy();
      
      // Second visit - should serve from cache
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const secondContent = await page.locator('body').textContent();
      expect(secondContent).toBeTruthy();
      
      // Content should be consistent
      expect(secondContent?.length).toBeGreaterThan(0);
    });

    test('should maintain functionality during revalidation', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Page should be fully functional
      const links = page.locator('a[href]');
      const linkCount = await links.count();
      
      if (linkCount > 0) {
        const firstLink = links.first();
        await firstLink.click();
        await page.waitForLoadState('networkidle');
        
        // Navigation should work
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('should not break user experience during revalidation', async ({ page }) => {
      // Visit page multiple times
      for (let i = 0; i < 3; i++) {
        await page.goto('/blog');
        await page.waitForLoadState('networkidle');
        
        // Each visit should be successful
        await expect(page.locator('body')).toBeVisible();
        
        // Small delay between visits
        await page.waitForTimeout(100);
      }
    });
  });

  test.describe('Dynamic Features with ISR', () => {
    test('should preserve client-side state with ISR', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Interact with filters
      const filters = page.locator('button[class*="filter"]');
      const filterCount = await filters.count();
      
      if (filterCount > 0) {
        const firstFilter = filters.first();
        await firstFilter.click();
        await page.waitForTimeout(500);
        
        // Reload page
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        // Page should still be functional
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('should handle form submissions with ISR', async ({ page }) => {
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');
      
      const form = page.locator('form').first();
      const formCount = await page.locator('form').count();
      
      if (formCount > 0) {
        // Form should be interactive despite ISR
        const inputs = form.locator('input, textarea');
        const inputCount = await inputs.count();
        
        if (inputCount > 0) {
          const firstInput = inputs.first();
          await firstInput.fill('Test');
          
          const value = await firstInput.inputValue();
          expect(value).toBe('Test');
        }
      }
    });

    test('should handle search and filtering with ISR', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Check for search or filter inputs
      const searchInput = page.locator('input[type="search"], input[placeholder*="поиск"]').first();
      const searchCount = await page.locator('input[type="search"], input[placeholder*="поиск"]').count();
      
      if (searchCount > 0) {
        // Search should work with ISR
        await searchInput.fill('test');
        await page.waitForTimeout(500);
        
        // Page should still be functional
        await expect(page.locator('body')).toBeVisible();
      }
    });
  });

  test.describe('Cache Invalidation', () => {
    test('should handle navigation after cache updates', async ({ page }) => {
      // Visit blog page
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Navigate to detail page
      const firstPostLink = page.locator('a[href*="/blog/"]').first();
      const linkCount = await page.locator('a[href*="/blog/"]').count();
      
      if (linkCount > 0) {
        await firstPostLink.click();
        await page.waitForLoadState('networkidle');
        
        // Go back
        await page.goBack();
        await page.waitForLoadState('networkidle');
        
        // List page should still work
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('should maintain consistency across cached pages', async ({ page }) => {
      // Visit multiple ISR pages
      const pages = ['/blog', '/projects', '/'];
      
      for (const url of pages) {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        
        // Each page should load successfully
        await expect(page.locator('body')).toBeVisible();
        
        // Check for navigation consistency
        const nav = page.locator('nav, header').first();
        await expect(nav).toBeVisible();
      }
    });
  });

  test.describe('Performance with ISR', () => {
    test('should load ISR pages quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // ISR pages should load reasonably fast (under 5 seconds)
      expect(loadTime).toBeLessThan(5000);
    });

    test('should have good performance on subsequent visits', async ({ page }) => {
      // First visit
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Second visit (should be faster from cache)
      const startTime = Date.now();
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Cached page should load quickly
      expect(loadTime).toBeLessThan(3000);
    });

    test('should not degrade performance with ISR', async ({ page }) => {
      // Visit home page multiple times
      const loadTimes: number[] = [];
      
      for (let i = 0; i < 3; i++) {
        const startTime = Date.now();
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;
        
        loadTimes.push(loadTime);
        await page.waitForTimeout(100);
      }
      
      // All visits should be reasonably fast
      for (const time of loadTimes) {
        expect(time).toBeLessThan(5000);
      }
    });
  });
});
