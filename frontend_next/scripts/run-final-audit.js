const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Pages to audit
const pages = [
  { name: 'Home', url: 'http://localhost:3000' },
  { name: 'About', url: 'http://localhost:3000/about' },
  { name: 'Blog', url: 'http://localhost:3000/blog' },
  { name: 'Projects', url: 'http://localhost:3000/projects' },
  { name: 'Media', url: 'http://localhost:3000/media' },
  { name: 'Contact', url: 'http://localhost:3000/contact' }
];

const outputDir = path.join(__dirname, '../lighthouse-reports/final-validation');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🚀 Starting Final Performance Validation Audits...\n');
console.log(`Output directory: ${outputDir}\n`);

const results = [];

// Run Lighthouse for each page
pages.forEach((page, index) => {
  console.log(`[${index + 1}/${pages.length}] Auditing ${page.name} (${page.url})...`);
  
  try {
    const outputPath = path.join(outputDir, `${page.name.toLowerCase()}.report.json`);
    const htmlPath = path.join(outputDir, `${page.name.toLowerCase()}.report.html`);
    
    // Run Lighthouse CLI
    const command = `npx lighthouse ${page.url} --output=json --output=html --output-path=${outputPath.replace('.report.json', '')} --preset=desktop --quiet --chrome-flags="--headless --no-sandbox"`;
    
    execSync(command, { stdio: 'inherit' });
    
    // Read the JSON report
    const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    
    const metrics = {
      name: page.name,
      url: page.url,
      performanceScore: Math.round(report.categories.performance.score * 100),
      metrics: {
        fcp: Math.round(report.audits['first-contentful-paint'].numericValue),
        lcp: Math.round(report.audits['largest-contentful-paint'].numericValue),
        tbt: Math.round(report.audits['total-blocking-time'].numericValue),
        cls: parseFloat(report.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
        si: Math.round(report.audits['speed-index'].numericValue)
      }
    };
    
    results.push(metrics);
    
    console.log(`✅ ${page.name}: Performance ${metrics.performanceScore}/100`);
    console.log(`   LCP: ${metrics.metrics.lcp}ms | TBT: ${metrics.metrics.tbt}ms | CLS: ${metrics.metrics.cls}\n`);
    
  } catch (error) {
    console.error(`❌ Error auditing ${page.name}:`, error.message);
    results.push({
      name: page.name,
      url: page.url,
      error: error.message
    });
  }
});

// Save summary
const summaryPath = path.join(outputDir, 'summary.json');
fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

console.log('\n✅ All audits completed!');
console.log(`📊 Summary saved to: ${summaryPath}`);

// Print summary table
console.log('\n📊 Performance Summary:\n');
console.log('Page      | Score | LCP (ms) | TBT (ms) | CLS   | Status');
console.log('----------|-------|----------|----------|-------|--------');

results.forEach(result => {
  if (result.error) {
    console.log(`${result.name.padEnd(9)} | ERROR | -        | -        | -     | ❌`);
  } else {
    const lcpStatus = result.metrics.lcp < 2500 ? '✅' : '❌';
    const tbtStatus = result.metrics.tbt < 200 ? '✅' : '❌';
    const clsStatus = result.metrics.cls < 0.1 ? '✅' : '❌';
    const scoreStatus = result.performanceScore === 100 ? '✅' : result.performanceScore >= 90 ? '⚠️' : '❌';
    
    console.log(
      `${result.name.padEnd(9)} | ${String(result.performanceScore).padStart(3)}/100 | ${String(result.metrics.lcp).padStart(8)} | ${String(result.metrics.tbt).padStart(8)} | ${result.metrics.cls.toFixed(3)} | ${scoreStatus}`
    );
  }
});

// Calculate pass rates
const validResults = results.filter(r => !r.error);
const lcpPass = validResults.filter(r => r.metrics.lcp < 2500).length;
const tbtPass = validResults.filter(r => r.metrics.tbt < 200).length;
const clsPass = validResults.filter(r => r.metrics.cls < 0.1).length;
const scorePass = validResults.filter(r => r.performanceScore === 100).length;

console.log('\n📈 Core Web Vitals Compliance:');
console.log(`   LCP < 2.5s:   ${lcpPass}/${validResults.length} pages (${Math.round(lcpPass/validResults.length*100)}%)`);
console.log(`   TBT < 200ms:  ${tbtPass}/${validResults.length} pages (${Math.round(tbtPass/validResults.length*100)}%)`);
console.log(`   CLS < 0.1:    ${clsPass}/${validResults.length} pages (${Math.round(clsPass/validResults.length*100)}%)`);
console.log(`   Score 100:    ${scorePass}/${validResults.length} pages (${Math.round(scorePass/validResults.length*100)}%)`);

console.log('\n✨ Audit complete! Check the reports in lighthouse-reports/final-validation/\n');
