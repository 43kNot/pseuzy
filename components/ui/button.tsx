import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        link: "underline-offset-4 hover:underline text-primary active:text-primary/90",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
      state: {
        default: "",
        loading: "cursor-wait",
        error: "cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  loadingVariant?: "spinner" | "dots" | "skeleton" | "pulse" | "wave"
  loadingSize?: "sm" | "default" | "lg"
  error?: boolean
  errorText?: string
  tooltip?: string
  ariaLabel?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    isLoading, 
    loadingText, 
    loadingVariant = "spinner", 
    loadingSize = "default",
    error,
    errorText,
    tooltip,
    ariaLabel,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const buttonState = isLoading ? "loading" : error ? "error" : "default"
    const buttonAriaLabel = ariaLabel || (typeof children === "string" ? children : undefined)
    
    const content = (
      <div className="relative w-full h-full flex items-center justify-center">
        {isLoading ? (
          <>
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {loadingVariant === "spinner" && (
                <span className={cn(
                  "loading-spinner",
                  loadingSize === "sm" && "mobile-loading-spinner-sm tablet-loading-spinner-sm desktop-loading-spinner-sm",
                  loadingSize === "default" && "mobile-loading-spinner tablet-loading-spinner desktop-loading-spinner",
                  loadingSize === "lg" && "mobile-loading-spinner-lg tablet-loading-spinner-lg desktop-loading-spinner-lg"
                )} />
              )}
              {loadingVariant === "dots" && (
                <span className={cn(
                  "loading-dots",
                  loadingSize === "sm" && "mobile-loading-dots-sm tablet-loading-dots-sm desktop-loading-dots-sm",
                  loadingSize === "default" && "mobile-loading-dots tablet-loading-dots desktop-loading-dots",
                  loadingSize === "lg" && "mobile-loading-dots-lg tablet-loading-dots-lg desktop-loading-dots-lg"
                )} />
              )}
              {loadingVariant === "skeleton" && (
                <span className={cn(
                  "loading-skeleton",
                  loadingSize === "sm" && "mobile-loading-skeleton-sm tablet-loading-skeleton-sm desktop-loading-skeleton-sm",
                  loadingSize === "default" && "mobile-loading-skeleton tablet-loading-skeleton desktop-loading-skeleton",
                  loadingSize === "lg" && "mobile-loading-skeleton-lg tablet-loading-skeleton-lg desktop-loading-skeleton-lg"
                )} />
              )}
              {loadingVariant === "pulse" && (
                <span className={cn(
                  "loading-pulse",
                  loadingSize === "sm" && "mobile-loading-pulse-sm tablet-loading-pulse-sm desktop-loading-pulse-sm",
                  loadingSize === "default" && "mobile-loading-pulse tablet-loading-pulse desktop-loading-pulse",
                  loadingSize === "lg" && "mobile-loading-pulse-lg tablet-loading-pulse-lg desktop-loading-pulse-lg"
                )} />
              )}
              {loadingVariant === "wave" && (
                <span className={cn(
                  "loading-wave",
                  loadingSize === "sm" && "mobile-loading-wave-sm tablet-loading-wave-sm desktop-loading-wave-sm",
                  loadingSize === "default" && "mobile-loading-wave tablet-loading-wave desktop-loading-wave",
                  loadingSize === "lg" && "mobile-loading-wave-lg tablet-loading-wave-lg desktop-loading-wave-lg"
                )} />
              )}
            </span>
            {loadingText && (
              <span className="invisible">
                {loadingText}
              </span>
            )}
          </>
        ) : error ? (
          <>
            <span className="absolute inset-0 flex items-center justify-center text-destructive" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  loadingSize === "sm" && "h-4 w-4",
                  loadingSize === "default" && "h-5 w-5",
                  loadingSize === "lg" && "h-6 w-6"
                )}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            {errorText && (
              <span className="invisible">
                {errorText}
              </span>
            )}
          </>
        ) : (
          children
        )}
        {tooltip && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-background border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {tooltip}
          </span>
        )}
      </div>
    )
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, state: buttonState, className }),
          "mobile-button tablet-button desktop-button",
          isLoading && "relative text-transparent transition-none hover:text-transparent",
          "mobile-touch-tap tablet-touch-tap desktop-touch-tap",
          tooltip && "group relative"
        )}
        ref={ref}
        disabled={isLoading || error}
        aria-label={buttonAriaLabel}
        aria-busy={isLoading}
        aria-invalid={error}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
