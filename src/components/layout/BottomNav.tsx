"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_CATEGORIES } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { 
  LayoutDashboard, FlaskConical, Map, MonitorPlay, Menu, X,
  GitBranch, Target, Wallet, ShieldAlert, TrendingUp, 
  Briefcase, LineChart, FileText, Laptop, 
  BrainCircuit, Activity, Split, 
  Clock, Lightbulb, Shield, Brain, Calculator, BookOpen
} from "lucide-react";

const mobileNav = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Labs', href: '/labs', icon: FlaskConical },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Budget', href: '/budget', icon: Wallet },
];

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Map, FlaskConical, GitBranch, 
  Target, Wallet, ShieldAlert, TrendingUp, 
  Briefcase, LineChart, FileText, Laptop, 
  BrainCircuit, Activity, Split, 
  Clock, Lightbulb, MonitorPlay, Shield, Brain, Calculator, BookOpen
};

export function BottomNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-xl border-t border-border/50 z-50 flex items-center justify-around px-2">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-[20%] h-full gap-1 transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all duration-200 ${isActive ? "bg-foreground/10 text-foreground scale-110" : "bg-transparent text-muted-foreground scale-100"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        {/* Menu Button — prominently styled */}
        <button
          id="bottom-nav-menu"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col items-center justify-center w-[20%] h-full gap-1 transition-colors"
        >
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 shadow-sm ${
            menuOpen 
              ? "bg-foreground text-background scale-105" 
              : "bg-foreground text-background hover:opacity-85 active:scale-95"
          }`}>
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-foreground">All</span>
        </button>
      </nav>

      {/* Fullscreen Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-40 bg-background flex flex-col pb-16"
          >
            <div className="flex items-center justify-between px-6 h-14 border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-10 shrink-0">
              <span className="font-bold text-lg tracking-tight">Navigation</span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 pb-32">
              {NAV_CATEGORIES.map((category) => (
                <div key={category.category} className="space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-2">
                    {category.category}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {category.items.map((item) => {
                      const Icon = iconMap[item.icon];
                      const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/' && pathname.startsWith(item.href));
                      
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                            isActive 
                              ? "bg-foreground text-background shadow-md" 
                              : "bg-surface text-foreground border border-border/50 shadow-sm active:scale-95"
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isActive ? "bg-background/20" : "bg-muted"}`}>
                            {Icon && <Icon className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className={`text-[11px] ${isActive ? "text-background/80" : "text-muted-foreground"}`}>
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
