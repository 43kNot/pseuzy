import * as React from 'react'
import { useIntersection } from '@/hooks/use-intersection'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  placeholder?: string
  className?: string
  onLoad?: () => void
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  placeholder,
  className,
  onLoad,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [setRef, isIntersecting] = useIntersection<HTMLImageElement>({
    rootMargin: '50px 0px',
    freezeOnceVisible: true,
    skip: priority,
  })

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)

  const handleLoad = React.useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = React.useCallback(() => {
    setError(true)
  }, [])

  const shouldLoad = priority || isIntersecting

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {placeholder && !isLoaded && !error && (
        <div
          className="absolute inset-0 blur-[2px] scale-110 transform"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      )}
      <img
        ref={setRef}
        src={shouldLoad ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? undefined : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted/10"
          role="alert"
          aria-label={`Failed to load image: ${alt}`}
        >
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </div>
  )
} 