import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Goal } from "@/types";
import { analyzeGoalHealth } from "../engines/analysis";
import { detectMultiGoalConflicts, MultiGoalConflict } from "../engines/multiGoal";

interface GoalsState {
  goals: Goal[];
  monthlyIncome: number | null;
  conflicts: MultiGoalConflict[];
  
  // Actions
  setMonthlyIncome: (income: number) => void;
  addGoal: (goal: Omit<Goal, "id" | "healthStatus" | "projectedGap" | "createdAt">) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  recalculateAll: () => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set, get) => ({
      goals: [],
      monthlyIncome: null,
      conflicts: [],

      setMonthlyIncome: (income) => {
        set({ monthlyIncome: income });
        get().recalculateAll();
      },

      addGoal: (goalInput) => {
        const id = `goal-${Date.now()}`;
        const newGoal: Goal = {
          ...goalInput,
          id,
          createdAt: new Date().toISOString(),
        };

        // Run analysis on the single goal
        const health = analyzeGoalHealth(newGoal);
        newGoal.healthStatus = health.status;
        newGoal.projectedGap = health.gap;

        set((state) => ({ goals: [...state.goals, newGoal] }));
        get().recalculateAll();
      },

      updateGoal: (id, updates) => {
        set((state) => {
          const newGoals = state.goals.map((g) => {
            if (g.id !== id) return g;
            const updatedGoal = { ...g, ...updates };
            // Re-run health analysis if financial params change
            const health = analyzeGoalHealth(updatedGoal);
            updatedGoal.healthStatus = health.status;
            updatedGoal.projectedGap = health.gap;
            return updatedGoal;
          });
          return { goals: newGoals };
        });
        get().recalculateAll();
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        }));
        get().recalculateAll();
      },

      recalculateAll: () => {
        const state = get();
        // Update conflicts
        const newConflicts = detectMultiGoalConflicts(state.goals, state.monthlyIncome);
        set({ conflicts: newConflicts });
      },
    }),
    {
      name: "arthakosh-goals-storage",
    }
  )
);
