// VERSION what the WTF - CHECKPOINT: Before implementing tooltip z-index stacking system
// ⚠️ WARNING: API key is now exposed in browser to eliminate Edge Function timeout
// Gemini calls now happen directly from browser → No more EarlyDrop errors
// COMPREHENSIVE FEATURE SET:
// • Complete 0-100 personality score mapping for Customer Types AND Journey Stages
// • Priority-based override system (Specific Ranks → Journey Stages → Customer Types)
// • Score Mapping: 0-16 Infrequent Buyer, 17-35 Gaining Trust, 36-54 Losing Interest,
//   55-74 Potential Ambassador, 75-85 Struggling Ambassador, 86-100 Influential Entrepreneur
// • Automated two-click workflow: Green FAB → Gemini Send → Auto-update persona
// • Collapsible Gemini chat with purple FAB (top-[328px] right-8)
// • LLM Instructions modal with Overrides and Special Considerations auto-merge
// • PDF and image upload for AI analysis
// • Blue FAB code editor, Green FAB LLM instructions, Red FAB Share (base64 encoding)
// • Dynamic revenue opportunity field (auto-updates by score, stops after manual edit)
// • VIP status indicators, trust status logic, engagement level titles
// • 10 interactive personality trait sliders with real-time score calculation
// • Comprehensive tooltips system with hover states and editable content
// • Editable nurture text field integrated with Code Editor, AI generation, and sharing
// • IMAGE URL PERSISTENCE: Profile image URLs and transforms now persist in shared URLs
// • Dual-tooltip system: toolTip (static) + traitInsight (editable via Blue FAB)
// • Personality type fields converted to editable: personalityType and personalityTypeDetails
//   - No longer auto-calculated from slider scores
//   - Default to "N/A" and editable via Blue FAB code editor
//   - Included in LLM instructions and persona generation
// CURRENT STATE (V"what the WTF"): User manually edited /App.tsx and /components/EngagementScale.tsx.
//   Tooltips currently have static z-index values, causing stacking order issues where older
//   tooltips appear above newer ones. About to implement dynamic z-index system where the most
//   recently hovered tooltip always renders on top with z-[10000], while others use z-[9999].
import { useState, useEffect, useRef } from "react";
import { TooltipRenderer } from "./components/TooltipRenderer";
import { tooltipContent } from "./config/tooltipContent";
import Frame73 from "./imports/Frame73";
import { generatePlexusPersona } from "./utils/personaGenerator";
import { Toaster } from "./components/ui/sonner";
import { getInitialPersonaState } from "./components/ShareStateButton";
import { PersonaGeneratorButton } from "./components/PersonaGeneratorButton";
import { CodeEditorButton } from "./components/CodeEditorButton";
import { CustomerTypeSelector } from "./components/CustomerTypeSelector_v349";
import { LLMInstructionsButton } from "./components/LLMInstructionsButton";
import { ShareStateButton } from "./components/ShareStateButton";
import { ProfileSection } from "./components/ProfileSection";
import { EditableText } from "./components/EditableText";
import { SectionTitle } from "./components/SectionTitle";
import { BulletListItem } from "./components/BulletListItem";
import { BulletPoint } from "./components/BulletPoint";
import { Slider } from "./components/Slider";
import { PersonalityTraits } from "./components/PersonalityTraits";
import { EngagementScale } from "./components/EngagementScale";
import { GeminiChat } from "./components/GeminiChat";

interface TooltipState {
  isVisible: boolean;
  position: { top: number; left: number };
}

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [personaData, setPersonaData] = useState(() => getInitialPersonaState());
  const [isChatExpanded, setIsChatExpanded] = useState(false); // Default collapsed
  
  // Track which tooltip is currently active (most recently hovered)
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);
  
  // Listen for custom event to expand chat when LLM instructions are pasted
  useEffect(() => {
    const handleExpandChat = () => {
      setIsChatExpanded(true);
    };
    
    window.addEventListener('expand-gemini-chat', handleExpandChat);
    
    return () => {
      window.removeEventListener('expand-gemini-chat', handleExpandChat);
    };
  }, []);
  
  // Track which tooltip is currently being hovered (either trigger or tooltip itself)
  const tooltipHoverRef = useRef<Record<string, boolean>>({});
  
  // Track timeout IDs for tooltip hiding delays
  const tooltipTimeoutRef = useRef<Record<string, NodeJS.Timeout | null>>({});
  
  // Map tooltip keys to personaData field names
  const tooltipFieldMap: Record<string, string> = {
    age: 'ageTooltip',
    gender: 'genderTooltip',
    income: 'incomeTooltip',
    education: 'educationTooltip',
    location: 'locationTooltip',
    occupation: 'occupationTooltip',
    family: 'familyTooltip',
    spouseOccupation: 'spouseOccupationTooltip',
    ambassadorRank: 'ambassadorRankTooltip',
    vip: 'vipTooltip',
    time: 'timeTooltip',
    revenue: 'revenueTooltip',
    cxRequirementsTooltip: 'cxRequirementsTooltip'
  };
  
  // Handler to save edited tooltip content to personaData
  const handleTooltipContentEdit = (key: string, html: string) => {
    const fieldName = tooltipFieldMap[key];
    if (fieldName) {
      setPersonaData(prev => ({
        ...prev,
        [fieldName]: html
      }));
    }
  };
  
  // Consolidated tooltip state
  const [tooltips, setTooltips] = useState<Record<string, TooltipState>>({});

  // Handler when mouse enters the tooltip itself
  const handleTooltipMouseEnter = (key: string) => {
    // Set this tooltip as the active one (brings it to top)
    setActiveTooltipId(key);
    
    // Clear any pending timeout for this tooltip
    if (tooltipTimeoutRef.current[key]) {
      clearTimeout(tooltipTimeoutRef.current[key]!);
      tooltipTimeoutRef.current[key] = null;
    }
    
    tooltipHoverRef.current[key] = true;
    // Keep tooltip visible when hovering over it
    setTooltips(prev => ({
      ...prev,
      [key]: { ...prev[key], isVisible: true }
    }));
  };

  // Handler when mouse leaves the tooltip itself
  const handleTooltipMouseLeave = (key: string) => {
    tooltipHoverRef.current[key] = false;
    
    // Clear any existing timeout
    if (tooltipTimeoutRef.current[key]) {
      clearTimeout(tooltipTimeoutRef.current[key]!);
    }
    
    // Hide tooltip after 1 second delay
    tooltipTimeoutRef.current[key] = setTimeout(() => {
      if (!tooltipHoverRef.current[key]) {
        setTooltips(prev => ({
          ...prev,
          [key]: { ...prev[key], isVisible: false }
        }));
        tooltipTimeoutRef.current[key] = null;
      }
    }, 1000);
  };

  // Generic tooltip hover handler
  const handleTooltipHover = (key: string, isHovering: boolean, element: HTMLDivElement | null) => {
    if (isHovering && element) {
      // Set this tooltip as the active one (brings it to top)
      setActiveTooltipId(key);
      
      // Clear any pending timeout when hovering
      if (tooltipTimeoutRef.current[key]) {
        clearTimeout(tooltipTimeoutRef.current[key]!);
        tooltipTimeoutRef.current[key] = null;
      }
      
      tooltipHoverRef.current[key] = true;
      const rect = element.getBoundingClientRect();
      const width = tooltipContent[key]?.width || 280;
      
      // Left sidebar demographic fields should show tooltips on the RIGHT
      const leftSidebarFields = ['age', 'gender', 'income', 'education', 'location', 'occupation', 'family', 'spouseOccupation'];
      const shouldShowRight = leftSidebarFields.includes(key);
      
      setTooltips(prev => ({
        ...prev,
        [key]: {
          isVisible: true,
          position: {
            top: rect.top,
            left: shouldShowRight ? rect.right + 8 : rect.left - (width + 8), // right for left sidebar, left for others
          }
        }
      }));
    } else {
      tooltipHoverRef.current[key] = false;
      // Small delay to allow mouse to move to tooltip
      setTimeout(() => {
        if (!tooltipHoverRef.current[key]) {
          // Clear any existing timeout
          if (tooltipTimeoutRef.current[key]) {
            clearTimeout(tooltipTimeoutRef.current[key]!);
          }
          
          // Hide tooltip after 1 second delay
          tooltipTimeoutRef.current[key] = setTimeout(() => {
            if (!tooltipHoverRef.current[key]) {
              setTooltips(prev => ({
                ...prev,
                [key]: { isVisible: false, position: { top: 0, left: 0 } }
              }));
              tooltipTimeoutRef.current[key] = null;
            }
          }, 1000);
        }
      }, 50);
    }
  };

  // Generic tooltip hover handler for non-div elements
  const handleSectionTitleHover = (key: string, isHovering: boolean, element: HTMLParagraphElement | null) => {
    if (isHovering && element) {
      // Set this tooltip as the active one (brings it to top)
      setActiveTooltipId(key);
      
      // Clear any pending timeout when hovering
      if (tooltipTimeoutRef.current[key]) {
        clearTimeout(tooltipTimeoutRef.current[key]!);
        tooltipTimeoutRef.current[key] = null;
      }
      
      tooltipHoverRef.current[key] = true;
      const rect = element.getBoundingClientRect();
      const width = tooltipContent[key]?.width || 280;
      setTooltips(prev => ({
        ...prev,
        [key]: {
          isVisible: true,
          position: {
            top: rect.top,
            left: rect.left - (width + 8), // tooltip width + 8px gap,
          }
        }
      }));
    } else {
      tooltipHoverRef.current[key] = false;
      // Small delay to allow mouse to move to tooltip
      setTimeout(() => {
        if (!tooltipHoverRef.current[key]) {
          // Clear any existing timeout
          if (tooltipTimeoutRef.current[key]) {
            clearTimeout(tooltipTimeoutRef.current[key]!);
          }
          
          // Hide tooltip after 1 second delay
          tooltipTimeoutRef.current[key] = setTimeout(() => {
            if (!tooltipHoverRef.current[key]) {
              setTooltips(prev => ({
                ...prev,
                [key]: { isVisible: false, position: { top: 0, left: 0 } }
              }));
              tooltipTimeoutRef.current[key] = null;
            }
          }, 1000);
        }
      }, 50);
    }
  };

  const updateTrait = (trait: keyof typeof personaData.traits, value: number) => {
    setPersonaData(prev => ({
      ...prev,
      traits: {
        ...prev.traits,
        [trait]: value
      }
    }));
  };

  const updateField = (field: string, value: string | number) => {
    setPersonaData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateListItem = (list: 'goals' | 'needs' | 'painPoints', index: number, value: string) => {
    setPersonaData(prev => {
      const newList = [...prev[list]];
      newList[index] = value;
      return { ...prev, [list]: newList };
    });
  };

  const handleGeneratePersona = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const generatedPersona = generatePlexusPersona();
    setPersonaData(generatedPersona);
    setIsGenerating(false);
  };

  const handleGenerateByCustomerType = async (customerType: string, loyalty: string, generation: string, overrideText?: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const generatedPersona = generatePlexusPersona(customerType, loyalty, generation, overrideText);
    setPersonaData(generatedPersona);
    setIsGenerating(false);
  };

  // Calculate total personality score out of 100
  const totalScore = (() => {
    const values = Object.values(personaData.traits);
    return values.reduce((a, b) => a + b, 0);
  })();

  const getEngagementLevel = (score: number) => {
    if (score < 35) return "Loosing Interest";
    if (score > 34 && score < 75) return "Gaining Interest";
    if (score > 74) return "Engaging Interest";
    return "Brand Ambassador";
  };

  const getBackgroundColor = (score: number) => {
    if (score < 35) return "#F0F0F0";
    if (score < 75) return "#E5F7ED";
    return "#FFE8E5";
  };

  const getRevenueOpportunityText = (score: number) => {
    if (score < 35) return "Low Revenue Opportunity";
    if (score < 75) return "Moderate Revenue Opportunity";
    return "High Revenue Opportunity";
  };

  // Function to determine potential business interest based on income
  const potentialBusinessInterest = (income: string) => {
    const incomeValue = parseFloat(income.replace(/[^0-9.-]+/g, ''));
    if (incomeValue < 50000) return "Low Business Interest";
    if (incomeValue < 100000) return "Moderate Business Interest";
    return "High Business Interest";
  };

  // Function to calculate revenue based on income
  const getRevenueFromIncome = (income: string) => {
    const incomeValue = parseFloat(income.replace(/[^0-9.-]+/g, ''));
    if (incomeValue < 20000) return 675;
    if (incomeValue < 35000) return 775;
    if (incomeValue < 50000) return 870;
    if (incomeValue < 75000) return 895;
    if (incomeValue < 100000) return 1050;
    return 1300;
  };

  return (
    <div className="size-full flex items-start justify-center overflow-auto bg-[rgb(255,255,255)] py-8">
      <PersonaGeneratorButton 
        onGenerate={handleGeneratePersona} 
        isGenerating={isGenerating} 
      />
      <CodeEditorButton 
        personaData={personaData}
        onPersonaUpdate={setPersonaData}
      />
      <CustomerTypeSelector 
        onGenerate={handleGenerateByCustomerType}
        isGenerating={isGenerating}
      />
      <LLMInstructionsButton />
      <ShareStateButton personaData={personaData} />
      <Toaster />
      
      {/* All tooltips rendered by TooltipRenderer */}
      <TooltipRenderer 
        tooltips={tooltips} 
        personaData={personaData}
        activeTooltipId={activeTooltipId}
        onTooltipMouseEnter={handleTooltipMouseEnter}
        onTooltipMouseLeave={handleTooltipMouseLeave}
        onContentEdit={handleTooltipContentEdit}
      />
      
      <div
        className="bg-white relative rounded-[36px] w-[1554px] h-[1656px] shadow-2xl"
        style={{ transform: 'scale(0.65)', transformOrigin: 'center' }}
      >
        <div className="content-stretch flex items-start overflow-visable relative rounded-[inherit] w-full bg-white">
          {/* Left Column */}
          <ProfileSection
            personaData={personaData}
            backgroundColor={getBackgroundColor(totalScore)}
            updateField={updateField}
            setPersonaData={setPersonaData}
            imageUrl={personaData.imageUrl || ""}
            imageTransform={personaData.imageTransform || { x: 0, y: 0, rotation: 0, zoom: 1 }}
            onImageChange={(url: string, transform: { x: number; y: number; rotation: number; zoom: number }) => {
              setPersonaData(prev => ({
                ...prev,
                imageUrl: url,
                imageTransform: transform
              }));
            }}
            onAgeHoverChange={(h, e) => handleTooltipHover('age', h, e)}
            onGenderHoverChange={(h, e) => handleTooltipHover('gender', h, e)}
            onIncomeHoverChange={(h, e) => handleTooltipHover('income', h, e)}
            onEducationHoverChange={(h, e) => handleTooltipHover('education', h, e)}
            onLocationHoverChange={(h, e) => handleTooltipHover('location', h, e)}
            onOccupationHoverChange={(h, e) => handleTooltipHover('occupation', h, e)}
            onFamilyHoverChange={(h, e) => handleTooltipHover('family', h, e)}
            onSpouseOccupationHoverChange={(h, e) => handleTooltipHover('spouseOccupation', h, e)}
          />

          {/* Right Column */}
          <div className="box-border content-stretch flex flex-col gap-[62px] items-start px-[64px] py-[32px] relative self-stretch shrink-0">
            {/* Name Section */}
            <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
              <p className="font-['Montserrat:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e30646] text-[19px] text-right w-full">
                Potential Entrepreneur Persona
              </p>
              <div className="content-stretch flex items-start leading-[normal] relative w-full gap-[32px] overflow-visible">
                <div className="content-stretch flex flex-col font-['Montserrat:Bold',_sans-serif] font-bold items-start leading-[normal] relative shrink-0 flex-1">
                  <EditableText
                    value={personaData.tagline}
                    onChange={(val) => updateField('tagline', val)}
                    className="relative shrink-0 text-[#393939] text-[19px] w-full"
                  />
                  <EditableText
                    value={personaData.name}
                    onChange={(val) => updateField('name', val)}
                    className="relative shrink-0 text-[#99bbe2] text-[89px] w-full"
                    maxLength={9}
                  />
                  <div className="flex items-center gap-[8px]">
                    <EditableText
                      value={personaData.personalityType}
                      onChange={(val) => updateField('personalityType', val)}
                      className="relative shrink-0 text-[#393939] text-[14px]"
                    />
                    <EditableText
                      value={personaData.personalityTypeDetails}
                      onChange={(val) => updateField('personalityTypeDetails', val)}
                      className="relative shrink-0 text-[#393939] text-[14px]"
                    />
                  </div>
                </div>
                <div className="shrink-0">
                  <Frame73 
                    personalityScore={totalScore} 
                    income={personaData.income}
                    onHoverChange={(h, e) => handleTooltipHover('ambassadorRank', h, e)} 
                    onVIPHoverChange={(h, e) => handleTooltipHover('vip', h, e)} 
                    onTimeHoverChange={(h, e) => handleTooltipHover('time', h, e)} 
                    onRevenueHoverChange={(h, e) => handleTooltipHover('revenue', h, e)} 
                  />
                </div>
              </div>
            </div>

            {/* About */}
            <div className="content-stretch flex flex-col gap-[20px] items-start leading-[normal] not-italic overflow-clip relative shrink-0">
              <SectionTitle 
                className="text-nowrap whitespace-pre"
                //onHoverChange={(h, e) => handleSectionTitleHover('sectionTitle', h, e)}
              >
                ABOUT
              </SectionTitle>
              <EditableText
                value={personaData.about}
                onChange={(val) => updateField('about', val)}
                className="font-['Avenir:Roman',_sans-serif] relative shrink-0 text-[#111111] text-[22px] w-[961px]"
                multiline
              />
            </div>

            {/* Goals and Needs */}
            <div className="content-stretch flex gap-[71px] items-center relative shrink-0">
              {/* Goals */}
              <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[440px]">
                <SectionTitle className="w-full">GOALS</SectionTitle>
                {personaData.goals.map((goal, idx) => (
                  <BulletListItem
                    key={idx}
                    value={goal}
                    onChange={(val) => updateListItem('goals', idx, val)}
                  />
                ))}
              </div>

              {/* Needs */}
              <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[440px]">
                <SectionTitle className="w-full">NEEDS</SectionTitle>
                {personaData.needs.map((need, idx) => (
                  <BulletListItem
                    key={idx}
                    value={need}
                    onChange={(val) => updateListItem('needs', idx, val)}
                  />
                ))}
              </div>
            </div>

            {/* Pain Points and Personality */}
            <div className="content-stretch flex gap-[66px] items-start relative shrink-0">
              {/* Left Column: Pain Points + Customer Experience */}
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[445px]">
                {/* Pain Points */}
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <SectionTitle className="w-full">PAIN POINTS</SectionTitle>
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    {personaData.painPoints.map((point, idx) => (
                      <div key={idx} className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[10px] items-center relative self-stretch shrink-0">
                          <BulletPoint />
                        </div>
                        <EditableText
                          value={point}
                          onChange={(val) => updateListItem('painPoints', idx, val)}
                          className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px]"
                          multiline
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Experience - Using consolidated Slider */}
                <div className="content-stretch flex flex-col gap-[20px] items-start overflow-visible relative shrink-0 w-full">
                  <SectionTitle 
                    className="w-full"
                    onHoverChange={(h, e) => handleSectionTitleHover('cxRequirementsTooltip', h, e)}
                  >Customer Experience:<span className="font-['Avenir:Roman',_sans-serif] font-bold italic leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px]"> Website</span>
                  </SectionTitle>
                  <Slider 
                    type="CSAT"
                    value={personaData.csatTotal} 
                    onChange={(val) => updateField('csatTotal', val)} 
                    tooltip={personaData.csatTooltip}
                  />
                  <Slider 
                    type="CES"
                    value={personaData.cesAverage} 
                    onChange={(val) => updateField('cesAverage', val)} 
                    tooltip={personaData.cesTooltip}
                  />
                  <Slider 
                    type="NPS"
                    value={personaData.npsTotal} 
                    onChange={(val) => updateField('npsTotal', val)} 
                    tooltip={personaData.npsTooltip}
                  />
                </div>
              </div>

              {/* Personality Traits */}
              <PersonalityTraits
                traits={personaData.traits}
                totalScore={totalScore}
                updateTrait={updateTrait}
                traitInsights={personaData.traitInsights}
              />
            </div>

            {/* Customer Engagement */}
            <EngagementScale
              totalScore={totalScore}
              getEngagementLevel={getEngagementLevel}
              nurtureText={personaData.nurtureText || ""}
              onNurtureTextChange={(val) => updateField('nurtureText', val)}
            />
          </div>
        </div>
      </div>
      
      {/* Gemini Chat Interface */}
      <GeminiChat onPersonaUpdate={setPersonaData} isExpanded={isChatExpanded} onExpandToggle={setIsChatExpanded} />
    </div>
  );
}