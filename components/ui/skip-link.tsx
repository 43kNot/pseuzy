import * as React from 'react'

interface SkipLinkProps {
  links: Array<{
    href: string
    label: string
  }>
}

export function SkipLink({ links }: SkipLinkProps) {
  return (
    <nav
      aria-label="Skip navigation"
      className="fixed top-0 left-0 z-50"
    >
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={(e) => {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' })
              if (target instanceof HTMLElement) {
                target.focus({ preventScroll: true })
                target.setAttribute('tabindex', '-1')
                target.addEventListener(
                  'blur',
                  () => {
                    target.removeAttribute('tabindex')
                  },
                  { once: true }
                )
              }
            }
          }}
        >
          Skip to {label}
        </a>
      ))}
    </nav>
  )
} 