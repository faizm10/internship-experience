"use client"

import { useMemo, useState } from "react"
import type { SectionPhoto } from "@/components/Section"
import { Marquee } from "@/components/ui/marquee"
import { PhotoCard } from "@/components/PhotoCard"
import { PhotoModal } from "@/components/PhotoModal"

export function PhotoMarquee({ photos }: { photos: SectionPhoto[] }) {
  const [active, setActive] = useState<SectionPhoto | null>(null)

  const rows = useMemo(() => {
    if (photos.length <= 5) return [photos]

    const rowA: SectionPhoto[] = []
    const rowB: SectionPhoto[] = []

    // Distribute alternately for better visual balance
    photos.forEach((p, i) => {
      if (i % 2 === 0) rowA.push(p)
      else rowB.push(p)
    })

    return [rowA, rowB]
  }, [photos])

  return (
    <div className="relative overflow-hidden">
      {/* Desktop: one row (<=5 photos) or two balanced rows (>5) */}
      <div className="hidden md:block">
        <Marquee pauseOnHover className="[--duration:42s] [--gap:1.25rem]">
          {(rows[0] ?? []).map((p) => (
            <PhotoCard key={`${p.src}-${p.captionTitle}`} photo={p} onClick={() => setActive(p)} />
          ))}
        </Marquee>
        {rows.length > 1 ? (
          <Marquee
            pauseOnHover
            reverse
            className="mt-3 [--duration:48s] [--gap:1.25rem]"
          >
            {(rows[1] ?? []).map((p) => (
              <PhotoCard
                key={`${p.src}-${p.captionTitle}-b`}
                photo={p}
                onClick={() => setActive(p)}
              />
            ))}
          </Marquee>
        ) : null}
      </div>

      {/* Mobile: vertical marquee */}
      <div className="md:hidden">
        <Marquee vertical pauseOnHover className="[--duration:32s] [--gap:1rem]">
          {photos.map((p) => (
            <div key={`${p.src}-${p.captionTitle}-m`} className="w-full">
              <PhotoCard
                photo={p}
                onClick={() => setActive(p)}
                className="w-full"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <PhotoModal photo={active} onClose={() => setActive(null)} />
    </div>
  )
}

