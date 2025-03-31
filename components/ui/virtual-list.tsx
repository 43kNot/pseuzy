import * as React from 'react'
import { useIntersection } from '@/hooks/use-intersection'

interface VirtualListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemHeight: number
  containerHeight: number
  overscan?: number
  className?: string
  onEndReached?: () => void
  endReachedThreshold?: number
}

export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 3,
  className,
  onEndReached,
  endReachedThreshold = 0.8,
}: VirtualListProps<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = React.useState(0)
  const [setEndRef, isEndVisible] = useIntersection<HTMLDivElement>({
    threshold: endReachedThreshold,
  })

  React.useEffect(() => {
    if (isEndVisible && onEndReached) {
      onEndReached()
    }
  }, [isEndVisible, onEndReached])

  const totalHeight = items.length * itemHeight
  const visibleItems = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(event.currentTarget.scrollTop)
    },
    []
  )

  const visibleItemsStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    transform: `translateY(${startIndex * itemHeight}px)`,
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div
        role="list"
        style={{ height: totalHeight, position: 'relative' }}
        className="w-full"
      >
        <div style={visibleItemsStyle}>
          {items.slice(startIndex, endIndex).map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              role="listitem"
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
      <div ref={setEndRef} style={{ height: 1 }} />
    </div>
  )
} 