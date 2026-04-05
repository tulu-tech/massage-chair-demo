// ─────────────────────────────────────────────
// CRM v2 — Post-Demo Scoring Engine
// Point-based system for demo engagement, reaction,
// buying signals, objection penalty, and next-step bonus
// ─────────────────────────────────────────────

// ── Engagement Points ──
const ENGAGEMENT_POINTS = {
  "Very engaged": 12,
  "Engaged": 8,
  "Neutral": 4,
  "Distracted": 1,
  "Low engagement": 0
};

// ── Positive Reaction Points ──
const REACTION_POINTS = {
  "Visibly excited / impressed": 15,
  "Relaxed and positive": 10,
  "Thoughtful but interested": 7,
  "Hard to read": 3,
  "Unimpressed": 0
};

// ── Decisiveness Points ──
const DECISIVENESS_POINTS = {
  "Ready to decide": 15,
  "Close but needs one thing resolved": 12,
  "Interested but not ready": 7,
  "Just exploring": 3,
  "Very non-committal": 0
};

// ── Buying Signal Points ──
const SIGNAL_POINTS = {
  askedPayment: 6,
  askedDelivery: 6,
  askedWarranty: 6,
  gaveTimeline: 6,
  revisitedChair: 10,
  requestedSummary: 4,
  mentionedPartner: 2,
  mentionedMeasurements: 2
};

// ── Objection Penalty ──
const OBJECTION_PENALTY = {
  "Wants to research more": -8,
  "Not fully convinced on fit": -10,
  "Price / payment": -6,
  "Partner / spouse": -5,
  "Space / measurements": -5,
  "Delivery / service concern": -4,
  "No clear objection stated": -3
};

// ── Next-Step Lock Recovery Bonus ──
const NEXTSTEP_BONUS = {
  "Spouse summary requested": 5,
  "Measurement follow-up agreed": 5,
  "Financing follow-up agreed": 5,
  "Follow-up call time agreed": 5,
  "Return visit booked": 10,
  "Purchased today": 20
};

// ── Temperature Bands ──
function getTemperatureBand(score) {
  if (score >= 85) return "HOT";
  if (score >= 65) return "WARM";
  if (score >= 45) return "LUKEWARM";
  return "COLD";
}

// ── Main Demo Scoring Function ──

export function calculateDemoScore(repFormData) {
  let score = 0;

  // 1. Engagement
  score += ENGAGEMENT_POINTS[repFormData.engagementLevel] || 0;

  // 2. Reaction
  score += REACTION_POINTS[repFormData.reactionType] || 0;

  // 3. Decisiveness
  score += DECISIVENESS_POINTS[repFormData.decisiveness] || 0;

  // 4. Buying signals
  if (repFormData.buyingSignals) {
    const s = repFormData.buyingSignals;
    if (s.askedPayment) score += SIGNAL_POINTS.askedPayment;
    if (s.askedDelivery) score += SIGNAL_POINTS.askedDelivery;
    if (s.askedWarranty) score += SIGNAL_POINTS.askedWarranty;
    if (s.gaveTimeline) score += SIGNAL_POINTS.gaveTimeline;
    if (s.revisitedChair) score += SIGNAL_POINTS.revisitedChair;
    if (s.requestedSummary) score += SIGNAL_POINTS.requestedSummary;
    if (s.mentionedPartner) score += SIGNAL_POINTS.mentionedPartner;
    if (s.mentionedMeasurements) score += SIGNAL_POINTS.mentionedMeasurements;
  }

  // 5. Objection penalty
  score += OBJECTION_PENALTY[repFormData.statedObjection] || 0;

  // 6. Next-step lock bonus
  if (repFormData.nextStepLocked && repFormData.nextStepType) {
    score += NEXTSTEP_BONUS[repFormData.nextStepType] || 0;
  }

  return {
    demoScore: Math.max(score, 0),
    temperatureBand: getTemperatureBand(score)
  };
}

// ── Combined Lead Temperature ──
// Merges discovery leadHeatBase with demo score

export function calculateFinalLeadTemperature(discoveryHeatBase, demoScore) {
  // Discovery contributes ~35%, demo ~65%
  const combined = Math.round((discoveryHeatBase * 0.35) + (demoScore * 0.65));
  const clamped = Math.min(Math.max(combined, 0), 100);

  return {
    finalScore: clamped,
    temperature: getTemperatureBand(clamped)
  };
}
