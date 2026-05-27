"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { AlignJustify, PanelLeftClose, PanelLeftOpen, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const pathnameToTitle: Record<string, string> = {
  "/": "Landing Page",
  "/dashboard": "Financial OS Dashboard",
  "/labs": "Interactive Decision Labs",
  "/scenarios": "Scenario Simulations",
  "/goals": "Goals Dashboard",
  "/goals/create": "Create Savings Goal",
  "/budget": "Cashflow Intelligence",
  "/emergency": "Emergency War-Room",
  "/investing": "Behavioral Investing",
  "/salary": "Salary Negotiation OS",
  "/psychology": "Financial Psychology Mirror",
  "/behavior": "Cognitive Finance Lab",
  "/decisions": "Tradeoff Scale Engine",
  "/resources": "Everyday Resources Hub",
  "/estate": "Estate & Legacy Checklist",
};

interface TopNavProps {
  onMenuClick?: () => void;
  onDesktopToggle?: () => void;
  isDesktopCollapsed?: boolean;
}

export function TopNav({ onMenuClick, onDesktopToggle, isDesktopCollapsed }: TopNavProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const getPageTitle = () => {
    if (pathnameToTitle[pathname]) return pathnameToTitle[pathname];
    if (pathname.startsWith("/goals/")) return "Goal Deep-Dive";
    if (pathname.startsWith("/labs/")) return "Lab Simulator";
    if (pathname.startsWith("/scenarios/")) return "Scenario Playground";
    if (pathname.startsWith("/tools/")) return "Money Tool Companion";
    return "Financial OS Workspace";
  };

  return (
    <header className="h-16 flex-none border-b border-border/50 bg-background/95 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 z-50 sticky top-0 shrink-0">
      {/* Left: Desktop toggle + page title | Mobile: hamburger + logo */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Desktop: sidebar collapse/expand toggle */}
        {onDesktopToggle && (
          <button
            id="desktop-sidebar-toggle"
            onClick={onDesktopToggle}
            title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 active:scale-95 transition-all border border-border/50"
            aria-label={isDesktopCollapsed ? "Expand navigation sidebar" : "Collapse navigation sidebar"}
          >
            {isDesktopCollapsed
              ? <PanelLeftOpen className="w-4 h-4" />
              : <PanelLeftClose className="w-4 h-4" />
            }
          </button>
        )}

        {/* Mobile: hamburger menu trigger */}
        {onMenuClick && (
          <button
            id="mobile-menu-trigger"
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-foreground text-background hover:opacity-85 active:scale-95 transition-all shrink-0 shadow-sm"
            aria-label="Open navigation menu"
          >
            <AlignJustify className="w-5 h-5" />
          </button>
        )}

        {/* Mobile: app logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <img src="/logo.png" alt="Arthakosh" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-base tracking-tight">{APP_NAME}</span>
        </Link>

        {/* Desktop: page title */}
        <span className="font-bold text-sm tracking-tight hidden lg:block text-foreground/80">
          {getPageTitle()}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Dark / Light mode toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 active:scale-95 transition-all border border-border/50"
          aria-label="Toggle dark/light mode"
        >
          {theme === "dark"
            ? <Sun className="w-4 h-4 text-amber-400" />
            : <Moon className="w-4 h-4" />
          }
        </button>

        {/* ⌘K shortcut */}
        <button className="text-xs text-muted-foreground bg-accent/50 hover:bg-accent px-2.5 py-1.5 rounded-md border border-border/50 hidden sm:flex items-center gap-1.5 transition-colors">
          <span className="font-mono text-[10px]">⌘</span>K
          <span className="font-medium">Command</span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shrink-0 border-2 border-background cursor-pointer hover:scale-105 transition-transform shadow-sm" />
      </div>
    </header>
  );
}
