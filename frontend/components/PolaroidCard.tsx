"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export type PolaroidCardProps = {
  src: string
  alt: string
  caption?: string
  /** Degrees; slight tilt reads more “scrapbook”. */
  rotate?: number
  onClick?: () => void
  className?: string
}

export function PolaroidCard({
  src,
  alt,
  caption,
  rotate = 0,
  onClick,
  className,
}: PolaroidCardProps) {
  const inner = (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-muted/25 ring-1 ring-black/8">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          className="object-contain"
        />
      </div>
      {caption ? (
        <div className="mt-3 min-h-9 text-center os-mono text-[12px] leading-snug text-muted-foreground">
          {caption}
        </div>
      ) : (
        <div className="mt-3 min-h-9" aria-hidden />
      )}
    </>
  )

  const frameClass = cn(
    "w-[min(100%,280px)] shrink-0 rounded-[3px] border border-black/12 bg-[oklch(0.99_0.01_150)] p-3.5 pb-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-transform duration-200",
    onClick &&
      "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(0,0,0,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(frameClass, "text-left", className)}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {inner}
      </button>
    )
  }

  return (
    <div className={cn(frameClass, className)} style={{ transform: `rotate(${rotate}deg)` }}>
      {inner}
    </div>
  )
}
