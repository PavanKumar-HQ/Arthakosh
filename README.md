# Arthakosh — Financial Literacy for Real Life

Arthakosh is a premium, localized financial literacy platform designed for Indian students, working professionals, freelancers, and families. Inspired by the Zerodha philosophy of simplicity, transparency, and user empowerment, Arthakosh bypasses passive content in favor of repeated exposure to realistic simulations, decision-making scenarios, and emotional consequence modeling.

---

## 🌟 Core Philosophy

> **"People do not build financial intelligence through passive content consumption. They build it through repeated exposure to realistic decisions, consequences, tradeoffs, and reflection."**

Arthakosh focuses on training:
- **Practical Judgment:** Navigating real financial situations, not textbook drills.
- **Emotional Composure:** Simulating money anxiety, stress limits, and recruiter dialogue pressure.
- **Strategic Thinking:** Balancing long-term compounding benefits with present lifestyle needs.

---

## 🛠️ Complete System Tour & Features

### 1. Smart Onboarding Engine
- **Life Stage Selection:** Customizes the user pathway for students, professionals, entrepreneurs, retirees, or people recovering from debt.
- **Emotional Context Profiling:** Captures money stress sensitivity, decision confidence levels, and planning fatigue to adjust platform tone.
- **Financial Reality Mapping:** Dynamically adapts calculator templates based on rough income ranges, expense pressure, and dependents.

### 2. Financial Decision Labs (12 Interactive Scenarios)
A series of immersive roleplay environments with complex branching logic, psychological tracking, and financial outcomes:
- **Scenarios include:** First Salary Split, Sudden Layoffs, Medical Emergencies, Dowry/Marriage expenses, Credit Card Traps, and High-Yield Investment Scams.
- **Psychological Telemetry:** Tracks stress levels, recruiter/interviewer sentiment, and user leverage.
- **Interactive Replay Audit:** Provides turn-by-turn strategic analysis of past decisions upon completion.

### 3. Interactive Simulators Workspace (`/learn`)
A suite of active learning tools designed to visualize financial concepts:
- **Budget Allocator:** Drag sliders to adjust rent, food, savings, and investments, comparing allocations against recommended limits in real-time.
- **Credit Score (CIBIL) Simulator:** Adjust payment history, card utilization, and enquiries to see immediate CIBIL score changes.
- **Debt Spiral Simulator:** Simulates how paying only credit card minimums accrues compounding interest, leading to an infinite debt spiral.
- **Investment Portfolio Allocator:** Adjust weights across equity, debt, gold, and cash to view projected compound wealth, adjusted for **6% inflation**.
- **Emergency Spending Drill:** Simulates unexpected shocks (hospitalizations, job loss, vehicle breakdowns) to evaluate emergency runway resilience.

### 4. Advanced Money Toolkit (`/tools`)
Eight specialized calculators providing actionable recommendations instead of just basic spreadsheets:
- SIP & Mutual Fund Compounding
- Home/Personal Loan EMI Planners
- Old vs. New Income Tax Regime Estimator
- Cashflow & Emergency Reserves Checklist

### 5. Estate & Legacy Planner (`/estate`)
- Step-by-step guidance on creating a Will, registering nominees across AMCs and banks, digital asset legacy management, and drafting Power of Attorney.
- Interactive expansion cards detailing checklist action items.

### 6. Money Psychology Hub (`/psychology`)
- Practical exercises addressing lifestyle creep, the scarcity mindset, and emotional impulse buying.

---

## 🎨 UI & Design Enhancements

The platform utilizes a curated **Light-Only Theme** designed for readability, high visual aesthetic, and interactive clarity:
- **Clickable Options & Cards:** Upgraded scenario, recruiter, checklist, and workspace card containers with custom hover states:
  - `hover:scale-[1.01] hover:shadow-md hover:border-violet/40`
  - `active:scale-[0.99] transition-all duration-200 cursor-pointer`
- **Active State Badges:** When a card or option is selected, it immediately changes to a custom violet active ring (`ring-2 ring-violet border-violet bg-violet/[0.01]`) and displays a distinct solid `[Selected]` or `[Active]` badge to distinguish it from static headings.
- **Accessible Interactions:** Focus-ring styles and clickable triggers built using native elements to ensure accessibility and responsive interaction.

---

## 📂 Tech Stack & Architecture

- **Core:** Next.js (App Router), React, TypeScript.
- **Styling:** Tailwind CSS with vanilla CSS custom design tokens.
- **Animations:** Framer Motion.
- **Charts & Data Visualizations:** Recharts (responsive pie and area charts).
- **Icons:** Lucide React.

```text
src/
├── app/                  # App router pages (learn, estate, goals, salary, etc.)
├── components/           # Custom components (onboarding steps, calculators, layout)
│   ├── ui/               # Primitive UI library (cards, badges, buttons)
│   └── shared/           # Shared animations and inputs (SliderInput, ProgressRing)
├── lib/                  # Calculation logic, scenario datasets, and global state
└── types/                # TypeScript type definitions
```

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
```
