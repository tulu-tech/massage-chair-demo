// ─────────────────────────────────────────────
// CRM v2 — Final Decision Engine
// Merges discovery + demo signals to produce:
//   final best-fit chair, backup, real objection,
//   lead temperature, next best action, follow-up angle
// ─────────────────────────────────────────────

import { calculateDemoScore, calculateFinalLeadTemperature } from './demoScoringLogic';

// ── Chair Scoring Weights ──
// Discovery fit = 35%, Demo reaction = 25%, Most time = 10%,
// Most questions = 10%, Rep best-fit = 15%, Objection alignment = 5%

const WEIGHTS = {
  discoveryFit: 0.35,
  demoReaction: 0.25,
  mostTimeSpent: 0.10,
  mostQuestions: 0.10,
  repBestFit: 0.15,
  objectionAlignment: 0.05
};

// ── Objection Alignment Map ──
// When a specific objection is present, certain chairs gain advantage

const OBJECTION_CHAIR_AFFINITY = {
  "Space / measurements": ["Panasonic MAF1", "DualTech 4D", "Solara", "Brio Plus"],
  "Price / payment": ["Solara", "Brio Plus", "Panasonic MAF1", "DualTech 4D", "KOYO 303TS"],
  "Not fully convinced on fit": ["Panasonic MAN1", "D.Core Cirrus JP", "OHCO M8 NEO LE"],
  "Partner / spouse": ["Brio Plus", "KOYO 303TS", "DualTech 4D"],
  "Delivery / service concern": ["Panasonic MAN1", "OHCO M8 NEO LE", "D.Core 2"],
  "Wants to research more": [],
  "No clear objection stated": []
};

// ── Next Best Action Logic ──

function determineNextAction(repFormData, temperature) {
  // If purchased
  if (repFormData.purchaseStatus === "Closed Won") return "close_confirmed";
  
  // Based on stated objection + temperature
  const obj = repFormData.statedObjection;
  
  if (temperature === "HOT") {
    if (obj === "Partner / spouse") return "send_spouse_summary";
    if (obj === "Space / measurements") return "send_dimensions";
    if (obj === "Price / payment") return "send_financing";
    return "close_today";
  }
  
  if (temperature === "WARM") {
    if (obj === "Partner / spouse") return "send_spouse_summary";
    if (obj === "Space / measurements") return "send_dimensions";
    if (obj === "Price / payment") return "send_financing";
    if (obj === "Wants to research more") return "send_comparison";
    return "send_comparison";
  }
  
  if (temperature === "LUKEWARM") {
    if (obj === "Partner / spouse") return "send_spouse_summary";
    return "book_return_demo";
  }
  
  return "nurture_sequence";
}

// ── Follow-Up Angle Logic ──

function determineFollowUpAngle(repFormData, discoveryIntelligence) {
  const obj = repFormData.statedObjection;
  
  const angleMap = {
    "Partner / spouse": "spouse summary",
    "Price / payment": "payment comfort",
    "Space / measurements": "fit checklist",
    "Wants to research more": "comparison simplifier",
    "Not fully convinced on fit": "premium certainty",
    "Delivery / service concern": "service / warranty reassurance",
    "No clear objection stated": discoveryIntelligence?.followUpAngle || "comparison simplifier"
  };
  
  return angleMap[obj] || discoveryIntelligence?.followUpAngle || "comparison simplifier";
}

// ── Why Chair Won Explanation ──

function generateChairWinReason(chairName, signals) {
  const reasons = [];
  
  if (signals.strongestReaction === chairName) reasons.push("strongest positive reaction happened here");
  if (signals.mostTimeSpent === chairName) reasons.push("customer spent the most time in this chair");
  if (signals.mostQuestions === chairName) reasons.push("customer asked the most questions about this model");
  if (signals.repBestFit === chairName) reasons.push("rep identified this as the best fit");
  if (signals.revisitedChair) reasons.push("customer asked to revisit this chair");
  if (signals.isDiscoveryMatch) reasons.push("discovery scoring aligned with this model");
  
  return reasons.length > 0 
    ? reasons.join("; ")
    : "best overall match based on combined discovery and demo signals";
}

// ── Main Final Decision Function ──

export function calculateFinalDecision(discoveryIntelligence, repFormData) {
  if (!repFormData) return null;

  // 1. Calculate demo score
  const { demoScore } = calculateDemoScore(repFormData);

  // 2. Calculate combined lead temperature
  const leadHeatBase = discoveryIntelligence?.leadHeatBase || 30;
  const { finalScore, temperature } = calculateFinalLeadTemperature(leadHeatBase, demoScore);

  // 3. Score all tried chairs
  const triedChairs = repFormData.triedChairs || [];
  const discoveryChairs = discoveryIntelligence?.topChairs || [];
  
  const chairScores = {};
  
  triedChairs.forEach(chair => {
    let score = 0;
    
    // Discovery fit (35%) — is this chair in the discovery recommendation?
    if (discoveryChairs.includes(chair)) {
      score += 100 * WEIGHTS.discoveryFit;
    }
    
    // Demo reaction (25%) — strongest positive reaction
    if (repFormData.strongestReaction === chair) {
      score += 100 * WEIGHTS.demoReaction;
    }
    
    // Most time spent (10%)
    if (repFormData.mostTimeSpent === chair) {
      score += 100 * WEIGHTS.mostTimeSpent;
    }
    
    // Most questions (10%)
    if (repFormData.mostQuestions === chair) {
      score += 100 * WEIGHTS.mostQuestions;
    }
    
    // Rep best-fit (15%)
    if (repFormData.repBestFit === chair) {
      score += 100 * WEIGHTS.repBestFit;
    }
    
    // Objection alignment (5%)
    const objection = repFormData.statedObjection;
    const affinityChairs = OBJECTION_CHAIR_AFFINITY[objection] || [];
    if (affinityChairs.includes(chair)) {
      score += 100 * WEIGHTS.objectionAlignment;
    }
    
    chairScores[chair] = score;
  });

  // 4. Sort chairs by score
  const sortedChairs = Object.entries(chairScores)
    .sort(([, a], [, b]) => b - a);

  const finalBestFit = sortedChairs[0]?.[0] || repFormData.repBestFit || discoveryChairs[0] || "Not determined";
  const backupChair = sortedChairs[1]?.[0] || discoveryChairs[1] || discoveryIntelligence?.backupChairs?.[0] || "Not determined";

  // 5. Build signal context for explanation
  const signals = {
    strongestReaction: repFormData.strongestReaction,
    mostTimeSpent: repFormData.mostTimeSpent,
    mostQuestions: repFormData.mostQuestions,
    repBestFit: repFormData.repBestFit,
    revisitedChair: repFormData.buyingSignals?.revisitedChair,
    isDiscoveryMatch: discoveryChairs.includes(finalBestFit)
  };

  // 6. Determine real objection
  const realObjection = repFormData.objectionRealness === "Probably surface objection"
    ? repFormData.likelyHiddenObjection || repFormData.statedObjection
    : repFormData.statedObjection;

  // 7. Next action + follow-up angle
  const nextBestAction = determineNextAction(repFormData, temperature);
  const followUpAngle = determineFollowUpAngle(repFormData, discoveryIntelligence);

  return {
    // A. Customer Decision Profile
    buyerOrientation: discoveryIntelligence?.buyerOrientation,
    primaryFriction: discoveryIntelligence?.primaryFriction,
    realObjection,
    decisionComplexity: discoveryIntelligence?.decisionComplexity,
    certaintyNeed: discoveryIntelligence?.certaintyNeed,
    leadTemperature: temperature,
    leadScore: finalScore,

    // B. Chair Decision
    finalBestFitChair: finalBestFit,
    backupChair,
    whyFinalChairWon: generateChairWinReason(finalBestFit, signals),
    whyBackupRelevant: generateChairWinReason(backupChair, { ...signals, isDiscoveryMatch: discoveryChairs.includes(backupChair) }),

    // C. Next Action
    nextBestAction,
    nextStepLocked: repFormData.nextStepLocked || false,
    nextStepType: repFormData.nextStepType || null,

    // D. Follow-Up Angle
    followUpAngle,

    // Meta
    demoScore,
    discoveryHeatBase: leadHeatBase,
    chairScores,
    purchaseStatus: repFormData.purchaseStatus || "Open"
  };
}

// ── Action Labels ──

export const ACTION_LABELS = {
  close_today: "Close Today",
  close_confirmed: "Sale Confirmed ✓",
  send_spouse_summary: "Send Spouse Summary",
  send_dimensions: "Send Dimensions / Fit Check",
  send_financing: "Send Financing Comparison",
  send_comparison: "Send 2-Chair Comparison Summary",
  book_return_demo: "Book Return Demo",
  nurture_sequence: "Put Into Nurture Sequence"
};
