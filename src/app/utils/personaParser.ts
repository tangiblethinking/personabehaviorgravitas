// Shared utility for parsing persona data from code strings

// Helper function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  if (!html || html === "N/A") return "N/A";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "N/A";
}

export interface ParseResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Parses persona data from a code string containing `const [personaData, setPersonaData] = useState({...});`
 * @param codeText - The code text to parse
 * @returns ParseResult with success status, parsed data, or error message
 */
export function parsePersonaCode(codeText: string): ParseResult {
  try {
    console.log("Attempting to parse persona code...");
    console.log("Code text length:", codeText.length);
    
    // Find the start of the useState call
    const stateStart = codeText.indexOf("useState(");
    if (stateStart === -1) {
      return {
        success: false,
        error: "Invalid code format. Could not find useState initialization."
      };
    }
    
    // Find the opening brace after useState(
    const openBraceIndex = codeText.indexOf("{", stateStart);
    if (openBraceIndex === -1) {
      return {
        success: false,
        error: "Invalid code format. Could not find opening brace."
      };
    }
    
    // Count braces to find the matching closing brace
    let braceCount = 0;
    let endIndex = openBraceIndex;
    for (let i = openBraceIndex; i < codeText.length; i++) {
      if (codeText[i] === '{') {
        braceCount++;
      } else if (codeText[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }
    
    if (braceCount !== 0) {
      return {
        success: false,
        error: "Invalid code format. Mismatched braces."
      };
    }
    
    // Extract the object string (including braces)
    const objString = codeText.substring(openBraceIndex, endIndex + 1);
    console.log("Object string extracted, length:", objString.length);
    console.log("Object string preview:", objString.substring(0, 200));
    
    // Use Function constructor to safely parse the object
    let parsedData;
    try {
      parsedData = new Function(`return ${objString}`)();
      console.log("Parsed data successfully:", Object.keys(parsedData));
    } catch (parseError: any) {
      console.error("Parse error:", parseError);
      console.error("Parse error details:", parseError.message);
      return {
        success: false,
        error: `Failed to parse code: ${parseError.message}`
      };
    }
    
    // Validate that we have the required fields
    if (!parsedData.name || !parsedData.traits) {
      console.error("Missing required fields. Has name:", !!parsedData.name, "Has traits:", !!parsedData.traits);
      return {
        success: false,
        error: "Missing required fields (name or traits)"
      };
    }

    // Strip HTML tags from certain fields
    const updatedPersona = {
      ...parsedData,
      quoteNote: stripHtml(parsedData.quoteNote),
      csatTooltip: stripHtml(parsedData.csatTooltip),
      cesTooltip: stripHtml(parsedData.cesTooltip),
      npsTooltip: stripHtml(parsedData.npsTooltip),
      cxRequirementsTooltip: stripHtml(parsedData.cxRequirementsTooltip),
      ageTooltip: stripHtml(parsedData.ageTooltip),
      genderTooltip: stripHtml(parsedData.genderTooltip),
      incomeTooltip: stripHtml(parsedData.incomeTooltip),
      educationTooltip: stripHtml(parsedData.educationTooltip),
      locationTooltip: stripHtml(parsedData.locationTooltip),
      occupationTooltip: stripHtml(parsedData.occupationTooltip),
      familyTooltip: stripHtml(parsedData.familyTooltip),
      spouseOccupationTooltip: stripHtml(parsedData.spouseOccupationTooltip),
      ambassadorRankTooltip: stripHtml(parsedData.ambassadorRankTooltip),
      vipTooltip: stripHtml(parsedData.vipTooltip),
      timeTooltip: stripHtml(parsedData.timeTooltip),
      revenueTooltip: stripHtml(parsedData.revenueTooltip),
      nurtureText: stripHtml(parsedData.nurtureText),
      // Auto-calculate engagementScore from personalityScore if undefined
      engagementScore: parsedData.engagementScore !== undefined 
        ? parsedData.engagementScore 
        : parsedData.personalityScore
    };

    console.log("Successfully parsed and cleaned persona data");
    return {
      success: true,
      data: updatedPersona
    };
  } catch (error: any) {
    console.error("Unexpected error in parsePersonaCode:", error);
    return {
      success: false,
      error: `Failed to parse: ${error.message}`
    };
  }
}