import { useState, useEffect, useRef } from 'react'
import { OptimizedImage } from './OptimizedImage'

/**
 * Composant pour lazy loading d'images avec Intersection Observer
 * Plus performant que le lazy loading natif pour les images hors viewport
 */
export const LazyImage = ({ src, alt, className, threshold = 0.1, ...props }) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold,
        rootMargin: '50px', // Commence à charger 50px avant d'être visible
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
      observer.disconnect()
    }
  }, [threshold])

  return (
    <div ref={imgRef} className={className}>
      {shouldLoad ? (
        <OptimizedImage src={src} alt={alt} className={className} {...props} />
      ) : (
        <div className="bg-slate-900 animate-pulse w-full h-full" />
      )}
    </div>
  )
}



