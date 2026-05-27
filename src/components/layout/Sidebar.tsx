"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_CATEGORIES, APP_NAME } from "@/lib/constants";
import { OnboardingProfile } from "@/types/onboarding";
import {
  LayoutDashboard, FlaskConical, GitBranch, Target, Wallet, ShieldAlert,
  TrendingUp, Briefcase, BrainCircuit, Activity, Split, BookOpen,
  User, RotateCcw, ShieldCheck, HelpCircle
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  FlaskConical,
  GitBranch,
  Target,
  Wallet,
  ShieldAlert,
  TrendingUp,
  Briefcase,
  BrainCircuit,
  Activity,
  Split,
  BookOpen,
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user_onboarding_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading profile in sidebar", e);
      }
    }
  }, [pathname]);

  const handleReset = () => {
    localStorage.removeItem("user_onboarding_profile");
    setProfile(null);
    router.push("/onboarding");
  };

  return (
    <aside className={`flex-col h-screen w-64 bg-background/95 backdrop-blur-md border-r border-border/50 shrink-0 z-40 relative ${className}`}>
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border/50 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <img src="/logo.png" alt="Arthakosh" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg tracking-tight">{APP_NAME}</span>
        </Link>
      </div>

      {/* Navigation Links Scrollable Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7 scrollbar-hide">
        {NAV_CATEGORIES.map((category) => (
          <div key={category.category} className="space-y-2">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2.5">
              {category.category}
            </h4>
            <nav className="space-y-1">
              {category.items.map((item) => {
                const Icon = iconMap[item.icon];
                
                // Match active path
                const isActive = 
                  pathname === item.href || 
                  (item.href !== "/" && item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all relative group ${
                      isActive
                        ? "bg-foreground text-background shadow-md shadow-foreground/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-background rounded-full" />
                    )}
                    {Icon && <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-background" : "text-muted-foreground/80 group-hover:text-foreground"}`} />}
                    <div className="truncate">
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer Profile Status */}
      <div className="p-4 border-t border-border/50 bg-surface-raised/20 shrink-0">
        {profile ? (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shrink-0 border border-background shadow-sm text-xs font-extrabold text-white uppercase">
                {profile.lifeStage.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate capitalize leading-none">
                  {profile.lifeStage.replace("-", " ")}
                </p>
                <p className="text-[9px] text-muted-foreground truncate uppercase tracking-wide font-semibold mt-1">
                  OS Member
                </p>
              </div>
            </div>
            
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-border/60 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Adjust Lifemap
            </button>
          </div>
        ) : (
          <Link href="/onboarding" className="block">
            <button className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-violet text-white hover:bg-violet-hover rounded-xl shadow-lg shadow-violet/10 transition-colors">
              <ShieldCheck className="w-4 h-4" /> Start Lifemap Setup
            </button>
          </Link>
        )}
      </div>
    </aside>
  );
}
