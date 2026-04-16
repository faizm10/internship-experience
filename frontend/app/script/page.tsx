"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { BackgroundLayer } from "@/components/BackgroundLayer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DuringTrackId = "debugging" | "teamwork" | "tooling"

const DURING_TRACKS: Record<
  DuringTrackId,
  {
    label: string
    title: string
    problem: string
    tried: string
    worked: string
    learned: string
  }
> = {
  debugging: {
    label: "Debugging",
    title: "During — Debugging moment",
    problem: "Problem: I hit ___ (symptom + impact).",
    tried: "What I tried: ___ (first hypothesis + test).",
    worked: "What worked: ___ (the fix + why it was the right lever).",
    learned: "What I learned: ___ (one sentence principle I’ll reuse).",
  },
  teamwork: {
    label: "Teamwork",
    title: "During — Collaboration moment",
    problem: "Problem: I needed ___ (clarity, alignment, review, unblock).",
    tried: "What I tried: ___ (how I asked / what I shared).",
    worked: "What worked: ___ (the change that reduced friction).",
    learned: "What I learned: ___ (communication habit I’ll keep).",
  },
  tooling: {
    label: "Tooling",
    title: "During — Tooling / workflow moment",
    problem: "Problem: ___ was slowing me down (CI, builds, review loops).",
    tried: "What I tried: ___ (small process or tooling change).",
    worked: "What worked: ___ (the before/after effect).",
    learned: "What I learned: ___ (a workflow pattern I’ll apply again).",
  },
}

function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="os-mono text-[11px] tracking-[0.26em] uppercase text-muted-foreground">
        {eyebrow}
      </div>
      <h1 className="font-heading text-[34px] leading-[1.02] text-foreground">{title}</h1>
    </div>
  )
}

function ScriptLine({
  label,
  text,
}: {
  label: string
  text: string
}) {
  return (
    <div className="grid gap-2 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-xl">
      <div className="os-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="text-[15px] leading-relaxed text-foreground/90">{text}</div>
    </div>
  )
}

export default function ScriptPage() {
  const [duringTrack, setDuringTrack] = React.useState<DuringTrackId>("debugging")

  const chosen = DURING_TRACKS[duringTrack]

  return (
    <main className="min-h-svh">
      <BackgroundLayer />

      <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <SectionHeading
          eyebrow="Presenter script"
          title="Before / During / After — talk track (5–10 minutes)"
        />

        <div className="mt-8 grid gap-6">
          <ScriptLine
            label="0:00–0:15 — Set expectation (say this)"
            text='“I’ll keep this to ~5 minutes: before/during/after, then one quick vote.”'
          />

          <div className="grid gap-4">
            <SectionHeading eyebrow="Before" title="Before internship (0:15–1:10)" />
            <div className="grid gap-3 md:grid-cols-2">
              <ScriptLine
                label="Expectation"
                text="“Before: I came in expecting ___.”"
              />
              <ScriptLine
                label="Goal"
                text="“My main goal was ___ (skill/system/habit).”"
              />
            </div>
            <ScriptLine
              label="Nerves (optional)"
              text="“The thing I was most nervous about was ___.”"
            />
          </div>

          <div className="grid gap-4">
            <SectionHeading eyebrow="During" title="During internship (1:10–3:40)" />

            <ScriptLine
              label="Interactive vote (say this)"
              text='“Quick vote: which ‘During’ moment do you want?”'
            />

            <div className="flex flex-wrap gap-2">
              {(Object.keys(DURING_TRACKS) as DuringTrackId[]).map((id) => {
                const active = id === duringTrack
                return (
                  <Button
                    key={id}
                    type="button"
                    variant={active ? "default" : "outline"}
                    onClick={() => setDuringTrack(id)}
                  >
                    {DURING_TRACKS[id].label}
                  </Button>
                )
              })}
            </div>

            <div className="rounded-3xl border border-border bg-background/60 p-5 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div className="text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
                  Read this section after the vote
                </div>
                <motion.div
                  layout
                  className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {DURING_TRACKS[duringTrack].label}
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={duringTrack}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 grid gap-3"
                >
                  <div className="font-heading text-[22px] leading-tight text-foreground">
                    {chosen.title}
                  </div>
                  <div className="grid gap-2">
                    <div className="text-[15px] leading-relaxed text-foreground/90">
                      {chosen.problem}
                    </div>
                    <div className="text-[15px] leading-relaxed text-foreground/90">
                      {chosen.tried}
                    </div>
                    <div className="text-[15px] leading-relaxed text-foreground/90">
                      {chosen.worked}
                    </div>
                    <div className="text-[15px] leading-relaxed text-foreground/90">
                      {chosen.learned}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <ScriptLine
              label="Optional extra moment (45–60s)"
              text="“One more quick moment: a mistake/tradeoff I made → and the correction I learned.”"
            />
          </div>

          <div className="grid gap-4">
            <SectionHeading eyebrow="After" title="After internship (4:40–5:40)" />
            <div className="grid gap-3 md:grid-cols-3">
              <ScriptLine label="Impact" text="“After: I can now do ___ faster/better.”" />
              <ScriptLine label="Apply it" text="“I’ll apply it here by ___.”" />
              <ScriptLine label="Do-over" text="“If I did it again, I’d ___.”" />
            </div>
          </div>

          <div className="grid gap-4">
            <SectionHeading eyebrow="Close" title="Wrap (6:30–7:00)" />
            <div className="grid gap-3 md:grid-cols-2">
              <ScriptLine
                label="1 quick question"
                text='“Quick question: would you pick A/B/C? (or hands up for X).”'
              />
              <ScriptLine
                label="Ask"
                text='“My ask: can someone point me to / sanity-check ___?”'
              />
            </div>
            <ScriptLine
              label="Optional follow-up"
              text='“If anyone wants deeper detail, I’m happy to do a 15-min follow-up.”'
            />
          </div>
        </div>
      </div>
    </main>
  )
}

