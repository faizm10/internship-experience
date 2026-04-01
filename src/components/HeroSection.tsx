"use client";

import { motion } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { easeSmooth, sectionTransition } from "@/lib/motion";
import { ArrowRight, FolderOpen, MapPinned, ShieldCheck } from "lucide-react";
import { getEvidenceCode } from "@/lib/caseBoard";

const intakeNotes = [
  {
    label: "Objective",
    value: "Trace how four months of internship work changed how I build, debug, and think.",
  },
  {
    label: "Location",
    value: "TD Bank · Winter 2025",
  },
  {
    label: "Primary Evidence",
    value: "PR reviews, production incidents, shipped features, mentor conversations, and final reflection.",
  },
];

export function HeroSection({ visible }: { visible: boolean }) {
  const { next } = usePresentation();

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.38, ease: easeSmooth } }}
      transition={sectionTransition}
      className="absolute inset-0 z-10 flex items-center justify-center px-4 py-6 md:px-8 md:py-10"
    >
      <div
        className="absolute inset-0 flex items-center justify-center select-none"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="font-display text-center leading-none"
          style={{
            fontSize: "clamp(68px, 16vw, 220px)",
            letterSpacing: "-0.05em",
            color: "rgba(255, 239, 214, 0.06)",
          }}
        >
          CASE
          <br />
          FILE
        </div>
      </div>

      <div className="relative w-full max-w-6xl">
        <div
          className="board-panel relative overflow-hidden rounded-[28px] px-5 py-5 md:px-8 md:py-8"
        >
          <div
            className="tape-strip"
            style={{ left: 36, top: -10, rotate: "-8deg" }}
          />
          <div
            className="tape-strip"
            style={{ right: 42, top: -10, rotate: "7deg", width: 88 }}
          />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-typewriter text-[10px] uppercase tracking-[0.2em]"
                style={{
                  backgroundColor: "#1f1714",
                  color: "#f7ebdc",
                }}
              >
                {getEvidenceCode(0)}
              </span>
              <span
                className="rounded-full px-3 py-1 font-typewriter text-[10px] uppercase tracking-[0.18em]"
                style={{
                  color: "#b93a32",
                  backgroundColor: "rgba(185, 58, 50, 0.08)",
                }}
              >
                Case Intake
              </span>
            </div>
            <div
              className="font-typewriter text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "#8e6f5a" }}
            >
              Winter 2025 · Active Investigation
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.8fr)]">
            <div className="space-y-5">
              <div className="paper-panel rounded-[20px] px-5 py-5 md:px-7 md:py-6">
                <p
                  className="font-typewriter text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "#8c6a55" }}
                >
                  Subject File
                </p>
                <h1
                  className="mt-3 font-display leading-[0.92]"
                  style={{
                    fontSize: "clamp(48px, 9vw, 94px)",
                    color: "var(--ink)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  The Co-op
                  <br />
                  <span style={{ color: "#b93a32" }}>Investigation</span>
                </h1>
                <p
                  className="mt-5 max-w-2xl text-[15px] leading-7 md:text-[17px]"
                  style={{ color: "#4b3a31" }}
                >
                  Not a recap. An evidence board. Each clue tracks how I went from
                  a student still figuring it out to someone who has now touched real
                  code, real incidents, and real engineering judgment.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.42, ease: easeSmooth }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={next}
                    className="flex items-center gap-2 rounded-full px-5 py-3 text-sm uppercase tracking-[0.16em]"
                    style={{
                      backgroundColor: "#b93a32",
                      color: "#fff4ea",
                      fontFamily: "Special Elite",
                      boxShadow: "0 12px 28px rgba(185,58,50,0.34)",
                    }}
                  >
                    open case file
                    <ArrowRight size={16} />
                  </motion.button>
                  <div
                    className="flex items-center gap-2 rounded-full px-4 py-3 text-[11px] uppercase tracking-[0.16em]"
                    style={{
                      color: "#5f4d42",
                      backgroundColor: "rgba(255, 249, 239, 0.9)",
                      fontFamily: "Special Elite",
                      boxShadow: "0 8px 18px rgba(33, 24, 19, 0.08)",
                    }}
                  >
                    <FolderOpen size={14} />
                    16 clues filed
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: MapPinned,
                    title: "Route",
                    detail: "Background -> investigation -> findings -> verdict",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Standard",
                    detail: "Readable enough for a prof, memorable enough to actually matter",
                  },
                  {
                    icon: FolderOpen,
                    title: "Method",
                    detail: "One active clue at a time, with the red thread guiding the next lead",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="paper-panel rounded-[18px] px-4 py-4"
                  >
                    <item.icon size={18} style={{ color: "#b93a32" }} />
                    <p
                      className="mt-3 font-typewriter text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: "#8c6a55" }}
                    >
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6" style={{ color: "#46372f" }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="paper-panel rounded-[20px] px-5 py-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p
                    className="font-typewriter text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: "#8c6a55" }}
                  >
                    Intake Notes
                  </p>
                  <span
                    className="rounded-full px-2.5 py-1 font-typewriter text-[10px] uppercase tracking-[0.16em]"
                    style={{
                      color: "#b93a32",
                      backgroundColor: "rgba(185, 58, 50, 0.08)",
                    }}
                  >
                    cleared
                  </span>
                </div>

                <div className="space-y-4">
                  {intakeNotes.map((note) => (
                    <div
                      key={note.label}
                      className="border-b pb-4 last:border-b-0 last:pb-0"
                      style={{ borderColor: "rgba(75, 58, 45, 0.1)" }}
                    >
                      <p
                        className="font-typewriter text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: "#8c6a55" }}
                      >
                        {note.label}
                      </p>
                      <p className="mt-2 text-sm leading-6" style={{ color: "#46372f" }}>
                        {note.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="paper-panel relative ml-auto max-w-[280px] rounded-[18px] px-4 py-4"
                style={{ rotate: "3deg" }}
              >
                <div
                  className="tape-strip"
                  style={{ left: "50%", top: -10, width: 84, rotate: "-4deg", transform: "translateX(-50%)" }}
                />
                <p
                  className="font-handwritten text-[27px] leading-none"
                  style={{ color: "#b93a32" }}
                >
                  Follow the thread.
                </p>
                <p className="mt-3 text-sm leading-6" style={{ color: "#4b3a31" }}>
                  Every reveal is a new clue. The board only works if each point
                  leads naturally to the next one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
