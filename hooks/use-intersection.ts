import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
  skip?: boolean
}

export function useIntersection<T extends Element>(
  options: UseIntersectionOptions = {}
): [(element: T | null) => void, boolean] {
  const { 
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    skip = false
  } = options

  const [isIntersecting, setIntersecting] = useState(false)
  const frozen = useRef(false)
  const elementRef = useRef<T | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const handleObserve = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const isIntersecting = entry.isIntersecting

      setIntersecting(isIntersecting)

      if (freezeOnceVisible && isIntersecting) {
        frozen.current = true
        observer.current?.disconnect()
      }
    },
    [freezeOnceVisible]
  )

  const setRef = useCallback(
    (element: T | null) => {
      if (skip || (freezeOnceVisible && frozen.current)) return

      if (elementRef.current) {
        observer.current?.unobserve(elementRef.current)
      }

      elementRef.current = element

      if (!element) {
        observer.current?.disconnect()
        observer.current = null
        return
      }

      if (!observer.current) {
        observer.current = new IntersectionObserver(handleObserve, {
          threshold,
          root,
          rootMargin,
        })
      }

      observer.current.observe(element)
    },
    [freezeOnceVisible, handleObserve, root, rootMargin, threshold, skip]
  )

  useEffect(() => {
    return () => {
      observer.current?.disconnect()
      observer.current = null
    }
  }, [])

  return [setRef, isIntersecting]
} 