// Plexus Worldwide Persona Generator
// Follows comprehensive research-based instructions for generating realistic personas

interface PersonaData {
  name: string;
  tagline: string;
  role: string;
  subtitle: string;
  quote: string;
  quoteNote: string;
  age: string;
  gender: string;
  income: string;
  education: string;
  location: string;
  occupation: string;
  family: string;
  spouseOccupation: string;
  consumerType: string;
  consumerGeneration: string;
  consumerAge: number;
  personalityScore: number;
  favoriteBrands: {
    apparel: string;
    supplement: string;
    fitnessEducation: string;
    shoppingStore: string;
    plexus: string;
  };
  characteristics: string[];
  brand_1: string;
  brand_2: string;
  brand_3: string;
  brand_4: string;
  platform_1: string;
  platform_2: string;
  platform_3: string;
  platform_4: string;
  about: string;
  goals: string[];
  needs: string[];
  painPoints: string[];
  consumerHabits: {
    discovery: string;
    purchase: string;
    comparison: string;
  };
  networkBuilding: {
    millennial: string;
    genZ: string;
    genX: string;
    boomer: string;
  };
  csatTotal: number;
  cesAverage: number;
  npsTotal: number;
  csatTooltip: string;
  cesTooltip: string;
  npsTooltip: string;
  cxRequirementsTooltip: string;
  traits: {
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
  };
  traitInsights: {
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
  };
  personalityType: string;
  personalityTypeDetails: string;
  engagementScore: number;
  nurtureText: string;
}

// Generate random number in range (inclusive)
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random consumer type based on weighted distribution (1-20 scale)
// 1-4 = Unaware/Retail, 5-16 = VIP, 17-20 = Ambassador
function generateConsumerType(): { type: string; targetScore: number } {
  const roll = randomInRange(1, 20);
  if (roll >= 1 && roll <= 4) {
    return { type: "Unaware/Retail", targetScore: randomInRange(0, 34) };
  } else if (roll >= 5 && roll <= 16) {
    return { type: "VIP", targetScore: randomInRange(35, 74) };
  } else {
    return { type: "Ambassador", targetScore: randomInRange(75, 100) };
  }
}

// Generate consumer generation based on weighted distribution (1-20 scale)
// 1-4 = Millennial, 5-11 = Gen Z, 12-17 = Gen X, 18-20 = Boomer
function generateGeneration(): { generation: string; ageRange: [number, number] } {
  const roll = randomInRange(1, 20);
  if (roll >= 1 && roll <= 4) {
    return { generation: "Millennial", ageRange: [28, 43] };
  } else if (roll >= 5 && roll <= 11) {
    return { generation: "Gen Z", ageRange: [18, 27] };
  } else if (roll >= 12 && roll <= 17) {
    return { generation: "Gen X", ageRange: [44, 59] };
  } else {
    return { generation: "Boomer", ageRange: [60, 78] };
  }
}

// Generate gender (1-20 scale: 1-17 = Female, 18-20 = Male)
function generateGender(): string {
  const roll = randomInRange(1, 20);
  return roll >= 1 && roll <= 17 ? "Female" : "Male";
}

// Generate traits that sum to target score
// Personality Score: Individual trait scores (0-10) must total to fit Consumer Type
// Unaware/Retail: 0-34, VIP: 35-74, Ambassador: 75-100
function generateTraits(targetScore: number, consumerType: string, generation: string): PersonaData['traits'] {
  const traits = {
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
  };

  // Distribute points to reach target (targetScore / 10 = average per trait)
  const targetAvg = targetScore / 10;
  
  // Add variation while maintaining target
  let remaining = targetScore;
  const traitKeys = Object.keys(traits) as (keyof typeof traits)[];
  
  for (let i = 0; i < traitKeys.length - 1; i++) {
    const min = Math.max(0, Math.floor(targetAvg - 3));
    const max = Math.min(10, Math.ceil(targetAvg + 3));
    const value = randomInRange(min, max);
    traits[traitKeys[i]] = value;
    remaining -= value;
  }
  
  // Last trait gets remaining points (clamped 0-10)
  traits[traitKeys[traitKeys.length - 1]] = Math.max(0, Math.min(10, remaining));
  
  // Adjust based on consumer type
  if (consumerType === "Ambassador") {
    traits.brandDevoted = Math.min(10, traits.brandDevoted + 2);
    traits.socialButterfly = Math.min(10, traits.socialButterfly + 2);
    traits.replenisher = Math.min(10, traits.replenisher + 1);
  } else if (consumerType === "VIP") {
    traits.replenisher = Math.min(10, traits.replenisher + 2);
    traits.valueHunter = Math.min(10, traits.valueHunter + 1);
  } else {
    traits.researcher = Math.min(10, traits.researcher + 2);
    traits.valueHunter = Math.min(10, traits.valueHunter + 2);
  }
  
  // Adjust based on generation (Technical Aptitude)
  if (generation === "Gen Z") {
    traits.techSavvy = Math.min(10, traits.techSavvy + 2);
    traits.mobileShopping = Math.min(10, traits.mobileShopping + 2);
    traits.socialButterfly = Math.min(10, traits.socialButterfly + 1);
  } else if (generation === "Millennial") {
    traits.techSavvy = Math.min(10, traits.techSavvy + 1);
    traits.mobileShopping = Math.min(10, traits.mobileShopping + 1);
    traits.socialButterfly = Math.min(10, traits.socialButterfly + 1);
  } else if (generation === "Gen X") {
    traits.researcher = Math.min(10, traits.researcher + 1);
  } else { // Boomer
    traits.brandDevoted = Math.min(10, traits.brandDevoted + 1);
  }
  
  return traits;
}

// Female names (max 9 characters, gender-specific)
const femaleNames = ["Sarah", "Jessica", "Amanda", "Emily", "Madison", "Ashley", "Brittany", "Samantha", "Rachel", "Lauren", "Megan", "Nicole", "Jennifer", "Michelle", "Stephanie", "Danielle", "Heather", "Kimberly", "Lisa", "Rebecca", "Maria", "Angela", "Melissa", "Amy", "Laura"];

// Male names (max 9 characters, gender-specific)
const maleNames = ["Michael", "David", "James", "Robert", "John", "William", "Richard", "Joseph", "Thomas", "Brandon", "Jason", "Justin", "Andrew", "Daniel", "Matthew", "Joshua", "Ryan", "Tyler", "Kevin", "Brian", "Mark", "Steven", "Paul", "Timothy", "Eric"];

// US locations where Plexus is purchased (researched)
const locations = [
  "Scottsdale, AZ", "Mesa, AZ", "Gilbert, AZ", "Chandler, AZ", "Phoenix, AZ",
  "Provo, UT", "Salt Lake City, UT", "Boise, ID", "Dallas, TX", "Austin, TX",
  "Nashville, TN", "Charlotte, NC", "Atlanta, GA", "Tampa, FL", "Orlando, FL",
  "Denver, CO", "Colorado Springs, CO", "San Antonio, TX", "Houston, TX"
];

// Favorite brands by demographic
const brandsByDemo = {
  genZ: {
    apparel: ["Gymshark", "Fabletics", "Nike", "Adidas", "Lululemon"],
    supplement: ["Vital Proteins", "Athletic Greens", "Bloom", "Alani Nu", "Orgain"],
    fitness: ["Chloe Ting", "Pamela Reif", "MadFit", "Blogilates", "Caroline Girvan"],
    shopping: ["Amazon", "Target", "Trader Joe's", "Whole Foods", "Ulta"]
  },
  millennial: {
    apparel: ["Lululemon", "Athleta", "Nike", "Under Armour", "Alo Yoga"],
    supplement: ["Thorne", "Garden of Life", "Vital Proteins", "HUM Nutrition", "Ritual"],
    fitness: ["Peloton", "BeachBody", "Tone It Up", "Kayla Itsines", "ClassPass"],
    shopping: ["Amazon", "Target", "Whole Foods", "Costco", "Trader Joe's"]
  },
  genX: {
    apparel: ["Nike", "Athleta", "Lululemon", "Columbia", "North Face"],
    supplement: ["Thorne", "Nature Made", "Garden of Life", "NOW Foods", "Life Extension"],
    fitness: ["Peloton", "BeachBody", "Daily Burn", "Fitbit Coach", "Les Mills"],
    shopping: ["Costco", "Amazon", "Target", "Whole Foods", "Sam's Club"]
  },
  boomer: {
    apparel: ["Nike", "New Balance", "Eddie Bauer", "L.L.Bean", "Lands' End"],
    supplement: ["Nature Made", "Centrum", "Garden of Life", "Thorne", "NOW Foods"],
    fitness: ["Silver Sneakers", "AARP Fitness", "YogaGlo", "Daily Burn", "SilverFit"],
    shopping: ["Costco", "Sam's Club", "Walmart", "Target", "Amazon"]
  }
};

// Parse manual override text to extract field overrides
function parseOverrideText(text: string): Partial<PersonaData> {
  const overrides: any = {};
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  for (const line of lines) {
    // Parse key-value pairs (e.g., "name: John" or "age: 35")
    const colonMatch = line.match(/^(name|age|location|occupation|income|education|tagline|about|quote):\s*(.+)$/i);
    if (colonMatch) {
      const key = colonMatch[1].toLowerCase();
      const value = colonMatch[2].trim();
      
      if (key === 'age') {
        const ageNum = parseInt(value, 10);
        if (!isNaN(ageNum)) {
          overrides.age = ageNum;
        }
      } else {
        overrides[key] = value;
      }
      continue;
    }
    
    // Parse natural language patterns
    const lowerLine = line.toLowerCase();
    
    // Location patterns: "lives in X", "from X", "located in X"
    if (lowerLine.includes('lives in') || lowerLine.includes('from') || lowerLine.includes('located in')) {
      const locationMatch = line.match(/(?:lives in|from|located in)\s+([^,]+(?:,\s*[A-Z]{2})?)/i);
      if (locationMatch) {
        overrides.location = locationMatch[1].trim();
      }
    }
    
    // Occupation patterns: "is a X", "works as X", "occupation: X"
    if (lowerLine.includes('is a') || lowerLine.includes('works as')) {
      const occupationMatch = line.match(/(?:is a|works as)\s+([^,\.]+)/i);
      if (occupationMatch) {
        overrides.occupation = occupationMatch[1].trim();
      }
    }
    
    // Income patterns: "earns X", "earning X", "income X"
    if (lowerLine.includes('earn') || lowerLine.includes('income')) {
      const incomeMatch = line.match(/(?:earns?|earning|income)\s+\$?([\d,k]+)/i);
      if (incomeMatch) {
        overrides.income = incomeMatch[1].includes('k') ? `$${incomeMatch[1]}` : `$${incomeMatch[1]}`;
      }
    }
    
    // Education patterns
    if (lowerLine.includes('degree') || lowerLine.includes('education')) {
      const educationMatch = line.match(/(?:has|holds|education:)\s*([^,\.]+(?:degree|diploma|bachelor|master|phd))/i);
      if (educationMatch) {
        overrides.education = educationMatch[1].trim();
      }
    }
  }
  
  return overrides;
}

export function generatePlexusPersona(specifiedCustomerType?: string, specifiedLoyalty?: string, specifiedGeneration?: string, overrideText?: string): PersonaData {
  // Step 1: Generate consumer type, generation, gender, age, and name
  let consumerType: string;
  let targetScore: number;
  
  // Map loyalty level to personality score range
  const getLoyaltyScoreRange = (loyalty: string): [number, number] => {
    switch (loyalty) {
      case "Infrequent Buyer":
        return [0, 15];
      case "Gaining Trust in Brand":
        return [16, 35];
      case "Losing Interest or Trust in Brand":
        return [36, 54];
      case "Potential Ambassadorship":
        return [55, 74];
      case "Struggling with Ambassadorship":
        return [75, 85];
      case "Influential Entrepreneur":
        return [86, 100];
      default:
        return [0, 100];
    }
  };
  
  // If customer type is specified, use it; otherwise generate randomly
  if (specifiedCustomerType) {
    consumerType = specifiedCustomerType;
    
    // If loyalty is specified, use it to determine score range
    if (specifiedLoyalty) {
      const [minScore, maxScore] = getLoyaltyScoreRange(specifiedLoyalty);
      targetScore = randomInRange(minScore, maxScore);
    } else {
      // Set appropriate score range based on customer type
      if (consumerType === "Retail/Unaware") {
        targetScore = randomInRange(0, 34);
      } else if (consumerType === "VIP") {
        targetScore = randomInRange(35, 74);
      } else if (consumerType === "Ambassador") {
        consumerType = "Ambassador"; // Normalize to "Ambassador"
        targetScore = randomInRange(75, 100);
      } else {
        const generated = generateConsumerType();
        consumerType = generated.type;
        targetScore = generated.targetScore;
      }
    }
    
    // Normalize "Ambassador" naming
    if (consumerType === "Brand Ambassador") {
      consumerType = "Ambassador";
    }
  } else {
    const { type, targetScore: score } = generateConsumerType();
    consumerType = type;
    targetScore = score;
  }
  
  // Handle generation
  let generation: string;
  let ageRange: [number, number];
  
  if (specifiedGeneration) {
    generation = specifiedGeneration;
    // Map generation to age range
    switch (generation) {
      case "Gen Z":
        ageRange = [18, 27];
        break;
      case "Millennial":
        ageRange = [28, 43];
        break;
      case "Gen X":
        ageRange = [44, 59];
        break;
      case "Boomer":
        ageRange = [60, 78];
        break;
      default:
        const generated = generateGeneration();
        generation = generated.generation;
        ageRange = generated.ageRange;
    }
  } else {
    const generated = generateGeneration();
    generation = generated.generation;
    ageRange = generated.ageRange;
  }
  
  const gender = generateGender();
  let age = randomInRange(ageRange[0], ageRange[1]);
  let name = gender === "Female" 
    ? femaleNames[randomInRange(0, femaleNames.length - 1)]
    : maleNames[randomInRange(0, maleNames.length - 1)];
  
  // Step 2: Generate education based on age demographic
  let education = "";
  let income = "";
  let occupation = "";
  
  if (generation === "Gen Z") {
    const eduOptions = [
      "Some College",
      "Associate's in Marketing",
      "Bachelor's in Communications",
      "Bachelor's in Digital Media"
    ];
    education = eduOptions[randomInRange(0, eduOptions.length - 1)];
    income = "$35,000 - $55,000";
    const occupations = [
      "Social Media Coordinator",
      "Sales Associate",
      "Marketing Assistant",
      "Fitness Instructor",
      "Content Creator"
    ];
    occupation = occupations[randomInRange(0, occupations.length - 1)];
  } else if (generation === "Millennial") {
    const eduOptions = [
      "Bachelor's in Business",
      "Bachelor's in Communications",
      "Master's in Health Sciences",
      "Bachelor's in Nutrition"
    ];
    education = eduOptions[randomInRange(0, eduOptions.length - 1)];
    income = "$55,000 - $85,000";
    const occupations = [
      "Marketing Manager",
      "Wellness Coach",
      "Account Executive",
      "Project Manager",
      "Business Development"
    ];
    occupation = occupations[randomInRange(0, occupations.length - 1)];
  } else if (generation === "Gen X") {
    const eduOptions = [
      "Bachelor's in Business Admin",
      "MBA",
      "Associate's Degree",
      "Bachelor's in Education"
    ];
    education = eduOptions[randomInRange(0, eduOptions.length - 1)];
    income = "$65,000 - $95,000";
    const occupations = [
      "Sales Director",
      "Operations Manager",
      "Business Owner",
      "Senior Consultant",
      "Healthcare Admin"
    ];
    occupation = occupations[randomInRange(0, occupations.length - 1)];
  } else { // Boomer
    const eduOptions = [
      "Bachelor's Degree",
      "Some College",
      "High School Diploma",
      "Associate's Degree"
    ];
    education = eduOptions[randomInRange(0, eduOptions.length - 1)];
    income = "$45,000 - $75,000";
    const occupations = [
      "Retired Teacher",
      "Part-time Consultant",
      "Retired Nurse",
      "Real Estate Agent",
      "Small Business Owner"
    ];
    occupation = occupations[randomInRange(0, occupations.length - 1)];
  }
  
  // Step 3: Generate family and lifestyle
  const familyOptions = gender === "Female" 
    ? ["Married, 2 kids", "Single, no kids", "Married, 3 kids", "Divorced, 1 kid", "Married, no kids"]
    : ["Married, 2 kids", "Single, no kids", "Married, 3 kids", "Married, 1 kid"];
  const family = familyOptions[randomInRange(0, familyOptions.length - 1)];
  
  const spouseOccupations = ["Engineer", "Teacher", "Sales Manager", "IT Specialist", "Accountant", "Self-employed"];
  const spouseOccupation = family.includes("Married") 
    ? spouseOccupations[randomInRange(0, spouseOccupations.length - 1)]
    : "N/A";
  
  let location = locations[randomInRange(0, locations.length - 1)];
  
  // Step 4: Generate traits based on target score, consumer type, and generation
  const traits = generateTraits(targetScore, consumerType, generation);
  
  // Step 5: Generate favorite brands based on demographics
  const demoKey = generation === "Gen Z" ? "genZ" : generation === "Millennial" ? "millennial" : generation === "Gen X" ? "genX" : "boomer";
  const demoBrands = brandsByDemo[demoKey];
  
  const favoriteBrands = {
    apparel: demoBrands.apparel[randomInRange(0, demoBrands.apparel.length - 1)],
    supplement: demoBrands.supplement[randomInRange(0, demoBrands.supplement.length - 1)],
    fitnessEducation: demoBrands.fitness[randomInRange(0, demoBrands.fitness.length - 1)],
    shoppingStore: demoBrands.shopping[randomInRange(0, demoBrands.shopping.length - 1)],
    plexus: consumerType === "Ambassador" ? "Plexus" : "N/A"
  };
  
  // Step 6: Generate characteristics (Lifestyle and Behaviors)
  let characteristics: string[] = [];
  if (consumerType === "Ambassador") {
    characteristics = ["Entrepreneurial", "Community-focused", "Health-conscious", "Social media active"];
  } else if (consumerType === "VIP") {
    characteristics = ["Wellness-focused", "Routine-oriented", "Value-conscious", "Health-motivated"];
  } else {
    characteristics = ["Skeptical", "Research-driven", "Price-sensitive", "Cautious buyer"];
  }
  
  // Step 7: Generate survey scores based on Consumer Type
  // CSAT: 0-100 scale, CES: 1-7 scale, NPS: -100 to 100 scale
  let csatTotal = 0;
  let cesAverage = 0;
  let npsTotal = 0;
  
  if (consumerType === "Ambassador") {
    // High satisfaction - CSAT: 80-100, CES: 6-7, NPS: 60-100
    csatTotal = randomInRange(80, 100);
    cesAverage = randomInRange(6, 7);
    npsTotal = randomInRange(60, 100);
  } else if (consumerType === "VIP") {
    // Moderate satisfaction - CSAT: 60-80, CES: 4-6, NPS: 0-60
    csatTotal = randomInRange(60, 80);
    cesAverage = randomInRange(4, 6);
    npsTotal = randomInRange(0, 60);
  } else {
    // Lower satisfaction - CSAT: 30-60, CES: 2-4, NPS: -40-20
    csatTotal = randomInRange(30, 60);
    cesAverage = randomInRange(2, 4);
    npsTotal = randomInRange(-40, 20);
  }
  
  // Step 8: Generate narrative content
  let about = "";
  let goals: string[] = [];
  let needs: string[] = [];
  let painPoints: string[] = [];
  let tagline = ""; // Name Overline - max 26 characters
  let quote = "";
  let quoteNote = "";
  
  const pronoun = gender === "Female" ? "she" : "he";
  const possessive = gender === "Female" ? "her" : "his";
  
  if (consumerType === "Ambassador") {
    // Tagline - max 26 characters
    const taglineOptions = [
      "Building wellness empire",
      "Health entrepreneur",
      "Wellness advocate & leader",
      "Community builder",
      "Empowering transformation"
    ];
    tagline = taglineOptions[randomInRange(0, taglineOptions.length - 1)];
    
    // About - max 655 characters with CSAT, CES, NPS details and brand comparison
    about = `${name} is a ${age}-year-old ${generation} ${occupation.toLowerCase()} who discovered Plexus through ${possessive} social network. As an Ambassador, ${pronoun} leverages ${generation === "Gen Z" ? "TikTok and Instagram" : generation === "Millennial" ? "Instagram and Facebook" : generation === "Gen X" ? "Facebook and email" : "in-person events"} to build ${possessive} wellness business. CSAT: Rates website ${(csatTotal/20).toFixed(1)}/5 - loves streamlined ordering and product quality. CES: Finds auto-ship management very easy (${cesAverage}/7). NPS: Highly likely to recommend (${Math.round(npsTotal/20)}/10) and actively shares testimonials. Compared to ${favoriteBrands.supplement}, ${pronoun} finds Plexus offers superior community support and income opportunity.`;
    
    goals = [
      "Build sustainable income through Plexus business model",
      "Help 50+ people improve their wellness journey this year",
      "Achieve Diamond rank status within 18 months"
    ];
    
    needs = [
      "Reliable product quality and consistent availability",
      "Strong back-office support and marketing materials",
      "Community of like-minded ambassadors for motivation"
    ];
    
    painPoints = [
      "Overcoming skepticism about MLM business model",
      "Balancing family time with business building activities",
      "Managing inventory and order fulfillment logistics",
      "Maintaining consistent social media presence"
    ];
    
    const quoteOptions = [
      "Plexus isn't just products, it's a community supporting real transformation!",
      "Building my business one wellness story at a time",
      "I'm not just selling supplements, I'm changing lives!",
      "The income is great, but the community is priceless"
    ];
    quote = quoteOptions[randomInRange(0, quoteOptions.length - 1)];
    quoteNote = `while preparing ${possessive} morning Plexus routine`;
    
  } else if (consumerType === "VIP") {
    // Tagline - max 26 characters
    const taglineOptions = [
      "Wellness routine champion",
      "Committed to health",
      "Auto-ship enthusiast",
      "Routine-focused wellness",
      "Health consistency seeker"
    ];
    tagline = taglineOptions[randomInRange(0, taglineOptions.length - 1)];
    
    // About - max 655 characters with CSAT, CES, NPS details and brand comparison
    about = `${name} is a ${age}-year-old ${generation} ${occupation.toLowerCase()} who values consistent wellness routines. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} subscribes to Plexus monthly, appreciating VIP discounts and convenience. CSAT: Rates satisfaction ${(csatTotal/20).toFixed(1)}/5 - happy overall but wants faster shipping options. CES: Finds website navigation easy (${cesAverage}/7) though checkout could be more streamlined. NPS: Moderately likely to recommend (${Math.round(npsTotal/20)}/10) to close friends. Compared to ${favoriteBrands.supplement}, ${pronoun} finds Plexus comparable in quality with better subscription flexibility and rewards program.`;
    
    goals = [
      "Maintain consistent wellness routine without hassle",
      "Save money through VIP membership benefits",
      "Achieve personal health goals with quality supplements"
    ];
    
    needs = [
      "Reliable monthly auto-ship without surprises",
      "Easy-to-understand product benefits and usage",
      "Responsive customer service for order issues"
    ];
    
    painPoints = [
      "Occasionally forgets to adjust auto-ship dates before vacation",
      "Wishes there were more product variety in price range",
      "Concerned about rising subscription costs",
      "Sometimes overwhelmed by ambassador recruitment messages"
    ];
    
    const quoteOptions = [
      "I love having my wellness routine on autopilot",
      "Auto-ship means one less thing to worry about",
      "Consistency is key, and VIP makes it easy",
      "My monthly Plexus delivery is like a wellness gift to myself"
    ];
    quote = quoteOptions[randomInRange(0, quoteOptions.length - 1)];
    quoteNote = `while checking ${possessive} monthly VIP order status`;
    
  } else { // Unaware/Retail
    // Tagline - max 26 characters
    const taglineOptions = [
      "Researching wellness",
      "Cautious health seeker",
      "Skeptical researcher",
      "Exploring options",
      "Value-driven shopper"
    ];
    tagline = taglineOptions[randomInRange(0, taglineOptions.length - 1)];
    
    // About - max 655 characters with CSAT, CES, NPS details and brand comparison
    about = `${name} is a ${age}-year-old ${generation} ${occupation.toLowerCase()} cautiously exploring supplement options. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)}'s skeptical of MLM companies but intrigued by friend testimonials. CSAT: Rates website ${(csatTotal/20).toFixed(1)}/5 - finds it overwhelming with too much ambassador focus. CES: Navigation is confusing (${cesAverage}/7), struggled to find clear pricing information. NPS: Unlikely to recommend yet (${Math.round(npsTotal/20)}/10) until ${pronoun} experiences results. Compared to ${favoriteBrands.supplement}, ${pronoun} finds Plexus more expensive and purchasing process more complicated with membership requirements.`;
    
    goals = [
      "Find trustworthy supplements backed by research",
      "Get honest product reviews from unbiased sources",
      "Understand if products are worth the premium price"
    ];
    
    needs = [
      "Clear, scientific product information without sales pressure",
      "Transparent pricing without membership requirements",
      "Easy return policy if products don't work"
    ];
    
    painPoints = [
      "Distrust of MLM business models and pushy sales tactics",
      "Difficulty finding unbiased product reviews online",
      "Confusion about pricing structure and membership tiers",
      "Concerned about recurring charges and subscription traps"
    ];
    
    const quoteOptions = [
      "I just want to know if it actually works before committing",
      "Show me the science, not the sales pitch",
      "Too many questions, not enough clear answers",
      "Why is buying supplements so complicated?"
    ];
    quote = quoteOptions[randomInRange(0, quoteOptions.length - 1)];
    quoteNote = `while reading mixed reviews on ${possessive} lunch break`;
  }
  
  // Step 9: Brand assignments for the profile section
  const brand_1 = favoriteBrands.supplement;
  const brand_2 = favoriteBrands.apparel;
  const brand_3 = favoriteBrands.fitnessEducation;
  const brand_4 = favoriteBrands.plexus;
  
  // Step 10: Consumer Habits based on demographics
  const consumerHabits = {
    discovery: generation === "Gen Z" || generation === "Millennial" 
      ? "Social media influencers and peer recommendations"
      : "Friend referrals and online research",
    purchase: generation === "Gen Z" || generation === "Millennial"
      ? "Mobile app and online platforms"
      : "Online website and phone orders",
    comparison: "Reads reviews and compares prices across multiple platforms"
  };
  
  // Step 11: Network Building habits by demographic
  const networkBuilding = {
    millennial: "Leverages Instagram stories, Facebook groups, and email marketing",
    genZ: "Uses TikTok videos, Instagram reels, and influencer partnerships",
    genX: "Relies on Facebook posts, email campaigns, and personal messages",
    boomer: "Prefers in-person events, phone calls, and community gatherings"
  };
  
  // Step 12: Generate dynamic tooltips based on customer experience scores
  let csatTooltip = "";
  let cesTooltip = "";
  let npsTooltip = "";
  let cxRequirementsTooltip = "";
  
  // CSAT Tooltip
  if (csatTotal >= 0 && csatTotal <= 50) {
    csatTooltip = `This ${consumerType} persona struggles with website satisfaction. ${pronoun === "she" ? "She" : "He"} finds the navigation confusing, pricing unclear, and the overall experience frustrating - especially compared to ${favoriteBrands.supplement}'s streamlined interface.`;
  } else if (csatTotal >= 51 && csatTotal <= 69) {
    csatTooltip = `This ${consumerType} persona is somewhat satisfied with the website but sees room for improvement. ${pronoun === "she" ? "She" : "He"} appreciates the product information but wishes checkout and account management were more intuitive like ${favoriteBrands.supplement}.`;
  } else if (csatTotal >= 70 && csatTotal <= 85) {
    csatTooltip = `This ${consumerType} persona is satisfied with the website experience. ${pronoun === "she" ? "She" : "He"} finds most features work well, from browsing products to managing subscriptions, though ${pronoun === "she" ? "she" : "he"} occasionally notices minor usability issues.`;
  } else {
    csatTooltip = `This ${consumerType} persona loves the website experience! ${pronoun === "she" ? "She" : "He"} finds it easy to navigate, place orders, and manage ${possessive} account. The site feels professional and user-friendly compared to alternatives.`;
  }
  
  // CES Tooltip
  if (cesAverage >= 1 && cesAverage <= 3) {
    cesTooltip = `This ${consumerType} persona experiences high friction when seeking support or managing ${possessive} account. ${pronoun === "she" ? "She" : "He"} reports waiting days for responses, difficulty navigating help resources, and frustration with account management tools.`;
  } else if (cesAverage >= 4 && cesAverage <= 5) {
    cesTooltip = `This ${consumerType} persona finds most tasks manageable but not effortless. ${pronoun === "she" ? "She" : "He"} can complete most actions independently but sometimes needs to contact support for help with orders or account changes.`;
  } else {
    cesTooltip = `This ${consumerType} persona finds the platform very easy to use. ${pronoun === "she" ? "She" : "He"} can quickly complete tasks like ordering, updating subscriptions, and accessing support without frustration. Everything feels intuitive.`;
  }
  
  // NPS Tooltip
  if (npsTotal >= -100 && npsTotal <= -21) {
    npsTooltip = `A detractor with concerns about the brand experience. This ${consumerType} is unlikely to recommend Plexus due to ${npsTotal < -50 ? "significant dissatisfaction with product quality and support" : "feeling pressured to recruit or upgrade"}. ${pronoun === "she" ? "She" : "He"} prefers ${favoriteBrands.supplement} for its transparency.`;
  } else if (npsTotal >= -20 && npsTotal <= 50) {
    npsTooltip = `A passive promoter with mixed feelings. This ${consumerType} might recommend Plexus to close friends but has reservations about ${npsTotal < 20 ? "the MLM structure and pricing" : "the complexity of the business model"}. ${pronoun === "she" ? "She" : "He"} sees value but isn't fully convinced.`;
  } else if (npsTotal >= 51 && npsTotal <= 80) {
    npsTooltip = `An enthusiastic promoter who actively shares positive experiences. This ${consumerType} loves the products and ${consumerType === "Ambassador" ? "business opportunity" : "subscription benefits"}. ${pronoun === "she" ? "She" : "He"} regularly recommends Plexus to friends and family.`;
  } else {
    npsTooltip = `An advocating promoter and brand champion! This ${consumerType} passionately promotes Plexus at every opportunity. ${pronoun === "she" ? "She" : "He"} creates content, shares testimonials, and actively recruits new ${consumerType === "Ambassador" ? "ambassadors" : "VIP members"}. Plexus is part of ${possessive} identity.`;
  }
  
  // CX Requirements Tooltip - 5 sentences using Technical Aptitude, Consumer Habits, Survey Sentiment, and Survey Details
  if (consumerType === "Ambassador") {
    // Technical Aptitude for generation
    const techChannel = generation === "Gen Z" ? "TikTok and Instagram Reels" :
                       generation === "Millennial" ? "Instagram Stories and Facebook Groups" :
                       generation === "Gen X" ? "Facebook and Email campaigns" :
                       "in-person events and phone outreach";
    
    cxRequirementsTooltip = `This ${consumerType} persona, as a ${generation} with ${cesAverage >= 6 ? "high" : "moderate"} technical proficiency, thrives on ${techChannel} for building ${possessive} business network. Based on ${possessive} ${csatTotal >= 80 ? "excellent" : "good"} satisfaction scores (CSAT: ${csatTotal}/100), ${pronoun} needs marketing materials that emphasize community success stories and income testimonials to share with prospects. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} prefers ${consumerHabits.purchase.toLowerCase()} for ordering, so streamlined mobile experiences and auto-ship management tools are critical for ${possessive} business efficiency. With an NPS of ${npsTotal}/100, ${pronoun} actively promotes Plexus but needs back-office support like customizable graphics, email templates, and social media content to maintain consistent messaging. Plexus marketing should provide ${generation}-appropriate training on ${techChannel}, emphasize the entrepreneurial opportunity, and offer recognition programs that fuel ${possessive} motivation to achieve higher ranks.`;
  } else if (consumerType === "VIP") {
    // Technical Aptitude for generation
    const techPreference = generation === "Gen Z" || generation === "Millennial" ? "mobile-first experiences with app notifications" :
                          generation === "Gen X" ? "desktop and mobile web platforms with email reminders" :
                          "simple phone-based ordering with email confirmations";
    
    cxRequirementsTooltip = `This ${consumerType} persona, a ${generation} with ${cesAverage >= 5 ? "strong" : "moderate"} digital comfort, values ${techPreference} for managing ${possessive} wellness routine. With a CSAT score of ${csatTotal}/100, ${pronoun} appreciates the convenience of auto-ship but ${csatTotal < 70 ? "wants improvements in" : "loves"} the subscription management interface and product education resources. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} discovers products through ${consumerHabits.discovery.toLowerCase()}, so Plexus should invest in ${generation === "Gen Z" ? "influencer partnerships and UGC content" : generation === "Millennial" ? "peer testimonials and Instagram ads" : generation === "Gen X" ? "Facebook community posts and referral programs" : "word-of-mouth and local events"} to reach similar customers. Given ${possessive} NPS of ${npsTotal}/100, ${pronoun} ${npsTotal >= 51 ? "actively recommends" : "occasionally shares"} Plexus with friends, so refer-a-friend incentives and shareable success stories would amplify ${possessive} advocacy. Marketing should focus on routine-building content, wellness tips, subscription flexibility messaging, and VIP-exclusive perks that make ${possessive} feel valued without pressure to become an Ambassador.`;
  } else { // Unaware/Retail
    // Technical Aptitude for generation
    const researchBehavior = generation === "Gen Z" ? "TikTok reviews and Reddit threads" :
                            generation === "Millennial" ? "Instagram posts and health blogs" :
                            generation === "Gen X" ? "Google searches and Facebook groups" :
                            "recommendations from trusted friends and doctors";
    
    cxRequirementsTooltip = `This ${consumerType} persona, a cautious ${generation} researcher, relies on ${researchBehavior} to validate supplement claims before purchasing. With a low-to-moderate CSAT score of ${csatTotal}/100, ${pronoun} finds the current Plexus website ${csatTotal < 50 ? "confusing and too ambassador-focused" : "adequate but overwhelming"}, requiring clearer product information, transparent pricing, and scientific backing without sales pressure. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)}'s CES score of ${cesAverage}/7 indicates ${cesAverage <= 3 ? "significant friction" : "some difficulty"} navigating the purchase process, so simplified checkout flows, guest purchase options, and clear return policies would reduce barriers to first-time orders. Given ${possessive} NPS of ${npsTotal}/100 (${npsTotal < 0 ? "detractor" : "passive"}), ${pronoun} is skeptical of MLM structures and needs educational content that focuses on product science, third-party testing, and real customer results rather than income claims or recruitment pitches. Plexus marketing should create ${generation}-specific educational campaigns with unbiased product comparisons, money-back guarantees prominently displayed, and authentic before-and-after stories that build trust and address ${possessive} concerns about quality and value.`;
  }
  
  // Step 13: Apply manual overrides if provided
  if (overrideText && overrideText.trim()) {
    const overrides = parseOverrideText(overrideText);
    
    // Apply overrides to generated persona
    if (overrides.name) name = overrides.name;
    if (overrides.age !== undefined) {
      const overrideAge = overrides.age;
      age = overrideAge;
    }
    if (overrides.location) location = overrides.location;
    if (overrides.occupation) occupation = overrides.occupation;
    if (overrides.income) income = overrides.income;
    if (overrides.education) education = overrides.education;
    if (overrides.tagline) tagline = overrides.tagline;
    if (overrides.about) about = overrides.about;
    if (overrides.quote) quote = overrides.quote;
    if (overrides.goals && overrides.goals.length > 0) goals = overrides.goals;
    if (overrides.needs && overrides.needs.length > 0) needs = overrides.needs;
    if (overrides.painPoints && overrides.painPoints.length > 0) painPoints = overrides.painPoints;
  }
  
  // Step 14: Generate trait insights
  const traitInsights: PersonaData['traitInsights'] = {
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
  };
  
  // Step 15: Generate personality type and details
  let personalityType = "";
  let personalityTypeDetails = "";
  
  if (consumerType === "Ambassador") {
    personalityType = "Entrepreneurial";
    personalityTypeDetails = "Highly motivated and driven to build a successful wellness business. Seeks opportunities to grow and expand ${possessive} network through social media and community engagement.";
  } else if (consumerType === "VIP") {
    personalityType = "Routine-focused";
    personalityTypeDetails = "Values consistency and reliability in ${possessive} wellness routine. Prefers subscription-based services that simplify ${possessive} health management and provide regular support.";
  } else { // Unaware/Retail
    personalityType = "Skeptical Researcher";
    personalityTypeDetails = "Cautious and analytical in ${possessive} approach to health and wellness. Seeks scientific evidence and unbiased reviews to make informed decisions about supplements and products.";
  }
  
  return {
    name,
    tagline,
    role: consumerType,
    subtitle: `${age} • ${generation} • ${gender}`,
    quote,
    quoteNote,
    age: `${age} (${generation})`,
    gender,
    income,
    education,
    location,
    occupation,
    family,
    spouseOccupation,
    consumerType,
    consumerGeneration: generation,
    consumerAge: age,
    personalityScore: targetScore,
    favoriteBrands,
    characteristics,
    brand_1,
    brand_2,
    brand_3,
    brand_4,
    platform_1: "Plexus Website",
    platform_2: "Plexus Mobile App",
    platform_3: "Plexus Social Media",
    platform_4: "Plexus Email Marketing",
    about,
    goals,
    needs,
    painPoints,
    consumerHabits,
    networkBuilding,
    csatTotal,
    cesAverage,
    npsTotal,
    csatTooltip,
    cesTooltip,
    npsTooltip,
    cxRequirementsTooltip,
    traits,
    traitInsights,
    personalityType,
    personalityTypeDetails,
    engagementScore: targetScore,
    nurtureText: `This ${consumerType} persona, a ${generation} ${gender} with ${targetScore} personality score, is ${consumerType === "Ambassador" ? "highly engaged" : consumerType === "VIP" ? "moderately engaged" : "low engaged"}. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${consumerType === "Ambassador" ? "actively promotes" : consumerType === "VIP" ? "occasionally shares" : "is skeptical of"} Plexus with ${consumerType === "Ambassador" ? "enthusiasm" : consumerType === "VIP" ? "friends" : "distrust"}. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${consumerType === "Ambassador" ? "needs" : consumerType === "VIP" ? "wants" : "requires"} ${consumerType === "Ambassador" ? "back-office support" : consumerType === "VIP" ? "refer-a-friend incentives" : "educational content"} to ${consumerType === "Ambassador" ? "maintain consistent messaging" : consumerType === "VIP" ? "amplify advocacy" : "build trust"}.`
  };
}