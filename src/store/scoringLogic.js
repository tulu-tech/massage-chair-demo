// ─────────────────────────────────────────────
// CRM v2 — Discovery Scoring Engine
// 9 dimensions, 6 demo lanes, budget-aware chair reco
// ─────────────────────────────────────────────

const FRICTION_PRIORITY = [
  "Space-fit",
  "Payment comfort",
  "Spouse / joint decision",
  "Comparison overload",
  "Confidence / service reassurance",
  "Think-about-it inertia"
];

// ── Chair Recommendation Matrix ──
// Each demo lane has primary / backup / framing / emphasis / warnings / likelyObjection

const CHAIR_MATRIX = {
  "Value Starter": {
    primary: ["Solara", "Brio Plus"],
    backup: ["Panasonic MAF1"],
    framing: "Start with Solara as accessible entry, then step up to Brio Plus for fuller feature set. Position value without undermining quality.",
    emphasize: ["SL-Track coverage", "True Zero Gravity", "heat therapy", "easy controls", "no assembly"],
    doNotLeadWith: ["Don't start with premium tier pricing", "Don't compare against $10k+ chairs", "Don't create comparison overload"],
    likelyObjection: "payment"
  },
  "Recovery Relief": {
    primary: ["Brio Sport", "DualTech Pro AI 4D"],
    backup: ["DualTech 4D"],
    framing: "Focus on active recovery feel and body-specific attention. Lead with Brio Sport for deep-tissue power, DualTech Pro AI for AI-guided layered approach.",
    emphasize: ["deep-tissue intensity", "neck/shoulder precision", "lower-body recovery", "guided programs", "calf/foot work"],
    doNotLeadWith: ["Don't lead with aesthetics over function", "Don't show more than 2 chairs initially"],
    likelyObjection: "think about it"
  },
  "Premium Certainty": {
    primary: ["Panasonic MAN1", "OHCO M8 NEO LE"],
    backup: ["D.Core 2", "D.Core Cirrus JP"],
    framing: "Lead with the highest-tier models. Emphasize service, warranty, installation confidence, and premium craftsmanship. These buyers want to feel certain, not sold.",
    emphasize: ["premium build quality", "service/warranty certainty", "precision mechanisms", "full-body coverage", "design aesthetics"],
    doNotLeadWith: ["Don't start with price", "Don't position as value play", "Don't show entry-level models"],
    likelyObjection: "comparison"
  },
  "Shared Home Fit": {
    primary: ["Brio Plus", "KOYO 303TS"],
    backup: ["DualTech 4D"],
    framing: "Focus on adaptability and shared-use comfort. Both chairs work well for varied heights and preferences. Emphasize easy controls for multiple users.",
    emphasize: ["multi-user comfort", "easy controls", "body scan adaptation", "space efficiency", "shared daily use"],
    doNotLeadWith: ["Don't focus on single-user precision story", "Don't create feature overload"],
    likelyObjection: "spouse"
  },
  "Compare with Confidence": {
    primary: ["D.Core Stratus JP", "OHCO R6"],
    backup: ["D.Core Cirrus JP", "Panasonic MAN1"],
    budgetUpgrade: { "$12k-$16k": ["D.Core Cirrus JP", "Panasonic MAN1"], "$16k+": ["OHCO M8 NEO LE", "Panasonic MAN1"] },
    framing: "Place a strong premium model next to a precision model to help them see the contrast. Let the chairs sell themselves through direct comparison.",
    emphasize: ["side-by-side difference", "design vs precision trade-off", "build quality feel", "service confidence"],
    doNotLeadWith: ["Don't show more than 2 chairs first", "Don't rush the comparison"],
    likelyObjection: "comparison"
  },
  "Space-Safe Fit": {
    primary: ["Panasonic MAF1", "DualTech 4D"],
    backup: ["Brio Plus", "OHCO R6", "D.Core Cirrus JP"],
    framing: "Ensure they know these models physically fit their space. Lead with compact footprint and wall-hugging features before discussing massage quality.",
    emphasize: ["compact footprint", "wall-hugging recline", "space dimensions", "room-friendly design"],
    doNotLeadWith: ["Don't start with features before addressing space concern", "Don't show wide-footprint models"],
    likelyObjection: "space"
  }
};

// ── Dimension Aggregation ──

function aggregateDimension(allAnswers, dimName) {
  const scores = {};
  allAnswers.forEach(ans => {
    if (ans.tags) {
      ans.tags.forEach(t => {
        if (t.dim === dimName) {
          scores[t.val] = (scores[t.val] || 0) + t.pts;
        }
      });
    }
  });
  return scores;
}

function getTopValue(scoreObj, defaultVal) {
  let top = defaultVal;
  let max = -Infinity;
  Object.keys(scoreObj).forEach(k => {
    if (scoreObj[k] > max) {
      max = scoreObj[k];
      top = k;
    }
  });
  return top;
}

// ── Branch Target (determines which friction branch to show) ──

export function calculateBranchTarget(answers) {
  const frictionScores = aggregateDimension(answers, "primaryFriction");

  let maxScore = -1;
  let candidates = [];

  Object.keys(frictionScores).forEach(fric => {
    if (frictionScores[fric] > maxScore) {
      maxScore = frictionScores[fric];
      candidates = [fric];
    } else if (frictionScores[fric] === maxScore) {
      candidates.push(fric);
    }
  });

  if (candidates.length === 0) return "Comparison overload";
  if (candidates.length === 1) return candidates[0];

  // Tie breaker: follow priority order
  for (const fric of FRICTION_PRIORITY) {
    if (candidates.includes(fric)) return fric;
  }
  return candidates[0];
}

// ── Lead Heat Base Calculation ──

function calculateLeadHeatBase(allAnswers) {
  let base = 30; // starting base
  allAnswers.forEach(ans => {
    if (ans.tags) {
      ans.tags.forEach(t => {
        if (t.dim === "leadHeatBase" && t.val === "base") {
          base += t.pts;
        }
      });
    }
  });
  return Math.min(Math.max(base, 0), 100);
}

// ── Main Intelligence Calculator ──

export function calculateFinalIntelligence(allAnswers) {
  const dimensions = {
    buyerOrientation: aggregateDimension(allAnswers, "buyerOrientation"),
    primaryFriction: aggregateDimension(allAnswers, "primaryFriction"),
    demoLane: aggregateDimension(allAnswers, "demoLane"),
    budgetBand: aggregateDimension(allAnswers, "budgetBand"),
    timing: aggregateDimension(allAnswers, "timing"),
    decisionComplexity: aggregateDimension(allAnswers, "decisionComplexity"),
    certaintyNeed: aggregateDimension(allAnswers, "certaintyNeed"),
    followUpAngle: aggregateDimension(allAnswers, "followUpAngle")
  };

  const buyer = getTopValue(dimensions.buyerOrientation, "Value-Oriented");
  const friction = getTopValue(dimensions.primaryFriction, "Comparison overload");
  const lane = getTopValue(dimensions.demoLane, "Compare with Confidence");
  const budget = getTopValue(dimensions.budgetBand, "Flexible");
  const time = getTopValue(dimensions.timing, "Warm");
  const complexity = getTopValue(dimensions.decisionComplexity, "Medium");
  const certainty = getTopValue(dimensions.certaintyNeed, "Medium");
  const followUp = getTopValue(dimensions.followUpAngle, "comparison simplifier");
  const leadHeatBase = calculateLeadHeatBase(allAnswers);

  // Get lane data with budget-aware override
  let laneData = CHAIR_MATRIX[lane] || CHAIR_MATRIX["Compare with Confidence"];
  let topChairs = [...laneData.primary];
  let backupChairs = [...laneData.backup];

  // Budget-aware upgrade for Compare with Confidence lane
  if (lane === "Compare with Confidence" && laneData.budgetUpgrade && laneData.budgetUpgrade[budget]) {
    topChairs = laneData.budgetUpgrade[budget];
  }

  // Match reason based on buyer orientation
  const matchReasons = {
    "Value-Oriented": `Based on your focus on long-term value and daily comfort, we've selected models that deliver the strongest experience per dollar — without feeling like a compromise.`,
    "Premium-Certainty": `Because you prioritize uncompromising quality and premium feel, we've selected top-tier models that deliver absolute certainty in craftsmanship and service.`,
    "Recovery-Oriented": `Since you're looking for real recovery and body-specific relief, we've selected models with the strongest deep-tissue and targeted massage systems.`,
    "Shared-Use": `Understanding that multiple people will use this chair, we've prioritized highly adaptable models that accommodate varied preferences and body types.`,
    "Research-Oriented": `To help you compare the best options with full clarity, we've selected two distinct models that showcase the real differences in premium massage technology.`
  };

  return {
    // Core dimensions
    buyerOrientation: buyer,
    primaryFriction: friction,
    demoLane: lane,
    budgetBand: budget,
    timing: time,
    decisionComplexity: complexity,
    certaintyNeed: certainty,
    followUpAngle: followUp,
    leadHeatBase,

    // Chair recommendations
    topChairs,
    backupChairs,

    // Rep guidance
    repFraming: laneData.framing,
    emphasize: laneData.emphasize || [],
    doNotLeadWith: laneData.doNotLeadWith || [],
    likelyObjection: laneData.likelyObjection || "think about it",
    matchReason: matchReasons[buyer] || "We've carefully evaluated your unique preferences and selected the exact models to match your lifestyle.",

    // Raw scores for debugging / dashboard
    rawScores: dimensions
  };
}
