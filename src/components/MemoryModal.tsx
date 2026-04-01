"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { X, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { easeSmooth } from "@/lib/motion";
import { CATEGORY_META, STAGE_META, getEvidenceCode } from "@/lib/caseBoard";

export function MemoryModal() {
  const { state, expandCard } = usePresentation();
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const item = state.expandedCardId
    ? timelineItems.find((i) => i.id === state.expandedCardId)
    : null;

  useEffect(() => {
    setActiveImgIdx(0);
  }, [state.expandedCardId]);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item) return;
    setActiveImgIdx((prev) => (prev + 1) % item.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item) return;
    setActiveImgIdx((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            key="case-file-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => expandCard(null)}
            className="fixed inset-0 z-40"
            style={{
              background:
                "radial-gradient(circle at top, rgba(255,230,167,0.12), transparent 22%), rgba(13,9,8,0.8)",
              backdropFilter: "blur(8px)",
            }}
          />

          <motion.div
            key="case-file-modal"
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div
              className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[12px] border md:grid-cols-[1.15fr_0.95fr]"
              style={{
                borderColor: "rgba(111, 78, 51, 0.24)",
                background:
                  "linear-gradient(180deg, rgba(244,234,216,0.99) 0%, rgba(234,220,196,0.99) 100%)",
                boxShadow: "0 30px 100px rgba(0,0,0,0.42)",
              }}
            >
              <div
                className="absolute left-8 top-0 h-8 w-24 -translate-y-1/2 rounded-b-[6px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(213,199,158,0.94) 0%, rgba(180,167,127,0.85) 100%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />

              <button
                onClick={() => expandCard(null)}
                className="absolute right-4 top-4 z-30 rounded-full border p-2 transition-colors"
                style={{
                  borderColor: "rgba(63, 44, 30, 0.16)",
                  backgroundColor: "rgba(255, 248, 236, 0.88)",
                  color: "#3f2d24",
                }}
              >
                <X size={18} />
              </button>

              <div
                className="relative min-h-[320px] overflow-hidden border-b md:border-b-0 md:border-r"
                style={{ borderColor: "rgba(63, 44, 30, 0.12)" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={`${item.id}-${activeImgIdx}`}
                    src={item.images[activeImgIdx]}
                    alt={item.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.42, ease: easeSmooth }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(18,12,10,0.14) 0%, rgba(18,12,10,0.45) 100%)",
                  }}
                />

                <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-3 py-1 font-typewriter text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: "rgba(24,17,14,0.78)",
                      color: "#f7ebdc",
                    }}
                  >
                    {getEvidenceCode(item.step)}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 font-typewriter text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: `${CATEGORY_META[item.category].accent}D9`,
                      color: "#f7ebdc",
                    }}
                  >
                    {CATEGORY_META[item.category].chip}
                  </span>
                </div>

                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border p-2"
                      style={{
                        backgroundColor: "rgba(22, 16, 14, 0.42)",
                        borderColor: "rgba(255, 255, 255, 0.16)",
                        color: "#f6ebdc",
                      }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border p-2"
                      style={{
                        backgroundColor: "rgba(22, 16, 14, 0.42)",
                        borderColor: "rgba(255, 255, 255, 0.16)",
                        color: "#f6ebdc",
                      }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(250, 240, 225, 0.82)" }}
                    >
                      {STAGE_META[item.stage].stamp}
                    </p>
                    <h2
                      className="font-display text-4xl leading-none md:text-5xl"
                      style={{ color: "#fff5e9", letterSpacing: "-0.03em" }}
                    >
                      {item.title}
                    </h2>
                    <p
                      className="mt-2 font-handwritten text-[28px] leading-none"
                      style={{ color: "#ffd9bc" }}
                    >
                      {item.caption}
                    </p>
                  </div>

                  {item.images.length > 1 && (
                    <div className="flex gap-1.5">
                      {item.images.map((_, i) => (
                        <div
                          key={i}
                          className="h-1.5 rounded-full"
                          style={{
                            width: i === activeImgIdx ? 18 : 6,
                            backgroundColor:
                              i === activeImgIdx ? "#fff5e9" : "rgba(255, 245, 233, 0.4)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto px-5 py-5 md:px-7 md:py-6">
                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                  <div className="paper-panel rounded-[8px] px-4 py-3">
                    <p
                      className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "#8c6a55" }}
                    >
                      Classification
                    </p>
                    <p className="mt-2 text-sm font-medium" style={{ color: "#3f2d24" }}>
                      {CATEGORY_META[item.category].chip}
                    </p>
                  </div>
                  <div className="paper-panel rounded-[8px] px-4 py-3">
                    <p
                      className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "#8c6a55" }}
                    >
                      Stage
                    </p>
                    <p className="mt-2 text-sm font-medium" style={{ color: "#3f2d24" }}>
                      {STAGE_META[item.stage].label}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p
                      className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "#8c6a55" }}
                    >
                      Narrative Summary
                    </p>
                    <p
                      className="mt-2 text-[15px] leading-7"
                      style={{ color: "#43342b" }}
                    >
                      {item.details}
                    </p>
                  </div>

                  {item.metric && (
                    <div
                      className="rounded-[8px] border px-4 py-4"
                      style={{
                        borderColor: `${CATEGORY_META[item.category].accent}44`,
                        backgroundColor: `${CATEGORY_META[item.category].paper}AA`,
                      }}
                    >
                      <p
                        className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: CATEGORY_META[item.category].accent }}
                      >
                        Key Impact
                      </p>
                      <div className="mt-2 flex items-end gap-3">
                        <div
                          className="font-display text-5xl leading-none"
                          style={{
                            color: CATEGORY_META[item.category].accent,
                            fontWeight: 700,
                          }}
                        >
                          {item.metric.value}
                        </div>
                        <div
                          className="font-typewriter text-[11px] uppercase tracking-[0.16em]"
                          style={{ color: "#59453a" }}
                        >
                          {item.metric.label}
                        </div>
                      </div>
                    </div>
                  )}

                  {item.tags && (
                    <div>
                      <p
                        className="font-typewriter text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: "#8c6a55" }}
                      >
                        Linked Terms
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]"
                            style={{
                              borderColor: "rgba(83, 60, 42, 0.16)",
                              color: "#59453a",
                              backgroundColor: "rgba(255, 249, 239, 0.74)",
                            }}
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
