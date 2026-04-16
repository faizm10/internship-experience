"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { WorkplaceReveal } from "@/components/Section"
import { TweetCardReplica } from "@/components/TweetCardReplica"
import { LinkedInPostReplica } from "@/components/LinkedInPostReplica"

const easeOut = [0.22, 1, 0.36, 1] as const

export function NextWorkplaceReveal({ content }: { content: WorkplaceReveal }) {
  const [phase, setPhase] = useState<"idle" | "loading" | "revealed">("idle")
  const reduceMotion = useReducedMotion() ?? false
  const isLinkedIn = (content.kind ?? "linkedin") === "linkedin"

  useEffect(() => {
    if (phase !== "loading") return
    const t = window.setTimeout(() => setPhase("revealed"), reduceMotion ? 0 : 1150)
    return () => window.clearTimeout(t)
  }, [phase, reduceMotion])

  const onReveal = () => {
    setPhase(reduceMotion ? "revealed" : "loading")
  }

  return (
    <div className="mt-12 w-full max-w-lg">
      {phase === "idle" ? (
        <button
          type="button"
          onClick={onReveal}
          className="inline-flex items-center justify-center rounded-xl border border-primary/25 bg-primary/8 px-5 py-3 text-[14px] font-medium text-foreground shadow-sm transition hover:bg-primary/12 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {content.buttonLabel}
        </button>
      ) : phase === "loading" ? (
        <motion.div
          className="w-full"
          initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: easeOut }}
          aria-live="polite"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background/65 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.10)] backdrop-blur-2xl">
            <div className="flex items-start gap-3">
              <div className="size-11 rounded-full bg-muted/70" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3 w-40 rounded bg-muted/70" />
                <div className="h-3 w-28 rounded bg-muted/60" />
              </div>
              <div className="h-7 w-24 rounded-full bg-muted/60" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-[92%] rounded bg-muted/50" />
              <div className="h-3 w-[84%] rounded bg-muted/50" />
              <div className="h-3 w-[62%] rounded bg-muted/50" />
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/20">
              <div className="aspect-[16/9] w-full bg-muted/35" />
            </div>

            {/* Shimmer */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)]"
              animate={reduceMotion ? {} : { x: ["-100%", "100%"] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 1.05, ease: "linear", repeat: Infinity }
              }
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full"
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          {isLinkedIn ? (
            <motion.div
              initial={reduceMotion ? false : { scale: 0.99 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              <LinkedInPostReplica
                authorName={content.authorName}
                authorAvatarSrc={content.authorAvatarSrc}
                headline={content.headline}
                subheadline={content.subheadline}
                companyName={content.companyName}
                companyUrl={content.companyUrl}
                companyLogoSrc={content.companyLogoSrc}
                companyCoverSrc={content.companyCoverSrc}
                body={content.body}
                className="relative"
              />

              {/* Subtle image motion (hover / idle float) */}
              {!reduceMotion ? (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-6 h-16 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.00)_70%)]"
                  animate={{ opacity: [0.18, 0.28, 0.18] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
            </motion.div>
          ) : (
            <TweetCardReplica
              authorName={content.authorName}
              authorHandle={content.authorHandle ?? ""}
              authorAvatarSrc={content.authorAvatarSrc}
              verified={content.verified}
              tweetUrl={content.tweetUrl}
              body={content.body}
              media={content.media}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}
