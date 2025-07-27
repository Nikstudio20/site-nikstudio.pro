# Media Format Compatibility System

This document describes the comprehensive media format compatibility system implemented for cross-browser support.

## Overview

The media compatibility system automatically detects browser capabilities and provides optimal media format selection with fallback strategies. It ensures consistent media experience across different browsers while leveraging modern formats when available.

## Features

### 🖼️ Image Format Support
- **WebP Detection**: Automatic WebP support detection with JPEG/PNG fallbacks
- **AVIF Detection**: Next-generation AVIF format support with graceful degradation
- **Automatic Format Selection**: Chooses the best supported format automatically
- **Error Handling**: Automatic fallback to alternative formats on load failure

### 🎥 Video Format Support
- **Multiple Codec Support**: H.264, VP8, VP9, AV1 codec detection
- **Format Optimization**: Automatic selection of WebM, MP4, or OGG based on browser support
- **Fallback Strategies**: Seamless fallback to supported formats
- **Loading Error Recovery**: Automatic retry with alternative formats

### 🔧 Developer Tools
- **React Components**: Ready-to-use `CompatibleImage` and `CompatibleVideo` components
- **Custom Hooks**: `useMediaCompatibility` and `useMediaErrorHandling` hooks
- **Context Provider**: `MediaCompatibilityProvider` for app-wide compatibility state
- **TypeScript Support**: Full TypeScript definitions and type safety

## Quick Start

### 1. Wrap Your App with Provider

```tsx
import { MediaCompatibilityProvider } from '@/components/MediaCompatibilityProvider';

function App() {
  return (
    <MediaCompatibilityProvider>
      {/* Your app content */}
    </MediaCompatibilityProvider>
  );
}
```

### 2. Use Compatible Components

#### Compatible Image Component

```tsx
import { CompatibleImage } from '@/components/CompatibleImage';

// Single source
<CompatibleImage
  src="/path/to/image.jpg"
  alt="Description"
  className="w-full h-64 object-cover"
/>

// Multiple format sources
<CompatibleImage
  src={{
    webp: '/path/to/image.webp',
    avif: '/path/to/image.avif',
    jpeg: '/path/to/image.jpg'
  }}
  alt="Description"
  className="w-full h-64 object-cover"
/>
```

#### Compatible Video Component

```tsx
import { CompatibleVideo } from '@/components/CompatibleVideo';

// Single source
<CompatibleVideo
  src="/path/to/video.mp4"
  poster="/path/to/poster.jpg"
  controls
  muted
/>

// Multiple format sources
<CompatibleVideo
  src={{
    webm: '/path/to/video.webm',
    mp4: '/path/to/video.mp4',
    ogg: '/path/to/video.ogg'
  }}
  poster="/path/to/poster.jpg"
  controls
  muted
/>
```

### 3. Use Compatibility Hooks

```tsx
import { useMediaCompatibility } from '@/hooks/use-media-compatibility';

function MyComponent() {
  const { 
    support, 
    isLoading, 
    supportsWebP, 
    supportedVideoFormats,
    getOptimalImageFormat 
  } = useMediaCompatibility();

  if (isLoading) return <div>Loading compatibility info...</div>;

  return (
    <div>
      <p>WebP Support: {supportsWebP ? 'Yes' : 'No'}</p>
      <p>Supported Video Formats: {supportedVideoFormats.join(', ')}</p>
    </div>
  );
}
```

## API Reference

### MediaCompatibilityService

Core service that handles format detection and compatibility logic.

#### Methods

- `supportsWebP(): Promise<boolean>` - Detect WebP support
- `supportsAVIF(): Promise<boolean>` - Detect AVIF support
- `getSupportedVideoFormats(): string[]` - Get supported video formats
- `getOptimalVideoFormat(formats: string[]): string | null` - Get best video format
- `getOptimalImageFormat(formats: string[]): Promise<string>` - Get best image format
- `handleMediaError(element, fallbacks)` - Handle media loading errors

### CompatibleImage Props

```typescript
interface CompatibleImageProps {
  src: string | ImageSource;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (error: Event) => void;
  fallbackSrc?: string;
}

interface ImageSource {
  webp?: string;
  avif?: string;
  jpeg?: string;
  jpg?: string;
  png?: string;
}
```

### CompatibleVideo Props

```typescript
interface CompatibleVideoProps {
  src: string | VideoSource;
  poster?: string;
  className?: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
  onError?: (error: Event) => void;
  onCanPlay?: () => void;
  fallbackMessage?: string;
}

interface VideoSource {
  mp4?: string;
  webm?: string;
  ogg?: string;
}
```

### useMediaCompatibility Hook

```typescript
interface UseMediaCompatibilityReturn {
  support: MediaFormatSupport | null;
  isLoading: boolean;
  error: string | null;
  supportsWebP: boolean | null;
  supportsAVIF: boolean | null;
  supportedVideoFormats: string[];
  getOptimalImageFormat: (formats: string[]) => Promise<string>;
  getOptimalVideoFormat: (formats: string[]) => string | null;
  generateFallbackUrls: (baseUrl: string, formats: string[]) => string[];
  checkMediaSupport: () => Promise<void>;
}
```

## Browser Support Matrix

### Image Formats

| Format | Chrome | Firefox | Safari | Edge | Fallback |
|--------|--------|---------|--------|------|----------|
| WebP   | 23+    | 65+     | 14+    | 18+  | JPEG/PNG |
| AVIF   | 85+    | 93+     | 16+    | 85+  | WebP/JPEG |
| JPEG   | ✅     | ✅      | ✅     | ✅   | -        |
| PNG    | ✅     | ✅      | ✅     | ✅   | -        |

### Video Formats

| Format | Chrome | Firefox | Safari | Edge | Fallback |
|--------|--------|---------|--------|------|----------|
| WebM   | 6+     | 4+      | 14.1+  | 17+  | MP4      |
| MP4    | 3+     | 35+     | 3.1+   | 12+  | -        |
| OGG    | 3+     | 3.5+    | ❌     | ❌   | MP4      |

### Video Codecs

| Codec | Chrome | Firefox | Safari | Edge | Support Level |
|-------|--------|---------|--------|------|---------------|
| H.264 | ✅     | ✅      | ✅     | ✅   | Universal     |
| VP8   | ✅     | ✅      | 14.1+  | ✅   | Wide          |
| VP9   | 29+    | 28+     | 14.1+  | 14+  | Modern        |
| AV1   | 70+    | 67+     | ❌     | 75+  | Cutting-edge  |

## Error Handling

The system provides comprehensive error handling:

### Automatic Fallbacks
- If a modern format fails to load, automatically tries legacy formats
- Maintains a queue of fallback URLs and tries them sequentially
- Provides user-friendly error messages in Russian

### Error Recovery Strategies
1. **Format Fallback**: Try alternative formats (WebP → JPEG → PNG)
2. **Source Fallback**: Try alternative sources for the same format
3. **Graceful Degradation**: Show placeholder or error message if all fail

### Custom Error Handling

```tsx
<CompatibleImage
  src="/image.webp"
  alt="Image"
  onError={(error) => {
    console.log('Image failed to load:', error);
    // Custom error handling logic
  }}
  fallbackSrc="/placeholder.jpg"
/>
```

## Performance Considerations

### Optimization Features
- **Caching**: Format support detection results are cached
- **Lazy Loading**: Images load lazily by default (can be overridden)
- **Minimal Bundle Impact**: Only loads polyfills when needed
- **Efficient Detection**: Uses lightweight detection methods

### Best Practices
1. **Provide Multiple Formats**: Always provide fallback formats
2. **Optimize File Sizes**: Use appropriate compression for each format
3. **Use Appropriate Formats**: WebP for photos, PNG for graphics with transparency
4. **Test Across Browsers**: Verify functionality in target browsers

## Testing

The system includes comprehensive tests:

```bash
# Run media compatibility tests
npm test media-compatibility

# Run component tests
npm test CompatibleImage CompatibleVideo

# Run hook tests
npm test use-media-compatibility
```

### Test Coverage
- ✅ Format detection accuracy
- ✅ Fallback mechanism functionality
- ✅ Error handling scenarios
- ✅ Component rendering
- ✅ Hook behavior
- ✅ Cross-browser compatibility

## Integration Examples

### With Existing Media Components

```tsx
// Replace existing img tags
// Before:
<img src="/image.jpg" alt="Image" />

// After:
<CompatibleImage src="/image.jpg" alt="Image" />
```

### With Next.js Image Component

```tsx
import { useMediaCompatibility } from '@/hooks/use-media-compatibility';
import Image from 'next/image';

function OptimizedImage({ src, ...props }) {
  const { getOptimalImageFormat } = useMediaCompatibility();
  const [optimalSrc, setOptimalSrc] = useState(src);

  useEffect(() => {
    if (typeof src === 'object') {
      getOptimalImageFormat(Object.keys(src)).then(format => {
        setOptimalSrc(src[format]);
      });
    }
  }, [src, getOptimalImageFormat]);

  return <Image src={optimalSrc} {...props} />;
}
```

### With Media Galleries

```tsx
function MediaGallery({ items }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item.id}>
          {item.type === 'image' ? (
            <CompatibleImage
              src={item.sources}
              alt={item.alt}
              className="w-full h-48 object-cover"
            />
          ) : (
            <CompatibleVideo
              src={item.sources}
              poster={item.poster}
              className="w-full h-48"
              controls
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and ensure fallback formats exist
2. **Videos not playing**: Verify codec support and provide multiple formats
3. **Slow loading**: Implement proper lazy loading and optimize file sizes
4. **Console errors**: Check browser console for specific error messages

### Debug Mode

Enable debug logging:

```typescript
// In development
if (process.env.NODE_ENV === 'development') {
  window.mediaCompatibilityDebug = true;
}
```

This will log detailed information about format detection and fallback attempts.

## Contributing

To extend the media compatibility system:

1. Add new format detection methods to `MediaCompatibilityService`
2. Update the `MediaFormatSupport` interface
3. Add corresponding tests
4. Update documentation

## License

This media compatibility system is part of the cross-browser compatibility implementation and follows the same license as the main project.