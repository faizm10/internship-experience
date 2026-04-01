import type { Category, Stage } from "@/lib/types";

export type SectionId = "hero" | "before" | "during" | "after" | "closing";

export const SECTION_META: Record<
  SectionId,
  {
    label: string;
    eyebrow: string;
    watermark: string;
    accent: string;
  }
> = {
  hero: {
    label: "Case File",
    eyebrow: "Intake",
    watermark: "CASE FILE",
    accent: "#B93A32",
  },
  before: {
    label: "Background",
    eyebrow: "Context",
    watermark: "BACKGROUND",
    accent: "#8F5B2E",
  },
  during: {
    label: "Investigation",
    eyebrow: "Clue Path",
    watermark: "INVESTIGATION",
    accent: "#B93A32",
  },
  after: {
    label: "Findings",
    eyebrow: "Debrief",
    watermark: "FINDINGS",
    accent: "#C46A2D",
  },
  closing: {
    label: "Verdict",
    eyebrow: "Closeout",
    watermark: "VERDICT",
    accent: "#365A49",
  },
};

export const STAGE_META: Record<
  Stage,
  {
    label: string;
    stamp: string;
    accent: string;
  }
> = {
  before: {
    label: "Background",
    stamp: "PRE-CASE CONTEXT",
    accent: "#8F5B2E",
  },
  during: {
    label: "Investigation",
    stamp: "FIELD INVESTIGATION",
    accent: "#B93A32",
  },
  after: {
    label: "Findings",
    stamp: "POST-CASE FINDINGS",
    accent: "#C46A2D",
  },
  closing: {
    label: "Verdict",
    stamp: "FINAL VERDICT",
    accent: "#365A49",
  },
};

export const CATEGORY_META: Record<
  Category,
  {
    label: string;
    chip: string;
    accent: string;
    paper: string;
  }
> = {
  project: {
    label: "Exhibit",
    chip: "Build Evidence",
    accent: "#36657A",
    paper: "#D7E8EF",
  },
  lesson: {
    label: "Memo",
    chip: "Lesson Log",
    accent: "#8B6E2E",
    paper: "#EDE1C7",
  },
  challenge: {
    label: "Incident",
    chip: "Incident Report",
    accent: "#A24E43",
    paper: "#EBCFC6",
  },
  growth: {
    label: "Finding",
    chip: "Growth Note",
    accent: "#4D6D51",
    paper: "#D9E6D3",
  },
  memory: {
    label: "Statement",
    chip: "Witness Note",
    accent: "#735E7E",
    paper: "#E5D9EA",
  },
  hero: {
    label: "Intake",
    chip: "Case Intake",
    accent: "#B93A32",
    paper: "#E7DFD3",
  },
};

export function getEvidenceCode(step: number) {
  return `CL-${String(step).padStart(2, "0")}`;
}
