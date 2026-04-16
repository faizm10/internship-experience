"use client"

import { cn } from "@/lib/utils"
import ShapeGrid from "@/components/ui/ShapeGrid"

function GhostPolaroid({
  className,
  rotate,
}: {
  className: string
  rotate: number
}) {
  return (
    <div
      className={cn(
        "absolute rounded-[18px] border border-black/10 bg-black/2 backdrop-blur-[2px] shadow-[0_40px_120px_rgba(0,0,0,0.10)]",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(120%_90%_at_30%_0%,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.00)_55%)]" />
      <div className="absolute left-4 right-4 top-4 bottom-10 rounded-[12px] border border-black/10 bg-black/1.5" />
      <div className="absolute left-5 right-5 bottom-4 h-3 rounded-full bg-black/3" />
    </div>
  )
}

export function BackgroundLayer({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-background" />

      {/* React Bits ShapeGrid background (interactive hover, but does not block clicks) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <ShapeGrid
          speed={0.55}
          squareSize={42}
          direction="diagonal"
          borderColor="rgba(0,0,0,0.10)"
          hoverFillColor="rgba(34,197,94,0.22)"
          shape="square"
          hoverTrailAmount={6}
        />
      </div>

      {/* Optional polish: keep your subtle polaroid ghosts */}
      <div className="pointer-events-none absolute inset-0">
        <GhostPolaroid className="left-[8%] top-[18%] h-[220px] w-[190px] opacity-[0.10]" rotate={-8} />
        <GhostPolaroid className="right-[10%] top-[12%] h-[260px] w-[220px] opacity-[0.08]" rotate={10} />
        <GhostPolaroid className="left-[14%] bottom-[10%] h-[240px] w-[210px] opacity-[0.06]" rotate={6} />
        <GhostPolaroid className="right-[16%] bottom-[14%] h-[210px] w-[180px] opacity-[0.07]" rotate={-12} />
      </div>

      {/* Soft vignette to keep foreground readable */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.00)_58%,rgba(0,0,0,0.10)_100%)]" />
    </div>
  )
}

