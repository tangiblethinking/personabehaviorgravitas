import { Code } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { parsePersonaCode } from "../utils/personaParser";

interface CodeEditorButtonProps {
  personaData: any;
  onPersonaUpdate: (updatedPersona: any) => void;
}

// Helper function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  if (!html || html === "N/A") return "N/A";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "N/A";
}

export function CodeEditorButton({ personaData, onPersonaUpdate }: CodeEditorButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [codeText, setCodeText] = useState("");

  const generateCodeString = () => {
    return `const [personaData, setPersonaData] = useState({
  // Identity
  name: ${JSON.stringify(personaData.name)},
  tagline: ${JSON.stringify(personaData.tagline)},
  role: ${JSON.stringify(personaData.role)},
  subtitle: ${JSON.stringify(personaData.subtitle)},
  quote: ${JSON.stringify(personaData.quote)},
  quoteNote: ${JSON.stringify(stripHtml(personaData.quoteNote))},

  // Demographics
  age: ${JSON.stringify(personaData.age)},
  gender: ${JSON.stringify(personaData.gender)},
  income: ${JSON.stringify(personaData.income)},
  education: ${JSON.stringify(personaData.education)},
  location: ${JSON.stringify(personaData.location)},
  occupation: ${JSON.stringify(personaData.occupation)},
  family: ${JSON.stringify(personaData.family)},
  spouseOccupation: ${JSON.stringify(personaData.spouseOccupation)},

  // Consumer Details
  consumerType: ${JSON.stringify(personaData.consumerType)},
  consumerGeneration: ${JSON.stringify(personaData.consumerGeneration)},
  consumerAge: ${personaData.consumerAge},
  personalityScore: ${personaData.personalityScore},
  
  favoriteBrands: {
    apparel: ${JSON.stringify(personaData.favoriteBrands.apparel)},
    supplement: ${JSON.stringify(personaData.favoriteBrands.supplement)},
    fitnessEducation: ${JSON.stringify(personaData.favoriteBrands.fitnessEducation)},
    shoppingStore: ${JSON.stringify(personaData.favoriteBrands.shoppingStore)},
    plexus: ${JSON.stringify(personaData.favoriteBrands.plexus)}
  },

  // Characteristics (4 tags)
  characteristics: ${JSON.stringify(personaData.characteristics, null, 4).replace(/\n/g, '\n  ')},

  // Brand Pills (brand_1, brand_2, brand_3, brand_4 - generic and editable)
  brand_1: ${JSON.stringify(personaData.brand_1)},
  brand_2: ${JSON.stringify(personaData.brand_2)},
  brand_3: ${JSON.stringify(personaData.brand_3)},
  brand_4: ${JSON.stringify(personaData.brand_4)},

  // Platform Pills (platform_1, platform_2, platform_3, platform_4 - generic and editable)
  platform_1: ${JSON.stringify(personaData.platform_1)},
  platform_2: ${JSON.stringify(personaData.platform_2)},
  platform_3: ${JSON.stringify(personaData.platform_3)},
  platform_4: ${JSON.stringify(personaData.platform_4)},

  // Narrative
  about: ${JSON.stringify(personaData.about)},

  // Lists
  goals: ${JSON.stringify(personaData.goals, null, 2).replace(/\n/g, '\n  ')},
  needs: ${JSON.stringify(personaData.needs, null, 2).replace(/\n/g, '\n  ')},
  painPoints: ${JSON.stringify(personaData.painPoints, null, 2).replace(/\n/g, '\n  ')},

  // Consumer Habits
  consumerHabits: {
    discovery: ${JSON.stringify(personaData.consumerHabits?.discovery || "N/A")},
    purchase: ${JSON.stringify(personaData.consumerHabits?.purchase || "N/A")},
    comparison: ${JSON.stringify(personaData.consumerHabits?.comparison || "N/A")}
  },

  networkBuilding: {
    millennial: ${JSON.stringify(personaData.networkBuilding?.millennial || "N/A")},
    genZ: ${JSON.stringify(personaData.networkBuilding?.genZ || "N/A")},
    genX: ${JSON.stringify(personaData.networkBuilding?.genX || "N/A")},
    boomer: ${JSON.stringify(personaData.networkBuilding?.boomer || "N/A")}
  },

  // Survey Scores
  csatTotal: ${personaData.csatTotal},      // 0-100
  csatTooltip: ${JSON.stringify(stripHtml(personaData.csatTooltip || "N/A"))},
  cesAverage: ${personaData.cesAverage},      // 1-7
  cesTooltip: ${JSON.stringify(stripHtml(personaData.cesTooltip || "N/A"))},
  npsTotal: ${personaData.npsTotal},       // -100 to 100
  npsTooltip: ${JSON.stringify(stripHtml(personaData.npsTooltip || "N/A"))},

  // Tooltips
  cxRequirementsTooltip: ${JSON.stringify(stripHtml(personaData.cxRequirementsTooltip || "N/A"))},
  ageTooltip: ${JSON.stringify(stripHtml(personaData.ageTooltip || "N/A"))},
  genderTooltip: ${JSON.stringify(stripHtml(personaData.genderTooltip || "N/A"))},
  incomeTooltip: ${JSON.stringify(stripHtml(personaData.incomeTooltip || "N/A"))},
  educationTooltip: ${JSON.stringify(stripHtml(personaData.educationTooltip || "N/A"))},
  locationTooltip: ${JSON.stringify(stripHtml(personaData.locationTooltip || "N/A"))},
  occupationTooltip: ${JSON.stringify(stripHtml(personaData.occupationTooltip || "N/A"))},
  familyTooltip: ${JSON.stringify(stripHtml(personaData.familyTooltip || "N/A"))},
  spouseOccupationTooltip: ${JSON.stringify(stripHtml(personaData.spouseOccupationTooltip || "N/A"))},
  ambassadorRankTooltip: ${JSON.stringify(stripHtml(personaData.ambassadorRankTooltip || "N/A"))},
  vipTooltip: ${JSON.stringify(stripHtml(personaData.vipTooltip || "N/A"))},
  timeTooltip: ${JSON.stringify(stripHtml(personaData.timeTooltip || "N/A"))},
  revenueTooltip: ${JSON.stringify(stripHtml(personaData.revenueTooltip || "N/A"))},

  // Revenue Opportunity
  revenueOpportunity: ${JSON.stringify(personaData.revenueOpportunity || "N/A")},

  // Nurture Text
  nurtureText: ${JSON.stringify(stripHtml(personaData.nurtureText || "N/A"))},

  // Personality Traits (0-10 each)
  traits: {
    valueHunter: ${personaData.traits.valueHunter},
    researcher: ${personaData.traits.researcher},
    brandDevoted: ${personaData.traits.brandDevoted},
    impulseShopping: ${personaData.traits.impulseShopping},
    socialButterfly: ${personaData.traits.socialButterfly},
    replenisher: ${personaData.traits.replenisher},
    mobileShopping: ${personaData.traits.mobileShopping},
    ethicalIngredients: ${personaData.traits.ethicalIngredients},
    gifter: ${personaData.traits.gifter},
    techSavvy: ${personaData.traits.techSavvy}
  },

  // Trait Insights (editable descriptions shown in code editor)
  traitInsights: {
    valueHunter: ${JSON.stringify(personaData.traitInsights?.valueHunter || "N/A")},
    researcher: ${JSON.stringify(personaData.traitInsights?.researcher || "N/A")},
    brandDevoted: ${JSON.stringify(personaData.traitInsights?.brandDevoted || "N/A")},
    impulseShopping: ${JSON.stringify(personaData.traitInsights?.impulseShopping || "N/A")},
    socialButterfly: ${JSON.stringify(personaData.traitInsights?.socialButterfly || "N/A")},
    replenisher: ${JSON.stringify(personaData.traitInsights?.replenisher || "N/A")},
    mobileShopping: ${JSON.stringify(personaData.traitInsights?.mobileShopping || "N/A")},
    ethicalIngredients: ${JSON.stringify(personaData.traitInsights?.ethicalIngredients || "N/A")},
    gifter: ${JSON.stringify(personaData.traitInsights?.gifter || "N/A")},
    techSavvy: ${JSON.stringify(personaData.traitInsights?.techSavvy || "N/A")}
  },

  // Personality Type Fields (editable, not auto-calculated from slider score)
  personalityType: ${JSON.stringify(personaData.personalityType || "N/A")},
  personalityTypeDetails: ${JSON.stringify(personaData.personalityTypeDetails || "N/A")},

  engagementScore: ${personaData.engagementScore}
});`;
  };

  const handleOpen = (open: boolean) => {
    if (open) {
      setCodeText(generateCodeString());
    }
    setIsOpen(open);
  };

  const handleApply = () => {
    const result = parsePersonaCode(codeText);
    
    if (!result.success) {
      toast.error(result.error || "Failed to parse persona data");
      return;
    }

    console.log("Calling onPersonaUpdate with updated persona");
    onPersonaUpdate(result.data);
    setIsOpen(false);
    toast.success("Persona data updated successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed top-48 right-8 z-50 rounded-full w-14 h-14 shadow-lg bg-[#0066cc] hover:bg-[#0052a3] text-white"
          title="Edit Persona Code"
        >
          <Code className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Persona Data</DialogTitle>
          <DialogDescription>
            Edit the persona data as code. Changes will be applied when you click "Apply Changes".
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <Textarea
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            className="font-mono text-sm min-h-[500px] resize-none"
            spellCheck={false}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="bg-[#e30646] hover:bg-[#c00538]">
            Apply Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}