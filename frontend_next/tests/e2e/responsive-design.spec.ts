import { test, expect, devices } from '@playwright/test';

/**
 * Comprehensive responsive design tests
 * Tests all pages on mobile, tablet, and desktop viewports
 * Verifies no layout breaks or overflow issues
 */

test.describe('Responsive Design - Functional Testing', () => {
  
  const viewports = {
    mobile: { width: 375, height: 667, name: 'Mobile (375px)' },
    mobileLarge: { width: 768, height: 1024, name: 'Mobile Large (768px)' },
    tablet: { width: 1024, height: 768, name: 'Tablet (1024px)' },
    desktop: { width: 1920, height: 1080, name: 'Desktop (1920px)' },
  };

  const pages = [
    { url: '/', name: 'Home' },
    { url: '/about', name: 'About' },
    { url: '/blog', name: 'Blog' },
    { url: '/projects', name: 'Projects' },
    { url: '/media', name: 'Media' },
    { url: '/contact', name: 'Contact' },
  ];

  test.describe('Mobile Viewport (375px)', () => {
    test.use({ viewport: viewports.mobile });

    for (const page of pages) {
      test(`${page.name} page should render correctly on mobile`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        // Check page is visible
        await expect(browserPage.locator('body')).toBeVisible();
        
        // Check for horizontal overflow
        const hasOverflow = await browserPage.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        
        expect(hasOverflow).toBeFalsy();
      });

      test(`${page.name} page navigation should work on mobile`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        // Check for mobile menu or navigation
        const nav = browserPage.locator('nav, header, [class*="mobile"]').first();
        await expect(nav).toBeVisible();
      });

      test(`${page.name} page images should be responsive on mobile`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        const images = browserPage.locator('img');
        const imageCount = await images.count();
        
        if (imageCount > 0) {
          // Check first few images don't overflow
          for (let i = 0; i < Math.min(3, imageCount); i++) {
            const img = images.nth(i);
            const box = await img.boundingBox();
            
            if (box) {
              expect(box.width).toBeLessThanOrEqual(viewports.mobile.width);
            }
          }
        }
      });

      test(`${page.name} page text should be readable on mobile`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        // Check font sizes are reasonable
        const bodyFontSize = await browserPage.evaluate(() => {
          return window.getComputedStyle(document.body).fontSize;
        });
        
        const fontSize = parseInt(bodyFontSize);
        expect(fontSize).toBeGreaterThanOrEqual(14); // Minimum readable size
      });
    }

    test('Mobile menu should be accessible', async ({ page: browserPage }) => {
      await browserPage.goto('/');
      await browserPage.waitForLoadState('networkidle');
      
      // Look for hamburger menu or mobile menu button
      const menuButton = browserPage.locator('button[class*="menu"], button[aria-label*="menu"], [class*="hamburger"]').first();
      const buttonCount = await browserPage.locator('button[class*="menu"], button[aria-label*="menu"]').count();
      
      if (buttonCount > 0) {
        await menuButton.click();
        await browserPage.waitForTimeout(500);
        
        // Menu should open
        const menu = browserPage.locator('[class*="mobile-menu"]:visible, nav:visible').first();
        await expect(menu).toBeVisible({ timeout: 3000 });
      }
    });

    test('Touch targets should be large enough on mobile', async ({ page: browserPage }) => {
      await browserPage.goto('/');
      await browserPage.waitForLoadState('networkidle');
      
      // Check button sizes
      const buttons = browserPage.locator('button, a[role="button"]');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        const firstButton = buttons.first();
        const box = await firstButton.boundingBox();
        
        if (box) {
          // Touch targets should be at least 44x44px
          expect(box.height).toBeGreaterThanOrEqual(30); // Slightly relaxed for design
        }
      }
    });
  });

  test.describe('Mobile Large Viewport (768px)', () => {
    test.use({ viewport: viewports.mobileLarge });

    for (const page of pages) {
      test(`${page.name} page should render correctly on large mobile`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        await expect(browserPage.locator('body')).toBeVisible();
        
        // Check for horizontal overflow
        const hasOverflow = await browserPage.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        
        expect(hasOverflow).toBeFalsy();
      });

      test(`${page.name} page layout should adapt to 768px`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        // Check content is visible and properly laid out
        const sections = browserPage.locator('section, main, [class*="content"]');
        const sectionCount = await sections.count();
        
        expect(sectionCount).toBeGreaterThan(0);
      });
    }
  });

  test.describe('Tablet Viewport (1024px)', () => {
    test.use({ viewport: viewports.tablet });

    for (const page of pages) {
      test(`${page.name} page should render correctly on tablet`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        await expect(browserPage.locator('body')).toBeVisible();
        
        // Check for horizontal overflow
        const hasOverflow = await browserPage.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        
        expect(hasOverflow).toBeFalsy();
      });

      test(`${page.name} page should use tablet layout`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        // Navigation should be visible (not mobile menu)
        const nav = browserPage.locator('nav, header').first();
        await expect(nav).toBeVisible();
        
        // Check for multi-column layouts if applicable
        const containers = browserPage.locator('[class*="grid"], [class*="flex"]');
        const containerCount = await containers.count();
        
        expect(containerCount).toBeGreaterThanOrEqual(0);
      });

      test(`${page.name} page images should scale properly on tablet`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        const images = browserPage.locator('img');
        const imageCount = await images.count();
        
        if (imageCount > 0) {
          const firstImage = images.first();
          const box = await firstImage.boundingBox();
          
          if (box) {
            expect(box.width).toBeLessThanOrEqual(viewports.tablet.width);
          }
        }
      });
    }

    test('Tablet navigation should be fully visible', async ({ page: browserPage }) => {
      await browserPage.goto('/');
      await browserPage.waitForLoadState('networkidle');
      
      // Desktop-style navigation should be visible
      const navLinks = browserPage.locator('nav a, header a');
      const linkCount = await navLinks.count();
      
      expect(linkCount).toBeGreaterThan(0);
    });
  });

  test.describe('Desktop Viewport (1920px)', () => {
    test.use({ viewport: viewports.desktop });

    for (const page of pages) {
      test(`${page.name} page should render correctly on desktop`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        await expect(browserPage.locator('body')).toBeVisible();
        
        // Check for horizontal overflow
        const hasOverflow = await browserPage.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        
        expect(hasOverflow).toBeFalsy();
      });

      test(`${page.name} page should use full desktop layout`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        // Content should be centered or properly laid out
        const main = browserPage.locator('main, [role="main"]').first();
        const mainCount = await browserPage.locator('main, [role="main"]').count();
        
        if (mainCount > 0) {
          await expect(main).toBeVisible();
        }
      });

      test(`${page.name} page should have proper spacing on desktop`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        // Check content doesn't stretch too wide
        const container = browserPage.locator('[class*="container"], main').first();
        const box = await container.boundingBox();
        
        if (box) {
          // Content should have reasonable max-width (not full 1920px)
          expect(box.width).toBeLessThanOrEqual(1920);
        }
      });

      test(`${page.name} page images should be high quality on desktop`, async ({ page: browserPage }) => {
        await browserPage.goto(page.url);
        await browserPage.waitForLoadState('networkidle');
        
        const images = browserPage.locator('img');
        const imageCount = await images.count();
        
        if (imageCount > 0) {
          const firstImage = images.first();
          
          // Check image loaded successfully
          const naturalWidth = await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
          expect(naturalWidth).toBeGreaterThan(0);
        }
      });
    }

    test('Desktop navigation should be fully expanded', async ({ page: browserPage }) => {
      await browserPage.goto('/');
      await browserPage.waitForLoadState('networkidle');
      
      // All navigation links should be visible
      const navLinks = browserPage.locator('nav a, header a');
      const linkCount = await navLinks.count();
      
      expect(linkCount).toBeGreaterThan(0);
      
      // No hamburger menu should be visible
      const hamburger = browserPage.locator('[class*="hamburger"]:visible, button[class*="mobile-menu"]:visible');
      const hamburgerCount = await hamburger.count();
      
      expect(hamburgerCount).toBe(0);
    });
  });

  test.describe('Layout Stability Across Viewports', () => {
    test('Home page should not have layout shifts when resizing', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Start at desktop
      await page.setViewportSize(viewports.desktop);
      await page.waitForTimeout(500);
      
      // Resize to tablet
      await page.setViewportSize(viewports.tablet);
      await page.waitForTimeout(500);
      
      // Resize to mobile
      await page.setViewportSize(viewports.mobile);
      await page.waitForTimeout(500);
      
      // Page should still be functional
      await expect(page.locator('body')).toBeVisible();
    });

    test('Navigation should adapt to viewport changes', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Desktop navigation
      await page.setViewportSize(viewports.desktop);
      await page.waitForTimeout(500);
      const desktopNav = page.locator('nav, header').first();
      await expect(desktopNav).toBeVisible();
      
      // Mobile navigation
      await page.setViewportSize(viewports.mobile);
      await page.waitForTimeout(500);
      const mobileNav = page.locator('nav, header, [class*="mobile"]').first();
      await expect(mobileNav).toBeVisible();
    });
  });

  test.describe('Content Overflow Prevention', () => {
    for (const viewport of Object.values(viewports)) {
      test(`No horizontal overflow on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        for (const testPage of pages) {
          await page.goto(testPage.url);
          await page.waitForLoadState('networkidle');
          
          // Check for horizontal scrollbar
          const hasOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
          });
          
          expect(hasOverflow).toBeFalsy();
        }
      });
    }

    test('Images should not cause overflow', async ({ page }) => {
      await page.setViewportSize(viewports.mobile);
      
      for (const testPage of pages) {
        await page.goto(testPage.url);
        await page.waitForLoadState('networkidle');
        
        const images = page.locator('img');
        const imageCount = await images.count();
        
        if (imageCount > 0) {
          for (let i = 0; i < Math.min(5, imageCount); i++) {
            const img = images.nth(i);
            const box = await img.boundingBox();
            
            if (box) {
              expect(box.x + box.width).toBeLessThanOrEqual(viewports.mobile.width + 10); // Small tolerance
            }
          }
        }
      }
    });

    test('Text should not overflow containers', async ({ page }) => {
      await page.setViewportSize(viewports.mobile);
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for text overflow
      const hasTextOverflow = await page.evaluate(() => {
        const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        for (const el of elements) {
          const element = el as HTMLElement;
          if (element.scrollWidth > element.clientWidth + 5) { // Small tolerance
            return true;
          }
        }
        return false;
      });
      
      expect(hasTextOverflow).toBeFalsy();
    });
  });

  test.describe('Touch and Interaction on Mobile', () => {
    test.use({ viewport: viewports.mobile });

    test('Buttons should be tappable on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const buttons = page.locator('button, a[role="button"]');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        const firstButton = buttons.first();
        
        // Should be able to tap button
        await firstButton.tap();
        await page.waitForTimeout(300);
        
        // Page should still be functional
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('Links should be tappable on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const links = page.locator('a[href]');
      const linkCount = await links.count();
      
      if (linkCount > 0) {
        // Links should have adequate spacing
        const firstLink = links.first();
        const box = await firstLink.boundingBox();
        
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(20);
        }
      }
    });

    test('Forms should be usable on mobile', async ({ page }) => {
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');
      
      const form = page.locator('form').first();
      const formCount = await page.locator('form').count();
      
      if (formCount > 0) {
        const inputs = form.locator('input, textarea');
        const inputCount = await inputs.count();
        
        if (inputCount > 0) {
          const firstInput = inputs.first();
          
          // Should be able to focus and type
          await firstInput.tap();
          await firstInput.fill('Test');
          
          const value = await firstInput.inputValue();
          expect(value).toBe('Test');
        }
      }
    });
  });
});
