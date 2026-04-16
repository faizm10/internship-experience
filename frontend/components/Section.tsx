"use client"

import { useMemo, useState } from "react"
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
  kind?: "linkedin" | "tweet"
  buttonLabel: string
  /** Common author fields (used for both reveal styles) */
  authorName: string
  authorHandle?: string
  authorAvatarSrc?: string

  /** Legacy tweet-style fields (optional if using LinkedIn style) */
  verified?: boolean
  tweetUrl?: string
  body: string
  media?: WorkplaceTweetMedia

  /** LinkedIn-style fields (optional) */
  headline?: string
  subheadline?: string
  companyName?: string
  companyUrl?: string
  companyLogoSrc?: string
  companyCoverSrc?: string
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
  const totalBullets = section.bullets.length
  const [revealedCount, setRevealedCount] = useState(0)
  const visibleBullets = useMemo(
    () => section.bullets.slice(0, Math.min(revealedCount, totalBullets)),
    [revealedCount, section.bullets, totalBullets]
  )
  const isDone = revealedCount >= totalBullets

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
          {visibleBullets.map((b, i) => (
            <li key={`${section.id}-bullet-${i}`} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/55 shrink-0" />
              <span className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                {section.bulletMarks?.[i]?.length
                  ? renderWithMarks(b, section.bulletMarks[i])
                  : b}
              </span>
            </li>
          ))}
        </ul>

        {totalBullets > 0 ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setRevealedCount((c) => Math.min(c + 1, totalBullets))}
              disabled={isDone}
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-background/60 px-4 text-[13px] text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {revealedCount === 0 ? "Start" : isDone ? "All shown" : "Next"}
            </button>

            <button
              type="button"
              onClick={() => setRevealedCount(totalBullets)}
              disabled={isDone}
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-background/40 px-4 text-[13px] text-foreground/90 transition hover:bg-background/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reveal all
            </button>

            <button
              type="button"
              onClick={() => setRevealedCount(0)}
              disabled={revealedCount === 0}
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-transparent px-4 text-[13px] text-muted-foreground transition hover:bg-background/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>

            <div className="text-[12px] text-muted-foreground">
              {Math.min(revealedCount, totalBullets)}/{totalBullets}
            </div>
          </div>
        ) : null}

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

