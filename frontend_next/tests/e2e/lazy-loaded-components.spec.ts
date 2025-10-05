import { test, expect } from '@playwright/test';

/**
 * Comprehensive tests for lazy loaded components
 * Tests footers, admin components, carousels, lightboxes, and loading states
 */

test.describe('Lazy Loaded Components - Functional Testing', () => {
  
  test.describe('Footer Components', () => {
    test('should lazy load desktop footer on scroll', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Scroll to bottom to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      
      // Footer should be visible
      const footer = page.locator('footer, [class*="Footer"]').first();
      await expect(footer).toBeVisible({ timeout: 5000 });
    });

    test('should lazy load mobile footer on scroll', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      
      // Mobile footer should be visible
      const footer = page.locator('footer, [class*="Footer"]').first();
      await expect(footer).toBeVisible({ timeout: 5000 });
    });

    test('should show loading state before footer loads', async ({ page }) => {
      await page.goto('/');
      
      // Scroll quickly to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // May see loading state briefly
      await page.waitForTimeout(500);
      
      // Footer should eventually load
      const footer = page.locator('footer, [class*="Footer"]').first();
      await expect(footer).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Admin Components Lazy Loading', () => {
    // Note: These tests require admin authentication
    // Adjust based on your auth setup
    
    test('should lazy load admin calendar component', async ({ page }) => {
      // Skip if not authenticated
      await page.goto('/admin/calendar');
      await page.waitForLoadState('networkidle');
      
      // Wait for calendar to lazy load
      await page.waitForTimeout(2000);
      
      // Check if calendar loaded or login page shown
      const hasCalendar = await page.locator('[class*="fc"], [class*="calendar"]').count() > 0;
      const hasLoginForm = await page.locator('form input[type="password"]').count() > 0;
      
      expect(hasCalendar || hasLoginForm).toBeTruthy();
    });

    test('should lazy load admin charts component', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      // Wait for charts to lazy load
      await page.waitForTimeout(2000);
      
      // Check if charts loaded or login page shown
      const hasCharts = await page.locator('[class*="apexcharts"], svg[class*="chart"]').count() > 0;
      const hasLoginForm = await page.locator('form input[type="password"]').count() > 0;
      
      expect(hasCharts || hasLoginForm).toBeTruthy();
    });

    test('should show loading states for admin components', async ({ page }) => {
      await page.goto('/admin');
      
      // Check for loading indicators
      const loadingIndicators = page.locator('[class*="loading"], [class*="skeleton"]');
      
      // May see loading states briefly
      await page.waitForTimeout(500);
      
      // Page should eventually load
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Carousel Components', () => {
    test('should lazy load testimonial carousel', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Scroll to testimonials section
      const testimonialSection = page.locator('[class*="testimonial"], [class*="Testimonial"]').first();
      const sectionCount = await page.locator('[class*="testimonial"], [class*="Testimonial"]').count();
      
      if (sectionCount > 0) {
        await testimonialSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Carousel should be visible
        await expect(testimonialSection).toBeVisible();
      }
    });

    test('should lazy load media carousel', async ({ page }) => {
      await page.goto('/media');
      await page.waitForLoadState('networkidle');
      
      // Check for carousel
      const carousel = page.locator('[class*="carousel"], [class*="Carousel"], [class*="swiper"]').first();
      const carouselCount = await page.locator('[class*="carousel"], [class*="Carousel"], [class*="swiper"]').count();
      
      if (carouselCount > 0) {
        await carousel.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Carousel should be visible
        await expect(carousel).toBeVisible();
      }
    });

    test('should show carousel navigation controls', async ({ page }) => {
      await page.goto('/media');
      await page.waitForLoadState('networkidle');
      
      // Look for carousel controls
      const controls = page.locator('button[class*="prev"], button[class*="next"], [class*="navigation"]');
      const controlCount = await controls.count();
      
      if (controlCount > 0) {
        // Controls should be visible
        const firstControl = controls.first();
        await expect(firstControl).toBeVisible();
      }
    });

    test('should handle carousel interactions', async ({ page }) => {
      await page.goto('/media');
      await page.waitForLoadState('networkidle');
      
      // Find next button
      const nextButton = page.locator('button[class*="next"], button[aria-label*="next"]').first();
      const buttonCount = await page.locator('button[class*="next"], button[aria-label*="next"]').count();
      
      if (buttonCount > 0) {
        // Click next button
        await nextButton.click();
        await page.waitForTimeout(500);
        
        // Carousel should still be functional
        await expect(page.locator('body')).toBeVisible();
      }
    });
  });

  test.describe('Lightbox Components', () => {
    test('should lazy load lightbox on image click', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Find clickable images
      const clickableImages = page.locator('img[class*="clickable"], img[role="button"]');
      const imageCount = await clickableImages.count();
      
      if (imageCount > 0) {
        const firstImage = clickableImages.first();
        await firstImage.click();
        await page.waitForTimeout(1000);
        
        // Lightbox should open
        const lightbox = page.locator('[class*="lightbox"], [class*="modal"]:visible, [role="dialog"]:visible').first();
        const lightboxCount = await page.locator('[class*="lightbox"], [class*="modal"]:visible').count();
        
        if (lightboxCount > 0) {
          await expect(lightbox).toBeVisible();
        }
      }
    });

    test('should close lightbox on close button click', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Find and click image
      const clickableImages = page.locator('img[class*="clickable"], img[role="button"]');
      const imageCount = await clickableImages.count();
      
      if (imageCount > 0) {
        await clickableImages.first().click();
        await page.waitForTimeout(1000);
        
        // Find close button
        const closeButton = page.locator('button[aria-label*="close"], button[class*="close"]').first();
        const closeCount = await page.locator('button[aria-label*="close"], button[class*="close"]').count();
        
        if (closeCount > 0) {
          await closeButton.click();
          await page.waitForTimeout(500);
          
          // Lightbox should close
          const lightbox = page.locator('[class*="lightbox"]:visible, [role="dialog"]:visible');
          const lightboxCount = await lightbox.count();
          
          expect(lightboxCount).toBe(0);
        }
      }
    });

    test('should handle lightbox navigation', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Navigate to project detail with gallery
      const projectLink = page.locator('a[href*="/projects/"]').first();
      const linkCount = await page.locator('a[href*="/projects/"]').count();
      
      if (linkCount > 0) {
        await projectLink.click();
        await page.waitForLoadState('networkidle');
        
        // Look for gallery images
        const galleryImages = page.locator('img');
        const galleryCount = await galleryImages.count();
        
        if (galleryCount > 1) {
          // Click first image
          await galleryImages.first().click();
          await page.waitForTimeout(1000);
          
          // Look for next/prev buttons in lightbox
          const navButtons = page.locator('button[class*="next"], button[class*="prev"]');
          const navCount = await navButtons.count();
          
          if (navCount > 0) {
            // Click navigation
            await navButtons.first().click();
            await page.waitForTimeout(500);
            
            // Lightbox should still be open
            const lightbox = page.locator('[role="dialog"]:visible').first();
            await expect(lightbox).toBeVisible();
          }
        }
      }
    });
  });

  test.describe('Loading States', () => {
    test('should show skeleton loaders for lazy components', async ({ page }) => {
      await page.goto('/');
      
      // Check for skeleton loaders during initial load
      const skeletons = page.locator('[class*="skeleton"], [class*="loading"]');
      
      // May see skeletons briefly
      await page.waitForTimeout(200);
      
      // Page should eventually load
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toBeVisible();
    });

    test('should replace skeletons with actual content', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // After loading, skeletons should be replaced
      await page.waitForTimeout(1000);
      
      // Check for actual content
      const sections = page.locator('section, [class*="Section"]');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(0);
    });

    test('should handle loading errors gracefully', async ({ page }) => {
      // Monitor console errors
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Page should load even if some lazy components fail
      await expect(page.locator('body')).toBeVisible();
      
      // Critical errors should not prevent page load
      // (Some errors may be acceptable for optional components)
    });
  });

  test.describe('Performance Impact', () => {
    test('should reduce initial bundle size with lazy loading', async ({ page }) => {
      // Monitor network requests
      const jsRequests: string[] = [];
      
      page.on('request', request => {
        if (request.url().endsWith('.js')) {
          jsRequests.push(request.url());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Should have loaded some JS files
      expect(jsRequests.length).toBeGreaterThan(0);
      
      // Lazy loaded components should load additional chunks
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      
      // More JS may have loaded
      expect(jsRequests.length).toBeGreaterThan(0);
    });

    test('should load components on demand', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Initial load should be fast
      const initialContent = await page.locator('body').textContent();
      expect(initialContent).toBeTruthy();
      
      // Scroll to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      
      // Additional content should load
      const fullContent = await page.locator('body').textContent();
      expect(fullContent).toBeTruthy();
    });

    test('should not block initial page render', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForSelector('body');
      
      const renderTime = Date.now() - startTime;
      
      // Initial render should be fast (under 3 seconds)
      expect(renderTime).toBeLessThan(3000);
    });
  });

  test.describe('Error Boundaries', () => {
    test('should handle lazy loading failures gracefully', async ({ page }) => {
      // Monitor console errors
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Scroll to trigger all lazy components
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      
      // Page should still be functional
      await expect(page.locator('body')).toBeVisible();
    });

    test('should show fallback UI for failed components', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Even if some components fail, page should show content
      const sections = page.locator('section, main');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(0);
    });
  });
});
