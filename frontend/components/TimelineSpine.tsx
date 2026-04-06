"use client"

import { cn } from "@/lib/utils"

export function TimelineSpine({
  sectionIds,
  activeId,
}: {
  sectionIds: string[]
  activeId: string
}) {
  return (
    <div className="fixed left-0 top-0 h-screen w-[120px] hidden xl:block pointer-events-none">
      <div className="absolute left-10 top-24 bottom-24 w-px bg-white/10" />
      <div className="absolute left-10 top-24 flex flex-col gap-10">
        {sectionIds.map((id) => {
          const isActive = id === activeId
          return (
            <div key={id} className="flex items-center gap-3">
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full border",
                  isActive
                    ? "bg-white/95 border-white/40 shadow-[0_0_0_6px_rgba(255,255,255,0.06)]"
                    : "bg-white/10 border-white/15"
                )}
              />
              <div className="h-px w-6 bg-white/10" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

