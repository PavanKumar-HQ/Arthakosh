"use client";

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";

type AudioContextType = {
  playTrack: (url: string) => void;
  stop: () => void;
  isPlaying: boolean;
  toggleMute: () => void;
  isMuted: boolean;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = (url: string) => {
    if (!audioRef.current) return;
    
    // Only reload and play if it's a different track or stopped
    if (currentTrack !== url || audioRef.current.paused) {
      audioRef.current.src = url;
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setCurrentTrack(url);
      }).catch(err => {
        console.warn("Autoplay blocked, waiting for user interaction.", err);
        setIsPlaying(false);
      });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <AudioContext.Provider value={{ playTrack, stop, isPlaying, toggleMute, isMuted }}>
      {children}
      {/* Floating mute toggle could go here, or we let journeys handle it */}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
