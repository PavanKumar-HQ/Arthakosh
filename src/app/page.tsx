"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Brain, Target, Wallet, Activity } from "lucide-react";

const NAV_LINKS = [
  { label: "Goals", href: "/goals" },
  { label: "Budget", href: "/budget" },
  { label: "Salary", href: "/salary" },
  { label: "Scenarios", href: "/scenarios" },
  { label: "Labs", href: "/labs" },
  { label: "Psychology", href: "/psychology" },
];

const MODULES = [
  {
    icon: Target,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    title: "Goal Architecture",
    description: "Multi-goal conflict analysis with inflation-adjusted projections, SIP optimization, and timeline pressure mapping.",
    href: "/goals",
    tag: "Planning",
  },
  {
    icon: Wallet,
    color: "text-violet-500",
    bg: "bg-violet-50",
    title: "Cashflow Intelligence",
    description: "50/30/20 allocation engine with lifestyle squeeze testing, fixed vs variable liability mapping, and cashflow stress analysis.",
    href: "/budget",
    tag: "Planning",
  },
  {
    icon: Shield,
    color: "text-red-500",
    bg: "bg-red-50",
    title: "Crisis Simulation",
    description: "Total income collapse scenarios with burn-rate calculators, liquidation penalty models, and survival runway visualization.",
    href: "/emergency",
    tag: "Risk",
  },
  {
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Behavioral Investing",
    description: "Compounding simulators driven by investor behavior patterns — not stock picks. Quantify the cost of panic selling vs consistent SIPs.",
    href: "/investing",
    tag: "Wealth",
  },
  {
    icon: Brain,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Salary Negotiation OS",
    description: "Immersive negotiation simulations against multiple recruiter archetypes, with dynamic intelligence briefings and strategic move trees.",
    href: "/salary",
    tag: "Career",
  },
  {
    icon: Activity,
    color: "text-rose-500",
    bg: "bg-rose-50",
    title: "Cognitive Finance Lab",
    description: "Behavioral archetype profiling, stress-response simulation, and decision-quality analysis under cognitive load.",
    href: "/behavior",
    tag: "Psychology",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">अ</span>
            </div>
            <span className="font-bold text-base tracking-tight">Arthakosh</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors"
          >
            Open App
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Financial Operating System for Indian Professionals
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-zinc-900 mb-6">
            The financial decisions
            <br />
            <span className="text-zinc-400">you face are not taught</span>
            <br />
            in any classroom.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Arthakosh is a professional-grade financial simulation platform. Build intuition for salary negotiations, portfolio behavior, crisis resilience, and behavioral biases through deep, interactive modules — not theory.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-zinc-800 transition-colors text-sm"
            >
              Start Simulating
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/scenarios"
              className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-700 font-semibold px-6 py-3 rounded-full hover:border-zinc-300 transition-colors text-sm"
            >
              View All Scenarios
            </Link>
          </div>
        </div>
      </section>

      {/* Horizontal rule */}
      <div className="border-t border-zinc-100 max-w-7xl mx-auto" />

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "8+", label: "Simulation Modules" },
          { value: "5+", label: "Behavioral Archetypes" },
          { value: "₹0", label: "Cost to Access" },
          { value: "100%", label: "Free & Independent" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <p className="text-3xl font-extrabold text-zinc-900">{s.value}</p>
            <p className="text-sm text-zinc-500">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Horizontal rule */}
      <div className="border-t border-zinc-100 max-w-7xl mx-auto" />

      {/* Why Arthakosh */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center mb-4 text-base">💡</div>
            <h3 className="font-bold text-base mb-2">Real-World Situations</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Built around the decisions professionals actually face — salary negotiations, EMI load, emergency fund gaps — not textbook hypotheticals.</p>
          </div>
          <div>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center mb-4 text-base">🧠</div>
            <h3 className="font-bold text-base mb-2">Behavioral Intelligence</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Understand how cognitive biases, stress, and emotional patterns shape your financial decisions — and train yourself to respond differently.</p>
          </div>
          <div>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center mb-4 text-base">⚡</div>
            <h3 className="font-bold text-base mb-2">No Hype, No Selling</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">No stock tips, no course upselling, no app subscriptions. Pure simulation and intelligence for better financial judgment.</p>
          </div>
        </div>
      </section>

      {/* Horizontal rule */}
      <div className="border-t border-zinc-100 max-w-7xl mx-auto" />

      {/* Modules Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-3 tracking-tight">
            Six professional-grade workspaces
          </h2>
          <p className="text-zinc-500 max-w-2xl text-base">
            Each module is a fully operational simulation environment, not a calculator or an article. Interact, test, and observe consequences in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link key={mod.href} href={mod.href} className="group">
                <div className="border border-zinc-200 rounded-2xl p-6 bg-white hover:border-zinc-400 hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl ${mod.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${mod.color}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-1">{mod.tag}</span>
                  </div>
                  <h3 className="font-bold text-zinc-900 text-base mb-2">{mod.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1">{mod.description}</p>
                  <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    Launch Module
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
