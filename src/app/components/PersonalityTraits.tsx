import { InteractiveSlider } from './InteractiveSlider';

interface Traits {
  valueHunter: number;
  researcher: number;
  brandDevoted: number;
  impulseShopping: number;
  socialButterfly: number;
  replenisher: number;
  mobileShopping: number;
  ethicalIngredients: number;
  gifter: number;
  techSavvy: number;
}

interface TraitInsights {
  valueHunter: string;
  researcher: string;
  brandDevoted: string;
  impulseShopping: string;
  socialButterfly: string;
  replenisher: string;
  mobileShopping: string;
  ethicalIngredients: string;
  gifter: string;
  techSavvy: string;
}

interface PersonalityTraitsProps {
  traits: Traits;
  totalScore: number;
  updateTrait: (trait: keyof Traits, value: number) => void;
  traitInsights: TraitInsights;
}

const TRAIT_LABELS: { key: keyof Traits; label: string; toolTip: string }[] = [
  { 
    key: 'valueHunter', 
    label: 'Value Hunter',
    toolTip: 'Seeks deals, discounts, and maximum value for money enjoys promos, Limited Time Offers'
  },
  { 
    key: 'researcher', 
    label: 'Researcher',
    toolTip: 'Thoroughly investigates products before purchasing'
  },
  { 
    key: 'brandDevoted', 
    label: 'Brand Devoted',
    toolTip: 'Loyal to preferred brands and recommends to others'
  },
  { 
    key: 'impulseShopping', 
    label: 'Impulse shopper',
    toolTip: 'Makes spontaneous purchase decisions'
  },
  { 
    key: 'socialButterfly', 
    label: 'Social Butterfly',
    toolTip: 'Highly engaged in social networks and sharing experiences'
  },
  { 
    key: 'replenisher', 
    label: 'Replenisher',
    toolTip: 'Consistently reorders favorite products on schedule'
  },
  { 
    key: 'mobileShopping', 
    label: 'Mobile Shopper',
    toolTip: 'Prefers shopping via mobile apps and devices'
  },
  { 
    key: 'ethicalIngredients', 
    label: 'Ethical Shopper',
    toolTip: 'Prioritizes sustainable, ethical, and clean ingredients'
  },
  { 
    key: 'gifter', 
    label: 'Gifter',
    toolTip: 'Frequently purchases products as gifts for others'
  },
  { 
    key: 'techSavvy', 
    label: 'Tech Savvy',
    toolTip: 'Comfortable with technology and digital platforms'
  }
];

export function PersonalityTraits({ traits, totalScore, updateTrait, traitInsights }: PersonalityTraitsProps) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 overflow-visible w-[450px]">
      <div className="content-stretch flex font-['Avenir:Book',_sans-serif] gap-[10px] items-center justify-center leading-[normal] not-italic relative shrink-0 text-[25px] w-full">
        <p className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[#669ad4]">PERSONALITY</p>
        <p className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[#111111] text-right">{totalScore}/100*</p>
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 overflow-visible">
        {TRAIT_LABELS.map(({ key, label, toolTip }) => (
          <InteractiveSlider
            key={key}
            label={label}
            value={traits[key]}
            onChange={(v) => updateTrait(key, v)}
            toolTip={toolTip}
            traitInsight={traitInsights?.[key] || "N/A"}
          />
        ))}
      </div>
    </div>
  );
}