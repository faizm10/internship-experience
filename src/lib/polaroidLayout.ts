/** Shared geometry for polaroid frames and layout springs (half-width / half-height centering). */
export const POLAROID_LAYOUT = {
  width: 320,
  imageHeight: 196,
  padding: "16px 16px 18px 16px",
  /** Center active card: translate from top-left anchor to visual center */
  centerOffsetX: -160,
  centerOffsetY: -170,
} as const;
