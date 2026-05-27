"use client";

import { usePathname } from "next/navigation";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { CommandPalette } from "../shared/CommandPalette";
import { AnimatePresence, motion } from "framer-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Root landing page bypass
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Mobile Bottom Nav */}
      <BottomNav />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-0 relative">
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide bg-surface/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-full flex flex-col pb-20 lg:pb-0"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
