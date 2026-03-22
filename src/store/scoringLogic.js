// Intelligent Scoring Engine

const FRICTION_PRIORITY = [
  "Space-fit",
  "Payment comfort",
  "Spouse / joint decision",
  "Comparison overload",
  "Confidence / service reassurance"
];

const CHAIR_MATRIX = {
  "Value Lane": {
    primary: ["Brio+", "Solara"],
    backup: ["MAF1"],
    framing: "Start with Brio+ as the top seller and value anchor, then compare to Solara for entry value."
  },
  "Shared Household Lane": {
    primary: ["DualTech 4D Dual", "Brio+"],
    backup: ["KOYO 303TS"],
    framing: "Focus on adaptability. DualTech 4D Dual is great for varied heights and space-saving."
  },
  "Recovery Lane": {
    primary: ["DualTech Pro AI 4D", "Brio Sport"],
    backup: ["MAN1"],
    framing: "Focus on stronger feel and active recovery features without making medical claims."
  },
  "Premium Certainty Lane": {
    primary: ["MAN1", "D.Core Cirrus JP"],
    backup: ["OHCO M8 NEO", "OHCO LE"],
    framing: "Lead with the highest-tier models. Emphasize service, warranty, and installation confidence."
  },
  "Transitional Compare Lane": {
    primary: ["Stratus JP", "OHCO R6"],
    backup: ["KOYO 303TS"],
    framing: "Place a strong premium model next to a high-value model to help them see the feature contrast."
  },
  "Space-Safe Lane": {
    primary: ["Solara", "DualTech 4D Dual"],
    backup: ["Stratus JP"],
    framing: "Ensure they know these models are Wall-Huggers and will physically fit their constrained space."
  }
};

export function calculateBranchTarget(answers) {
  const scores = {};
  
  answers.forEach(ans => {
    if (ans.tags) {
      ans.tags.forEach(t => {
        if (t.dim === 'primaryFriction') {
          scores[t.val] = (scores[t.val] || 0) + t.pts;
        }
      });
    }
  });

  // Find max friction
  let maxScore = -1;
  let candidates = [];
  
  Object.keys(scores).forEach(fric => {
    if (scores[fric] > maxScore) {
      maxScore = scores[fric];
      candidates = [fric];
    } else if (scores[fric] === maxScore) {
      candidates.push(fric);
    }
  });

  if (candidates.length === 0) return "Comparison overload"; // Default basic branch
  if (candidates.length === 1) return candidates[0];

  // Tie breaker! Follow priority array order
  for (let fric of FRICTION_PRIORITY) {
    if (candidates.includes(fric)) return fric;
  }
  
  return candidates[0];
}


export function calculateFinalIntelligence(allAnswers) {
  const dimensions = {
    buyerOrientation: {},
    primaryFriction: {},
    demoLane: {},
    timing: {},
    followUpAngle: {}
  };

  allAnswers.forEach(ans => {
    if (ans.tags) {
      ans.tags.forEach(t => {
        if (dimensions[t.dim]) {
          dimensions[t.dim][t.val] = (dimensions[t.dim][t.val] || 0) + t.pts;
        }
      });
    }
  });

  // Helper to extract top 1
  const getTop = (dimObj, defaultVal) => {
    let topObj = defaultVal;
    let max = -1;
    Object.keys(dimObj).forEach(k => {
      if (dimObj[k] > max) { max = dimObj[k]; topObj = k; }
    });
    return topObj;
  };

  const buyer = getTop(dimensions.buyerOrientation, "Value-Oriented");
  const friction = getTop(dimensions.primaryFriction, "Comparison overload");
  const lane = getTop(dimensions.demoLane, "Transitional Compare Lane");
  const time = getTop(dimensions.timing, "Warm");
  const followUp = getTop(dimensions.followUpAngle, "Premium vs value comparison");

  const laneData = CHAIR_MATRIX[lane] || CHAIR_MATRIX["Transitional Compare Lane"];

  const matchReasons = {
    "Value-Oriented": "Based on your focus for long-term value and essential comfort, we've selected models that maximize technology per dollar.",
    "Premium-Certainty": "Because you prioritize uncompromising luxury and premium feel, we've selected top-tier models that deliver ultimate certainty.",
    "Recovery-Oriented": "Since you are looking for stronger recovery and active performance, we selected models with advanced deep-tissue frameworks.",
    "Shared-Use": "Understanding that multiple people will use this, we prioritized highly adaptable models that accommodate diverse heights and preferences.",
    "Research-Oriented": "To help you compare the best features side by side, we selected two distinct models that showcase the difference in premium technologies."
  };

  return {
    buyerOrientation: buyer,
    primaryFriction: friction,
    demoLane: lane,
    timing: time,
    followUpAngle: followUp,
    topChairs: laneData.primary,
    backupChairs: laneData.backup,
    repFraming: laneData.framing,
    matchReason: matchReasons[buyer] || "We carefully evaluated your unique preferences and selected the exact models to match your lifestyle."
  };
}
