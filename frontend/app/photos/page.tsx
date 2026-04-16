"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import photos from "@/content/presentation-photos.json"
import { BackgroundLayer } from "@/components/BackgroundLayer"

type PhotoItem = {
  src: string
  alt?: string
  title?: string
}

const SHUFFLE_SEED = "presentation-photos-shuffle-v1"

function hashString(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function makeRand(seed: string) {
  let state = hashString(seed) || 1
  return () => {
    // xorshift32
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    return state / 4294967296
  }
}

function shuffleDeterministic<T>(arr: T[], seed: string) {
  const out = arr.slice()
  const rand = makeRand(`${seed}:${out.length}`)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

export default function PhotosPage() {
  const items = useMemo(() => {
    const raw = (photos as { items?: PhotoItem[] }).items ?? []
    const mapped = raw
      .map((p) => ({
        src: p.src.startsWith("/") ? p.src : `/presentation-photos/${p.src}`,
        alt: p.alt ?? "",
        title: p.title ?? "",
      }))
      .filter((p) => Boolean(p.src))

    return shuffleDeterministic(mapped, SHUFFLE_SEED)
  }, [])

  const [active, setActive] = useState<PhotoItem | null>(null)
  const [activeDims, setActiveDims] = useState<{ w: number; h: number } | null>(null)

  return (
    <main className="min-h-svh">
      <BackgroundLayer />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="os-mono text-[11px] tracking-[0.26em] uppercase text-muted-foreground">
              photos
            </div>
            <h1 className="mt-5 text-[44px] leading-[0.9] font-heading text-foreground">
              {(photos as { title?: string }).title ?? "Presentation photos"}
            </h1>
          </div>

          <div className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-[13px] text-muted-foreground shadow-sm backdrop-blur-sm">
            {items.length} photo{items.length === 1 ? "" : "s"}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-background/60 p-6 text-[14px] text-muted-foreground shadow-sm backdrop-blur-sm">
            No photos yet. Add filenames to `frontend/content/presentation-photos.json` like:
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-background/50 p-4 text-[12px] text-foreground/80">
{`{
  "title": "Presentation photos",
  "items": [
    { "src": "my-photo-1.jpg", "alt": "...", "title": "..." },
    { "src": "my-photo-2.png", "alt": "...", "title": "..." }
  ]
}`}
            </pre>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <div key={p.src} className="group">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDims(null)
                    setActive(p)
                  }}
                  className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-background/50 shadow-sm backdrop-blur-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label={p.title ? `Open photo: ${p.title}` : p.alt ? `Open photo: ${p.alt}` : "Open photo"}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="33vw"
                  />
                </button>

                {p.title ? (
                  <div className="mt-2">
                    <div className="line-clamp-2 text-[12.5px] leading-snug text-foreground/90">
                      {p.title}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 bg-black"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setActive(null)
            setActiveDims(null)
          }}
        >
          <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  setActive(null)
                  setActiveDims(null)
                }}
                className="absolute right-6 top-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                aria-label="Close"
              >
                <span aria-hidden className="text-[18px] leading-none">
                  ×
                </span>
              </button>

              <div className="relative h-svh w-full bg-black">
                <Image
                  src={active.src}
                  alt={active.alt ?? ""}
                  fill
                  className="object-contain"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setActiveDims({ w: naturalWidth, h: naturalHeight })
                  }
                />
              </div>

              {active.title || activeDims ? (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/55 px-6 py-4 text-white/90 backdrop-blur-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    {active.title ? (
                      <div className="text-[14px] font-medium">{active.title}</div>
                    ) : (
                      <div className="text-[14px] font-medium text-white/80">Photo</div>
                    )}
                    {activeDims ? (
                      <div className="os-mono text-[11px] tracking-[0.18em] uppercase text-white/60">
                        {activeDims.w}×{activeDims.h}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
          </div>
        </div>
      ) : null}
    </main>
  )
}

