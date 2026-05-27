"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_CATEGORIES, APP_NAME } from "@/lib/constants";
import { 
  LayoutDashboard, FlaskConical, GitBranch,
  Target, Wallet, ShieldAlert, TrendingUp,
  Briefcase, BrainCircuit, Activity, Split,
  ChevronDown
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, FlaskConical, GitBranch,
  Target, Wallet, ShieldAlert, TrendingUp,
  Briefcase, BrainCircuit, Activity, Split,
};

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="h-16 flex-none border-b border-border/50 bg-background/95 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-50 sticky top-0 shrink-0 relative">
      {/* Left: Logo */}
      <div className="flex items-center z-10 shrink-0 lg:w-48">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-background font-bold text-sm leading-none">अ</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">{APP_NAME}</span>
        </Link>
      </div>

      {/* Center: Navigation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <nav className="hidden lg:flex items-center gap-2 pointer-events-auto">
          {NAV_CATEGORIES.map((category) => (
            <div key={category.category} className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-surface rounded-md transition-colors">
                {category.category}
                <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-all" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 transition-all bg-background border border-border/50 rounded-xl shadow-2xl p-2 z-50">
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/' && pathname.startsWith(item.href));
                      
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? "bg-surface text-foreground font-semibold" 
                            : "text-muted-foreground hover:bg-surface/50 hover:text-foreground"
                        }`}
                      >
                        {Icon && (
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-foreground" : "text-muted-foreground"}`} />
                        )}
                        <div className="min-w-0">
                          <span className="block text-sm truncate">{item.label}</span>
                          <span className="block text-[10px] truncate text-muted-foreground/70">{item.description}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 z-10 shrink-0 lg:w-48 justify-end">
        <button className="text-xs text-muted-foreground bg-accent/50 hover:bg-accent px-2.5 py-1.5 rounded-md border border-border/50 hidden sm:flex items-center gap-1.5 transition-colors">
          <span className="font-mono text-[10px]">⌘</span>K
          <span className="font-medium">Command</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shrink-0 border-2 border-background cursor-pointer hover:scale-105 transition-transform shadow-sm" />
      </div>
    </header>
  );
}
