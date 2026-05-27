import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  recentActivity: { id: string; title: string; href: string; timestamp: number }[];
  addRecentActivity: (activity: { id: string; title: string; href: string }) => void;
  clearActivity: () => void;
}

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      recentActivity: [],
      addRecentActivity: (activity) => 
        set((state) => {
          const filtered = state.recentActivity.filter(a => a.id !== activity.id);
          return {
            recentActivity: [{ ...activity, timestamp: Date.now() }, ...filtered].slice(0, 5)
          };
        }),
      clearActivity: () => set({ recentActivity: [] }),
    }),
    {
      name: 'arthakosh-app-state',
    }
  )
);
