"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { X, Tag } from "lucide-react";

export function MemoryModal() {
  const { state, expandCard } = usePresentation();

  const item = state.expandedCardId
    ? timelineItems.find((i) => i.id === state.expandedCardId)
    : null;

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => expandCard(null)}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(26,25,24,0.5)", backdropFilter: "blur(4px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-8"
          >
            <div
              className="relative bg-white rounded-sm polaroid-shadow pointer-events-auto max-w-lg w-full overflow-hidden"
              style={{ maxHeight: "80vh" }}
            >
              {/* Image header */}
              <div
                className="w-full flex items-center justify-center relative"
                style={{ height: 200, backgroundColor: item.color }}
              >
                <span className="text-7xl">{item.emoji}</span>
                <button
                  onClick={() => expandCard(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full"
                  style={{ backgroundColor: "rgba(0,0,0,0.2)", color: "white" }}
                >
                  <X size={16} />
                </button>
                <div
                  className="absolute bottom-3 left-4 font-sans text-xs uppercase tracking-wider px-2 py-0.5 rounded-full text-white/90"
                  style={{ backgroundColor: "rgba(0,0,0,0.25)", fontFamily: "DM Sans", fontSize: "10px", letterSpacing: "0.1em" }}
                >
                  {item.stage} · {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2
                  className="font-display text-2xl mb-1 leading-tight"
                  style={{ fontFamily: "Playfair Display", color: "#1A1918" }}
                >
                  {item.title}
                </h2>
                <p
                  className="font-handwritten text-lg mb-4"
                  style={{ fontFamily: "Caveat", color: "#9E9890" }}
                >
                  {item.caption}
                </p>
                <p
                  className="font-sans text-sm leading-relaxed mb-4"
                  style={{ color: "#4A4540", fontFamily: "DM Sans" }}
                >
                  {item.details}
                </p>

                {item.metric && (
                  <div
                    className="flex items-baseline gap-2 py-3 border-t"
                    style={{ borderColor: "#F0EAE0" }}
                  >
                    <span
                      className="font-display text-3xl"
                      style={{ color: "#E8622A", fontFamily: "Playfair Display" }}
                    >
                      {item.metric.value}
                    </span>
                    <span
                      className="font-sans text-sm"
                      style={{ color: "#9E9890", fontFamily: "DM Sans" }}
                    >
                      {item.metric.label}
                    </span>
                  </div>
                )}

                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "#F0EAE0",
                          color: "#6B645C",
                          fontFamily: "DM Sans",
                          fontSize: "11px",
                        }}
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
