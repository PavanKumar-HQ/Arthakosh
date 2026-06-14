"use client";

import { useEffect, useRef, useState } from "react";

export function YouTubeAudioPlayer({ 
  videoId, 
  start = 0, 
  play = false 
}: { 
  videoId: string, 
  start?: number, 
  play: boolean 
}) {
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load YouTube API
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!playerRef.current) {
        playerRef.current = new (window as any).YT.Player(`yt-player-${videoId}`, {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: videoId,
            start: start
          },
          events: {
            onReady: (event: any) => {
              setIsReady(true);
            }
          }
        });
      }
    };

    const interval = setInterval(() => {
      if ((window as any).YT && (window as any).YT.Player) {
        initPlayer();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [videoId, start]);

  useEffect(() => {
    if (isReady && playerRef.current) {
      if (play) {
        playerRef.current.seekTo(start);
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [play, isReady, start]);

  // Handle browser autoplay policy by resuming audio on any interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (play && isReady && playerRef.current) {
        // If it's supposed to be playing but isn't (state 1 is playing)
        if (playerRef.current.getPlayerState() !== 1) {
          playerRef.current.playVideo();
        }
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [play, isReady]);

  return (
    <div className="absolute opacity-0 pointer-events-none z-[-1]">
      <div id={`yt-player-${videoId}`}></div>
    </div>
  );
}
