import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface EngagementScaleProps {
  totalScore: number;
  getEngagementLevel: (score: number) => string;
}

function getScoreTooltip(score: number): React.ReactNode {
  if (score >= 0 && score <= 5) {
    return <><strong>Low-engagement trier</strong>: Likely impulse buy. <strong>Suggest</strong>: Run awareness ads on social media highlighting free samples or gut health trials to convert to repeat retail; avoid pushy upsells to prevent alienation.</>;
  } else if (score >= 6 && score <= 10) {
    return <><strong>Brand newbie</strong>: Minimal loyalty. <strong>Business play</strong>: Use email funnels with educational content on microbiome benefits; track open rates to identify warm leads for personalized follow-up calls.</>;
  } else if (score >= 11 && score <= 16) {
    return <><strong>Edge of curiosity</strong>: Open to trying more. <strong>Idea</strong>: Offer bundle deals via retargeting ads; critically, monitor cart abandonment—high rates signal product skepticism in entry-level buyers.</>;
  } else if (score >= 17 && score <= 20) {
    return <><strong>Building mild interest</strong>: Hesitant on commitment. <strong>Suggest</strong>: Send trust-building newsletters with customer testimonials; funnel to VIP signup with $1 intro offer to ease entry.</>;
  } else if (score >= 21 && score <= 25) {
    return <><strong>Mid-trust phase</strong>: Swayable to upgrades. <strong>Business angle</strong>: Use SMS reminders for autoship perks like 10% discounts; supportively boosts retention, but critically, over-messaging risks opt-outs.</>;
  } else if (score >= 26 && score <= 34) {
    return <><strong>Nearing VIP threshold</strong>: High upgrade potential. <strong>Idea</strong>: Personalized video outreach sharing success stories; marketing funnel: Lead magnet webinars on wellness routines to nudge toward $9.95 membership.</>;
  } else if (score >= 35 && score <= 40) {
    return <><strong>Early trust erosion</strong>: Risk of churn. <strong>Suggest</strong>: Reactivation emails focusing on product efficacy (e.g., microbiome support); funnel with loyalty rewards to rebuild confidence.</>;
  } else if (score >= 41 && score <= 45) {
    return <><strong>Waning VIP loyalty</strong>: Address doubts promptly. <strong>Business play</strong>: Survey for feedback via app notifications; critically, ignore red flags like missed autoships and retention drops 20-30%.</>;
  } else if (score >= 46 && score <= 54) {
    return <><strong>Approaching recovery</strong>: Salvageable trust. <strong>Idea</strong>: Targeted social campaigns with VIP-exclusive content; support team calls to discuss benefits, preventing downgrade to retail.</>;
  } else if (score >= 55 && score <= 64) {
    return <><strong>Solid VIP belief</strong>: Prime for influence. <strong>Suggest</strong>: Ambassador teaser communications via email funnels highlighting earning potential; pair with product success tracking to encourage sharing.</>;
  } else if (score >= 65 && score <= 71) {
    return <><strong>Growing confidence</strong>: Business opportunity. <strong>Idea</strong>: Host virtual events on rank advancement (e.g., earning Plexus Points from referrals); marketing: Drip campaigns showing 100 PV paths to commissions.</>;
  } else if (score >= 72 && score <= 74) {
    return <><strong>High ambassador potential</strong>: Close to upgrade. <strong>Business Play</strong>: Personalized mentoring sessions on Fast Start bonuses; critically, set realistic goals—only ~1% reach top ranks, so focus on sustainable team building.</>;
  } else if (score >= 75 && score <= 78) {
    return <><strong>Early struggle signs</strong>: Confidence dip. <strong>Suggest</strong>: Re-engagement webinars on lead generation; funnel with peer support groups to prevent reversion to VIP.</>;
  } else if (score >= 79 && score <= 83) {
    return <><strong>Business stagnation</strong>: Risk of downgrade. <strong>Idea</strong>: Analyze downline metrics for compression issues; communications: Motivational emails with Silver Star tips to rebuild momentum.</>;
  } else if (score >= 84 && score <= 85) {
    return <><strong>Nearing reversion</strong>: Urgent intervention. <strong>Business angle</strong>: One-on-one coaching on enrollment strategies; critically, address burnout—high attrition in lower ranks underscores need for balanced expectations.</>;
  } else if (score >= 86 && score <= 88) {
    return <><strong>Strong performer</strong>: Up/down risk. <strong>Suggest</strong>: Advanced marketing funnels for team expansion (e.g., social follower growth hacks); support with Emerald pool shares to incentivize.</>;
  } else if (score >= 89 && score <= 92) {
    return <><strong>Thriving influencer</strong>: Balance needed. <strong>Idea</strong>: Content creation tools for sharing success; communications: Newsletters on Car Bonus eligibility to push toward higher ranks.</>;
  } else if (score >= 93 && score <= 97) {
    return <><strong>Peak influence</strong>: Sway to top or slip. <strong>Business Play</strong>: Strategic planning sessions on Icon Club enrollment goals; critically, monitor for competition—external MLMs could poach if trust wavers.</>;
  } else if (score === 98) {
    return <><strong>Diamond-level elite</strong>: Maintain edge. <strong>Suggest</strong>: Exclusive leadership retreats; marketing: VIP recruitment drives to sustain points and pools.</>;
  } else if (score === 99) {
    return <><strong>Top-tier stability</strong>: Risk of fall. <strong>Idea</strong>: Advanced analytics on team PV; communications: Peer networks for Double Diamond strategies to lock in status.</>;
  } else if (score === 100) {
    return <><strong>Ultimate achiever</strong>: Sustain supremacy. <strong>Business play</strong>: Legacy-building funnels like mentorship programs; critically, diversify income streams—relying solely on Plexus can lead to vulnerability if market shifts.</>;
  }
  return "Hover over the indicator for engagement insights.";
}

export function EngagementScale({
  totalScore,
  getEngagementLevel,
}: EngagementScaleProps) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex gap-[10px] items-center justify-center leading-[normal] not-italic relative shrink-0 text-[25px] w-full">
        <p className="font-['Avenir:Book',_sans-serif] relative shrink-0 text-[#669ad4] text-nowrap whitespace-pre">Customer Engagement:</p>
        <p className="font-['Avenir:Heavy',_sans-serif] relative shrink-0 text-[#669ad4] text-nowrap whitespace-pre">{getEngagementLevel(totalScore)}</p>
        <p className="basis-0 font-['Avenir:Book',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[#111111] text-right">{totalScore}/100*</p>
      </div>
      
      {/* Engagement Scale */}
      <div className="content-stretch flex flex-col gap-[16px] h-[59px] items-start relative shrink-0 w-full">
        <div className="h-[156px] overflow-clip relative shrink-0 w-full">
          <div className="absolute content-stretch flex font-['Avenir:Roman',_sans-serif] items-center justify-between leading-[normal] left-0 not-italic text-[#111111] text-[15px] text-nowrap top-0 w-[961px] whitespace-pre">
            <p className="relative shrink-0">Unaware 0-35</p>
            <p className="relative shrink-0">VIP (35-75)</p>
            <p className="relative shrink-0 text-right">Ambassador 75-100</p>
          </div>
          <div className="absolute content-stretch flex font-['Avenir:Roman',_sans-serif] items-center justify-between leading-[normal] left-0 not-italic text-[#111111] text-[15px] text-nowrap top-[39px] w-[961px] whitespace-pre">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num, idx) => (
              <p key={idx} className={`relative shrink-0 ${idx === 10 ? 'text-right' : ''}`}>{num}</p>
            ))}
          </div>
          <div className="absolute bottom-[79.37%] left-[0.67%] right-0 top-[14.74%]">
            <div className="absolute inset-[33.65%_-0.16%]" style={{ "--stroke-0": "rgba(204, 204, 204, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 959 4">
                <path d="M2 1.58824H956.593" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="absolute aspect-[16/16] top-[calc(50%-50px)] translate-y-[-50%] cursor-help"
                  style={{
                    left: `${(totalScore / 100) * 95}%`,
                    right: `${100 - (totalScore / 100) * 95 - 1.66}%`
                  }}
                >
                  <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" r="9" />
                    </svg>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{getScoreTooltip(totalScore)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="content-stretch flex flex-col font-['Avenir:Book',_sans-serif] gap-[4px] items-start justify-center leading-[normal] not-italic relative shrink-0 w-full">
        <p className="relative shrink-0 text-[#669ad4] text-[25px] text-nowrap whitespace-pre">What to Nurture</p>
        <div className="min-w-full relative shrink-0 text-[#111111] text-[22px] w-[min-content] whitespace-pre-wrap">
          If you're dealing with a Low-engagement trier—likely an impulse buyer at risk of vanishing—run social media awareness ads touting free samples or gut health trials to foster repeat retail buys. Skip pushy upsells to avoid scaring them off
        </div>
      </div>
    </div>
  );
}
