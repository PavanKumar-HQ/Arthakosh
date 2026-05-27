"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import {
  Search, BookOpen, Download, Play, X, Clock, FileText, CheckCircle2, AlertCircle, Share2, 
  ExternalLink, ChevronRight, Eye, Sparkles, BookMarked, ThumbsUp, ShieldAlert, Award
} from "lucide-react";

// --- Types ---
interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  tags: string[];
  icon: string;
  color: string;
  bg: string;
  content: {
    sections: { heading: string; body: string; list?: string[] }[];
    takeaways: string[];
  };
}

interface PdfGuide {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  pages: number;
  tags: string[];
  color: string;
  bg: string;
  icon: string;
  pagesContent: {
    title: string;
    sections: { heading: string; content: string; checklist?: string[] }[];
  }[];
}

interface VideoGuide {
  id: string;
  title: string;
  description: string;
  duration: string;
  youtubeId: string;
  tags: string[];
  icon: string;
  color: string;
  bg: string;
  learnPoints: string[];
}

// --- Data ---
const ARTICLES: Article[] = [
  {
    id: "cibil-psychology",
    title: "The Psychology of Credit Scores: Decoding CIBIL",
    summary: "Understand how banks look at your credit profile and why CIBIL is less about 'wealth' and more about 'repayment behavior'.",
    category: "Credit & Debt",
    readTime: "5 min read",
    tags: ["Credit Score", "CIBIL", "Borrowing"],
    icon: "💳",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    content: {
      sections: [
        {
          heading: "What a Credit Score Really Represents",
          body: "A CIBIL score is not a measurement of your net worth, income, or financial success. Instead, it measures one very specific psychological trait: repayment compliance. A high-earning professional with erratic bill payment cycles will have a far lower score than a modest-income earner who maintains meticulous payment schedules."
        },
        {
          heading: "The Crucial Weights in the Equation",
          body: "Your score is computed based on five key behavioral clusters:",
          list: [
            "Payment History (35%): Have you paid past bills on time? Even a single payment delayed by 30+ days will drag down this anchor.",
            "Credit Utilization Ratio (30%): How much of your active credit limit are you spending? Keeping this below 30% indicates safety. Exceeding 50% signals credit hunger.",
            "Credit Age (15%): The average age of your accounts. Closing old credit cards destroys history and shrinks this buffer.",
            "Credit Mix (10%): A balanced mix of secured (home/auto) and unsecured (personal/credit card) loans is viewed positively.",
            "Recent Hard Inquiries (10%): Multiple loan applications in a short span suggest financial distress."
          ]
        },
        {
          heading: "The Smart Action Plan to Boost Your Score",
          body: "To raise your CIBIL score efficiently, prioritize automation over manual tracking. Setup auto-debits for all credit card minimums (or total balances) and utility payments. Keep your older cards active by putting small, recurring subscriptions on them and setting them to auto-pay."
        }
      ],
      takeaways: [
        "CIBIL measures credit trust, not wealth.",
        "Maintain credit utilization below 30% of your total limit.",
        "Never close your oldest active credit card accounts."
      ]
    }
  },
  {
    id: "debt-duel",
    title: "Debt Avalanche vs. Snowball: The Psychological Duel",
    summary: "A breakdown of the two most popular debt payoff frameworks. Learn whether to optimize for mathematical speed or emotional momentum.",
    category: "Debt Management",
    readTime: "6 min read",
    tags: ["Debt Free", "Financial Strategy", "Behavioral Finance"],
    icon: "🏔️",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/20",
    content: {
      sections: [
        {
          heading: "The Debt Avalanche (The Mathematician's Path)",
          body: "The Avalanche method lists all debts sorted by interest rate from highest to lowest. You pay the minimum on all accounts and throw every extra rupee at the debt with the highest interest rate. Once that is cleared, the entire payment cascades down to the next highest rate.",
          list: [
            "Pros: Mathematically optimal; minimizes total interest paid and shortens overall payoff time.",
            "Cons: Requires high discipline. If the highest-interest loan is large, it may take months to get the psychological boost of clearing a single account."
          ]
        },
        {
          heading: "The Debt Snowball (The Behavioralist's Path)",
          body: "The Snowball method ignores interest rates entirely. You list debts sorted by total balance size, from smallest to largest. You pay the minimums on all, and put all extra cash toward clearing the smallest balance first. Once that's gone, you roll its payment into the next smallest.",
          list: [
            "Pros: Incredible psychological momentum. Quick wins release dopamine and help you stick to the plan.",
            "Cons: Mathematically more expensive. You pay more total interest over time if your larger debts have higher rates."
          ]
        },
        {
          heading: "Which One Should You Choose?",
          body: "Human beings are not spreadsheets. If you struggle with consistency or feel overwhelmed by debt, choose the Snowball method for quick wins. If you are highly disciplined and numbers-driven, use the Avalanche method to minimize interest cost."
        }
      ],
      takeaways: [
        "Avalanche saves money; Snowball builds behavioral momentum.",
        "Choose Snowball if you need quick, motivational wins to keep going.",
        "Always ensure minimum payments are made on every single debt to protect your credit score."
      ]
    }
  },
  {
    id: "mutual-funds-india",
    title: "Understanding the Indian Mutual Fund Landscape",
    summary: "Direct vs. Regular plans, Active vs. Passive, and equity categories explained simply for Indian retail investors.",
    category: "Investing",
    readTime: "7 min read",
    tags: ["Mutual Funds", "SIP", "Direct Plans", "Equity"],
    icon: "📈",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    content: {
      sections: [
        {
          heading: "Direct vs. Regular Plans: The Hidden Fee Leak",
          body: "Every mutual fund in India is offered in two versions: Direct and Regular. Regular plans include an ongoing commission (up to 1-1.5% annually) paid to the broker or distributor. Direct plans have no commissions. Over a 20-year investing horizon, this 1% difference can cost you up to 15-20% of your total potential retirement wealth. Always invest in Direct plans."
        },
        {
          heading: "Active vs. Passive Funds",
          body: "Active funds employ fund managers who try to beat the index (like Nifty 50) by picking individual stocks. Passive index funds simply replicate the index. Historically, over 70% of large-cap active fund managers in India fail to beat the index after accounting for their higher fees. For broad equity exposure, a low-cost Nifty 50 Index Fund is usually the safest foundation."
        },
        {
          heading: "Core Categories Every Beginner Should Know",
          body: "Indian mutual funds are divided into regulated brackets:",
          list: [
            "Large Cap: Invests in India's top 100 blue-chip companies. Lower risk, stable growth.",
            "Mid & Small Cap: Invests in younger, high-growth companies. Highly volatile, but potential for massive compounding over 10+ years.",
            "Flexi Cap: The fund manager can shift money dynamically between large, mid, and small companies based on market opportunities.",
            "ELSS (Tax Saving): Equity funds with a 3-year lock-in that offer tax deductions under Section 80C (Old Regime)."
          ]
        }
      ],
      takeaways: [
        "Always choose Direct Plans to avoid commission drag.",
        "Index funds are cheaper and often outperform active funds over long horizons.",
        "Match your fund selection to your time horizon: never invest in small-caps for less than 7-10 years."
      ]
    }
  }
];

const PDF_GUIDES: PdfGuide[] = [
  {
    id: "emergency-war-room-checklist",
    title: "Emergency War-Room & Vital Checklist",
    description: "A complete emergency checklist detailing exactly which records, nominees, emergency funds, and medical stashes to keep prepared.",
    fileSize: "1.4 MB",
    pages: 3,
    tags: ["Emergency", "Stability", "Checklist"],
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/20",
    icon: "🛡️",
    pagesContent: [
      {
        title: "Page 1: Digital Stash & Document Locker",
        sections: [
          {
            heading: "Crucial Digital Records",
            content: "Keep these documents uploaded in a secure cloud folder (like DigiLocker) with shared access for your emergency contact:",
            checklist: [
              "Aadhaar Card, PAN Card, Passport, and Voter ID (PDFs)",
              "Active Health Insurance Policy document with cashless card PDF",
              "Term Insurance Policy copy with clear claim steps guide",
              "Vehicle Registration (RC) and active third-party insurance",
              "Property deeds, rent agreements, and utility bills"
            ]
          },
          {
            heading: "Financial Passwords & Access",
            content: "Securely document account passwords or instruct trusted family members on how to access password managers during crisis scenarios."
          }
        ]
      },
      {
        title: "Page 2: Bank Nominees & Asset Registry",
        sections: [
          {
            heading: "Nomination Audit Registry",
            content: "Check all bank accounts and investments to ensure active nominations are verified:",
            checklist: [
              "Primary Bank Account nominee registered and verified",
              "Salary/Secondary Account nominee updated",
              "EPF/PPF account nominees updated via EPFO portal",
              "Mutual Fund portfolio (demat/folio) nominees updated",
              "Stock trading account nominee updated"
            ]
          },
          {
            heading: "The Asset Sheet",
            content: "Maintain a simple spreadsheet detailing account numbers, bank names, mutual fund folios, and insurance policies. Review this list annually with dependents."
          }
        ]
      },
      {
        title: "Page 3: Liquid Cash & Medical Contacts",
        sections: [
          {
            heading: "Cash and First-Aid Stash",
            content: "Keep a small physical cash reserve at home for immediate hospital deposits or local emergencies:",
            checklist: [
              "Physical Cash stash: 1-2 weeks of essential expenses (in small denominations)",
              "Active UPI/Debit cards with emergency limits active",
              "Emergency contact card kept physically in wallet/purse",
              "Medicines checklist: 1-month buffer of crucial maintenance prescriptions"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "salary-negotiation-cheat-sheet",
    title: "Salary Negotiation Move-Tree Cheat Sheet",
    description: "A quick-reference guide with verbal scripts, email templates, and psychological levers to counter initial recruiter offers confidently.",
    fileSize: "850 KB",
    pages: 2,
    tags: ["Salary", "Career", "Negotiation"],
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/20",
    icon: "💼",
    pagesContent: [
      {
        title: "Page 1: Anchoring & Response Scripts",
        sections: [
          {
            heading: "Handling the 'Expected Salary' Trap",
            content: "When a recruiter asks for your expectations early, try to defer the number to gather context first:",
            checklist: [
              "Script: 'I'd love to learn more about the scope, responsibilities, and team impact of the role before discussing compensation. What range do you have budgeted?'",
              "Script: 'I'm open to competitive compensation aligned with market rates for this level of impact. Could you share what salary band you have set for this position?'"
            ]
          },
          {
            heading: "How to Respond to the First Offer",
            content: "Always ask for 24-48 hours to review the offer. Never accept immediately on the call.",
            checklist: [
              "Script: 'Thank you so much for the offer! I am very excited about the opportunity. I'd like to take a day to review the details and components, and I will get back to you by tomorrow afternoon.'"
            ]
          }
        ]
      },
      {
        title: "Page 2: Counter-Offer Strategy & Email Templates",
        sections: [
          {
            heading: "The Counter-Offer Email Formula",
            content: "Draft your counter-offer email focusing on value, market alignment, and gratitude:",
            checklist: [
              "Express genuine excitement for the role and team",
              "Highlight 2 key skills/experiences you bring to deliver immediate impact",
              "State your target number based on market research (ask for 10-15% higher than their initial offer)",
              "Propose non-salary alternatives if budget is fixed (e.g., joining bonus, training budget)"
            ]
          }
        ]
      }
    ]
  }
];

const VIDEO_GUIDES: VideoGuide[] = [
  {
    id: "income-tax-slabs",
    title: "Understanding Indian Income Tax (New vs Old Slabs)",
    description: "A comprehensive breakdown of how the Indian Income Tax regime works, explaining new regime tax slabs, deductions under 80C/80D, and how to decide which is better for your salary bracket.",
    duration: "11 mins",
    youtubeId: "4zS9v_bN_bY", // Curated high-quality educational placeholder
    tags: ["Taxes", "Salary", "New Regime", "Old Regime"],
    icon: "🏛️",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    learnPoints: [
      "Understand tax slabs under the New vs Old tax regimes.",
      "How to leverage Section 80C and 80D deductions in the Old Regime.",
      "Calculate your personal threshold income to switch regimes.",
      "How standard deduction of ₹75,000 applies to your salary."
    ]
  },
  {
    id: "mutual-funds-guide",
    title: "How Mutual Funds Actually Work (Direct vs Regular & SIPs)",
    description: "An easy-to-follow guide explaining mutual funds, expense ratios, direct plans, and the compounding power of Systematic Investment Plans (SIPs) for retail investors in India.",
    duration: "13 mins",
    youtubeId: "p7HKvqRI_Bo",
    tags: ["Mutual Funds", "Investing", "SIP", "CAGR"],
    icon: "📈",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    learnPoints: [
      "What is a Mutual Fund and how does NAV function?",
      "Why Direct Plans save you lakhs in commission fees compared to Regular Plans.",
      "How compounding accelerates over 10, 15, and 20-year SIP timelines.",
      "The role of expense ratios and exit loads in overall returns."
    ]
  }
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "articles" | "pdfs" | "videos">("all");
  
  // Modal states
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activePdf, setActivePdf] = useState<PdfGuide | null>(null);
  const [pdfActivePage, setPdfActivePage] = useState<number>(0);
  const [activeVideo, setActiveVideo] = useState<VideoGuide | null>(null);
  
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Filter logic
  const filteredArticles = ARTICLES.filter(art => 
    (selectedTab === "all" || selectedTab === "articles") &&
    (art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
     art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredPdfs = PDF_GUIDES.filter(pdf => 
    (selectedTab === "all" || selectedTab === "pdfs") &&
    (pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     pdf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     pdf.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredVideos = VIDEO_GUIDES.filter(vid => 
    (selectedTab === "all" || selectedTab === "videos") &&
    (vid.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     vid.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     vid.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleMockDownload = (pdf: PdfGuide) => {
    setDownloadingId(pdf.id);
    setTimeout(() => {
      setDownloadingId(null);
      // Create a dummy text file to trigger browser download
      const element = document.createElement("a");
      const file = new Blob([
        `--- ${pdf.title} --- \n\nDownloaded from Arthakosh. Your Financial OS.\n\n` + 
        pdf.pagesContent.map(p => `${p.title}\n======================\n` + 
          p.sections.map(s => `\n${s.heading}\n------------------\n${s.content}\n` + 
            (s.checklist ? s.checklist.map(c => `[ ] ${c}`).join("\n") : "")
          ).join("\n")
        ).join("\n\n")
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${pdf.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  const hasResults = filteredArticles.length > 0 || filteredPdfs.length > 0 || filteredVideos.length > 0;

  return (
    <div className="container-page py-8 sm:py-12 relative">
      {/* Background decoration */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header section */}
      <AnimatedSection>
        <div className="mb-8">
          <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-violet animate-pulse" />
            Curated Knowledge Hub
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Everyday Resources Hub
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Boost your financial intelligence with readable articles, printable checklist worksheets, and inline video companions. No sales pitches, just pure strategy.
          </p>
        </div>
      </AnimatedSection>

      {/* Search & Tabs control */}
      <AnimatedSection delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 pb-6 border-b border-border/50">
          {/* Tab selectors */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-raised/40 border border-border/30 rounded-xl w-full sm:w-auto overflow-x-auto scrollbar-hide">
            {[
              { id: "all", label: "All Resources" },
              { id: "articles", label: "Articles" },
              { id: "pdfs", label: "PDF Guides" },
              { id: "videos", label: "Video Guides" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedTab === tab.id 
                    ? "bg-foreground text-background shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guides, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-raised/50 border border-border/60 hover:border-border/90 focus:border-foreground rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-0 transition-colors"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Grid displays */}
      {!hasResults ? (
        <AnimatedSection>
          <div className="text-center py-16 bg-surface-raised/20 border border-dashed border-border/50 rounded-2xl max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-semibold text-sm mb-1">No resources found</h3>
            <p className="text-xs text-muted-foreground">Try adjusting your search terms or selecting a different tab.</p>
          </div>
        </AnimatedSection>
      ) : (
        <div className="space-y-12">
          {/* 1. ARTICLES SECTION */}
          {filteredArticles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-500" />
                Articles & Blogs
              </h3>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(art => (
                  <StaggerItem key={art.id}>
                    <Card 
                      onClick={() => setActiveArticle(art)}
                      className="p-6 h-full border border-border/60 hover:border-foreground/20 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group bg-surface"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl ${art.bg} flex items-center justify-center text-xl`}>
                            {art.icon}
                          </div>
                          <Badge variant="outline" className="text-[10px] text-muted-foreground py-0.5">
                            {art.readTime}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-base mb-2 group-hover:text-violet transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                          {art.summary}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/30">
                        {art.tags.map(t => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 bg-accent/60 text-muted-foreground rounded font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          )}

          {/* 2. PDF WORKBOOKS SECTION */}
          {filteredPdfs.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-500" />
                Worksheets & Checklists (PDFs)
              </h3>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredPdfs.map(pdf => (
                  <StaggerItem key={pdf.id}>
                    <Card className="p-6 h-full border border-border/60 hover:border-foreground/20 hover:shadow-md transition-all duration-200 bg-surface flex flex-col justify-between md:flex-row gap-5 items-start">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${pdf.bg} flex items-center justify-center text-xl shrink-0`}>
                            {pdf.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm leading-tight text-foreground">{pdf.title}</h4>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{pdf.pages} Pages • {pdf.fileSize}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {pdf.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {pdf.tags.map(t => (
                            <span key={t} className="text-[9px] px-1.5 py-0.5 bg-accent/60 text-muted-foreground rounded font-medium">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Download & Preview Actions */}
                      <div className="flex md:flex-col gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0">
                        <button
                          onClick={() => {
                            setActivePdf(pdf);
                            setPdfActivePage(0);
                          }}
                          className="flex-1 md:w-32 justify-center inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border/80 hover:border-foreground hover:bg-accent/40 rounded-xl transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Read Inline
                        </button>
                        <button
                          onClick={() => handleMockDownload(pdf)}
                          disabled={downloadingId !== null}
                          className="flex-1 md:w-32 justify-center inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-foreground text-background hover:opacity-90 rounded-xl shadow-sm transition-all disabled:opacity-60"
                        >
                          {downloadingId === pdf.id ? (
                            <>
                              <div className="w-3 h-3 rounded-full border border-background/20 border-t-background animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              Download PDF
                            </>
                          )}
                        </button>
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          )}

          {/* 3. VIDEOS SECTION */}
          {filteredVideos.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 flex items-center gap-1.5">
                <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
                Video Guides & Explaners
              </h3>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVideos.map(vid => (
                  <StaggerItem key={vid.id}>
                    <Card className="p-5 h-full border border-border/60 hover:border-foreground/20 hover:shadow-md transition-all duration-200 bg-surface flex flex-col justify-between group">
                      <div className="space-y-4">
                        {/* Video Thumbnail Mockup */}
                        <div 
                          onClick={() => setActiveVideo(vid)}
                          className="relative aspect-video rounded-xl bg-zinc-950 border border-border/40 overflow-hidden cursor-pointer group-hover:border-foreground/20 transition-all flex items-center justify-center"
                        >
                          <img 
                            src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`} 
                            alt={vid.title}
                            className="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute w-12 h-12 rounded-full bg-background/95 shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-foreground group-hover:text-background transition-all">
                            <Play className="w-5 h-5 text-foreground group-hover:text-background fill-current translate-x-0.5" />
                          </div>
                          <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold bg-black/80 text-white px-2 py-0.5 rounded backdrop-blur">
                            {vid.duration}
                          </span>
                        </div>

                        {/* Text Detail */}
                        <div className="space-y-1.5">
                          <h4 
                            onClick={() => setActiveVideo(vid)}
                            className="font-bold text-base cursor-pointer hover:text-violet transition-colors leading-tight"
                          >
                            {vid.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {vid.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/30">
                        {vid.tags.map(t => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 bg-accent/60 text-muted-foreground rounded font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          )}
        </div>
      )}

      {/* --- INLINE ARTICLE MODAL --- */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-background border border-border rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-border/50 flex justify-between items-start shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${activeArticle.bg} flex items-center justify-center text-xl shrink-0`}>
                    {activeArticle.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-violet uppercase tracking-wider">{activeArticle.category}</span>
                    <h3 className="font-bold text-lg leading-snug">{activeArticle.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="w-8 h-8 rounded-full hover:bg-accent border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed text-foreground/90 scrollbar-hide">
                {activeArticle.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-bold text-base text-foreground">{section.heading}</h4>
                    <p className="text-muted-foreground">{section.body}</p>
                    {section.list && (
                      <ul className="space-y-2 pl-5 list-disc mt-3 text-muted-foreground">
                        {section.list.map((li, lIdx) => (
                          <li key={lIdx}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Key Takeaways */}
                <div className="p-5 bg-violet-500/[0.03] border border-violet/15 rounded-xl space-y-2.5">
                  <span className="font-bold text-violet text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Key Takeaways
                  </span>
                  <div className="space-y-2">
                    {activeArticle.content.takeaways.map((take, tIdx) => (
                      <div key={tIdx} className="flex gap-2 items-start text-xs text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                        <span>{take}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/50 flex justify-between items-center bg-surface-raised/40 shrink-0 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 font-bold text-foreground hover:bg-accent border border-border/50 rounded-xl transition-all"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- INLINE PDF PREVIEWER MODAL --- */}
      <AnimatePresence>
        {activePdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePdf(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl shadow-2xl flex flex-col h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-zinc-800 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${activePdf.bg} flex items-center justify-center text-xl shrink-0`}>
                    {activePdf.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-white">{activePdf.title}</h3>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Mock Document Viewer • Page {pdfActivePage + 1} of {activePdf.pages}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActivePdf(null)}
                  className="w-8 h-8 rounded-full hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white shrink-0 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Visual PDF Page Previewer container */}
              <div className="flex-1 overflow-y-auto p-8 bg-zinc-950 flex flex-col items-center justify-start scrollbar-hide">
                {/* Book Layout Mockup */}
                <motion.div 
                  key={pdfActivePage}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-xl bg-white text-zinc-900 shadow-2xl rounded-lg p-8 sm:p-10 min-h-[450px] flex flex-col justify-between border border-zinc-200"
                >
                  <div>
                    {/* Page Header */}
                    <div className="border-b border-zinc-100 pb-3 mb-6 flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      <span>{activePdf.title}</span>
                      <span>Page {pdfActivePage + 1}</span>
                    </div>

                    {/* Page Content */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                        {activePdf.pagesContent[pdfActivePage].title}
                      </h4>

                      <div className="space-y-5 text-sm leading-relaxed text-zinc-700">
                        {activePdf.pagesContent[pdfActivePage].sections.map((section, sIdx) => (
                          <div key={sIdx} className="space-y-2">
                            <h5 className="font-extrabold text-zinc-900 text-sm tracking-wide">
                              {section.heading}
                            </h5>
                            <p className="text-xs text-zinc-500">{section.content}</p>
                            {section.checklist && (
                              <div className="space-y-1.5 pt-2">
                                {section.checklist.map((item, iIdx) => (
                                  <label key={iIdx} className="flex gap-2.5 items-start text-xs text-zinc-600 cursor-pointer">
                                    <input type="checkbox" className="mt-0.5 rounded border-zinc-300 text-violet-600 focus:ring-violet-500" />
                                    <span>{item}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Page Footer */}
                  <div className="border-t border-zinc-100 pt-3 mt-8 flex justify-between items-center text-[10px] font-semibold text-zinc-400">
                    <span>ARTHAKOSH ACADEMY</span>
                    <span>CONFIDENTIAL USE ONLY</span>
                  </div>
                </motion.div>
              </div>

              {/* Navigation controls */}
              <div className="p-4 border-t border-zinc-800 flex justify-between items-center bg-zinc-900 shrink-0">
                <button
                  disabled={pdfActivePage === 0}
                  onClick={() => setPdfActivePage(prev => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 text-white hover:bg-zinc-750 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous Page
                </button>
                <div className="flex gap-1.5">
                  {Array.from({ length: activePdf.pages }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full transition-all ${pdfActivePage === idx ? "bg-violet-500 w-3" : "bg-zinc-700"}`} 
                    />
                  ))}
                </div>
                <button
                  disabled={pdfActivePage === activePdf.pages - 1}
                  onClick={() => setPdfActivePage(prev => Math.min(activePdf.pages - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 text-white hover:bg-zinc-750 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next Page →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- INLINE VIDEO PLAYER MODAL --- */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <h3 className="font-bold text-sm text-zinc-100 truncate max-w-[280px] sm:max-w-md">{activeVideo.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white shrink-0 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* YouTube Video iframe Container */}
              <div className="relative aspect-video w-full bg-black shrink-0">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-none"
                />
              </div>

              {/* Text explanations & learn list */}
              <div className="p-6 overflow-y-auto space-y-4 bg-zinc-900 text-zinc-300 text-xs leading-relaxed scrollbar-hide">
                <div>
                  <h4 className="font-bold text-zinc-100 text-sm mb-1">Video Overview</h4>
                  <p className="text-zinc-400">{activeVideo.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <h4 className="font-bold text-zinc-100 text-sm mb-2">Key Concepts to Learn:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeVideo.learnPoints.map((pt, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-[11px] text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex justify-between items-center shrink-0 text-xs text-zinc-400">
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Duration: {activeVideo.duration}
                </span>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-1.5 font-bold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-850 transition-colors"
                >
                  Close Player
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
