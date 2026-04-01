"use client";

import { motion } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { sectionConfigs } from "@/data/timeline";
import { getEvidenceCode } from "@/lib/caseBoard";

export function ProgressIndicator() {
  const { state, goTo } = usePresentation();
  const currentSection =
    sectionConfigs.find(
      (section) =>
        state.currentStep >= section.startStep && state.currentStep <= section.endStep
    ) ?? sectionConfigs[0];

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 md:bottom-4 md:left-6 md:right-auto">
      <div className="board-panel flex w-fit max-w-full flex-col gap-2 rounded-[20px] px-3 py-3 md:max-w-[calc(100vw-3rem)] md:px-4 md:py-3">
        <div className="flex flex-nowrap items-center justify-between gap-3">
          <div>
            <p
              className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#866c5a" }}
            >
              Case Progress
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span
                className="font-display text-[28px] leading-none"
                style={{ color: "#2f221b" }}
              >
                {String(state.currentStep).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm" style={{ color: "#5a4a3f" }}>
                / {String(state.totalSteps - 1).padStart(2, "0")} · {currentSection.label}
              </span>
            </div>
          </div>
          <div
            className="shrink-0 rounded-full px-2.5 py-1 font-typewriter text-[10px] uppercase tracking-[0.16em]"
            style={{
              color: "#f7ebdc",
              backgroundColor: "rgba(88, 74, 63, 0.82)",
            }}
          >
            {getEvidenceCode(state.currentStep)}
          </div>
        </div>

        <div className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {Array.from({ length: state.totalSteps }).map((_, stepNum) => {
            const isActive = stepNum === state.currentStep;
            const isPast = stepNum < state.currentStep;

            return (
              <motion.button
                key={stepNum}
                onClick={() => goTo(stepNum)}
                whileHover={{ scale: 1.04, y: -1 }}
                className="min-w-[42px] shrink-0 rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em]"
                style={{
                  fontFamily: "Special Elite",
                  backgroundColor: isActive
                    ? "#b93a32"
                    : isPast
                    ? "rgba(120, 103, 90, 0.28)"
                    : "rgba(255, 248, 236, 0.7)",
                  color: isActive ? "#fff4ea" : isPast ? "#f7ebdc" : "#4b3a31",
                  boxShadow: isActive ? "0 8px 18px rgba(185, 58, 50, 0.22)" : "none",
                }}
                title={`Go to ${getEvidenceCode(stepNum)}`}
              >
                {String(stepNum).padStart(2, "0")}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
