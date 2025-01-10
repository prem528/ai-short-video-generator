'use client'

import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'

export function VideoCard({ videoUrl, overlayText, secondaryText }) {
  const videoRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Card className="relative min-w-[280px] h-[500px] overflow-hidden rounded-xl">
      {/* Loading Shimmer Effect */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-xl z-10" />
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loop
        muted
        playsInline
        autoPlay
        onClick={togglePlay}
        onLoadedData={() => setIsLoading(false)}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay Text */}
      {overlayText && (
        <div className="absolute bottom-16 left-4 right-4 z-20">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-xl font-bold">{overlayText}</span>
            {secondaryText && (
              <p className="text-sm mt-1 text-gray-200">{secondaryText}</p>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
