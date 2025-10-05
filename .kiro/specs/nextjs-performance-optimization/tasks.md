# Implementation Plan

- [x] 1. Phase 1: Next.js Configuration Optimization





  - Update next.config.ts with compiler and webpack optimizations
  - Add reactRemoveProperties, optimize splitChunks for heavy libraries
  - Enable compression, remove poweredByHeader, ensure swcMinify is enabled
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 1.1 Optimize webpack splitChunks configuration


  - Add separate chunks for FullCalendar, ApexCharts, carousel libraries, and Radix UI
  - Configure moduleIds, runtimeChunk, and cacheGroups priorities
  - _Requirements: 3.5, 3.6, 8.3_


- [x] 1.2 Add compiler optimizations

  - Configure reactRemoveProperties to remove data-test attributes in production
  - Verify removeConsole configuration is working correctly
  - _Requirements: 3.4, 8.1_

- [x] 1.3 Run Lighthouse audit after configuration changes


  - Execute npx unlighthouse for all pages
  - Compare performance scores with baseline
  - Document improvements in LCP, TBT, and bundle size
  - _Requirements: 10.1, 10.2, 10.4_

- [x] 2. Phase 1: Font Optimization





  - Convert Cabin font from CDN to next/font/google
  - Setup Geometria as local font with next/font/local
  - Remove Google Fonts CDN links from layout.tsx
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2.1 Convert Cabin font to next/font


  - Import Cabin from next/font/google with cyrillic subset
  - Configure weights [400, 500, 600, 700] and styles [normal, italic]
  - Add variable --font-cabin with display: swap and preload: true
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 2.2 Setup Geometria as local font


  - Check if Geometria font files exist in project
  - If not available, download and add to src/fonts/ directory
  - Configure localFont with woff2 files for regular and bold weights
  - Add variable --font-geometria with display: swap
  - _Requirements: 2.1, 2.2, 2.4_

- [x] 2.3 Update layout.tsx to use optimized fonts


  - Remove <link> tags for Cabin and Geometria from <head>
  - Apply font variables to body className
  - Update globals.css to use CSS variables for font families
  - _Requirements: 2.1, 2.2, 2.3_


- [x] 2.4 Run Lighthouse audit after font optimization

  - Verify elimination of render-blocking font requests
  - Check FCP and LCP improvements
  - Ensure fonts display correctly with swap behavior
  - _Requirements: 10.1, 10.2, 10.3_

- [x] 3. Phase 1: Tailwind CSS Optimization





  - Verify Tailwind purge configuration is optimal
  - Add cssnano preset for production minification
  - Ensure content paths include all component files
  - _Requirements: 5.2, 5.3, 5.4_

- [x] 3.1 Optimize Tailwind configuration


  - Review content paths to ensure all files are included
  - Add safelist for dynamically generated classes if needed
  - Configure cssnano with removeAll comments for production
  - _Requirements: 5.2, 5.3_

- [x] 3.2 Audit and consolidate CSS files


  - Review files in src/styles/ for unused styles
  - Consolidate compatibility CSS files where possible
  - Remove duplicate or unused CSS rules
  - _Requirements: 5.5_

- [x] 4. Phase 2: Image Optimization Audit





  - Audit all Image components across the application
  - Identify LCP images that need priority attribute
  - Add placeholder="blur" where appropriate
  - Optimize sizes attribute for responsive images
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_


- [x] 4.1 Optimize hero and LCP images

  - Add priority={true} to HeroVideoSection fallback image
  - Add priority to first visible images on each page
  - Generate blur placeholders for critical images
  - Set appropriate quality values (90 for hero, 85 for content)
  - _Requirements: 1.1, 1.2, 1.4, 1.6, 7.5_


- [x] 4.2 Optimize below-the-fold images

  - Ensure loading="lazy" for images outside viewport
  - Add sizes attribute for responsive images
  - Set quality to 80-85 for non-critical images
  - Verify width and height are set to prevent CLS
  - _Requirements: 1.2, 1.3, 1.5_

- [x] 4.3 Optimize logo and icon images


  - Review MainContentSection logo images
  - Ensure proper sizing and quality settings
  - Consider using SVG format where appropriate
  - _Requirements: 1.1, 1.2_

- [x] 4.4 Run Lighthouse audit after image optimization


  - Verify LCP improvements
  - Check CLS score is < 0.1
  - Ensure no layout shifts during image loading
  - _Requirements: 9.1, 9.3, 10.1, 10.2_

- [x] 5. Phase 3: Lazy Load Footer Components




  - Convert Footer and FooterMobile to dynamic imports
  - Add skeleton loading states
  - Test footer functionality after lazy loading
  - _Requirements: 4.1, 4.2, 4.5_

- [x] 5.1 Implement dynamic imports for footers


  - Update src/app/page.tsx to use dynamic imports
  - Create skeleton loaders matching footer height
  - Configure ssr: false for footer components
  - _Requirements: 4.1, 4.2, 4.5_

- [x] 5.2 Test footer lazy loading


  - Verify footers load correctly on scroll
  - Check loading states display properly
  - Ensure no functionality is broken
  - _Requirements: 11.1, 11.2_

- [x] 6. Phase 3: Lazy Load Admin Components





  - Identify all admin-only components and libraries
  - Convert to dynamic imports with ssr: false
  - Add loading states for admin components
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 6.1 Lazy load FullCalendar library


  - Wrap FullCalendar imports in dynamic()
  - Add loading skeleton for calendar view
  - Test calendar functionality in admin pages
  - _Requirements: 3.3, 4.1, 4.3_

- [x] 6.2 Lazy load ApexCharts library


  - Wrap react-apexcharts imports in dynamic()
  - Add loading placeholder for chart components
  - Test chart rendering in admin dashboard
  - _Requirements: 3.3, 4.1, 4.3_


- [x] 6.3 Lazy load admin dialog components

  - Convert admin dialog components to dynamic imports
  - Ensure dialogs open correctly after lazy loading
  - Test all CRUD operations in admin panel
  - _Requirements: 4.1, 4.2, 11.1, 11.2_

- [x] 7. Phase 3: Lazy Load Heavy UI Libraries





  - Identify carousel and lightbox components
  - Convert to dynamic imports
  - Add loading states
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 7.1 Lazy load carousel components


  - Convert TestimonialCarousel to dynamic import
  - Convert MediaCarousel to dynamic import
  - Add skeleton loaders for carousels
  - Test carousel functionality on all pages
  - _Requirements: 4.1, 4.2, 4.5_


- [x] 7.2 Lazy load lightbox components

  - Convert react-modal-image usage to dynamic import
  - Convert CarouselWithLightbox to dynamic import
  - Test image gallery and lightbox functionality
  - _Requirements: 4.1, 4.2, 11.1_

- [x] 8. Phase 3: Bundle Analysis




  - Run bundle analyzer to identify heavy dependencies
  - Document current bundle sizes
  - Create optimization plan for heavy libraries
  - _Requirements: 3.1, 3.3, 10.5_

- [x] 8.1 Setup and run bundle analyzer


  - Configure @next/bundle-analyzer in next.config.ts
  - Run ANALYZE=true npm run build
  - Generate bundle analysis report
  - _Requirements: 3.1, 10.5_

- [x] 8.2 Analyze heavy dependencies


  - Identify libraries over 100KB
  - Document which pages use each heavy library
  - Prioritize libraries for lazy loading or replacement
  - _Requirements: 3.3, 3.5_

- [x] 8.3 Calculate bundle size reduction


  - Compare bundle sizes before and after optimizations
  - Verify 30% reduction target is achieved
  - Document chunk sizes and improvements
  - _Requirements: 3.1, 10.5_

- [x] 9. Phase 3: Run Comprehensive Lighthouse Audit





  - Run Lighthouse for all pages after Phase 3
  - Compare metrics with Phase 1 and Phase 2 results
  - Document performance improvements
  - _Requirements: 10.1, 10.2, 10.4_


- [x] 9.1 Execute Lighthouse audits

  - Run npx unlighthouse for all pages
  - Save reports to lighthouse-reports/phase-3/
  - Extract performance scores and Core Web Vitals
  - _Requirements: 10.1, 10.2_


- [x] 9.2 Analyze and document improvements

  - Compare scores: Home, About, Blog, Projects, Media, Contact
  - Calculate improvements in LCP, TBT, CLS
  - Verify bundle size reduction percentage
  - _Requirements: 10.2, 10.5_


- [x] 9.3 Identify remaining optimization opportunities

  - Review Lighthouse recommendations
  - Identify pages not yet at 100/100
  - Plan Phase 4 optimizations based on findings
  - _Requirements: 10.1, 10.2_

- [x] 10. Phase 4: Replace react-slick with Swiper




  - Identify all react-slick usage in codebase
  - Replace with Swiper (already in dependencies)
  - Remove react-slick and slick-carousel from package.json
  - Test all carousel functionality
  - _Requirements: 3.3, 11.1, 11.2_

- [x] 10.1 Audit react-slick usage


  - Search codebase for react-slick imports
  - Document all components using react-slick
  - Plan migration strategy for each component
  - _Requirements: 3.3_

- [x] 10.2 Migrate carousels to Swiper

  - Replace react-slick with Swiper in identified components
  - Update component props and configuration
  - Ensure responsive behavior is maintained
  - Test carousel navigation and autoplay
  - _Requirements: 3.3, 11.1, 11.2_

- [x] 10.3 Remove react-slick dependencies


  - Remove react-slick from package.json
  - Remove slick-carousel from package.json
  - Run npm install to update lock file
  - Verify no broken imports remain
  - _Requirements: 3.3, 3.6_

- [x] 11. Phase 4: Optimize Data Fetching with ISR



  - Identify static vs dynamic content
  - Convert appropriate pages to use ISR
  - Add revalidation strategies
  - _Requirements: 6.1, 6.2, 6.5_


- [x] 11.1 Identify pages for ISR

  - Analyze which pages have static or semi-static content
  - Document current data fetching patterns
  - Plan ISR revalidation intervals
  - _Requirements: 6.2, 6.5_



- [x] 11.2 Implement ISR for blog pages
  - Update blog page to use fetch with revalidate
  - Set appropriate revalidation interval (e.g., 3600s)
  - Test that content updates after revalidation
  - _Requirements: 6.2, 6.5_



- [x] 11.3 Implement ISR for projects pages
  - Update projects page to use fetch with revalidate
  - Configure revalidation for project detail pages
  - Test dynamic routes with ISR
  - _Requirements: 6.2, 6.5_


- [x] 11.4 Add caching for API requests


  - Review client-side API calls
  - Add cache: 'force-cache' where appropriate
  - Implement request deduplication
  - _Requirements: 6.1, 6.3_

- [x] 12. Phase 4: Add Resource Hints and Preloading




  - Add preconnect for critical domains
  - Preload critical fonts
  - Configure Link prefetch behavior
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 12.1 Add DNS prefetch and preconnect


  - Add preconnect for Laravel backend domain
  - Add dns-prefetch for external resources
  - Update layout.tsx with resource hints
  - _Requirements: 7.3_

- [x] 12.2 Preload critical resources


  - Preload critical fonts (Inter, Cabin, Geometria)
  - Add fetchpriority="high" to LCP images
  - Preload critical CSS if needed
  - _Requirements: 7.2, 7.4, 7.5_

- [x] 12.3 Optimize Link prefetching


  - Review Link components across application
  - Configure prefetch behavior appropriately
  - Test navigation performance
  - _Requirements: 7.1_

- [x] 13. Phase 4: Final Lighthouse Audit and Validation








  - Run comprehensive Lighthouse audit for all pages
  - Validate all pages achieve 100/100 performance score
  - Verify Core Web Vitals compliance
  - Document final results
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.4_



- [x] 13.1 Execute final Lighthouse audits


  - Run npx unlighthouse for all pages
  - Save reports to lighthouse-reports/final/
  - Extract all performance metrics
  - _Requirements: 10.1, 10.4_


- [x] 13.2 Validate Core Web Vitals

  - Verify LCP < 2.5s for all pages
  - Verify TBT < 200ms for all pages
  - Verify CLS < 0.1 for all pages
  - Ensure all metrics are in "Good" range
  - _Requirements: 9.1, 9.2, 9.3, 9.4_


- [x] 13.3 Validate bundle size reduction

  - Compare final bundle size with baseline
  - Verify 30%+ reduction achieved
  - Document chunk sizes and optimizations
  - _Requirements: 3.1, 10.5_

- [x] 13.4 Create final performance report


  - Document before/after metrics for all pages
  - List all optimizations implemented
  - Calculate total improvements achieved
  - Create summary report with recommendations
  - _Requirements: 10.2, 10.4_

- [x] 14. Fix Critical Performance Regressions








  - Address critical issues identified in final performance report
  - Revert overly aggressive lazy loading that hurt LCP
  - Fix Home page CLS (0.889 → <0.1)
  - Fix all pages LCP to meet <2.5s target
  - _Requirements: 9.1, 9.3, 10.4, 11.1_


- [x] 14.1 Revert problematic lazy loading on Home page



  - Remove lazy loading from HeroVideoSection (currently causing 9.1s LCP)
  - Ensure hero content loads immediately without delay
  - Add explicit dimensions to prevent CLS issues
  - Test and validate LCP < 2.5s and CLS < 0.1
  - _Requirements: 9.1, 9.3, 11.1_


- [x] 14.2 Fix Home page CLS issues



  - Add explicit width/height to all above-the-fold components
  - Implement skeleton loaders with exact dimensions
  - Remove any layout shifts during content loading
  - Validate CLS < 0.1 (currently 0.889)
  - _Requirements: 9.3, 11.1_


- [x] 14.3 Optimize LCP on all pages



  - Audit LCP element on each page (About: 4.8s, Blog: 5.4s, Contact: 3.8s, Media: 6.1s)
  - Add priority={true} to LCP images on each page
  - Preload critical resources (fonts, hero images)
  - Remove any render-blocking resources
  - Validate all pages achieve LCP < 2.5s
  - _Requirements: 9.1, 10.4_


- [x] 14.4 Fix Media page TBT



  - Reduce TBT from 328ms to <200ms
  - Defer carousel initialization until needed
  - Use IntersectionObserver for below-fold carousels
  - Optimize video player loading strategy
  - _Requirements: 9.4, 11.1_

- [x] 15. Implement Remaining ISR Optimizations






  - Complete ISR implementation for all eligible pages
  - Convert client-side data fetching to server components where possible
  - Add proper caching strategies
  - _Requirements: 6.1, 6.2, 6.5_



- [x] 15.1 Convert Blog list page to ISR


  - Convert BlogClient component to Server Component
  - Implement ISR with 3600s revalidation
  - Test that blog list updates after revalidation period
  - Verify performance improvements
  - _Requirements: 6.2, 6.5_

- [x] 15.2 Convert Projects list page to ISR




  - Convert ProjectsClient component to Server Component
  - Implement ISR with 1800s revalidation
  - Handle category filtering with ISR
  - Test dynamic filtering still works
  - _Requirements: 6.2, 6.5_

- [x] 15.3 Convert Home page data fetching to ISR




  - Convert HomeContentClient data fetching to Server Component
  - Implement ISR with 1800s revalidation for home content
  - Preserve client-side interactivity (filters, toggles)
  - Test all interactive features still work
  - _Requirements: 6.1, 6.2, 6.5_


- [x] 15.4 Add caching for remaining API requests




  - Review all client-side API calls
  - Add appropriate cache strategies (force-cache, revalidate)
  - Implement request deduplication where applicable
  - Test cache behavior and invalidation
  - _Requirements: 6.1, 6.3_

- [x] 16. Final Performance Validation







  - Run comprehensive Lighthouse audits after fixes
  - Validate all pages achieve 100/100 performance score
  - Verify Core Web Vitals compliance on all pages
  - Document final results and improvements
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.4_

- [x] 16.1 Execute final Lighthouse audits




  - Run npx unlighthouse for all pages after fixes
  - Save reports to lighthouse-reports/final-validation/
  - Extract all performance metrics
  - Compare with baseline and previous phases
  - _Requirements: 10.1, 10.4_

- [x] 16.2 Validate Core Web Vitals compliance




  - Verify LCP < 2.5s for all pages (currently 0/5 passing)
  - Verify TBT < 200ms for all pages (currently 4/5 passing)
  - Verify CLS < 0.1 for all pages (currently 4/5 passing)
  - Ensure all metrics are in "Good" range
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 16.3 Validate performance score targets




  - Verify all pages achieve 100/100 performance score
  - Document any pages that don't meet target
  - Identify remaining optimization opportunities if needed
  - _Requirements: 10.4_

- [x] 16.4 Create final validation report




  - Document before/after metrics for all pages
  - Calculate total improvements from baseline
  - List all optimizations that were successful
  - Document lessons learned and recommendations
  - _Requirements: 10.2, 10.4_

- [x] 17. Comprehensive Functional Testing







  - Test all pages for functionality after performance fixes
  - Verify no regressions introduced by changes
  - Test responsive design on mobile/tablet/desktop
  - Validate all user flows work correctly
  - _Requirements: 11.1, 11.2, 11.3_


- [x] 17.1 Test public pages functionality



  - Test Home page: hero video, content sections, navigation
  - Test About page: content display, images
  - Test Blog page: list view, detail pages, navigation
  - Test Projects page: grid view, filters, detail pages
  - Test Media page: service sections, videos
  - Test Contact page: form submission, validation
  - _Requirements: 11.1, 11.2_


- [x] 17.2 Test admin functionality



  - Test admin login and authentication
  - Test all CRUD operations for projects
  - Test all CRUD operations for blog posts
  - Test media upload and management
  - Test SEO settings management
  - _Requirements: 11.1, 11.2_



- [x] 17.3 Test responsive design


  - Test all pages on mobile viewport (375px, 768px)
  - Test all pages on tablet viewport (1024px)
  - Test all pages on desktop viewport (1920px)
  - Verify no layout breaks or overflow issues

  - _Requirements: 11.1, 11.2_


- [x] 17.4 Test ISR and caching behavior



  - Verify ISR pages serve cached content
  - Test revalidation after configured intervals
  - Verify dynamic features still work with ISR
  - Test cache invalidation if implemented
  - _Requirements: 6.2, 6.5, 11.1_

- [x] 18. Documentation and Cleanup








  - Document all optimizations and fixes implemented
  - Update README with final performance results
  - Clean up unused dependencies
  - Remove commented code and debug statements
  - _Requirements: 10.2, 11.5_



- [x] 18.1 Create comprehensive optimization documentation


  - Document all configuration changes made
  - List components that were optimized
  - Document ISR implementation approach
  - Document performance regression fixes
  - Create troubleshooting guide for future issues
  - _Requirements: 10.2_


- [x] 18.2 Update project README



  - Add performance optimization section with final metrics
  - Document achieved improvements from baseline
  - Add commands for running performance audits
  - Include bundle analysis instructions
  - Add ISR revalidation information
  - _Requirements: 10.2_


- [x] 18.3 Clean up dependencies



  - Verify no unused packages remain in package.json
  - Run npm audit to check for vulnerabilities
  - Update outdated dependencies if safe to do so
  - Document any dependencies that were removed
  - _Requirements: 3.6_

- [x] 18.4 Code cleanup




  - Remove commented backup code after validation
  - Clean up console.log and debug statements
  - Format code consistently across all files
  - Run linter and fix any remaining issues
  - _Requirements: 11.5_
