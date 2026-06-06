"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  description: string;
};

type AchievementContextType = {
  unlockAchievement: (achievement: Achievement) => void;
};

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [activeAchievements, setActiveAchievements] = useState<Achievement[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  const unlockAchievement = useCallback((achievement: Achievement) => {
    setUnlockedIds((prev) => {
      if (prev.has(achievement.id)) return prev; // Already unlocked
      
      const newSet = new Set(prev);
      newSet.add(achievement.id);
      
      // Show toast
      setActiveAchievements((current) => [...current, achievement]);
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        setActiveAchievements((current) => 
          current.filter((a) => a.id !== achievement.id)
        );
      }, 5000);
      
      return newSet;
    });
  }, []);

  return (
    <AchievementContext.Provider value={{ unlockAchievement }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {activeAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-gray-900/90 border border-yellow-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-4 w-72"
            >
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-yellow-500 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                  Achievement Unlocked
                </p>
                <h4 className="text-white text-sm font-medium leading-tight">
                  {achievement.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AchievementContext.Provider>
  );
}

export function useAchievement() {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error("useAchievement must be used within an AchievementProvider");
  }
  return context;
}
