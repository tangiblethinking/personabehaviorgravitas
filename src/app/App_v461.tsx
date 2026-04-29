// VERSION 458 - GEMINI CHAT REPOSITIONED UNDER RED FAB
// Automated two-click workflow: Green FAB → Gemini Send → Auto-update persona
// When Gemini responds with persona code, it's automatically parsed and applied
// Gemini chat interface now positioned below the red Share FAB
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

  // Generic tooltip hover handler for non-div elements
  const handleSectionTitleHover = (key: string, isHovering: boolean, element: HTMLParagraphElement | null) => {
    if (isHovering && element) {
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
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    return Math.round(avg * 10);
  })();

  const getEngagementLevel = (score: number) => {
    if (score < 35) return "Unaware/Retail Shopper";
    if (score < 75) return "VIP Member";
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

  return (
    <div className="size-full flex items-start justify-center overflow-auto bg-gray-100 py-8">
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
        onTooltipMouseEnter={handleTooltipMouseEnter}
        onTooltipMouseLeave={handleTooltipMouseLeave}
        onContentEdit={handleTooltipContentEdit}
      />
      
      <div
        className="bg-white relative rounded-[36px] w-[1554px] h-[1656px]"
        style={{ transform: 'scale(0.65)', transformOrigin: 'center' }}
      >
        <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full bg-white">
          {/* Left Column */}
          <ProfileSection
            personaData={personaData}
            backgroundColor={getBackgroundColor(totalScore)}
            updateField={updateField}
            setPersonaData={setPersonaData}
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
                Plexus Worldwide Shopping Persona
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
                    <p className="relative shrink-0 text-[#393939] text-[14px]">
                      {totalScore >= 0 && totalScore <= 34 ? "Retail/Unaware" : 
                       totalScore >= 35 && totalScore <= 74 ? "VIP" : 
                       "Ambassador"}
                    </p>
                    <p className="relative shrink-0 text-[#393939] text-[14px]">
                      {totalScore >= 0 && totalScore <= 15 ? "Infrequent Buyer" : 
                       totalScore >= 16 && totalScore <= 35 ? "Gaining Trust in Brand" : 
                       totalScore >= 36 && totalScore <= 54 ? "Losing Interest or Trust in Brand" : 
                       totalScore >= 55 && totalScore <= 74 ? "Potential Ambassadorship" : 
                       totalScore >= 75 && totalScore <= 85 ? "Struggling with Ambassadorship" : 
                       "Influential Entrepreneur"}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Frame73 
                    personalityScore={totalScore} 
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
                onHoverChange={(h, e) => handleSectionTitleHover('sectionTitle', h, e)}
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
              />
            </div>

            {/* Customer Engagement */}
            <EngagementScale
              totalScore={totalScore}
              getEngagementLevel={getEngagementLevel}
            />
          </div>
        </div>
      </div>
      
      {/* Gemini Chat Interface */}
      <GeminiChat onPersonaUpdate={setPersonaData} />
    </div>
  );
}
