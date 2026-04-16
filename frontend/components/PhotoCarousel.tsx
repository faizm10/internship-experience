"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

import type { SectionPhoto } from "@/components/Section"
import { PhotoCard } from "@/components/PhotoCard"
import { cn } from "@/lib/utils"

function clampIndex(next: number, length: number) {
  if (length <= 0) return 0
  return ((next % length) + length) % length
}

export function PhotoCarousel({
  photos,
  onOpen,
  className,
  initialIndex = 0,
}: {
  photos: SectionPhoto[]
  onOpen: (photo: SectionPhoto, index: number, photos: SectionPhoto[]) => void
  className?: string
  initialIndex?: number
}) {
  const safeInitial = clampIndex(initialIndex, photos.length)
  const [index, setIndex] = React.useState(safeInitial)
  const [dir, setDir] = React.useState<-1 | 1>(1)

  const active = photos[index]

  const go = React.useCallback(
    (delta: -1 | 1) => {
      setDir(delta)
      setIndex((i) => clampIndex(i + delta, photos.length))
    },
    [photos.length]
  )

  const goTo = React.useCallback(
    (next: number) => {
      if (photos.length <= 0) return
      const nextIdx = clampIndex(next, photos.length)
      setDir(nextIdx > index ? 1 : -1)
      setIndex(nextIdx)
    },
    [index, photos.length]
  )

  const [dragStartX, setDragStartX] = React.useState<number | null>(null)

  return (
    <div
      className={cn("w-full", className)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          go(-1)
        } else if (e.key === "ArrowRight") {
          e.preventDefault()
          go(1)
        }
      }}
      onPointerDown={(e) => setDragStartX(e.clientX)}
      onPointerUp={(e) => {
        if (dragStartX == null) return
        const dx = e.clientX - dragStartX
        setDragStartX(null)
        // swipe threshold
        if (Math.abs(dx) < 40) return
        go(dx > 0 ? -1 : 1)
      }}
      onPointerCancel={() => setDragStartX(null)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="os-mono text-[11px] tracking-[0.26em] uppercase text-muted-foreground">
          photos ({photos.length})
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-background/60 px-3 text-[13px] text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Previous photo"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-background/60 px-3 text-[13px] text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Next photo"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative flex justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {active ? (
              <motion.div
                key={`${active.src}-${active.captionTitle}-${index}`}
                initial={{
                  opacity: 0,
                  x: dir === 1 ? 18 : -18,
                  filter: "blur(8px)",
                }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  x: dir === 1 ? -18 : 18,
                  filter: "blur(8px)",
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <PhotoCard
                  photo={active}
                  onClick={() => onOpen(active, index, photos)}
                  className="w-full md:w-[520px]"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {photos.length > 1 ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {photos.map((p, i) => {
              const isActive = i === index
              return (
                <button
                  key={`${p.src}-${p.captionTitle}-dot-${i}`}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border transition",
                    isActive
                      ? "border-primary bg-primary/70"
                      : "border-border bg-background/60 hover:bg-background/85"
                  )}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                />
              )
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-3 text-[12px] text-muted-foreground">
        Tip: use <span className="font-medium text-foreground/80">←</span> /{" "}
        <span className="font-medium text-foreground/80">→</span> keys, or swipe on mobile.
      </div>
    </div>
  )
}

