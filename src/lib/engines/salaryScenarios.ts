import { Scenario, DialogueNode, DialogueNodeId, RecruiterArchetype } from '@/types/salary';

export const SCENARIOS: Scenario[] = [
  {
    id: 'bengaluru_startup',
    title: 'Bengaluru Startup offer (Series A)',
    role: 'Associate Product Designer',
    experience: '1-2 Years',
    city: 'Bengaluru (Hybrid)',
    companyType: 'High-growth FinTech Startup',
    initialBase: 8.5,
    marketRange: '₹8L - ₹12L LPA',
    recruiters: [
      {
        id: 'founder',
        name: 'Vikram',
        role: 'Co-founder & CEO',
        company: 'Fynk',
        avatar: '👨‍💼',
        tone: 'Passionate, highly budget-conscious, direct, and values raw commitment.',
        description: 'Series A founder managing burn rate. Expects extreme ownership; values stock options over base cash.',
        behavioralTendencies: ['Avoids silence', 'Appeals to loyalty/mission', 'Uses guilt around burn rate'],
        negotiationStyle: 'Emotional & Visionary',
        urgencySignals: 'Immediate start date required',
        baseLeverage: 30,
        initialOffer: {
          base: 8.0,
          bonus: 0,
          equity: '₹1L ESOPs',
          milestoneReview: false,
          benefits: ['Health Insurance', 'Free Lunch']
        },
        maxOffer: {
          base: 10.5,
          bonus: 1.0,
          equity: '₹2.5L ESOPs',
          milestoneReview: true,
          benefits: ['Health Insurance', 'Free Lunch', 'WFH Allowance']
        },
        pressureFrequency: 0.8
      },
      {
        id: 'high_pressure',
        name: 'Rohan',
        role: 'Talent Acquisition Partner',
        company: 'Fynk Staffing',
        avatar: '⚡',
        tone: 'Aggressive, fast-moving, uses competitive urgency and take-it-or-leave-it anchors.',
        description: 'External headhunter driven by closing metrics. Uses tight deadlines and "other candidates" to force signatures.',
        behavioralTendencies: ['Uses exploding offers', 'Refers to other candidates', 'Talks fast'],
        negotiationStyle: 'High-Pressure Transactional',
        urgencySignals: 'Mentions a 24-hour deadline',
        baseLeverage: 40,
        initialOffer: {
          base: 8.5,
          bonus: 0.5,
          equity: 'None',
          milestoneReview: false,
          benefits: ['Health Insurance']
        },
        maxOffer: {
          base: 10.0,
          bonus: 1.5,
          equity: '₹1L ESOPs',
          milestoneReview: false,
          benefits: ['Health Insurance', 'Relocation Bonus']
        },
        pressureFrequency: 0.95
      }
    ]
  },
  {
    id: 'mnc_corporate',
    title: 'Enterprise Corporate MNC',
    role: 'Software Engineer II',
    experience: '3-4 Years',
    city: 'Hyderabad (On-site)',
    companyType: 'Global Tech & Banking Solutions',
    initialBase: 16.0,
    marketRange: '₹15L - ₹22L LPA',
    recruiters: [
      {
        id: 'corporate',
        name: 'Neha',
        role: 'Senior HR Manager',
        company: 'GlobalCap Tech',
        avatar: '👩‍💻',
        tone: 'Polite, structured, bound by strict compensation bands, standard procedures, and benefits lists.',
        description: 'Career HR professional. Moves slowly, strictly follows salary bands, but has flexibility in bonuses/benefits.',
        behavioralTendencies: ['Cites company policy', 'Moves very slowly', 'Relies heavily on forms/processes'],
        negotiationStyle: 'Bureaucratic & Rule-bound',
        urgencySignals: 'Mentions payroll cut-off dates',
        baseLeverage: 50,
        initialOffer: {
          base: 15.5,
          bonus: 1.0,
          equity: '₹1.5L RSUs',
          milestoneReview: false,
          benefits: ['Medical & Dental', 'Gym Subsidy']
        },
        maxOffer: {
          base: 19.0,
          bonus: 2.5,
          equity: '₹3L RSUs',
          milestoneReview: true,
          benefits: ['Medical & Dental', 'Gym Subsidy', 'Gratuity Match', 'Flexible Allowance']
        },
        pressureFrequency: 0.4
      },
      {
        id: 'faang',
        name: 'Sarah',
        role: 'Lead Executive Recruiter',
        company: 'Apex Cloud Services',
        avatar: '🌟',
        tone: 'Professional, highly accommodating but savvy, values market benchmark comparisons, pushes total comp.',
        description: 'Elite recruiter. Hard to rattle, deeply values structured counteroffers with competing offers, and can unlock major sign-on bonuses.',
        behavioralTendencies: ['Remains unfazed by high counters', 'Asks for competing offer letters', 'Focuses on total comp (TC)'],
        negotiationStyle: 'Sophisticated & Benchmark-driven',
        urgencySignals: 'Subtle mentions of team growth limits',
        baseLeverage: 60,
        initialOffer: {
          base: 17.5,
          bonus: 2.0,
          equity: '₹4L RSUs',
          milestoneReview: false,
          benefits: ['Premium Health Care', 'Broadband Subsidy']
        },
        maxOffer: {
          base: 22.0,
          bonus: 4.5,
          equity: '₹8L RSUs',
          milestoneReview: true,
          benefits: ['Premium Health Care', 'Broadband Subsidy', 'Learning Allowance', 'Gratuity Match']
        },
        pressureFrequency: 0.3
      }
    ]
  }
];

export function getDialogueFlow(recruiter: RecruiterArchetype): Record<DialogueNodeId, DialogueNode> {
  const initialBase = recruiter.initialOffer.base;
  
  return {
    intro: {
      id: 'intro',
      delayMs: 2500,
      thinkingMoment: {
        title: 'Initial Offer Analysis',
        insight: `The recruiter just anchored at ₹${initialBase} LPA. This is likely their safe lower bound.`,
        strategicAdvice: 'Do not accept the first offer. Responding too enthusiastically gives away your leverage. Consider anchoring higher or gathering more information on total comp.'
      },
      recruiterMessage: `Hi there, we're absolutely thrilled with your interviews! The team raved about your final technical round. I'd like to extend an official offer: we can do a base salary of ₹${initialBase} LPA, along with standard insurance and perks. How are you feeling about this?`,
      recruiterSentiment: 'Warm',
      choices: [
        {
          id: 'intro_accept_direct',
          strategyLabel: 'Passive Acceptance (Low Leverage)',
          text: `Wow, thank you! That sounds really generous. I accept the offer and look forward to joining.`,
          impact: { leverageChange: -30, sentimentChange: 20, stressChange: -10, baseChange: 0 },
          feedback: `Accepting immediately leaves money on the table. Recruiters expect a professional counteroffer and build in a buffer. You secured no extra compensation.`,
          nextNodeId: 'final_close'
        },
        {
          id: 'intro_grateful_counter',
          strategyLabel: 'Grateful & Counter Base (Strong)',
          text: `Thank you so much! I'm incredibly excited about the role and the team. Based on my experience and the responsibilities of this position, I was hoping we could explore something closer to ₹${(initialBase * 1.2).toFixed(1)} LPA. Is there any flexibility on the base?`,
          impact: { leverageChange: 15, sentimentChange: -5, stressChange: 5, baseChange: Number((initialBase * 0.08).toFixed(1)) },
          feedback: `Excellent choice. You showed strong enthusiasm first (which keeps the recruiter warm) and anchored higher with a standard, polite counter.`,
          nextNodeId: 'react_to_offer'
        },
        {
          id: 'intro_aggressive_demand',
          strategyLabel: 'Aggressive Anchor (High Risk)',
          text: `Thanks for the offer. However, ₹${initialBase} LPA is way below the market rate for this experience. I'll need at least ₹${(initialBase * 1.35).toFixed(1)} LPA base cash to even consider this.`,
          impact: { leverageChange: 25, sentimentChange: -25, stressChange: 20, baseChange: Number((initialBase * 0.12).toFixed(1)) },
          feedback: `This shows confidence, but the blunt tone and lack of enthusiasm ("way below market", "even consider this") puts the recruiter on the defensive and risks damaging the relationship early.`,
          nextNodeId: 'react_to_offer'
        },
        {
          id: 'intro_defer_and_ask',
          strategyLabel: 'Information Gathering (Balanced)',
          text: `Thank you for sharing the numbers. I'd love to understand the full package details better first. Could you tell me more about performance bonuses, stock options/ESOPs, and benefits?`,
          impact: { leverageChange: 10, sentimentChange: 5, stressChange: 0 },
          feedback: `A smart, low-stress opening. By gathering total compensation information before countering, you ensure you have the full picture and retain leverage.`,
          nextNodeId: 'negotiate_benefits'
        }
      ]
    },

    react_to_offer: {
      id: 'react_to_offer',
      delayMs: 3500,
      thinkingMoment: {
        title: 'Recruiter Resistance',
        insight: 'The recruiter is pushing back on base salary by citing constraints (budget, parity, or runway).',
        strategicAdvice: 'This is a standard objection. Do not fold immediately. If base cash is truly capped, pivot to total comp (sign-on bonus or equity) or justify your value firmly to force an exception.'
      },
      recruiterMessage: recruiter.id === 'founder' 
        ? `We are a lean Series A company, and cash is tight. If we raise the base salary too high, we can't hire other team members. I can adjust base slightly, but I'd prefer to offer you more equity. How about that?`
        : recruiter.id === 'high_pressure'
        ? `I have three other candidates wrapping up their final rounds. Honestly, ₹${initialBase} LPA is already at the very top of our budget band. If you want more cash, we might have to re-evaluate the timelines.`
        : `Compensation bands are strictly structured based on the internal parity of our current engineering staff. I can try to request a special band exception from my director, but I will need a solid justification. What makes you think you should sit at the top of this band?`,
      recruiterSentiment: recruiter.id === 'high_pressure' ? 'Impatient' : 'Skeptical',
      choices: [
        {
          id: 'react_justify_skills',
          strategyLabel: 'Justify with Value (Strong)',
          text: `I understand corporate constraints. However, I bring hands-on experience in shipping production code directly relevant to your current pipeline, which means I will be fully productive from week one. I think a base of ₹${(initialBase * 1.12).toFixed(1)} LPA reflects that value.`,
          impact: { leverageChange: 15, sentimentChange: 10, stressChange: 5, baseChange: Number((initialBase * 0.05).toFixed(1)) },
          feedback: `Perfect. You didn't make it about your personal bills; you made it about business value. Bringing up direct productivity and domain expertise gives recruiters the leverage ammunition they need to get approvals.`,
          nextNodeId: 'negotiate_benefits'
        },
        {
          id: 'react_accept_under_pressure',
          strategyLabel: 'Yield to Pressure (Weak)',
          text: `Understood, I don't want to complicate things. If that's the absolute budget, I will accept the initial numbers.`,
          impact: { leverageChange: -25, sentimentChange: 15, stressChange: -15 },
          feedback: `You yielded immediately to standard pushback. Recruiters are trained to say "this is at the top of our budget" as their first defense line. You left potential gains on the table.`,
          nextNodeId: 'final_close'
        },
        {
          id: 'react_pivot_equity',
          strategyLabel: 'Pivot to Total Comp (Strategic)',
          text: `If base cash is tight, I'm open to finding a creative solution. Would you be open to an additional ₹1.5 Lakh joining bonus, or a higher equity grant, to bridge the gap?`,
          impact: { leverageChange: 15, sentimentChange: 15, stressChange: 0, bonusChange: 1.0 },
          feedback: `Highly professional negotiation. When base salary is blocked, pivoting to one-time signs/RSUs/bonuses is easier for recruiters to approve since it doesn't inflate recurring annual base payroll budgets.`,
          nextNodeId: 'negotiate_benefits'
        }
      ]
    },

    negotiate_benefits: {
      id: 'negotiate_benefits',
      delayMs: 4000,
      thinkingMoment: {
        title: 'Closing the Gap',
        insight: 'The recruiter is offering concessions (bonus, equity, or perks) to secure a verbal agreement right now.',
        strategicAdvice: 'Do not give a verbal acceptance on the spot. Always ask for the offer in writing to lock in the concessions before making your final decision.'
      },
      recruiterMessage: recruiter.id === 'founder'
        ? `Okay, I hear you. I can add another ₹1.5L ESOP grant, but we can't do a signing bonus. Also, we really need someone who can work in the office five days a week. We value team presence. Can we finalize this now?`
        : recruiter.id === 'high_pressure'
        ? `Look, I've got approval for a ₹50,000 one-time sign-on bonus, and I can bump the base slightly. But I need a verbal acceptance from you on the call right now so I can send the portal link. Are we good to go?`
        : `I can bundle in a standard remote work setup allowance, and I have secured approval for a 6-month performance review milestone where we can lock in an accelerated 10% raise depending on targets. How does that sit with your expectations?`,
      recruiterSentiment: recruiter.id === 'high_pressure' ? 'Impatient' : 'Professional',
      choices: [
        {
          id: 'benefits_request_time',
          strategyLabel: 'Ask for Written Offer & Time (Strong)',
          text: `I really appreciate you securing those options. This sounds very promising. Could you send the full offer breakdown in writing? I'd like to take 24 hours to review the numbers and benefits details and get back to you tomorrow morning.`,
          impact: { leverageChange: 10, sentimentChange: -5, stressChange: -10 },
          feedback: `Splendid emotional regulation. High-pressure recruiters push for "verbal agreements on the spot." Asking for 24 hours to review the offer in writing is standard, professional, and protects you from making hasty agreements.`,
          nextNodeId: 'handling_deadline'
        },
        {
          id: 'benefits_accept_verbal',
          strategyLabel: 'Instant Verbal Acceptance (Weak)',
          text: `Great, that works for me! Yes, let's lock it in and get the contract drafted.`,
          impact: { leverageChange: -15, sentimentChange: 15, stressChange: -15 },
          feedback: `While friendly, verbal acceptance closes your window for final verification. Once you say yes verbally, you cannot easily renegotiate terms when reviewing the final contract.`,
          nextNodeId: 'final_close'
        },
        {
          id: 'benefits_last_push',
          strategyLabel: 'Final Base Push (Balanced)',
          text: `The 6-month review milestone sounds fantastic and aligns perfectly with my goal to deliver impact early. If we can round the base salary up to a clean ₹${(initialBase * 1.15).toFixed(1)} LPA today, I'm ready to sign the written offer immediately.`,
          impact: { leverageChange: 15, sentimentChange: -5, stressChange: 5, baseChange: Number((initialBase * 0.05).toFixed(1)) },
          feedback: `A strong "closing concession." Offering to sign immediately in exchange for a small, specific bump ("rounding it up") is highly effective. It offers the recruiter a guaranteed close if they give you that final concession.`,
          nextNodeId: 'handling_deadline'
        }
      ]
    },

    handling_deadline: {
      id: 'handling_deadline',
      delayMs: 3000,
      thinkingMoment: {
        title: 'Manufactured Urgency',
        insight: 'The recruiter is applying artificial deadline pressure (e.g., "noon tomorrow") to prevent you from shopping the offer around.',
        strategicAdvice: 'Remain calm. A genuine offer rarely expires in 24 hours. Acknowledge the timeline, but maintain your professional boundaries.'
      },
      recruiterMessage: recruiter.id === 'high_pressure' || recruiter.id === 'founder'
        ? `We are moving very fast. I can hold these numbers for you, but we must have a signed PDF uploaded by noon tomorrow. Otherwise, we'll have to start onboarding the next candidate. Can we count on you?`
        : `No problem at all. Take your time to review the documents. However, our next system payroll cycle begins next Monday, so we'd appreciate if you could finalize the paperwork by Friday.`,
      recruiterSentiment: recruiter.id === 'high_pressure' ? 'Impatient' : 'Warm',
      choices: [
        {
          id: 'deadline_cool_negotiation',
          strategyLabel: 'Call the Bluff / Calm Composure (Strong)',
          text: `I completely understand the hiring urgency. I will go through the details tonight and will definitely send you my final decision by 10 AM tomorrow. I want to make sure I am fully aligned so I can hit the ground running.`,
          impact: { leverageChange: 10, sentimentChange: 5, stressChange: -5 },
          feedback: `Great composure. You did not panic under the artificial deadline pressure. You acknowledged their timeline, but calmly re-asserted your professional schedule.`,
          nextNodeId: 'final_close'
        },
        {
          id: 'deadline_panicked_pushback',
          strategyLabel: 'Aggressive Backlash (Weak)',
          text: `Tomorrow noon is ridiculously short notice and unfair. I am looking at other companies and cannot be rushed like this. You should give me at least a week to decide.`,
          impact: { leverageChange: -10, sentimentChange: -25, stressChange: 20 },
          feedback: `This sounds defensive and unprofessional. It signals lack of composure and damages the warm relationship required to make onboarding smooth. Always remain calm and polite, even when calling out a tight timeline.`,
          nextNodeId: 'walk_away_check'
        }
      ]
    },

    walk_away_check: {
      id: 'walk_away_check',
      recruiterMessage: `I understand you have other conversations, but we really need a clear signal. If the current timeline or package is a dealbreaker for you, please let us know so we can part ways amicably.`,
      recruiterSentiment: 'Annoyed',
      choices: [
        {
          id: 'walk_soft_retreat',
          strategyLabel: 'De-escalate & Re-engage (Strategic)',
          text: `It is definitely not a dealbreaker — I'm highly motivated to join Fynk. I apologize if my previous note came across as dismissive. I just wanted to ensure I did my due diligence. Let's proceed with the offer, and I'll submit by tomorrow morning.`,
          impact: { leverageChange: -10, sentimentChange: 15, stressChange: -5 },
          feedback: `Wise retreat. When a negotiation goes cold or the relationship is threatened, immediately de-escalating and reaffirming enthusiasm is key to keeping the deal alive.`,
          nextNodeId: 'final_close'
        },
        {
          id: 'walk_hold_ground',
          strategyLabel: 'Walk Away / High Stature (High Risk)',
          text: `I understand. If a 24-hour response window is a hard constraint on your end, then I respect that. However, I need to make a balanced career choice. If we cannot extend the window, I will have to decline the offer.`,
          impact: { leverageChange: 35, sentimentChange: -20, stressChange: 25 },
          feedback: `A bold walk-away stance. This is only advisable if you genuinely have competing offers or are comfortable not joining this company. If they really want you, they will yield and extend the deadline. If not, they will move on.`,
          nextNodeId: 'final_close'
        }
      ]
    },

    comp_justification: {
      id: 'comp_justification',
      recruiterMessage: `We appreciate your justification, but standard approvals are difficult right now. If we give you ₹${(initialBase * 1.15).toFixed(1)} LPA, we need to know what specific milestones you plan to hit in the first 90 days.`,
      recruiterSentiment: 'Professional',
      choices: [
        {
          id: 'just_concrete_plan',
          strategyLabel: 'Milestone Commitment (Strong)',
          text: `In the first 90 days, I plan to take full ownership of the payment gateway redesign project, reduce user checkout drop-offs by 5%, and mentor the junior developer. I am fully comfortable mapping my compensation review to these concrete outcomes.`,
          impact: { leverageChange: 20, sentimentChange: 15, stressChange: 10 },
          feedback: `Superb response. Committing to quantifiable outcomes or linking your compensation to business success removes the risk factor for hiring managers and positions you as a high-performing professional.`,
          nextNodeId: 'negotiate_benefits'
        },
        {
          id: 'just_vague_promise',
          strategyLabel: 'Vague Promises (Weak)',
          text: `I'll work very hard, attend all meetings, help the team on whatever is needed, and make sure I finish my tasks on time.`,
          impact: { leverageChange: -15, sentimentChange: 0, stressChange: -5 },
          feedback: `Too generic. Recruiters and hiring managers hear "I will work hard" from everyone. It does not justify paying you at the top tier of their salary band.`,
          nextNodeId: 'negotiate_benefits'
        }
      ]
    },

    final_close: {
      id: 'final_close',
      recruiterMessage: `Excellent. I am glad we could connect and align. I've sent the updated documents over email. We are absolutely thrilled to welcome you to the team, and can't wait to see the impact you make here!`,
      recruiterSentiment: 'Warm',
      choices: [
        {
          id: 'close_sign_grateful',
          strategyLabel: 'Closing Sign (Excellent)',
          text: `Thank you so much! I have received the email. I'll sign and upload the document right away. Looking forward to day one!`,
          impact: { leverageChange: 0, sentimentChange: 20, stressChange: -20 },
          feedback: `Clean, positive close. Ending a negotiation with high enthusiasm ensures a healthy working relationship from your very first day.`,
          nextNodeId: 'outcome' as any
        }
      ]
    }
  };
}

export const PRESSURE_RESPONSES = [
  {
    situation: "Recruiter asks for your current CTC / Salary first",
    weak: "I make ₹6.5 LPA right now, but I want at least ₹8 LPA.",
    average: "My current salary is ₹6.5 LPA, but I'm looking for a standard hike.",
    strong: "I prefer to focus on the value and responsibilities of this new role rather than my past salary. Based on my research and interview rounds, I am aiming for a salary of ₹9-10 LPA.",
    best: "My current compensation package is bound by non-disclosure agreements, but I can share that I am looking at market benchmarks for this role in Bengaluru. Given the responsibilities we discussed, I'm expecting ₹10L to ₹11L LPA base.",
    why: "Sharing your current salary instantly anchors you low. NDA protection is a highly professional blocker, forcing the discussion to stay focused on market rate."
  },
  {
    situation: "They state: 'This is our final offer, no room to negotiate'",
    weak: "Okay, I understand. I will accept it.",
    average: "Is there really no flexibility? If not, I guess I'll take it.",
    strong: "I completely understand the budget limits. If base salary is fixed, could we look at a sign-on bonus of ₹1 Lakh or adding 5 extra flexible paid leaves to make the package work?",
    best: "I respect that budget constraints are firm on base salary. Given that, can we incorporate an early performance review in writing after 6 months to adjust my compensation once my contribution is clear?",
    why: "When base salary is capped, shifting the lever to non-recurring cash (sign-on) or future milestones (6-month review) is a proven way to extract value without breaking corporate budgets."
  },
  {
    situation: "They apply urgency: 'We need an answer within 4 hours'",
    weak: "Okay, let me accept right now. Please send the link.",
    average: "That's very fast, but if I have to, I accept.",
    strong: "I'm very interested in joining. However, accepting a new role is a major career decision. I'd appreciate if you could give me until tomorrow morning to review the full details.",
    best: "I appreciate the speed. I want to make a fully committed decision. I will send my written response by 9:30 AM tomorrow. To help me decide, could you share the detailed benefits document?",
    why: "Forced urgency is almost always a bluff to prevent you from shopping the offer or thinking logically. Asking for a standard night to review is highly respected."
  }
];
