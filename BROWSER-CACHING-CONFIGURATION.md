# Browser Caching Configuration

## Overview

This document describes the browser caching configuration implemented for static assets across both the Laravel backend and Next.js frontend. The configuration optimizes performance by setting appropriate cache headers for different types of resources.

## Cache Strategy

### Static Assets (1 Year Cache)
- **Images**: jpg, jpeg, png, gif, webp, svg, ico
- **Videos**: mp4, webm
- **CSS/JavaScript**: css, js
- **Fonts**: woff, woff2, ttf, otf, eot

**Cache-Control**: `public, max-age=31536000, immutable`
- `public`: Can be cached by browsers and CDNs
- `max-age=31536000`: Cache for 1 year (365 days)
- `immutable`: Tells browsers the file will never change

### Dynamic Content (No Cache)
- **HTML pages**: html, htm
- **API responses**: json, xml
- **API routes**: /api/*

**Cache-Control**: `no-cache, no-store, must-revalidate`

## Backend Configuration (Laravel)

### Apache (.htaccess)

The configuration is in `backend_laravel/public/.htaccess`:

**Features:**
- Expires headers using `mod_expires`
- Cache-Control headers using `mod_headers`
- Gzip compression using `mod_deflate`
- CORS headers for fonts

**Key Sections:**

1. **Expires Module**: Sets expiration times for different file types
2. **Headers Module**: Sets Cache-Control headers with immutable flag
3. **Deflate Module**: Enables gzip compression for text-based files

### Nginx (nginx.conf.example)

An example Nginx configuration is provided in `backend_laravel/nginx.conf.example`:

**Features:**
- Location-based caching rules
- Separate rules for storage files
- API route exclusion from caching
- Gzip compression configuration
- SSL/TLS configuration example

**To Use:**
1. Copy `nginx.conf.example` to your nginx sites-available directory
2. Update paths and domain names
3. Create symlink to sites-enabled
4. Test configuration: `sudo nginx -t`
5. Reload nginx: `sudo systemctl reload nginx`

## Frontend Configuration (Next.js)

The configuration is in `frontend_next/next.config.ts`:

**Headers Configuration:**

1. **Static Images** (`/images/:path*`): 1 year cache
2. **Static Videos** (`/video/:path*`): 1 year cache
3. **SVG Files** (`/:path*.svg`): 1 year cache
4. **Next.js Static Files** (`/_next/static/:path*`): 1 year cache
5. **Next.js Images** (`/_next/image/:path*`): 1 year cache
6. **API Routes** (`/api/:path*`): No cache
7. **HTML Pages** (`/:path*.html`): No cache
8. **Security Headers**: Applied to all routes

## Verification

### Using Browser DevTools

1. **Open DevTools** (F12 or Right-click → Inspect)
2. **Go to Network tab**
3. **Load a page** with static assets
4. **Click on a static asset** (image, CSS, JS)
5. **Check Response Headers**:
   - Look for `Cache-Control: public, max-age=31536000, immutable`
   - Look for `Expires` header (should be ~1 year in future)

### Using curl

```bash
# Check image caching
curl -I http://localhost:8000/storage/images/example.jpg

# Check CSS caching
curl -I http://localhost:3000/_next/static/css/app.css

# Check API (should not be cached)
curl -I http://localhost:8000/api/projects
```

**Expected Headers for Static Assets:**
```
Cache-Control: public, max-age=31536000, immutable
Expires: [Date 1 year in future]
```

**Expected Headers for API:**
```
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

### Using Online Tools

1. **GTmetrix** (https://gtmetrix.com/)
   - Enter your URL
   - Check "Leverage browser caching" score
   - Should show static assets cached for 1 year

2. **WebPageTest** (https://www.webpagetest.org/)
   - Run test on your site
   - Check "Cache Static Content" grade
   - Review caching headers in waterfall

3. **Google PageSpeed Insights** (https://pagespeed.web.dev/)
   - Enter your URL
   - Check "Serve static assets with an efficient cache policy"
   - Should show improved caching

## Cache Busting Strategy

### Next.js (Automatic)
Next.js automatically adds content hashes to static files:
- `/_next/static/chunks/[hash].js`
- When files change, hash changes, forcing new download

### Laravel (Manual)
For custom assets, use versioning:

```php
// In blade templates
<link rel="stylesheet" href="{{ asset('css/app.css?v=' . config('app.version')) }}">

// Or use Laravel Mix versioning
<link rel="stylesheet" href="{{ mix('css/app.css') }}">
```

## Performance Impact

### Before Optimization
- Static assets downloaded on every page load
- Increased bandwidth usage
- Slower page loads for returning visitors

### After Optimization
- Static assets cached for 1 year
- Reduced server load
- Faster page loads (assets loaded from browser cache)
- Reduced bandwidth costs

### Expected Improvements
- **First Visit**: Similar load time (assets must be downloaded)
- **Return Visits**: 50-80% faster load time
- **Bandwidth**: 60-90% reduction for returning visitors

## Troubleshooting

### Assets Not Caching

1. **Check Apache modules**:
   ```bash
   # Enable required modules
   sudo a2enmod expires
   sudo a2enmod headers
   sudo a2enmod deflate
   sudo systemctl restart apache2
   ```

2. **Check Nginx configuration**:
   ```bash
   # Test configuration
   sudo nginx -t
   
   # Reload if OK
   sudo systemctl reload nginx
   ```

3. **Clear browser cache**:
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Option+E

4. **Check .htaccess is being read**:
   ```bash
   # In Apache config, ensure AllowOverride is set
   <Directory /path/to/public>
       AllowOverride All
   </Directory>
   ```

### Cache Not Updating After File Changes

This is expected behavior with long cache times. Solutions:

1. **Use versioning** (recommended):
   ```html
   <link rel="stylesheet" href="/css/app.css?v=2.0">
   ```

2. **Use content hashing** (Next.js does this automatically)

3. **For development**, use shorter cache times or disable caching

### Headers Not Appearing

1. **Check server configuration** is active
2. **Verify file types** match the patterns
3. **Check for conflicting headers** in application code
4. **Review server error logs** for configuration issues

## Production Deployment

### Checklist

- [ ] Apache/Nginx configuration updated
- [ ] Required modules enabled (Apache: expires, headers, deflate)
- [ ] Configuration tested with `nginx -t` or Apache config test
- [ ] Server reloaded/restarted
- [ ] Cache headers verified in browser DevTools
- [ ] Performance tested with GTmetrix or similar
- [ ] CDN configuration updated (if using CDN)
- [ ] Monitoring set up for cache hit rates

### CDN Integration

If using a CDN (Cloudflare, CloudFront, etc.):

1. **Respect origin headers**: Configure CDN to respect Cache-Control headers
2. **Set CDN cache times**: Can be longer than origin (e.g., 1 year)
3. **Configure purge rules**: Set up cache purging for deployments
4. **Enable compression**: Most CDNs offer additional compression

## Maintenance

### Regular Tasks

1. **Monitor cache hit rates** in server logs
2. **Review cache headers** after deployments
3. **Update versioning** for custom assets
4. **Test caching** after server updates
5. **Review and optimize** cache strategy quarterly

### When to Update

- After major framework updates (Laravel, Next.js)
- When adding new asset types
- If performance issues arise
- When changing hosting/CDN providers

## References

- [MDN: Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Next.js: Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Apache mod_expires](https://httpd.apache.org/docs/current/mod/mod_expires.html)
- [Nginx Caching Guide](https://www.nginx.com/blog/nginx-caching-guide/)
