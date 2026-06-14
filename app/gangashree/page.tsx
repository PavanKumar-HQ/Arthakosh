"use client";

import { OpeningSequence } from "@/components/gangashree/chapters/OpeningSequence";
import { ChapterOne } from "@/components/gangashree/chapters/ChapterOne";
import { ChapterTwo } from "@/components/gangashree/chapters/ChapterTwo";
import { EnergyGiversWall } from "@/components/gangashree/chapters/EnergyGiversWall";
import { HorizontalTimeline } from "@/components/gangashree/chapters/HorizontalTimeline";
import { ThingsWeNeverSaid } from "@/components/gangashree/chapters/ThingsWeNeverSaid";
import { ImpactVisualization } from "@/components/gangashree/chapters/ImpactVisualization";
import { FinalReveal } from "@/components/gangashree/chapters/FinalReveal";
import { FestiveBackground } from "@/components/FestiveBackground";
import { YouTubeAudioPlayer } from "@/components/shared/YouTubeAudioPlayer";
import { useJourneyStore } from "@/lib/store";

export default function GangashreeJourney() {
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
