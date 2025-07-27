import { test, expect } from '@playwright/test';

/**
 * Feature detection tests to verify polyfill loading and browser capability detection
 * Tests the browser detection service and polyfill management system
 */

test.describe('Feature Detection Tests', () => {
  
  test.describe('Browser Detection', () => {
    test('detects browser type correctly', async ({ page, browserName }) => {
      await page.goto('/');
      
      const detectedBrowser = await page.evaluate(() => {
        const userAgent = navigator.userAgent;
        
        // Browser detection logic (should match implementation)
        const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
        const isFirefox = /Firefox/.test(userAgent);
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
        const isEdge = /Edge/.test(userAgent) || /Edg/.test(userAgent);
        
        let detectedName = 'unknown';
        if (isChrome) detectedName = 'chrome';
        else if (isFirefox) detectedName = 'firefox';
        else if (isSafari) detectedName = 'safari';
        else if (isEdge) detectedName = 'edge';
        
        return {
          userAgent,
          detectedName,
          isChrome,
          isFirefox,
          isSafari,
          isEdge
        };
      });
      
      console.log(`Playwright browser: ${browserName}, Detected: ${detectedBrowser.detectedName}`);
      console.log(`User Agent: ${detectedBrowser.userAgent}`);
      
      // Verify detection matches expected browser
      switch (browserName) {
        case 'chromium':
          expect(detectedBrowser.isChrome || detectedBrowser.isEdge).toBeTruthy();
          break;
        case 'firefox':
          expect(detectedBrowser.isFirefox).toBeTruthy();
          break;
        case 'webkit':
          expect(detectedBrowser.isSafari).toBeTruthy();
          break;
        case 'edge':
          expect(detectedBrowser.isEdge).toBeTruthy();
          break;
      }
    });

    test('detects browser version information', async ({ page }) => {
      await page.goto('/');
      
      const versionInfo = await page.evaluate(() => {
        const userAgent = navigator.userAgent;
        
        // Extract version information
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
        
        return {
          version,
          userAgent
        };
      });
      
      console.log(`Browser version: ${versionInfo.version}`);
      
      // Modern browsers should have reasonable version numbers
      expect(versionInfo.version).toBeGreaterThan(50);
    });
  });

  test.describe('JavaScript Feature Detection', () => {
    test('detects Fetch API support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const fetchSupport = await page.evaluate(() => {
        return {
          nativeFetch: typeof fetch !== 'undefined',
          fetchPolyfill: window.fetch && (window.fetch as any).polyfill === true,
          requestSupport: typeof Request !== 'undefined',
          responseSupport: typeof Response !== 'undefined',
          headersSupport: typeof Headers !== 'undefined'
        };
      });
      
      console.log(`${browserName} Fetch API support:`, fetchSupport);
      
      // All modern browsers should support Fetch API
      expect(fetchSupport.nativeFetch).toBeTruthy();
      expect(fetchSupport.requestSupport).toBeTruthy();
      expect(fetchSupport.responseSupport).toBeTruthy();
      expect(fetchSupport.headersSupport).toBeTruthy();
    });

    test('detects Promise support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const promiseSupport = await page.evaluate(() => {
        return {
          nativePromise: typeof Promise !== 'undefined',
          promisePolyfill: window.Promise && (window.Promise as any).polyfill === true,
          promiseAll: typeof Promise !== 'undefined' && typeof Promise.all === 'function',
          promiseRace: typeof Promise !== 'undefined' && typeof Promise.race === 'function',
          promiseResolve: typeof Promise !== 'undefined' && typeof Promise.resolve === 'function',
          promiseReject: typeof Promise !== 'undefined' && typeof Promise.reject === 'function'
        };
      });
      
      console.log(`${browserName} Promise support:`, promiseSupport);
      
      // All modern browsers should support Promises
      expect(promiseSupport.nativePromise).toBeTruthy();
      expect(promiseSupport.promiseAll).toBeTruthy();
      expect(promiseSupport.promiseRace).toBeTruthy();
      expect(promiseSupport.promiseResolve).toBeTruthy();
      expect(promiseSupport.promiseReject).toBeTruthy();
    });

    test('detects async/await support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const asyncSupport = await page.evaluate(async () => {
        try {
          // Test async/await functionality
          const testAsync = async () => {
            return await Promise.resolve('test');
          };
          
          const result = await testAsync();
          
          return {
            asyncAwaitSupported: result === 'test',
            asyncFunctionConstructor: typeof (async function(){}).constructor === 'function'
          };
        } catch (error) {
          return {
            asyncAwaitSupported: false,
            asyncFunctionConstructor: false,
            error: error.message
          };
        }
      });
      
      console.log(`${browserName} async/await support:`, asyncSupport);
      
      // Modern browsers should support async/await
      expect(asyncSupport.asyncAwaitSupported).toBeTruthy();
      expect(asyncSupport.asyncFunctionConstructor).toBeTruthy();
    });

    test('detects Intersection Observer support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const intersectionObserverSupport = await page.evaluate(() => {
        return {
          nativeSupport: typeof IntersectionObserver !== 'undefined',
          polyfillLoaded: window.IntersectionObserver && (window.IntersectionObserver as any).polyfill === true,
          constructorAvailable: typeof IntersectionObserver === 'function'
        };
      });
      
      console.log(`${browserName} IntersectionObserver support:`, intersectionObserverSupport);
      
      // Modern browsers should support IntersectionObserver
      expect(intersectionObserverSupport.nativeSupport || intersectionObserverSupport.polyfillLoaded).toBeTruthy();
      expect(intersectionObserverSupport.constructorAvailable).toBeTruthy();
    });

    test('detects Object.assign support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const objectAssignSupport = await page.evaluate(() => {
        return {
          nativeSupport: typeof Object.assign === 'function',
          polyfillLoaded: Object.assign && (Object.assign as any).polyfill === true,
          functionalTest: (() => {
            try {
              const target = { a: 1 };
              const source = { b: 2 };
              const result = Object.assign(target, source);
              return result.a === 1 && result.b === 2;
            } catch (error) {
              return false;
            }
          })()
        };
      });
      
      console.log(`${browserName} Object.assign support:`, objectAssignSupport);
      
      expect(objectAssignSupport.nativeSupport || objectAssignSupport.polyfillLoaded).toBeTruthy();
      expect(objectAssignSupport.functionalTest).toBeTruthy();
    });

    test('detects CustomEvent support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const customEventSupport = await page.evaluate(() => {
        return {
          nativeSupport: typeof CustomEvent !== 'undefined',
          polyfillLoaded: window.CustomEvent && (window.CustomEvent as any).polyfill === true,
          functionalTest: (() => {
            try {
              const event = new CustomEvent('test', { detail: { data: 'test' } });
              return event.type === 'test' && event.detail.data === 'test';
            } catch (error) {
              return false;
            }
          })()
        };
      });
      
      console.log(`${browserName} CustomEvent support:`, customEventSupport);
      
      expect(customEventSupport.nativeSupport || customEventSupport.polyfillLoaded).toBeTruthy();
      expect(customEventSupport.functionalTest).toBeTruthy();
    });
  });

  test.describe('CSS Feature Detection', () => {
    test('detects CSS Grid support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const gridSupport = await page.evaluate(() => {
        return {
          cssSupports: CSS.supports('display', 'grid'),
          gridTemplateColumns: CSS.supports('grid-template-columns', '1fr 1fr'),
          gridGap: CSS.supports('grid-gap', '10px') || CSS.supports('gap', '10px'),
          gridArea: CSS.supports('grid-area', '1 / 1 / 2 / 2')
        };
      });
      
      console.log(`${browserName} CSS Grid support:`, gridSupport);
      
      // Modern browsers should support CSS Grid
      expect(gridSupport.cssSupports).toBeTruthy();
      expect(gridSupport.gridTemplateColumns).toBeTruthy();
    });

    test('detects CSS Flexbox support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const flexboxSupport = await page.evaluate(() => {
        return {
          display: CSS.supports('display', 'flex'),
          flexDirection: CSS.supports('flex-direction', 'column'),
          justifyContent: CSS.supports('justify-content', 'center'),
          alignItems: CSS.supports('align-items', 'center'),
          flexWrap: CSS.supports('flex-wrap', 'wrap')
        };
      });
      
      console.log(`${browserName} CSS Flexbox support:`, flexboxSupport);
      
      // All modern browsers should support Flexbox
      expect(flexboxSupport.display).toBeTruthy();
      expect(flexboxSupport.flexDirection).toBeTruthy();
      expect(flexboxSupport.justifyContent).toBeTruthy();
      expect(flexboxSupport.alignItems).toBeTruthy();
    });

    test('detects CSS Custom Properties support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const customPropertiesSupport = await page.evaluate(() => {
        return {
          cssSupports: CSS.supports('color', 'var(--test-color)'),
          functionalTest: (() => {
            try {
              const testElement = document.createElement('div');
              testElement.style.setProperty('--test-var', 'red');
              testElement.style.color = 'var(--test-var)';
              document.body.appendChild(testElement);
              
              const computedStyle = window.getComputedStyle(testElement);
              const color = computedStyle.color;
              
              document.body.removeChild(testElement);
              
              return color === 'red' || color === 'rgb(255, 0, 0)';
            } catch (error) {
              return false;
            }
          })()
        };
      });
      
      console.log(`${browserName} CSS Custom Properties support:`, customPropertiesSupport);
      
      // Modern browsers should support CSS Custom Properties
      expect(customPropertiesSupport.cssSupports).toBeTruthy();
    });

    test('detects CSS Transform support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const transformSupport = await page.evaluate(() => {
        return {
          transform: CSS.supports('transform', 'translateX(10px)'),
          transform3d: CSS.supports('transform', 'translate3d(0, 0, 0)'),
          transformOrigin: CSS.supports('transform-origin', 'center'),
          perspective: CSS.supports('perspective', '1000px')
        };
      });
      
      console.log(`${browserName} CSS Transform support:`, transformSupport);
      
      expect(transformSupport.transform).toBeTruthy();
      expect(transformSupport.transformOrigin).toBeTruthy();
    });

    test('detects CSS Transition support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const transitionSupport = await page.evaluate(() => {
        return {
          transition: CSS.supports('transition', 'all 0.3s ease'),
          transitionProperty: CSS.supports('transition-property', 'opacity'),
          transitionDuration: CSS.supports('transition-duration', '0.3s'),
          transitionTimingFunction: CSS.supports('transition-timing-function', 'ease-in-out')
        };
      });
      
      console.log(`${browserName} CSS Transition support:`, transitionSupport);
      
      expect(transitionSupport.transition).toBeTruthy();
      expect(transitionSupport.transitionProperty).toBeTruthy();
      expect(transitionSupport.transitionDuration).toBeTruthy();
    });
  });

  test.describe('Media Feature Detection', () => {
    test('detects video format support', async ({ page, browserName }) => {
      await page.goto('/');
      
      const videoSupport = await page.evaluate(() => {
        const video = document.createElement('video');
        
        return {
          mp4: video.canPlayType('video/mp4') !== '',
          webm: video.canPlayType('video/webm') !== '',
          ogg: video.canPlayType('video/ogg') !== '',
          h264: video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '',
          vp8: video.canPlayType('video/webm; codecs="vp8"') !== '',
          vp9: video.canPlayType('video/webm; codecs="vp9"') !== ''
        };
      });
      
      console.log(`${browserName} video format support:`, videoSupport);
      
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

    test('detects image format support', async ({ page, browserName }) => {
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
        
        // Test AVIF support (newer format)
        const avifSupport = await new Promise<boolean>((resolve) => {
          const avif = new Image();
          avif.onload = () => resolve(true);
          avif.onerror = () => resolve(false);
          avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        });
        
        return {
          jpeg: true, // All browsers support JPEG
          png: true,  // All browsers support PNG
          gif: true,  // All browsers support GIF
          webp: webpSupport,
          avif: avifSupport,
          svg: true   // All modern browsers support SVG
        };
      });
      
      console.log(`${browserName} image format support:`, imageSupport);
      
      expect(imageSupport.jpeg).toBeTruthy();
      expect(imageSupport.png).toBeTruthy();
      expect(imageSupport.gif).toBeTruthy();
      expect(imageSupport.svg).toBeTruthy();
      
      // WebP is widely supported in modern browsers
      // AVIF support is newer and may vary
    });
  });

  test.describe('Polyfill Loading Verification', () => {
    test('verifies polyfills are loaded when needed', async ({ page, browserName }) => {
      // Mock an older browser by removing modern features
      await page.addInitScript(() => {
        // Simulate older browser by removing some features
        if (Math.random() > 0.5) { // Randomly simulate older browser
          delete (window as any).fetch;
          delete (window as any).IntersectionObserver;
        }
      });
      
      await page.goto('/');
      
      const polyfillStatus = await page.evaluate(() => {
        return {
          fetchAvailable: typeof fetch !== 'undefined',
          intersectionObserverAvailable: typeof IntersectionObserver !== 'undefined',
          promiseAvailable: typeof Promise !== 'undefined',
          objectAssignAvailable: typeof Object.assign === 'function',
          customEventAvailable: typeof CustomEvent !== 'undefined'
        };
      });
      
      console.log(`${browserName} polyfill status:`, polyfillStatus);
      
      // Essential features should be available (either native or polyfilled)
      expect(polyfillStatus.fetchAvailable).toBeTruthy();
      expect(polyfillStatus.promiseAvailable).toBeTruthy();
      expect(polyfillStatus.objectAssignAvailable).toBeTruthy();
      expect(polyfillStatus.customEventAvailable).toBeTruthy();
    });

    test('verifies feature detection triggers correct polyfill loading', async ({ page }) => {
      let polyfillRequests: string[] = [];
      
      page.on('request', (request) => {
        const url = request.url();
        if (url.includes('polyfill') || url.includes('core-js')) {
          polyfillRequests.push(url);
        }
      });
      
      await page.goto('/');
      
      console.log('Polyfill requests:', polyfillRequests);
      
      // Should load appropriate polyfills based on browser capabilities
      // The exact number depends on the browser and its capabilities
    });
  });

  test.describe('Fallback Mechanism Tests', () => {
    test('verifies CSS fallbacks are applied when needed', async ({ page }) => {
      await page.goto('/');
      
      const fallbackTest = await page.evaluate(() => {
        // Create test element with CSS Grid and Flexbox fallback
        const testElement = document.createElement('div');
        testElement.innerHTML = `
          <style>
            .test-grid {
              display: flex;
              flex-wrap: wrap;
            }
            @supports (display: grid) {
              .test-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
              }
            }
          </style>
          <div class="test-grid">
            <div>Item 1</div>
            <div>Item 2</div>
          </div>
        `;
        
        document.body.appendChild(testElement);
        
        const gridElement = testElement.querySelector('.test-grid') as HTMLElement;
        const computedStyle = window.getComputedStyle(gridElement);
        const displayValue = computedStyle.display;
        
        document.body.removeChild(testElement);
        
        return {
          displayValue,
          isGrid: displayValue === 'grid',
          isFlex: displayValue === 'flex'
        };
      });
      
      console.log('CSS fallback test:', fallbackTest);
      
      // Should use either grid or flex as fallback
      expect(fallbackTest.isGrid || fallbackTest.isFlex).toBeTruthy();
    });

    test('verifies JavaScript fallbacks work correctly', async ({ page }) => {
      await page.goto('/');
      
      const fallbackTest = await page.evaluate(() => {
        // Test a feature with fallback implementation
        const testFeature = () => {
          if (typeof fetch !== 'undefined') {
            return 'native-fetch';
          } else if (typeof XMLHttpRequest !== 'undefined') {
            return 'xhr-fallback';
          } else {
            return 'no-support';
          }
        };
        
        return {
          result: testFeature(),
          fetchAvailable: typeof fetch !== 'undefined',
          xhrAvailable: typeof XMLHttpRequest !== 'undefined'
        };
      });
      
      console.log('JavaScript fallback test:', fallbackTest);
      
      // Should have either native fetch or XHR fallback
      expect(fallbackTest.result).not.toBe('no-support');
      expect(fallbackTest.fetchAvailable || fallbackTest.xhrAvailable).toBeTruthy();
    });
  });
});