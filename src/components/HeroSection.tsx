"use client";

import { motion } from "framer-motion";
import { usePresentation } from "@/store/usePresentationStore";
import { ArrowRight } from "lucide-react";

export function HeroSection({ visible }: { visible: boolean }) {
  const { next } = usePresentation();

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Decorative large background text */}
      <div
        className="absolute select-none pointer-events-none font-display"
        style={{
          fontFamily: "Playfair Display",
          fontSize: "clamp(80px, 18vw, 220px)",
          fontWeight: 700,
          color: "rgba(26,25,24,0.04)",
          lineHeight: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
        }}
      >
        JOURNEY
      </div>

      {/* Top eyebrow label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-4"
      >
        <span
          className="font-sans text-xs uppercase tracking-widest px-3 py-1 rounded-full border"
          style={{
            fontFamily: "DM Sans",
            color: "#E8622A",
            borderColor: "#E8622A40",
            backgroundColor: "#E8622A0A",
            letterSpacing: "0.18em",
            fontSize: "10px",
          }}
        >
          Co-op · Winter 2025
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        className="font-display text-center leading-none mb-3"
        style={{
          fontFamily: "Playfair Display",
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 600,
          color: "#1A1918",
          letterSpacing: "-0.02em",
        }}
      >
        My Co-op
        <br />
        <em style={{ fontStyle: "italic", color: "#E8622A" }}>Journey</em>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        className="font-sans text-center max-w-sm mb-10"
        style={{
          fontFamily: "DM Sans",
          fontSize: "16px",
          color: "#9E9890",
          lineHeight: 1.6,
        }}
      >
        Four months. Real code. Real users.
        <br />A story worth telling.
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={next}
        className="flex items-center gap-2.5 px-6 py-3 rounded-full font-sans font-medium text-white"
        style={{
          fontFamily: "DM Sans",
          backgroundColor: "#E8622A",
          fontSize: "14px",
          boxShadow: "0 4px 20px rgba(232,98,42,0.35)",
        }}
      >
        Begin
        <ArrowRight size={15} />
      </motion.button>

      {/* Decorative corner accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-8 left-8 font-handwritten text-sm"
        style={{ fontFamily: "Caveat", color: "#C8C0B4", fontSize: "14px" }}
      >
        press → to start
      </motion.div>

      {/* Floating polaroid accents */}
      {[
        { top: "15%", left: "8%", rotate: -12, color: "#D4E4E8", emoji: "⚡", imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=200", delay: 1.3 },
        { top: "20%", right: "10%", rotate: 8, color: "#E4D4E8", emoji: "🚀", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200", delay: 1.5 },
        { bottom: "22%", left: "12%", rotate: 6, color: "#D4E8D4", emoji: "📊", imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=200", delay: 1.7 },
        { bottom: "18%", right: "8%", rotate: -9, color: "#E8E4D4", emoji: "🔥", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200", delay: 1.9 },
      ].map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, rotate: card.rotate * 0.5 }}
          animate={{
            opacity: 0.6,
            y: 0,
            rotate: card.rotate,
          }}
          transition={{ delay: card.delay, duration: 0.8, ease: "easeOut" }}
          className="absolute pointer-events-none"
          style={{
            top: card.top,
            left: card.left,
            right: (card as { right?: string }).right,
            bottom: (card as { bottom?: string }).bottom,
          }}
        >
          <div
            className="bg-white polaroid-shadow rounded-sm overflow-hidden"
            style={{ padding: "6px 6px 20px 6px", width: 80 }}
          >
            <div
              className="w-full rounded-sm flex items-center justify-center overflow-hidden"
              style={{ height: 60, backgroundColor: card.color }}
            >
              {card.imageUrl ? (
                <img src={card.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span style={{ fontSize: "22px" }}>{card.emoji}</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
