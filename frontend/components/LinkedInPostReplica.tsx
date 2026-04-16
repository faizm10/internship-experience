import Image from "next/image"
import { cn } from "@/lib/utils"

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.55v-5.54c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93v5.63H9.39V9h3.41v1.56h.05c.48-.9 1.63-1.84 3.35-1.84 3.58 0 4.25 2.36 4.25 5.43v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export type LinkedInPostReplicaProps = {
  authorName: string
  authorAvatarSrc?: string
  headline?: string
  subheadline?: string
  companyName?: string
  companyUrl?: string
  companyLogoSrc?: string
  companyCoverSrc?: string
  body: string
  className?: string
}

export function LinkedInPostReplica({
  authorName,
  authorAvatarSrc,
  headline,
  subheadline,
  companyName,
  companyUrl,
  companyLogoSrc,
  companyCoverSrc,
  body,
  className,
}: LinkedInPostReplicaProps) {
  const lines = body.split("\n")

  return (
    <article
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-background/75 shadow-[0_30px_90px_rgba(0,0,0,0.10)] backdrop-blur-2xl",
        className
      )}
    >
      <header className="flex items-start justify-between gap-4 px-5 pt-5">
        <div className="flex min-w-0 items-start gap-3">
          {authorAvatarSrc ? (
            <Image
              src={authorAvatarSrc}
              alt={authorName}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-full border border-border/60 object-cover"
            />
          ) : (
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/60 bg-primary/12 text-[12px] font-semibold text-primary"
              aria-hidden
            >
              {initials(authorName)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="truncate text-[14px] font-semibold text-foreground">
                {authorName}
              </div>
              {headline ? (
                <div className="text-[12px] text-muted-foreground">• {headline}</div>
              ) : null}
            </div>
            {subheadline ? (
              <div className="mt-0.5 text-[12px] text-muted-foreground">
                {subheadline}
              </div>
            ) : (
              <div className="mt-0.5 text-[12px] text-muted-foreground">
                1d • Edited
              </div>
            )}
          </div>
        </div>

        <a
          href={companyUrl || "#"}
          target={companyUrl ? "_blank" : undefined}
          rel={companyUrl ? "noopener noreferrer" : undefined}
          className={cn(
            "mt-1 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition",
            companyUrl ? "hover:bg-muted/70 hover:text-foreground" : ""
          )}
          aria-label={companyUrl ? "Open company" : "Company"}
        >
          <LinkedInIcon className="size-4 text-[#0A66C2]" />
          {companyName || "LinkedIn"}
        </a>
      </header>

      <div className="px-5 pb-4 pt-3 text-[14px] leading-relaxed text-foreground/90">
        {lines.map((line, i) => (
          <p key={i}>{line || "\u00a0"}</p>
        ))}
      </div>

      {/* Company visual */}
      {(companyCoverSrc || companyLogoSrc) ? (
        <div className="relative mx-5 mb-5 overflow-hidden rounded-xl border border-border bg-muted/20">
          <div className="relative aspect-[16/9] w-full">
            {companyCoverSrc ? (
              <Image
                src={companyCoverSrc}
                alt={companyName ? `${companyName} cover` : "Company cover"}
                fill
                sizes="(max-width: 768px) 92vw, 560px"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,color-mix(in_oklch,var(--primary)_26%,transparent)_0%,transparent_55%),radial-gradient(900px_500px_at_85%_80%,color-mix(in_oklch,var(--primary)_18%,transparent)_0%,transparent_62%)]" />
            )}

            {/* Logo chip */}
            {companyLogoSrc ? (
              <div className="absolute left-4 bottom-4 rounded-2xl border border-border/80 bg-background/85 p-2.5 shadow-[0_18px_44px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                <Image
                  src={companyLogoSrc}
                  alt={companyName ? `${companyName} logo` : "Company logo"}
                  width={44}
                  height={44}
                  className="size-11 rounded-xl object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  )
}

