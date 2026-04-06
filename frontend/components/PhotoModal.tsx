"use client"

import Image from "next/image"
import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { SectionPhoto } from "@/components/Section"

export function PhotoModal({
  photo,
  onClose,
}: {
  photo: SectionPhoto | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!photo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [photo, onClose])

  return (
    <AnimatePresence>
      {photo ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/55"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-background/85 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.18)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-16/10">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/0" />
              </div>

              <div className="p-6">
                <div className="text-[16px] font-medium text-foreground">
                  {photo.captionTitle}
                </div>
                <div className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {photo.captionBody}
                </div>
                {photo.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {photo.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

