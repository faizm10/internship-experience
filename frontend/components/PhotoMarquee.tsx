"use client"

import { useMemo, useState } from "react"
import type { SectionPhoto } from "@/components/Section"
import { Marquee } from "@/components/ui/marquee"
import { PhotoCard } from "@/components/PhotoCard"
import { PhotoModal } from "@/components/PhotoModal"

export function PhotoMarquee({ photos }: { photos: SectionPhoto[] }) {
  const [active, setActive] = useState<SectionPhoto | null>(null)

  const half = useMemo(() => {
    const mid = Math.ceil(photos.length / 2)
    return [photos.slice(0, mid), photos.slice(mid)]
  }, [photos])

  const rowA = half[0].length ? half[0] : photos
  const rowB = half[1].length ? half[1] : photos

  return (
    <div className="relative overflow-hidden">
      {/* Desktop: two horizontal rows */}
      <div className="hidden md:block">
        <Marquee pauseOnHover className="[--duration:42s] [--gap:1.25rem]">
          {rowA.map((p) => (
            <PhotoCard key={`${p.src}-${p.captionTitle}`} photo={p} onClick={() => setActive(p)} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          reverse
          className="mt-3 [--duration:48s] [--gap:1.25rem]"
        >
          {rowB.map((p) => (
            <PhotoCard key={`${p.src}-${p.captionTitle}-b`} photo={p} onClick={() => setActive(p)} />
          ))}
        </Marquee>
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

