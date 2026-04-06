"use client"

import { Highlighter } from "@/components/ui/highlighter"
import { renderWithMarks, type TextMark } from "@/lib/render-with-marks"

export type SectionPhoto = {
  src: string
  alt: string
  captionTitle: string
  captionBody: string
  tags?: string[]
}

export type WorkplaceTweetMedia = {
  kind: "video" | "gif" | "image"
  src: string
  alt: string
  poster?: string
}

/** Static Magic UI–style tweet card (replica), driven from JSON — no X API */
export type WorkplaceReveal = {
  buttonLabel: string
  authorName: string
  authorHandle: string
  authorAvatarSrc?: string
  verified?: boolean
  tweetUrl?: string
  body: string
  media?: WorkplaceTweetMedia
}

export type StorySection = {
  id: string
  navLabel: string
  headline: string
  bullets: string[]
  /** Optional per-bullet highlights; index aligns with `bullets`. */
  bulletMarks?: TextMark[][]
  photos: SectionPhoto[]
  /** Shown after bullets (e.g. next role reveal). */
  workplaceReveal?: WorkplaceReveal
}

export function Section({
  section,
  children,
}: {
  section: StorySection
  children?: React.ReactNode
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 min-h-svh pt-16 pb-14 flex items-start overflow-hidden"
    >
      <div className="max-w-5xl w-full">
        <div className="os-mono text-[11px] tracking-[0.26em] uppercase text-muted-foreground">
          {section.navLabel}
        </div>
        <h2 className="mt-5 text-[44px] leading-[0.9] font-heading text-foreground">
          <Highlighter action="underline" color="#3d8b5c" isView strokeWidth={1.35} animationDuration={580}>
            {section.headline}
          </Highlighter>
        </h2>

        <ul className="mt-7 space-y-3 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
          {section.bullets.map((b, i) => (
            <li key={`${section.id}-bullet-${i}`} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/55 shrink-0" />
              <span>
                {section.bulletMarks?.[i]?.length
                  ? renderWithMarks(b, section.bulletMarks[i])
                  : b}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

