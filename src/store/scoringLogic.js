// ─────────────────────────────────────────────
// CRM v2 — Discovery Scoring Engine
// 9 dimensions, 6 demo lanes, budget-aware chair reco
// ─────────────────────────────────────────────

import { productKnowledge } from '../data/productKnowledge';

// ── Budget Band Ranges (salePrice) ──

const BUDGET_RANGES = {
  "Under $4k": { min: 0, max: 4000 },
  "$4k-$8k": { min: 4000, max: 8000 },
  "$8k-$12k": { min: 8000, max: 12000 },
  "$12k-$16k": { min: 12000, max: 16000 },
  "$16k+": { min: 16000, max: Infinity },
  "Flexible": { min: 0, max: Infinity }
};

// ── Get chairs that fit within a budget band ──

function getChairsInBudget(budgetBand) {
  const range = BUDGET_RANGES[budgetBand];
  if (!range) return null; // all chairs allowed
  const matching = [];
  Object.entries(productKnowledge).forEach(([name, data]) => {
    const price = data.pricing?.salePrice || data.pricing?.listPrice || 0;
    if (price >= range.min && price <= range.max) {
      matching.push(name);
    }
  });
  return matching;
}

function getChairPrice(name) {
  return productKnowledge[name]?.pricing?.salePrice || productKnowledge[name]?.pricing?.listPrice || 0;
}

function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

// ── Friction Priority ──

const FRICTION_PRIORITY = [
  "Space-fit",
  "Payment comfort",
  "Spouse / joint decision",
  "Comparison overload",
  "Confidence / service reassurance",
  "Think-about-it inertia"
];

// ── Chair Recommendation Matrix ──
// Each demo lane has ideal / framing / emphasis / warnings / likelyObjection
// Chairs are ordered by price tier (low → high)

const CHAIR_MATRIX = {
  "Value Starter": {
    chairs: ["Solara", "Brio Plus", "Panasonic MAF1", "KOYO 303TS", "DualTech 4D"],
    idealCount: 2,
    framing: "Start with Solara as accessible entry, then step up to Brio Plus for fuller feature set. Position value without undermining quality.",
    emphasize: ["SL-Track coverage", "True Zero Gravity", "heat therapy", "easy controls", "no assembly"],
    doNotLeadWith: ["Don't start with premium tier pricing", "Don't compare against $10k+ chairs", "Don't create comparison overload"],
    likelyObjection: "payment"
  },
  "Recovery Relief": {
    chairs: ["Brio Sport", "DualTech Pro AI 4D", "DualTech 4D", "D.Core Stratus JP", "Brio Plus"],
    idealCount: 2,
    framing: "Focus on active recovery feel and body-specific attention. Lead with the strongest deep-tissue and recovery-oriented models in their budget.",
    emphasize: ["deep-tissue intensity", "neck/shoulder precision", "lower-body recovery", "guided programs", "calf/foot work"],
    doNotLeadWith: ["Don't lead with aesthetics over function", "Don't show more than 2 chairs initially"],
    likelyObjection: "think about it"
  },
  "Premium Certainty": {
    chairs: ["OHCO M8 NEO LE", "Panasonic MAN1", "OHCO M8 NEO", "D.Core Cirrus JP", "D.Core 2", "Panasonic MAK1"],
    idealCount: 2,
    framing: "Lead with the highest-tier models within budget. Emphasize service, warranty, installation confidence, and premium craftsmanship. These buyers want to feel certain, not sold.",
    emphasize: ["premium build quality", "service/warranty certainty", "precision mechanisms", "full-body coverage", "design aesthetics"],
    doNotLeadWith: ["Don't start with price", "Don't position as value play", "Don't show entry-level models"],
    likelyObjection: "comparison"
  },
  "Shared Home Fit": {
    chairs: ["Brio Plus", "KOYO 303TS", "DualTech 4D", "Panasonic MAF1", "Solara"],
    idealCount: 2,
    framing: "Focus on adaptability and shared-use comfort. Both chairs work well for varied heights and preferences. Emphasize easy controls for multiple users.",
    emphasize: ["multi-user comfort", "easy controls", "body scan adaptation", "space efficiency", "shared daily use"],
    doNotLeadWith: ["Don't focus on single-user precision story", "Don't create feature overload"],
    likelyObjection: "spouse"
  },
  "Compare with Confidence": {
    chairs: ["D.Core Stratus JP", "OHCO R6", "D.Core Cirrus JP", "Panasonic MAN1", "OHCO M8 NEO", "Brio Sport", "DualTech Pro AI 4D"],
    idealCount: 2,
    framing: "Place a strong premium model next to a precision model to help them see the contrast. Let the chairs sell themselves through direct comparison.",
    emphasize: ["side-by-side difference", "design vs precision trade-off", "build quality feel", "service confidence"],
    doNotLeadWith: ["Don't show more than 2 chairs first", "Don't rush the comparison"],
    likelyObjection: "comparison"
  },
  "Space-Safe Fit": {
    chairs: ["Panasonic MAF1", "DualTech 4D", "Brio Plus", "Solara", "OHCO R6", "D.Core Cirrus JP"],
    idealCount: 2,
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

  for (const fric of FRICTION_PRIORITY) {
    if (candidates.includes(fric)) return fric;
  }
  return candidates[0];
}

// ── Lead Heat Base Calculation ──

function calculateLeadHeatBase(allAnswers) {
  let base = 30;
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

// ── Budget-Aware Chair Selection ──
// Picks the best chairs from the lane's pool that actually fit the budget

function selectChairsForBudget(lane, budgetBand) {
  const laneData = CHAIR_MATRIX[lane];
  if (!laneData) return { topChairs: [], backupChairs: [] };

  const laneChairs = laneData.chairs;
  const affordableChairs = getChairsInBudget(budgetBand);

  // If budget is Flexible or no restriction, use lane order
  if (!affordableChairs || budgetBand === "Flexible") {
    return {
      topChairs: laneChairs.slice(0, laneData.idealCount),
      backupChairs: laneChairs.slice(laneData.idealCount, laneData.idealCount + 2)
    };
  }

  // Filter lane chairs by budget
  const inBudget = laneChairs.filter(c => affordableChairs.includes(c));

  // If budget allows some lane chairs, use them
  if (inBudget.length >= 2) {
    return {
      topChairs: inBudget.slice(0, laneData.idealCount),
      backupChairs: inBudget.slice(laneData.idealCount, laneData.idealCount + 2)
    };
  }

  // If only 1 chair in budget from the lane, add one from global budget pool
  if (inBudget.length === 1) {
    // Find next best affordable chair not already selected
    const globalAffordable = affordableChairs.filter(c => !inBudget.includes(c));
    const backup = globalAffordable.length > 0 ? globalAffordable[0] : null;
    return {
      topChairs: backup ? [inBudget[0], backup] : [inBudget[0]],
      backupChairs: laneChairs.filter(c => !inBudget.includes(c) && c !== backup).slice(0, 2)
    };
  }

  // No lane chairs fit budget → use most affordable from ALL chairs
  const allSorted = Object.entries(productKnowledge)
    .filter(([, d]) => d.category === "massage-chair")
    .map(([name, d]) => ({ name, price: d.pricing?.salePrice || d.pricing?.listPrice || 0 }))
    .filter(c => {
      const range = BUDGET_RANGES[budgetBand];
      return range && c.price >= range.min && c.price <= range.max;
    })
    .sort((a, b) => b.price - a.price); // best value first (highest in range)

  const fallback = allSorted.slice(0, laneData.idealCount).map(c => c.name);
  const fallbackBackup = allSorted.slice(laneData.idealCount, laneData.idealCount + 2).map(c => c.name);

  return {
    topChairs: fallback.length > 0 ? fallback : laneChairs.slice(0, laneData.idealCount),
    backupChairs: fallbackBackup.length > 0 ? fallbackBackup : laneChairs.slice(laneData.idealCount, laneData.idealCount + 2)
  };
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

  // Budget-aware chair selection
  const { topChairs, backupChairs } = selectChairsForBudget(lane, budget);

  // Get lane metadata
  const laneData = CHAIR_MATRIX[lane] || CHAIR_MATRIX["Compare with Confidence"];

  // Build price context for match reason
  const priceContext = topChairs.map(c => `${c} (${formatPrice(getChairPrice(c))})`).join(' and ');

  // Match reason based on buyer orientation
  const matchReasons = {
    "Value-Oriented": `Based on your focus on long-term value and daily comfort, we've selected ${priceContext} — the strongest experience within your budget range.`,
    "Premium-Certainty": `Because you prioritize uncompromising quality and premium feel, we've selected ${priceContext} — top-tier models that deliver absolute certainty in craftsmanship and service.`,
    "Recovery-Oriented": `Since you're looking for real recovery and body-specific relief, we've selected ${priceContext} — models with the strongest deep-tissue and targeted massage systems in your range.`,
    "Shared-Use": `Understanding that multiple people will use this chair, we've selected ${priceContext} — highly adaptable models that accommodate varied preferences and body types.`,
    "Research-Oriented": `To help you compare the best options with full clarity, we've selected ${priceContext} — two distinct models that showcase the real differences in premium massage technology.`
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

    // Chair recommendations (budget-filtered)
    topChairs,
    backupChairs,

    // Rep guidance
    repFraming: laneData.framing,
    emphasize: laneData.emphasize || [],
    doNotLeadWith: laneData.doNotLeadWith || [],
    likelyObjection: laneData.likelyObjection || "think about it",
    matchReason: matchReasons[buyer] || `We've selected ${priceContext} — the exact models to match your lifestyle and budget.`,

    // Raw scores for debugging / dashboard
    rawScores: dimensions
  };
}
