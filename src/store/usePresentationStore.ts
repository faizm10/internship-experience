"use client";

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react";
import { PresentationState, PresentationAction } from "@/lib/types";
import { TOTAL_STEPS, timelineItems } from "@/data/timeline";

const initialState: PresentationState = {
  currentStep: 0,
  totalSteps: TOTAL_STEPS,
  activeCardId: null,
  mode: "presentation",
  spotlightMode: false,
  expandedCardId: null,
};

function presentationReducer(
  state: PresentationState,
  action: PresentationAction
): PresentationState {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
        expandedCardId: null,
      };
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        expandedCardId: null,
      };
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.step, state.totalSteps - 1)),
        expandedCardId: null,
      };
    case "SET_ACTIVE_CARD":
      return { ...state, activeCardId: action.id };
    case "TOGGLE_SPOTLIGHT":
      return { ...state, spotlightMode: !state.spotlightMode };
    case "TOGGLE_MODE":
      return {
        ...state,
        mode: state.mode === "presentation" ? "free" : "presentation",
      };
    case "EXPAND_CARD":
      return { ...state, expandedCardId: action.id };
    case "SURPRISE_ME": {
      const randomItem =
        timelineItems[Math.floor(Math.random() * timelineItems.length)];
      return {
        ...state,
        currentStep: randomItem.step,
        expandedCardId: randomItem.id,
      };
    }
    default:
      return state;
  }
}

const PresentationContext = createContext<{
  state: PresentationState;
  dispatch: React.Dispatch<PresentationAction>;
  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
  toggleSpotlight: () => void;
  toggleMode: () => void;
  expandCard: (id: string | null) => void;
  surpriseMe: () => void;
} | null>(null);

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(presentationReducer, initialState);

  const next = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
  const goTo = useCallback((step: number) => dispatch({ type: "GO_TO_STEP", step }), []);
  const toggleSpotlight = useCallback(() => dispatch({ type: "TOGGLE_SPOTLIGHT" }), []);
  const toggleMode = useCallback(() => dispatch({ type: "TOGGLE_MODE" }), []);
  const expandCard = useCallback(
    (id: string | null) => dispatch({ type: "EXPAND_CARD", id }),
    []
  );
  const surpriseMe = useCallback(() => dispatch({ type: "SURPRISE_ME" }), []);

  return (
    <PresentationContext.Provider
      value={{ state, dispatch, next, prev, goTo, toggleSpotlight, toggleMode, expandCard, surpriseMe }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used within PresentationProvider");
  return ctx;
}
