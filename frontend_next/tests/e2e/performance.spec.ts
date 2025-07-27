import { test, expect } from '@playwright/test';

/**
 * Performance tests to measure impact of compatibility layers
 * Tests loading times, bundle sizes, and runtime performance across browsers
 */

test.describe('Cross-Browser Performance Tests', () => {
  
  test.describe('Page Load Performance', () => {
    test('homepage loads within acceptable time limits', async ({ page, browserName }) => {
      const startTime = Date.now();
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      
      // Performance thresholds (in milliseconds)
      const maxLoadTime = browserName === 'webkit' ? 5000 : 4000; // Safari may be slower
      
      expect(loadTime).toBeLessThan(maxLoadTime);
      
      console.log(`${browserName} homepage load time: ${loadTime}ms`);
    });

    test('projects page loads efficiently', async ({ page, browserName }) => {
      const startTime = Date.now();
      
      await page.goto('/projects', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      const maxLoadTime = browserName === 'webkit' ? 6000 : 5000;
      
      expect(loadTime).toBeLessThan(maxLoadTime);
      
      console.log(`${browserName} projects page load time: ${loadTime}ms`);
    });

    test('admin interface loads within reasonable time', async ({ page, browserName }) => {
      const startTime = Date.now();
      
      await page.goto('/admin', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      const maxLoadTime = browserName === 'webkit' ? 7000 : 6000;
      
      expect(loadTime).toBeLessThan(maxLoadTime);
      
      console.log(`${browserName} admin interface load time: ${loadTime}ms`);
    });
  });

  test.describe('Bundle Size and Resource Loading', () => {
    test('measures JavaScript bundle sizes', async ({ page }) => {
      const responses: Array<{ url: string; size: number; type: string }> = [];
      
      page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('.js') && !url.includes('node_modules')) {
          const buffer = await response.body().catch(() => null);
          if (buffer) {
            responses.push({
              url,
              size: buffer.length,
              type: 'javascript'
            });
          }
        }
      });
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      const totalJSSize = responses.reduce((sum, res) => sum + res.size, 0);
      const totalJSSizeKB = Math.round(totalJSSize / 1024);
      
      // Log bundle sizes for analysis
      console.log(`Total JavaScript bundle size: ${totalJSSizeKB}KB`);
      responses.forEach(res => {
        console.log(`  ${res.url}: ${Math.round(res.size / 1024)}KB`);
      });
      
      // Reasonable bundle size limit (adjust based on your app)
      expect(totalJSSizeKB).toBeLessThan(2000); // 2MB limit
    });

    test('measures CSS bundle sizes', async ({ page }) => {
      const cssResponses: Array<{ url: string; size: number }> = [];
      
      page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('.css') && !url.includes('node_modules')) {
          const buffer = await response.body().catch(() => null);
          if (buffer) {
            cssResponses.push({
              url,
              size: buffer.length
            });
          }
        }
      });
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      const totalCSSSize = cssResponses.reduce((sum, res) => sum + res.size, 0);
      const totalCSSSizeKB = Math.round(totalCSSSize / 1024);
      
      console.log(`Total CSS bundle size: ${totalCSSSizeKB}KB`);
      
      // Reasonable CSS bundle size limit
      expect(totalCSSSizeKB).toBeLessThan(500); // 500KB limit
    });

    test('measures polyfill loading impact', async ({ page, browserName }) => {
      let polyfillRequests = 0;
      let polyfillSize = 0;
      
      page.on('request', (request) => {
        const url = request.url();
        if (url.includes('polyfill') || url.includes('core-js')) {
          polyfillRequests++;
        }
      });
      
      page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('polyfill') || url.includes('core-js')) {
          const buffer = await response.body().catch(() => null);
          if (buffer) {
            polyfillSize += buffer.length;
          }
        }
      });
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      console.log(`${browserName} polyfill requests: ${polyfillRequests}`);
      console.log(`${browserName} polyfill size: ${Math.round(polyfillSize / 1024)}KB`);
      
      // Modern browsers should require fewer polyfills
      if (['chromium', 'firefox'].includes(browserName)) {
        expect(polyfillRequests).toBeLessThan(5);
      }
    });
  });

  test.describe('Runtime Performance', () => {
    test('measures JavaScript execution performance', async ({ page, browserName }) => {
      await page.goto('/');
      
      const performanceMetrics = await page.evaluate(() => {
        const start = performance.now();
        
        // Simulate some JavaScript operations
        const iterations = 100000;
        let result = 0;
        for (let i = 0; i < iterations; i++) {
          result += Math.random();
        }
        
        const executionTime = performance.now() - start;
        
        return {
          executionTime,
          result: result > 0 // Just to use the result
        };
      });
      
      console.log(`${browserName} JS execution time: ${performanceMetrics.executionTime.toFixed(2)}ms`);
      
      // Reasonable execution time limit
      expect(performanceMetrics.executionTime).toBeLessThan(100);
    });

    test('measures DOM manipulation performance', async ({ page, browserName }) => {
      await page.goto('/');
      
      const domPerformance = await page.evaluate(() => {
        const start = performance.now();
        
        // Create and manipulate DOM elements
        const container = document.createElement('div');
        for (let i = 0; i < 1000; i++) {
          const element = document.createElement('div');
          element.textContent = `Element ${i}`;
          element.className = 'test-element';
          container.appendChild(element);
        }
        
        // Add to DOM
        document.body.appendChild(container);
        
        // Query and modify elements
        const elements = container.querySelectorAll('.test-element');
        elements.forEach((el, index) => {
          if (index % 2 === 0) {
            el.classList.add('even');
          }
        });
        
        const manipulationTime = performance.now() - start;
        
        // Clean up
        document.body.removeChild(container);
        
        return manipulationTime;
      });
      
      console.log(`${browserName} DOM manipulation time: ${domPerformance.toFixed(2)}ms`);
      
      // Reasonable DOM manipulation time limit
      expect(domPerformance).toBeLessThan(200);
    });

    test('measures CSS animation performance', async ({ page, browserName }) => {
      await page.goto('/');
      
      const animationPerformance = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          const element = document.createElement('div');
          element.style.cssText = `
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            top: 0;
            left: 0;
            transition: transform 1s ease;
          `;
          
          document.body.appendChild(element);
          
          const start = performance.now();
          
          // Trigger animation
          element.style.transform = 'translateX(200px)';
          
          element.addEventListener('transitionend', () => {
            const animationTime = performance.now() - start;
            document.body.removeChild(element);
            resolve(animationTime);
          });
        });
      });
      
      console.log(`${browserName} CSS animation time: ${animationPerformance.toFixed(2)}ms`);
      
      // Animation should complete within reasonable time
      expect(animationPerformance).toBeLessThan(1500);
    });
  });

  test.describe('Memory Usage', () => {
    test('measures memory usage during navigation', async ({ page, browserName }) => {
      // Navigate through multiple pages to test memory usage
      const pages = ['/', '/projects', '/about', '/contact'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath, { waitUntil: 'networkidle' });
        
        const memoryInfo = await page.evaluate(() => {
          // @ts-ignore - performance.memory is available in Chrome
          if (performance.memory) {
            return {
              usedJSHeapSize: performance.memory.usedJSHeapSize,
              totalJSHeapSize: performance.memory.totalJSHeapSize,
              jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            };
          }
          return null;
        });
        
        if (memoryInfo) {
          const usedMB = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024);
          console.log(`${browserName} memory usage on ${pagePath}: ${usedMB}MB`);
          
          // Reasonable memory usage limit
          expect(usedMB).toBeLessThan(100);
        }
      }
    });
  });

  test.describe('Network Performance', () => {
    test('measures resource loading times', async ({ page, browserName }) => {
      const resourceTimes: Array<{ url: string; duration: number; size: number }> = [];
      
      page.on('response', async (response) => {
        const request = response.request();
        const timing = request.timing();
        const url = response.url();
        
        if (!url.includes('data:') && !url.includes('blob:')) {
          const buffer = await response.body().catch(() => null);
          const size = buffer ? buffer.length : 0;
          
          resourceTimes.push({
            url,
            duration: timing.responseEnd - timing.requestStart,
            size
          });
        }
      });
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      // Analyze resource loading performance
      const slowResources = resourceTimes.filter(r => r.duration > 2000);
      const largeResources = resourceTimes.filter(r => r.size > 1024 * 1024); // > 1MB
      
      console.log(`${browserName} slow resources (>2s):`, slowResources.length);
      console.log(`${browserName} large resources (>1MB):`, largeResources.length);
      
      // Log details of problematic resources
      slowResources.forEach(resource => {
        console.log(`  Slow: ${resource.url} (${resource.duration}ms)`);
      });
      
      largeResources.forEach(resource => {
        console.log(`  Large: ${resource.url} (${Math.round(resource.size / 1024)}KB)`);
      });
      
      // Performance assertions
      expect(slowResources.length).toBeLessThan(3); // Max 2 slow resources
      expect(largeResources.length).toBeLessThan(5); // Max 4 large resources
    });
  });

  test.describe('Compatibility Layer Performance Impact', () => {
    test('measures polyfill loading overhead', async ({ page, browserName }) => {
      let polyfillLoadTime = 0;
      let polyfillCount = 0;
      
      page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('polyfill') || url.includes('core-js')) {
          const timing = response.request().timing();
          polyfillLoadTime += timing.responseEnd - timing.requestStart;
          polyfillCount++;
        }
      });
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      console.log(`${browserName} polyfill load time: ${polyfillLoadTime}ms (${polyfillCount} files)`);
      
      // Polyfill loading should not significantly impact performance
      expect(polyfillLoadTime).toBeLessThan(1000); // Max 1 second for all polyfills
    });

    test('measures CSS fallback rendering performance', async ({ page, browserName }) => {
      await page.goto('/');
      
      const cssPerformance = await page.evaluate(() => {
        const start = performance.now();
        
        // Force style recalculation
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          window.getComputedStyle(el).display;
        });
        
        return performance.now() - start;
      });
      
      console.log(`${browserName} CSS rendering time: ${cssPerformance.toFixed(2)}ms`);
      
      // CSS rendering should be efficient
      expect(cssPerformance).toBeLessThan(500);
    });
  });

  test.describe('Performance Comparison Across Browsers', () => {
    test('compares overall page performance metrics', async ({ page, browserName }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      
      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
          domInteractive: navigation.domInteractive - navigation.navigationStart,
        };
      });
      
      console.log(`${browserName} performance metrics:`, {
        domContentLoaded: `${performanceMetrics.domContentLoaded.toFixed(2)}ms`,
        loadComplete: `${performanceMetrics.loadComplete.toFixed(2)}ms`,
        firstPaint: `${performanceMetrics.firstPaint.toFixed(2)}ms`,
        firstContentfulPaint: `${performanceMetrics.firstContentfulPaint.toFixed(2)}ms`,
        domInteractive: `${performanceMetrics.domInteractive.toFixed(2)}ms`,
      });
      
      // Performance thresholds
      expect(performanceMetrics.domContentLoaded).toBeLessThan(3000);
      expect(performanceMetrics.loadComplete).toBeLessThan(5000);
      if (performanceMetrics.firstContentfulPaint > 0) {
        expect(performanceMetrics.firstContentfulPaint).toBeLessThan(2000);
      }
    });
  });
});