"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_CATEGORIES, APP_NAME } from "@/lib/constants";
import { 
  LayoutDashboard, FlaskConical, GitBranch,
  Target, Wallet, ShieldAlert, TrendingUp,
  Briefcase, BrainCircuit, Activity, Split,
  ChevronDown, BookOpen, Menu
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, FlaskConical, GitBranch,
  Target, Wallet, ShieldAlert, TrendingUp,
  Briefcase, BrainCircuit, Activity, Split,
  BookOpen,
};

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

export function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathnameToTitle[pathname]) return pathnameToTitle[pathname];
    if (pathname.startsWith("/goals/")) return "Goal Deep-Dive";
    if (pathname.startsWith("/labs/")) return "Lab Simulator";
    if (pathname.startsWith("/scenarios/")) return "Scenario Playground";
    if (pathname.startsWith("/tools/")) return "Money Tool Companion";
    return "Financial OS Workspace";
  };

  return (
    <header className="h-16 flex-none border-b border-border/50 bg-background/95 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-50 sticky top-0 shrink-0 relative">
      {/* Left: Dynamic page title on desktop, logo/menu on mobile */}
      <div className="flex items-center gap-2 z-10 shrink-0 lg:w-64">
        {/* Mobile menu trigger */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors mr-1 shrink-0"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Desktop title */}
        <span className="font-bold text-sm tracking-tight hidden lg:block text-foreground/80">
          {getPageTitle()}
        </span>
        
        {/* Mobile logo link */}
        <Link href="/" className="lg:hidden flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <img src="/logo.png" alt="Arthakosh" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">{APP_NAME}</span>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 z-10 shrink-0 lg:w-64 justify-end">
        <button className="text-xs text-muted-foreground bg-accent/50 hover:bg-accent px-2.5 py-1.5 rounded-md border border-border/50 hidden sm:flex items-center gap-1.5 transition-colors">
          <span className="font-mono text-[10px]">⌘</span>K
          <span className="font-medium">Command</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shrink-0 border-2 border-background cursor-pointer hover:scale-105 transition-transform shadow-sm" />
      </div>
    </header>
  );
}
