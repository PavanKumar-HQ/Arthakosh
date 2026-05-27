import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ExpenseCategory = "housing" | "food" | "transportation" | "utilities" | "debt" | "lifestyle" | "other";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  isFixed: boolean; // Fixed vs Variable
}

export interface IncomeStream {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "yearly";
}

interface BudgetState {
  incomes: IncomeStream[];
  expenses: Expense[];
  
  // Actions
  addIncome: (income: Omit<IncomeStream, "id">) => void;
  updateIncome: (id: string, updates: Partial<IncomeStream>) => void;
  removeIncome: (id: string) => void;
  
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  removeExpense: (id: string) => void;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      incomes: [
        { id: "inc-1", name: "Primary Salary", amount: 65000, frequency: "monthly" }
      ],
      expenses: [
        { id: "exp-1", name: "Rent", amount: 20000, category: "housing", isFixed: true },
        { id: "exp-2", name: "Groceries", amount: 8000, category: "food", isFixed: false },
        { id: "exp-3", name: "EMI", amount: 5000, category: "debt", isFixed: true },
        { id: "exp-4", name: "Entertainment", amount: 4000, category: "lifestyle", isFixed: false }
      ],
      
      addIncome: (income) => set((state) => ({
        incomes: [...state.incomes, { ...income, id: `inc-${Date.now()}` }]
      })),
      
      updateIncome: (id, updates) => set((state) => ({
        incomes: state.incomes.map(i => i.id === id ? { ...i, ...updates } : i)
      })),
      
      removeIncome: (id) => set((state) => ({
        incomes: state.incomes.filter(i => i.id !== id)
      })),
      
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, { ...expense, id: `exp-${Date.now()}` }]
      })),
      
      updateExpense: (id, updates) => set((state) => ({
        expenses: state.expenses.map(e => e.id === id ? { ...e, ...updates } : e)
      })),
      
      removeExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(e => e.id !== id)
      }))
    }),
    { name: "budget-storage" }
  )
);
