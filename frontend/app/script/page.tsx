"use client"

import * as React from "react"

import { BackgroundLayer } from "@/components/BackgroundLayer"
import { cn } from "@/lib/utils"

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
  return (
    <main className="min-h-svh">
      <BackgroundLayer />

      <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <SectionHeading
          eyebrow="Presenter script"
          title="What I actually say over the deck"
        />

        <div className="mt-8 grid gap-4 border-t border-border/60 pt-8">
          <SectionHeading
            eyebrow="Full talk track"
            title="What I actually say over the deck"
          />

          <ScriptLine
            label="Intro"
            text="Hi, I’m Faiz Mustansar, a software engineering student at the University of Guelph. This isn’t a resume reading—it’s a short story about growth, craft, and community: the hackathons I’ve been to, the ones I’ve helped run, and what my internships have actually taught me."
          />

          <ScriptLine
            label="Hackathons overview"
            text="I treat hackathons as a serious side practice. Sometimes I’m a hacker shipping full‑stack or ML demos in 24–36 hours, sometimes an organizer making sure hundreds of hackers can ship, and sometimes a mentor or judge. The QR on the landing page points to a running list of events, projects, teammates, and wins."
          />

          <ScriptLine
            label="HackCanada arc"
            text="HackCanada is where things flipped from just hacking to organizing. I first showed up in 2025 as a hacker and we built TenantShield, an AI legal assistant for Canadian renters. After that I joined the organizing team, got rejected for a co‑lead role, took a regular frontend role anyway, and a couple of months later James DM’d me on Discord asking if I would step up as tech lead—so I ended up VP of Technology for HackCanada 2026."
          />

          <ScriptLine
            label="HackCanada 2026 – responsibilities"
            text="As VP of Tech my world shrank down to two systems: the hackcanada.org website, which every hacker, sponsor, and judge touched, and the judging platform, which had to ingest hundreds of projects, route them to judges, track scores, and surface results at the end of 36 hours. If either broke at 2 a.m., it was my problem."
          />

          <ScriptLine
            label="Judging incident"
            text="We had one real scare on judging: a last‑minute config change plus way more submissions than expected led to about an hour‑long delay. Within ten minutes my phone, Discord, WhatsApp, and the event floor all lit up at once—everyone needed an answer while I still needed time to debug. We fixed it, but that window taught me a lot about owning incidents, communicating under pressure, and designing systems that fail more gracefully next time."
          />

          <ScriptLine
            label="TD Bank – getting in"
            text="My first real internship was at TD Bank on the Credit Origination and Funding team in Toronto. The offer came in the middle of Hack the North: phone call Monday, confirmation Thursday, interview Saturday evening while I was hacking. I’d been applying since summer 2024 with nothing to show, so that weekend was a turning point: the hackathon work I’d been doing finally connected to an actual offer."
          />

          <ScriptLine
            label="TD Bank – work"
            text="Day‑to‑day work was tracing flows where customer intent becomes real money movement—helping in‑branch employees process and fund applications for mortgages, credit cards, loans, and lines of credit. I spent a lot of time refactoring legacy Java/Spring code so new changes were safer, and peeling out an old command pattern while helping migrate parts of the stack forward."
          />

          <ScriptLine
            label="TD Bank – learning"
            text="Some of the best learning came on the commute home with my tech lead—20‑minute deep dives into why Java looks the way it does in production, what patterns actually matter, and how to think like a senior engineer instead of just a ticket closer."
          />

          <ScriptLine
            label="Projects & resume pieces"
            text="Outside of TD and HackCanada I keep building: uoguelph.courses for course search and reviews, Octree as an AI‑powered LaTeX editor, Arcki as a 3D world editor on a globe, the U of G Webring, and TripLoom for AI‑assisted travel planning. Those projects are where I practice product sense, not just code."
          />

          <ScriptLine
            label="Closing"
            text="If I compress all of this into one idea, it’s that I build in three layers: as a hacker under time pressure, as an organizer keeping the lights on for everyone else, and as an engineer shipping stable systems in production. Hackathons taught me to move fast, organizing taught me to own the platform, and internships taught me where to be careful—that’s what the landing page and photos are really documenting."
          />
        </div>
      </div>
    </main>
  )
}
