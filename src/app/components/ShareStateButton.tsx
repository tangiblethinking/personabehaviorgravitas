import { Share2 } from "lucide-react";
import { toast } from "sonner";
import pako from "pako";

interface ShareStateButtonProps {
  personaData: any;
}

export function ShareStateButton({ personaData }: ShareStateButtonProps) {
  const generateShareableLink = () => {
    try {
      // Share only persona data (tooltips are now part of personaData)
      const shareableState = {
        persona: personaData
      };
      
      console.log('State being shared:', shareableState);
      const jsonString = JSON.stringify(shareableState);
      console.log('JSON length:', jsonString.length);
      
      // 2. COMPRESS the data using pako (makes it smaller)
      const compressed = pako.deflate(jsonString, { level: 9 });
      
      // 3. CONVERT to base64 (text format)
      const base64 = btoa(String.fromCharCode.apply(null, Array.from(compressed)));
      
      // 4. MAKE IT URL-SAFE (replace special characters)
      const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      
      console.log('Compressed length:', urlSafe.length);
      
      // 5. BUILD the shareable URL with ?share= parameter
      const shareableUrl = `${window.location.origin}${window.location.pathname}?share=${urlSafe}`;
      console.log('Full URL:', shareableUrl);
      
      // 6. COPY to clipboard
      navigator.clipboard.writeText(shareableUrl).then(() => {
        toast.success('Shareable link copied to clipboard!', {
          description: `Persona: ${personaData.name || 'N/A'}`,
        });
      }).catch((err) => {
        console.error('Clipboard error:', err);
        toast.error('Failed to copy link to clipboard');
      });
    } catch (err) {
      console.error('Error generating share link:', err);
      toast.error('Failed to generate shareable link');
    }
  };

  return (
    <button
      onClick={generateShareableLink}
      className="fixed top-[264px] right-8 z-50 size-14 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
      title="Share Persona (Copy URL)"
    >
      <Share2 className="size-6" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Share Persona
      </span>
    </button>
  );
}

// Utility function to restore state from URL ?share= parameter
export function restoreStateFromURL(): any | null {
  try {
    console.log("=== Starting URL state restoration ===");
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    
    console.log("Share parameter:", shareParam ? "Found" : "Not found");
    
    if (!shareParam) {
      console.log("No share parameter found");
      return null;
    }
    
    console.log("Compressed data length:", shareParam.length);
    
    // 1. REVERSE URL-SAFE encoding
    let base64 = shareParam.replace(/-/g, '+').replace(/_/g, '/');
    // Add back padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // 2. CONVERT from base64
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // 3. DECOMPRESS using pako
    const decompressed = pako.inflate(bytes, { to: 'string' });
    console.log("Decompressed data:", decompressed ? "SUCCESS" : "FAILED");
    
    if (!decompressed) {
      console.error("Failed to decompress state");
      return null;
    }
    
    // 4. PARSE JSON
    const shareableState = JSON.parse(decompressed);
    console.log("Successfully restored state from URL. Name:", shareableState.persona.name);
    return shareableState;
  } catch (error) {
    console.error("Failed to restore state from URL:", error);
    return null;
  }
}

// Function to get initial state - either from URL or default
export function getInitialPersonaState() {
  console.log("=== Getting initial persona state ===");
  const restoredState = restoreStateFromURL();
  
  if (restoredState) {
    console.log("Using restored state from URL");
    // Show toast after a short delay to ensure toast system is ready
    setTimeout(() => {
      toast.success("Persona loaded from URL!", {
        description: `Loaded: ${restoredState.persona.name || "Unknown"}`,
      });
    }, 500);
    return restoredState.persona;
  }
  
  console.log("Using default state");
  // Default state
  return {
    // --- Identity ---
    name: "N/A",
    tagline: "N/A",
    role: "N/A",
    subtitle: "N/A",
    quote: "N/A",
    quoteNote: "N/A",
 
    // --- Demographics ---
    age: "N/A",
    gender: "N/A",
    income: "N/A",
    education: "N/A",
    location: "N/A",
    occupation: "N/A",
    family: "N/A",
    spouseOccupation: "N/A",
 
    // --- Consumer details ---
    consumerType: "N/A",
    consumerGeneration: "N/A",
    consumerAge: 0,
    personalityScore: 0,
    
    // --- Profile Image ---
    imageUrl: "",
    imageTransform: { x: 0, y: 0, rotation: 0, zoom: 1 },
    
    favoriteBrands: {
      apparel: "N/A",
      supplement: "N/A",
      fitnessEducation: "N/A",
      shoppingStore: "N/A",
      plexus: "N/A"
    },
 
    // --- Lifestyle & Behaviors (used for quick tags) ---
    characteristics: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    // --- Profile Brand Names (displayed in left column) ---
    brand_1: "N/A",
    brand_2: "N/A",
    brand_3: "N/A",
    brand_4: "N/A",
 
    // --- Profile Platform Names (displayed in left column) ---
    platform_1: "N/A",
    platform_2: "N/A",
    platform_3: "N/A",
    platform_4: "N/A",
 
    // --- Persona Content ---
    about: "N/A",
 
    goals: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    needs: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    painPoints: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    // --- Personality Traits (0–10 scale) ---
    traits: {
      valueHunter: 0,
      researcher: 0,
      brandDevoted: 0,
      impulseShopping: 0,
      socialButterfly: 0,
      replenisher: 0,
      mobileShopping: 0,
      ethicalIngredients: 0,
      gifter: 0,
      techSavvy: 0
    },
    
    // --- Trait Insights (editable descriptions) ---
    traitInsights: {
      valueHunter: "N/A",
      researcher: "N/A",
      brandDevoted: "N/A",
      impulseShopping: "N/A",
      socialButterfly: "N/A",
      replenisher: "N/A",
      mobileShopping: "N/A",
      ethicalIngredients: "N/A",
      gifter: "N/A",
      techSavvy: "N/A"
    },
    
    // --- Personality Type Fields (editable, not auto-calculated) ---
    personalityType: "N/A",
    personalityTypeDetails: "N/A",
 
    // --- Customer Experience Metrics ---
    csatTotal: 0,
    csatTooltip: "N/A",
    cesAverage: 1,
    cesTooltip: "N/A",
    npsTotal: 0,
    npsTooltip: "N/A",
 
    // --- Tooltips ---
    cxRequirementsTooltip: "N/A",
    ageTooltip: "N/A",
    genderTooltip: "N/A",
    incomeTooltip: "N/A",
    educationTooltip: "N/A",
    locationTooltip: "N/A",
    occupationTooltip: "N/A",
    familyTooltip: "N/A",
    spouseOccupationTooltip: "N/A",
    ambassadorRankTooltip: "N/A",
    vipTooltip: "N/A",
    timeTooltip: "N/A",
    revenueTooltip: "N/A",
 
    // --- Revenue Opportunity ---
    revenueOpportunity: "N/A",
    
    // --- Nurture Text ---
    nurtureText: "N/A"
  };
}

// Function to get initial tooltip state - either from URL or empty
export function getInitialTooltipState(): Record<string, string> {
  console.log("=== Getting initial tooltip state ===");
  const restoredState = restoreStateFromURL();
  
  if (restoredState && restoredState.tooltips) {
    console.log("Using restored tooltips from URL");
    console.log("Number of edited tooltips:", Object.keys(restoredState.tooltips).length);
    return restoredState.tooltips;
  }
  
  console.log("Using empty tooltip state");
  return {};
}