// ─────────────────────────────────────────────
// CRM v2 — Discovery Questions
// 10 core + dynamic friction branches
// Each option tags across 9 scoring dimensions
// ─────────────────────────────────────────────

export const coreQuestions = [
  {
    id: "q1",
    shortTitle: "Primary User",
    title: "Who is this chair primarily for?",
    options: [
      {
        id: "A", text: "Mostly for me", icon: "User",
        tags: [
          { dim: "buyerOrientation", val: "Recovery-Oriented", pts: 2 },
          { dim: "timing", val: "Hot", pts: 1 },
          { dim: "decisionComplexity", val: "Low", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 8 }
        ]
      },
      {
        id: "B", text: "Me and my partner", icon: "Users",
        tags: [
          { dim: "buyerOrientation", val: "Shared-Use", pts: 3 },
          { dim: "primaryFriction", val: "Spouse / joint decision", pts: 3 },
          { dim: "demoLane", val: "Shared Home Fit", pts: 2 },
          { dim: "decisionComplexity", val: "Medium", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 6 }
        ]
      },
      {
        id: "C", text: "A parent / family member", icon: "Heart",
        tags: [
          { dim: "buyerOrientation", val: "Value-Oriented", pts: 2 },
          { dim: "primaryFriction", val: "Confidence / service reassurance", pts: 2 },
          { dim: "demoLane", val: "Value Starter", pts: 1 },
          { dim: "decisionComplexity", val: "Medium", pts: 1 },
          { dim: "leadHeatBase", val: "base", pts: 5 }
        ]
      },
      {
        id: "D", text: "The whole household", icon: "Home",
        tags: [
          { dim: "buyerOrientation", val: "Shared-Use", pts: 3 },
          { dim: "primaryFriction", val: "Comparison overload", pts: 2 },
          { dim: "demoLane", val: "Shared Home Fit", pts: 3 },
          { dim: "decisionComplexity", val: "High", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 5 }
        ]
      },
      {
        id: "E", text: "Still figuring that out", icon: "HelpCircle",
        tags: [
          { dim: "buyerOrientation", val: "Research-Oriented", pts: 2 },
          { dim: "primaryFriction", val: "Comparison overload", pts: 2 },
          { dim: "decisionComplexity", val: "High", pts: 2 },
          { dim: "certaintyNeed", val: "High", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 3 }
        ]
      }
    ]
  },
  {
    id: "q2",
    shortTitle: "Visit Reason",
    title: "What brought you in today?",
    options: [
      {
        id: "A", text: "Pain / tension / recovery", icon: "Activity",
        tags: [
          { dim: "buyerOrientation", val: "Recovery-Oriented", pts: 3 },
          { dim: "demoLane", val: "Recovery Relief", pts: 3 },
          { dim: "timing", val: "Hot", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 8 }
        ]
      },
      {
        id: "B", text: "Better sleep / stress relief", icon: "Moon",
        tags: [
          { dim: "buyerOrientation", val: "Value-Oriented", pts: 2 },
          { dim: "demoLane", val: "Value Starter", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 6 }
        ]
      },
      {
        id: "C", text: "Comparing premium options", icon: "Crown",
        tags: [
          { dim: "buyerOrientation", val: "Premium-Certainty", pts: 3 },
          { dim: "demoLane", val: "Premium Certainty", pts: 3 },
          { dim: "timing", val: "Warm", pts: 1 },
          { dim: "leadHeatBase", val: "base", pts: 7 }
        ]
      },
      {
        id: "D", text: "Replacing an older chair", icon: "RefreshCcw",
        tags: [
          { dim: "buyerOrientation", val: "Premium-Certainty", pts: 2 },
          { dim: "timing", val: "Hot", pts: 2 },
          { dim: "certaintyNeed", val: "Low", pts: 1 },
          { dim: "leadHeatBase", val: "base", pts: 9 }
        ]
      },
      {
        id: "E", text: "Saw something online and wanted to try it", icon: "Monitor",
        tags: [
          { dim: "buyerOrientation", val: "Research-Oriented", pts: 2 },
          { dim: "demoLane", val: "Compare with Confidence", pts: 2 },
          { dim: "timing", val: "Warm", pts: 1 },
          { dim: "leadHeatBase", val: "base", pts: 6 }
        ]
      },
      {
        id: "F", text: "Just starting to explore", icon: "Map",
        tags: [
          { dim: "buyerOrientation", val: "Research-Oriented", pts: 3 },
          { dim: "primaryFriction", val: "Comparison overload", pts: 2 },
          { dim: "timing", val: "Cold", pts: 2 },
          { dim: "certaintyNeed", val: "High", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 3 }
        ]
      }
    ]
  },
  {
    id: "q3",
    shortTitle: "Daily Routine",
    title: "What best describes your day-to-day routine?",
    options: [
      {
        id: "A", text: "Desk / computer heavy", icon: "Monitor",
        tags: [
          { dim: "buyerOrientation", val: "Recovery-Oriented", pts: 2 },
          { dim: "demoLane", val: "Recovery Relief", pts: 2 },
          { dim: "followUpAngle", val: "precision + upper-back", pts: 2 }
        ]
      },
      {
        id: "B", text: "On my feet all day", icon: "Footprints",
        tags: [
          { dim: "buyerOrientation", val: "Recovery-Oriented", pts: 3 },
          { dim: "demoLane", val: "Recovery Relief", pts: 2 },
          { dim: "followUpAngle", val: "leg/foot recovery", pts: 2 }
        ]
      },
      {
        id: "C", text: "Active / workout / recovery focused", icon: "Dumbbell",
        tags: [
          { dim: "buyerOrientation", val: "Recovery-Oriented", pts: 3 },
          { dim: "demoLane", val: "Recovery Relief", pts: 3 },
          { dim: "timing", val: "Hot", pts: 1 },
          { dim: "leadHeatBase", val: "base", pts: 2 }
        ]
      },
      {
        id: "D", text: "Mixed lifestyle", icon: "Shuffle",
        tags: [
          { dim: "buyerOrientation", val: "Value-Oriented", pts: 1 },
          { dim: "demoLane", val: "Compare with Confidence", pts: 1 }
        ]
      },
      {
        id: "E", text: "Mostly shopping for someone else", icon: "Gift",
        tags: [
          { dim: "buyerOrientation", val: "Research-Oriented", pts: 2 },
          { dim: "primaryFriction", val: "Spouse / joint decision", pts: 1 },
          { dim: "certaintyNeed", val: "High", pts: 1 }
        ]
      }
    ]
  },
  {
    id: "q4",
    shortTitle: "Decision Priority",
    title: "What matters most if you decide today?",
    options: [
      {
        id: "A", text: "Best body fit and comfort", icon: "UserCheck",
        tags: [
          { dim: "buyerOrientation", val: "Premium-Certainty", pts: 2 },
          { dim: "demoLane", val: "Premium Certainty", pts: 2 },
          { dim: "certaintyNeed", val: "Medium", pts: 1 },
          { dim: "followUpAngle", val: "fit certainty", pts: 2 }
        ]
      },
      {
        id: "B", text: "Confidence I'm choosing the right model", icon: "ShieldCheck",
        tags: [
          { dim: "primaryFriction", val: "Confidence / service reassurance", pts: 3 },
          { dim: "certaintyNeed", val: "High", pts: 3 },
          { dim: "followUpAngle", val: "service certainty", pts: 3 }
        ]
      },
      {
        id: "C", text: "Monthly payment comfort", icon: "CreditCard",
        tags: [
          { dim: "primaryFriction", val: "Payment comfort", pts: 3 },
          { dim: "demoLane", val: "Value Starter", pts: 2 },
          { dim: "followUpAngle", val: "payment comfort", pts: 3 }
        ]
      },
      {
        id: "D", text: "Premium quality / long-term ownership", icon: "Crown",
        tags: [
          { dim: "buyerOrientation", val: "Premium-Certainty", pts: 3 },
          { dim: "demoLane", val: "Premium Certainty", pts: 2 },
          { dim: "timing", val: "Warm", pts: 1 },
          { dim: "leadHeatBase", val: "base", pts: 2 }
        ]
      },
      {
        id: "E", text: "Easy delivery / setup / fit at home", icon: "Truck",
        tags: [
          { dim: "primaryFriction", val: "Space-fit", pts: 2 },
          { dim: "primaryFriction", val: "Confidence / service reassurance", pts: 1 },
          { dim: "demoLane", val: "Space-Safe Fit", pts: 2 },
          { dim: "followUpAngle", val: "fit checklist", pts: 2 }
        ]
      }
    ]
  },
  {
    id: "q5",
    shortTitle: "Budget Band",
    title: "What level of investment feels right?",
    options: [
      {
        id: "A", text: "Under $4k", icon: "DollarSign",
        tags: [
          { dim: "budgetBand", val: "Under $4k", pts: 3 },
          { dim: "buyerOrientation", val: "Value-Oriented", pts: 3 },
          { dim: "demoLane", val: "Value Starter", pts: 3 }
        ]
      },
      {
        id: "B", text: "$4k – $8k", icon: "DollarSign",
        tags: [
          { dim: "budgetBand", val: "$4k-$8k", pts: 3 },
          { dim: "buyerOrientation", val: "Value-Oriented", pts: 1 },
          { dim: "demoLane", val: "Value Starter", pts: 1 }
        ]
      },
      {
        id: "C", text: "$8k – $12k", icon: "DollarSign",
        tags: [
          { dim: "budgetBand", val: "$8k-$12k", pts: 3 },
          { dim: "demoLane", val: "Compare with Confidence", pts: 2 }
        ]
      },
      {
        id: "D", text: "$12k – $16k", icon: "DollarSign",
        tags: [
          { dim: "budgetBand", val: "$12k-$16k", pts: 3 },
          { dim: "buyerOrientation", val: "Premium-Certainty", pts: 2 },
          { dim: "demoLane", val: "Premium Certainty", pts: 2 }
        ]
      },
      {
        id: "E", text: "$16k+", icon: "DollarSign",
        tags: [
          { dim: "budgetBand", val: "$16k+", pts: 3 },
          { dim: "buyerOrientation", val: "Premium-Certainty", pts: 3 },
          { dim: "demoLane", val: "Premium Certainty", pts: 3 },
          { dim: "timing", val: "Hot", pts: 1 }
        ]
      },
      {
        id: "F", text: "Prefer to choose first, then compare payment options", icon: "Search",
        tags: [
          { dim: "budgetBand", val: "Flexible", pts: 2 },
          { dim: "primaryFriction", val: "Payment comfort", pts: 1 },
          { dim: "demoLane", val: "Compare with Confidence", pts: 1 }
        ]
      }
    ]
  },
  {
    id: "q6",
    shortTitle: "Decision Structure",
    title: "How do you usually make a purchase like this?",
    options: [
      {
        id: "A", text: "I can decide on my own", icon: "User",
        tags: [
          { dim: "decisionComplexity", val: "Low", pts: 3 },
          { dim: "timing", val: "Hot", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 5 }
        ]
      },
      {
        id: "B", text: "I decide with my partner", icon: "Users",
        tags: [
          { dim: "primaryFriction", val: "Spouse / joint decision", pts: 3 },
          { dim: "decisionComplexity", val: "High", pts: 2 },
          { dim: "followUpAngle", val: "spouse summary", pts: 3 }
        ]
      },
      {
        id: "C", text: "I want to narrow it down first, then think", icon: "Filter",
        tags: [
          { dim: "primaryFriction", val: "Think-about-it inertia", pts: 2 },
          { dim: "decisionComplexity", val: "Medium", pts: 2 },
          { dim: "certaintyNeed", val: "High", pts: 2 }
        ]
      },
      {
        id: "D", text: "I need to compare a few models clearly", icon: "Columns",
        tags: [
          { dim: "primaryFriction", val: "Comparison overload", pts: 3 },
          { dim: "demoLane", val: "Compare with Confidence", pts: 2 },
          { dim: "decisionComplexity", val: "Medium", pts: 1 }
        ]
      },
      {
        id: "E", text: "I need to confirm space / measurements first", icon: "Maximize",
        tags: [
          { dim: "primaryFriction", val: "Space-fit", pts: 3 },
          { dim: "demoLane", val: "Space-Safe Fit", pts: 3 },
          { dim: "followUpAngle", val: "fit checklist", pts: 3 }
        ]
      }
    ]
  },
  {
    id: "q7",
    shortTitle: "Body Focus",
    title: "When you try a chair, where do you most want to feel the difference?",
    options: [
      {
        id: "A", text: "Neck / shoulders", icon: "User",
        tags: [
          { dim: "demoLane", val: "Premium Certainty", pts: 1 },
          { dim: "demoLane", val: "Recovery Relief", pts: 1 },
          { dim: "followUpAngle", val: "precision + upper-back", pts: 2 }
        ]
      },
      {
        id: "B", text: "Lower back / hips / glutes", icon: "Activity",
        tags: [
          { dim: "demoLane", val: "Recovery Relief", pts: 2 },
          { dim: "followUpAngle", val: "lower-body recovery", pts: 2 }
        ]
      },
      {
        id: "C", text: "Legs / calves / feet", icon: "Footprints",
        tags: [
          { dim: "demoLane", val: "Recovery Relief", pts: 1 },
          { dim: "followUpAngle", val: "leg/foot recovery", pts: 2 }
        ]
      },
      {
        id: "D", text: "Full-body stretch", icon: "Maximize",
        tags: [
          { dim: "demoLane", val: "Premium Certainty", pts: 1 },
          { dim: "demoLane", val: "Compare with Confidence", pts: 1 }
        ]
      },
      {
        id: "E", text: "Overall premium feel", icon: "Sparkles",
        tags: [
          { dim: "buyerOrientation", val: "Premium-Certainty", pts: 2 },
          { dim: "demoLane", val: "Premium Certainty", pts: 2 },
          { dim: "followUpAngle", val: "premium certainty", pts: 2 }
        ]
      }
    ]
  },
  {
    id: "q8",
    shortTitle: "Decision Simplifier",
    title: "What would make this decision easiest today?",
    options: [
      {
        id: "A", text: "Seeing the best 2 options only", icon: "Target",
        tags: [
          { dim: "primaryFriction", val: "Comparison overload", pts: 2 },
          { dim: "timing", val: "Hot", pts: 1 },
          { dim: "leadHeatBase", val: "base", pts: 3 }
        ]
      },
      {
        id: "B", text: "A clear premium vs value comparison", icon: "Columns",
        tags: [
          { dim: "primaryFriction", val: "Comparison overload", pts: 2 },
          { dim: "demoLane", val: "Compare with Confidence", pts: 2 },
          { dim: "followUpAngle", val: "comparison simplifier", pts: 3 }
        ]
      },
      {
        id: "C", text: "Monthly payment clarity", icon: "CreditCard",
        tags: [
          { dim: "primaryFriction", val: "Payment comfort", pts: 3 },
          { dim: "followUpAngle", val: "payment comfort", pts: 3 }
        ]
      },
      {
        id: "D", text: "Service / warranty clarity", icon: "ShieldCheck",
        tags: [
          { dim: "primaryFriction", val: "Confidence / service reassurance", pts: 3 },
          { dim: "followUpAngle", val: "service certainty", pts: 3 }
        ]
      },
      {
        id: "E", text: "Space-fit clarity", icon: "Maximize",
        tags: [
          { dim: "primaryFriction", val: "Space-fit", pts: 3 },
          { dim: "demoLane", val: "Space-Safe Fit", pts: 2 },
          { dim: "followUpAngle", val: "fit checklist", pts: 3 }
        ]
      }
    ]
  },
  {
    id: "q9",
    shortTitle: "Blocker",
    title: "If we find the right chair today, what would still stop you from moving forward?",
    options: [
      {
        id: "A", text: "I'd want to think about it", icon: "Clock",
        tags: [
          { dim: "primaryFriction", val: "Think-about-it inertia", pts: 3 },
          { dim: "timing", val: "Cold", pts: 1 },
          { dim: "certaintyNeed", val: "High", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: -3 }
        ]
      },
      {
        id: "B", text: "I'd need my partner involved", icon: "Users",
        tags: [
          { dim: "primaryFriction", val: "Spouse / joint decision", pts: 3 },
          { dim: "followUpAngle", val: "spouse summary", pts: 3 },
          { dim: "decisionComplexity", val: "High", pts: 2 }
        ]
      },
      {
        id: "C", text: "I need to confirm measurements / space", icon: "Maximize",
        tags: [
          { dim: "primaryFriction", val: "Space-fit", pts: 3 },
          { dim: "followUpAngle", val: "fit checklist", pts: 3 }
        ]
      },
      {
        id: "D", text: "I want to compare payment options", icon: "CreditCard",
        tags: [
          { dim: "primaryFriction", val: "Payment comfort", pts: 3 },
          { dim: "followUpAngle", val: "payment comfort", pts: 3 }
        ]
      },
      {
        id: "E", text: "Nothing major if it feels right", icon: "CheckCircle",
        tags: [
          { dim: "timing", val: "Hot", pts: 3 },
          { dim: "decisionComplexity", val: "Low", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 8 }
        ]
      }
    ]
  },
  {
    id: "q10",
    shortTitle: "Timing",
    title: "How soon would you ideally like to start using your chair?",
    options: [
      {
        id: "A", text: "As soon as possible", icon: "Zap",
        tags: [
          { dim: "timing", val: "Hot", pts: 3 },
          { dim: "leadHeatBase", val: "base", pts: 10 }
        ]
      },
      {
        id: "B", text: "Within the next 1–2 weeks", icon: "Calendar",
        tags: [
          { dim: "timing", val: "Hot", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 7 }
        ]
      },
      {
        id: "C", text: "Within the next month", icon: "CalendarDays",
        tags: [
          { dim: "timing", val: "Warm", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 4 }
        ]
      },
      {
        id: "D", text: "Just researching for now", icon: "Search",
        tags: [
          { dim: "timing", val: "Cold", pts: 3 },
          { dim: "certaintyNeed", val: "High", pts: 2 },
          { dim: "leadHeatBase", val: "base", pts: 1 }
        ]
      }
    ]
  }
];


// ─────────────────────────────────────────────
// Dynamic Friction Branches
// System picks the 2 questions from the highest-scoring friction
// ─────────────────────────────────────────────

export const frictionBranches = {
  "Spouse / joint decision": [
    {
      id: "fq_spouse_1",
      shortTitle: "Spouse Summary",
      title: "Would a short side-by-side summary help you review this together later?",
      options: [
        { id: "A", text: "Yes, simple comparison", icon: "FileText", tags: [{ dim: "followUpAngle", val: "spouse summary", pts: 2 }] },
        { id: "B", text: "Yes, only top choice", icon: "Star", tags: [{ dim: "followUpAngle", val: "spouse summary", pts: 1 }] },
        { id: "C", text: "No", icon: "X", tags: [] }
      ]
    },
    {
      id: "fq_spouse_2",
      shortTitle: "Partner Priority",
      title: "What would matter most to your partner?",
      options: [
        { id: "A", text: "Price / payment", icon: "DollarSign", tags: [{ dim: "primaryFriction", val: "Payment comfort", pts: 1 }] },
        { id: "B", text: "Space / size", icon: "Maximize", tags: [{ dim: "primaryFriction", val: "Space-fit", pts: 1 }] },
        { id: "C", text: "Trust / service", icon: "ShieldCheck", tags: [{ dim: "primaryFriction", val: "Confidence / service reassurance", pts: 1 }] },
        { id: "D", text: "Comfort for both of us", icon: "Heart", tags: [{ dim: "demoLane", val: "Shared Home Fit", pts: 2 }] }
      ]
    }
  ],

  "Payment comfort": [
    {
      id: "fq_payment_1",
      shortTitle: "Payment Optimize",
      title: "Would you rather optimize for lowest monthly payment or best long-term value?",
      options: [
        { id: "A", text: "Lowest monthly payment", icon: "ArrowDown", tags: [{ dim: "demoLane", val: "Value Starter", pts: 2 }, { dim: "followUpAngle", val: "payment comfort", pts: 2 }] },
        { id: "B", text: "Best long-term value", icon: "TrendingUp", tags: [{ dim: "demoLane", val: "Compare with Confidence", pts: 1 }] },
        { id: "C", text: "Premium model if payments feel comfortable", icon: "Crown", tags: [{ dim: "demoLane", val: "Premium Certainty", pts: 1 }, { dim: "buyerOrientation", val: "Premium-Certainty", pts: 1 }] },
        { id: "D", text: "Need both compared", icon: "Columns", tags: [{ dim: "followUpAngle", val: "payment comfort", pts: 2 }] }
      ]
    },
    {
      id: "fq_payment_2",
      shortTitle: "Cash vs Finance",
      title: "Would seeing cash vs financing side by side help today?",
      options: [
        { id: "A", text: "Yes", icon: "Check", tags: [{ dim: "followUpAngle", val: "payment comfort", pts: 2 }] },
        { id: "B", text: "Maybe later", icon: "Clock", tags: [] },
        { id: "C", text: "No", icon: "X", tags: [] }
      ]
    }
  ],

  "Space-fit": [
    {
      id: "fq_space_1",
      shortTitle: "Room Placement",
      title: "Where will the chair most likely go?",
      options: [
        { id: "A", text: "Living room", icon: "Tv", tags: [] },
        { id: "B", text: "Bedroom", icon: "Moon", tags: [] },
        { id: "C", text: "Office", icon: "Briefcase", tags: [] },
        { id: "D", text: "Dedicated wellness room", icon: "Sparkles", tags: [] },
        { id: "E", text: "Not sure yet", icon: "HelpCircle", tags: [{ dim: "primaryFriction", val: "Space-fit", pts: 1 }] }
      ]
    },
    {
      id: "fq_space_2",
      shortTitle: "Measurements Ready",
      title: "Do you already know the measurements?",
      options: [
        { id: "A", text: "Yes", icon: "Check", tags: [{ dim: "timing", val: "Hot", pts: 1 }] },
        { id: "B", text: "Roughly", icon: "Minus", tags: [] },
        { id: "C", text: "Not yet", icon: "X", tags: [{ dim: "followUpAngle", val: "fit checklist", pts: 2 }] }
      ]
    }
  ],

  "Comparison overload": [
    {
      id: "fq_compare_1",
      shortTitle: "Compare Scope",
      title: "Would you rather start with the best 2 only or compare 3–4?",
      options: [
        { id: "A", text: "Best 2 only", icon: "Target", tags: [{ dim: "timing", val: "Hot", pts: 1 }] },
        { id: "B", text: "3–4", icon: "Layers", tags: [{ dim: "primaryFriction", val: "Comparison overload", pts: 1 }] },
        { id: "C", text: "Still browsing", icon: "Search", tags: [{ dim: "timing", val: "Cold", pts: 1 }] }
      ]
    },
    {
      id: "fq_compare_2",
      shortTitle: "Decision Simplifier",
      title: "What would simplify the decision most?",
      options: [
        { id: "A", text: "Fit", icon: "UserCheck", tags: [{ dim: "followUpAngle", val: "fit certainty", pts: 2 }] },
        { id: "B", text: "Premium vs value", icon: "Columns", tags: [{ dim: "followUpAngle", val: "comparison simplifier", pts: 2 }] },
        { id: "C", text: "Service / warranty", icon: "ShieldCheck", tags: [{ dim: "followUpAngle", val: "service certainty", pts: 2 }] },
        { id: "D", text: "Brand differences", icon: "Tag", tags: [{ dim: "followUpAngle", val: "comparison simplifier", pts: 2 }] }
      ]
    }
  ],

  "Confidence / service reassurance": [
    {
      id: "fq_confidence_1",
      shortTitle: "Confidence Builder",
      title: "What would help you feel fully confident?",
      options: [
        { id: "A", text: "Warranty / service clarity", icon: "ShieldCheck", tags: [{ dim: "followUpAngle", val: "service certainty", pts: 2 }] },
        { id: "B", text: "Delivery / setup clarity", icon: "Truck", tags: [{ dim: "followUpAngle", val: "fit checklist", pts: 2 }] },
        { id: "C", text: "Brand reputation", icon: "Award", tags: [{ dim: "followUpAngle", val: "premium certainty", pts: 1 }] },
        { id: "D", text: "Knowing this is the right fit", icon: "UserCheck", tags: [{ dim: "followUpAngle", val: "fit certainty", pts: 2 }] }
      ]
    },
    {
      id: "fq_confidence_2",
      shortTitle: "First Purchase",
      title: "Is this your first serious massage chair purchase?",
      options: [
        { id: "A", text: "Yes", icon: "PlusCircle", tags: [{ dim: "certaintyNeed", val: "High", pts: 2 }] },
        { id: "B", text: "No", icon: "MinusCircle", tags: [{ dim: "certaintyNeed", val: "Low", pts: 1 }, { dim: "timing", val: "Warm", pts: 1 }] }
      ]
    }
  ],

  // Fallback — if "Think-about-it inertia" wins, we still need 2 questions
  "Think-about-it inertia": [
    {
      id: "fq_think_1",
      shortTitle: "Hesitation Root",
      title: "What would help you feel ready sooner?",
      options: [
        { id: "A", text: "Seeing the best 2 options clearly", icon: "Target", tags: [{ dim: "followUpAngle", val: "comparison simplifier", pts: 2 }] },
        { id: "B", text: "Understanding total cost of ownership", icon: "Calculator", tags: [{ dim: "followUpAngle", val: "payment comfort", pts: 2 }] },
        { id: "C", text: "Knowing the return / warranty policy", icon: "ShieldCheck", tags: [{ dim: "followUpAngle", val: "service certainty", pts: 2 }] },
        { id: "D", text: "Having more time in the chair", icon: "Clock", tags: [{ dim: "followUpAngle", val: "premium certainty", pts: 1 }] }
      ]
    },
    {
      id: "fq_think_2",
      shortTitle: "Timeline Unlock",
      title: "If everything checked out, when would feel right?",
      options: [
        { id: "A", text: "This week", icon: "Zap", tags: [{ dim: "timing", val: "Hot", pts: 2 }, { dim: "leadHeatBase", val: "base", pts: 5 }] },
        { id: "B", text: "Within a month", icon: "Calendar", tags: [{ dim: "timing", val: "Warm", pts: 1 }] },
        { id: "C", text: "Not sure", icon: "HelpCircle", tags: [{ dim: "timing", val: "Cold", pts: 1 }] }
      ]
    }
  ]
};
