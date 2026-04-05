// ─────────────────────────────────────────────
// CRM v2 — Follow-Up Logic
// Friction-specific 24h / 72h / 7d sequences
// ─────────────────────────────────────────────

import { getProductLink } from '../data/productLibrary';

// ── Follow-Up Sequence Generator ──

export function generateFollowUps(leadData, intelligence, repData, finalDecision) {
  const name = leadData?.firstName || 'Customer';
  const targetChair = finalDecision?.finalBestFitChair || repData?.repBestFit || intelligence?.topChairs?.[0] || 'your recommended chair';
  const backupChair = finalDecision?.backupChair || intelligence?.topChairs?.[1] || null;
  const chairLink = getProductLink(targetChair);
  const backupLink = backupChair ? getProductLink(backupChair) : null;

  if (!repData) {
    return {
      type: "Pending",
      messages: [{
        time: "N/A",
        title: "Demo Pending",
        message: "Complete the physical showroom demo with the customer, then fill out the Post-Demo Rep form to unlock personalized follow-up automations."
      }]
    };
  }

  // ── Post-Purchase Flow ──
  if (repData.purchaseStatus === "Closed Won") {
    const boughtChair = repData.repBestFit || targetChair;
    const buyLink = getProductLink(boughtChair);
    return {
      type: "Post-Purchase",
      messages: [
        {
          time: "24 Hours",
          title: "Order Confirmation & Thank You",
          message: `Hi ${name}, thank you so much for trusting us with your wellness journey. Your order for the ${boughtChair} is confirmed! You can review the specs and delivery prep guide here: ${buyLink}`
        },
        {
          time: "1 Week",
          title: "Delivery Update",
          message: `Hi ${name}, your ${boughtChair} is being prepped for white-glove delivery. Our logistics team will text you shortly to schedule your exact delivery window.`
        },
        {
          time: "1 Month",
          title: "Happiness & Warranty Check",
          message: `Hi ${name}, checking in on your ${boughtChair}. How has your daily routine been since it arrived? If you need help registering your warranty, just reply to this message!`
        },
        {
          time: "3 Months",
          title: "Referral Bonus",
          message: `Hi ${name}, loving your ${boughtChair}? Send a friend to our showroom, and if they purchase, we'll send you a $250 referral bonus as a thank you.`
        }
      ]
    };
  }

  // ── Friction-Specific Nurture Sequences ──
  const realObjection = finalDecision?.realObjection || repData.statedObjection || "No clear objection stated";
  
  let messages = [];

  if (realObjection === "Partner / spouse" || realObjection === "Spouse / joint decision") {
    messages = [
      {
        time: "24 Hours",
        title: "Short Spouse Summary",
        message: `Hi ${name}, it was great meeting you today! Since you mentioned wanting to share this with your partner, here's a simple summary of the ${targetChair}: ${chairLink}. It covers the key specs, comfort highlights, and pricing — everything they'd want to see.`
      },
      {
        time: "72 Hours",
        title: "Invite Both for Quick Return Demo",
        message: `Hi ${name}, checking in. Have you and your partner had a chance to review the ${targetChair}? If it helps, I'd love to invite you both in for a VIP session so they can feel the difference themselves. We can keep it quick and low-pressure.`
      },
      {
        time: "7 Days",
        title: "Comfort + Fit for Both",
        message: `Hi ${name}, just a quick note — the ${targetChair} is especially popular with couples because of how well it adapts to different body types. If you'd like, I can also show how it compares to the ${backupChair || 'backup option'} for shared use. Let me know!`
      }
    ];
  }

  else if (realObjection === "Price / payment" || realObjection === "Payment comfort") {
    messages = [
      {
        time: "24 Hours",
        title: "Cash vs Financing Breakdown",
        message: `Hi ${name}, great spending time with you today! Since the ${targetChair} was clearly your favorite, here's a quick look at the financing options: ${chairLink}. We have 0% APR available that can make the monthly commitment very comfortable.`
      },
      {
        time: "72 Hours",
        title: "Comfortable Monthly Option",
        message: `Hi ${name}, just checking in. We currently have a unit of the ${targetChair} in our local warehouse that I can lock in for you. The monthly payment breaks down to less than most people expect. Want me to send over the exact numbers?`
      },
      {
        time: "7 Days",
        title: "Ownership Value",
        message: `Hi ${name}, I found a helpful way to think about the investment: the ${targetChair} costs less per day than a coffee over its lifetime. And unlike a subscription, you own it outright. Let me know if you're ready to move forward!`
      }
    ];
  }

  else if (realObjection === "Space / measurements" || realObjection === "Space-fit") {
    messages = [
      {
        time: "24 Hours",
        title: "Dimensions + Fit Checklist",
        message: `Hi ${name}, as promised, here are the exact footprint dimensions for the ${targetChair}: ${chairLink}. You'll find the full dimensional breakdown under 'Specs'. I've also attached our room-fit checklist for easy measuring.`
      },
      {
        time: "72 Hours",
        title: "FaceTime / Measurement Help",
        message: `Hi ${name}, did the ${targetChair} measurements work for your space? If you'd like, I can jump on a quick FaceTime call and look at the room with you — takes about 3 minutes and I can confirm the fit right away.`
      },
      {
        time: "7 Days",
        title: "Easy Room-Fit Reminder",
        message: `Hi ${name}, just checking to see if you mapped out the room yet! If the ${targetChair} dimensions are tight, we also have the ${backupChair || 'a more compact alternative'} which has a smaller footprint with a very similar feel.`
      }
    ];
  }

  else if (realObjection === "Wants to research more" || realObjection === "Comparison overload") {
    messages = [
      {
        time: "24 Hours",
        title: "Best 2 Only Comparison",
        message: `Hi ${name}, since you mentioned wanting to compare further, here's a clean side-by-side of the ${targetChair} vs the ${backupChair || 'your runner-up'}: ${chairLink}. This should make the key differences much clearer.`
      },
      {
        time: "72 Hours",
        title: "Premium vs Value Simplifier",
        message: `Hi ${name}, I put together a quick comparison highlighting the real-world differences between the top two models. The biggest differentiator for most people comes down to ${finalDecision?.followUpAngle || 'the daily feel'}. Happy to walk through it whenever you're ready.`
      },
      {
        time: "7 Days",
        title: "Service / Fit Certainty",
        message: `Hi ${name}, take all the time you need with the research. When you're ready, come back and sit in the ${targetChair} one more time — the second visit usually makes everything click. I'll keep your profile saved.`
      }
    ];
  }

  else if (realObjection === "Not fully convinced on fit" || realObjection === "Confidence / service reassurance") {
    messages = [
      {
        time: "24 Hours",
        title: "Service + Warranty + Fit Explanation",
        message: `Hi ${name}, I wanted to follow up with full clarity on the ${targetChair}: ${chairLink}. It comes with an extended factory warranty, white-glove delivery, and our in-home service commitment. You'll be fully supported.`
      },
      {
        time: "72 Hours",
        title: "Why This Model Won",
        message: `Hi ${name}, based on what we discussed and what you experienced in the showroom, the ${targetChair} is genuinely the strongest match for your needs — specifically the ${finalDecision?.followUpAngle || 'precision and comfort'} aspect. Let me know if any questions came up since then.`
      },
      {
        time: "7 Days",
        title: "Softer Reassurance Check-In",
        message: `Hi ${name}, just checking in — no pressure at all. If you'd like to come back for a second sit and really confirm the feel, I'm happy to arrange a private appointment. Sometimes the second visit makes all the difference.`
      }
    ];
  }

  else {
    // Default / "No clear objection"
    messages = [
      {
        time: "24 Hours",
        title: "Product Summary + Next Step",
        message: `Hi ${name}, great meeting you today! Here's the full page for the ${targetChair}: ${chairLink}. Everything we discussed is right there. Let me know the best delivery day and I'll lock it in.`
      },
      {
        time: "72 Hours",
        title: "Availability Check",
        message: `Hi ${name}, we're finalizing delivery routes for next week. If we get the green light today, I can secure a priority delivery slot for your ${targetChair}.`
      },
      {
        time: "7 Days",
        title: "Soft Ping",
        message: `Hi ${name}, just checking in! No pressure at all. I'll keep an eye on inventory for the ${targetChair} and let you know if stock gets low or any seasonal promotions come up.`
      }
    ];
  }

  return {
    type: "Nurture",
    frictionType: realObjection,
    messages
  };
}
