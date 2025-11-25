# 📸 Media Guide for Pouneh Wildflower Website

## Quick Start

### 1. Add Images
```bash
# Place your images in the public folder
cp your-photo.jpg /home/z/my-project/public/images/
cp book-cover.jpg /home/z/my-project/public/images/
```

### 2. Add Videos
```bash
# Place videos in the public folder
cp your-video.mp4 /home/z/my-project/public/videos/
cp video-thumbnail.jpg /home/z/my-project/public/images/
```

## Usage Examples

### Basic Image
```tsx
<img 
  src="/images/your-photo.jpg" 
  alt="Description" 
  className="w-full rounded-lg"
/>
```

### Optimized Image (Recommended)
```tsx
import Image from 'next/image'

<Image
  src="/images/your-photo.jpg"
  alt="Description"
  width={500}
  height={300}
  className="rounded-lg"
  priority // For hero images
/>
```

### Video
```tsx
<video
  controls
  className="w-full rounded-lg"
  poster="/images/video-thumbnail.jpg"
>
  <source src="/videos/your-video.mp4" type="video/mp4" />
</video>
```

### YouTube Embed
```tsx
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  className="w-full aspect-video rounded-lg"
  allowFullScreen
/>
```

## Media Gallery Component

Use the pre-built gallery component:

```tsx
import { MediaGallery } from '@/components/media-gallery'

const mediaItems = [
  {
    id: '1',
    type: 'image',
    src: '/images/book-signing.jpg',
    title: 'Book Signing Event',
    description: 'Meeting young readers'
  },
  {
    id: '2',
    type: 'video',
    src: '/videos/reading-session.mp4',
    thumbnail: '/images/reading-thumb.jpg',
    title: 'Story Time Reading'
  }
]

<MediaGallery items={mediaItems} />
```

## Hero Media Component

For full-width hero sections:

```tsx
import { HeroMedia } from '@/components/hero-media'

<HeroMedia
  type="video"
  src="/videos/hero-video.mp4"
  title="Welcome to My Magical World"
  subtitle="Children's Author"
  description="Creating stories that inspire young minds"
  height="large"
  autoplay
  muted
/>
```

## File Organization

```
public/
├── images/
│   ├── book-signing-1.jpg
│   ├── reading-session-thumb.jpg
│   └── gallery/
├── videos/
│   ├── reading-session.mp4
│   └── interview.mp4
└── gallery/
    ├── photo1.jpg
    └── video1.mp4
```

## Best Practices

### Images
- ✅ Use WebP format for better compression
- ✅ Keep width under 1920px for web
- ✅ Add descriptive alt text
- ✅ Use `priority` for above-the-fold images

### Videos
- ✅ Use MP4 with H.264 codec
- ✅ Keep file size under 100MB
- ✅ Create custom thumbnails
- ✅ Add poster images for better UX

### Performance
- ✅ Lazy load images when possible
- ✅ Compress media files before uploading
- ✅ Use responsive images with `srcset`
- ✅ Consider CDNs for large media files

## Adding to Existing Sections

### Update Book Covers
```tsx
// In the books section, replace:
src="/book1-cover.jpg"
// With:
src="/images/your-new-book-cover.jpg"
```

### Add Author Photos
```tsx
// In the about section, replace:
src="/author-portrait.jpg"
// With:
src="/images/your-author-photo.jpg"
```

### Add Gallery to Navigation
```tsx
// Add to navigation:
<a href="#gallery">Gallery</a>

// Add gallery section:
<section id="gallery">
  <MediaGallery items={yourMediaItems} />
</section>
```

## Need Help?

1. **File not showing?** Check the path in `/public/`
2. **Video not playing?** Ensure MP4 format with H.264 codec
3. **Images loading slow?** Optimize and compress first
4. **Want advanced features?** Check the component files for more options