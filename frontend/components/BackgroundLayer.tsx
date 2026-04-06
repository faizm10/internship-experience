"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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

export function BackgroundLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="absolute inset-0 bg-gridline opacity-[0.55]" />

      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(20,184,166,0.16)_0%,rgba(20,184,166,0.00)_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_80%_70%,rgba(34,197,94,0.14)_0%,rgba(34,197,94,0.00)_65%)]" />

      {/* Polaroid ghosts */}
      <GhostPolaroid className="left-[8%] top-[18%] h-[220px] w-[190px] opacity-[0.12]" rotate={-8} />
      <GhostPolaroid className="right-[10%] top-[12%] h-[260px] w-[220px] opacity-[0.10]" rotate={10} />
      <GhostPolaroid className="left-[14%] bottom-[10%] h-[240px] w-[210px] opacity-[0.08]" rotate={6} />
      <GhostPolaroid className="right-[16%] bottom-[14%] h-[210px] w-[180px] opacity-[0.09]" rotate={-12} />

      {/* Noise layer */}
      <motion.div
        className="absolute inset-0 bg-noise grain-drift opacity-[0.18] mix-blend-multiply"
        initial={false}
        animate={{ opacity: [0.14, 0.20, 0.14] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.00)_58%,rgba(0,0,0,0.12)_100%)]" />
    </div>
  )
}

