"use client"

import { useEffect, useMemo } from "react"
import story from "@/content/story.json"
import { BackgroundLayer } from "@/components/BackgroundLayer"
import { LeftNav } from "@/components/LeftNav"
import { Section, type StorySection } from "@/components/Section"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useState } from "react"
import { TextAnimate } from "@/components/ui/text-animate"
import { PhotoCarousel } from "@/components/PhotoCarousel"
import { PhotoCard } from "@/components/PhotoCard"
import { PhotoModal } from "@/components/PhotoModal"
import { renderWithMarks, type TextMark } from "@/lib/render-with-marks"
import { PolaroidCard } from "@/components/PolaroidCard"
import { NextWorkplaceReveal } from "@/components/NextWorkplaceReveal"
import { ThankYouFireworks } from "@/components/ThankYouFireworks"
import DomeGallery, { type DomeGalleryImage } from "@/components/ui/DomeGallery"
import { QrCode } from "@/components/QrCode"
import Image from "next/image"

type HeroPolaroid = {
  src: string
  alt: string
  caption: string
}

type StoryProfile = typeof story.profile & {
  headlineMarks?: TextMark[]
  subheadMarks?: TextMark[]
  heroPolaroids?: HeroPolaroid[]
}

type StoryClosing = {
  headline: string
  socialIntro?: string
  socials: { label: string; href: string }[]
}

const HERO_POLAROID_ROTATIONS = [-4, 3, 5] as const

export default function Page() {
  const profile = story.profile as StoryProfile
  const sections = story.sections as StorySection[]
  const closing = (story as typeof story & { closing: StoryClosing }).closing
  const sectionIds = useMemo(
    () => ["hero", ...sections.map((s) => s.id), "closing", "gallery"],
    [sections]
  )
  const activeId = useActiveSection(sectionIds)
  const [activePhoto, setActivePhoto] = useState<StorySection["photos"][number] | null>(null)
  const [activePhotoSet, setActivePhotoSet] = useState<StorySection["photos"] | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)

  const galleryImages = useMemo(() => {
    const out: { src: string; alt?: string }[] = []
    const seen = new Set<string>()

    const push = (src?: string, alt?: string) => {
      if (!src) return
      if (seen.has(src)) return
      seen.add(src)
      out.push({ src, alt })
    }

    profile.heroPolaroids?.forEach((p) => push(p.src, p.alt))
    sections.forEach((s) => {
      s.photos.forEach((p) => push(p.src, p.captionTitle || p.alt))
    })

    return out as DomeGalleryImage[]
  }, [profile.heroPolaroids, sections])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTypingTarget(e.target)) return

      const currentIdx = sectionIds.indexOf(activeId) >= 0 ? sectionIds.indexOf(activeId) : 0
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
  }, [activeId, sectionIds])

  return (
    <main className="min-h-svh">
      <BackgroundLayer />

      <LeftNav
        items={[
          { id: "hero", label: "intro" },
          ...sections.map((s) => ({ id: s.id, label: s.navLabel })),
          { id: "closing", label: "close" },
          { id: "gallery", label: "gallery" },
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

            {profile.heroPolaroids?.length ? (
              <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6 lg:gap-8">
                {profile.heroPolaroids.map((p, i) => (
                  <PolaroidCard
                    key={`${p.src}-${p.caption}`}
                    src={p.src}
                    alt={p.alt}
                    caption={p.caption}
                    rotate={HERO_POLAROID_ROTATIONS[i % HERO_POLAROID_ROTATIONS.length]}
                    onClick={() =>
                      setActivePhoto({
                        src: p.src,
                        alt: p.alt,
                        captionTitle: p.caption,
                        captionBody: "",
                      })
                    }
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {sections.map((section) => (
          <Section key={section.id} section={section}>
            {section.id === "next" ? (
              <div className="max-w-[720px] space-y-0">
                <figure className="mb-8">
                  <div className="overflow-hidden rounded-3xl border border-border bg-background/60 shadow-sm backdrop-blur-sm">
                    <Image
                      src="/next-steps-sankey.png"
                      alt="Internship application funnel Sankey diagram"
                      width={1200}
                      height={1200}
                      className="h-auto w-full"
                      priority
                    />
                  </div>
                  <figcaption className="mt-3 text-[12px] text-muted-foreground">
                    Internship application funnel (Sankey)
                  </figcaption>
                </figure>
                {section.workplaceReveal ? (
                  <NextWorkplaceReveal content={section.workplaceReveal} />
                ) : null}
                {section.photos[0] ? (
                  <PhotoCard
                    photo={section.photos[0]}
                    onClick={() => setActivePhoto(section.photos[0])}
                    className="w-full"
                  />
                ) : null}
              </div>
            ) : section.photos.length > 0 ? (
              <PhotoCarousel
                photos={section.photos}
                onOpen={(p, i, photos) => {
                  setActivePhoto(p)
                  setActivePhotoSet(photos)
                  setActivePhotoIndex(i)
                }}
              />
            ) : null}
          </Section>
        ))}

        <section id="closing" className="min-h-svh pt-16 pb-14 flex items-start overflow-hidden">
          <div className="max-w-5xl w-full">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="max-w-4xl">
                <TextAnimate
                  as="h2"
                  className="text-[44px] leading-[0.92] font-heading text-foreground"
                  animation="blurInUp"
                  by="word"
                  duration={0.35}
                  once
                >
                  {closing.headline}
                </TextAnimate>
                {closing.socialIntro ? (
                  <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-muted-foreground/90">
                    {closing.socialIntro}
                  </p>
                ) : null}
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                  {closing.socials.map((s) => (
                    <li key={`${s.label}-${s.href}`}>
                      <a
                        href={s.href}
                        {...(s.href.startsWith("mailto:")
                          ? {}
                          : { target: "_blank" as const, rel: "noopener noreferrer" })}
                        className="text-foreground/90 underline decoration-primary/35 underline-offset-4 transition hover:decoration-primary/70"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ThankYouFireworks />
              </div>

              <div className="lg:pt-2">
                <div className="os-mono text-[11px] tracking-[0.26em] uppercase text-muted-foreground">
                  scan to open
                </div>
                <div className="mt-3">
                  <QrCode value="https://faizm.ca" size={164} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="min-h-svh pt-16 pb-14 flex items-start overflow-hidden">
          <div className="max-w-5xl w-full">
            <div className="os-mono text-[11px] tracking-[0.26em] uppercase text-muted-foreground">
              gallery
            </div>
            <h2 className="mt-5 text-[44px] leading-[0.9] font-heading text-foreground">
              Photo gallery
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Click a tile to enlarge. Press Escape to close.
            </p>

            <div className="mt-10 h-[78svh] w-full overflow-hidden">
              <DomeGallery images={galleryImages} mode="grid" grayscale={false} />
            </div>
          </div>
        </section>
      </div>

      <PhotoModal
        photo={activePhoto}
        onClose={() => {
          setActivePhoto(null)
          setActivePhotoSet(null)
          setActivePhotoIndex(null)
        }}
        onPrev={
          activePhotoSet && activePhotoIndex != null && activePhotoSet.length > 1
            ? () => {
                const nextIndex =
                  (activePhotoIndex - 1 + activePhotoSet.length) % activePhotoSet.length
                setActivePhotoIndex(nextIndex)
                setActivePhoto(activePhotoSet[nextIndex] ?? null)
              }
            : undefined
        }
        onNext={
          activePhotoSet && activePhotoIndex != null && activePhotoSet.length > 1
            ? () => {
                const nextIndex = (activePhotoIndex + 1) % activePhotoSet.length
                setActivePhotoIndex(nextIndex)
                setActivePhoto(activePhotoSet[nextIndex] ?? null)
              }
            : undefined
        }
      />
    </main>
  )
}

