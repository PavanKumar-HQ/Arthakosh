import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type JourneyState = {
  meghanaCompleted: boolean;
  energyLevel: number;
  discoveredMemories: string[];
  planetsVisited: string[];
  collectedKeys: number;
  completeMeghana: () => void;
  increaseEnergy: (amount: number) => void;
  addDiscoveredMemory: (id: string) => void;
  addPlanetVisited: (planet: string) => void;
  collectKey: () => void;
  isMusicMuted: boolean;
  setMusicMuted: (muted: boolean) => void;
};

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      meghanaCompleted: false,
      energyLevel: 0,
      discoveredMemories: [],
      planetsVisited: [],
      collectedKeys: 0,
      isMusicMuted: false,
      completeMeghana: () => set({ meghanaCompleted: true }),
      increaseEnergy: (amount) => set((state) => ({ energyLevel: state.energyLevel + amount })),
      addDiscoveredMemory: (id) => set((state) => ({ 
        discoveredMemories: state.discoveredMemories.includes(id) ? state.discoveredMemories : [...state.discoveredMemories, id] 
      })),
      addPlanetVisited: (planet) => set((state) => ({
        planetsVisited: state.planetsVisited.includes(planet) ? state.planetsVisited : [...state.planetsVisited, planet]
      })),
      collectKey: () => set((state) => ({ collectedKeys: state.collectedKeys + 1 })),
      setMusicMuted: (muted) => set({ isMusicMuted: muted }),
      resetJourneys: () => set({ 
        meghanaCompleted: false, 
        energyLevel: 0,
        discoveredMemories: [],
        planetsVisited: [],
        collectedKeys: 0,
        isMusicMuted: false
      }),
    }),
    {
      name: 'archive-journey-storage',
    }
  )
);
