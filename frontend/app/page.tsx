"use client"

import { useEffect, useMemo } from "react"
import story from "@/content/story.json"
import { BackgroundLayer } from "@/components/BackgroundLayer"
import { LeftNav } from "@/components/LeftNav"
import { Section, type StorySection } from "@/components/Section"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useState } from "react"
import { TextAnimate } from "@/components/ui/text-animate"
import { PhotoMarquee } from "@/components/PhotoMarquee"
import { PhotoCard } from "@/components/PhotoCard"
import { PhotoModal } from "@/components/PhotoModal"
import { Highlighter } from "@/components/ui/highlighter"
import { renderWithMarks, type TextMark } from "@/lib/render-with-marks"

type StoryProfile = typeof story.profile & {
  headlineMarks?: TextMark[]
  subheadMarks?: TextMark[]
}

export default function Page() {
  const profile = story.profile as StoryProfile
  const sections = story.sections as StorySection[]
  const sectionIds = useMemo(() => ["hero", ...sections.map((s) => s.id), "closing"], [sections])
  const activeId = useActiveSection(sectionIds)
  const [activePhoto, setActivePhoto] = useState<StorySection["photos"][number] | null>(null)

  const idToIndex = useMemo(() => {
    const m = new Map<string, number>()
    sectionIds.forEach((id, i) => m.set(id, i))
    return m
  }, [sectionIds])

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      return (
        target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      )
    }

    const scrollToId = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTypingTarget(e.target)) return

      const currentIdx = idToIndex.get(activeId) ?? 0

      const nextKeys = ["ArrowDown", "PageDown", " "]
      const prevKeys = ["ArrowUp", "PageUp"]

      if (nextKeys.includes(e.key)) {
        e.preventDefault()
        const nextId = sectionIds[Math.min(currentIdx + 1, sectionIds.length - 1)]
        if (nextId) scrollToId(nextId)
      } else if (prevKeys.includes(e.key)) {
        e.preventDefault()
        const prevId = sectionIds[Math.max(currentIdx - 1, 0)]
        if (prevId) scrollToId(prevId)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeId, idToIndex, sectionIds])

  return (
    <main className="min-h-svh">
      <BackgroundLayer />

      <LeftNav
        items={[
          { id: "hero", label: "intro" },
          ...sections.map((s) => ({ id: s.id, label: s.navLabel })),
          { id: "closing", label: "close" },
        ]}
        activeId={activeId}
      />

      <div className="mx-auto max-w-6xl px-6 lg:pl-44 xl:pl-52">
        <section id="hero" className="min-h-svh pt-16 pb-14 flex items-start overflow-hidden">
          <div className="max-w-5xl w-full">
            <div className="os-mono text-[11px] tracking-[0.26em] uppercase text-muted-foreground">
              {profile.role} · {profile.school}
            </div>

            <h1 className="mt-6 text-[68px] leading-[0.86] font-heading text-foreground">
              {profile.name}
            </h1>

            <div className="mt-8 max-w-3xl">
              <p className="text-[20px] leading-relaxed text-foreground/80">
                {renderWithMarks(profile.headline, profile.headlineMarks)}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                {renderWithMarks(profile.subhead, profile.subheadMarks)}
              </p>
            </div>

            <div className="mt-10 os-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground/80">
              Scroll
            </div>
          </div>
        </section>

        {sections.map((section) => (
          <Section key={section.id} section={section}>
            {section.id === "next" ? (
              <div className="max-w-[720px]">
                {section.photos[0] ? (
                  <PhotoCard
                    photo={section.photos[0]}
                    onClick={() => setActivePhoto(section.photos[0])}
                    className="w-full"
                  />
                ) : null}
              </div>
            ) : (
              <PhotoMarquee photos={section.photos} />
            )}
          </Section>
        ))}

        <section id="closing" className="min-h-svh pt-16 pb-14 flex items-start overflow-hidden">
          <div className="max-w-4xl w-full">
            <TextAnimate
              as="h2"
              className="text-[44px] leading-[0.92] font-heading text-foreground"
              animation="blurInUp"
              by="word"
              duration={0.35}
              once
            >
              Closing
            </TextAnimate>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
              Add a short closing line here and a link or QR code to your{" "}
              <Highlighter action="circle" color="#5eb88a" isView>
                portfolio
              </Highlighter>
              .
            </p>
          </div>
        </section>
      </div>

      <PhotoModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </main>
  )
}
