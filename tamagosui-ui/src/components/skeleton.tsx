import { ComponentPropsWithoutRef, FC } from "react"

type SkeletonProps = {} & ComponentPropsWithoutRef<"div">

const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className="w-full h-6 animate-pulse bg-gray-400/60 rounded-sm"
      {...props}
    />
  )
}

export default Skeleton
