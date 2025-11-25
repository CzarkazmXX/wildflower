'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  title: string
  description?: string
  alt?: string
}

interface MediaGalleryProps {
  items: MediaItem[]
  className?: string
}

export function MediaGallery({ items, className = '' }: MediaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openMedia = (item: MediaItem, index: number) => {
    setSelectedItem(item)
    setCurrentIndex(index)
  }

  const closeMedia = () => {
    setSelectedItem(null)
  }

  const navigateMedia = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + items.length) % items.length
      : (currentIndex + 1) % items.length
    setCurrentIndex(newIndex)
    setSelectedItem(items[newIndex])
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Grid Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card 
            key={item.id} 
            className="group overflow-hidden magical-card cursor-pointer"
            onClick={() => openMedia(item, index)}
          >
            <div className="relative aspect-video overflow-hidden">
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="relative w-full h-full">
                  {item.thumbnail && (
                    <Image
                      src={item.thumbnail}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
              )}
              <Badge className="absolute top-2 right-2 bg-purple-600">
                {item.type === 'image' ? (
                  <><ImageIcon className="h-3 w-3 mr-1" /> Photo</>
                ) : (
                  <><Play className="h-3 w-3 mr-1" /> Video</>
                )}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600 text-sm">{item.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeMedia}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation */}
          {items.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={() => navigateMedia('prev')}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={() => navigateMedia('next')}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Media Content */}
          <div className="max-w-6xl w-full">
            {selectedItem.type === 'image' ? (
              <div className="relative aspect-video">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt || selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative aspect-video">
                <video
                  controls
                  className="w-full h-full"
                  poster={selectedItem.thumbnail}
                >
                  <source src={selectedItem.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            
            {/* Media Info */}
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-gray-300">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Sample usage data
export const sampleMediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/images/book-signing-1.jpg',
    title: 'Book Signing Event',
    description: 'Meeting young readers at the local bookstore',
    alt: 'Pouneh Wildflower signing books for children'
  },
  {
    id: '2',
    type: 'video',
    src: '/videos/reading-session.mp4',
    thumbnail: '/images/reading-session-thumb.jpg',
    title: 'Story Time Reading',
    description: 'Reading "The Rabbit\'s Garden" at the elementary school',
    alt: 'Story reading session video'
  },
  {
    id: '3',
    type: 'image',
    src: '/images/award-ceremony.jpg',
    title: 'Award Ceremony',
    description: 'Receiving the Children\'s Book of the Year award',
    alt: 'Award ceremony photo'
  }
]