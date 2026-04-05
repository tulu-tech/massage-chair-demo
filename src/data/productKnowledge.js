// ============================================================
// Product Knowledge Base
// Deep product intelligence for scoring, recommendations,
// demo lane matching, and rep coaching prompts.
// ============================================================

export const productKnowledge = {
  "Brio Sport": {
    slug: "positive-posture-brio-sport",
    displayName: "Positive Posture Brio Sport Massage Chair",
    brand: "Positive Posture",
    model: "Brio Sport",
    category: "massage-chair",

    pricing: {
      listPrice: 11000,
      salePrice: 8999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Beige", "Black", "Graphite"],

    corePositioning: {
      primaryUseCase: "recovery-focused massage chair",
      secondaryUseCases: [
        "post-workout recovery",
        "daily tension relief",
        "full-body relaxation",
        "seated-work compression relief",
      ],
      positioningNotes: [
        "Marketed as recovery-oriented rather than purely lifestyle relaxation",
        "Page emphasizes repeatable recovery ritual and post-workout use",
        "Also positioned for people who sit long hours and want full-body coverage",
      ],
    },

    massageSystem: {
      mechanismType: "4D",
      mechanismName: "Sport 4D Intelligent Massage Mechanism",
      massageActions: [
        "kneading",
        "tapping",
        "rolling (fast/slow)",
        "pressing",
      ],
      depthCharacter: "adjustable from lighter relaxation to more intense work",
    },

    trackSystem: {
      trackType: "L-Track",
      coverageDescription: "from neck area down toward glutes/hamstrings",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "Acupressure Point Locator Function",
      description: "scans and tailors the session to the user's body",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: ["heated rollers", "seat heat", "calf heat"],
      heatDescription: [
        "heated rollers described as hot-rocks style pinpoint warmth at the working point",
        "heat zones listed under the seat and to the calves",
      ],
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: [
        "calves",
        "thighs",
        "IT bands",
        "arms",
        "hands",
        "shoulders",
      ],
      positioning: "full body air massage",
    },

    calfAndFootSystem: {
      calfMassage: {
        hasCalfMassage: true,
        description:
          "pinpoint calf massage with rear and side mechanical and air massage units",
      },
      footMassage: {
        hasFootRollers: true,
        description: "foot rollers that rub, roll, and squeeze",
        sensationNote: "designed to avoid over-stimulation",
      },
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      zeroGravityName: "True Zero Gravity",
      zeroGravityDescription:
        "weightless recline intended to reduce joint/spine pressure",
      wallHugging: true,
      minimumWallClearance: "about 4 inches behind the chair when upright",
    },

    convenienceFeatures: {
      usbPowerPort: true,
      chromotherapy: true,
      chromotherapyDescription: "soothing colors via the remote screen",
      upholstery: "easy-clean synthetic leather",
    },

    programs: {
      autoProgramsCount: 11,
      manualMassageTypesCount: 11,
    },

    fitSpecs: {
      dimensions: {
        widthInches: 33.5,
        heightInches: 48,
        uprightLengthInches: 59,
        reclinedLengthInches: 80,
      },
      userHeightRange: { min: "5'0\"", max: "6'5\"" },
      weightLimitLbs: 265,
    },

    experientialProfile: {
      strongestSensations: [
        "targeted calf massage",
        "heat-assisted back massage",
        "full-body air compression",
        "recovery-oriented 4D control",
        "weightless recline",
      ],
      firstFiveMinutes: [
        "body settles faster in recline",
        "heat softens first contact",
        "calf work feels targeted rather than generic",
        "foot rollers feel active but not sharp",
        "air compression creates a held/supportive feeling",
      ],
    },

    buyerFit: {
      bestFor: [
        "recovery-oriented buyers",
        "athletes or active users",
        "buyers wanting post-workout relief",
        "people with long sitting/driving days",
        "buyers who want strong calf and foot focus",
        "buyers who want a smaller-space-friendly premium chair",
      ],
      lessIdealFor: [
        "buyers explicitly wanting a lifestyle-first relaxation chair over a recovery-first feel",
      ],
    },

    comparisons: [
      {
        model: "Brio+",
        difference:
          "presented as more all-purpose / lifestyle-first relaxation",
      },
      {
        model: "DualTech 4D Dual",
        difference:
          "presented as a different dual-mechanism sensation profile",
      },
    ],

    verifiedClaims: [
      "4D massage mechanism",
      "L-Track design",
      "Acupressure point locator/body scan",
      "heated rollers",
      "seat and calf heat",
      "full body air massage",
      "pinpoint calf massage",
      "foot rollers",
      "True Zero Gravity recline",
      "wall-hugging design",
      "USB power port",
      "chromotherapy",
      "11 auto programs",
      "11 manual massage types",
      "height fit 5'0\" to 6'5\"",
      "weight limit 265 lbs",
    ],

    excludedData: [
      "review count is inconsistent on the page and should not be trusted",
      "booking/demo language intentionally excluded",
      "marketing statements about outcomes should not be stored as hard product specs",
    ],
  },

  "D.Core 2": {
    slug: "d-core-2",
    displayName: "D.Core 2 Massage Chair",
    brand: "D.Core",
    model: "D.Core 2",
    category: "massage-chair",

    pricing: {
      listPrice: 16999,
      salePrice: 14999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Pearl"],

    corePositioning: {
      primaryUseCase: "deep-stretch premium massage chair",
      secondaryUseCases: [
        "desk-job tightness relief",
        "lower-body tightness after long days",
        "deep tissue seekers who still want control",
        "premium furniture-forward buyers",
      ],
      positioningNotes: [
        "Page strongly positions this model around guided full-body stretch",
        "Emphasis is on controlled depth rather than random aggressive intensity",
        "Design is framed as premium and furniture-like, not bulky or medical-looking",
      ],
    },

    massageSystem: {
      mechanismType: "10-roller",
      mechanismName: "10-roller massage mechanism",
      motorArchitecture:
        "multiple motors allowing different roller movements at the same time",
      massageCharacter: [
        "smoother coverage than typical 4-roller systems",
        "more fluid and continuous feel",
        "deep tissue oriented but described as controlled",
      ],
      fingerLikeRollerDesign: true,
    },

    stretchSystem: {
      hasStretchPrograms: true,
      stretchFocus: [
        "full-body stretch routines",
        "shoulder stabilization during select stretches",
        "targeted pressure between shoulder blades during stretches",
        "lower-body anchoring for hamstrings, hips, and lower back extension",
      ],
      experienceDescription:
        "supported, guided extension rather than a harsh pulling sensation",
    },

    airMassage: {
      hasAirMassage: true,
      airbagStyle: "kneading-style airbag movements",
      coverageZones: ["shoulders", "calves", "feet"],
    },

    armSystem: {
      hasArmMassage: true,
      armMassageType: ["kneading rollers", "air compression"],
      elbowSupport: true,
    },

    calfAndFootSystem: {
      calfMassage: {
        hasCalfMassage: true,
        description:
          "lower-leg work is specifically called out through calf-focused features",
      },
      footMassage: {
        hasFootMassage: true,
        description:
          "foot features are explicitly mentioned, though the page does not provide a detailed roller spec snapshot in the visible text",
      },
    },

    heatSystem: {
      hasHeat: true,
      heatDescription:
        "heat functions are mentioned as part of comfort enhancement",
      explicitHeatZones: [],
    },

    controlsAndMedia: {
      touchscreenControl: true,
      builtInSpeakers: true,
      remoteControlMentioned: true,
    },

    designAndAesthetics: {
      premiumDesign: true,
      furnitureLikeLook: true,
      realWoodDesignElements: true,
    },

    experientialProfile: {
      strongestSensations: [
        "structured stretch feeling",
        "supported shoulders during stretch",
        "smooth continuous roller coverage",
        "placed and supported arm positioning",
        "lower-body stretch/anchoring sensation",
      ],
      firstFiveMinutes: [
        "settle-in feeling before intensity ramps",
        "stretch routines feel structured",
        "shoulders feel supported",
        "roller motion feels smoother than many chairs",
        "arm zones feel more stable because of elbow support",
        "lower legs receive noticeable attention",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers prioritizing deep stretch",
        "desk workers who feel closed off from sitting all day",
        "buyers with tight hips / hamstrings / lower back after long days",
        "deep-tissue seekers who dislike random harshness",
        "premium buyers who care about furniture-like aesthetics",
      ],
      lessIdealFor: [
        "buyers wanting a simpler, lower-price entry into the D.Core brand",
      ],
    },

    comparisons: [
      {
        model: "D.Core Cirrus JP",
        difference:
          "presented as lifestyle luxury with a different premium therapy feature mix",
      },
      {
        model: "D.Core Stratus JP",
        difference:
          "presented as a lower price tier within the D.Core family",
      },
    ],

    verifiedClaims: [
      "10-roller massage mechanism",
      "multiple motors enabling different roller movements simultaneously",
      "full-body stretch routines",
      "shoulder stabilization during select stretches",
      "targeted pressure between shoulder blades during stretches",
      "lower-body anchoring during select stretch routines",
      "advanced airbag kneading/compression",
      "arm massage with kneading rollers and air compression",
      "elbow support",
      "touchscreen control",
      "built-in speakers",
      "heat functions mentioned",
      "foot and calf features mentioned",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black and Pearl",
    ],

    softNotes: [
      "deep tissue capability described as pushing 3–4 cm deeper than other models",
      "described as smoother than typical 4-roller systems",
      "described as closer to natural human touch / finger massage sensation",
    ],

    excludedData: [
      "review/rating data should not be used for product matching logic",
      "booking/demo language intentionally excluded",
      "wellness outcome language should not be stored as hard technical spec",
    ],
  },

  "D.Core Cirrus JP": {
    slug: "d-core-cirrus-jp",
    displayName: "D.Core Cirrus JP Massage Chair",
    brand: "D.Core",
    model: "Cirrus JP",
    category: "massage-chair",

    pricing: {
      listPrice: 15000,
      salePrice: 12999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Pearl"],

    corePositioning: {
      primaryUseCase: "premium realism-focused full-body massage chair",
      secondaryUseCases: [
        "desk-all-day upper-back reset",
        "legs-and-feet fatigue relief",
        "space-conscious premium placement",
        "furniture-forward home integration",
      ],
      positioningNotes: [
        "Page strongly positions this model around realistic, hands-like massage feel",
        "Arms and legs are presented as a major differentiator",
        "Design language is premium and furniture-like rather than machine-like",
        "Space planning confidence is part of the sales story",
      ],
    },

    massageSystem: {
      mechanismType: "patented shiatsu-style system",
      mechanismName: "Patented True Shiatsu Action",
      massageCharacter: [
        "described as more natural and organic",
        "intended to feel less robotic",
        "positioned around realism rather than generic automation",
      ],
    },

    bodyCoverage: {
      simultaneousCoverage: true,
      simultaneousCoverageDescription:
        "page positions the chair as allowing back, arm, calf, and foot roller work at the same time",
      specialCoverageHighlights: [
        "arms",
        "legs",
        "calves",
        "feet",
        "back",
      ],
    },

    armAndLegSystems: {
      waveArrays: {
        hasWaveArrays: true,
        zones: ["arms", "legs"],
        description:
          "Wave Arrays are specifically presented as a differentiator for more life-like massage in arms and legs",
      },
      mechanicalUnits: {
        arms: true,
        calves: true,
      },
    },

    heatSystem: {
      hasHeat: true,
      heatDescription: "heat is listed as part of the feature set",
      pageImageCallout: "45°C warming seat graphic appears on the page",
    },

    spaceAndPlacement: {
      frontSlidingSystem: true,
      description:
        "chair slides forward while reclining to reduce required wall clearance",
      buyerValue: "better placement confidence in tighter rooms",
    },

    fitAdjustability: {
      footrestAdjustability: true,
      footrestDescription:
        "footrest adjustability is explicitly mentioned to fit different users in the home",
      footrestExtensionRange: "8 inch range",
    },

    designAndMaterials: {
      premiumDesign: true,
      furnitureLikeLook: true,
      trimMaterial: "real black walnut trim",
      aestheticDirection: "organic design language",
    },

    controlsAndUse: {
      remoteControlMentioned: true,
      userExperienceDescription:
        "page positions controls as simple and comfort-first rather than menu-heavy",
    },

    airMassage: {
      hasAirCompression: true,
      description:
        "air compression is mentioned as supporting a steady, relaxing rhythm",
    },

    experientialProfile: {
      strongestSensations: [
        "more natural hands-like feel",
        "arms and calves feel actively included",
        "warmer start because of heat",
        "space-saving confidence during recline",
        "furniture-like visual impression",
      ],
      firstFiveMinutes: [
        "looks like premium furniture, not equipment",
        "massage ramps into a deliberate rhythm",
        "arms and calves do not feel ignored",
        "front sliding design becomes noticeable if space is tight",
        "heat softens the first impression",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers who care about natural vs mechanical massage feel",
        "desk workers with upper-back tension",
        "buyers wanting stronger arm and lower-leg inclusion",
        "homeowners who care about aesthetics",
        "buyers nervous about wall clearance and room layout",
      ],
      lessIdealFor: [
        "buyers primarily chasing advanced stretch programs over realism-focused feel",
        "buyers seeking the lowest-price entry into the D.Core line",
      ],
    },

    comparisons: [
      {
        model: "D.Core Stratus JP",
        difference:
          "Stratus is framed as lower-price D.Core entry with forearm Wave Arrays, 3D+ True Shiatsu Action, heat therapy, zero-gravity recline, and an L-Track mention",
      },
      {
        model: "D.Core 2",
        difference:
          "D.Core 2 is framed around a 10-roller mechanism and advanced stretch programs, while Cirrus leans into realism plus simultaneous arms/calves/feet/back feel",
      },
    ],

    verifiedClaims: [
      "Patented True Shiatsu Action",
      "Patented Wave Arrays in arms and legs",
      "mechanical massage units mentioned for arms and calves",
      "heat included",
      "real black walnut trim",
      "Front Sliding System",
      "footrest adjustability",
      "remote control mentioned",
      "air compression mentioned",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black and Pearl",
    ],

    softNotes: [
      "described as simulating therapist finger structure and organic movements",
      "described as more natural and less robotic",
      "described as full-body because arms, calves, feet, and back can all feel active in one session",
      "described as helping reduce layout objections because it slides forward while reclining",
    ],

    excludedData: [
      "review count should not be used in matching logic",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "D.Core Stratus JP": {
    slug: "d-core-stratus-jp",
    displayName: "D.Core Stratus JP Massage Chair",
    brand: "D.Core",
    model: "Stratus JP",
    category: "massage-chair",

    pricing: {
      listPrice: 11999,
      salePrice: 11499,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black"],

    corePositioning: {
      primaryUseCase: "design-forward balanced full-body massage chair",
      secondaryUseCases: [
        "desk-job decompression",
        "forearm fatigue after keyboard/phone/tool use",
        "buyers wanting zero gravity and heat without jumping to the highest D.Core tier",
        "buyers who want premium aesthetics with controlled full-body coverage",
      ],
      positioningNotes: [
        "Page positions this model as design-first with balanced daily-use coverage",
        "Forearm massage is a major differentiator in the sales story",
        "Feel is framed as focused and controlled rather than chaotic or overly harsh",
        "Furniture-like appearance is part of the product value, not just decoration",
      ],
    },

    massageSystem: {
      mechanismType: "3D+ shiatsu-style system",
      mechanismName: "3D+ True Shiatsu Action Mechanism",
      massageCharacter: [
        "oscillating roller movement",
        "described as more lifelike",
        "controlled and intentional feel",
      ],
    },

    trackSystem: {
      trackType: "L-Track",
      coverageDescription: "coverage from neck to hamstrings",
    },

    armSystem: {
      hasArmMassage: true,
      armMassageType: "Forearm Wave Arrays",
      description:
        "mechanical arm-focused work intended to include forearms in the session",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: [
        "heated back massage",
        "lumbar heat therapy mentioned in FAQ",
      ],
      heatDescription:
        "heat is positioned as helping the user relax into pressure sooner",
    },

    reclineAndPosture: {
      hasZeroGravity: true,
      zeroGravityName: "Zero Gravity Recline",
      zeroGravityDescription:
        "weightless, pressure-reducing recline posture",
    },

    airMassage: {
      hasAirMassage: true,
      airBagsCount: 20,
      description:
        "full body air massage with gentle compression from shoulders to feet",
    },

    footSystem: {
      hasFootRollers: true,
      description:
        "foot rollers combined with air cells to mobilize the feet",
    },

    designAndMaterials: {
      premiumDesign: true,
      furnitureLikeLook: true,
      trimMaterial: "real black walnut trim",
      walnutPanel: true,
    },

    deliveryAndSetup: {
      freeCurbsideDelivery: true,
      whiteGloveInHomeSetupOptional: true,
    },

    programs: {
      autoProgramsCount: 9,
    },

    fitSpecs: {
      dimensions: {
        widthInches: 37,
        lengthInches: 58.75,
        heightInches: 49.75,
      },
      chairWeightLbs: 392,
      airBagsCount: 20,
    },

    experientialProfile: {
      strongestSensations: [
        "controlled shiatsu-style back feel",
        "forearms feel included instead of ignored",
        "heated back softens the session entry",
        "longer L-Track reach into the hamstrings",
        "foot movement instead of simple squeeze",
        "zero gravity exhale moment",
      ],
      firstFiveMinutes: [
        "stable posture before intensity builds",
        "heat gets the back ready",
        "L-Track reach feels long",
        "arms noticeably receive attention",
        "feet get movement from rollers",
        "zero gravity creates a calmer breathing posture",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers who sit all day and feel compressed by evening",
        "buyers with forearm fatigue from typing, phones, or tools",
        "buyers who want a premium look without a clinical machine aesthetic",
        "buyers who want zero gravity plus heat in a balanced full-body package",
        "buyers who want controlled depth without a chaotic or overly harsh feel",
      ],
      lessIdealFor: [
        "buyers prioritizing front-sliding space-saving over all else",
        "buyers specifically chasing advanced stretch-first programming",
      ],
    },

    comparisons: [
      {
        model: "D.Core Cirrus JP",
        difference:
          "Cirrus is framed as the more premium 'most organic feel' option with front sliding setup and additional color choices",
      },
      {
        model: "D.Core 2",
        difference:
          "D.Core 2 is framed as the stretch-first, higher-tier option with advanced stretching programs",
      },
    ],

    verifiedClaims: [
      "3D+ True Shiatsu Action Mechanism",
      "Forearm Wave Arrays",
      "Heated Back Massage",
      "Zero Gravity Recline",
      "Full Body Air Massage",
      "20 air cells",
      "Foot Rollers",
      "Real Black Walnut Trim",
      "L-Track System",
      "9 Automatic Massage Programs",
      "free curbside delivery mentioned",
      "optional white glove in-home setup mentioned",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "color: Black",
    ],

    softNotes: [
      "described as feeling more lifelike",
      "described as focused and controlled, not chaotic",
      "described as furniture-like rather than gadget-like",
      "described as balanced and less overwhelming than some intense chairs",
    ],

    excludedData: [
      "review/testimonial text should not be used as hard product spec",
      "FAQ review-status language is not product performance data",
      "booking/demo language intentionally excluded",
      "wellness outcome language should not be stored as hard technical spec",
    ],
  },

  "OHCO M8 NEO LE": {
    slug: "ohco-m8-neo-le",
    displayName: "OHCO M8 NEO LE Massage Chair",
    brand: "OHCO",
    model: "M8 NEO LE",
    category: "massage-chair",

    pricing: {
      listPrice: 18000,
      salePrice: 18000,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Rosso Nero"],

    corePositioning: {
      primaryUseCase: "ultra-premium human-feel full-body massage chair",
      secondaryUseCases: [
        "executive stress decompression",
        "neck and shoulder tension reset",
        "serious calf and foot recovery",
        "buyers wanting top-tier sensory ritual",
        "buyers wanting premium features in a space-conscious recline format",
      ],
      positioningNotes: [
        "Page strongly positions this model around the most human-feeling massage in the lineup",
        "Neck/shoulder accuracy and calf quality are major selling points",
        "Heat, audio, aromatherapy, chromotherapy, and ionizer are framed as part of a repeatable ritual",
        "Wall-hugging placement is used to reduce room-fit hesitation",
      ],
    },

    massageSystem: {
      mechanismType: "4D",
      mechanismName: "Sens8 Massage Mechanism",
      massageCharacter: [
        "lifelike hand motion and pacing",
        "controlled and nuanced feel",
        "less robotic sensation",
      ],
    },

    trackSystem: {
      trackType: "MaxTrack",
      trackLengthInches: 49,
      coverageDescription:
        "ultra-long track designed to maintain massage contact across multiple recline postures",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "Back AutoScan",
      description:
        "maps massage focus points to the user's body before the session starts",
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      hasLayFlat: true,
      reclineOptions: ["Zero Gravity", "Lay Flat"],
      wallHugging: true,
      minimumWallClearance: "about 6.25 inches / 15 cm",
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: [
        "feet",
        "calves",
        "hips",
        "thighs",
        "glutes",
        "arms",
        "hands",
        "neck",
        "shoulders",
      ],
      description: "full body air massage coverage",
    },

    neckAndHeadSystem: {
      hasHeadNeckFocus: true,
      featureName: "Knead And Stretch Headrest",
      description:
        "rollers plus air-driven neck stretching / traction for neck and shoulder relief",
    },

    calfAndFootSystem: {
      calfMassage: {
        hasCalfMassage: true,
        featureName: "TheraElliptical Calf Kneading",
        description:
          "combines compression with rotation for calf kneading",
      },
      footMassage: {
        hasFootRollers: true,
        description:
          "foot rollers included as part of lower-body reset",
      },
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: [
        "ConstantTouch Infrared Heat",
        "foot heat",
        "calf heat",
        "palm heat",
        "back heat",
        "seat heat",
      ],
      heatDescription:
        "includes infrared warmth near rollers plus multiple body-zone heat controls",
    },

    sensoryFeatures: {
      bluetoothAudio: true,
      aromatherapy: true,
      airIonizer: true,
      chromotherapy: true,
      lightPool: true,
    },

    accessAndEntry: {
      rearSwingingDoors: true,
      description:
        "left or right side entry doors that lock when reclined",
    },

    experientialProfile: {
      strongestSensations: [
        "human-like pacing and pressure transitions",
        "neck and shoulder precision after scan",
        "therapist-like calf treatment",
        "targeted infrared warmth",
        "whole-body wrapped feeling in Zero Gravity",
        "high-end sensory ritual beyond massage alone",
      ],
      firstFiveMinutes: [
        "chair reclines into a comfortable posture quickly",
        "body scan helps the massage feel placed correctly",
        "calves feel actively treated rather than passively squeezed",
        "heat feels targeted instead of vague",
        "arms and legs feel wrapped by air compression",
        "experience feels quiet and polished",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers who hate robotic-feeling massage chairs",
        "buyers with chronic neck and shoulder tension",
        "buyers who care a lot about calf treatment quality",
        "buyers wanting the fullest sensory luxury expression",
        "buyers wanting top-tier OHCO positioning",
        "buyers needing premium features with practical room placement",
      ],
      lessIdealFor: [
        "buyers who want OHCO at a lower investment tier",
        "buyers who do not value the sensory/luxury feature stack",
      ],
    },

    comparisons: [
      {
        model: "OHCO M8 Neo",
        difference:
          "closest sibling with similar platform feel but without the Limited Edition finish tier emphasis",
      },
      {
        model: "OHCO R6",
        difference:
          "lower step-in price with a different feature balance and positioning",
      },
    ],

    verifiedClaims: [
      "Sens8 Massage Mechanism",
      "4D engine",
      "MaxTrack 49-inch ultra-long track",
      "Back AutoScan",
      "Zero Gravity recline",
      "Lay Flat recline",
      "Wall Hugging with about 6.25 inches / 15 cm clearance",
      "full body air massage coverage",
      "Knead And Stretch Headrest",
      "TheraElliptical Calf Kneading",
      "foot rollers",
      "ConstantTouch Infrared Heat",
      "heat zones for foot, calf, palm, back, and seat",
      "Bluetooth audio",
      "aromatherapy",
      "air ionizer",
      "chromotherapy",
      "light pool mentioned",
      "rear swinging doors",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "color: Rosso Nero",
    ],

    softNotes: [
      "described as the most human-feeling massage",
      "described as controlled and natural rather than robotic",
      "described as a full ritual rather than just a massage session",
      "described as premium without forcing a room redesign",
    ],

    excludedData: [
      "review text should not be used for product matching logic",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "DualTech 4D": {
    slug: "positive-posture-dualtech-4d-dual",
    displayName: "Positive Posture DualTech 4D Dual Massage Chair",
    brand: "Positive Posture",
    model: "DualTech 4D Dual",
    category: "massage-chair",

    pricing: {
      listPrice: 10999,
      salePrice: 7999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Slate", "Linen"],

    corePositioning: {
      primaryUseCase:
        "balanced modern everyday-use massage chair with distinct glute work",
      secondaryUseCases: [
        "upper-back stress after long sitting",
        "buyers who want both back and glute attention in one session",
        "living-room-friendly premium upgrade",
        "buyers who need full recline in tighter rooms",
      ],
      positioningNotes: [
        "Page strongly positions this model around dual massage mechanisms",
        "Upper body and glute work happening together is the main differentiator",
        "Modern fabric-forward design is part of the value story",
        "Space-saving recline is a major sales angle",
      ],
    },

    massageSystem: {
      mechanismType: "dual mechanism",
      mechanismName: "upper 4D unit + lower mechanism",
      upperCoverage: ["neck", "shoulders", "lumbar"],
      lowerCoverage: ["glutes"],
      massageCharacter: [
        "layered coverage rather than a single-track feel",
        "controlled 4D depth changes",
        "distinct glute sensation separate from back work",
      ],
    },

    gluteSystem: {
      hasDedicatedGluteMassage: true,
      featureName: "RotoTech Massage Heads",
      description:
        "rotating glute massage designed to adapt to body contours",
    },

    trackSystem: {
      trackType: "SL-Track",
      trackLengthInches: 46,
      coverageDescription: "coverage from neck down to glutes",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "Smart Body Scanning",
      description:
        "maps the user's frame for more accurate targeting",
    },

    airMassage: {
      hasAirMassage: true,
      airCellsCount: 36,
      coverageZones: [
        "shoulders",
        "arms",
        "hands",
        "calves",
        "feet",
      ],
      description: "full-body air compression",
    },

    footAndLowerLegSystem: {
      footMassage: {
        hasFootRollers: true,
        featureName: "Bi-Directional Foot Rollers",
        description: "forward/back movement under the arches",
      },
      calfMassage: {
        hasCalfMassage: true,
        description:
          "air compression plus heat support in the calf area",
      },
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: ["lower back", "calf", "knee"],
      heatDescription:
        "dual-zone heat is framed as helping the body loosen up before deeper work",
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      zeroGravityName: "True Zero Gravity",
      wallHugging: true,
      minimumWallClearance: "about 3 inches",
      reclineAngleRange: "135°–160°",
    },

    controlsAndConvenience: {
      touchscreenTabletController: true,
      manualCustomization: true,
      manualAdjustments: ["style", "speed", "width", "coverage area"],
      bluetoothSpeakers: true,
      usbChargingPort: true,
      ambientLighting: true,
      voiceControl: true,
    },

    designAndAesthetics: {
      premiumDesign: true,
      modernLivingRoomDesign: true,
      fabricAccents: true,
      subtleLighting: true,
    },

    experientialProfile: {
      strongestSensations: [
        "back work and glute work feel separate and layered",
        "upper-body 4D feels more controlled than expected",
        "calves warm before deeper pressure lands",
        "foot rollers feel active under the arches",
        "recline feels easy even in tighter rooms",
      ],
      firstFiveMinutes: [
        "quick body scan before main massage starts",
        "chair feels more like a recliner than a stiff machine seat",
        "dual architecture becomes noticeable when glutes and back feel different",
        "heat softens calf and lower-back entry",
        "4D depth changes feel controlled rather than jumpy",
        "space-saving glide matters if room depth is a concern",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers with upper-back stress from sitting all day",
        "buyers wanting meaningful glute attention",
        "buyers who want modern home-friendly design",
        "buyers who need full recline with minimal wall clearance",
        "buyers who want a balanced everyday-use premium chair rather than a classic head-to-toe choreography",
      ],
      lessIdealFor: [
        "buyers wanting the most guided automation in the lineup",
        "buyers specifically wanting a classic traditional full-body choreography over dual-track feel",
      ],
    },

    comparisons: [
      {
        model: "DualTech Pro AI 4D",
        difference:
          "positioned as the next step up with more guided automation and session structure",
      },
      {
        model: "Brio+",
        difference:
          "positioned as a more classic full-body feel with different choreography and style emphasis",
      },
    ],

    verifiedClaims: [
      "upper 4D massage mechanism for neck/shoulders/lumbar",
      "lower massage mechanism for glutes",
      "RotoTech Massage Heads",
      "SL-Track / 46 inches",
      "Smart Body Scanning",
      "full-body air compression",
      "36 air cells",
      "Bi-Directional Foot Rollers",
      "heat locations: lower back, calf, knee",
      "True Zero Gravity recline",
      "space-saving recline needing about 3 inches of clearance",
      "reclining angle 135°–160°",
      "touchscreen tablet controller",
      "manual customization for style, speed, width, and coverage area",
      "Bluetooth speakers",
      "USB charging port",
      "ambient lighting",
      "voice control mentioned",
      "modern design with fabric accents",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Slate and Linen",
    ],

    softNotes: [
      "described as more hands-like than a single-track approach",
      "described as living-room-friendly rather than bulky",
      "described as controlled and calmer than expected for a 4D chair",
      "described as helping buyers decide faster because the dual architecture is easy to feel",
    ],

    excludedData: [
      "customer testimonials should not be used as hard product spec",
      "FAQ text about reviews should not be used in matching logic",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "Brio Plus": {
    slug: "positive-posture-brio-plus",
    displayName: "Positive Posture Brio Plus Massage Chair",
    brand: "Positive Posture",
    model: "Brio Plus",
    category: "massage-chair",

    pricing: {
      listPrice: 9999,
      salePrice: 4999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Walnut"],

    corePositioning: {
      primaryUseCase: "easy-to-use daily relaxation full-body massage chair",
      secondaryUseCases: [
        "upper-back tension from desk-heavy work",
        "end-of-day leg fatigue",
        "buyers wanting premium feel without complexity",
        "buyers wanting a repeatable nightly routine",
        "buyers worried about room placement",
      ],
      positioningNotes: [
        "Page strongly positions this model around repeatable daily use",
        "Ease of use and low learning curve are major sales angles",
        "Wall-hugging practicality is a core placement benefit",
        "This is framed as a clean, controlled, everyday premium chair rather than a recovery-first or dual-mechanism story",
      ],
    },

    massageSystem: {
      mechanismType: "4D",
      mechanismName: "Intelligent 4D Massage",
      massageCharacter: [
        "adjusts from soft to firm through the session",
        "controlled and consistent feel",
        "structured choreography rather than random intensity",
      ],
    },

    trackSystem: {
      trackType: "L-Track",
      coverageDescription: "coverage from neck down through glutes",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "Automatic Body Scan",
      description:
        "matches shoulder position and body type for better alignment",
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      zeroGravityName: "True Zero Gravity",
      reclineUpToDegrees: 160,
      wallHugging: true,
      minimumWallClearance: "about 4 inches",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: [
        "heated rollers",
        "lower back heat",
        "calf heat",
        "foot heat",
      ],
      heatDescription:
        "pinpoint roller warmth plus lower-body heat support",
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: ["upper body", "legs", "feet"],
      description:
        "full-body air massage with steady squeeze-and-release feel",
    },

    footSystem: {
      hasFootRollers: true,
      featureName: "Intelligent Touch Foot Rollers",
      description: "foot rollers designed to avoid overstimulation",
    },

    controlsAndConvenience: {
      usbPowerPort: true,
      usbLocation: "inside the right armrest",
      chromotherapy: true,
      bluetoothSpeakers: true,
      voiceControl: true,
      simpleProgramSelection: true,
      easyControls: true,
    },

    designAndMaterials: {
      premiumDesign: true,
      diamondStitchUpholstery: true,
      syntheticLeather: true,
      removableBackUpholstery: true,
      furnitureLikeLook: true,
    },

    programs: {
      autoProgramsCount: 10,
      manualMassageTypesCount: 9,
    },

    fitSpecs: {
      userHeightRange: { min: "5'0\"", max: "6'5\"" },
      weightLimitLbs: 265,
    },

    experientialProfile: {
      strongestSensations: [
        "shoulders get located quickly after scan",
        "roller warmth makes the feel less mechanical",
        "air compression feels steady rather than harsh",
        "foot rollers feel present but not aggressive",
        "routine feels simple and repeatable",
      ],
      firstFiveMinutes: [
        "body scan helps the chair find the upper back quickly",
        "zero gravity takes pressure off the lower body",
        "heat changes the tone from mechanical to more human",
        "air compression feels controlled",
        "foot rollers stay noticeable without becoming sharp",
        "UI feels simple enough to keep the session moving",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers wanting a daily-use full-body routine chair",
        "desk workers with upper-back tension",
        "buyers on their feet all day with tired legs",
        "buyers who want premium feel without complicated controls",
        "buyers wanting a room-friendly wall-hugging design",
      ],
      lessIdealFor: [
        "buyers wanting recovery-first athletic framing",
        "buyers specifically shopping for a dual-mechanism concept",
      ],
    },

    comparisons: [
      {
        model: "Brio Sport",
        difference:
          "Brio Sport is framed as more recovery-focused and fitness-oriented",
      },
      {
        model: "DualTech 4D",
        difference:
          "DualTech is framed around dual massage mechanisms and dual-zone heat therapy",
      },
    ],

    verifiedClaims: [
      "Intelligent 4D Massage",
      "L-Track design",
      "Automatic Body Scan",
      "True Zero Gravity recline",
      "recline up to 160 degrees",
      "heated rollers",
      "heat support in lower back, calves, and feet",
      "full-body air massage",
      "Intelligent Touch Foot Rollers",
      "wall-hugging design needing about 4 inches behind the chair",
      "USB power port inside the right armrest",
      "diamond stitch upholstery",
      "removable back upholstery option",
      "chromotherapy on the remote screen",
      "10 programmed sessions",
      "9 manual massage types",
      "user height range 5'0\"–6'5\"",
      "user weight limit 265 lbs",
      "Bluetooth speakers mentioned",
      "voice control mentioned",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black and Walnut",
    ],

    softNotes: [
      "described as repeatable and structured rather than random",
      "described as premium feel without a complicated learning curve",
      "described as a daily ritual chair rather than occasional-use portable relief",
      "described as controlled and consistent rather than gimmicky",
    ],

    excludedData: [
      "customer testimonials should not be used as hard product spec",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "KOYO 303TS": {
    slug: "koyo-303ts",
    displayName: "KOYO 303TS Massage Chair",
    brand: "KOYO",
    model: "303TS",
    category: "massage-chair",

    pricing: {
      listPrice: 10000,
      salePrice: 7999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Pearl", "Walnut"],

    corePositioning: {
      primaryUseCase:
        "controlled Japanese-premium daily-use full-body massage chair",
      secondaryUseCases: [
        "desk-job neck and shoulder tension",
        "mid-back continuity seekers",
        "legs-and-feet fatigue relief",
        "shared-household buyers who need simple controls",
        "buyers prioritizing consistency and clean control logic",
      ],
      positioningNotes: [
        "Page strongly positions this model around predictable, repeatable performance",
        "Shoulder line and mid-back continuity are part of the sales story",
        "Leg and foot reset is a major secondary value angle",
        "Simple controls and fast intensity changes matter for shared-household use",
      ],
    },

    massageSystem: {
      mechanismType: "4D",
      mechanismName: "Servo 4D Massage Mechanism",
      massageHeadMaterial: "anthropoid silicone massage heads",
      massageActions: [
        "kneading",
        "tapping",
        "rolling",
        "pressing",
      ],
      massageCharacter: [
        "controlled",
        "deliberate",
        "stable across the back",
        "firm without being abrasive",
      ],
    },

    trackSystem: {
      trackType: "SL-Track",
      backStrokeRangeInches: 47.25,
      backStrokeRangeCm: 120,
      coverageDescription:
        "continuous path from upper back down toward the seat",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "Auto Body Scan",
      description:
        "personalizes movement placement before sessions",
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      zeroGravityName: "Zero Gravity Recline",
      recliningAngleRange: "125° to 150°",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: ["calf heat", "low back heat"],
      heatDescription:
        "heat in calf and low back to help the body settle before deeper passes",
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: [
        "arms",
        "shoulders",
        "legs",
        "feet",
        "seat",
      ],
      description: "full body air massage",
    },

    footSystem: {
      hasFootRollers: true,
      description: "foot rollers that rub, roll, and squeeze",
    },

    controlsAndConvenience: {
      touchscreenRemote: true,
      fingertipControlDial: true,
      bluetoothSoundSystem: true,
      simpleLearningCurve: true,
      fastIntensityChanges: true,
    },

    motorsAndBuild: {
      brushlessMotors: true,
      madeInJapan: true,
    },

    fitSpecs: {
      userHeightRange: { min: "5'0\"", max: "6'0\"" },
      weightLimitLbs: 265,
      chairWeightLbs: 200.6,
    },

    experientialProfile: {
      strongestSensations: [
        "shoulders get contacted early",
        "motion tracks downward with fewer abrupt shifts",
        "legs and feet feel actively included",
        "air compression creates a controlled wraparound sensation",
        "heat softens calf and low-back entry",
        "controls feel easy to learn",
      ],
      firstFiveMinutes: [
        "chair guides user into position before massage starts",
        "shoulder contact happens early",
        "pressure moves downward with fewer jumps",
        "Zero Gravity changes how pressure distributes across spine and hips",
        "foot rollers engage quickly",
        "heat becomes noticeable in calf and low-back zones",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers who sit all day and carry neck/shoulder tension",
        "buyers who walk, train, or stand for work and want leg/foot reset",
        "buyers wanting Japanese build discipline and predictable performance",
        "shared-household buyers who need quick control changes",
        "buyers who want premium feel without a confusing interface",
      ],
      lessIdealFor: [
        "buyers needing a taller fit range above 6'0\"",
        "buyers specifically chasing more complex luxury ritual features over control simplicity",
      ],
    },

    comparisons: [
      {
        model: "KOYO 303TS Pearl",
        difference:
          "same performance with a brighter, lighter aesthetic",
      },
      {
        model: "KOYO 303TS Walnut",
        difference:
          "same performance with a warmer, furniture-like finish",
      },
    ],

    verifiedClaims: [
      "4D massage mechanism",
      "Servo 4D Massage Mechanism",
      "anthropoid silicone massage heads",
      "SL-Track",
      "Auto Body Scan",
      "Zero Gravity recline",
      "calf and low back heat",
      "full body air massage",
      "Bluetooth Sound System",
      "foot rollers",
      "touchscreen remote",
      "fingertip control dial",
      "brushless motors mentioned",
      "made in Japan claim appears on page",
      "reclining angle 125° to 150°",
      "back stroke range 47.25 inches / 120 cm",
      "chair weight 200.6 lbs",
      "recommended user height 5'0\" to 6'0\"",
      "recommended user weight up to 265 lbs",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black, Pearl, Walnut",
    ],

    softNotes: [
      "described as anatomical through the shoulder line",
      "described as having convincing mid-back continuity",
      "described as firm without being abrasive",
      "described as controlled rather than chaotic",
      "described as premium build without guesswork",
    ],

    excludedData: [
      "customer review quotes should not be used as hard product spec",
      "booking/demo language intentionally excluded",
      "engineering/quality associations tied to 'Made in Japan' should not be stored as hard product spec",
    ],
  },

  "OHCO R6": {
    slug: "ohco-r6",
    displayName: "OHCO R6 Massage Chair",
    brand: "OHCO",
    model: "R6",
    category: "massage-chair",

    pricing: {
      listPrice: 12000,
      salePrice: 9999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Walnut"],

    corePositioning: {
      primaryUseCase: "design-forward premium daily-reset massage chair",
      secondaryUseCases: [
        "neck, back, and hip stress after work",
        "buyers wanting comfort-first premium feel",
        "buyers wanting furniture-like OHCO design at a lower entry than M8",
        "buyers wanting premium features without a bulky room look",
      ],
      positioningNotes: [
        "Page strongly positions this model around daily repeatability and comfort-first use",
        "Aesthetics are a major part of the value story",
        "Massage feel is framed as intuitive and lifelike rather than aggressive",
        "Room integration and wall clearance are part of the decision-acceleration story",
      ],
    },

    massageSystem: {
      mechanismType: "4D",
      mechanismName: "Sens8 4D Massage Engine",
      massageCharacter: [
        "lifelike",
        "hands-like",
        "intuitive choreography",
        "comfort first, intensity second",
      ],
    },

    trackSystem: {
      trackType: "L-Track",
      trackLengthInches: 49,
      trackLengthCm: 125,
      coverageDescription: "coverage down toward the glute area",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "Back Auto Scan",
      description:
        "finds massage points before the session begins",
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      zeroGravityName: "Zero Gravity Recline",
      automaticRecline: true,
      wallHugging: true,
      minimumWallClearance: "about 5 inches",
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: [
        "shoulders",
        "arms",
        "hands",
        "hips",
        "thighs",
        "calves",
        "feet",
      ],
      description: "full body air massage",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: [
        "back",
        "seat / buttocks",
        "legs",
        "feet",
      ],
      heatDescription:
        "total body heat with manual control by zone",
    },

    footSystem: {
      hasFootRollers: true,
      description:
        "two-way rolling design working pressure points on the soles",
    },

    controlsAndConvenience: {
      multiLanguageRemote: true,
      automaticMassageCourses: 12,
      typicalProgramLengthMinutes: 18,
    },

    designAndAesthetics: {
      premiumDesign: true,
      midCenturyModernDesign: true,
      premiumTrim: true,
      furnitureLikeLook: true,
    },

    experientialProfile: {
      strongestSensations: [
        "chair reclines into a lighter floating posture",
        "back scan makes contact feel more personalized",
        "coverage reaches beyond upper back",
        "air compression gives a wrapped, supported feel",
        "heat softens the start of the session",
        "foot rollers create a clear finish sensation",
      ],
      firstFiveMinutes: [
        "body settles back as recline starts",
        "scan reduces one-size-fits-all feel",
        "L-Track coverage reaches lower than expected",
        "air zones stabilize the body",
        "heat makes the session feel gentler early",
        "foot rollers become noticeable at the end",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers wanting a design-forward OHCO entry point",
        "buyers wanting comfort first and intensity second",
        "buyers with neck, back, and hip stress after work",
        "buyers who dislike bulky-looking massage chairs",
        "buyers who want a repeatable daily reset routine",
      ],
      lessIdealFor: [
        "buyers wanting the highest OHCO tier",
        "buyers prioritizing the fullest luxury ritual stack over calmer daily-use premium",
      ],
    },

    comparisons: [
      {
        model: "OHCO M8 NEO",
        difference:
          "higher budget tier for buyers stepping up within OHCO",
      },
      {
        model: "OHCO M8 NEO LE",
        difference:
          "highest listed related tier for buyers prioritizing top-end premium positioning",
      },
    ],

    verifiedClaims: [
      "Sens8 4D Massage Engine",
      "L-Track System",
      "49 inches / 125 cm track note",
      "Back Auto Scan",
      "Automatic Recline",
      "Zero Gravity Recline",
      "Full Body Air Massage",
      "Total Body Heat",
      "manual heat control by zone",
      "Foot Rollers with two-way rolling design",
      "Wall Hugging Technology needing about 5 inches behind the chair",
      "Multi-Language Remote Control",
      "12 Automatic Massage Courses",
      "approximately 18-minute programs",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black and Walnut",
    ],

    softNotes: [
      "described as intuitive and lifelike",
      "described as hands-like rather than repeating one pattern",
      "described as comfort first, intensity second",
      "described as a statement piece for a curated room",
    ],

    excludedData: [
      "review/testimonial text should not be used as hard product spec",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "Panasonic MAF1": {
    slug: "panasonic-maf1",
    displayName: "Panasonic Massage Chair MAF1",
    brand: "Panasonic",
    model: "MAF1",
    category: "massage-chair",

    pricing: {
      listPrice: 10000,
      salePrice: 5999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Walnut"],

    corePositioning: {
      primaryUseCase: "compact premium daily-reset massage chair",
      secondaryUseCases: [
        "small-space living",
        "neck-and-shoulder precision seekers",
        "feet-first buyers",
        "buyers wanting value without a cheap feel",
        "buyers wanting straightforward controls and repeatable daily use",
      ],
      positioningNotes: [
        "Page strongly positions this model around compact size and daily routine readiness",
        "Neck and shoulder precision is a major differentiator",
        "Footwork is framed as controlled and stable rather than random or ticklish",
        "Value is positioned as premium credibility, not bargain-bin gadget pricing",
      ],
    },

    massageSystem: {
      mechanismType: "4D",
      mechanismName: "Panasonic 4D Massage Engine",
      intensityControl: "3D intensity adjustment",
      speedControl: "4D speed variability",
      massageCharacter: [
        "controlled",
        "less random feeling",
        "built for practical daily use",
      ],
    },

    sizeAndPlacement: {
      widthInches: 27,
      compactFootprint: true,
      smallSpacePositioning: true,
    },

    rollerSystem: {
      narrowRollerSpacingInches: 1.5,
      precisionTargetingFocus: [
        "neck",
        "shoulders",
        "along the spine",
      ],
      heatType: "infrared roller heat",
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: [
        "shoulders",
        "hips",
        "thighs",
        "buttocks",
        "calves",
        "feet",
        "forearms",
        "hands",
      ],
      description: "full-body air coverage",
    },

    footSystem: {
      hasFootMassage: true,
      featureName: "Reflexology Footwork",
      footworkDescription:
        "air holds the foot while sole rollers knead the arches",
      sensationNote:
        "positioned as stable and controlled rather than random",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: ["infrared rollers"],
      heatDescription:
        "hot-stone-style warmth at the massage contact point",
    },

    controlsAndConvenience: {
      controllerType: "Tactile LCD Controller",
      simpleMenus: true,
      backlitButtons: true,
      lowLearningCurve: true,
    },

    reclineAndPosture: {
      gravityPositioning: true,
      gravityRecline: true,
      zeroGravityListed: false,
      note: "FAQ specifically says the product page does not list zero gravity for this model",
    },

    experientialProfile: {
      strongestSensations: [
        "compact chair still feels precise",
        "neck and shoulder contact feels narrow and targeted",
        "roller heat feels like direct warm contact",
        "feet feel stabilized before roller motion starts",
        "controller feels straightforward and low-friction",
      ],
      firstFiveMinutes: [
        "compact size feels less imposing in the room",
        "shoulders feel held as air compression begins",
        "narrow rollers feel more exact near the spine",
        "infrared warmth shows up at the contact point",
        "feet feel anchored before reflexology begins",
        "controls feel simple without menu overload",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers living in apartments, condos, or tighter layouts",
        "buyers wanting Panasonic credibility at a lower entry point",
        "buyers focused on neck-and-shoulder precision",
        "buyers who care a lot about controlled footwork",
        "buyers wanting straightforward daily-use routines without complexity",
      ],
      lessIdealFor: [
        "buyers who require zero gravity as a non-negotiable",
        "buyers wanting Panasonic's more advanced scanning/customization tier",
        "buyers wanting the highest-tier Panasonic flagship story",
      ],
    },

    comparisons: [
      {
        model: "Panasonic MAK1",
        difference:
          "MAK1 is framed as the real-time scanning and advanced customization option",
      },
      {
        model: "Panasonic MAN1",
        difference:
          "MAN1 is framed as the higher-tier Panasonic experience with a deeper premium story",
      },
    ],

    verifiedClaims: [
      "Compact 27-inch width",
      "narrow roller spacing down to 1.5 inches",
      "infrared roller heat",
      "Reflexology Footwork",
      "Panasonic 4D Massage Engine",
      "3D intensity adjustment",
      "4D speed variability",
      "full-body air coverage",
      "Tactile LCD Controller",
      "daily routine ready positioning",
      "gravity positioning mentioned",
      "gravity recline mentioned",
      "FAQ says zero gravity is not listed for this model on the product page",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black and Walnut",
    ],

    softNotes: [
      "described as Panasonic's most compact option",
      "described as giving a clean daily-reset feel",
      "described as more controlled and less random than cheaper options",
      "described as practical pain-relief / reset without overcomplicating the routine",
      "described as closer to human touch through varied timing and pressure",
    ],

    excludedData: [
      "customer review quotes should not be used as hard product spec",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "Panasonic MAN1": {
    slug: "panasonic-man1",
    displayName: "Panasonic MAN1 Massage Chair",
    brand: "Panasonic",
    model: "MAN1",
    category: "massage-chair",

    pricing: {
      listPrice: 15299,
      salePrice: 13999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Ivory"],

    corePositioning: {
      primaryUseCase:
        "precision-focused premium Panasonic full-body massage chair",
      secondaryUseCases: [
        "upper-back tension from long work hours",
        "buyers wanting real-time pressure adaptation",
        "lower-body relief seekers needing hips, thighs, calves, and feet included",
        "buyers who care about palm/hand massage detail",
        "buyers wanting premium trust and in-home service confidence",
      ],
      positioningNotes: [
        "Page strongly positions this model around precision and consistency rather than generic intensity",
        "Real-time responsiveness is a core differentiator",
        "Upper back, hips/thighs, calves, feet, and palms are all part of the story",
        "Stretch range and deliberate full-body sequencing help separate it from simpler Panasonic models",
      ],
    },

    massageSystem: {
      mechanismType: "responsive premium mechanism",
      mechanismName: "Real Pro Ultra H.I. Massage Mechanism",
      massageCharacter: [
        "precise",
        "responsive",
        "deliberate rather than random",
        "guided by real-time feedback",
      ],
      responsivenessDescription:
        "system feeds information to a microprocessor and adjusts movements while working",
    },

    trackSystem: {
      trackType: "SL-Track",
      coverageDescription: "coverage from neck to upper hamstrings",
      stretchSupport: true,
      stretchDescription:
        "open angle between seat and back expands massage range and creates fuller stretch feel across back and legs",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "1260P Acupoint Body Scan",
      description:
        "builds a detailed body map for tailored pressure placement",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: ["infrared-heated rollers"],
      heatDescription:
        "localized warmth at the roller contact point",
    },

    lowerBodySupport: {
      hipsAndThighsAirCells: true,
      featureName: "Bodygrip Lower Body Air Cells",
      description:
        "wide compression and stabilization across hips and thighs",
    },

    calfAndFootSystem: {
      calfMassage: {
        hasCalfMassage: true,
        featureName: "Wrap-Around Calf Massage",
        description: "reaches around the front of the calves",
      },
      calfAcupressure: {
        hasBehindKneeAirCell: true,
        description: "air cell behind the knee at BL-40 point",
      },
      footMassage: {
        hasFootMassage: true,
        featureName: "Reflexology Foot Massage",
        description:
          "supports kneading and shiatsu-style sole work while feet are held in place",
      },
    },

    handAndArmSystem: {
      hasPalmMassage: true,
      featureName: "Shaped Palm Massage",
      description:
        "presses points at the thumb base and palm",
      airMassageZonesIncludeArms: true,
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: ["arms", "thighs", "legs", "soles"],
      description:
        "compressive support and stabilization around multiple zones",
    },

    controlsAndConvenience: {
      touchscreenController: true,
      bluetoothAudio: true,
      usbPort: true,
    },

    reclineAndPosture: {
      gravityPositioning: true,
      gravityRecline: true,
      zeroGravityImageShown: true,
      zeroGravityHardSpecListed: false,
      note: "page language refers to gravity position/recline, but zero gravity is not clearly listed in the main feature bullets as a hard spec",
    },

    serviceAndWarranty: {
      inHomeServiceEmphasis: true,
      multiYearPartsLaborCoverage: true,
    },

    experientialProfile: {
      strongestSensations: [
        "scan-guided pressure feels placed instead of guessed",
        "upper-back work feels deliberate",
        "hips and thighs feel stabilized while massage continues",
        "calf treatment feels more wrapped and structured than basic squeeze",
        "feet feel held while sole work happens",
        "palm pressure feels unusual in a good way",
      ],
      firstFiveMinutes: [
        "body settles back while mapping begins",
        "massage feels less random because of scan-guided targeting",
        "upper-back contact feels intentional",
        "calves feel wrapped instead of lightly squeezed",
        "feet stay anchored during reflexology-style action",
        "heat feels localized where rollers are working",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers wanting precise premium Panasonic engineering",
        "high-performers carrying stress in upper back and shoulders",
        "buyers who dislike repetitive generic massage patterns",
        "buyers wanting meaningful hips/thighs/calf/foot inclusion",
        "buyers who care about palm/hand pressure detail",
        "buyers seeking premium trust plus in-home service mindset",
      ],
      lessIdealFor: [
        "buyers optimizing for simplicity and comfort over precision depth",
        "buyers wanting Panasonic at the most compact or lowest entry price",
      ],
    },

    comparisons: [
      {
        model: "Panasonic MAK1",
        difference:
          "alternative Panasonic option for buyers prioritizing a different feature balance",
      },
      {
        model: "Panasonic MAF1",
        difference:
          "simpler Panasonic comfort/value option without MAN1's emphasis on ultra-precise mapping and stretch range",
      },
    ],

    verifiedClaims: [
      "Real Pro Ultra H.I. Massage Mechanism",
      "Panasonic SL-Track extends coverage from neck to upper hamstrings",
      "1260P Acupoint Body Scan",
      "Infrared-Heated Rollers",
      "Bodygrip Lower Body Air Cells",
      "Wrap-Around Calf Massage",
      "Calf Acupressure with air cell behind the knee (BL-40 point)",
      "Reflexology Foot Massage",
      "Shaped Palm Massage",
      "Bluetooth Audio",
      "USB Port",
      "Touchscreen Controller",
      "Air Massage Zones include arms, thighs, legs, and soles",
      "gravity positioning mentioned",
      "gravity recline mentioned",
      "in-home service emphasis mentioned",
      "multi-year parts/labor coverage details mentioned",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black and Ivory",
    ],

    softNotes: [
      "described as precise and consistent rather than random",
      "described as more technical and guided than many massage recliner models",
      "described as a premium choice where precision shows up fast in a short test",
      "described as helping buyers decide faster because the pressure mapping is obvious",
    ],

    excludedData: [
      "customer review quotes should not be used as hard product spec",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "DualTech Pro AI 4D": {
    slug: "positive-posture-dualtech-pro-ai-4d",
    displayName: "Positive Posture DualTech Pro AI 4D",
    brand: "Positive Posture",
    model: "DualTech Pro AI 4D",
    category: "massage-chair",

    pricing: {
      listPrice: 13999,
      salePrice: 11999,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: [],

    corePositioning: {
      primaryUseCase:
        "AI-guided premium dual-mechanism full-body massage chair",
      secondaryUseCases: [
        "high-stress buyers who want guided program selection",
        "deep-tissue seekers wanting layered upper/lower-body work",
        "buyers comparing premium chairs by feature depth rather than brand loyalty",
        "buyers wanting practical space-saving recline with premium feature density",
        "buyers who care a lot about foot/calf quality",
      ],
      positioningNotes: [
        "Page strongly positions this model around AI-guided recommendations plus dual mechanisms",
        "Upper body and lower body are meant to feel layered rather than like one single-track story",
        "Shoulder stabilization is part of the premium feel signature",
        "Space-saving recline and strong foot/calf sequence are major decision accelerators",
      ],
    },

    massageSystem: {
      mechanismType: "dual 4D mechanism",
      mechanismName: "4D² Dual Mech",
      upperAndLowerMechanisms: true,
      independentAdjustment: true,
      massageCharacter: [
        "layered upper/lower body coverage",
        "deep-tissue capable",
        "less repetitive than single-mechanism chairs",
      ],
    },

    aiGuidance: {
      hasAIProgramSuggestion: true,
      featureName: "AI De-Stress Test",
      scoreName: "Stress Algorithm Score",
      description:
        "takes a quick reading, analyzes indicators, and recommends programs",
    },

    trackSystem: {
      trackType: "WSL-Track",
      trackLengthInches: 55,
      coverageDescription:
        "consistent contact from neck/back to hips and glutes",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "Intelligent Body Scan",
      description: "maps the body to tailor sessions",
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      zeroGravityName: "True Zero Gravity",
      wallHugging: true,
      minimumWallClearance:
        "page has conflicting mentions: wall-hugging stated generally, FAQ says less than 1 inch behind the chair",
    },

    shoulderSystem: {
      hasShoulderAirCells: true,
      featureName: "Wings Of Embrace Shoulder Air Cells",
      description:
        "wraps shoulders for stabilizing compression before deeper work",
    },

    calfAndFootSystem: {
      calfMassage: {
        hasCalfMassage: true,
        featureName: "TheraKnead Calf Air Massage",
        description: "circular kneading plus compression",
      },
      calfRollers: {
        hasCalfRollers: true,
        featureName: "Dual Action Calf Rollers",
        description: "up/down and circular calf work",
      },
      footMassage: {
        hasFootRollers: true,
        featureName: "Dual Action Reflexology Foot Rollers",
        description:
          "arch travel plus ball rotation for two-zone foot work",
      },
    },

    airMassage: {
      hasAirMassage: true,
      airCellsCount: 54,
      coverageZones: [
        "shoulders",
        "arms",
        "hands",
        "waist",
        "legs",
        "feet",
      ],
      description: "full body air massage",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: ["low back", "arms"],
      heatDescription:
        "dual-zone heat intended to make deeper pressure easier to accept",
    },

    controlsAndConvenience: {
      touchscreenController: true,
      bluetoothSpeakers: true,
      wirelessPhoneCharger: true,
      fastIntensityChanges: true,
    },

    programs: {
      automaticProgramsCount: 20,
    },

    experientialProfile: {
      strongestSensations: [
        "body scan feels deliberate rather than generic",
        "shoulders feel held before deeper work starts",
        "upper and lower mechanisms feel layered",
        "feet get two distinct sensations under arch and ball",
        "heat in low back and arms softens deeper pressure",
        "calf sequence feels active because rollers and air both engage",
      ],
      firstFiveMinutes: [
        "chair settles user into position quickly",
        "body scan feels tailored rather than one-size-fits-all",
        "shoulder air cells create a braced, supported feeling",
        "foot system feels more complex than a single roller pattern",
        "heat shows up where pressure matters most",
        "touchscreen intensity changes feel quick",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers wanting guided program recommendation rather than guessing",
        "deep-tissue buyers wanting layered upper/lower-body work",
        "buyers who compare chairs by premium feature stack",
        "buyers who care a lot about foot and calf quality",
        "buyers wanting a flagship-like all-purpose Positive Posture option",
      ],
      lessIdealFor: [
        "buyers who already know exactly what they like and do not value the AI-guided layer",
        "buyers optimizing mainly for value over premium extras",
      ],
    },

    comparisons: [
      {
        model: "DualTech 4D Dual Massage Chair",
        difference:
          "similar dual-mech concept, but fewer premium elements and no AI-guided layer",
      },
      {
        model: "Positive Posture Brio Sport Massage Chair",
        difference:
          "sport/recovery-oriented positioning instead of all-purpose AI-guided flagship framing",
      },
    ],

    verifiedClaims: [
      "4D² Dual Mech with two 4D mechanisms",
      "upper and lower mechanisms can work together or be adjusted independently",
      "AI De-Stress Test",
      "Stress Algorithm Score",
      "True Zero Gravity Recline",
      "WSL-Track / 55 inches",
      "Intelligent Body Scan",
      "Wings Of Embrace Shoulder Air Cells",
      "TheraKnead Calf Air Massage",
      "Full Body Air Massage",
      "54 air cells",
      "Dual Zone Heat Therapy at low back and arms",
      "Dual Action Reflexology Foot Rollers",
      "Dual Action Calf Rollers",
      "Bluetooth Speakers",
      "Wireless Phone Charger",
      "20 Automatic Programs",
      "touchscreen controller implied by page text",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "color options not listed on product page",
    ],

    softNotes: [
      "described as ideal for high-stress buyers with no off switch",
      "described as a deep-tissue / all-purpose flagship-like Positive Posture option",
      "described as having a layered session feel versus one-track chairs",
      "described as ultra space-saving, though exact clearance language is inconsistent on the page",
    ],

    excludedData: [
      "customer review quotes should not be used as hard product spec",
      "FAQ says less than 1 inch behind the chair, while main text only says wall-hugging / ultra space-saving; exact clearance should be treated as unstable unless separately confirmed",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "Panasonic MAK1": {
    slug: "panasonic-mak1",
    displayName: "Panasonic MAK1 Massage Chair",
    brand: "Panasonic",
    model: "MAK1",
    category: "massage-chair",

    pricing: {
      listPrice: 16000,
      salePrice: 12499,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Black", "Ivory"],

    corePositioning: {
      primaryUseCase:
        "adaptive premium Panasonic full-body massage chair",
      secondaryUseCases: [
        "buyers wanting real-time massage adjustment",
        "buyers with tired lower body and stiff hips after long sitting",
        "buyers wanting premium full-body feel with easy touchscreen control",
        "buyers wanting repeatable favorite sessions through saved settings",
      ],
      positioningNotes: [
        "Page strongly positions this model around real-time adaptive massage",
        "Lower-body hold and foot/calf routine are major parts of the story",
        "Touchscreen-style control and saved settings reduce friction for repeat use",
        "This is framed as a premium Panasonic daily ritual, not a compact entry model",
      ],
    },

    massageSystem: {
      mechanismType: "adaptive premium mechanism",
      mechanismName: "Real Pro Ultra 4D Human Intelligence",
      massageCharacter: [
        "adaptive mid-session",
        "less robotic looping",
        "responsive pressure placement",
        "controlled premium feel",
      ],
      responsivenessDescription:
        "system is described as scanning and adapting during the massage",
    },

    bodyScanning: {
      hasBodyScan: true,
      bodyScanName: "1080P Acupoint Body Scan",
      description:
        "maps many points to tailor the session to the user's body",
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: ["legs", "lower body"],
      description:
        "page highlights full-body air massage and stronger lower-body hold with air support",
    },

    calfAndFootSystem: {
      calfMassage: {
        hasCalfMassage: true,
        description:
          "product description highlights foot/calf rollers plus air holding the calves for a locked-in feel",
      },
      footMassage: {
        hasFootMassage: true,
        featureName:
          "Reflexology-style foot and calf roller experience",
        description:
          "foot/calf rollers are a major part of the premium lower-body reset story",
      },
    },

    controlsAndConvenience: {
      controllerType: "tablet-style touchscreen remote",
      touchscreenController: true,
      focusControls: true,
      savedSettings: true,
      multiUserMemory: true,
    },

    reclineAndPosture: {
      deepRecline: true,
      stretchingSupport: true,
      gravityFeel: true,
      zeroGravityHardSpecListed: false,
      note: "page references a zero-gravity-like feel, but does not clearly list zero gravity as a hard spec",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: [
        "heating therapy",
        "pressure sensing massage heads mentioned",
      ],
      heatDescription:
        "heating therapy is described as adding warmth and depth to the session",
    },

    serviceAndWarranty: {
      premiumCustomerServiceNarrative: true,
    },

    experientialProfile: {
      strongestSensations: [
        "scan-guided start feels more dialed in at shoulders and back",
        "foot and calf area feels guided and anchored",
        "broad coverage can quickly switch to focused zones",
        "adaptive feel makes the session seem less repetitive",
        "touch navigation lowers setup friction",
      ],
      firstFiveMinutes: [
        "shoulders and back feel more accurately targeted after the scan",
        "foot and calf area feels held rather than slippery",
        "session can shift from broad to focused fairly quickly",
        "recline changes breathing and weight distribution",
        "overall feel comes across as premium tech rather than basic recliner massage",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers wanting adaptive Panasonic massage rather than fixed-pattern feel",
        "buyers with tired legs, stiff hips, and lower-body heaviness after long sitting",
        "buyers wanting premium full-body coverage with easy controls",
        "buyers who want repeatable favorite sessions through memory settings",
        "buyers comparing premium Panasonic options and wanting the smart/adaptive story",
      ],
      lessIdealFor: [
        "buyers optimizing mainly for compact footprint",
        "buyers prioritizing MAN1-style precision detail and SL-track coverage story over adaptive convenience",
      ],
    },

    comparisons: [
      {
        model: "Panasonic MAN1",
        difference:
          "MAN1 is framed as the stronger alternative for SL-track coverage and high-precision motion detail",
      },
      {
        model: "Panasonic MAF1",
        difference:
          "MAF1 is framed as Panasonic's most compact 27-inch-wide option for smaller spaces",
      },
    ],

    verifiedClaims: [
      "Real-time scanning during the massage for adaptive feel",
      "Real Pro Ultra 4D Human Intelligence mechanism described on-page",
      "Focus controls",
      "Reflexology-style foot and calf roller experience described on-page",
      "air compression coverage across legs and lower body hold",
      "multi-user memory mentioned",
      "deep recline positioning described for stretching and long sessions",
      "1080P Acupoint Body Scan",
      "user-friendly tablet remote / simple touch navigation",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Black and Ivory",
    ],

    softNotes: [
      "described as adapting mid-session and feeling less robotic",
      "described as giving a luxury reset without leaving home",
      "described as premium tech rather than a basic massage recliner",
      "described as making try-confirm-purchase decisions simpler in showroom context",
    ],

    excludedData: [
      "customer review quotes should not be used as hard product spec",
      "page references a zero-gravity-like feel but does not clearly list zero gravity as a hard spec",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },

  "Solara": {
    slug: "positive-posture-solara",
    displayName: "Positive Posture Solara Massage Chair",
    brand: "Positive Posture",
    model: "Solara",
    category: "massage-chair",

    pricing: {
      listPrice: 4000,
      salePrice: 2499,
      currency: "USD",
    },

    availability: {
      inStock: true,
      estimatedDelivery: "5–14 business days",
      financingAvailable: true,
      financingProvider: "Affirm",
      extendedFactoryWarrantyAvailable: true,
    },

    colors: ["Pewter", "Butterscotch"],

    corePositioning: {
      primaryUseCase: "easy daily-comfort value massage chair",
      secondaryUseCases: [
        "desk-job upper-back tension",
        "living-room-friendly home placement",
        "buyers wanting value without cheap-feel compromise",
        "buyers wanting simple controls and low setup friction",
        "buyers wanting a steady nightly comfort routine",
      ],
      positioningNotes: [
        "Page strongly positions this model around value plus clean daily usability",
        "Living-room-friendly appearance is a major part of the story",
        "Simple controls and no-assembly setup reduce learning friction",
        "The feel is framed as steady and comfort-forward rather than aggressive or tech-heavy",
      ],
    },

    massageSystem: {
      mechanismType: "4-roller",
      mechanismName: "4-roller massage engine",
      massageCharacter: [
        "steady contact",
        "smooth glide",
        "less random-feeling than cheaper chairs",
        "comfort-forward",
      ],
    },

    trackSystem: {
      trackType: "SL-Track",
      coverageDescription: "neck-to-hamstrings support",
      faqCoverageDescription:
        "neck, back, glutes, and upper hamstrings",
    },

    reclineAndSpace: {
      hasZeroGravity: true,
      zeroGravityName: "True Zero Gravity",
      wallHugging: true,
      spaceSavingDescription: "built for tighter rooms",
    },

    airMassage: {
      hasAirMassage: true,
      coverageZones: [
        "shoulders",
        "arms",
        "hands",
        "calves",
        "feet",
      ],
      description: "full-body air compression",
    },

    heatSystem: {
      hasHeat: true,
      heatComponents: ["back", "calves"],
      heatDescription:
        "warmer comfort-focused session with lower-body wrap feel",
    },

    footSystem: {
      hasFootRollers: true,
      featureName: "Bi-directional dual-speed foot rollers",
      description:
        "targeted foot pressure from multiple angles with speed-based intensity control",
    },

    controlsAndConvenience: {
      wirelessPhoneCharging: true,
      bluetoothSpeakers: true,
      integratedTouchController: true,
      simpleTouchController: true,
      voiceControl: true,
      noAssemblyRequired: true,
    },

    loungeUse: {
      usableAsRecliner: true,
      removableSeatPad: true,
    },

    experientialProfile: {
      strongestSensations: [
        "steady back contact instead of jumpy motion",
        "weightless recline changes pressure feel quickly",
        "air compression creates a gentle held sensation",
        "back and calf heat soften the session",
        "foot rollers feel adjustable by speed rather than fixed",
      ],
      firstFiveMinutes: [
        "recline changes body weight feel right away",
        "back rollers settle into a steady rhythm",
        "air compression creates a held feeling through arms and lower body",
        "heat builds in back and calves",
        "foot rollers become more specific once preferred speed is found",
        "Bluetooth audio makes the session feel more routine-based",
      ],
    },

    buyerFit: {
      bestFor: [
        "buyers wanting a value-oriented full-body chair without a cheap feel",
        "desk workers with upper-back stress",
        "buyers wanting a living-room-friendly look",
        "buyers who want simple setup and low learning curve",
        "buyers wanting an easy nightly comfort routine",
      ],
      lessIdealFor: [
        "buyers wanting stronger tech-forward / robotic system feel",
        "buyers wanting more advanced dual-mechanism architecture",
      ],
    },

    comparisons: [
      {
        model: "Positive Posture Sol",
        difference:
          "simpler essentials model with fewer programs and a more stripped-down experience",
      },
      {
        model: "Positive Posture DualTech 4D Dual",
        difference:
          "more advanced multi-mechanism setup with a stronger system feel and different intensity profile",
      },
    ],

    verifiedClaims: [
      "SL-Track coverage",
      "4-roller massage engine",
      "full-body air compression",
      "True Zero Gravity recline",
      "heat in the back and calves",
      "bi-directional dual-speed foot rollers",
      "wireless phone charging",
      "Bluetooth speakers",
      "simple touch integrated controller",
      "no assembly required",
      "usable as a recliner with removable seat pad in place",
      "voice control mentioned",
      "wall-hugging design mentioned",
      "in stock",
      "5–14 business day estimated delivery",
      "financing available",
      "extended factory warranty available",
      "colors: Pewter and Butterscotch",
    ],

    softNotes: [
      "described as a smart value upgrade",
      "described as clean-looking and living-room friendly",
      "described as steady rather than random in pressure feel",
      "described as easier daily use than more gadget-like chairs",
    ],

    excludedData: [
      "customer review quotes should not be used as hard product spec",
      "booking/demo language intentionally excluded",
      "health-outcome language should not be stored as hard technical spec",
    ],
  },
};

// ── Helpers ──

export const getProductKnowledge = (chairName) => {
  return productKnowledge[chairName] || null;
};

export const getProductPricing = (chairName) => {
  return productKnowledge[chairName]?.pricing || null;
};

export const getBuyerFit = (chairName) => {
  return productKnowledge[chairName]?.buyerFit || null;
};

export const getExperientialProfile = (chairName) => {
  return productKnowledge[chairName]?.experientialProfile || null;
};

export const getFitSpecs = (chairName) => {
  return productKnowledge[chairName]?.fitSpecs || null;
};
