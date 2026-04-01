import { TimelineItem, SectionConfig } from "@/lib/types";

export const TOTAL_STEPS = 16;

export const sectionConfigs: SectionConfig[] = [
  { id: "hero", label: "Intro", stage: "before", startStep: 0, endStep: 0 },
  { id: "before", label: "Before", stage: "before", startStep: 1, endStep: 3 },
  { id: "during", label: "During", stage: "during", startStep: 4, endStep: 10 },
  { id: "after", label: "After", stage: "after", startStep: 11, endStep: 13 },
  { id: "closing", label: "Close", stage: "closing", startStep: 14, endStep: 15 },
];

export function getSectionForStep(step: number): SectionConfig {
  return (
    sectionConfigs.find((s) => step >= s.startStep && step <= s.endStep) ||
    sectionConfigs[0]
  );
}

export const timelineItems: TimelineItem[] = [
  // ─── BEFORE ──────────────────────────────────────────────────
  {
    id: "before-1",
    stage: "before",
    step: 1,
    title: "The Starting Point",
    caption: "Day zero. Everything is new.",
    summary:
      "Fresh out of my second year, nervous and caffeinated, staring at a codebase with 200k lines.",
    details:
      "I'd built side projects. I'd done tutorials. But nothing prepared me for the weight of working on something real — where actual users would break what I wrote, and actual engineers would read my code.",
    category: "memory",
    rotation: -2.5,
    color: "#D4E8D4",
    emoji: "🌱",
    tags: ["week 1", "nerves", "beginnings"],
  },
  {
    id: "before-2",
    stage: "before",
    step: 2,
    title: "The Gap",
    caption: "Tutorials vs. reality.",
    summary:
      "I knew React from YouTube. I had never touched a production codebase, a real PR process, or a staging environment.",
    details:
      "The gap between 'I know how to build a todo app' and 'I can contribute to a real product' is enormous. I underestimated it. The first two weeks were humbling in the best way possible.",
    category: "challenge",
    rotation: 2.1,
    color: "#E8D4D4",
    emoji: "⚡",
    tags: ["reality check", "learning curve"],
  },
  {
    id: "before-3",
    stage: "before",
    step: 3,
    title: "The Goal",
    caption: "One thing: ship something real.",
    summary:
      "Ship something real. Write code that actually matters. Learn from engineers I genuinely respect.",
    details:
      "I set one goal coming in: leave with something I could point to and say 'I built that.' Not a tutorial. Not a sandbox. Something in production that real people used.",
    category: "growth",
    rotation: -1.8,
    color: "#D4D8E8",
    emoji: "🎯",
    tags: ["goals", "intention", "focus"],
  },

  // ─── DURING ──────────────────────────────────────────────────
  {
    id: "during-1",
    stage: "during",
    step: 4,
    title: "First PR: 47 Comments",
    caption: "Merged on revision #3. Worth it.",
    summary:
      "My first pull request was a small bug fix. It got 47 review comments. Every one of them taught me something.",
    details:
      "Edge cases I hadn't considered. Variable names that were technically fine but misleading. A missing test. An unnecessary re-render. The comments weren't harsh — they were thorough. That's when I understood what 'code review culture' actually means.",
    category: "lesson",
    rotation: 3.2,
    color: "#E8E4D4",
    emoji: "📝",
    tags: ["PR", "code review", "lesson 1"],
  },
  {
    id: "during-2",
    stage: "during",
    step: 5,
    title: "Owned a Full Feature",
    caption: "Design → deploy. End to end.",
    summary:
      "Took a feature from Figma mockup to production: API design, frontend, tests, and deployment.",
    details:
      "This was the first time I truly owned something end-to-end. I talked to the design team. I wrote the API spec. I built the UI, wrote the tests, handled the edge cases, and deployed it. The feeling of watching your work go live is different from anything a side project gives you.",
    category: "project",
    rotation: -2.8,
    color: "#D4E4E8",
    emoji: "🚀",
    tags: ["ownership", "full-stack", "milestone"],
    metric: { value: "1", label: "feature shipped end-to-end" },
  },
  {
    id: "during-3",
    stage: "during",
    step: 6,
    title: "The Incident",
    caption: "2am. Production. My code.",
    summary:
      "A production bug. Root cause: my code. Found it in 20 minutes. Fixed it. Wrote the post-mortem.",
    details:
      "A Slack ping at 2am. A chart showing a spike in 500 errors. The culprit: a null check I'd skipped because 'it won't happen in prod.' It happened. I found it, fixed it, deployed the patch, and wrote a post-mortem the next morning. That doc is still referenced in onboarding.",
    category: "challenge",
    rotation: 1.9,
    color: "#E8D8D4",
    emoji: "🔥",
    tags: ["incident", "prod bug", "ownership"],
  },
  {
    id: "during-4",
    stage: "during",
    step: 7,
    title: "The Performance Win",
    caption: "Data first. Always.",
    summary:
      "Reduced a critical API response time by 60% through profiling, caching, and query optimization.",
    details:
      "The dashboard was slow. Everyone knew it. I spent a week profiling instead of guessing — found three N+1 queries and two missing cache layers. Fixed them. P95 latency dropped from 1.4s to 560ms. The graph going from red to green in Datadog was a genuinely good moment.",
    category: "project",
    rotation: -3.1,
    color: "#D4E8E0",
    emoji: "📊",
    tags: ["performance", "optimization", "impact"],
    metric: { value: "60%", label: "API latency reduction" },
  },
  {
    id: "during-5",
    stage: "during",
    step: 8,
    title: "The 1:1s",
    caption: "The conversations that changed my thinking.",
    summary:
      "Weekly 1:1s with my mentor shifted how I think about engineering — beyond syntax and into systems.",
    details:
      "Every Friday, 30 minutes. My mentor would ask: 'What's the hardest decision you made this week?' Not the hardest bug. The hardest *decision*. That reframe changed everything. Engineering is about judgment calls, tradeoffs, and communicating uncertainty — not just writing correct code.",
    category: "growth",
    rotation: 2.4,
    color: "#E4D4E8",
    emoji: "🧠",
    tags: ["mentorship", "mindset", "growth"],
  },
  {
    id: "during-6",
    stage: "during",
    step: 9,
    title: "Shipped to 50k+ Users",
    caption: "Real people. Real data. Real impact.",
    summary:
      "Watched the analytics dashboard after my biggest feature shipped. 50k+ users in week one.",
    details:
      "Opening the analytics dashboard after the feature went live and seeing real users interact with code I wrote — that moment crystallized why software engineering matters. Not the code. The impact.",
    category: "memory",
    rotation: -1.6,
    color: "#E8E8D4",
    emoji: "✨",
    tags: ["milestone", "users", "impact"],
    metric: { value: "50k+", label: "users in week one" },
  },
  {
    id: "during-7",
    stage: "during",
    step: 10,
    title: "The Team",
    caption: "You learn the most from how people think.",
    summary:
      "Pair programming sessions, design reviews, and async collaboration taught me how great teams actually work.",
    details:
      "The biggest thing I learned wasn't a framework or a language. It was how good teams communicate: precise async writing, clear PR descriptions, blameless retrospectives, and the culture of 'I don't know — let me find out' instead of guessing.",
    category: "lesson",
    rotation: 2.9,
    color: "#D8E8D4",
    emoji: "🤝",
    tags: ["teamwork", "culture", "communication"],
  },

  // ─── AFTER ───────────────────────────────────────────────────
  {
    id: "after-1",
    stage: "after",
    step: 11,
    title: "Skills Unlocked",
    caption: "The toolkit I'm walking away with.",
    summary:
      "TypeScript mastery, system design thinking, observability practices, and real git discipline.",
    details:
      "TypeScript — actually using it, not fighting it. System design — thinking in terms of bottlenecks, failure modes, and scale. Observability — logs, metrics, traces. Git — clean history, meaningful commits, rebasing without fear.",
    category: "growth",
    rotation: -2.2,
    color: "#D4E0E8",
    emoji: "🔧",
    tags: ["skills", "tools", "growth"],
  },
  {
    id: "after-2",
    stage: "after",
    step: 12,
    title: "The Mindset Shift",
    caption: "From 'does it work' to 'should we build this?'",
    summary:
      "The most important upgrade: learning to ask better questions before writing a single line of code.",
    details:
      "I came in asking 'how do I build this?' I'm leaving asking 'should we build this? What breaks at scale? What's the cheapest way to validate this? What does good look like, and how would we know?'",
    category: "growth",
    rotation: 1.7,
    color: "#E8D4D8",
    emoji: "💡",
    tags: ["mindset", "engineering", "thinking"],
  },
  {
    id: "after-3",
    stage: "after",
    step: 13,
    title: "Before vs. After",
    caption: "Four months. Real distance.",
    summary:
      "The delta between who walked in on day one and who's standing here now is measurable and real.",
    details:
      "Before: tutorial-trained, production-naive, code-first thinking. After: system-aware, production-tested, outcome-first thinking. The code is better. The judgment is sharper. The confidence is earned.",
    category: "growth",
    rotation: -1.3,
    color: "#E8E4D4",
    emoji: "📈",
    tags: ["reflection", "growth", "delta"],
  },

  // ─── CLOSING ─────────────────────────────────────────────────
  {
    id: "closing-1",
    stage: "closing",
    step: 14,
    title: "What's Next",
    caption: "One internship. A career's worth of foundation.",
    summary:
      "Taking everything learned here into the next challenge. The bar has been raised.",
    details:
      "I came in wanting to prove I could do this. I'm leaving knowing I can — and knowing exactly where my edges are. That's the most honest kind of confidence.",
    category: "growth",
    rotation: 2.1,
    color: "#D4E8E8",
    emoji: "🌅",
    tags: ["future", "next chapter"],
  },
  {
    id: "closing-2",
    stage: "closing",
    step: 15,
    title: "Thank You",
    caption: "Genuinely.",
    summary:
      "To everyone on this team: the code reviews, the 1:1s, the Slack answers, the patience. It mattered.",
    details:
      "The most important thing about a good internship isn't the tech stack or the projects — it's the people who choose to invest in you. Thank you for that.",
    category: "memory",
    rotation: -2.7,
    color: "#E8D4D4",
    emoji: "🙏",
    tags: ["gratitude", "team"],
  },
];
