"use client";

import { OpeningSequence } from "@/components/meghana/chapters/OpeningSequence";
import { ChapterOne } from "@/components/meghana/chapters/ChapterOne";
import { ChapterTwo } from "@/components/meghana/chapters/ChapterTwo";
import { EnergyGiversWall } from "@/components/meghana/chapters/EnergyGiversWall";
import { HorizontalTimeline } from "@/components/meghana/chapters/HorizontalTimeline";
import { ThingsWeNeverSaid } from "@/components/meghana/chapters/ThingsWeNeverSaid";
import { ImpactVisualization } from "@/components/meghana/chapters/ImpactVisualization";
import { FinalReveal } from "@/components/meghana/chapters/FinalReveal";
import { FestiveBackground } from "@/components/FestiveBackground";

export default function MeghanaJourney() {
  return (
    <main className="bg-transparent text-white min-h-screen selection:bg-amber-500/30 relative">
      <iframe
        width="1"
        height="1"
        src="https://www.youtube.com/embed/fUffhENQ0Oo?autoplay=1&start=8&end=91&controls=0&showinfo=0&autohide=1&loop=1&playlist=fUffhENQ0Oo"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        className="absolute opacity-0 pointer-events-none w-1 h-1 z-[-1]"
      />
      <FestiveBackground />
      <div className="relative z-10">
      <OpeningSequence />
      <ChapterOne />
      <ChapterTwo />
      <EnergyGiversWall />
      <HorizontalTimeline />
      <ThingsWeNeverSaid />
      <ImpactVisualization />
      <FinalReveal />
      </div>
    </main>
  );
}
