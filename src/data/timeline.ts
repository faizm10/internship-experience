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
    caption: "I didn’t start ahead. I just started.",
    summary:
      "After first year, I honestly hadn’t done much outside of school. No side projects, no hackathons, just lectures and assignments.",
    details:
      "At the end of first year, I didn’t really know what to do or where to start. I was just one of those students doing the minimum to get by. When second year came around, something shifted. I started building small side projects, going to hackathons, and putting myself out there. Not because I had a clear plan, but because I knew I had to start somewhere.",
    category: "memory",
    rotation: -2.5,
    color: "#D4E8D4",
    emoji: "🌱",
    images: [
      "/poker-night.jpeg",
    ],
    tags: ["first year", "starting point", "growth"],
  },
  {
    id: "before-2",
    stage: "before",
    step: 2,
    title: "Locking In",
    caption: "No plan. Just action.",
    summary:
      "Second year was when I started taking things seriously. I began building projects, going to hackathons, and putting myself in uncomfortable situations.",
    details:
      "I didn’t have a perfect roadmap. I just knew I couldn’t stay where I was. I started building whatever I could, attending hackathons even when I felt out of place, and learning by doing. I also took courses outside my university, including at Waterloo, to push myself further and get exposure to a different level of thinking.",
    category: "growth",
    rotation: 2.1,
    color: "#E8D4D4",
    emoji: "⚡",
    images: [
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400"
    ],
    tags: ["second year", "hackathons", "projects", "growth"],
  },
  {
    id: "before-3",
    stage: "before",
    step: 3,
    title: "The Opportunity",
    caption: "This is where it led.",
    summary:
      "All of that momentum from projects, hackathons, and putting myself out there led to landing my internship at TD.",
    details:
      "There wasn’t one moment that made it happen. It was the accumulation of small things. Building consistently, learning in public, talking to people, and improving bit by bit. Getting the offer from TD felt like validation that I was finally on the right path.",
    category: "memory",
    rotation: -1.8,
    color: "#D4D8E8",
    emoji: "🎯",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1454165833767-13a6ad0601e?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1504868584819-f8eec0b61a7e?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
    ],
    tags: ["gratitude", "team"],
  },
];
