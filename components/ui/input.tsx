import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean
  loadingVariant?: "spinner" | "dots" | "skeleton"
  loadingSize?: "sm" | "default" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading, loadingVariant = "spinner", loadingSize = "default", ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "mobile-input tablet-input desktop-input",
            "mobile-rounded tablet-rounded desktop-rounded",
            "mobile-border tablet-border desktop-border",
            "mobile-bg tablet-bg desktop-bg",
            "mobile-text tablet-text desktop-text",
            isLoading && "pr-10",
            className
          )}
          ref={ref}
          disabled={isLoading}
          {...props}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
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
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

