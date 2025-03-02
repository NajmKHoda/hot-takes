import { Flame } from "lucide-react"

interface HotTakesLogoProps {
  className?: string
}

export function HotTakesLogo({ className }: HotTakesLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center mr-4">
        <span className="text-3xl font-bold">H</span>
        <span className="relative mx-0.3">
          <span className="text-3xl font-bold opacity-0">O</span>
          <Flame className="absolute inset-0 text-orange-500 w-full h-full" />
        </span>
        <span className="text-3xl font-bold -ml-0.5">T</span>
      </div>
      <div className="flex items-center">
        <span className="text-3xl font-bold">T</span>
        <span className="text-3xl font-bold">A</span>
        <span className="text-3xl font-bold">K</span>
        <span className="text-3xl font-bold">E</span>
        <span className="text-3xl font-bold">S</span>
      </div>
    </div>
  )
}

