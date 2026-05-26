"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import {
  Target,
  GitBranch,
  BookOpen,
  Calculator,
  TrendingUp,
  Shield,
  Brain,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BarChart3,
  Wallet,
  GraduationCap,
  Heart,
  Umbrella,
  Lightbulb,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ============================================================
// Landing Page — "Financial literacy for real life"
// ============================================================

export default function LandingPage() {
  return (
    <div className="relative">
      <HeroSection />
      <PhilosophyStrip />
      <FeaturesGrid />
      <ScenarioPreview />
      <ToolPreview />
      <TrustSection />
      <CTASection />
    </div>
  );
}

// --- Hero Section ---

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-accent/5 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-emerald/5 via-transparent to-transparent opacity-40" />
      </div>

      <div className="container-page relative">
        <div className="flex flex-col items-center text-center pt-16 sm:pt-24 pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-xs font-medium tracking-wide"
            >
              <Sparkles className="w-3 h-3 mr-1.5" />
              For Indian students, professionals & families
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1]"
          >
            Financial literacy for{" "}
            <span className="text-gradient">real life</span>,{" "}
            <br className="hidden sm:block" />
            not just investing.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Navigate real financial situations — from your first salary to
            retirement. No jargon, no hype, just practical intelligence for
            every money decision you&apos;ll face.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity duration-150 shadow-lg shadow-foreground/10"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors duration-150"
            >
              Explore Tools
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex items-center gap-8 sm:gap-12 text-center"
          >
            {[
              { value: "8+", label: "Interactive tools" },
              { value: "3+", label: "Life scenarios" },
              { value: "100%", label: "Free & educational" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold font-tabular">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Philosophy Strip ---

function PhilosophyStrip() {
  const principles = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Real Situations",
      description:
        "Built around actual financial decisions you face — not textbook theory.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Not Preachy",
      description:
        "We explain tradeoffs honestly. No guilt, no judgment, just clarity.",
    },
    {
      icon: <Umbrella className="w-5 h-5" />,
      title: "Your Pace",
      description:
        "Personalized pathways based on your life stage and priorities.",
    },
  ];

  return (
    <section className="border-y border-border/50 bg-surface-raised/50">
      <div className="container-page section-spacing-sm">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle) => (
            <StaggerItem key={principle.title}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-foreground">
                  {principle.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// --- Features Grid ---

const features = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Goal Planning",
    description:
      "Set financial goals with inflation-adjusted projections, timelines, and actionable monthly targets.",
    href: "/goals",
    color: "text-blue-accent",
    bgColor: "bg-blue-accent/10",
  },
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: "Scenario Simulator",
    description:
      "Face real financial dilemmas — salary loss, medical emergencies, first job — and learn from every choice.",
    href: "/scenarios",
    color: "text-violet",
    bgColor: "bg-violet/10",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Learn by Doing",
    description:
      "Interactive budget allocators, credit score simulators, and debt spiral visualizations.",
    href: "/learn",
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
  {
    icon: <Calculator className="w-5 h-5" />,
    title: "Money Toolkit",
    description:
      "SIP, EMI, tax, insurance — 8 calculators with contextual insights, not just numbers.",
    href: "/tools",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Salary Negotiation",
    description:
      "Learn recruiter psychology, practice roleplay conversations, and benchmark your worth.",
    href: "/salary",
    color: "text-rose",
    bgColor: "bg-rose/10",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Estate Planning",
    description:
      "Simple guidance on wills, nominees, insurance, and emergency documentation.",
    href: "/estate",
    color: "text-blue-accent",
    bgColor: "bg-blue-accent/10",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "Money Psychology",
    description:
      "Understand emotional spending, lifestyle inflation, and the scarcity mindset.",
    href: "/psychology",
    color: "text-violet",
    bgColor: "bg-violet/10",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Smart Onboarding",
    description:
      "Tell us your life stage — we'll create a personalized path just for you.",
    href: "/onboarding",
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
];

function FeaturesGrid() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need,{" "}
            <span className="text-muted-foreground">nothing you don&apos;t</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Eight focused modules designed to handle every real financial
            situation in your life.
          </p>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Link href={feature.href}>
                <Card className="p-5 h-full card-hover group cursor-pointer">
                  <div
                    className={`w-10 h-10 rounded-xl ${feature.bgColor} flex items-center justify-center ${feature.color} mb-4 transition-transform duration-200 group-hover:scale-105`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold mb-2 group-hover:text-foreground transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// --- Scenario Preview ---

function ScenarioPreview() {
  return (
    <section className="section-spacing bg-surface-raised/30 border-y border-border/30">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-xs font-medium"
            >
              <GitBranch className="w-3 h-3 mr-1.5" />
              Scenario Simulator
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Learn from decisions,{" "}
              <br className="hidden sm:block" />
              not textbooks
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Face realistic financial scenarios and make choices. See the
              consequences, understand the tradeoffs, and build financial
              intuition through experience.
            </p>
            <Link
              href="/scenarios"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline underline-offset-4"
            >
              Try a scenario
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            {/* Mini scenario preview */}
            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-violet/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Live Scenario
                  </span>
                </div>
                <h4 className="font-semibold mb-2">
                  Your First ₹25,000 Salary
                </h4>
                <p className="text-sm text-muted-foreground mb-5">
                  You just received your first salary. Your parents expect
                  contribution, you need to save, and you want to enjoy life.
                  How do you split it?
                </p>
                <Separator className="mb-5" />
                <div className="space-y-3">
                  {[
                    {
                      label: "Send 50% home, save 20%, spend rest",
                      tag: "Conservative",
                    },
                    {
                      label: "Save 30%, invest 20%, balance expenses",
                      tag: "Balanced",
                    },
                    {
                      label: "Enjoy now, save later — YOLO month",
                      tag: "Risky",
                    },
                  ].map((choice, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-border hover:bg-accent/30 transition-all duration-150 cursor-pointer group"
                    >
                      <span className="text-sm font-medium group-hover:text-foreground transition-colors">
                        {choice.label}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0 ml-2"
                      >
                        {choice.tag}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// --- Tool Preview (Mini SIP Calculator) ---

function ToolPreview() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right" className="order-2 lg:order-1">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-amber" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">SIP Calculator</h4>
                  <p className="text-xs text-muted-foreground">
                    Quick preview
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Monthly Investment
                    </span>
                    <span className="font-semibold font-tabular">
                      ₹10,000
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Expected Return
                    </span>
                    <span className="font-semibold font-tabular">12%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full"
                      style={{ width: "48%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Time Period</span>
                    <span className="font-semibold font-tabular">
                      10 years
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full"
                      style={{ width: "33%" }}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Invested
                    </p>
                    <p className="text-sm font-bold font-tabular">₹12.00L</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Returns
                    </p>
                    <p className="text-sm font-bold font-tabular text-emerald">
                      ₹11.23L
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total</p>
                    <p className="text-sm font-bold font-tabular">₹23.23L</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-accent/50 border border-border/30">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">
                      💡 Insight:
                    </span>{" "}
                    Starting 2 years earlier with the same SIP would give you
                    ₹8.4L more. Time is your biggest asset.
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          <AnimatedSection direction="left" className="order-1 lg:order-2">
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-xs font-medium"
            >
              <Calculator className="w-3 h-3 mr-1.5" />
              Money Toolkit
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Calculators that{" "}
              <br className="hidden sm:block" />
              actually teach
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every tool comes with contextual explanations, behavioral
              insights, and practical recommendations — not just cold numbers.
            </p>
            <div className="space-y-3">
              {[
                "SIP & Mutual Fund Calculator",
                "EMI & Loan Planner",
                "Tax Estimator (Old vs New Regime)",
                "Insurance & Emergency Fund Planner",
              ].map((tool) => (
                <div key={tool} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span className="text-sm">{tool}</span>
                </div>
              ))}
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline underline-offset-4 mt-6"
            >
              Open toolkit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// --- Trust Section ---

function TrustSection() {
  return (
    <section className="section-spacing-sm border-y border-border/30 bg-surface-raised/30">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            <Wallet className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight">
            Built with the Zerodha design philosophy
          </h3>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            We believe financial tools should be simple, transparent, and
            focused on user empowerment — not engagement metrics. No dark
            patterns. No upsells. Just clarity.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// --- CTA Section ---

function CTASection() {
  return (
    <section className="section-spacing">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Start with your real{" "}
            <br className="hidden sm:block" />
            financial situation
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Tell us where you are — student, first job, freelancer, or parent.
            We&apos;ll build a pathway just for you.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity duration-150 shadow-lg shadow-foreground/10"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
