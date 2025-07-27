import { Page, BrowserContext, expect } from '@playwright/test';

/**
 * Browser utility functions for cross-browser testing
 * Provides common functionality for browser detection, feature testing, and compatibility checks
 */

export interface BrowserInfo {
  name: 'chrome' | 'firefox' | 'safari' | 'edge' | 'unknown';
  version: number;
  userAgent: string;
  isSupported: boolean;
  features: {
    fetch: boolean;
    promises: boolean;
    asyncAwait: boolean;
    cssGrid: boolean;
    cssFlexbox: boolean;
    customProperties: boolean;
    intersectionObserver: boolean;
    webp: boolean;
    mp4: boolean;
    webm: boolean;
  };
}

export class BrowserTestUtils {
  constructor(private page: Page) {}

  /**
   * Get comprehensive browser information
   */
  async getBrowserInfo(): Promise<BrowserInfo> {
    return await this.page.evaluate(async () => {
      const userAgent = navigator.userAgent;
      
      // Browser detection
      const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
      const isFirefox = /Firefox/.test(userAgent);
      const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
      const isEdge = /Edge/.test(userAgent) || /Edg/.test(userAgent);
      
      let name: 'chrome' | 'firefox' | 'safari' | 'edge' | 'unknown' = 'unknown';
      if (isChrome) name = 'chrome';
      else if (isFirefox) name = 'firefox';
      else if (isSafari) name = 'safari';
      else if (isEdge) name = 'edge';
      
      // Version extraction
      let version = 0;
      if (/Chrome\/(\d+)/.test(userAgent)) {
        version = parseInt(RegExp.$1);
      } else if (/Firefox\/(\d+)/.test(userAgent)) {
        version = parseInt(RegExp.$1);
      } else if (/Version\/(\d+).*Safari/.test(userAgent)) {
        version = parseInt(RegExp.$1);
      } else if (/Edg\/(\d+)/.test(userAgent)) {
        version = parseInt(RegExp.$1);
      }
      
      // Feature detection
      const features = {
        fetch: typeof fetch !== 'undefined',
        promises: typeof Promise !== 'undefined',
        asyncAwait: (async () => {
          try {
            const test = async () => await Promise.resolve(true);
            return await test();
          } catch {
            return false;
          }
        })(),
        cssGrid: CSS.supports('display', 'grid'),
        cssFlexbox: CSS.supports('display', 'flex'),
        customProperties: CSS.supports('color', 'var(--test)'),
        intersectionObserver: typeof IntersectionObserver !== 'undefined',
        webp: await new Promise<boolean>((resolve) => {
          const webP = new Image();
          webP.onload = webP.onerror = () => resolve(webP.height === 2);
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        }),
        mp4: (() => {
          const video = document.createElement('video');
          return video.canPlayType('video/mp4') !== '';
        })(),
        webm: (() => {
          const video = document.createElement('video');
          return video.canPlayType('video/webm') !== '';
        })()
      };
      
      // Resolve async features
      const asyncAwait = await features.asyncAwait;
      const webp = await features.webp;
      
      return {
        name,
        version,
        userAgent,
        isSupported: version >= 80, // Minimum supported version
        features: {
          ...features,
          asyncAwait,
          webp
        }
      };
    });
  }

  /**
   * Wait for page to be fully loaded with all resources
   */
  async waitForFullLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForFunction(() => document.readyState === 'complete');
    
    // Wait for any lazy-loaded content
    await this.page.waitForTimeout(1000);
  }

  /**
   * Take a screenshot with consistent settings
   */
  async takeScreenshot(name: string, options: { fullPage?: boolean; threshold?: number } = {}): Promise<void> {
    await expect(this.page).toHaveScreenshot(name, {
      fullPage: options.fullPage || false,
      threshold: options.threshold || 0.2,
      animations: 'disabled',
    });
  }

  /**
   * Test responsive behavior at different viewport sizes
   */
  async testResponsiveLayout(sizes: Array<{ width: number; height: number; name: string }>): Promise<void> {
    for (const size of sizes) {
      await this.page.setViewportSize({ width: size.width, height: size.height });
      await this.page.waitForTimeout(500); // Allow layout to adjust
      
      await this.takeScreenshot(`responsive-${size.name}.png`, { fullPage: true });
    }
  }

  /**
   * Measure page performance metrics
   */
  async getPerformanceMetrics(): Promise<{
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
  }> {
    return await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation.loadEventEnd - (navigation as any).navigationStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - (navigation as any).navigationStart,
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };
    });
  }

  /**
   * Test file upload functionality
   */
  async testFileUpload(selector: string, filePath: string): Promise<void> {
    const fileInput = this.page.locator(selector);
    await expect(fileInput).toBeVisible();
    await fileInput.setInputFiles(filePath);
  }

  /**
   * Test form validation
   */
  async testFormValidation(formSelector: string, submitSelector: string): Promise<boolean> {
    const form = this.page.locator(formSelector);
    const submitButton = this.page.locator(submitSelector);
    
    await submitButton.click();
    
    // Check for validation messages
    const validationErrors = this.page.locator('[data-testid*="error"], .error, [aria-invalid="true"]');
    const hasValidationErrors = await validationErrors.count() > 0;
    
    return hasValidationErrors;
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation(): Promise<boolean> {
    await this.page.keyboard.press('Tab');
    const focusedElement = this.page.locator(':focus');
    return await focusedElement.count() > 0;
  }

  /**
   * Test touch interactions (for mobile browsers)
   */
  async testTouchInteraction(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    await element.tap();
  }

  /**
   * Simulate network conditions
   */
  async simulateSlowNetwork(): Promise<void> {
    const context = this.page.context();
    await context.route('**/*', async (route) => {
      // Add delay to simulate slow network
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
  }

  /**
   * Test error handling
   */
  async simulateServerError(apiPattern: string = '**/api/**'): Promise<void> {
    await this.page.route(apiPattern, route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });
  }

  /**
   * Check for console errors
   */
  async getConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    return errors;
  }

  /**
   * Test accessibility features
   */
  async testAccessibility(): Promise<{
    hasAriaLabels: boolean;
    hasAltTexts: boolean;
    hasProperHeadings: boolean;
  }> {
    return await this.page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const buttons = document.querySelectorAll('button, [role="button"]');
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      const hasAltTexts = Array.from(images).every(img => 
        img.hasAttribute('alt') || img.hasAttribute('aria-label')
      );
      
      const hasAriaLabels = Array.from(buttons).every(btn => 
        btn.textContent?.trim() || btn.hasAttribute('aria-label') || btn.hasAttribute('title')
      );
      
      const hasProperHeadings = headings.length > 0;
      
      return {
        hasAriaLabels,
        hasAltTexts,
        hasProperHeadings
      };
    });
  }

  /**
   * Test media playback
   */
  async testVideoPlayback(videoSelector: string): Promise<{
    canPlay: boolean;
    hasControls: boolean;
    hasPoster: boolean;
  }> {
    const video = this.page.locator(videoSelector);
    
    return await video.evaluate((videoElement: HTMLVideoElement) => {
      return {
        canPlay: !videoElement.error && videoElement.readyState >= 2,
        hasControls: videoElement.hasAttribute('controls'),
        hasPoster: videoElement.hasAttribute('poster') && videoElement.poster !== ''
      };
    });
  }
}

/**
 * Common test data and utilities
 */
export const TestData = {
  viewportSizes: [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1920, height: 1080, name: 'desktop' }
  ],
  
  supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  supportedVideoFormats: ['mp4', 'webm'],
  
  maxFileSizes: {
    image: 2 * 1024 * 1024, // 2MB
    video: 50 * 1024 * 1024  // 50MB
  },
  
  performanceThresholds: {
    loadTime: 5000,
    domContentLoaded: 3000,
    firstContentfulPaint: 2000
  }
};

/**
 * Browser-specific test configurations
 */
export const BrowserConfigs = {
  chrome: {
    expectedFeatures: ['fetch', 'promises', 'cssGrid', 'webp', 'mp4', 'webm'],
    performanceMultiplier: 1.0
  },
  firefox: {
    expectedFeatures: ['fetch', 'promises', 'cssGrid', 'mp4', 'webm'],
    performanceMultiplier: 1.1
  },
  safari: {
    expectedFeatures: ['fetch', 'promises', 'cssGrid', 'mp4'],
    performanceMultiplier: 1.2,
    skipWebM: true
  },
  edge: {
    expectedFeatures: ['fetch', 'promises', 'cssGrid', 'webp', 'mp4', 'webm'],
    performanceMultiplier: 1.0
  }
};