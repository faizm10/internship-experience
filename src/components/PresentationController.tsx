"use client";

import { useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PresentationProvider, usePresentation } from "@/store/usePresentationStore";
import { getSectionForStep } from "@/data/timeline";
import { HeroSection } from "./HeroSection";
import { TimelineSection } from "./TimelineSection";
import { GrowthSection } from "./GrowthSection";
import { ClosingSection } from "./ClosingSection";
import { ProgressIndicator } from "./ProgressIndicator";
import { NavigationHint } from "./NavigationHint";
import { SpotlightOverlay } from "./SpotlightOverlay";
import { MemoryModal } from "./MemoryModal";
import { AmbientBackground } from "./AmbientBackground";
import { Zap, Monitor } from "lucide-react";

function ControlBar() {
  const { state, toggleSpotlight, toggleMode } = usePresentation();

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-wrap items-center justify-end gap-2 md:right-6 md:top-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSpotlight}
        className="flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
        style={{
          fontFamily: "Special Elite",
          backgroundColor: state.spotlightMode
            ? "rgba(24,17,14,0.92)"
            : "rgba(246,235,213,0.92)",
          border: state.spotlightMode
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(84,60,42,0.16)",
          color: state.spotlightMode ? "#F7F3EC" : "#46372F",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
        }}
        title="Toggle desk lamp"
      >
        <Monitor size={12} />
        Desk Lamp
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMode}
        className="flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
        style={{
          fontFamily: "Special Elite",
          backgroundColor: state.mode === "presentation"
            ? "rgba(185,58,50,0.18)"
            : "rgba(246,235,213,0.92)",
          border: state.mode === "presentation"
            ? "1px solid rgba(255,220,200,0.3)"
            : "1px solid rgba(84,60,42,0.16)",
          color: state.mode === "presentation" ? "#fff4ea" : "#46372F",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
        }}
        title="Toggle route mode"
      >
        <Zap size={12} />
        {state.mode === "presentation" ? "Guided Route" : "Open Desk"}
      </motion.button>
    </div>
  );
}

function PresentationInner() {
  const { state, next, prev } = usePresentation();
  const clickRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (state.expandedCardId) {
        if (e.key === "Escape") {
          // close modal handled in MemoryModal
        }
        return;
      }
      if (
        e.key === "ArrowRight" ||
        e.key === " " ||
        e.key === "Enter"
      ) {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, state.expandedCardId]);

  // Click anywhere to advance (not on interactive elements)
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (state.expandedCardId) return;
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("[data-no-advance]")
      ) {
        return;
      }
      next();
    },
    [next, state.expandedCardId]
  );

  const currentSection = getSectionForStep(state.currentStep);

  return (
    <div
      ref={clickRef}
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{ cursor: "default" }}
      onClick={handleClick}
    >
      <AmbientBackground />
      {/* Sections — crossfade (no mode="wait" to avoid blank gaps) */}
      <AnimatePresence>
        {currentSection.id === "hero" && (
          <HeroSection key="hero" visible={true} />
        )}
        {currentSection.id === "before" && (
          <TimelineSection
            key="before"
            stage="before"
            title="Background Evidence"
            subtitle="The pre-case context: not ahead, not fully sure, but finally moving."
            startStep={1}
            endStep={3}
            visible={true}
          />
        )}
        {currentSection.id === "during" && (
          <TimelineSection
            key="during"
            stage="during"
            title="Field Investigation"
            subtitle="The actual work: review comments, production pressure, ownership, and proof."
            startStep={4}
            endStep={10}
            visible={true}
          />
        )}
        {currentSection.id === "after" && (
          <GrowthSection key="after" visible={true} />
        )}
        {currentSection.id === "closing" && (
          <ClosingSection key="closing" visible={true} />
        )}
      </AnimatePresence>

      {/* UI Overlay */}
      <ControlBar />
      <ProgressIndicator />
      <NavigationHint />
      <SpotlightOverlay />
      <MemoryModal />
    </div>
  );
}

export function PresentationController() {
  return (
    <PresentationProvider>
      <PresentationInner />
    </PresentationProvider>
  );
}
