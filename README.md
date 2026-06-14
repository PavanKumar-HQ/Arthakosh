# ✨ Interactive Birthday Tributes

A cinematic, interactive web experience built to celebrate and honor two very special teachers: **Meghana Ma'am** and **Preeti Ma'am**.

This project uses modern web technologies to create emotional, narrative-driven chapters filled with animations, music, and cherished memories.

## 🌟 Features

- **Two Distinct Journeys:** Choose between the elegant Book of Memories for Meghana Ma'am or the cinematic Garden of Growth for Preeti Ma'am.
- **Cinematic Animations:** Powered by `framer-motion` for smooth, responsive scroll animations, page transitions, and interactive elements.
- **Dynamic Multimedia:** Includes integrated background music via an invisible YouTube player for zero-delay music, alongside high-quality image galleries.
- **Interactive Chapters:** Features such as the "Energy Givers Wall" and the "Secret Greenhouse" that unlock as you progress through the story.
- **Celebratory Effects:** Confetti and custom SVG balloon animations trigger perfectly on scroll for a grand finale.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** `canvas-confetti`
- **State Management:** Zustand (for journey progress tracking)

## 💻 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/meghana`: The Book of Memories interactive experience.

- `components/meghana`: Custom components, chapters, and UI elements for Meghana's journey.

- `lib/store.ts`: Zustand store managing unlocked chapters and completed journeys.

## 🌐 Deployment

This project can easily be deployed on [Vercel](https://vercel.com) or GitHub Pages. Note: Very large media files have been hosted externally to ensure smooth deployments and bypass file-size limits.
