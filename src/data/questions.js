export const coreQuestions = [
  {
    id: "q1",
    shortTitle: "Usage Context",
    title: "Who will be using the chair most often?",
    options: [
      { id: "A", text: "Mostly me", icon: "User", tags: [{dim: "buyerOrientation", val: "Recovery-Oriented", pts: 1}, {dim: "timing", val: "Hot", pts: 1}] },
      { id: "B", text: "Me and my spouse / partner", icon: "Users", tags: [{dim: "buyerOrientation", val: "Shared-Use", pts: 3}, {dim: "primaryFriction", val: "Spouse / joint decision", pts: 3}, {dim: "demoLane", val: "Shared Household Lane", pts: 2}] },
      { id: "C", text: "A few people in the household", icon: "Home", tags: [{dim: "buyerOrientation", val: "Shared-Use", pts: 3}, {dim: "demoLane", val: "Shared Household Lane", pts: 2}, {dim: "primaryFriction", val: "Comparison overload", pts: 1}] },
      { id: "D", text: "I’m shopping for someone else", icon: "Gift", tags: [{dim: "primaryFriction", val: "Spouse / joint decision", pts: 1}, {dim: "buyerOrientation", val: "Research-Oriented", pts: 1}] }
    ]
  },
  {
    id: "q2",
    shortTitle: "Purchase Intent",
    title: "What brought you in today?",
    options: [
      { id: "A", text: "Everyday stress and relaxation", icon: "Coffee", tags: [{dim: "buyerOrientation", val: "Value-Oriented", pts: 1}, {dim: "demoLane", val: "Transitional Compare Lane", pts: 1}] },
      { id: "B", text: "Stronger recovery after long days or workouts", icon: "Activity", tags: [{dim: "buyerOrientation", val: "Recovery-Oriented", pts: 3}, {dim: "demoLane", val: "Recovery Lane", pts: 3}] },
      { id: "C", text: "Comparing premium options", icon: "Crown", tags: [{dim: "buyerOrientation", val: "Premium-Certainty", pts: 3}, {dim: "demoLane", val: "Premium Certainty Lane", pts: 3}] },
      { id: "D", text: "Looking for the best value", icon: "Shield", tags: [{dim: "buyerOrientation", val: "Value-Oriented", pts: 3}, {dim: "demoLane", val: "Value Lane", pts: 3}] },
      { id: "E", text: "Still exploring and want help narrowing it down", icon: "Map", tags: [{dim: "buyerOrientation", val: "Research-Oriented", pts: 3}, {dim: "primaryFriction", val: "Comparison overload", pts: 3}] }
    ]
  },
  {
    id: "q3",
    shortTitle: "Lifestyle Profile",
    title: "Which best describes your day-to-day?",
    options: [
      { id: "A", text: "Business owner / Executive", icon: "Briefcase", tags: [{dim: "buyerOrientation", val: "Premium-Certainty", pts: 2}, {dim: "timing", val: "Hot", pts: 1}] },
      { id: "B", text: "Healthcare / Medical professional", icon: "Stethoscope", tags: [{dim: "buyerOrientation", val: "Recovery-Oriented", pts: 2}, {dim: "demoLane", val: "Recovery Lane", pts: 1}] },
      { id: "C", text: "Tech / Engineering", icon: "Monitor", tags: [{dim: "buyerOrientation", val: "Research-Oriented", pts: 1}, {dim: "buyerOrientation", val: "Premium-Certainty", pts: 1}] },
      { id: "D", text: "Sales / Real estate / Finance", icon: "TrendingUp", tags: [{dim: "buyerOrientation", val: "Premium-Certainty", pts: 1}, {dim: "timing", val: "Hot", pts: 1}] },
      { id: "E", text: "Teacher / Government / Non-profit", icon: "GraduationCap", tags: [{dim: "buyerOrientation", val: "Value-Oriented", pts: 2}, {dim: "demoLane", val: "Value Lane", pts: 1}] },
      { id: "F", text: "Trades / Physical labor", icon: "Wrench", tags: [{dim: "buyerOrientation", val: "Recovery-Oriented", pts: 3}, {dim: "demoLane", val: "Recovery Lane", pts: 2}] },
      { id: "G", text: "Retired / Semi-retired", icon: "Sunset", tags: [{dim: "buyerOrientation", val: "Premium-Certainty", pts: 1}, {dim: "timing", val: "Hot", pts: 2}] },
      { id: "H", text: "Other / Prefer not to say", icon: "User", tags: [] }
    ]
  },
  {
    id: "q4",
    shortTitle: "Fitness & Recovery",
    title: "How active is your lifestyle?",
    options: [
      { id: "A", text: "I work out 4+ days a week", icon: "Dumbbell", tags: [{dim: "buyerOrientation", val: "Recovery-Oriented", pts: 3}, {dim: "demoLane", val: "Recovery Lane", pts: 3}] },
      { id: "B", text: "I stay active 2–3 days a week", icon: "Activity", tags: [{dim: "buyerOrientation", val: "Recovery-Oriented", pts: 2}, {dim: "demoLane", val: "Recovery Lane", pts: 1}] },
      { id: "C", text: "I walk or do light exercise", icon: "Footprints", tags: [{dim: "buyerOrientation", val: "Value-Oriented", pts: 1}, {dim: "demoLane", val: "Transitional Compare Lane", pts: 1}] },
      { id: "D", text: "I'm not very active right now", icon: "Sofa", tags: [{dim: "buyerOrientation", val: "Value-Oriented", pts: 1}, {dim: "demoLane", val: "Value Lane", pts: 1}] },
      { id: "E", text: "I do physically demanding work", icon: "HardHat", tags: [{dim: "buyerOrientation", val: "Recovery-Oriented", pts: 3}, {dim: "demoLane", val: "Recovery Lane", pts: 2}, {dim: "timing", val: "Hot", pts: 1}] }
    ]
  },
  {
    id: "q5",
    shortTitle: "Budget & Purchase Style",
    title: "How are you thinking about investing in your wellness chair?",
    options: [
      { id: "A", text: "I'd like to keep it budget-friendly", icon: "Wallet", tags: [{dim: "buyerOrientation", val: "Value-Oriented", pts: 3}, {dim: "demoLane", val: "Value Lane", pts: 2}] },
      { id: "B", text: "I'm comfortable investing in something premium", icon: "Crown", tags: [{dim: "buyerOrientation", val: "Premium-Certainty", pts: 3}, {dim: "demoLane", val: "Premium Certainty Lane", pts: 2}] },
      { id: "C", text: "I'd prefer manageable monthly payments", icon: "CreditCard", tags: [{dim: "primaryFriction", val: "Payment comfort", pts: 3}, {dim: "buyerOrientation", val: "Value-Oriented", pts: 1}] },
      { id: "D", text: "I plan to pay in full / cash", icon: "Banknote", tags: [{dim: "timing", val: "Hot", pts: 2}, {dim: "buyerOrientation", val: "Premium-Certainty", pts: 1}] },
      { id: "E", text: "I want to understand my options first", icon: "Search", tags: [{dim: "buyerOrientation", val: "Research-Oriented", pts: 2}, {dim: "primaryFriction", val: "Comparison overload", pts: 1}] }
    ]
  },
  {
    id: "q6",
    shortTitle: "Decision Priority",
    title: "What matters most to you right now?",
    options: [
      { id: "A", text: "Comfort and fit", icon: "UserCheck", tags: [{dim: "buyerOrientation", val: "Premium-Certainty", pts: 1}, {dim: "primaryFriction", val: "Confidence / service reassurance", pts: 1}] },
      { id: "B", text: "Long-term value", icon: "TrendingUp", tags: [{dim: "buyerOrientation", val: "Value-Oriented", pts: 3}, {dim: "demoLane", val: "Value Lane", pts: 2}] },
      { id: "C", text: "Premium feel and design", icon: "Sparkles", tags: [{dim: "buyerOrientation", val: "Premium-Certainty", pts: 3}, {dim: "demoLane", val: "Premium Certainty Lane", pts: 2}] },
      { id: "D", text: "Easy ownership and support", icon: "HeartHandshake", tags: [{dim: "primaryFriction", val: "Confidence / service reassurance", pts: 3}, {dim: "buyerOrientation", val: "Premium-Certainty", pts: 1}] },
      { id: "E", text: "Keeping the monthly cost comfortable", icon: "Wallet", tags: [{dim: "primaryFriction", val: "Payment comfort", pts: 3}, {dim: "buyerOrientation", val: "Value-Oriented", pts: 2}, {dim: "demoLane", val: "Value Lane", pts: 1}] }
    ]
  },
  {
    id: "q7",
    shortTitle: "Decision Structure",
    title: "Will you be making the final decision, or is someone else part of it too?",
    options: [
      { id: "A", text: "I'll be making the decision", icon: "User", tags: [{dim: "timing", val: "Hot", pts: 2}] },
      { id: "B", text: "I'm deciding together with someone", icon: "Users", tags: [{dim: "primaryFriction", val: "Spouse / joint decision", pts: 2}, {dim: "buyerOrientation", val: "Shared-Use", pts: 1}] },
      { id: "C", text: "I'll want to show this to my spouse / partner", icon: "Eye", tags: [{dim: "primaryFriction", val: "Spouse / joint decision", pts: 3}, {dim: "followUpAngle", val: "Spouse summary", pts: 3}] },
      { id: "D", text: "I'm helping someone else decide", icon: "LifeBuoy", tags: [{dim: "buyerOrientation", val: "Research-Oriented", pts: 1}, {dim: "primaryFriction", val: "Confidence / service reassurance", pts: 1}] }
    ]
  },
  {
    id: "q8",
    shortTitle: "Decision Signal",
    title: "What would make this decision easiest today?",
    options: [
      { id: "A", text: "Narrowing it down to the right two chairs", icon: "Target", tags: [{dim: "primaryFriction", val: "Comparison overload", pts: 3}, {dim: "followUpAngle", val: "Premium vs value comparison", pts: 1}] },
      { id: "B", text: "Making sure it fits the space well", icon: "Maximize", tags: [{dim: "primaryFriction", val: "Space-fit", pts: 3}, {dim: "demoLane", val: "Space-Safe Lane", pts: 2}, {dim: "followUpAngle", val: "Fit checklist", pts: 3}] },
      { id: "C", text: "Understanding monthly payment options", icon: "CreditCard", tags: [{dim: "primaryFriction", val: "Payment comfort", pts: 3}, {dim: "followUpAngle", val: "Payment options", pts: 3}] },
      { id: "D", text: "Feeling confident about service and support", icon: "ShieldCheck", tags: [{dim: "primaryFriction", val: "Confidence / service reassurance", pts: 3}, {dim: "followUpAngle", val: "Ownership / service summary", pts: 3}] },
      { id: "E", text: "Seeing premium and value more clearly side by side", icon: "Columns", tags: [{dim: "primaryFriction", val: "Comparison overload", pts: 2}, {dim: "demoLane", val: "Transitional Compare Lane", pts: 2}, {dim: "followUpAngle", val: "Premium vs value comparison", pts: 3}] }
    ]
  }
];

export const branches = {
  "Space-fit": [
    {
      id: "A1",
      shortTitle: "Room Placement",
      title: "Where would the chair most likely go?",
      options: [
        { id: "A", text: "Living room", icon: "Tv", tags: [] },
        { id: "B", text: "Bedroom", icon: "Moon", tags: [] },
        { id: "C", text: "Home office", icon: "Briefcase", tags: [] },
        { id: "D", text: "Dedicated room", icon: "Box", tags: [] },
        { id: "E", text: "Not sure yet", icon: "HelpCircle", tags: [] }
      ]
    },
    {
      id: "A2",
      shortTitle: "Space Size",
      title: "Would you say the space is…",
      options: [
        { id: "A", text: "Tight / compact", icon: "Minimize", tags: [] },
        { id: "B", text: "Standard", icon: "Square", tags: [] },
        { id: "C", text: "Spacious", icon: "Maximize", tags: [] },
        { id: "D", text: "I still need to check", icon: "Search", tags: [] }
      ]
    }
  ],
  "Payment comfort": [
    {
      id: "B1",
      shortTitle: "Target Payment",
      title: "If the right chair felt worth it, what monthly range would feel most comfortable?",
      options: [
        { id: "A", text: "Under $100/month", icon: "DollarSign", tags: [] },
        { id: "B", text: "$100–$200/month", icon: "DollarSign", tags: [] },
        { id: "C", text: "$200–$300/month", icon: "DollarSign", tags: [] },
        { id: "D", text: "$300–$500/month", icon: "DollarSign", tags: [] },
        { id: "E", text: "I’d rather pay upfront", icon: "CreditCard", tags: [{dim: "timing", val: "Hot", pts: 1}] },
        { id: "F", text: "I’m not sure yet", icon: "HelpCircle", tags: [] }
      ]
    },
    {
      id: "B2",
      shortTitle: "Payment Priority",
      title: "What matters more at this stage?",
      options: [
        { id: "A", text: "Lower monthly payment", icon: "ArrowDown", tags: [{dim: "demoLane", val: "Value Lane", pts: 2}] },
        { id: "B", text: "Better overall chair quality", icon: "Star", tags: [{dim: "demoLane", val: "Premium Certainty Lane", pts: 1}] },
        { id: "C", text: "The best balance of both", icon: "Scale", tags: [{dim: "demoLane", val: "Transitional Compare Lane", pts: 1}] }
      ]
    }
  ],
  "Spouse / joint decision": [
    {
      id: "C1",
      shortTitle: "Joint Priorities",
      title: "If two people will use it, what matters most?",
      options: [
        { id: "A", text: "A feel that works well for both of us", icon: "Users", tags: [] },
        { id: "B", text: "Easy entry and exit", icon: "LogOut", tags: [] },
        { id: "C", text: "Premium look and comfort", icon: "Sparkles", tags: [] },
        { id: "D", text: "Best value for shared use", icon: "Shield", tags: [] }
      ]
    },
    {
      id: "C2",
      shortTitle: "Homework Help",
      title: "Would it help if we sent you a short side-by-side summary you could review together later?",
      options: [
        { id: "A", text: "Yes", icon: "Check", tags: [{dim: "followUpAngle", val: "Spouse summary", pts: 2}] },
        { id: "B", text: "Maybe", icon: "HelpCircle", tags: [] },
        { id: "C", text: "No", icon: "X", tags: [] }
      ]
    }
  ],
  "Comparison overload": [
    {
      id: "D1",
      shortTitle: "Clarity Needs",
      title: "What would help you compare more clearly today?",
      options: [
        { id: "A", text: "Two strong recommendations", icon: "Target", tags: [{dim: "timing", val: "Hot", pts: 1}] },
        { id: "B", text: "Premium and value side by side", icon: "Columns", tags: [] },
        { id: "C", text: "Feature differences explained simply", icon: "List", tags: [] },
        { id: "D", text: "Help understanding what actually matters most", icon: "Brain", tags: [] }
      ]
    },
    {
      id: "D2",
      shortTitle: "Shopping Style",
      title: "Would you rather start with the best two for you, or compare more chairs first?",
      options: [
        { id: "A", text: "Start with the best two", icon: "Play", tags: [{dim: "timing", val: "Warm", pts: 1}] },
        { id: "B", text: "Compare a few first", icon: "Layers", tags: [{dim: "timing", val: "Researching", pts: 1}] },
        { id: "C", text: "Not sure yet", icon: "HelpCircle", tags: [] }
      ]
    }
  ],
  "Confidence / service reassurance": [
    {
      id: "E1",
      shortTitle: "Confidence Builders",
      title: "What would give you the most confidence today?",
      options: [
        { id: "A", text: "Delivery and installation clarity", icon: "Truck", tags: [] },
        { id: "B", text: "Service and warranty clarity", icon: "ShieldCheck", tags: [] },
        { id: "C", text: "Knowing which chair is the right fit", icon: "UserCheck", tags: [] },
        { id: "D", text: "Comparing two trusted models side by side", icon: "Columns", tags: [] }
      ]
    },
    {
      id: "E2",
      shortTitle: "Past Experience",
      title: "Is this your first serious massage chair purchase?",
      options: [
        { id: "A", text: "Yes", icon: "PlusCircle", tags: [] },
        { id: "B", text: "No", icon: "MinusCircle", tags: [] },
        { id: "C", text: "I’ve owned one before", icon: "Archive", tags: [] }
      ]
    }
  ]
};

export const fitQuestion = {
  id: "q9",
  shortTitle: "Fit Focus",
  title: "Which of these matters most when you try a chair?",
  options: [
    { id: "A", text: "Neck and shoulders", icon: "User", tags: [{dim: "demoLane", val: "Premium Certainty Lane", pts: 1}, {dim: "demoLane", val: "Recovery Lane", pts: 1}] },
    { id: "B", text: "Lower back", icon: "Activity", tags: [{dim: "demoLane", val: "Recovery Lane", pts: 1}, {dim: "demoLane", val: "Value Lane", pts: 1}] },
    { id: "C", text: "Legs and feet", icon: "ActivitySquare", tags: [{dim: "demoLane", val: "Recovery Lane", pts: 1}] },
    { id: "D", text: "Overall full-body feel", icon: "Maximize", tags: [{dim: "demoLane", val: "Premium Certainty Lane", pts: 1}, {dim: "demoLane", val: "Shared Household Lane", pts: 1}] },
    { id: "E", text: "I’m not sure yet", icon: "HelpCircle", tags: [{dim: "buyerOrientation", val: "Research-Oriented", pts: 1}, {dim: "primaryFriction", val: "Comparison overload", pts: 1}] }
  ]
};
