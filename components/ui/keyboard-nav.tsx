import * as React from 'react'

interface KeyboardNavProps {
  children: React.ReactNode
  className?: string
  onKeyDown?: (event: KeyboardEvent) => void
}

export function KeyboardNav({ children, className, onKeyDown }: KeyboardNavProps) {
  const [isKeyboardUser, setIsKeyboardUser] = React.useState(false)

  React.useEffect(() => {
    function handleFirstTab(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        setIsKeyboardUser(true)
        window.removeEventListener('keydown', handleFirstTab)
      }
    }

    window.addEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', () => setIsKeyboardUser(false))
    window.addEventListener('touchstart', () => setIsKeyboardUser(false))

    return () => {
      window.removeEventListener('keydown', handleFirstTab)
      window.removeEventListener('mousedown', () => setIsKeyboardUser(false))
      window.removeEventListener('touchstart', () => setIsKeyboardUser(false))
    }
  }, [])

  React.useEffect(() => {
    if (!onKeyDown) return

    function handleKeyDown(event: KeyboardEvent) {
      if (isKeyboardUser && typeof onKeyDown === 'function') {
        onKeyDown(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isKeyboardUser, onKeyDown])

  return (
    <div
      className={`${className} ${isKeyboardUser ? 'keyboard-nav' : ''}`}
      data-keyboard-nav={isKeyboardUser}
    >
      {children}
    </div>
  )
}

export function useKeyboardShortcut(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: {
    ctrl?: boolean
    alt?: boolean
    shift?: boolean
    meta?: boolean
  } = {}
) {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { ctrl = false, alt = false, shift = false, meta = false } = options

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.altKey === alt &&
        event.shiftKey === shift &&
        event.metaKey === meta
      ) {
        callback(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, options])
}

export function KeyboardShortcut({
  shortcut,
  className,
}: {
  shortcut: string
  className?: string
}) {
  return (
    <kbd
      className={`inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ${className}`}
    >
      {shortcut.split('+').map((key, index) => (
        <React.Fragment key={key}>
          {index > 0 && <span className="text-xs">+</span>}
          <span>{key}</span>
        </React.Fragment>
      ))}
    </kbd>
  )
} 