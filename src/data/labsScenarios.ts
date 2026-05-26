import { LabScenario } from "@/types/labs";

export const LAB_SCENARIOS: LabScenario[] = [
  {
    id: "first-salary",
    title: "First Salary Allocation Lab",
    subtitle: "Structuring your first paycheck",
    description: "You just received your first paycheck of ₹35,000. Your family expects support, your peers suggest weekend splits, and you desire upgrades. Reconcile these competing drivers.",
    category: "foundation",
    difficulty: "beginner",
    estimatedTime: "8 min",
    icon: "💰",
    color: "var(--violet)",
    initialTelemetry: {
      cashReserves: 35000,
      debtPressure: 0,
      stressLevel: 30,
      flexibilityMargin: 80
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Paycheck Arrival",
        narrative: "Your phone chimed: '₹35,000 credited'. A rush of financial independence follows. However, your parents drop a reminder about home expenses, a close group expects a weekend getaway split, and your laptop is slow. How do you divide the flow?",
        choices: [
          {
            id: "family-first",
            label: "Send 50% Home",
            description: "Allocate ₹17,500 to parents, save ₹10,000, live on ₹7,500.",
            nextNodeId: "family-split",
            impact: "positive",
            telemetryChange: { cash: -17500, stress: -10, flexibility: -40 }
          },
          {
            id: "balanced-50",
            label: "Automate 50/30/20 Rule",
            description: "Send ₹10,000 home, save ₹15,000, keep ₹10,000 for lifestyle.",
            nextNodeId: "balanced-split",
            impact: "positive",
            telemetryChange: { cash: -10000, flexibility: -20, stress: 0 }
          },
          {
            id: "yolo-upgrades",
            label: "Spend & Upgrade First",
            description: "Buy a ₹20,000 laptop, send ₹5,000 home, save ₹10,000.",
            nextNodeId: "yolo-split",
            impact: "mixed",
            telemetryChange: { cash: -25000, stress: 15, flexibility: -50 }
          }
        ]
      },
      {
        id: "family-split",
        type: "consequence",
        title: "Family Gratitude vs Personal Margin",
        narrative: "Your parents are proud and relieved. However, your remaining ₹7,500 personal cash leaves you zero margin for socializing. Your team is heading for a dinner that costs ₹2,500.",
        consequence: {
          title: "Tight Discretionary Margin",
          financialImpact: "₹7,500 cash remaining for personal use.",
          explanation: "High cultural support builds family capital but can leave you vulnerable to minor peer pressure or credit dependency early on.",
          tradeoff: "High filial support vs personal growth buffer.",
          lesson: "Filial contributions should be balanced. A regular 20-30% rate protects both parties."
        },
        choices: [
          {
            id: "skip-dinner",
            label: "Decline & Stay Home",
            description: "Say 'I need to skip this one'. Prioritize financial boundaries.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { stress: 10, flexibility: 10 }
          },
          {
            id: "card-dinner",
            label: "Charge to credit card",
            description: "Go to the dinner, deal with the card statement next month.",
            nextNodeId: "finish",
            impact: "negative",
            telemetryChange: { cash: -2500, debt: 30, stress: 15 }
          }
        ]
      },
      {
        id: "balanced-split",
        type: "consequence",
        title: "Steady Compound Trajectory",
        narrative: "A stable framework. You sent ₹10,000 home, built a ₹15,000 emergency buffer, and have ₹10,000 left. A teammate suggests starting a ₹2,500 mutual fund SIP.",
        consequence: {
          title: "Ideal Foundation Setup",
          financialImpact: "₹15,000 buffer + ₹2,500 potential SIP.",
          explanation: "Establishing automated mutual fund SIPs on paycheck day restricts impulsive lifestyle inflation.",
          tradeoff: "Delaying gadget splurges to leverage long-term compounding.",
          lesson: "Starting a SIP from paycheck one is the single highest leverage habit a young earner can build."
        },
        choices: [
          {
            id: "start-sip",
            label: "Automate ₹2,500 SIP",
            description: "Commit to monthly investing directly from your salary.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -2500, flexibility: -5, stress: -5 }
          },
          {
            id: "keep-cash",
            label: "Keep cash liquid",
            description: "Keep the extra cash in your savings account for flexibility.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { flexibility: 10 }
          }
        ]
      },
      {
        id: "yolo-split",
        type: "consequence",
        title: "The Upgraded Lifestyle Trap",
        narrative: "Your laptop is fast, but you only have ₹10,000 left in cash. Suddenly, your landlord demands a ₹12,000 maintenance advance that wasn't planned.",
        consequence: {
          title: "Immediate Liquidity Deficit",
          financialImpact: "₹2,000 cash shortage.",
          explanation: "Upgrading assets early depletes liquid resilience. Unplanned costs quickly expose cash deficits.",
          tradeoff: "Productivity/desires vs liquidity margin.",
          lesson: "Avoid financing lifestyle assets before securing a basic 3-month expense runway."
        },
        choices: [
          {
            id: "ask-parents",
            label: "Ask parents for a loan",
            description: "Request ₹5,000 back from the money you sent.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { cash: 5000, stress: 20 }
          },
          {
            id: "credit-maintenance",
            label: "Put maintenance on credit card",
            description: "Charge the ₹12,000 to your credit card.",
            nextNodeId: "finish",
            impact: "negative",
            telemetryChange: { debt: 45, stress: 25, cash: -12000 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Lab Assessment Complete",
        narrative: "You have completed the First Salary Allocation Lab. Your choices have mapped your compound trajectory and buffer levels. Analyze your telemetry grid on the right to examine final scores.",
        isEnd: true
      }
    ]
  },
  {
    id: "basic-emergency",
    title: "Basic Emergency Runway Lab",
    subtitle: "Constructing your initial buffer",
    description: "You have zero savings and want to buy a new smartphone. A sudden medical test or vehicle issue is highly likely to strike. Can you build a buffer first?",
    category: "foundation",
    difficulty: "beginner",
    estimatedTime: "6 min",
    icon: "🛡️",
    color: "var(--violet)",
    initialTelemetry: {
      cashReserves: 5000,
      debtPressure: 10,
      stressLevel: 40,
      flexibilityMargin: 50
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Upgrade Temptation",
        narrative: "You want a phone costing ₹25,000. You have ₹5,000 in your account. A store offers 'Zero Down Payment, ₹2,500/mo EMI'. Your bike has been making strange noises recently. Do you proceed with the phone?",
        choices: [
          {
            id: "buy-emi",
            label: "Buy on EMI",
            description: "Take the phone. Commit to ₹2,500/month EMI for 12 months.",
            nextNodeId: "phone-breakdown",
            impact: "negative",
            telemetryChange: { debt: 30, stress: 10, flexibility: -20 }
          },
          {
            id: "delay-phone",
            label: "Delay purchase, save buffer",
            description: "Keep the current phone. Save ₹5,000/month in a separate account.",
            nextNodeId: "bike-breakdown",
            impact: "positive",
            telemetryChange: { cash: 5000, flexibility: 10, stress: -10 }
          }
        ]
      },
      {
        id: "phone-breakdown",
        type: "consequence",
        title: "Unplanned Bike Breakdown",
        narrative: "Two weeks later, your bike engine halts. Repair bill is ₹8,000. Your savings are empty, and you are locked into the monthly phone EMI. What's your backup plan?",
        consequence: {
          title: "Vulnerable Cash Flow",
          financialImpact: "₹8,000 repair cost with zero liquid surplus.",
          explanation: "Taking discretionary liabilities before building liquidity means minor emergencies trigger borrowing loops.",
          tradeoff: "Instant gratification vs baseline resilience.",
          lesson: "A minimum ₹10,000 emergency seed must precede any non-essential EMI commitment."
        },
        choices: [
          {
            id: "borrow-friend",
            label: "Borrow from colleague",
            description: "Request an interest-free ₹8,000 loan, promising to repay next month.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { debt: 15, stress: 20 }
          },
          {
            id: "defer-repair",
            label: "Defer repair & use public transit",
            description: "Commute via local bus (costs ₹2,000/mo) until you save the repair cash.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -2000, stress: 15, flexibility: -5 }
          }
        ]
      },
      {
        id: "bike-breakdown",
        type: "consequence",
        title: "Resilient Response",
        narrative: "Your bike breaks down. The repair cost is ₹8,000. Because you delayed the phone purchase, you have ₹10,000 saved in your buffer account. You pay the bill immediately in cash.",
        consequence: {
          title: "Shock Absorbed Safely",
          financialImpact: "₹8,000 paid in full. No debt incurred.",
          explanation: "Your buffer absorbed the bike shock quietly. You feel stressed about the cost, but carry zero compound liabilities.",
          tradeoff: "Buying the gadget vs carrying peace of mind.",
          lesson: "An emergency buffer converts a potential crisis into a simple transaction."
        },
        choices: [
          {
            id: "rebuild-buffer",
            label: "Rebuild buffer immediately",
            description: "Save ₹6,000 next month to replenish the buffer.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: 6000, stress: -10, flexibility: 10 }
          },
          {
            id: "buy-phone-now",
            label: "Buy phone on EMI now",
            description: "Since the crisis is resolved, commit to the phone EMI.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { debt: 30, stress: 15 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "You completed the Emergency Runway Lab. Check your cash reserves and flexibility ratios.",
        isEnd: true
      }
    ]
  },
  {
    id: "budget-flex",
    title: "Budget Flexing Lab",
    subtitle: "Managing monthly variable squeezes",
    description: "Your annual insurance premium is due, and a close relative requests a temporary loan. Manage these competing outlays in a tight month.",
    category: "foundation",
    difficulty: "beginner",
    estimatedTime: "6 min",
    icon: "📋",
    color: "var(--violet)",
    initialTelemetry: {
      cashReserves: 25000,
      debtPressure: 15,
      stressLevel: 30,
      flexibilityMargin: 60
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Double Outlay",
        narrative: "Your health insurance annual premium (₹12,000) is due this week. Simultaneously, your cousin requests ₹10,000 to cover emergency dental costs. You have ₹25,000 cash. What is your choice?",
        choices: [
          {
            id: "pay-both",
            label: "Pay Both Outlays",
            description: "Pay the premium and lend the ₹10,000. Cash will drop to ₹3,000.",
            nextNodeId: "cash-squeeze",
            impact: "mixed",
            telemetryChange: { cash: -22000, stress: 25, flexibility: -40 }
          },
          {
            id: "insurance-only",
            label: "Prioritize Insurance, Defer Cousin",
            description: "Pay your ₹12,000 premium. Offer your cousin a partial ₹3,000 gift instead.",
            nextNodeId: "stable-split",
            impact: "positive",
            telemetryChange: { cash: -15000, flexibility: 10, stress: -5 }
          }
        ]
      },
      {
        id: "cash-squeeze",
        type: "consequence",
        title: "The Mid-Month Grocery Shock",
        narrative: "Your cash is down to ₹3,000. Suddenly, your electricity bill is higher than planned, and you need groceries. You have 12 days left until the next salary credit.",
        consequence: {
          title: "Extreme Cash Deficit",
          financialImpact: "₹3,000 cash remaining. High risk of borrowing.",
          explanation: "Over-extending cash to support others before protecting fixed obligations triggers cash flow blocks.",
          tradeoff: "Social capital vs basic liquid security.",
          lesson: "Never deplete your primary liquidity below your monthly survival margin."
        },
        choices: [
          {
            id: "use-cc-groceries",
            label: "Use credit card for groceries",
            description: "Put ₹5,000 of expenses on your card.",
            nextNodeId: "finish",
            impact: "negative",
            telemetryChange: { debt: 25, stress: 15 }
          },
          {
            id: "restrict-spend",
            label: "Restrict discretionary spending",
            description: "Live strictly on essentials, cancel weekend plans.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { stress: 10, flexibility: 5 }
          }
        ]
      },
      {
        id: "stable-split",
        type: "consequence",
        title: "Preserved Margin",
        narrative: "Your insurance premium is paid. Your cousin appreciates the partial gift. You retain ₹10,000 cash buffer. You face no mid-month cash flows shocks.",
        consequence: {
          title: "Balanced Boundary Management",
          financialImpact: "₹10,000 liquid buffer preserved.",
          explanation: "Supporting family within defined cash boundaries preserves personal stability and avoids debt loops.",
          tradeoff: "Filial support vs monthly survival buffer.",
          lesson: "Gifts are safer than loans during tight months. Define a fixed limit for social capital."
        },
        choices: [
          {
            id: "add-savings",
            label: "Put surplus into savings",
            description: "Move the ₹10,000 into a liquid mutual fund.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -5000, flexibility: 15 }
          },
          {
            id: "keep-liquid",
            label: "Keep liquid in bank",
            description: "Maintain cash in savings account.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { flexibility: 5 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Budget Flexing Lab complete. Your choices reflect boundary management and liquidity preservation.",
        isEnd: true
      }
    ]
  },
  {
    id: "job-loss",
    title: "Job Loss Crisis Lab",
    subtitle: "Navigating sudden income termination",
    description: "Your employer announces immediate layoffs. You receive 1 month of severance pay. You have some EMIs and family responsibilities. Survive the next 3 months.",
    category: "pressure",
    difficulty: "intermediate",
    estimatedTime: "10 min",
    icon: "🏥",
    color: "var(--rose)",
    initialTelemetry: {
      cashReserves: 80000,
      debtPressure: 35,
      stressLevel: 50,
      flexibilityMargin: 40
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Layoff Notice",
        narrative: "Your manager calls a morning meeting: 'We are restructuring. Today is your last day'. You receive ₹50,000 severance. Your monthly fixed expenses (rent, food, EMIs) total ₹35,000. What is your immediate response?",
        choices: [
          {
            id: "cut-all",
            label: "Cut to Survival Mode",
            description: "Cancel all subscriptions, defer non-essential goals, drop rent (move in with parents). Reduce expenses to ₹15,000.",
            nextNodeId: "survival-mode",
            impact: "positive",
            telemetryChange: { cash: 50000, stress: 20, flexibility: 30 }
          },
          {
            id: "maintain-search",
            label: "Keep standard routine & search",
            description: "Keep renting, spend normally (₹35,000), search aggressively for jobs.",
            nextNodeId: "aggressive-search",
            impact: "mixed",
            telemetryChange: { cash: 15000, stress: 30, flexibility: -10 }
          },
          {
            id: "credit-buffer",
            label: "Pay EMIs with credit card",
            description: "Preserve all cash, put your EMIs and groceries on credit card debt.",
            nextNodeId: "debt-trap",
            impact: "negative",
            telemetryChange: { cash: 50000, debt: 40, stress: 35, flexibility: -20 }
          }
        ]
      },
      {
        id: "survival-mode",
        type: "consequence",
        title: "Austerity vs Mental Focus",
        narrative: "You saved significant cash. Your runway is now 8 months. However, living with parents creates boundary stress and hampers your study/interview focus.",
        consequence: {
          title: "Defensive Security Established",
          financialImpact: "Runway extended to 8 months. Expenses reduced to ₹15,000.",
          explanation: "Aggressive cost cuts buy vital time, but going too extreme can create mental exhaustion during intense hiring cycles.",
          tradeoff: "Mental autonomy vs runway stability.",
          lesson: "Cut waste immediately, but preserve a quiet, functional workspace for job hunting."
        },
        choices: [
          {
            id: "study-space",
            label: "Rent a co-working desk (₹4,000)",
            description: "Invest a small amount in a high-focus workspace.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -4000, stress: -15, flexibility: 5 }
          },
          {
            id: "stay-home",
            label: "Stay home & push through",
            description: "Keep costs at absolute zero, ignore the household friction.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { stress: 15 }
          }
        ]
      },
      {
        id: "aggressive-search",
        type: "consequence",
        title: "The Vanishing Runway",
        narrative: "Month 2. You haven't landed an offer yet. Your cash is down to ₹45,000. Rent is due tomorrow. The stress is affecting your interview composure.",
        consequence: {
          title: "Runway Depletion Alert",
          financialImpact: "₹45,000 cash remaining. Stress is at 80/100.",
          explanation: "Maintaining standard fixed expenses during income pauses accelerates cash burn, adding immense pressure to job interviews.",
          tradeoff: "Autonomy comfort vs cash runway.",
          lesson: "Never maintain a high burn rate when income stops. Act early to suspend subscriptions and negotiate rents."
        },
        choices: [
          {
            id: "negotiate-rent",
            label: "Request landlord rent delay",
            description: "Ask to defer 50% rent for 2 months.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: 7500, stress: -5, flexibility: 5 }
          },
          {
            id: "personal-loan",
            label: "Apply for a personal loan",
            description: "Borrow ₹50,000 at 15% interest to secure rent.",
            nextNodeId: "finish",
            impact: "negative",
            telemetryChange: { cash: 50000, debt: 35, stress: 20 }
          }
        ]
      },
      {
        id: "debt-trap",
        type: "consequence",
        title: "The compounding debt pressure",
        narrative: "Month 3. Your credit card balance is ₹60,000. Interest charges are looming. The bank is calling daily. Your remaining cash is untouched, but debt pressure is overwhelming.",
        consequence: {
          title: "Debt Escalation Alert",
          financialImpact: "₹60,000 credit debt at 40% annual interest.",
          explanation: "Using short-term high-interest credit cards to sustain fixed costs during unemployment creates a compounding debt trap.",
          tradeoff: "Artificial cash preservation vs real liability growth.",
          lesson: "Credit cards are not income buffers. Clear card balances first, even if it depletes reserves."
        },
        choices: [
          {
            id: "pay-card-cash",
            label: "Clear card with cash reserves",
            description: "Deplete your saved cash to clear the credit card balance.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -60000, debt: -40, stress: -20, flexibility: 10 }
          },
          {
            id: "min-payment",
            label: "Pay only minimum balance",
            description: "Pay the minimum ₹3,000, let the rest compound.",
            nextNodeId: "finish",
            impact: "negative",
            telemetryChange: { cash: -3000, debt: 15, stress: 15 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "You have completed the Job Loss Lab. Check your cash reserves and debt telemetry to see how you survived the income termination.",
        isEnd: true
      }
    ]
  },
  {
    id: "debt-recovery",
    title: "Debt Recovery Lab",
    subtitle: "Clearing multiple compound liabilities",
    description: "You have three active debts: Credit Card (₹40K at 40%), Personal Loan (₹1.5L at 15%), and Student Loan (₹3L at 9%). Select your repayment methodology.",
    category: "pressure",
    difficulty: "intermediate",
    estimatedTime: "10 min",
    icon: "🔓",
    color: "var(--rose)",
    initialTelemetry: {
      cashReserves: 20000,
      debtPressure: 80,
      stressLevel: 65,
      flexibilityMargin: 30
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "Selecting Payoff Logic",
        narrative: "You have ₹10,000 monthly surplus to allocate. You must pay minimums on all. How do you direct the remaining ₹5,000 surplus?",
        choices: [
          {
            id: "avalanche",
            label: "Avalanche Method",
            description: "Pay surplus to Credit Card first (highest interest). Saves most money mathematically.",
            nextNodeId: "avalanche-progress",
            impact: "positive",
            telemetryChange: { debt: -10, stress: -5, cash: -5000 }
          },
          {
            id: "snowball",
            label: "Snowball Method",
            description: "Pay surplus to Credit Card (also smallest balance). Clears first account quickly.",
            nextNodeId: "snowball-progress",
            impact: "positive",
            telemetryChange: { debt: -10, stress: -10, cash: -5000 }
          }
        ]
      },
      {
        id: "avalanche-progress",
        type: "consequence",
        title: "Mathematical Optimization",
        narrative: "Month 6. Credit card balance is cleared. You saved ₹4,200 in interest drag. You now direct surplus to the Personal Loan.",
        consequence: {
          title: "Optimal Interest Reduction",
          financialImpact: "Interest saved: ₹4,200. CC balance is ₹0.",
          explanation: "Avalanche is mathematically optimal, but since the CC was also the smallest balance, you got a psychological win too.",
          tradeoff: "High-interest targets vs psychological quick wins.",
          lesson: "Attack high interest liabilities to plug compound leakages first."
        },
        choices: [
          {
            id: "keep-avalanche",
            label: "Continue Avalanche on Personal Loan",
            description: "Keep directing ₹7,500 surplus to the personal loan.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { debt: -30, stress: -15 }
          }
        ]
      },
      {
        id: "snowball-progress",
        type: "consequence",
        title: "Psychological Momentum",
        narrative: "Month 6. Credit card is cleared. The reduction to 2 active accounts lifts a huge cognitive weight. You target the personal loan next.",
        consequence: {
          title: "Account Count Reduced",
          financialImpact: "Active accounts: 2. Debt pressure decreasing.",
          explanation: "Eliminating individual accounts early frees up mental load and consolidates minimum payments.",
          tradeoff: "Math interest savings vs mental momentum.",
          lesson: "If stress is high, clear small balances first to build momentum."
        },
        choices: [
          {
            id: "keep-snowball",
            label: "Continue Snowball on Personal Loan",
            description: "Direct all surplus to the personal loan.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { debt: -25, stress: -20 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Debt Recovery Lab complete. Your strategy shows structured liability compression.",
        isEnd: true
      }
    ]
  },
  {
    id: "income-instability",
    title: "Freelance Instability Lab",
    subtitle: "Managing variable income dry spells",
    description: "You freelance and face a dry month. Your major client delays a payment of ₹80,000 by 45 days. Navigate this working capital shock.",
    category: "pressure",
    difficulty: "intermediate",
    estimatedTime: "8 min",
    icon: "💻",
    color: "var(--rose)",
    initialTelemetry: {
      cashReserves: 30000,
      debtPressure: 10,
      stressLevel: 45,
      flexibilityMargin: 50
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Delayed Invoice",
        narrative: "Your client emails: 'Audit checks delayed. Invoice payment pushed by 45 days'. You expected ₹80,000. Rent of ₹15,000 is due. You have ₹30,000 cash. What is your choice?",
        choices: [
          {
            id: "use-buffer",
            label: "Draw from personal buffer",
            description: "Pay rent using your personal cash reserve. Reduce discretionary spend to zero.",
            nextNodeId: "personal-tight",
            impact: "positive",
            telemetryChange: { cash: -15000, stress: 15, flexibility: -20 }
          },
          {
            id: "negotiate-split",
            label: "Negotiate payment advance",
            description: "Ask client for a 30% partial payment (₹24,000) for immediate expenses.",
            nextNodeId: "invoice-advance",
            impact: "positive",
            telemetryChange: { cash: 24000, stress: -10, flexibility: 10 }
          }
        ]
      },
      {
        id: "personal-tight",
        type: "consequence",
        title: "The Dry Buffer",
        narrative: "Rent is paid, but you only have ₹15,000 remaining for the next 40 days. Discretionary limits are painful. You receive a pitch request that requires a premium software subscription (₹5,000).",
        consequence: {
          title: "Tight working capital",
          financialImpact: "₹10,000 cash if you subscribe.",
          explanation: "Depleted cash reserves limit your ability to invest in new project acquisition.",
          tradeoff: "Immediate frugality vs business growth investment.",
          lesson: "Keep a dedicated 6-month business buffer separate from personal cash."
        },
        choices: [
          {
            id: "buy-tool",
            label: "Buy tool & pitch",
            description: "Take the risk, invest ₹5,000 from dry margins.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { cash: -5000, stress: 15 }
          },
          {
            id: "skip-pitch",
            label: "Skip pitch",
            description: "Avoid spending the cash, wait out the delay.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { flexibility: 5 }
          }
        ]
      },
      {
        id: "invoice-advance",
        type: "consequence",
        title: "Advance Received",
        narrative: "The client pays ₹24,000 immediately. Rent is paid, and you retain ₹39,000 total cash. You have breathing room to pitch for new retainers.",
        consequence: {
          title: "Active Cash Flow Management",
          financialImpact: "₹39,000 cash reserves maintained.",
          explanation: "Negotiating partial advances during administrative delays protects working capital and avoids personal cash depletion.",
          tradeoff: "Assertive communication vs passive waiting.",
          lesson: "Always build partial advance clauses into freelance contracts."
        },
        choices: [
          {
            id: "invest-portfolio",
            label: "Spend ₹10,000 on portfolio site",
            description: "Upgrade your website to attract premium clients.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -10000, flexibility: 15 }
          },
          {
            id: "save-only",
            label: "Save cash",
            description: "Keep all cash in bank for buffer.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { flexibility: 10 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Freelance Instability Lab complete. Your choices managed cash flow volatility.",
        isEnd: true
      }
    ]
  },
  {
    id: "wealth-compounding",
    title: "SIP Compound Growth Lab",
    subtitle: "Navigating market volatility",
    description: "You have a ₹10,000 monthly SIP. The market enters a sharp 20% correction. Panic messages fill your feeds. Choose your response.",
    category: "growth",
    difficulty: "intermediate",
    estimatedTime: "8 min",
    icon: "📈",
    color: "var(--emerald)",
    initialTelemetry: {
      cashReserves: 50000,
      debtPressure: 0,
      stressLevel: 25,
      flexibilityMargin: 70
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Market Correction",
        narrative: "Your investment value shows a loss of ₹40,000. Headlines shout 'Economic slowdown! Sell equities!'. Teammates are pausing their mutual fund SIPs. What is your choice?",
        choices: [
          {
            id: "pause-sip",
            label: "Pause SIP & hold cash",
            description: "Stop the monthly ₹10,000 outflow until the market recovers.",
            nextNodeId: "paused-state",
            impact: "negative",
            telemetryChange: { cash: 10000, stress: -5, flexibility: 10 }
          },
          {
            id: "continue-sip",
            label: "Continue regular SIP",
            description: "Maintain the ₹10,000 monthly auto-transfer. Ignore the headlines.",
            nextNodeId: "continued-state",
            impact: "positive",
            telemetryChange: { cash: -10000, stress: 10 }
          },
          {
            id: "top-up-sip",
            label: "Top-up SIP extra ₹20,000",
            description: "Buy more mutual fund units at discount prices using your cash reserves.",
            nextNodeId: "topped-state",
            impact: "positive",
            telemetryChange: { cash: -20000, flexibility: -15, stress: 15 }
          }
        ]
      },
      {
        id: "paused-state",
        type: "consequence",
        title: "Missed Compounding Window",
        narrative: "6 months later. The market rebounds sharply by 25%. Because you paused, you bought no units at the cheap prices. You saved cash but missed the recovery wave.",
        consequence: {
          title: "Loss of Rupee Cost Averaging",
          financialImpact: "Opportunity loss of potential 25% correction gain.",
          explanation: "Pausing SIPs during corrections locks in losses and prevents buying cheaper units that compound faster during recoveries.",
          tradeoff: "Short-term emotional comfort vs long-term compound wealth.",
          lesson: "Market corrections are buying opportunities. Never pause SIPs during down cycles."
        },
        choices: [
          {
            id: "resume-now",
            label: "Resume SIP now at peak",
            description: "Start the ₹10,000 SIP again.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { cash: -10000 }
          }
        ]
      },
      {
        id: "continued-state",
        type: "consequence",
        title: "Rupee Cost Averaging Win",
        narrative: "6 months later. The market rebounds by 25%. Your portfolio recovers quickly and shows a net gain of 8%, outperforming those who sat in cash.",
        consequence: {
          title: "Compound Momentum Maintained",
          financialImpact: "Portfolio value recovered, yielding 8% net gain.",
          explanation: "Continuing SIPs during dips averages down your purchase costs, accelerating gains during recovery.",
          tradeoff: "Ignoring short-term paper losses to secure long-term units.",
          lesson: "Consistency beats timing. Let the auto-debits run."
        },
        choices: [
          {
            id: "keep-it-up",
            label: "Maintain regular automation",
            description: "Keep the SIP running unchanged.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { stress: -5 }
          }
        ]
      },
      {
        id: "topped-state",
        type: "consequence",
        title: "Aggressive Buy execution",
        narrative: "6 months later. The market rebound rewards you. Your topped-up mutual fund units generate an outsized 18% return. However, your cash reserves are tighter.",
        consequence: {
          title: "Tactical Return Boost",
          financialImpact: "18% return on top-up cash.",
          explanation: "Buying additional units during corrections boosts CAGR, but verify you retain basic emergency reserves first.",
          tradeoff: "Liquidity cushion vs wealth maximization.",
          lesson: "Top up only if your emergency cash is fully secure."
        },
        choices: [
          {
            id: "rebalance-reserves",
            label: "Rebuild liquid reserves",
            description: "Stop extra top-ups, save to rebuild cash buffer.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: 10000, flexibility: 10 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "SIP Compound Growth Lab complete. You faced market panic and observed the mechanics of averaging.",
        isEnd: true
      }
    ]
  },
  {
    id: "career-growth",
    title: "Career Growth Decisions Lab",
    subtitle: "Evaluating packages and relocations",
    description: "You receive a job offer paying ₹75,000 (a 50% raise). However, relocation to a high-cost tier-1 city is required. Calculate real disposable surplus changes.",
    category: "growth",
    difficulty: "intermediate",
    estimatedTime: "10 min",
    icon: "🤝",
    color: "var(--emerald)",
    initialTelemetry: {
      cashReserves: 40000,
      debtPressure: 10,
      stressLevel: 30,
      flexibilityMargin: 65
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Offer Evaluation",
        narrative: "Your current salary in a tier-2 city is ₹50,000 (expenses ₹25,000; surplus ₹25,000). The new offer is ₹75,000 in Mumbai. Estimated rent there is ₹25,000, lifestyle ₹15,000, relocation costs ₹30,000 upfront. What do you do?",
        choices: [
          {
            id: "accept-relocation",
            label: "Accept Offer & Relocate",
            description: "Move to Mumbai. Accept the ₹75,000 package.",
            nextNodeId: "mumbai-reality",
            impact: "mixed",
            telemetryChange: { cash: -30000, stress: 15, flexibility: -15 }
          },
          {
            id: "negotiate-remote",
            label: "Negotiate Remote or Counter",
            description: "Ask for remote work at ₹65,000, or a ₹10,000 relocation allowance.",
            nextNodeId: "counter-outcome",
            impact: "positive",
            telemetryChange: { stress: -5, flexibility: 10 }
          }
        ]
      },
      {
        id: "mumbai-reality",
        type: "consequence",
        title: "The Disposable Surplus Paradox",
        narrative: "You live in Mumbai. Your gross is ₹75,000. Rents and transit take ₹40,000. Your monthly surplus is ₹35,000. You spent your savings on the deposit. You feel isolated.",
        consequence: {
          title: "Surplus vs Lifestyle cost",
          financialImpact: "Net surplus is ₹35,000 (up ₹10k, but cash deposits are locked).",
          explanation: "Tier-1 city lifestyle inflation can swallow nominal salary increases. Calculate net discretionary margin before moving.",
          tradeoff: "Career networking vs cost-of-living drag.",
          lesson: "A 50% raise with 100% rent increase can reduce absolute liquidity."
        },
        choices: [
          {
            id: "flatmate",
            label: "Get flatmates to halve rent",
            description: "Move to a shared flat, reducing rent to ₹12,500.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: 12500, stress: -10, flexibility: 15 }
          },
          {
            id: "accept-cost",
            label: "Accept cost for career boost",
            description: "Maintain the individual flat, focus on networking.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { stress: 10 }
          }
        ]
      },
      {
        id: "counter-outcome",
        type: "consequence",
        title: "Counter Approved",
        narrative: "The employer offers remote work at ₹68,000. You stay in your tier-2 town. Your expenses remain ₹25,000. Your monthly surplus grows from ₹25,000 to ₹43,000.",
        consequence: {
          title: "Geographical Arbitrage Win",
          financialImpact: "Monthly surplus is ₹43,000 (up ₹18k). No relocation debt.",
          explanation: "Securing remote work in lower-cost cities maximizes absolute savings rate, creating immediate compound fuel.",
          tradeoff: "Office visibility vs savings acceleration.",
          lesson: "Always model disposable margin, not just CTC headers."
        },
        choices: [
          {
            id: "allocate-sip",
            label: "Direct extra surplus to SIP",
            description: "Put the extra ₹18,000 surplus directly into index funds.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -18000, flexibility: 20 }
          },
          {
            id: "lifestyle-bump",
            label: "Upgrade lifestyle slightly",
            description: "Spend ₹8,000 of the raise on comfort and hobbies.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { stress: -10 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Career Growth Decisions Lab complete. You modeled geographic arbitrage and CTC margins.",
        isEnd: true
      }
    ]
  },
  {
    id: "sabbatical-plan",
    title: "Sabbatical Runway Lab",
    subtitle: "Funding a career break safely",
    description: "You plan a 6-month career break to pivot skills. Your baseline monthly survival expenses are ₹30,000. Formulate a stable transition fund.",
    category: "strategic",
    difficulty: "advanced",
    estimatedTime: "10 min",
    icon: "🌴",
    color: "var(--amber)",
    initialTelemetry: {
      cashReserves: 100000,
      debtPressure: 0,
      stressLevel: 35,
      flexibilityMargin: 55
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "Calculating the Break Fund",
        narrative: "You have ₹1,000,000 saved. Six months of survival costs ₹180,000. You also want to keep your long-term retirement SIP active (₹15,000/mo). Do you pause investments or draw down reserves?",
        choices: [
          {
            id: "pause-investments",
            label: "Pause SIP during break",
            description: "Suspend the ₹15,000 SIP. Spend only the ₹30,000 survival rate.",
            nextNodeId: "sip-paused",
            impact: "positive",
            telemetryChange: { cash: 90000, stress: -10, flexibility: 15 }
          },
          {
            id: "continue-investments",
            label: "Maintain SIP & draw reserves",
            description: "Draw ₹45,000/month from reserves to keep your retirement SIP active.",
            nextNodeId: "reserves-depleted",
            impact: "mixed",
            telemetryChange: { cash: -270000, stress: 15, flexibility: -20 }
          }
        ]
      },
      {
        id: "sip-paused",
        type: "consequence",
        title: "Comfortable Transition Runway",
        narrative: "Your monthly burn is limited to ₹30,000. Your cash reserves remain healthy. You have no anxiety during the break, giving you clarity to study and pivot.",
        consequence: {
          title: "Cash Flow Conservation",
          financialImpact: "Burn rate: ₹30,000/mo. Saved ₹90K investment drawdown.",
          explanation: "Suspending long-term wealth SIPs temporarily during career breaks preserves vital cash buffer, avoiding forced asset liquidations.",
          tradeoff: "6 months of missed investments vs panic-free career transition.",
          lesson: "Always lower investment outlays to minimize burn rate when active income drops."
        },
        choices: [
          {
            id: "extend-break",
            label: "Extend break by 2 months",
            description: "Use cash margin to extend study period.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: -60000, stress: -5 }
          },
          {
            id: "resume-work",
            label: "Resume work early",
            description: "Land a job in Month 5 and start earning.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { cash: 50000, stress: -10 }
          }
        ]
      },
      {
        id: "reserves-depleted",
        type: "consequence",
        title: "The Sabbatical Anxiety Spike",
        narrative: "Month 4 of the break. Your cash reserves are down by ₹180,000. The market dips, and your investment value drops. You feel anxious about landing a job before cash hits zero.",
        consequence: {
          title: "Buffer Bleeding",
          financialImpact: "₹2.7L total draw down in 6 months.",
          explanation: "Funding long-term investments using cash reserves during periods of zero income is highly risky. It increases leverage vulnerability.",
          tradeoff: "Compounding consistency vs buffer safety.",
          lesson: "Never buy stocks using your survival buffer during periods of unemployment."
        },
        choices: [
          {
            id: "panic-job",
            label: "Take the first low-paying job",
            description: "Accept a ₹40,000 job offer immediately to stop the bleed.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { cash: 40000, stress: 10, debt: 10 }
          },
          {
            id: "cut-sip-now",
            label: "Pause SIP now in panic",
            description: "Finally stop the SIP in Month 4.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { stress: -5 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Sabbatical Runway Lab complete. You modeled cash preservation and career transitions.",
        isEnd: true
      }
    ]
  },
  {
    id: "startup-risk",
    title: "Startup Risk Lab",
    subtitle: "Separating personal buffers from business risk",
    description: "You launch a bootstrapped venture. You must manage business software/hiring outlays without draining your personal family rent funds.",
    category: "strategic",
    difficulty: "advanced",
    estimatedTime: "10 min",
    icon: "🏢",
    color: "var(--amber)",
    initialTelemetry: {
      cashReserves: 150000,
      debtPressure: 10,
      stressLevel: 45,
      flexibilityMargin: 45
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "Initial Funding Split",
        narrative: "You allocate ₹1,00,000 to business cash and keep ₹50,000 for personal rent and food. A developer tool requires a ₹30,000 annual subscription. Do you fund it from your personal savings?",
        choices: [
          {
            id: "use-personal",
            label: "Fund from personal savings",
            description: "Spend ₹30,000 of personal reserves. Business has ₹1L untouched.",
            nextNodeId: "personal-deficit",
            impact: "negative",
            telemetryChange: { cash: -30000, stress: 20, flexibility: -25 }
          },
          {
            id: "strict-business",
            label: "Use business cash only",
            description: "Spend ₹30,000 of the business ₹1L pool. Personal savings stay at ₹50,000.",
            nextNodeId: "business-deficit",
            impact: "positive",
            telemetryChange: { stress: 5, flexibility: 10 }
          }
        ]
      },
      {
        id: "personal-deficit",
        type: "consequence",
        title: "The Family Emergency Shock",
        narrative: "Your personal savings are down to ₹20,000. Suddenly, your mother needs a dental procedure costing ₹25,000. Your business has ₹1,00,000, but it is locked under company expenses.",
        consequence: {
          title: "Personal Liquidity Crisis",
          financialImpact: "₹5,000 personal shortage. High anxiety.",
          explanation: "Mixing personal safety cash with business validation risk exposes you to personal leverage crises during minor shocks.",
          tradeoff: "Business validation vs family safety buffers.",
          lesson: "Never compromise personal survival cash to bootstrap initial business ideas."
        },
        choices: [
          {
            id: "draw-company",
            label: "Draw company cash back",
            description: "Reverse ₹30,000 from company accounts back to personal.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { cash: 30000, stress: 10 }
          },
          {
            id: "cc-family",
            label: "Charge medical to credit card",
            description: "Charge ₹25,000 to credit card.",
            nextNodeId: "finish",
            impact: "negative",
            telemetryChange: { debt: 40, stress: 25 }
          }
        ]
      },
      {
        id: "business-deficit",
        type: "consequence",
        title: "Secured Personal Core",
        narrative: "Your personal ₹50,000 remains secure. The dental cost of ₹25,000 occurs. You pay it immediately from your personal buffer. The business has ₹70,000 remaining, forcing you to find creative, cheap growth hacks.",
        consequence: {
          title: "Personal Stability Maintained",
          financialImpact: "Mother's dental cost paid in cash. Personal cash is ₹25,000.",
          explanation: "Separating business accounts forces disciplined commercial validation without endangering family rent safety nets.",
          tradeoff: "Asset capital vs bootstrapping constraints.",
          lesson: "A bootstrapped startup must operate within its business pool. Protect the personal core."
        },
        choices: [
          {
            id: "cheap-growth",
            label: "Use free open-source tools",
            description: "Avoid premium software, build features manually.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { stress: 10, flexibility: 15 }
          },
          {
            id: "raise-capital",
            label: "Pitch for early pre-seed loan",
            description: "Borrow ₹50,000 from a friend for business cash.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { debt: 20 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Startup Risk Lab complete. You practiced separating personal emergency assets from corporate risk variables.",
        isEnd: true
      }
    ]
  },
  {
    id: "family-dependency",
    title: "Family Responsibility Lab",
    subtitle: "Supporting parents during shocks",
    description: "Your retired parents face a sudden medical bill of ₹2,00,000. You want to pay it, but it threatens your active home-loan EMI schedules.",
    category: "pressure",
    difficulty: "advanced",
    estimatedTime: "12 min",
    icon: "🏠",
    color: "var(--amber)",
    initialTelemetry: {
      cashReserves: 100000,
      debtPressure: 40,
      stressLevel: 55,
      flexibilityMargin: 35
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Hospital Bill",
        narrative: "Your father's hospital bill is ₹2,00,000. They have no insurance. Your home loan EMI is ₹30,000/mo. You have ₹1,00,000 cash. What is your choice?",
        choices: [
          {
            id: "deplete-savings",
            label: "Pay ₹1L cash + take personal loan",
            description: "Pay your entire ₹1,00,000 cash and borrow ₹1,00,000 at 14% to cover the rest.",
            nextNodeId: "full-debt-load",
            impact: "negative",
            telemetryChange: { cash: -100000, debt: 45, stress: 25, flexibility: -30 }
          },
          {
            id: "negotiate-hospital",
            label: "Negotiate hospital bill splits",
            description: "Pay ₹50,000 upfront. Ask hospital to convert the remaining ₹1.5L into 6 interest-free EMIs.",
            nextNodeId: "hospital-emi",
            impact: "positive",
            telemetryChange: { cash: -50000, stress: 5, flexibility: -15 }
          }
        ]
      },
      {
        id: "full-debt-load",
        type: "consequence",
        title: "The Monthly Double Squeeze",
        narrative: "Month 2. You have ₹0 personal cash reserves. Your home loan EMI is ₹30,000, and the new personal loan EMI is ₹7,000. A sudden repair cost of ₹10,000 appears. You are completely stretched.",
        consequence: {
          title: "Zero Buffer Exhaustion",
          financialImpact: "₹37,000 monthly EMI commitments with ₹0 cushion.",
          explanation: "Depleting 100% of cash reserves to pay family medical bills exposes you to critical monthly cash flow halts.",
          tradeoff: "filial rescue vs liquidity survival.",
          lesson: "Never drop your personal cash reserves to absolute zero. Negotiate payment plans first."
        },
        choices: [
          {
            id: "gold-loan",
            label: "Take a gold loan",
            description: "Pledge family gold to raise ₹50,000 buffer cash.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { cash: 50000, debt: 15 }
          },
          {
            id: "cc-repair",
            label: "Put repair on credit card",
            description: "Borrow card cash for the repair.",
            nextNodeId: "finish",
            impact: "negative",
            telemetryChange: { debt: 30, stress: 20 }
          }
        ]
      },
      {
        id: "hospital-emi",
        type: "consequence",
        title: "Interest-Free Repayment",
        narrative: "Hospital agrees. You pay ₹50,000 now. You keep ₹50,000 in your savings account. The remaining ₹1.5L is paid at ₹25,000/mo for 6 months. It is tight, but you avoided a 14% personal loan.",
        consequence: {
          title: "Structured Liability Setup",
          financialImpact: "Monthly burden increased by ₹25,000, but no interest drag.",
          explanation: "Converting medical liabilities into short-term interest-free installments protects personal capital and avoids compounding interest debt.",
          tradeoff: "6 months of tight budgeting vs 3 years of interest EMI.",
          lesson: "Ask hospital billing about interest-free installment schemes before applying for bank loans."
        },
        choices: [
          {
            id: "suspend-invest",
            label: "Suspend investments during repayment",
            description: "Pause SIPs to cover the ₹25,000 hospital installment.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { stress: -10, flexibility: 10 }
          },
          {
            id: "continue-both",
            label: "Maintain investments, cut living",
            description: "Try to sustain SIPs and hospital EMIs simultaneously.",
            nextNodeId: "finish",
            impact: "mixed",
            telemetryChange: { stress: 20, flexibility: -10 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Family Responsibility Lab complete. You negotiated billing splits and managed compound debt load during a crisis.",
        isEnd: true
      }
    ]
  },
  {
    id: "lifestyle-inflation",
    title: "Lifestyle Inflation Lab",
    subtitle: "Upgrading your life intentionally",
    description: "You receive a major promotion and a ₹25,000 monthly raise. Relatives suggest upgrading your apartment, and car dealerships offer deals. Control lifestyle creep.",
    category: "strategic",
    difficulty: "beginner",
    estimatedTime: "8 min",
    icon: "📈",
    color: "var(--violet)",
    initialTelemetry: {
      cashReserves: 60000,
      debtPressure: 15,
      stressLevel: 20,
      flexibilityMargin: 60
    },
    nodes: [
      {
        id: "start",
        type: "situation",
        title: "The Promotion Raise",
        narrative: "Your bank salary SMS shows a ₹25,000 bump. Relatives suggest moving to a tier-1 flat (costs ₹15,000/mo more). A car dealer pitches a ₹10,000/mo EMI package. How do you allocate the raise?",
        choices: [
          {
            id: "upgrade-all",
            label: "Upgrade Flat & Car EMI",
            description: "Commit the entire ₹25,000 to rent upgrade and car EMI.",
            nextNodeId: "zero-surplus",
            impact: "negative",
            telemetryChange: { debt: 35, stress: 15, flexibility: -40 }
          },
          {
            id: "save-half",
            label: "Save 60% of Raise, Upgrade 40%",
            description: "Put ₹15,000/mo into SIP, spend ₹10,000 on a nicer apartment. Keep current transit.",
            nextNodeId: "incremental-upgrade",
            impact: "positive",
            telemetryChange: { cash: 15000, flexibility: 15, stress: -5 }
          }
        ]
      },
      {
        id: "zero-surplus",
        type: "consequence",
        title: "The Golden Handcuffs",
        narrative: "You live in a nicer flat and drive a new car. However, your monthly savings rate remains exactly the same as before your promotion. A minor office dispute makes you want to quit, but you can't afford to.",
        consequence: {
          title: "Zero Savings Growth",
          financialImpact: "₹25,000 raise spent entirely. Autonomy level: Low.",
          explanation: "Upgrading fixed costs proportionally with salary increases locks you into your current job, destroying financial flexibility.",
          tradeoff: "Social status vs career autonomy.",
          lesson: "Always save at least 50% of any salary increase automatically before upgrading lifestyle."
        },
        choices: [
          {
            id: "sell-car",
            label: "Sell the car & cancel EMI",
            description: "Admit the creep, sell the asset, restore cash surplus.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { debt: -35, cash: 15000, flexibility: 25 }
          },
          {
            id: "push-through",
            label: "Push through and seek next raise",
            description: "Stay in the upgraded cycle, try to earn more.",
            nextNodeId: "finish",
            impact: "neutral",
            telemetryChange: { stress: 15 }
          }
        ]
      },
      {
        id: "incremental-upgrade",
        type: "consequence",
        title: "Balanced Wealth Growth",
        narrative: "You enjoy a nicer apartment. Simultaneously, your automated ₹15,000 SIP is compounding quietly. Your net worth is expanding, and you retain full freedom to reject toxic job pressures.",
        consequence: {
          title: "Sustainable Expansion",
          financialImpact: "₹15,000 added to monthly SIP. Apartment upgraded.",
          explanation: "Slicing raises into 50%+ savings and 40%- lifestyle upgrades is the secret to building compounding wealth while enjoying life.",
          tradeoff: "Instant peak status vs gradual financial independence.",
          lesson: "Upgrading experiences or small comforts beats locking yourself into long-term EMIs."
        },
        choices: [
          {
            id: "maintain-balance",
            label: "Maintain this balanced ratio",
            description: "Review and lock this allocation for 12 months.",
            nextNodeId: "finish",
            impact: "positive",
            telemetryChange: { stress: -10, flexibility: 5 }
          }
        ]
      },
      {
        id: "finish",
        type: "summary",
        title: "Simulation Assessment Complete",
        narrative: "Lifestyle Inflation Lab complete. You managed status temptations and secured career flexibility margins.",
        isEnd: true
      }
    ]
  }
];
