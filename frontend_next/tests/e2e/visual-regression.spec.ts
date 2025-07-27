import { test, expect } from '@playwright/test';

/**
 * Visual regression tests to ensure consistent rendering across browsers
 * These tests capture screenshots and compare them across different browsers
 */

test.describe('Visual Regression Tests', () => {
  
  test.describe('Homepage Visual Consistency', () => {
    test('homepage header renders consistently', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Focus on header section
      const header = page.locator('header');
      await expect(header).toHaveScreenshot('homepage-header.png', {
        threshold: 0.2,
      });
    });

    test('homepage hero section renders consistently', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Focus on hero section
      const hero = page.locator('[data-testid="hero-section"]');
      if (await hero.isVisible()) {
        await expect(hero).toHaveScreenshot('homepage-hero.png', {
          threshold: 0.2,
        });
      }
    });

    test('homepage navigation renders consistently', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const navigation = page.locator('nav');
      await expect(navigation).toHaveScreenshot('homepage-navigation.png', {
        threshold: 0.2,
      });
    });
  });

  test.describe('Projects Page Visual Consistency', () => {
    test('projects grid layout renders consistently', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Wait for project cards to load
      await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
      
      const projectsGrid = page.locator('[data-testid="projects-grid"]');
      if (await projectsGrid.isVisible()) {
        await expect(projectsGrid).toHaveScreenshot('projects-grid.png', {
          threshold: 0.2,
        });
      }
    });

    test('project card components render consistently', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      const firstProjectCard = page.locator('[data-testid="project-card"]').first();
      if (await firstProjectCard.isVisible()) {
        await expect(firstProjectCard).toHaveScreenshot('project-card.png', {
          threshold: 0.2,
        });
      }
    });
  });

  test.describe('Admin Interface Visual Consistency', () => {
    test('admin dashboard renders consistently', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot of admin dashboard
      await expect(page).toHaveScreenshot('admin-dashboard.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('admin navigation sidebar renders consistently', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      const sidebar = page.locator('[data-testid="admin-sidebar"]');
      if (await sidebar.isVisible()) {
        await expect(sidebar).toHaveScreenshot('admin-sidebar.png', {
          threshold: 0.2,
        });
      }
    });

    test('admin form dialogs render consistently', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      // Open a form dialog
      const addButton = page.locator('[data-testid="add-project-btn"]');
      if (await addButton.isVisible()) {
        await addButton.click();
        
        // Wait for dialog to appear
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toBeVisible();
        
        await expect(dialog).toHaveScreenshot('admin-form-dialog.png', {
          threshold: 0.2,
        });
      }
    });
  });

  test.describe('Form Components Visual Consistency', () => {
    test('file upload components render consistently', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      // Navigate to file upload form
      const addButton = page.locator('[data-testid="add-project-btn"]');
      if (await addButton.isVisible()) {
        await addButton.click();
        
        const fileUpload = page.locator('[data-testid="file-upload"]');
        if (await fileUpload.isVisible()) {
          await expect(fileUpload).toHaveScreenshot('file-upload-component.png', {
            threshold: 0.2,
          });
        }
      }
    });

    test('form validation states render consistently', async ({ page }) => {
      await page.goto('/admin');
      await page.waitForLoadState('networkidle');
      
      // Navigate to form and trigger validation
      const addButton = page.locator('[data-testid="add-project-btn"]');
      if (await addButton.isVisible()) {
        await addButton.click();
        
        // Try to submit empty form to trigger validation
        const submitButton = page.locator('[data-testid="submit-btn"]');
        if (await submitButton.isVisible()) {
          await submitButton.click();
          
          // Wait for validation messages
          await page.waitForTimeout(1000);
          
          const form = page.locator('form');
          await expect(form).toHaveScreenshot('form-validation-state.png', {
            threshold: 0.2,
          });
        }
      }
    });
  });

  test.describe('Responsive Design Visual Tests', () => {
    test('mobile layout renders consistently', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('mobile-homepage.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('tablet layout renders consistently', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('tablet-homepage.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('desktop layout renders consistently', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('desktop-homepage.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });
  });

  test.describe('Media Content Visual Tests', () => {
    test('image galleries render consistently', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Click on a project to view details
      const firstProject = page.locator('[data-testid="project-card"]').first();
      if (await firstProject.isVisible()) {
        await firstProject.click();
        await page.waitForLoadState('networkidle');
        
        const gallery = page.locator('[data-testid="project-gallery"]');
        if (await gallery.isVisible()) {
          await expect(gallery).toHaveScreenshot('project-gallery.png', {
            threshold: 0.2,
          });
        }
      }
    });

    test('video players render consistently', async ({ page }) => {
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');
      
      // Look for video content
      const videoPlayer = page.locator('video').first();
      if (await videoPlayer.isVisible()) {
        await expect(videoPlayer).toHaveScreenshot('video-player.png', {
          threshold: 0.2,
        });
      }
    });
  });

  test.describe('Loading States Visual Tests', () => {
    test('loading spinners render consistently', async ({ page }) => {
      // Intercept API calls to simulate loading state
      await page.route('**/api/**', route => {
        // Delay response to capture loading state
        setTimeout(() => {
          route.continue();
        }, 2000);
      });
      
      await page.goto('/admin');
      
      // Trigger an action that shows loading state
      const addButton = page.locator('[data-testid="add-project-btn"]');
      if (await addButton.isVisible()) {
        await addButton.click();
        
        // Capture loading state
        const loadingSpinner = page.locator('[data-testid="loading-spinner"]');
        if (await loadingSpinner.isVisible()) {
          await expect(loadingSpinner).toHaveScreenshot('loading-spinner.png', {
            threshold: 0.2,
          });
        }
      }
    });
  });

  test.describe('Error States Visual Tests', () => {
    test('error messages render consistently', async ({ page }) => {
      // Mock API error
      await page.route('**/api/**', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server error' })
        });
      });
      
      await page.goto('/admin');
      
      // Trigger action that would cause error
      const addButton = page.locator('[data-testid="add-project-btn"]');
      if (await addButton.isVisible()) {
        await addButton.click();
        
        // Wait for error message
        const errorMessage = page.locator('[data-testid="error-message"]');
        if (await errorMessage.isVisible()) {
          await expect(errorMessage).toHaveScreenshot('error-message.png', {
            threshold: 0.2,
          });
        }
      }
    });
  });
});