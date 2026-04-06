"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { SectionPhoto } from "@/components/Section"

export function PhotoCard({
  photo,
  onClick,
  className,
}: {
  photo: SectionPhoto
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-background/60 text-left backdrop-blur-sm",
        "hover:border-border hover:bg-background/75 transition-colors",
        className
      )}
    >
      <div className="relative aspect-4/3 bg-muted/30">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 280px, 320px"
          className="object-contain opacity-[0.96] group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
      </div>

      <div className="p-4">
        <div className="text-[13px] font-medium text-foreground leading-snug">
          {photo.captionTitle}
        </div>
        <div className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground line-clamp-3">
          {photo.captionBody}
        </div>
      </div>
    </button>
  )
}

