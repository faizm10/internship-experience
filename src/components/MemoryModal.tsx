"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { timelineItems } from "@/data/timeline";
import { X, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function MemoryModal() {
  const { state, expandCard } = usePresentation();
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const item = state.expandedCardId
    ? timelineItems.find((i) => i.id === state.expandedCardId)
    : null;

  // Reset image index when modal opens/changes
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
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-6 md:p-8"
          >
            <div
              className="relative bg-[#FDFCFB] rounded-[4px] polaroid-shadow pointer-events-auto max-w-lg w-full overflow-hidden border border-black/[0.03]"
              style={{ maxHeight: "85vh" }}
            >
              {/* Image header / Carousel */}
              <div
                className="w-full flex items-center justify-center relative overflow-hidden group"
                style={{ height: 280, backgroundColor: item.color }}
              >
                {/* Inner recessed shadow */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10 pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImgIdx}
                    src={item.images[activeImgIdx]}
                    alt={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full backdrop-blur-md bg-black/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/30"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full backdrop-blur-md bg-black/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/30"
                    >
                      <ChevronRight size={18} />
                    </button>
                    
                    {/* Image Indicator Dots */}
                    <div className="absolute bottom-4 right-5 z-30 flex gap-1.5">
                      {item.images.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === activeImgIdx ? "w-4 bg-white" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />

                <button
                  onClick={() => expandCard(null)}
                  className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md bg-black/20 text-white transition-colors hover:bg-black/40 z-20"
                >
                  <X size={18} />
                </button>

                <div
                  className="absolute bottom-4 left-5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full text-white/95 z-20 backdrop-blur-sm border border-white/20"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", fontFamily: "DM Sans" }}
                >
                  {item.stage} · {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h2
                    className="font-display text-3xl mb-2 leading-tight font-bold"
                    style={{ fontFamily: "Playfair Display", color: "#1A1918", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="font-handwritten text-2xl italic"
                    style={{ fontFamily: "Caveat", color: "#E8622A", fontWeight: 500 }}
                  >
                    {item.caption}
                  </p>
                </div>

                <div className="space-y-4">
                  <p
                    className="font-sans text-[15px] leading-relaxed"
                    style={{ color: "#4A4540", fontFamily: "DM Sans" }}
                  >
                    {item.details}
                  </p>

                  {item.metric && (
                    <div
                      className="flex items-center gap-4 py-5 border-y"
                      style={{ borderColor: "#F0EAE0" }}
                    >
                      <div
                        className="font-display text-4xl font-bold"
                        style={{ color: "#E8622A", fontFamily: "Playfair Display" }}
                      >
                        {item.metric.value}
                      </div>
                      <div
                        className="font-sans text-xs font-bold uppercase tracking-wider leading-tight"
                        style={{ color: "#9E9890", fontFamily: "DM Sans" }}
                      >
                        {item.metric.label}
                      </div>
                    </div>
                  )}

                  {item.tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors hover:bg-charcoal hover:text-white"
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "#EFE8DC",
                            color: "#9E9890",
                            fontFamily: "DM Sans",
                          }}
                        >
                          <Tag size={10} className="opacity-60" />
                          {tag}
                        </span>
                      ))}
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
