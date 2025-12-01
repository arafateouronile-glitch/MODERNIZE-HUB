import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Composant d'image optimisé avec :
 * - Lazy loading natif
 * - Placeholder pendant le chargement
 * - Support srcset pour responsive
 * - Fallback si erreur
 */
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  srcset,
  sizes,
  placeholder = true,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  const handleLoad = (e) => {
    setIsLoaded(true)
    if (onLoad) onLoad(e)
  }

  const handleError = (e) => {
    setHasError(true)
    if (onError) onError(e)
  }

  // Si erreur, afficher un placeholder
  if (hasError) {
    return (
      <div
        className={`bg-slate-800 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-slate-500 text-sm">Image non disponible</span>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder pendant le chargement */}
      {placeholder && !isLoaded && (
        <div className="absolute inset-0 bg-slate-900 animate-pulse" />
      )}

      {/* Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        srcSet={srcset}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  )
}

/**
 * Composant pour images avec blur-up placeholder
 */
export const BlurImage = ({ src, alt, className, blurDataURL, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-110"
          aria-hidden="true"
        />
      )}

      {/* Image principale */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  )
}

