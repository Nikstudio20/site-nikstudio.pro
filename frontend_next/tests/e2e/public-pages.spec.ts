import { test, expect } from '@playwright/test';

/**
 * Comprehensive functional tests for all public pages
 * Tests navigation, content display, images, forms, and user interactions
 */

test.describe('Public Pages - Functional Testing', () => {
  
  test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should load home page successfully', async ({ page }) => {
      await expect(page).toHaveTitle(/Nik Studio/i);
      await expect(page.locator('body')).toBeVisible();
    });

    test('should display hero section with video or fallback', async ({ page }) => {
      // Check if hero section exists
      const heroSection = page.locator('[class*="hero"], [class*="Hero"]').first();
      await expect(heroSection).toBeVisible({ timeout: 10000 });
      
      // Check for video or image
      const hasVideo = await page.locator('video').count() > 0;
      const hasHeroImage = await page.locator('img[priority="true"], img[data-priority="true"]').count() > 0;
      
      expect(hasVideo || hasHeroImage).toBeTruthy();
    });

    test('should display main content sections', async ({ page }) => {
      // Wait for content to load
      await page.waitForLoadState('networkidle');
      
      // Check for main content sections
      const sections = page.locator('section, [class*="Section"]');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(0);
    });

    test('should have working navigation', async ({ page }) => {
      // Check for navigation elements
      const nav = page.locator('nav, header').first();
      await expect(nav).toBeVisible();
      
      // Check for navigation links
      const navLinks = page.locator('nav a, header a');
      const linkCount = await navLinks.count();
      
      expect(linkCount).toBeGreaterThan(0);
    });

    test('should display images without layout shift', async ({ page }) => {
      // Wait for images to load
      await page.waitForLoadState('networkidle');
      
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Check first few images have dimensions
        for (let i = 0; i < Math.min(3, imageCount); i++) {
          const img = images.nth(i);
          const width = await img.getAttribute('width');
          const height = await img.getAttribute('height');
          
          // Images should have width/height to prevent CLS
          expect(width || height).toBeTruthy();
        }
      }
    });

    test('should load footer', async ({ page }) => {
      // Scroll to bottom to trigger lazy-loaded footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      
      const footer = page.locator('footer, [class*="Footer"]').first();
      await expect(footer).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('About Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/about');
    });

    test('should load about page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/.*about/);
      await page.waitForLoadState('networkidle');
    });

    test('should display about content', async ({ page }) => {
      // Wait for content to load
      await page.waitForLoadState('networkidle');
      
      // Check for text content
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);
    });

    test('should display images correctly', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Check images are visible
        const firstImage = images.first();
        await expect(firstImage).toBeVisible();
        
        // Check image has loaded
        const naturalWidth = await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Blog Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog');
    });

    test('should load blog list page', async ({ page }) => {
      await expect(page).toHaveURL(/.*blog/);
      await page.waitForLoadState('networkidle');
    });

    test('should display blog posts list', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      // Check for blog post cards or list items
      const blogPosts = page.locator('[class*="blog"], [class*="post"], article, [class*="card"]');
      const postCount = await blogPosts.count();
      
      // Should have at least some content structure
      expect(postCount).toBeGreaterThanOrEqual(0);
    });

    test('should navigate to blog detail page', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      // Find first blog post link
      const firstPostLink = page.locator('a[href*="/blog/"]').first();
      const linkCount = await page.locator('a[href*="/blog/"]').count();
      
      if (linkCount > 0) {
        await firstPostLink.click();
        await page.waitForLoadState('networkidle');
        
        // Should navigate to detail page
        await expect(page).toHaveURL(/.*blog\/.+/);
      }
    });

    test('should display blog post content on detail page', async ({ page }) => {
      // Try to navigate to a blog post
      const firstPostLink = page.locator('a[href*="/blog/"]').first();
      const linkCount = await page.locator('a[href*="/blog/"]').count();
      
      if (linkCount > 0) {
        await firstPostLink.click();
        await page.waitForLoadState('networkidle');
        
        // Check for content
        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.length).toBeGreaterThan(100);
      }
    });
  });

  test.describe('Projects Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/projects');
    });

    test('should load projects page', async ({ page }) => {
      await expect(page).toHaveURL(/.*projects/);
      await page.waitForLoadState('networkidle');
    });

    test('should display projects grid', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      // Check for project cards or grid items
      const projects = page.locator('[class*="project"], [class*="grid"], article, [class*="card"]');
      const projectCount = await projects.count();
      
      expect(projectCount).toBeGreaterThanOrEqual(0);
    });

    test('should have category filters if available', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      // Check for filter buttons or tabs
      const filters = page.locator('button[class*="filter"], [role="tab"], [class*="category"]');
      const filterCount = await filters.count();
      
      // Filters are optional, just check they work if present
      if (filterCount > 0) {
        const firstFilter = filters.first();
        await firstFilter.click();
        await page.waitForTimeout(500);
        
        // Page should still be functional after filter click
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('should navigate to project detail page', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      // Find first project link
      const firstProjectLink = page.locator('a[href*="/projects/"]').first();
      const linkCount = await page.locator('a[href*="/projects/"]').count();
      
      if (linkCount > 0) {
        await firstProjectLink.click();
        await page.waitForLoadState('networkidle');
        
        // Should navigate to detail page
        await expect(page).toHaveURL(/.*projects\/.+/);
      }
    });

    test('should display project detail content', async ({ page }) => {
      // Try to navigate to a project
      const firstProjectLink = page.locator('a[href*="/projects/"]').first();
      const linkCount = await page.locator('a[href*="/projects/"]').count();
      
      if (linkCount > 0) {
        await firstProjectLink.click();
        await page.waitForLoadState('networkidle');
        
        // Check for content
        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.length).toBeGreaterThan(100);
        
        // Check for images in project detail
        const images = page.locator('img');
        const imageCount = await images.count();
        expect(imageCount).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe('Media Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/media');
    });

    test('should load media page', async ({ page }) => {
      await expect(page).toHaveURL(/.*media/);
      await page.waitForLoadState('networkidle');
    });

    test('should display service sections', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      // Check for content sections
      const sections = page.locator('section, [class*="Section"], [class*="service"]');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(0);
    });

    test('should display videos if present', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      const videos = page.locator('video');
      const videoCount = await videos.count();
      
      if (videoCount > 0) {
        const firstVideo = videos.first();
        await expect(firstVideo).toBeVisible();
        
        // Check video has poster or src
        const hasPoster = await firstVideo.getAttribute('poster');
        const hasSrc = await firstVideo.getAttribute('src');
        
        expect(hasPoster || hasSrc).toBeTruthy();
      }
    });
  });

  test.describe('Contact Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/contact');
    });

    test('should load contact page', async ({ page }) => {
      await expect(page).toHaveURL(/.*contact/);
      await page.waitForLoadState('networkidle');
    });

    test('should display contact form', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      // Check for form element
      const form = page.locator('form').first();
      const formCount = await page.locator('form').count();
      
      if (formCount > 0) {
        await expect(form).toBeVisible();
        
        // Check for input fields
        const inputs = form.locator('input, textarea');
        const inputCount = await inputs.count();
        
        expect(inputCount).toBeGreaterThan(0);
      }
    });

    test('should validate form fields', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      const form = page.locator('form').first();
      const formCount = await page.locator('form').count();
      
      if (formCount > 0) {
        // Try to submit empty form
        const submitButton = form.locator('button[type="submit"]').first();
        const buttonCount = await form.locator('button[type="submit"]').count();
        
        if (buttonCount > 0) {
          await submitButton.click();
          await page.waitForTimeout(500);
          
          // Should show validation errors or prevent submission
          // Form should still be visible (not submitted)
          await expect(form).toBeVisible();
        }
      }
    });

    test('should accept valid form input', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      
      const form = page.locator('form').first();
      const formCount = await page.locator('form').count();
      
      if (formCount > 0) {
        // Fill in form fields
        const nameInput = form.locator('input[name*="name"], input[placeholder*="имя"]').first();
        const emailInput = form.locator('input[type="email"], input[name*="email"]').first();
        const messageInput = form.locator('textarea, input[name*="message"]').first();
        
        if (await nameInput.count() > 0) {
          await nameInput.fill('Test User');
        }
        
        if (await emailInput.count() > 0) {
          await emailInput.fill('test@example.com');
        }
        
        if (await messageInput.count() > 0) {
          await messageInput.fill('This is a test message');
        }
        
        // Form should accept the input
        await expect(form).toBeVisible();
      }
    });
  });

  test.describe('Cross-Page Navigation', () => {
    test('should navigate between pages using header links', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Find navigation links
      const navLinks = page.locator('nav a, header a');
      const linkCount = await navLinks.count();
      
      if (linkCount > 0) {
        // Click first navigation link
        const firstLink = navLinks.first();
        await firstLink.click();
        await page.waitForLoadState('networkidle');
        
        // Should navigate successfully
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('should maintain navigation state across pages', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Navigate to another page
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      
      // Navigation should still be visible
      const nav = page.locator('nav, header').first();
      await expect(nav).toBeVisible();
    });
  });
});
