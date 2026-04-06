"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { WorkplaceReveal } from "@/components/Section"
import { TweetCardReplica } from "@/components/TweetCardReplica"

const easeOut = [0.22, 1, 0.36, 1] as const

export function NextWorkplaceReveal({ content }: { content: WorkplaceReveal }) {
  const [revealed, setRevealed] = useState(false)
  const reduceMotion = useReducedMotion() ?? false

  return (
    <div className="mt-12 w-full max-w-lg">
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="inline-flex items-center justify-center rounded-xl border border-primary/25 bg-primary/8 px-5 py-3 text-[14px] font-medium text-foreground shadow-sm transition hover:bg-primary/12 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {content.buttonLabel}
        </button>
      ) : (
        <motion.div
          className="w-full"
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <TweetCardReplica
            authorName={content.authorName}
            authorHandle={content.authorHandle}
            authorAvatarSrc={content.authorAvatarSrc}
            verified={content.verified}
            tweetUrl={content.tweetUrl}
            body={content.body}
            media={content.media}
          />
        </motion.div>
      )}
    </div>
  )
}
