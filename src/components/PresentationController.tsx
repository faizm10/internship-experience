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
import { Zap, Monitor, Shuffle } from "lucide-react";

function ControlBar() {
  const { state, toggleSpotlight, toggleMode, surpriseMe } = usePresentation();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
      {/* Surprise me */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={surpriseMe}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans"
        style={{
          fontFamily: "DM Sans",
          backgroundColor: "rgba(247,243,236,0.85)",
          border: "1px solid rgba(26,25,24,0.1)",
          color: "#6B645C",
          backdropFilter: "blur(8px)",
          fontSize: "11px",
        }}
        title="Jump to a random memory"
      >
        <Shuffle size={10} />
        Surprise me
      </motion.button>

      {/* Spotlight toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSpotlight}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans"
        style={{
          fontFamily: "DM Sans",
          backgroundColor: state.spotlightMode
            ? "rgba(26,25,24,0.85)"
            : "rgba(247,243,236,0.85)",
          border: state.spotlightMode
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(26,25,24,0.1)",
          color: state.spotlightMode ? "#F7F3EC" : "#6B645C",
          backdropFilter: "blur(8px)",
          fontSize: "11px",
        }}
        title="Toggle spotlight mode"
      >
        <Monitor size={10} />
        Spotlight
      </motion.button>

      {/* Mode toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMode}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans"
        style={{
          fontFamily: "DM Sans",
          backgroundColor: state.mode === "presentation"
            ? "rgba(232,98,42,0.1)"
            : "rgba(247,243,236,0.85)",
          border: state.mode === "presentation"
            ? "1px solid rgba(232,98,42,0.3)"
            : "1px solid rgba(26,25,24,0.1)",
          color: state.mode === "presentation" ? "#E8622A" : "#6B645C",
          backdropFilter: "blur(8px)",
          fontSize: "11px",
        }}
        title="Toggle presentation / free mode"
      >
        <Zap size={10} />
        {state.mode === "presentation" ? "Presenting" : "Free mode"}
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
      style={{ backgroundColor: "#F7F3EC", cursor: "default" }}
      onClick={handleClick}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,25,24,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.4,
        }}
      />

      {/* Sections */}
      <AnimatePresence mode="wait">
        {currentSection.id === "hero" && (
          <HeroSection key="hero" visible={true} />
        )}
        {currentSection.id === "before" && (
          <TimelineSection
            key="before"
            stage="before"
            title="Before I Started"
            subtitle="Nervous, caffeinated, and ready to learn."
            startStep={1}
            endStep={3}
            visible={true}
          />
        )}
        {currentSection.id === "during" && (
          <TimelineSection
            key="during"
            stage="during"
            title="During the Co-op"
            subtitle="Four months of real engineering."
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
