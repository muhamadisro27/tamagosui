import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef, FC } from "react"

type SkeletonProps = {} & ComponentPropsWithoutRef<"div">

const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('w-full h-6 animate-pulse bg-gray-400/60 rounded-sm', className)}
      {...props}
    />
  )
}

export default Skeleton
