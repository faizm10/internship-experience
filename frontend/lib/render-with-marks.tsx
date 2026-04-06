import type { ComponentProps, ReactNode } from "react"
import { Highlighter } from "@/components/ui/highlighter"

export type TextMark = {
  phrase: string
  action?: ComponentProps<typeof Highlighter>["action"]
  color?: string
}

/**
 * Wraps ordered phrases in `text` with Highlighter. Phrases must appear left-to-right
 * in the string without overlapping earlier matches.
 */
export function renderWithMarks(text: string, marks: TextMark[] | undefined) {
  if (!marks?.length) return text

  const out: ReactNode[] = []
  let i = 0
  let key = 0

  for (const m of marks) {
    const idx = text.indexOf(m.phrase, i)
    if (idx === -1) continue
    if (idx > i) {
      out.push(<span key={`t-${key++}`}>{text.slice(i, idx)}</span>)
    }
    out.push(
      <Highlighter
        key={`h-${key++}`}
        action={m.action ?? "highlight"}
        color={m.color ?? "#ffd1dc"}
        isView
      >
        {m.phrase}
      </Highlighter>
    )
    i = idx + m.phrase.length
  }

  if (i < text.length) {
    out.push(<span key={`t-${key++}`}>{text.slice(i)}</span>)
  }

  return <>{out}</>
}
