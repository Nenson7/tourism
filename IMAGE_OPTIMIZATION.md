# Image Optimization Setup

This project implements heavy image optimization with WebP/AVIF conversion and 70% compression for optimal performance.

## Features

- **WebP & AVIF Support**: Modern image formats with excellent compression
- **70% Compression**: Optimized quality-to-size ratio
- **Responsive Images**: Multiple sizes (400px, 800px, 1280px, 1920px)
- **Progressive Loading**: Smooth image loading experience
- **Browser Fallbacks**: Automatic fallback to original formats
- **Lazy Loading**: Images load only when needed

## Optimization Settings

### Compression Quality: 70%
- JPEG: 70% quality with progressive encoding and mozjpeg optimization
- PNG: 70% quality with maximum compression level (9)
- WebP: 70% quality with near-lossless compression
- AVIF: 70% quality with maximum effort (9)

### Responsive Sizes
- 400px: Mobile devices
- 800px: Tablets
- 1280px: Small desktops
- 1920px: Large displays

## Usage

### 1. Optimize Images
```bash
# Run the optimization script
pnpm run optimize-images

# Or use the npm script
npm run optimize-images
```

### 2. Use OptimizedImage Component
```jsx
import OptimizedImage from './components/OptimizedImage'

// Basic usage
<OptimizedImage 
  src="/static/image.jpg" 
  alt="Description" 
  className="w-full h-auto"
/>

// With responsive sizes
<OptimizedImage 
  src="/static/image.jpg" 
  alt="Description" 
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={true} // For above-the-fold images
/>
```

### 3. Generated Files
For each original image, the script generates:
- `image-400.webp`, `image-800.webp`, `image-1280.webp`, `image-1920.webp`
- `image-400.avif`, `image-800.avif`, `image-1280.avif`, `image-1920.avif`
- `image-400.jpg`, `image-800.jpg`, `image-1280.jpg`, `image-1920.jpg`
- `image.webp`, `image.avif`, `image-optimized.jpg`

## Vite Configuration

The `vite.config.js` includes `vite-plugin-sharp` for build-time optimization:

```javascript
viteSharp({
  include: [
    'public/static/**/*.{jpg,jpeg,png}',
    'public/logos/**/*.{jpg,jpeg,png}',
    'public/markers/**/*.{jpg,jpeg,png}'
  ],
  jpeg: { quality: 70, progressive: true, mozjpeg: true },
  png: { quality: 70, progressive: true, compressionLevel: 9 },
  webp: { quality: 70, effort: 6, nearLossless: true },
  avif: { quality: 70, effort: 9 },
  format: ['webp', 'avif', 'original']
})
```

## Performance Benefits

- **File Size Reduction**: 60-80% smaller than original images
- **Faster Loading**: Progressive loading and modern formats
- **Better SEO**: Improved Core Web Vitals scores
- **Mobile Optimization**: Responsive images for all devices
- **Bandwidth Savings**: Reduced data usage for users

## Browser Support

- **AVIF**: Chrome 85+, Firefox 93+, Safari 16.4+
- **WebP**: Chrome 23+, Firefox 65+, Safari 14+, Edge 18+
- **Fallback**: Original JPEG/PNG for older browsers

## Maintenance

### Adding New Images
1. Place images in `public/static/` directory
2. Run `pnpm run optimize-images` to generate optimized versions
3. Use `OptimizedImage` component in your code

### Updating Optimization Settings
1. Modify settings in `vite.config.js`
2. Update `scripts/optimize-images.js` if needed
3. Re-run optimization script

## Troubleshooting

### Images Not Loading
- Check if optimized versions exist
- Verify file paths are correct
- Ensure Vite build process completed

### Large File Sizes
- Verify compression settings in config
- Check if original images are too large
- Consider reducing source image quality

### Build Errors
- Ensure `sharp` dependency is installed
- Check Node.js version compatibility
- Verify image file formats are supported 