# Internship Experience — Story Site

This repo contains a small Next.js app that turns an internship/co‑op experience into a clean, scrollable story with a photo marquee, modal viewing, and subtle motion.

## Local development

From the repo root:

```bash
cd frontend
npm install
npm run dev
```

Then open the URL printed in your terminal (usually `http://localhost:3000`).

## Where to edit content

- **Story content**: `frontend/content/story.json`
- **Main page layout**: `frontend/app/page.tsx`
- **Background (grid/noise)**: `frontend/components/BackgroundLayer.tsx` and `frontend/app/globals.css`
- **Marquee**: `frontend/components/PhotoMarquee.tsx`

## Scripts

```bash
cd frontend
npm run lint
npm run build
```

