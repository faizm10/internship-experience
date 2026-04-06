"use client"

import { cn } from "@/lib/utils"

export type NavItem = { id: string; label: string }

export function LeftNav({
  items,
  activeId,
}: {
  items: NavItem[]
  activeId: string
}) {
  return (
    <nav className="fixed left-10 top-28 z-30 hidden lg:block">
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[9px] top-[6px] bottom-[6px] w-px bg-border/70" />

        <div className="relative flex flex-col gap-4 py-2">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "group flex items-center gap-3 text-[12px] tracking-[0.18em] uppercase",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                )}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="relative h-5 w-5 shrink-0">
                  <span
                    className={cn(
                      "absolute left-[6px] top-[7px] h-2.5 w-2.5 rounded-full border transition-all",
                      isActive
                        ? "bg-primary border-primary/40 shadow-[0_0_0_7px_rgba(34,197,94,0.10)]"
                        : "bg-primary/10 border-primary/20 group-hover:bg-primary/18 group-hover:border-primary/28"
                    )}
                  />
                </span>
                <span className={cn(isActive ? "font-medium" : "font-normal")}>
                  {item.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

