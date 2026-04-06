"use client"

import { useEffect, useState } from "react"

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "")

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length === 0) return

        // Prefer the section whose top is closest to (but above) the viewport midpoint.
        const midpoint = window.innerHeight * 0.33
        const ranked = intersecting
          .map((e) => ({
            id: (e.target as HTMLElement).id,
            ratio: e.intersectionRatio ?? 0,
            top: e.boundingClientRect.top,
          }))
          .sort((a, b) => {
            const aDist = Math.abs(a.top - midpoint)
            const bDist = Math.abs(b.top - midpoint)
            if (aDist !== bDist) return aDist - bDist
            return (b.ratio ?? 0) - (a.ratio ?? 0)
          })

        if (ranked[0]?.id) setActiveId(ranked[0].id)
      },
      {
        root: null,
        // Trigger while the section is “in the reading zone”
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.05, 0.15, 0.25, 0.35, 0.5],
      }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sectionIds])

  return activeId
}

