"use client";

import { motion } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { sectionConfigs } from "@/data/timeline";

export function ProgressIndicator() {
  const { state, goTo } = usePresentation();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
      {/* Step counter */}
      <div
        className="font-sans text-xs tabular-nums"
        style={{ color: "#9E9890", fontFamily: "DM Sans" }}
      >
        <span style={{ color: "#1A1918", fontWeight: 500 }}>{state.currentStep}</span>
        <span className="mx-1">/</span>
        <span>{state.totalSteps - 1}</span>
      </div>

      {/* Section dots */}
      <div className="flex items-center gap-1.5">
        {sectionConfigs.map((section) => {
          const isActive =
            state.currentStep >= section.startStep &&
            state.currentStep <= section.endStep;
          const isPast = state.currentStep > section.endStep;
          const stepCount = section.endStep - section.startStep + 1;

          return (
            <div key={section.id} className="flex items-center gap-1">
              {Array.from({ length: stepCount }).map((_, i) => {
                const stepNum = section.startStep + i;
                const isThisStep = stepNum === state.currentStep;
                const isStepPast = state.currentStep > stepNum;

                return (
                  <motion.button
                    key={stepNum}
                    onClick={() => goTo(stepNum)}
                    whileHover={{ scale: 1.4 }}
                    animate={{
                      width: isThisStep ? 20 : 6,
                      opacity: isStepPast ? 0.6 : isThisStep ? 1 : 0.25,
                    }}
                    transition={{ duration: 0.2 }}
                    className="h-1.5 rounded-full cursor-pointer"
                    style={{
                      backgroundColor: isThisStep
                        ? "#E8622A"
                        : isStepPast
                        ? "#9E9890"
                        : "#C8C0B4",
                    }}
                    title={`${section.label} — step ${i + 1}`}
                  />
                );
              })}
              {/* Gap between sections */}
              <div className="w-1" />
            </div>
          );
        })}
      </div>

      {/* Section label */}
      <div
        className="font-sans text-xs uppercase tracking-wider"
        style={{
          color: "#9E9890",
          fontFamily: "DM Sans",
          letterSpacing: "0.1em",
          fontSize: "10px",
        }}
      >
        {sectionConfigs.find(
          (s) =>
            state.currentStep >= s.startStep && state.currentStep <= s.endStep
        )?.label ?? ""}
      </div>
    </div>
  );
}
