"use client"

import { useEffect, useId, useMemo, useState } from "react"
import QRCode from "qrcode"

export function QrCode({
  value,
  size = 156,
  className,
}: {
  value?: string
  size?: number
  className?: string
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const id = useId()

  const options = useMemo(
    () => ({
      width: size,
      margin: 1,
      errorCorrectionLevel: "M" as const,
      color: {
        dark: "#0b0b0b",
        light: "#00000000", // transparent
      },
    }),
    [size]
  )

  useEffect(() => {
    let cancelled = false

    const target =
      value && value.trim().length > 0
        ? value.trim()
        : typeof window !== "undefined"
          ? window.location.origin
          : "/"

    QRCode.toDataURL(target, options)
      .then((url: string) => {
        if (cancelled) return
        setDataUrl(url)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setError(e instanceof Error ? e.message : "Failed to generate QR code")
      })

    return () => {
      cancelled = true
    }
  }, [options, value])

  if (error) {
    return (
      <div className={className} role="group" aria-labelledby={`${id}-label`}>
        <div id={`${id}-label`} className="sr-only">
          QR code
        </div>
        <a
          href={value || "/"}
          className="text-foreground/90 underline decoration-primary/35 underline-offset-4 transition hover:decoration-primary/70"
        >
          {value || "/"}
        </a>
      </div>
    )
  }

  return (
    <div className={className} role="group" aria-labelledby={`${id}-label`}>
      <div id={`${id}-label`} className="sr-only">
        QR code
      </div>
      <div className="rounded-2xl border border-border bg-background/60 p-3 shadow-sm backdrop-blur-sm">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dataUrl}
            alt=""
            width={size}
            height={size}
            className="block h-auto w-auto"
          />
        ) : (
          <div
            className="grid place-items-center text-[12px] text-muted-foreground"
            style={{ width: size, height: size }}
          >
            Generating…
          </div>
        )}
      </div>
    </div>
  )
}

