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

function TalkingPointCard({
  label,
  points,
}: {
  label: string
  points: string[]
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-xl">
      <div className="os-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <ul className="grid gap-2 text-[15px] leading-relaxed text-foreground/90">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/55" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
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
            label="TD Bank – getting in"
            text="My first real internship was at TD Bank on the Credit Origination and Funding team in Toronto. The offer came in the middle of Hack the North: phone call Monday, confirmation Thursday, interview Saturday evening while I was hacking. I’d been applying since summer 2024 with nothing to show, so that weekend was a turning point: the hackathon work I’d been doing finally connected to an actual offer."
          />

          <TalkingPointCard
            label="During section – main talk track"
            points={[
              "This section is about what changed after I got into TD. Before this, most of my coding was side projects and hackathons where I could move fast, push quickly, and fix things myself.",
              "At TD, I started seeing what real software engineering looks like on a team: reviews, tickets, release steps, risk gates, and code that has to be maintainable after I am done touching it.",
              "The diagram is the main contrast I want to call out. In side projects, the path was basically code, quick checks, main, deploy. On the credit platform, code moved through feature branches, feature projects, JUnit and checks, release projects, and then production.",
              "That changed how I thought. The goal was not just can I make this work. It became can someone review it, can the tests prove it, and can the team safely ship it."
            ]}
          />

          <TalkingPointCard
            label="During section – details to mention"
            points={[
              "A lot of my work was around command-pattern cleanup and JUnit. Some days it honestly felt like I was writing more tests than feature code, but that taught me why tests are not extra work in a production codebase. They are how the team trusts the change.",
              "I also recently learned more about branching strategies: why teams use feature branches, feature projects, release projects, and how the branch structure controls risk before code gets anywhere near production.",
              "On the technical side, I kept getting deeper into Java concepts and RESTful APIs. It was less about just writing endpoints, and more about understanding contracts, request flow, status codes, and how backend pieces fit together in a real system.",
              "I got exposed to Agile in practice too: retros, sprint planning, PI planning, and the general rhythm of how a team decides what to build, reflects on what went wrong, and plans the next chunk of work.",
              "I also asked Walter for more work on the side, and he gave me a proof of concept to own. That was a different kind of learning because I had to think about documentation, testing, and how to explain the work clearly for town hall and our POD.",
              "And shoutout to me and Saravanan having some nice talks on the train before he decided to fully take the Milton line. Some of those random commute conversations were honestly part of the learning too.",
              "The first carousel photo is HackCanada 2026. Outside of work I was also VP of Tech, helping support the main site and judging platform for 700+ participants, so I was practicing ownership in a different environment too.",
              "The locked-in photo is the actual feeling of onboarding and trying to understand a real codebase. The soccer and GitHub photos show that during the term I was still playing, building, and keeping momentum outside of work."
            ]}
          />

          <ScriptLine
            label="During section – transition"
            text="The takeaway from this slide is that the internship shifted me from thinking like someone who can build a thing to thinking like someone who has to ship it responsibly. I still cared about moving fast, but I started respecting the process that makes fast work safe."
          />

          <TalkingPointCard
            label="After section – talking points"
            points={[
              "This slide is where I talk about what I am carrying forward after the internship. The biggest thing is that I still want work I can own. I learned that I like being responsible for a real piece of work, not just picking up tiny isolated tasks.",
              "The first improvement area is asking why on the business side. Before, I would mostly ask why the code was written a certain way. Now I want to understand why the feature matters, who it helps, what risk it reduces, and how it connects back to the actual business problem.",
              "The second improvement area is how my PR changes communicate. It is not only about writing a better PR description. I want the code itself to be more descriptive through clearer names, better structure, and a diff that tells the reviewer what changed and why.",
              "The way I would summarize this section is: TD did not just teach me more code. It taught me to think more like an engineer on a team, where context, ownership, and communication matter as much as implementation."
            ]}
          />

        </div>
      </div>
    </main>
  )
}
