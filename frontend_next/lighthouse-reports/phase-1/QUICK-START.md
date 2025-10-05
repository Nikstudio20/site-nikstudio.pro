# Phase 1 Audit - Quick Start Guide

## 🚀 Quick Commands

### Step 1: Build Production Version
```bash
cd frontend_next
npm run build
```

### Step 2: Start Production Server
```bash
npm run start
```

### Step 3: Run Audit (in a new terminal)

**Windows (PowerShell):**
```powershell
cd frontend_next
.\scripts\run-lighthouse-audit.ps1 phase-1
```

**Linux/Mac:**
```bash
cd frontend_next
chmod +x scripts/run-lighthouse-audit.sh
./scripts/run-lighthouse-audit.sh phase-1
```

**Or use npx directly:**
```bash
npx unlighthouse --site http://localhost:3000 --desktop --outputPath ./lighthouse-reports/phase-1
```

## 📊 What to Look For

After the audit completes, check these metrics for each page:

### Performance Score
- **Baseline (Home):** 60/100
- **Target:** 65-70/100 (+5-10 points)

### LCP (Largest Contentful Paint)
- **Baseline (Home):** 4.63s
- **Target:** 4.1-4.4s (-200-500ms)

### Bundle Size
- Check build output for chunk sizes
- Look for separate chunks: fullcalendar, apexcharts, carousel, radix-ui
- **Target:** 10-15% reduction in total bundle size

## ✅ Success Criteria

Phase 1 is successful if:
- [ ] Performance scores improved by 5-10 points
- [ ] LCP reduced by 200-500ms
- [ ] Bundle size reduced by 10-15%
- [ ] No functionality regressions
- [ ] Separate chunks visible in build output

## 📝 Document Results

After running the audit, update `README.md` in this directory with:
1. Actual performance scores for all pages
2. LCP, TBT, CLS metrics
3. Bundle size before/after
4. Any observations or issues

## 🔄 If Issues Occur

If you encounter problems:
1. Check that production build completed successfully
2. Verify server is running at http://localhost:3000
3. Try running audit in Chrome DevTools manually
4. Check console for any errors
5. Review `PHASE-1-SUMMARY.md` for rollback instructions

## 📚 More Information

- Full instructions: `../AUDIT-INSTRUCTIONS.md`
- Implementation details: `../../PHASE-1-SUMMARY.md`
- Design document: `../../../.kiro/specs/nextjs-performance-optimization/design.md`
