"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "../shared/CommandPalette";
import { AnimatePresence, motion } from "framer-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Root landing page bypass
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Desktop Left Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Sidebar Overlay Drawer */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Sidebar content drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative h-full w-64 bg-background"
            >
              <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Right Content Panel */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative">
        {/* Top Navigation Bar */}
        <TopNav onMenuClick={() => setIsMobileSidebarOpen(true)} />

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
