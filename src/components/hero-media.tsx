'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'

interface HeroMediaProps {
  type: 'image' | 'video'
  src: string
  title: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonAction?: () => void
  height?: 'small' | 'medium' | 'large' | 'full'
  overlay?: boolean
  autoplay?: boolean
  muted?: boolean
  className?: string
}

export function HeroMedia({
  type,
  src,
  title,
  subtitle,
  description,
  buttonText,
  buttonAction,
  height = 'large',
  overlay = true,
  autoplay = true,
  muted = true,
  className = ''
}: HeroMediaProps) {
  const [isMuted, setIsMuted] = useState(muted)
  const [isPlaying, setIsPlaying] = useState(autoplay)

  const heightClasses = {
    small: 'h-64',
    medium: 'h-96',
    large: 'h-screen',
    full: 'min-h-screen'
  }

  const toggleMute = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className={`relative ${heightClasses[height]} w-full overflow-hidden ${className}`}>
      {/* Background Media */}
      {type === 'image' ? (
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <video
          id="hero-video"
          className="w-full h-full object-cover"
          autoPlay={autoplay}
          muted={isMuted}
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      )}

      {/* Video Controls */}
      {type === 'video' && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70"
            onClick={togglePlay}
          >
            <Play className={`h-5 w-5 ${isPlaying ? 'hidden' : 'block'}`} />
            <div className={`h-5 w-5 ${!isPlaying ? 'hidden' : 'block'}`}>
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          {subtitle && (
            <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">
              {subtitle}
            </Badge>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
              {description}
            </p>
          )}
          {buttonText && buttonAction && (
            <Button
              size="lg"
              onClick={buttonAction}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 magical-button"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}