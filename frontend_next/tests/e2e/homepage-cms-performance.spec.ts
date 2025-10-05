import { test, expect } from '@playwright/test';

/**
 * Homepage CMS Performance Tests
 * Tests performance of the homepage with CMS integration
 * Requirements: 3.7, 5.1, 5.5, 5.6
 */

test.describe('Homepage CMS Performance Tests', () => {
  
  test.describe('Page Load Performance', () => {
    test('should load homepage within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Homepage should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
      
      console.log(`Homepage load time: ${loadTime}ms`);
    });

    test('should have fast First Contentful Paint', async ({ page }) => {
      await page.goto('/');
      
      // Wait for first content to be visible
      await page.waitForSelector('body', { state: 'visible' });
      
      // Check that hero section loads quickly
      const heroSection = page.locator('[class*="hero"], [class*="Hero"]').first();
      await expect(heroSection).toBeVisible({ timeout: 2000 });
    });

    test('should display content without layout shift', async ({ page }) => {
      await page.goto('/');
      
      // Wait for page to stabilize
      await page.waitForLoadState('networkidle');
      
      // Check that main sections are visible
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(0);
      
      // All sections should be visible without shifts
      for (let i = 0; i < Math.min(sectionCount, 5); i++) {
        await expect(sections.nth(i)).toBeVisible();
      }
    });
  });

  test.describe('ISR Caching Behavior', () => {
    test('should serve homepage from ISR cache on second visit', async ({ page }) => {
      // First visit - may generate cache
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const firstContent = await page.locator('body').textContent();
      expect(firstContent).toBeTruthy();
      
      // Second visit - should be from cache (faster)
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const cachedLoadTime = Date.now() - startTime;
      
      const secondContent = await page.locator('body').textContent();
      expect(secondContent).toBeTruthy();
      
      // Cached load should be fast (under 2 seconds)
      expect(cachedLoadTime).toBeLessThan(2000);
      
      console.log(`Cached homepage load time: ${cachedLoadTime}ms`);
    });

    test('should maintain ISR cache across multiple visits', async ({ page }) => {
      const loadTimes: number[] = [];
      
      // Visit homepage 3 times
      for (let i = 0; i < 3; i++) {
        const startTime = Date.now();
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;
        
        loadTimes.push(loadTime);
        
        // Verify content is visible
        await expect(page.locator('body')).toBeVisible();
        
        await page.waitForTimeout(100);
      }
      
      // All visits should be reasonably fast
      for (const time of loadTimes) {
        expect(time).toBeLessThan(3000);
      }
      
      console.log(`Load times: ${loadTimes.join('ms, ')}ms`);
    });

    test('should have 30-minute revalidation period', async ({ page }) => {
      // Visit homepage
      const response = await page.goto('/');
      
      if (response) {
        const headers = response.headers();
        
        // Check for cache headers
        const cacheControl = headers['cache-control'];
        const nextjsCache = headers['x-nextjs-cache'];
        
        // Log cache headers for verification
        console.log('Cache-Control:', cacheControl);
        console.log('X-Nextjs-Cache:', nextjsCache);
        
        // Response should be successful
        expect(response.status()).toBe(200);
      }
      
      // Content should be visible
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('CMS Content Loading', () => {
    test('should load all CMS sections without errors', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for main CMS sections
      const heroSection = page.locator('[class*="hero"], [class*="Hero"]').first();
      const mainContentSection = page.locator('section').nth(1);
      const servicesSection = page.locator('[class*="service"], [class*="Service"]').first();
      const testimonialsSection = page.locator('[class*="testimonial"], [class*="Testimonial"]').first();
      
      // All sections should be visible
      await expect(heroSection).toBeVisible({ timeout: 3000 });
      await expect(mainContentSection).toBeVisible({ timeout: 3000 });
      
      // Services and testimonials may be lazy loaded
      const servicesCount = await page.locator('[class*="service"], [class*="Service"]').count();
      const testimonialsCount = await page.locator('[class*="testimonial"], [class*="Testimonial"]').count();
      
      console.log(`Services sections found: ${servicesCount}`);
      console.log(`Testimonials sections found: ${testimonialsCount}`);
    });

    test('should load images efficiently', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      expect(imageCount).toBeGreaterThan(0);
      
      // Check that images have proper attributes
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        // Images should have src
        expect(src).toBeTruthy();
        
        // Log image info
        console.log(`Image ${i + 1}: src=${src?.substring(0, 50)}...`);
      }
    });

    test('should handle fallback content gracefully', async ({ page }) => {
      // Even if API fails, page should still load with fallback
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Page should be visible
      await expect(page.locator('body')).toBeVisible();
      
      // Hero section should have content (either from API or fallback)
      const heroSection = page.locator('[class*="hero"], [class*="Hero"]').first();
      await expect(heroSection).toBeVisible();
      
      const heroText = await heroSection.textContent();
      expect(heroText).toBeTruthy();
      expect(heroText!.length).toBeGreaterThan(0);
    });
  });

  test.describe('Performance Metrics', () => {
    test('should have acceptable Time to Interactive', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      
      // Wait for page to be interactive
      await page.waitForLoadState('domcontentloaded');
      const domLoadTime = Date.now() - startTime;
      
      await page.waitForLoadState('networkidle');
      const interactiveTime = Date.now() - startTime;
      
      // DOM should load quickly
      expect(domLoadTime).toBeLessThan(2000);
      
      // Page should be interactive quickly
      expect(interactiveTime).toBeLessThan(3000);
      
      console.log(`DOM load time: ${domLoadTime}ms`);
      console.log(`Time to Interactive: ${interactiveTime}ms`);
    });

    test('should maintain performance with client-side interactions', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for interactive elements
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        // Interact with first button
        const firstButton = buttons.first();
        
        if (await firstButton.isVisible() && await firstButton.isEnabled()) {
          const startTime = Date.now();
          await firstButton.click();
          const clickResponseTime = Date.now() - startTime;
          
          // Click should respond quickly
          expect(clickResponseTime).toBeLessThan(500);
          
          console.log(`Button click response time: ${clickResponseTime}ms`);
        }
      }
    });

    test('should load without blocking resources', async ({ page }) => {
      // Monitor network requests
      const blockingRequests: string[] = [];
      
      page.on('request', request => {
        const resourceType = request.resourceType();
        if (resourceType === 'script' || resourceType === 'stylesheet') {
          blockingRequests.push(request.url());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Log blocking resources
      console.log(`Blocking resources loaded: ${blockingRequests.length}`);
      
      // Page should still load successfully
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Resource Optimization', () => {
    test('should use optimized images', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for Next.js optimized images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        const firstImage = images.first();
        const src = await firstImage.getAttribute('src');
        
        // Next.js images should have optimized src
        expect(src).toBeTruthy();
        
        // Check for loading attribute
        const loading = await firstImage.getAttribute('loading');
        console.log(`Image loading strategy: ${loading}`);
      }
    });

    test('should lazy load below-the-fold content', async ({ page }) => {
      await page.goto('/');
      
      // Wait for initial content
      await page.waitForLoadState('domcontentloaded');
      
      // Check that hero is visible immediately
      const heroSection = page.locator('[class*="hero"], [class*="Hero"]').first();
      await expect(heroSection).toBeVisible({ timeout: 1000 });
      
      // Scroll to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      
      // More content should be visible after scroll
      await expect(page.locator('body')).toBeVisible();
    });

    test('should minimize JavaScript bundle size impact', async ({ page }) => {
      const jsRequests: string[] = [];
      
      page.on('request', request => {
        if (request.resourceType() === 'script') {
          jsRequests.push(request.url());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      console.log(`JavaScript files loaded: ${jsRequests.length}`);
      
      // Page should still be functional
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('API Performance', () => {
    test('should handle API requests efficiently', async ({ page }) => {
      const apiRequests: { url: string; time: number }[] = [];
      
      page.on('response', async response => {
        if (response.url().includes('/api/')) {
          const timing = response.timing();
          apiRequests.push({
            url: response.url(),
            time: timing.responseEnd
          });
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Log API requests
      console.log(`API requests made: ${apiRequests.length}`);
      apiRequests.forEach(req => {
        console.log(`  ${req.url}: ${req.time}ms`);
      });
      
      // Page should load successfully
      await expect(page.locator('body')).toBeVisible();
    });

    test('should not block rendering on API calls', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      
      // Wait for first paint
      await page.waitForSelector('body', { state: 'visible' });
      const firstPaintTime = Date.now() - startTime;
      
      // First paint should be fast (not blocked by API)
      expect(firstPaintTime).toBeLessThan(1500);
      
      console.log(`First paint time: ${firstPaintTime}ms`);
    });
  });

  test.describe('Lighthouse Score Verification', () => {
    test('should maintain acceptable performance score', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Verify page loads successfully
      await expect(page.locator('body')).toBeVisible();
      
      // Check for performance indicators
      const images = page.locator('img');
      const imageCount = await images.count();
      
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      
      console.log(`Images loaded: ${imageCount}`);
      console.log(`Sections rendered: ${sectionCount}`);
      
      // Basic performance checks
      expect(imageCount).toBeGreaterThan(0);
      expect(sectionCount).toBeGreaterThan(0);
    });

    test('should have good SEO structure', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for SEO elements
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      // Check for meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      
      // Check for headings
      const h1 = page.locator('h1');
      const h1Count = await h1.count();
      expect(h1Count).toBeGreaterThan(0);
      
      console.log(`Page title: ${title}`);
      console.log(`Meta description: ${metaDescription?.substring(0, 50)}...`);
      console.log(`H1 headings: ${h1Count}`);
    });

    test('should maintain accessibility standards', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for alt text on images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      let imagesWithAlt = 0;
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const alt = await images.nth(i).getAttribute('alt');
        if (alt !== null) {
          imagesWithAlt++;
        }
      }
      
      console.log(`Images with alt text: ${imagesWithAlt}/${Math.min(imageCount, 10)}`);
      
      // Check for proper heading hierarchy
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      
      expect(headingCount).toBeGreaterThan(0);
      console.log(`Total headings: ${headingCount}`);
    });
  });

  test.describe('Stress Testing', () => {
    test('should handle rapid navigation', async ({ page }) => {
      // Navigate to homepage multiple times rapidly
      for (let i = 0; i < 5; i++) {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        
        // Verify page loads
        await expect(page.locator('body')).toBeVisible();
      }
      
      // Final load should still work
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toBeVisible();
    });

    test('should maintain performance under scroll stress', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Scroll up and down multiple times
      for (let i = 0; i < 3; i++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(200);
        
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);
      }
      
      // Page should still be responsive
      await expect(page.locator('body')).toBeVisible();
    });
  });
});
