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
import { YouTubeAudioPlayer } from "@/components/preeti/generative/YouTubeAudioPlayer";
import { useJourneyStore } from "@/lib/store";

export default function MeghanaJourney() {
  const isMusicMuted = useJourneyStore(state => state.isMusicMuted);

  return (
    <main className="bg-transparent text-white min-h-screen selection:bg-amber-500/30 relative">
      <YouTubeAudioPlayer 
        videoId="fUffhENQ0Oo" 
        start={8} 
        play={!isMusicMuted} 
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
