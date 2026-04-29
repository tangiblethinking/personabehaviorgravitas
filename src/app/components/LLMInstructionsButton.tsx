import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

// Base LLM instructions template with placeholders
const BASE_INSTRUCTIONS_TEMPLATE = `Analyze the attached document and understand all data below before starting to generate a response to the "Prompt". 
Instructions: 
•	Overrides – {OVERRIDES_PLACEHOLDER}
•	"Special Considerations" – {SPECIAL_CONSIDERATIONS_PLACEHOLDER}
•             Exclude all use of parentheses or data in parentheses for any field.
•	"MLM Sentiment" – Use “Age” to research, analyze, and understand the common feelings toward the multi-level marketing business style.
Demographic Insight
Purpose: These insights provide direct impact on the “Behavioral Insight” category. 
"Age" - Research, analyze, and understand the age ranges for generations of Millennials, Gen Z, Gen X, and Boomers. 
“Age Tool Tip” – use “Age”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Age” to “MLM Sentiment”, then update ageTooltip in code.
“Gender” – always female unless provided with an override.
“Gender Tool Tip”- use “Gender”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Gender” to “MLM Sentiment”, then update genderTooltip in code.
“Income” – this is the household income
“Income Tip”- use “Income”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Income” to “MLM Sentiment”, then update incomeTooltip in code.
"Education Level" – use the "Age Demographic" data and research, analyze, and understand average education levels of each demographic. Include, subject of study most commonly achieved in degree. 
“Education Tool Tip”- use “Education Level”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Education Level” to “MLM Sentiment”, then update educationTooltip in code.
"Location" - Research, analyze, and understand rural locations of where the average MLM entrepreneur lives across the United States of America, and then use a specific City, State. “Location Tool Tip”- use “Location”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Location” to “MLM Sentiment”, then update locationTooltip in code.
“Occupation” - Research, analyze, and understand common self-employed job titles and gig work of a female entrepreneur.
“Occupation Tool Tip”- use “Occupation”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Occupation” to “MLM Sentiment”, then update occupationTooltip in code.
“Family” – Research, analyze, and understand common family size of “Age Demographic”
“Family Tool Tip”- use “Family”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Family” to “MLM Sentiment”, then update familyTooltip in code.
“Spouse Occupation” – Research, analyze, and understand common employment titles of the husbands who have entrepreneurial wives.
“Spouse Occupation Tool Tip”- use “Spouse Occupation”, “behavioral sentiment”,  and “Personality Sentiment” to create a short sentence that associates “Family” to “MLM Sentiment”, then update spouseOccupationTooltip in code.
"Network Building"- For each "age Demographic", research, analyze, and understand popular habits to build a MLM business that focuses on "health supplements". 
"Consumer Habits" – Research, analyze, and understand online consumer and purchase habits of supplements across health and wellness companies using an MLM or affiliate marketing strategy. Separate the data into "Age Demographics" 
"Technical Aptitude" – Research, analyze, and understand the average understanding of technology that each "age demographic" is commonly capable of interacting with proficiently. 
"Brands"- use “Age”, “gender”, “Income” to research and analyze commonly purchased brands across supplements, lifestyle, make-up, shopping platforms, and clothes.
"Favorite brands"- Create a list 4 brands from “brands”
“Platforms”- use “Age”, “gender”, “Income” to research and analyze commonly utilized communication platforms of mass communication.
"Favorite Platforms”- create a list of 4 platforms from “Platforms”
Behavioral insight
Purpose: these insights provide direct impact on the “personality sliders”. Each trait is “pointed” on a score of 1-5 and “ranked”.
Rank System – 
• Low
• Somewhat Moderate
• Moderate
• Somewhat High
• High
Pointing System
• 1
• 2
• 3
• 4
• 5
Traits
“Openness” (to Experience)- Imagination, curiosity, creativity, and willingness to try new things. A “high” rank would be “They possess strong problem-solving skills and are willing to experiment with new ideas.” While a low rank is the opposite.
“Conscientiousness”- Organization, responsibility, diligence, and goal-directed behavior. A “high” rank would be that “They focus on planning and execution, making them dependable in running a business.” While a low rank is the opposite.
“Extraversion”- Sociability, assertiveness, energy from social interaction, and talkativeness. A “high” rank would be that “They are confident and persuasive in communicating their vision.” While a low rank is more introverted.
“Agreeableness”- Kindness, cooperativeness, empathy, and trust in others. A “high” rank would be that “They balance competitiveness with empathy and collaboration and are supportive mentors and leaders while remaining firm in negotiations.” While a low rank is the opposite.
“Neuroticism”- Tendency towards emotional instability, anxiety, moodiness, and stress sensitivity. A “low” rank would be that “They possess high stress tolerance, resilience, and emotional stability, allowing them to remain positive and focused after setbacks.” While a “high” rank is the opposite.
“Behavioral Sentiment”- Combine “rank” with trait in a logical sentence.
• Example- “Openness” is 2, so the following sentence could be created- “They possess low problem-solving skills and aren’t willing to experiment with new ideas”. 
“Score Based Trait Conversion” – use each rank and point for each trait to create a conversion acronym.  The letters for each trait a defined below
Extraversion – higher score is “E” for extroverted, lower score is “I” for introverted
Agreeableness- Higher score is “S” for sensing, and lower score is “N” for intuition
Conscientiousness- higher score is “T” for thinking, and lower score is “F” for feeling
Neuroticism – Higher score is “J” for judging, and lower score is “P” for perceiving 
• Example- “extraversion” is 1, so it is converted to “I” for introvert
“Personality Type”- Use the “Score Based Trait Conversion” acronym ascribe one of the following titles, and then update the “personalityType” field in code, do not include any acronym in parentheses.
•	 “Analyst”: (INTJ, INTP, ENTJ, ENTP)
•	“Diplomat”: (INFJ, INFP, ENFJ, ENFP) 
•	“Sentinel”: (ISTJ, ISFJ, ESTJ, ESFJ) 
•	“Explorer”: (ISTP, ISFP, ESTP, ESFP) 

“Personality Details”- without using the title from “personality type” use the data from “Behavioral Sentiment”, “Personality Sentiment” to create one sentence of no more than 55 characters including spaces that describes their “personality type”, and then update the “personalityTypeDetails” field in code.
Personality Sliders
Slider Purpose- Combine the “Rank” that describes likelihood of behavior with its slider based on the “pointing” 1-10 as defined from the “pointing system”
o	Slider Example: Points of 1 or 2 on the slider of “Value hunter” creates the following sentiment- “Unlikely to purchase based on promos, LTO, or campaigns.” And the points 9-10 on the slider of “Value Hunter” creates the following sentiment- “Always looking to purchase based on promos, LTO, or campaigns.”
Rank System – 
o	“unlikely”
o	 “somewhat unlikely”
o	“considers”
o	 “somewhat likely”, 
o	“always”
Pointing system - 
o	1-2
o	3-4
o	5-6
o	7-8
o	9-10
Definitions-
o	“Value Hunter” – Seeks deals, discounts, and maximum value for money enjoys promos, Limited Time Offers, consider product funnel campaigns inspire journey engagement
o	“Researcher” – looks for insight, data, and reviews on products, company and independent contributors
o	“Brand Devoted” – a want to remain with the brand due to alignment of personal behavior
o	“Impulse Shopping” – purchasing something in the immediate future to resolve a seemingly urgent non-medical problem
o	“Social Butterfly” – enjoys garnering attention around the topics and areas that are deemed important to spread awareness
o	“Replenisher” – looks to and prefers to monthly renewal of products or purchases products on a regular basis
o	“Mobile Shopping” – looks to quickest and easiest method of discovering products, and then purchasing them
o	“Ethical Shopper” – places an extremely high value on “natural” nutrition, ingredients, and packaging to justify a purchase
o	“Gifter” – looks to a product’s “sharability” to understand how easily shared and or received it is to deem it deployable in a large audience. 
o	“Tech Savvy” – an ability to quickly resolve interruptions during interactions, especially with current and/or popular tech.
“Personality Sentiment”- For each “definition” Combine “rank” with definition in a logical sentence.
o	Example- the slider for “Value hunter” is 2, so the following sentence could be created- “Unlikely to purchase based on promos, LTO, or campaigns.” And when “Value hunter” is 9-10 on the slider the following sentence could be created- “Always looking to purchase based on promos, LTO, or campaigns.”
“Trait Insight” – user “behavioral sentiment” and “personality sentiment” to create a sentence that describes for each specific definition. 
o            Example- if “Openness” is 2, then “behavioral sentiment” is - “They possess low problem-solving skills and aren’t willing to experiment with new ideas”. AND if “Tech Savvy” is 2, then “Personality Sentiment” is “Unlikely to be proficient with technology”, Then “trait insight” could be “They are have little patience when technology is slow or buggy. Coupled with low proficiency with tech, any hiccup or problem can negatively impact experience.”
Motivational Drivers
Purpose: the following categories are a bulleted list format that each contain 4 bullet points. Each contains instruction on how their bullet list is populated. 
“Consumer Wants” – treat “non-emergency” health issues for self, family, or friends. Increase household income for purpose of increasing quality in daily life. Seeks entrepreneurial opportunities. Has access to support within a community.
“Goals” – use the personality sliders sentiment sentences and the “Behavioral Insights” and create 4 goals that are one sentenced long and describe “consumer want”.
“Needs” - use the personality sliders sentiment sentences from the highest pointed sliders and create 4 needs that will help achieve “Goals” listed from “goals”.
“Pain Points” - use the personality sliders sentiment sentences and create 4 separate sentences that would be problematic to achieving the “goals” listed, and the “needs” listed. 
Potential Base income opportunity
Purpose: Individuals of households at specific income thresholds show a needed minimum first reward, in dollars, to successfully onboard an independent contractor or seller long term. So, part of considering becoming a MLM Seller is influenced by existing “available” income at different income levels. Where there may be more “available” income is with a higher income.
“Household Income”
•	 “Low” - Less than $20k
•	 “Moderately Low” - $20k - $34K 
•	 “Middle” - $35K - $49K  
•	 “Upper Middle” - $50K - $74K  
•	 “Moderately High” - $75K - $99K 
•	 “High” - More than $100K
“Required Minimum First Return”
•	“Low” - $676.10
•	“Moderately Low” - $790.20
•	“Middle” - $867.70
•	“Upper Middle” - $894.50
•	“Moderately High” - $1,066.00
•	“High” - $1,302.00
“Income Based Business Interest” – the higher the “household income” the more interest there is to create or start a business.
•	“Low” – Not Likely
•	“Moderately Low” – May consider
•	“Middle” - Considering
•	“Upper Middle” - Likely
•	“Moderately High” – Very likely
•	“High” – Actively looking
“income”- Use only the dollar value from “household income” to populate the demographic “income”. Example- if “Low” then only show “$20,000” OR if “middle” then only show “$35,000-$49,000”
“Entrepreneur Sentiment”- Combine and analyze the “behavioral sentiment” and “personality sentiment” to build a new sentiment that incorporates the “household Income” and “Income Based Business Interest” description.
“Minimum Reward sentiment”- Combine and analyze the “behavioral sentiment” and “personality sentiment” to build a new sentiment that incorporates the “household Income” and “required Minimum First Return” description. 
Encouragement 
Purpose: Provide clear actionable directions and steps to achieve “goals”, work with “needs”, and resolve “pain points” with specific “encouragement sentiment” that is related to “household income”.
“Base Encouragement” – “Owning a direct selling business gives you the freedom to set your own schedule, work from anywhere, and achieve a better work-life balance.”
“Encouragement Need”
•	 “Low” – “You can earn $500 in the first month of owning your new business.”
•	 “Moderately Low” – “Your income potential increases the more time and consistent effort you put into the business”
•	 “Middle” – “A personal mentor or coach will walk through all of the details you need to be successful in direct selling.”
•	 “Upper Middle” – “Your income potential increases the more time and consistent effort you put into the business”
•	 “Moderately High” – “You can earn $500 in the first month of owning your new business
•	 “High” – “There is low financial risk to start working in direct selling. You can try it free for the first month with no costs or obligations.”
“Encouragement Sentiment” - Combine and analyze the “personality sentiments”, “motivational drivers”, “Behavioral Sentiments”, “Base Encouragement” with corelating the “encouragement need” to the “household Income” and create a friendly and non-coercive sentiment to factually propose that the consumer can achieve what they want.
Customer Experience Survey
Purpose: use "Survey Sentiment" model to answer the following questions in each test. 
"Survey Sentiment" - use “Behavioral Sentiment”, “Personality sentiments”, “Motivational Drivers”, and “Entrepreneurial Behavior”,  to create a model of how “customer Experience Survey” questions are answered.
•	CSAT: Scoring Logic- Every question scores 0-20 by answering 1-5 where 5=20, 4=16, 3=12, 2=8, and 1=4. Then, total the answers from these questions to create a "CSAT Score total". Finally, Rate the persona CSAT using the "CSAT Score total" 
o	"From 1-5, 5 being highest, How satisfied are you with your recent shopping experience on our website?",  
o	"From 1-5, 5 being highest, How easy was it to find what you were looking for and complete your purchase?",  
o	"From 1-5, 5 being highest, How satisfied are you with how the product matched your expectations?" 
o	"From 1-5, 5 being highest, Is there anything we could do differently to improve your next experience?" 
o	"From 1-5, 5 being highest, How satisfied are you with your experience of our website?" 
“CSAT Sentiment” – Analyze all the answers from CSAT scores and create a description of how they answered.
•	CES: Scoring Logic- Every question scores 1-7 by answering 1-7 where 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7. 1 is lowest or "too much effort" and 7 is highest or "very little effort". Then, total the answers from these questions and divide by 7 and round number to nearest whole number to create a "CES Score total". Finally, Rate the persona CES using the "CES Score total" 
o	On a scale of 1-7, 7 being highest, how easy was it to find the product you were looking for on our website? 
o	On a scale of 1-7, 7 being highest, how easy was it to complete your purchase today? 
o	On a scale of 1-7, 7 being highest, how easy was it to understand the product details and pricing before checkout? 
o	On a scale of 1-7, 7 being highest, how easy was it to get help or answers when you needed assistance? 
o	On a scale of 1-7, 7 being highest, how easy was it to track or manage your order after purchase? 
o	On a scale of 1-7, 7 being highest, how easy was it to return or exchange a product (if you did)? 
o	On a scale of 1-7, 7 being highest, how easy was it to shop with us today? 
“CES Sentiment” – Analyze all the answers from CES scores and create a description of how they answered.
•	NPS: Scoring Logic- Every question scores -20 to 20 by answering 1-5 where 5=20, 4=10, 3=0, 2=-10, and 1=-20. Then, total the answers from these questions to create a "NPS Score total". Finally, Rate the persona NPS using the "NPS Score total" 
o	From 1–5, with 5 being the highest, how likely are you to recommend [Your Brand Name] to a friend or colleague? 
o	From 1–5, with 5 being the highest, how satisfied are you with the quality of the product(s) you purchased? 
o	From 1–5, with 5 being the highest, how easy was it to find and purchase what you were looking for on our website? 
o	From 1–5, with 5 being the highest, how satisfied were you with the delivery speed and condition of your order? 
o	From 1–5, with 5 being the highest, how well do you feel [Your Brand Name] meets your expectations as a shopper?
“NPS Sentiment” – Analyze all the answers from NPS scores and create a description of how they answered.
“Entrepreneurial Behavior” – use the info from “Behavioral Sentiment”, “Personality Type”, “Personality Sentiment”, “Goals”, “Needs”, “Pain Points”, “Entrepreneur Sentiment”,  “Encouragement Sentiment”, “CSAT Sentiment”, “CES Sentiment”, “NPS Sentiment” to describe actions, mindset, and processes the persona uses to identify market opportunities to transform  into viable, profitable ventures through calculated risk-taking approaches to create new organizations or transforming existing ones.
Nurture of persona
Purpose: provide a paragraph that explicitly details a set of actions that is achievable according to the “personality type”
“Plexus Tools”- use the details of “Field Development”, “Sales Calls”, “Product Education”, “Brand Awareness”, “Product Toolkits”, “Educational Calls”, “Testimonials”, to build a synopsis of how each can be used to offer guidance to improve persona’s “entrepreneurial behavior”.
“Field Development”- group calls that focus on “Meeting Plexus”, “Ambassador Rank Training for gold and above ambassadors”, social media group “Plexus Academy”
“Sales Call”- Plexus Group calls that focus on individual products, limited time offers, “how to’s” to explain plexus products
“Product Education”- downloadable Plexus content like PDFs, web landing pages, and videos that cover product specific information
“Brand Awareness”- downloadable Plexus content like PDFs, web landing pages, and videos that cover Plexus Brand Identity
“Product ToolKits”- printable Plexus content like PDFs that cover product specific information
“Educational Calls”- Plexus group calls that focus on “Power hour”, “Master Class”, “Plex-a-Thon”, “Monthly Training”
“Testimonials”- Plexus webpage to view and submit product or experience testimonials.
“nurtureText” – Use the “Encouragement Sentiment” to write a paragraph between 400 to 500 characters including punctuation that quickly explain how to achieve “Goals” and work with “pain points. Use the “Nurture Style” write the paragraph
About Section
"Name" – Generate a random female name with no more than 9 characters that is not gender neutral like "chris" or "Pat".
"Tagline" – This is a short descriptor of all the generated details of the persona. It is not a quote, and can not be more than 26 characters long.
"About" –Use info from “Demographic Insight”, “behavioral insight”, “Personality Sentiment”, “Personality Insight”, and “Entrepreneurial Behavior” to write a paragraph between 500 to 600 characters including punctuation using the “about style”.
"Quote" – Generate a saying that the persona would actually speak using the generation from “About”.
“quoteNote” – using the generations from “Quote” and “About” describe an action that the persona would actually do. Example: “While scheduling my gig work in the little free time I have between dropping of and pick up kids, along with everything else I have to do.”
Persona Constraints
Purpose: a set of rules to follow which will allow a style to be incorporated in to the generated responses.
Writing styles – 
Purpose: to assign specific sentence structure and assembly when writing sentences and paragraph.
“about style” - use the writing style of author Dr. Mark Hyman.
“Nurture Style”- use the writing style of gentle authority. 
“Data Correlation” - Ensure the persona utilizes the generated content realistically, is supported by all corresponding data points, and uses specific data pertaining to the data sets generated in all categories and definition.

“Prompt”- 
Unless provided with an “override” instruction, and or “special Consideration” use a random number generator of 1-6, where each number represents one of the Household income descriptions, and build a “Minimum Reward sentiment” statement that advises how the consumer can expect to achieve the “required Minimum First Return”, “Entrepreneur Sentiment”, “Encouragement Sentiment”
Unless provided with an “override” instruction, and or “special Consideration”, use a random number generator of 1-5 and assign a number to each “behavioral trait”. This number is the “rank” of its corresponding “trait”. Then, for each trait, make a “behavioral sentiment” sentence from its definition based on the rank. Then, create the 4 letter acronym from the “score based trait conversion”. Then, use each rank to influence each personality slider’s rank appropriately. For example, a “moderate” “conscientiousness” would impact the personality slider “ethical Shopper” to rank in the middle like “considers” or “somewhat likely”.
Then, Unless provided with an “override” instruction, and or “special Consideration”, use a random number generator of 1-10, then associate the number to the pointing system to identify rank, and then create a “sentiment” sentence for Each “definition”. Then, add up the number from each and display the sum. Then, analyze all sentiment sentences combined, and create a summary that reveals the "thinking and feeling" psychology as related to a consumer. Then write out the 4 bullet points for each “motivational Driver”, which also incorporates the “Entrepreneur Sentiment”.
Then, combine all “sentiments” that have been crafted in to a structured paragraph that has a topic sentence, supporting sentences, and a concluding sentence to analyze. Then, from your analysis, write one sentence in the first person point of view that answers the question “What do I  need to be successful?”.
Then, research and analyze the Myers-Briggs Type Indicator and compare how the “Entrepreneur Sentiment” and “Encouragement Sentiment” aligns with the “personality type” in terms of “very well”, “well”, “sort of”, or “not at all”.
Then, only respond with an update to the below code without changing any of its layout, terminology or anything else. DO NOT CHANGE FORMAT OF THE BELOW CODE, JUST FILL IN YOUR RESPONSE WHERE NEEDED. DO NOT ANY OTHER TEXT IN YOUR RESPONSE.
const [personaData, setPersonaData] = useState({
  // Identity
  name: "N/A",
  tagline: "N/A",
  role: "N/A",
  subtitle: "N/A",
  quote: "N/A",
  quoteNote: "N/A",

  // Demographics
  age: "N/A",
  gender: "N/A",
  income: "N/A",
  education: "N/A",
  location: "N/A",
  occupation: "N/A",
  family: "N/A",
  spouseOccupation: "N/A",

  // Consumer Details
  consumerType: "N/A",
  consumerGeneration: "N/A",
  consumerAge: 0,
  personalityScore: 0,
  
  favoriteBrands: {
    apparel: "N/A",
    supplement: "N/A",
    fitnessEducation: "N/A",
    shoppingStore: "N/A",
    plexus: "N/A"
  },

  // Characteristics (4 tags)
  characteristics: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
  ],

  // Brand Pills (brand_1, brand_2, brand_3, brand_4 - generic and editable)
  brand_1: "N/A",
  brand_2: "N/A",
  brand_3: "N/A",
  brand_4: "N/A",

  // Platform Pills (platform_1, platform_2, platform_3, platform_4 - generic and editable)
  platform_1: "N/A",
  platform_2: "N/A",
  platform_3: "N/A",
  platform_4: "N/A",

  // Narrative
  about: "N/A",

  // Lists
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

  // Consumer Habits
  consumerHabits: {
    discovery: "N/A",
    purchase: "N/A",
    comparison: "N/A"
  },

  networkBuilding: {
    millennial: "N/A",
    genZ: "N/A",
    genX: "N/A",
    boomer: "N/A"
  },

  // Survey Scores
  csatTotal: 0,      // 0-100
  csatTooltip: "N/A",
  cesAverage: 1,      // 1-7
  cesTooltip: "N/A",
  npsTotal: 0,       // -100 to 100
  npsTooltip: "N/A",

  // Tooltips
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

  // Revenue Opportunity
  revenueOpportunity: "N/A",

  // Nurture Text
  nurtureText: "N/A",

  // Personality Traits (0-10 each)
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

  // Trait Insights (editable descriptions shown in code editor)
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

  // Personality Type Fields (editable, not auto-calculated from slider score)
  personalityType: "N/A",
  personalityTypeDetails: "N/A",

  engagementScore: undefined
});
Finally, edit your response so that there is NO EXTRA CODE LIKE JSON OR JAVASCRIPT LIKE "\\\`\\\`\\\`javascript"`;

export function LLMInstructionsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [overridesText, setOverridesText] = useState("");
  const [specialConsiderationsText, setSpecialConsiderationsText] = useState("");

  const mergeInstructions = () => {
    // ALWAYS read fresh from BASE_INSTRUCTIONS_TEMPLATE constant
    // Any manual edits to BASE_INSTRUCTIONS_TEMPLATE will automatically flow through
    let mergedInstructions = BASE_INSTRUCTIONS_TEMPLATE;
    
    // Replace overrides placeholder with user input from dialog
    const overridesContent = overridesText.trim() || "(No overrides specified)";
    mergedInstructions = mergedInstructions.replace(
      "{OVERRIDES_PLACEHOLDER}",
      overridesContent
    );
    
    // Replace special considerations placeholder with user input from dialog
    const specialConsiderationsContent = specialConsiderationsText.trim() || "(No special considerations specified)";
    mergedInstructions = mergedInstructions.replace(
      "{SPECIAL_CONSIDERATIONS_PLACEHOLDER}",
      specialConsiderationsContent
    );
   
    return mergedInstructions;
  };

  const handleCopyInstructions = () => {
    try {
      // CRITICAL: Always merge fresh from BASE_INSTRUCTIONS_TEMPLATE
      // This ensures any manual edits to the constant are included
      const mergedInstructions = mergeInstructions();
      
      // DEBUG: Log what we're copying to verify it matches BASE_INSTRUCTIONS_TEMPLATE
      console.log("🔍 DEBUG: Length of BASE_INSTRUCTIONS_TEMPLATE:", BASE_INSTRUCTIONS_TEMPLATE.length);
      console.log("🔍 DEBUG: First 500 chars of BASE_INSTRUCTIONS_TEMPLATE:", BASE_INSTRUCTIONS_TEMPLATE.substring(0, 500));
      console.log("🔍 DEBUG: Merged instructions length:", mergedInstructions.length);
      console.log("🔍 DEBUG: First 500 chars of merged:", mergedInstructions.substring(0, 500));
      console.log("🔍 DEBUG: Contains traitInsights section:", mergedInstructions.includes("traitInsights"));
      
      // Copy to clipboard using textarea fallback method
      const textarea = document.createElement('textarea');
      textarea.value = mergedInstructions;
      
      // Make the textarea invisible but accessible
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '2em';
      textarea.style.height = '2em';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      
      document.body.appendChild(textarea);
      
      // Select the text
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      
      // Try to copy
      let successful = false;
      try {
        successful = document.execCommand('copy');
      } catch (err) {
        console.error('execCommand copy failed:', err);
      }
      
      // Clean up
      document.body.removeChild(textarea);
      
      if (successful) {
        toast.success("Instructions copied to clipboard!");
        console.log("✅ Successfully copied", mergedInstructions.length, "characters");
      } else {
        toast.error("Failed to copy. Please select and copy the text manually.");
      }

      // Dispatch custom event to expand Gemini chat
      const expandEvent = new CustomEvent('expand-gemini-chat');
      window.dispatchEvent(expandEvent);
      
      // Dispatch custom event with merged instructions to insert into Gemini chat
      const insertEvent = new CustomEvent('insert-llm-instructions', {
        detail: { instructions: mergedInstructions }
      });
      window.dispatchEvent(insertEvent);
      
      // Close the dialog
      setIsOpen(false);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error("Failed to copy. Please select and copy the text manually.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed top-28 right-8 z-50 rounded-full w-14 h-14 shadow-lg bg-[#16a34a] hover:bg-[#15803d] text-white"
          title="LLM Instructions"
        >
          <FileText className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">LLM Instructions</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Add custom overrides and special considerations to guide the AI persona generation
          </DialogDescription>
        </DialogHeader>
        
        {/* Two text areas */}
        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Overrides */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Overrides
            </label>
            <textarea
              value={overridesText}
              onChange={(e) => setOverridesText(e.target.value)}
              placeholder='Example: "VIP", gen X, mother of 2, dmv clerk, etc'
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Special Considerations */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Special Considerations
            </label>
            <textarea
              value={specialConsiderationsText}
              onChange={(e) => setSpecialConsiderationsText(e.target.value)}
              placeholder='Example: "scores low CES, CSAT, NPS", "family oriented goals with nutrition"'
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="px-6"
          >
            Close
          </Button>
          <Button 
            onClick={handleCopyInstructions} 
            className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6"
          >
            Copy Instructions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}