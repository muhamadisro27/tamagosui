import { cn } from "@/lib/utils"
import { ConnectButton } from "@mysten/dapp-kit"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const location = useLocation()

  const currentPathname = location.pathname

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-2xl font-bold tracking-tighter">TAMAGOSUI</h1>
        <div className="flex items-center space-x-10">
          <div className="flex space-x-10">
            <Link
              className={cn(currentPathname === "/" && "underline font-medium")}
              to={"/"}
            >
              Home
            </Link>
            <Link
              className={cn(
                currentPathname === "/guild" && "underline font-medium"
              )}
              to={"/guild"}
            >
              Guild
            </Link>
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
