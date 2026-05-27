"use client";

import { usePathname } from "next/navigation";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "../shared/CommandPalette";
import { AnimatePresence, motion } from "framer-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Root landing page bypass
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Desktop Left Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Main Right Content Panel */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative">
        {/* Top Navigation Bar */}
        <TopNav />

        {/* Main Content Area */}
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
        
        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>

      <CommandPalette />
    </div>
  );
}
