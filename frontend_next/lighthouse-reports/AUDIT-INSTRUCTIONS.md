# Lighthouse Audit Instructions

## Overview

This document provides instructions for running Lighthouse audits to measure the performance improvements from the Next.js optimization project.

## Prerequisites

1. **Build the production version** of the application:
   ```bash
   cd frontend_next
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start
   ```
   
   The server should be running at http://localhost:3000

## Running the Audit

### Method 1: Using the Provided Scripts (Recommended)

#### On Windows (PowerShell):
```powershell
cd frontend_next
.\scripts\run-lighthouse-audit.ps1 phase-1
```

#### On Linux/Mac (Bash):
```bash
cd frontend_next
chmod +x scripts/run-lighthouse-audit.sh
./scripts/run-lighthouse-audit.sh phase-1
```

### Method 2: Manual npx unlighthouse

```bash
cd frontend_next
npx unlighthouse --site http://localhost:3000 --desktop --outputPath ./lighthouse-reports/phase-1
```

### Method 3: Chrome DevTools (For Individual Pages)

1. Open Chrome browser
2. Navigate to the page you want to test (e.g., http://localhost:3000)
3. Open DevTools (F12 or Right-click → Inspect)
4. Click on the "Lighthouse" tab
5. Select:
   - Mode: Navigation
   - Device: Desktop
   - Categories: Performance (at minimum)
6. Click "Analyze page load"
7. Save the report

## Pages to Test

Run audits for all main pages:

1. **Home**: http://localhost:3000
2. **About**: http://localhost:3000/about
3. **Blog**: http://localhost:3000/blog
4. **Projects**: http://localhost:3000/projects
5. **Media**: http://localhost:3000/media
6. **Contact**: http://localhost:3000/contact

## Metrics to Track

For each page, record the following metrics:

### Performance Score
- Target: 100/100
- Current baseline varies by page (60-77/100)

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Target < 2.5s
- **TBT (Total Blocking Time)**: Target < 200ms
- **CLS (Cumulative Layout Shift)**: Target < 0.1

### Additional Metrics
- **FCP (First Contentful Paint)**
- **SI (Speed Index)**
- **TTI (Time to Interactive)**

### Bundle Size
- Use `npm run build` output to track bundle sizes
- Compare chunk sizes before and after optimizations

## Comparing Results

### Phase-by-Phase Comparison

After each phase, compare:
1. Performance scores (should increase)
2. LCP times (should decrease)
3. TBT times (should decrease)
4. Bundle sizes (should decrease)

### Expected Improvements by Phase

**Phase 1 (Configuration):**
- Performance Score: +5-10 points
- LCP: -200-500ms
- Bundle Size: -10-15%

**Phase 2 (Assets):**
- Performance Score: +5-10 points
- LCP: -500-1000ms
- CLS: Improved

**Phase 3 (Code Splitting):**
- Performance Score: +10-15 points
- TBT: -20-40ms
- Bundle Size: -20-30%

**Phase 4 (Advanced):**
- Performance Score: +5-10 points (reach 100)
- LCP: Final optimization to < 2.5s
- Bundle Size: Final 30%+ reduction

## Troubleshooting

### Server Not Running
If you get connection errors:
```bash
# Make sure the production build is created
npm run build

# Start the production server
npm run start
```

### Port Already in Use
If port 3000 is busy:
```bash
# Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm run start
```

### unlighthouse Not Found
If npx unlighthouse fails:
```bash
# Install globally (optional)
npm install -g @unlighthouse/cli

# Or use npx (will download temporarily)
npx unlighthouse --site http://localhost:3000 --desktop
```

## Saving Results

### Automated (using scripts)
Results are automatically saved to:
```
lighthouse-reports/
  ├── phase-1/
  ├── phase-2/
  ├── phase-3/
  ├── phase-4/
  └── final/
```

### Manual (Chrome DevTools)
1. After running the audit, click "View Report"
2. Click the gear icon → "Save as HTML"
3. Save to the appropriate phase directory

## Analyzing Bundle Size

To analyze bundle sizes:

```bash
# Install bundle analyzer (already in devDependencies)
npm install --save-dev @next/bundle-analyzer

# Run build with analysis
ANALYZE=true npm run build
```

This will open an interactive treemap showing:
- Total bundle size
- Individual chunk sizes
- Module sizes within each chunk

## Documentation

After running audits, update the README.md in each phase directory with:
1. Actual performance scores
2. Metric improvements
3. Bundle size reductions
4. Any issues or observations

## Next Steps

1. Run baseline audit (if not already done)
2. Implement Phase 1 optimizations
3. Run Phase 1 audit
4. Compare results with baseline
5. Document findings
6. Proceed to Phase 2 if results are satisfactory
