"use client"

import confetti from "canvas-confetti"
import { useEffect, useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"

/** Fireworks-style burst (Magic UI / canvas-confetti pattern). */
function fireFireworks() {
  const duration = 4 * 1000
  const animationEnd = Date.now() + duration
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 100,
    colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#2f7a4a", "#8fd4a8"],
  }
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) {
      window.clearInterval(interval)
      return
    }
    const particleCount = 50 * (timeLeft / duration)
    void confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
    void confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  }, 250)
}

export function ThankYouFireworks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.35, margin: "0px 0px -12% 0px" })
  const reduceMotion = useReducedMotion() ?? false
  const hasFired = useRef(false)

  useEffect(() => {
    if (!isInView || reduceMotion || hasFired.current) return
    hasFired.current = true
    fireFireworks()
  }, [isInView, reduceMotion])

  return (
    <div ref={ref} className="mt-10">
      <p className="font-heading text-[44px] leading-[0.92] text-foreground">Thank You</p>
    </div>
  )
}
