import { getProductLink, getProductDescription } from '../data/productLibrary';

export function generateFollowUps(leadData, results, repData) {
  const name = leadData?.firstName || 'Customer';
  const chairs = results?.topChairs || ['the massage chair'];
  const targetChair = repData?.preferredChair || chairs[0] || 'your recommended chair';
  const temperature = repData?.temperature || 'Warm';
  const objection = repData?.objection || 'None';

  if (!repData) {
      return {
        type: "Pending",
        messages: [{time: "N/A", title: "Demo Pending", message: "Complete the physical showroom demo with the customer, then fill out the Post-Demo Rep form to unlock personalized SMS/Email automations."}]
      };
  }

  if (repData.didPurchase) {
     const boughtChair = repData.purchasedChair;
     const buyLink = getProductLink(boughtChair);
     return {
       type: "Post-Purchase",
       messages: [
         { time: "24 Hours", title: "Order Confirmation & Thank You", message: `Hi ${name}, thank you so much for trusting us with your wellness journey. Your order for the ${boughtChair} is confirmed! You can review the specs and delivery prep guide here: ${buyLink}` },
         { time: "1 Week", title: "Delivery Update", message: `Hi ${name}, your ${boughtChair} is being prepped for white-glove delivery. Our logistics team will text you shortly to schedule your exact delivery window.` },
         { time: "1 Month", title: "Happiness & Warranty Check", message: `Hi ${name}, checking in on your ${boughtChair}. How has your recovery routine been since it arrived? If you need any help registering your warranty, just reply to this message!` },
         { time: "3 Months", title: "Referral Bonus", message: `Hi ${name}, loving your ${boughtChair}? Send a friend to our showroom, and if they buy, we'll send you a $250 referral bonus as a thank you.` }
       ]
     }
  }

  const chairLink = getProductLink(targetChair);
  const chairDesc = getProductDescription(targetChair);

  // Base personalized blocks based on objections
  let t24 = `Hi ${name}, it was great hosting you in the showroom today!`;
  let t72 = `Hi ${name}, just checking in.`;
  let tWeek = `Hi ${name},`;

  if (objection === 'Price/Budget') {
    t24 += ` Since the ${targetChair} was clearly your favorite, I wanted to quickly send over our 0% financing breakdown. You can review the exact pricing and specs here: ${chairLink}`;
    t72 += ` Do you have any questions about the math on the ${targetChair}? We currently have a unit in our local warehouse that I can lock in for you before the next price adjustment.`;
    tWeek += ` I found a helpful article on the long-term cost benefits of bringing recovery in-house vs seeing a specialist. The ${targetChair} pays for itself faster than most realize. Give me a call if you are ready!`;
  } 
  else if (objection === 'Partner') {
    t24 += ` I know you loved the feel of the ${targetChair}, but making sure your spouse is on board is step one! Here is the official page with a video to show them exactly what we tested: ${chairLink}`;
    t72 += ` Have you and your partner had a chance to chat about the ${targetChair}? If it helps, I'd love to invite you both back in for a VIP session so they can feel it for themselves.`;
    tWeek += ` If you and your spouse are still weighing options, I can put together a side-by-side comparison of the ${targetChair} against anything else they might be looking at.`;
  }
  else if (objection === 'Measurements') {
    t24 += ` As promised, I'm sending over the exact footprint dimensions for the ${targetChair}. You can find the full dimensional breakdown under 'Specs' here: ${chairLink}`;
    t72 += ` Did the ${targetChair} measurements fit your space? Let me know if you need me to jump on a quick FaceTime call to look at the room with you!`;
    tWeek += ` Just checking to see if you mapped out the room yet! If the ${targetChair} is too tight, we have compact models I can show you that feel very similar.`;
  }
  else if (objection === 'Researching' || objection === 'Feature Limitation') {
    t24 += ` Since you are doing a deep dive on your research, here is the official page for the ${targetChair}: ${chairLink}. Note that ${chairDesc.toLowerCase()}`;
    t72 += ` Found an interesting comparison video between the ${targetChair} and other chairs on the market. Thought you'd appreciate a completely transparent look at why the engineering on this one is so different.`;
    tWeek += ` Take all the time you need researching. The ${targetChair} is a serious investment. Once you are done comparing, come back in and sit in it one more time.`;
  }
  else {
    t24 += ` I am so glad we narrowed it down perfectly to the ${targetChair}. You can review everything we talked about here: ${chairLink}. Let me know the exact delivery day you prefer!`;
    t72 += ` We are finalizing the white-glove delivery routes for next week. If we get the green light today, I can secure a VIP delivery slot for your ${targetChair}.`;
    tWeek += ` Just checking in! If the timing isn't right yet, no pressure at all. I'll keep an eye on inventory for the ${targetChair} and let you know if stock gets low.`;
  }

  return {
    type: "Nurture",
    messages: [
      { time: "24 Hours", title: "Product Direct Link & Empathy", message: t24 },
      { time: "72 Hours", title: "Urgency / Solution", message: t72 },
      { time: "1 Week", title: "Soft Check-in (No pressure)", message: tWeek },
      { time: "15 Days", title: "Seasonal Promotion Hook", message: `Hi ${name}, our seasonal event is approaching. Since you were so drawn to the ${targetChair}, I'm keeping an eye out for any floor model discounts that pop up.` },
      { time: "1 Month", title: "Final Ping", message: `Hi ${name}, I am updating my showroom roster today. Are you still actively looking at the ${targetChair}, or did you end up going another route?` }
    ]
  };
}
