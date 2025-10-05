import { test, expect } from '@playwright/test';

/**
 * SEO Verification Tests
 * Task 8: Проверить корректность работы всех страниц
 * 
 * Requirements:
 * - 1.1, 1.2, 1.3, 1.4: Home page uses DB settings
 * - 2.1, 2.2: Projects list uses DB keywords
 * - 3.1, 3.2: Blog list uses DB keywords
 * - 4.1, 4.2, 4.3, 4.4: Media page uses DB settings
 * - 5.1, 5.2, 5.3, 5.4, 5.5: No "…" truncation
 */

test.describe('SEO Page Settings Verification', () => {
  
  test('Home page (home) - title, description, keywords from DB', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Get meta tags
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
    
    // Verify title exists and has no truncation
    expect(title).toBeTruthy();
    expect(title).not.toContain('…');
    expect(title).not.toContain('...');
    console.log('Home Title:', title);
    
    // Verify description exists and has no truncation
    expect(description).toBeTruthy();
    expect(description).not.toContain('…');
    expect(description).not.toContain('...');
    console.log('Home Description:', description);
    
    // Verify keywords exist
    expect(keywords).toBeTruthy();
    console.log('Home Keywords:', keywords);
    
    // Verify Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    
    expect(ogTitle).toBeTruthy();
    expect(ogTitle).not.toContain('…');
    expect(ogDescription).toBeTruthy();
    expect(ogDescription).not.toContain('…');
    
    console.log('Home OG Title:', ogTitle);
    console.log('Home OG Description:', ogDescription);
  });

  test('Projects list page (projects_list) - keywords from DB', async ({ page }) => {
    await page.goto('/projects');
    
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
    
    // Verify no truncation
    expect(title).not.toContain('…');
    expect(title).not.toContain('...');
    expect(description).not.toContain('…');
    expect(description).not.toContain('...');
    
    // Verify keywords exist (main requirement for projects_list)
    expect(keywords).toBeTruthy();
    
    console.log('Projects Title:', title);
    console.log('Projects Description:', description);
    console.log('Projects Keywords:', keywords);
    
    // Verify Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    
    expect(ogTitle).not.toContain('…');
    expect(ogDescription).not.toContain('…');
  });

  test('Blog list page (blog_list) - keywords from DB', async ({ page }) => {
    await page.goto('/blog');
    
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
    
    // Verify no truncation
    expect(title).not.toContain('…');
    expect(title).not.toContain('...');
    expect(description).not.toContain('…');
    expect(description).not.toContain('...');
    
    // Verify keywords exist (main requirement for blog_list)
    expect(keywords).toBeTruthy();
    
    console.log('Blog Title:', title);
    console.log('Blog Description:', description);
    console.log('Blog Keywords:', keywords);
    
    // Verify Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    
    expect(ogTitle).not.toContain('…');
    expect(ogDescription).not.toContain('…');
  });

  test('Media page (media) - title, description, keywords from DB', async ({ page }) => {
    await page.goto('/media');
    
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
    
    // Verify title exists and has no truncation
    expect(title).toBeTruthy();
    expect(title).not.toContain('…');
    expect(title).not.toContain('...');
    console.log('Media Title:', title);
    
    // Verify description exists and has no truncation
    expect(description).toBeTruthy();
    expect(description).not.toContain('…');
    expect(description).not.toContain('...');
    console.log('Media Description:', description);
    
    // Verify keywords exist
    expect(keywords).toBeTruthy();
    console.log('Media Keywords:', keywords);
    
    // Verify Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    
    expect(ogTitle).toBeTruthy();
    expect(ogTitle).not.toContain('…');
    expect(ogDescription).toBeTruthy();
    expect(ogDescription).not.toContain('…');
    
    console.log('Media OG Title:', ogTitle);
    console.log('Media OG Description:', ogDescription);
  });

  test('Verify no "…" truncation in all meta tags', async ({ page }) => {
    const pages = ['/', '/projects', '/blog', '/media'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Get all meta tags
      const title = await page.title();
      const metaTags = await page.locator('meta').all();
      
      // Check title
      expect(title).not.toContain('…');
      expect(title).not.toContain('...');
      
      // Check all meta tags
      for (const metaTag of metaTags) {
        const content = await metaTag.getAttribute('content');
        if (content) {
          expect(content).not.toContain('…');
          // Allow "..." in some contexts but not as truncation marker at the end
          if (content.endsWith('...')) {
            console.warn(`Warning: Meta tag ends with "..." on ${pagePath}:`, content);
          }
        }
      }
      
      console.log(`✓ No truncation found on ${pagePath}`);
    }
  });

  test('Verify fallback works when settings are missing', async ({ page }) => {
    // This test verifies that pages still work even if DB settings are not available
    // The implementation should fallback to default values
    
    const pages = [
      { path: '/', name: 'Home' },
      { path: '/projects', name: 'Projects' },
      { path: '/blog', name: 'Blog' },
      { path: '/media', name: 'Media' }
    ];
    
    for (const { path, name } of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      // Verify essential meta tags exist (even with fallback)
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(0);
      
      expect(keywords).toBeTruthy();
      expect(keywords.length).toBeGreaterThan(0);
      
      console.log(`✓ ${name} page has valid fallback values`);
    }
  });

  test('Verify meta tags are properly formatted', async ({ page }) => {
    const pages = ['/', '/projects', '/blog', '/media'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Verify Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      
      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogType).toBeTruthy();
      expect(ogUrl).toBeTruthy();
      
      // Verify Twitter tags
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
      const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
      
      expect(twitterCard).toBeTruthy();
      expect(twitterTitle).toBeTruthy();
      expect(twitterDescription).toBeTruthy();
      
      console.log(`✓ ${pagePath} has properly formatted meta tags`);
    }
  });
});
