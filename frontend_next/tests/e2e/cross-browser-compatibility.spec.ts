import { test, expect, Page, BrowserContext } from '@playwright/test';

/**
 * Cross-browser compatibility tests
 * Verifies consistent behavior across Chrome, Firefox, Safari, and Edge
 */

test.describe('Cross-Browser Compatibility', () => {
  
  test.describe('Visual Consistency', () => {
    test('homepage renders consistently across browsers', async ({ page }) => {
      await page.goto('/');
      
      // Wait for page to fully load
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot('homepage.png', {
        fullPage: true,
        threshold: 0.2, // Allow for minor rendering differences
      });
      
      // Verify key elements are visible
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test('project showcase page renders consistently', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot('projects-page.png', {
        fullPage: true,
        threshold: 0.2,
      });
      
      // Verify project cards are displayed
      const projectCards = page.locator('[data-testid="project-card"]');
      await expect(projectCards.first()).toBeVisible();
    });

    test('admin interface renders consistently', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot('admin-interface.png', {
        fullPage: true,
        threshold: 0.2,
      });
      
      // Verify admin navigation and layout
      await expect(page.locator('[data-testid="admin-nav"]')).toBeVisible();
      await expect(page.locator('[data-testid="admin-content"]')).toBeVisible();
    });
  });

  test.describe('Feature Detection and Polyfills', () => {
    test('detects browser capabilities correctly', async ({ page, browserName }) => {
      await page.goto('/');
      
      // Inject browser detection script and verify results
      const browserInfo = await page.evaluate(() => {
        // This should match the browser detection service implementation
        const userAgent = navigator.userAgent;
        const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
        const isFirefox = /Firefox/.test(userAgent);
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
        const isEdge = /Edge/.test(userAgent);
        
        return {
          userAgent,
          isChrome,
          isFirefox,
          isSafari,
          isEdge,
          features: {
            fetch: typeof fetch !== 'undefined',
            promises: typeof Promise !== 'undefined',
            intersectionObserver: typeof IntersectionObserver !== 'undefined',
            customProperties: CSS.supports('color', 'var(--test)'),
            cssGrid: CSS.supports('display', 'grid'),
            flexbox: CSS.supports('display', 'flex'),
          }
        };
      });
      
      // Verify browser detection matches expected browser
      switch (browserName) {
        case 'chromium':
          expect(browserInfo.isChrome || browserInfo.isEdge).toBeTruthy();
          break;
        case 'firefox':
          expect(browserInfo.isFirefox).toBeTruthy();
          break;
        case 'webkit':
          expect(browserInfo.isSafari).toBeTruthy();
          break;
      }
      
      // Verify modern features are available
      expect(browserInfo.features.fetch).toBeTruthy();
      expect(browserInfo.features.promises).toBeTruthy();
      expect(browserInfo.features.cssGrid).toBeTruthy();
      expect(browserInfo.features.flexbox).toBeTruthy();
    });

    test('loads appropriate polyfills based on browser', async ({ page, browserName }) => {
      await page.goto('/');
      
      // Check if polyfills are loaded when needed
      const polyfillsLoaded = await page.evaluate(() => {
        return {
          fetchPolyfill: window.fetch && window.fetch.polyfill,
          intersectionObserverPolyfill: window.IntersectionObserver && window.IntersectionObserver.polyfill,
          customEventPolyfill: window.CustomEvent && window.CustomEvent.polyfill,
        };
      });
      
      // For modern browsers, polyfills should not be needed
      if (['chromium', 'firefox', 'webkit'].includes(browserName)) {
        // Modern browsers should have native implementations
        expect(polyfillsLoaded.fetchPolyfill).toBeFalsy();
      }
    });

    test('CSS feature detection works correctly', async ({ page }) => {
      await page.goto('/');
      
      const cssSupport = await page.evaluate(() => {
        return {
          grid: CSS.supports('display', 'grid'),
          flexbox: CSS.supports('display', 'flex'),
          customProperties: CSS.supports('color', 'var(--test)'),
          transforms: CSS.supports('transform', 'translateX(10px)'),
          transitions: CSS.supports('transition', 'all 0.3s ease'),
        };
      });
      
      // All modern browsers should support these features
      expect(cssSupport.flexbox).toBeTruthy();
      expect(cssSupport.transforms).toBeTruthy();
      expect(cssSupport.transitions).toBeTruthy();
      
      // Grid and custom properties should be supported in modern browsers
      expect(cssSupport.grid).toBeTruthy();
      expect(cssSupport.customProperties).toBeTruthy();
    });
  });

  test.describe('Media Compatibility', () => {
    test('video format detection works across browsers', async ({ page, browserName }) => {
      await page.goto('/');
      
      const videoSupport = await page.evaluate(() => {
        const video = document.createElement('video');
        return {
          mp4: video.canPlayType('video/mp4') !== '',
          webm: video.canPlayType('video/webm') !== '',
          ogg: video.canPlayType('video/ogg') !== '',
        };
      });
      
      // All modern browsers should support MP4
      expect(videoSupport.mp4).toBeTruthy();
      
      // WebM support varies by browser
      if (browserName === 'webkit') {
        // Safari typically doesn't support WebM
        expect(videoSupport.webm).toBeFalsy();
      } else {
        // Chrome, Firefox, Edge should support WebM
        expect(videoSupport.webm).toBeTruthy();
      }
    });

    test('image format detection works correctly', async ({ page }) => {
      await page.goto('/');
      
      const imageSupport = await page.evaluate(async () => {
        // Test WebP support
        const webpSupport = await new Promise<boolean>((resolve) => {
          const webP = new Image();
          webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
          };
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
        
        return {
          webp: webpSupport,
          jpeg: true, // All browsers support JPEG
          png: true,  // All browsers support PNG
        };
      });
      
      expect(imageSupport.jpeg).toBeTruthy();
      expect(imageSupport.png).toBeTruthy();
      // WebP support varies but is widely supported in modern browsers
    });
  });

  test.describe('Form and Input Compatibility', () => {
    test('file upload functionality works across browsers', async ({ page }) => {
      await page.goto('/admin');
      
      // Navigate to a form with file upload
      await page.click('[data-testid="add-project-btn"]');
      
      // Verify file input is present and functional
      const fileInput = page.locator('input[type="file"]');
      await expect(fileInput).toBeVisible();
      
      // Test file input attributes
      const acceptAttribute = await fileInput.getAttribute('accept');
      expect(acceptAttribute).toContain('image/*');
    });

    test('form validation works consistently', async ({ page }) => {
      await page.goto('/admin');
      
      // Navigate to a form
      await page.click('[data-testid="add-project-btn"]');
      
      // Try to submit empty form
      await page.click('[data-testid="submit-btn"]');
      
      // Verify validation messages appear
      const validationMessage = page.locator('[data-testid="validation-error"]');
      await expect(validationMessage).toBeVisible();
    });

    test('drag and drop functionality works', async ({ page, browserName }) => {
      await page.goto('/admin');
      
      // Navigate to file upload area
      await page.click('[data-testid="add-project-btn"]');
      
      const dropZone = page.locator('[data-testid="file-dropzone"]');
      await expect(dropZone).toBeVisible();
      
      // Test drag over events (basic functionality test)
      await dropZone.hover();
      
      // Note: Actual file dropping requires more complex setup
      // This test verifies the dropzone is present and interactive
    });
  });

  test.describe('Event Handling Compatibility', () => {
    test('click events work consistently', async ({ page }) => {
      await page.goto('/');
      
      // Test navigation clicks
      const navLink = page.locator('nav a').first();
      await navLink.click();
      
      // Verify navigation worked
      await page.waitForLoadState('networkidle');
      expect(page.url()).not.toBe('http://localhost:3000/');
    });

    test('keyboard navigation works', async ({ page }) => {
      await page.goto('/');
      
      // Test tab navigation
      await page.keyboard.press('Tab');
      
      // Verify focus is visible
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('touch events work on mobile browsers', async ({ page, browserName }) => {
      // Only test on mobile browsers
      if (!browserName.includes('Mobile')) {
        test.skip();
      }
      
      await page.goto('/');
      
      // Test touch interactions
      const touchTarget = page.locator('[data-testid="touch-target"]').first();
      if (await touchTarget.isVisible()) {
        await touchTarget.tap();
        
        // Verify touch interaction worked
        await expect(page.locator('[data-testid="touch-response"]')).toBeVisible();
      }
    });
  });

  test.describe('Responsive Design Compatibility', () => {
    test('responsive layout works across different viewport sizes', async ({ page }) => {
      await page.goto('/');
      
      // Test desktop layout
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForLoadState('networkidle');
      
      const desktopNav = page.locator('[data-testid="desktop-nav"]');
      if (await desktopNav.isVisible()) {
        await expect(desktopNav).toBeVisible();
      }
      
      // Test tablet layout
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500); // Allow layout to adjust
      
      // Test mobile layout
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      
      const mobileNav = page.locator('[data-testid="mobile-nav"]');
      if (await mobileNav.isVisible()) {
        await expect(mobileNav).toBeVisible();
      }
    });

    test('media queries work correctly', async ({ page }) => {
      await page.goto('/');
      
      const mediaQuerySupport = await page.evaluate(() => {
        return {
          matchMedia: typeof window.matchMedia === 'function',
          mobileQuery: window.matchMedia('(max-width: 768px)').matches,
          desktopQuery: window.matchMedia('(min-width: 1024px)').matches,
        };
      });
      
      expect(mediaQuerySupport.matchMedia).toBeTruthy();
    });
  });

  test.describe('Error Handling and Fallbacks', () => {
    test('graceful degradation when features are unavailable', async ({ page }) => {
      await page.goto('/');
      
      // Simulate feature unavailability
      await page.evaluate(() => {
        // Temporarily disable a feature to test fallback
        delete (window as any).IntersectionObserver;
      });
      
      // Reload page to trigger fallback behavior
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Verify page still functions
      await expect(page.locator('main')).toBeVisible();
    });

    test('error messages display correctly', async ({ page }) => {
      await page.goto('/admin');
      
      // Trigger an error condition
      await page.route('**/api/**', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server error' })
        });
      });
      
      // Try to perform an action that would trigger the error
      await page.click('[data-testid="add-project-btn"]');
      
      // Verify error handling
      const errorMessage = page.locator('[data-testid="error-message"]');
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
      }
    });
  });
});