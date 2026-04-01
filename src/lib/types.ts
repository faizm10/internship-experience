export type Stage = "before" | "during" | "after" | "closing";
export type Category = "project" | "lesson" | "challenge" | "growth" | "memory" | "hero";

export interface TimelineItem {
  id: string;
  stage: Stage;
  title: string;
  caption: string;
  summary: string;
  details: string;
  category: Category;
  step: number;
  rotation: number;
  color: string;
  emoji?: string;
  imageUrl?: string;
  metric?: {
    value: string;
    label: string;
  };
  tags?: string[];
}

export type PresentationMode = "presentation" | "free";

export interface PresentationState {
  currentStep: number;
  totalSteps: number;
  activeCardId: string | null;
  mode: PresentationMode;
  spotlightMode: boolean;
  expandedCardId: string | null;
}

export type PresentationAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "SET_ACTIVE_CARD"; id: string | null }
  | { type: "TOGGLE_SPOTLIGHT" }
  | { type: "TOGGLE_MODE" }
  | { type: "EXPAND_CARD"; id: string | null }
  | { type: "SURPRISE_ME" };

export interface SectionConfig {
  id: string;
  label: string;
  stage: Stage;
  startStep: number;
  endStep: number;
}
