# Quick Test Execution Guide

## Prerequisites

1. Ensure the development server is running or will be started automatically
2. Install Playwright browsers if not already installed:
   ```bash
   npx playwright install
   ```

## Quick Commands

### Run All Tests
```bash
npx playwright test
```

### Run Tests with UI (Recommended for Development)
```bash
npx playwright test --ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Specific Test Suite

```bash
# Public pages only
npx playwright test public-pages

# Admin functionality only
npx playwright test admin-functionality

# Responsive design only
npx playwright test responsive-design

# ISR and caching only
npx playwright test isr-caching

# Lazy loaded components only
npx playwright test lazy-loaded-components
```

### Run Tests for Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) only
npx playwright test --project=webkit

# Mobile Chrome only
npx playwright test --project="Mobile Chrome"

# Mobile Safari only
npx playwright test --project="Mobile Safari"
```

### Run Tests for Specific Page

```bash
# Home page tests only
npx playwright test -g "Home page"

# Blog page tests only
npx playwright test -g "Blog"

# Projects page tests only
npx playwright test -g "Projects"
```

### Debug Tests

```bash
# Debug mode (step through tests)
npx playwright test --debug

# Debug specific test
npx playwright test --debug -g "should load home page"
```

### Generate Test Report

```bash
# Run tests and generate HTML report
npx playwright test --reporter=html

# Show report
npx playwright show-report
```

## Test Results

After running tests, you can view:

1. **Console Output**: Immediate pass/fail results
2. **HTML Report**: Detailed report with screenshots and videos
   ```bash
   npx playwright show-report
   ```
3. **Test Results Directory**: `test-results/` folder contains:
   - Screenshots of failures
   - Videos of test runs
   - Trace files for debugging

## Common Issues

### Dev Server Not Running
If tests fail because the dev server isn't running:
```bash
# Start dev server in one terminal
npm run dev

# Run tests in another terminal
npx playwright test
```

### Admin Tests Failing
Admin tests require authentication. Set environment variables:
```bash
# Windows (CMD)
set ADMIN_EMAIL=admin@example.com
set ADMIN_PASSWORD=your_password
npx playwright test admin-functionality

# Windows (PowerShell)
$env:ADMIN_EMAIL="admin@example.com"
$env:ADMIN_PASSWORD="your_password"
npx playwright test admin-functionality

# Linux/Mac
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=your_password npx playwright test admin-functionality
```

### Slow Tests
To run tests faster:
```bash
# Run tests in parallel (default)
npx playwright test --workers=4

# Run tests on single browser only
npx playwright test --project=chromium
```

## CI/CD Integration

For continuous integration, use:
```bash
# Run tests in CI mode
npx playwright test --reporter=json,junit

# Results will be in:
# - test-results/results.json
# - test-results/results.xml
```

## Test Coverage Summary

- **Total Tests**: 1,337
- **Test Files**: 5
- **Browser Configs**: 7
- **Viewports**: 4

## Quick Validation

To quickly validate everything works:
```bash
# Run smoke tests (fast subset)
npx playwright test --project=chromium public-pages.spec.ts
```

This will run ~60 tests in a few minutes to validate core functionality.

## Full Test Suite

To run the complete test suite (recommended before deployment):
```bash
# Run all tests on all browsers
npx playwright test

# Expected duration: 15-30 minutes
# Expected result: All tests passing ✅
```

## Need Help?

- View test code in `tests/e2e/` directory
- Check Playwright documentation: https://playwright.dev
- Review TEST-EXECUTION-REPORT.md for detailed results

---

**Quick Start**: `npx playwright test --ui` (Best for development)  
**Full Suite**: `npx playwright test` (Best for deployment validation)
