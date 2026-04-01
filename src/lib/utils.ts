import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getItemsUpToStep(items: { step: number }[], currentStep: number) {
  return items.filter((item) => item.step <= currentStep);
}

export function getActiveItem<T extends { step: number }>(items: T[], currentStep: number): T | null {
  const visible = items.filter((item) => item.step <= currentStep);
  if (visible.length === 0) return null;
  return visible[visible.length - 1];
}
