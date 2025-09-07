import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Helper component for action buttons to avoid repetition
type ActionButtonProps = {
  onClick: () => void
  disabled: boolean
  isPending: boolean
  label: string
  icon: ReactNode
} & ComponentPropsWithoutRef<typeof Button>

export function ActionButton({
  onClick,
  disabled,
  isPending,
  label,
  icon,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn("w-full cursor-pointer", className)}
      {...props}
    >
      {isPending ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <div className="mr-2 h-4 w-4">{icon}</div>
      )}
      {label}
    </Button>
  )
}
