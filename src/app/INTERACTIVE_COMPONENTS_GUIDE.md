# Interactive Components Manipulation Guide

This guide provides all the code you need to manipulate every interactive component in your Plexus Persona app.

---

## 📋 Table of Contents

1. [EditableText Component](#editabletext-component)
2. [InteractiveSlider Component](#interactiveslider-component)
3. [Personality Traits (10 Sliders)](#personality-traits)
4. [Customer Experience Sliders](#customer-experience-sliders)
5. [Profile Section](#profile-section)
6. [Demographic Items](#demographic-items)
7. [Bullet List Items](#bullet-list-items)
8. [Persona Generator Button](#persona-generator-button)
9. [Main App State Management](#main-app-state-management)
10. [Important: Brand Field Mapping](#important-brand-field-mapping)

---

## 1. EditableText Component

**Location:** `/components/EditableText.tsx`

**Purpose:** Makes any text field editable with click-to-edit functionality

**Props:**
- `value: string` - Current text value
- `onChange: (value: string) => void` - Callback when text changes
- `className?: string` - Optional CSS classes
- `multiline?: boolean` - Allow multi-line editing
- `maxLength?: number` - Maximum character length

**Usage Example:**
```tsx
<EditableText
  value={personaData.name}
  onChange={(val) => updateField('name', val)}
  className="text-[89px] text-[#99bbe2]"
  maxLength={9}
/>
```

**How to Manipulate:**
```tsx
// In App.tsx, update any field:
updateField('name', 'NewName');
updateField('tagline', 'New Tagline');
updateField('quote', 'New Quote');
updateField('about', 'New about text...');
```

---

## 2. InteractiveSlider Component

**Location:** `/components/InteractiveSlider.tsx`

**Purpose:** Draggable slider for 0-10 scale values (personality traits)

**Props:**
- `label: string` - Display label
- `value: number` - Current value (0-10)
- `onChange: (value: number) => void` - Callback when value changes
- `className?: string` - Optional CSS classes

**Usage Example:**
```tsx
<InteractiveSlider
  label="Value Hunter"
  value={traits.valueHunter}
  onChange={(v) => updateTrait('valueHunter', v)}
/>
```

**How to Manipulate:**
```tsx
// Set individual trait value (0-10):
updateTrait('valueHunter', 7);
updateTrait('researcher', 5);
updateTrait('socialButterfly', 9);
```

---

## 3. Personality Traits

**Location:** `/components/PersonalityTraits.tsx`

**Purpose:** Displays all 10 personality trait sliders and total score

**Available Traits:**
1. `valueHunter` - Seeks deals/discounts
2. `researcher` - Investigates products/reviews
3. `brandDevoted` - Sticks to trusted brands
4. `impulseShopping` - Makes spontaneous buys
5. `socialButterfly` - Influenced by/shares on social media
6. `replenisher` - Focuses on routine restocks
7. `mobileShopping` - Prefers app-based shopping
8. `ethicalIngredients` - Values sustainability/ethics
9. `gifter` - Buys for others
10. `techSavvy` - Adopts new products/formats

**How to Manipulate:**
```tsx
// Update single trait:
updateTrait('valueHunter', 8);

// Update multiple traits:
setPersonaData(prev => ({
  ...prev,
  traits: {
    valueHunter: 7,
    researcher: 6,
    brandDevoted: 8,
    impulseShopping: 3,
    socialButterfly: 9,
    replenisher: 7,
    mobileShopping: 8,
    ethicalIngredients: 5,
    gifter: 4,
    techSavvy: 9
  }
}));

// Total score is automatically calculated from all 10 traits
// Formula: Average of all traits * 10 = Total Score (0-100)
```

---

## 4. Customer Experience Sliders

**Location:** In `/App.tsx` (lines 18-337)

### CSAT Slider (Customer Satisfaction - 0-100 scale)

**How to Manipulate:**
```tsx
// Set CSAT value (0-100):
updateField('csatTotal', 85);

// Labels based on score:
// 0-50: "Poor Satisfaction"
// 51-69: "Somewhat Satisfied"
// 70-85: "Satisfied"
// 86-100: "Great Satisfaction"
```

### CES Slider (Customer Effort Score - 1-7 scale)

**How to Manipulate:**
```tsx
// Set CES value (1-7):
updateField('cesAverage', 6);

// Labels based on score:
// 1: "Extreme Frustration"
// 2: "Frustration"
// 3: "Impatient"
// 4: "Neutral"
// 5: "Somewhat Easy"
// 6: "Easy"
// 7: "Intuitive"
```

### NPS Slider (Net Promoter Score - -100 to 100 scale)

**How to Manipulate:**
```tsx
// Set NPS value (-100 to 100):
updateField('npsTotal', 75);

// Labels based on score:
// -100 to -86: "Advocating Detractor"
// -85 to -51: "Enthusiastic Detractor"
// -50 to -21: "Detractor"
// -20 to -1: "Passive Promoter"
// 0 to 50: "Good Promoter"
// 51 to 80: "Enthusiastic Promoter"
// 81 to 100: "Advocating Promoter"
```

---

## 5. Profile Section

**Location:** `/components/ProfileSection.tsx`

**Interactive Elements:**
- Profile image (click pencil icon to change)
- Quote text
- Quote note
- All demographic fields
- Characteristic tags
- Favorite brand names (4 editable brand pills)

**Important Note:** The favorite brand fields use `brand_1`, `brand_2`, `brand_3`, and `brand_4` as field names. These are generic placeholders that can be edited to display any brand names (e.g., "Thorne", "Nike", "HUM", "Plexus", or any other brand).

**How to Manipulate:**

### Change Profile Image:
```tsx
// Click the pencil icon in bottom-right of image
// Or programmatically (add this to ProfileSection):
setCustomImageUrl('https://example.com/new-image.jpg');
```

### Update Quote:
```tsx
updateField('quote', 'Your new quote here');
updateField('quoteNote', 'while doing something');
```

### Update Characteristics:
```tsx
setPersonaData(prev => ({
  ...prev,
  characteristics: [
    "Entrepreneurial",
    "Community-focused", 
    "Health-conscious",
    "Social media active"
  ]
}));
```

### Update Favorite Brands:
```tsx
// Brand fields are generic and can be set to any brand name
updateField('brand_1', 'Thorne');   // First brand pill (e.g., "Thorne")
updateField('brand_2', 'Nike');     // Second brand pill (e.g., "Nike")  
updateField('brand_3', 'HUM');      // Third brand pill (e.g., "HUM")
updateField('brand_4', 'Plexus');   // Fourth brand pill (e.g., "Plexus")
```

---

## 6. Demographic Items

**Location:** `/components/DemographicItem.tsx`

**Available Demographics:**
- Age
- Gender
- Income
- Education
- Location
- Occupation
- Family
- Spouse Occupation

**How to Manipulate:**
```tsx
updateField('age', '32 (Millennial)');
updateField('gender', 'Female');
updateField('income', '$55,000 - $85,000');
updateField('education', "Bachelor's in Business");
updateField('location', 'Austin, TX');
updateField('occupation', 'Marketing Manager');
updateField('family', 'Married, 2 kids');
updateField('spouseOccupation', 'Engineer');
```

---

## 7. Bullet List Items

**Location:** `/components/BulletListItem.tsx`

**Used for:**
- Goals (3 items)
- Needs (3 items)
- Pain Points (4 items)

**How to Manipulate:**

### Update Goals:
```tsx
updateListItem('goals', 0, 'First goal');
updateListItem('goals', 1, 'Second goal');
updateListItem('goals', 2, 'Third goal');

// Or update all at once:
setPersonaData(prev => ({
  ...prev,
  goals: [
    'Build sustainable income',
    'Help 50+ people this year',
    'Achieve Diamond rank'
  ]
}));
```

### Update Needs:
```tsx
updateListItem('needs', 0, 'First need');
updateListItem('needs', 1, 'Second need');
updateListItem('needs', 2, 'Third need');
```

### Update Pain Points:
```tsx
updateListItem('painPoints', 0, 'First pain point');
updateListItem('painPoints', 1, 'Second pain point');
updateListItem('painPoints', 2, 'Third pain point');
updateListItem('painPoints', 3, 'Fourth pain point');
```

---

## 8. Persona Generator Button

**Location:** `/components/PersonaGeneratorButton.tsx`

**How to Trigger:**
```tsx
// Click the floating red button in top-right corner
// Or programmatically:
handleGeneratePersona();
```

**Customizing the Generator:**
Edit `/utils/personaGenerator.ts` to modify:
- Consumer type probabilities
- Age demographic distributions
- Gender ratios
- Name pools
- Favorite brands by demographic
- Survey score ranges
- About text templates
- Goals/needs/pain points templates

---

## 9. Main App State Management

**Location:** `/App.tsx`

**Complete State Object:**
```tsx
const [personaData, setPersonaData] = useState({
  // Identity
  name: "Sarah",
  tagline: "Building wellness empire",
  role: "Ambassador",
  subtitle: "35 • Millennial • Female",
  quote: "Quote text",
  quoteNote: "while doing something",

  // Demographics
  age: "35 (Millennial)",
  gender: "Female",
  income: "$55,000 - $85,000",
  education: "Bachelor's in Business",
  location: "Austin, TX",
  occupation: "Marketing Manager",
  family: "Married, 2 kids",
  spouseOccupation: "Engineer",

  // Consumer Details
  consumerType: "Ambassador",
  consumerGeneration: "Millennial",
  consumerAge: 35,
  personalityScore: 85,
  
  favoriteBrands: {
    apparel: "Lululemon",
    supplement: "Thorne",
    fitnessEducation: "Peloton",
    shoppingStore: "Target",
    plexus: "Plexus"
  },

  // Characteristics (4 tags)
  characteristics: [
    "Entrepreneurial",
    "Community-focused",
    "Health-conscious",
    "Social media active"
  ],

  // Brand Pills (generic brand name fields - editable to any brand)
  brand_1: "Thorne",
  brand_2: "Nike",
  brand_3: "HUM",
  brand_4: "Plexus",
  
  // Narrative
  about: "Full about text...",

  // Lists
  goals: ["Goal 1", "Goal 2", "Goal 3"],
  needs: ["Need 1", "Need 2", "Need 3"],
  painPoints: ["Pain 1", "Pain 2", "Pain 3", "Pain 4"],

  // Survey Scores
  csatTotal: 85,      // 0-100
  cesAverage: 6,      // 1-7
  npsTotal: 75,       // -100 to 100

  // Personality Traits (0-10 each)
  traits: {
    valueHunter: 7,
    researcher: 6,
    brandDevoted: 8,
    impulseShopping: 3,
    socialButterfly: 9,
    replenisher: 7,
    mobileShopping: 8,
    ethicalIngredients: 5,
    gifter: 4,
    techSavvy: 9
  },

  engagementScore: 85
});
```

---

## 🎯 Common Manipulation Patterns

### Pattern 1: Update Single Field
```tsx
updateField('name', 'NewValue');
```

### Pattern 2: Update Trait
```tsx
updateTrait('valueHunter', 8);
```

### Pattern 3: Update List Item
```tsx
updateListItem('goals', 0, 'New goal text');
```

### Pattern 4: Bulk Update
```tsx
setPersonaData(prev => ({
  ...prev,
  name: "Jessica",
  age: "28 (Millennial)",
  occupation: "Wellness Coach",
  traits: {
    ...prev.traits,
    socialButterfly: 10,
    techSavvy: 9
  }
}));
```

### Pattern 5: Generate New Persona
```tsx
const newPersona = generatePlexusPersona();
setPersonaData(newPersona);
```

---

## 🔧 Helper Functions Available

```tsx
// In App.tsx (lines 451-474):

// Update any simple field
updateField(field: string, value: string | number)

// Update personality trait (0-10)
updateTrait(trait: keyof Traits, value: number)

// Update list item (goals, needs, painPoints)
updateListItem(list: 'goals' | 'needs' | 'painPoints', index: number, value: string)

// Generate new persona
handleGeneratePersona()
```

---

## 📊 Calculated Values

These values are automatically calculated based on other data:

**Total Score (0-100):**
```tsx
// Calculated from average of all 10 traits * 10
const totalScore = Math.round((sum of all traits / 10) * 10);
```

**Engagement Level:**
```tsx
// Based on total score:
// 0-34: "Unaware/Retail Shopper"
// 35-74: "VIP Member"  
// 75-100: "Brand Ambassador"
```

**Background Color:**
```tsx
// Based on total score:
// 0-34: "#F0F0F0" (gray)
// 35-74: "#E5F7ED" (light green)
// 75-100: "#FFE8E5" (light pink)
```

**Consumer Type Badge:**
```tsx
// Based on total score:
// 0-34: "Retail/Unaware"
// 35-74: "VIP"
// 75-100: "Ambassador"
```

**Trust Status:**
```tsx
// Based on total score:
// 0-15: "Infrequent Buyer"
// 16-35: "Gaining Trust in Brand"
// 36-54: "Losing Interest or Trust in Brand"
// 55-74: "Potential Ambassadorship"
// 75-85: "Struggling with Ambassadorship"
// 86-100: "Influential Entrepreneur"
```

---

## 🎨 Example: Complete Persona Update

```tsx
// Set a complete Ambassador persona programmatically:
setPersonaData({
  name: "Ashley",
  tagline: "Building wellness empire",
  role: "Ambassador",
  subtitle: "32 • Millennial • Female",
  quote: "Plexus isn't just products, it's a community!",
  quoteNote: "while preparing her morning routine",
  
  age: "32 (Millennial)",
  gender: "Female",
  income: "$65,000 - $85,000",
  education: "Bachelor's in Marketing",
  location: "Scottsdale, AZ",
  occupation: "Marketing Manager",
  family: "Married, 2 kids",
  spouseOccupation: "Engineer",
  
  consumerType: "Ambassador",
  consumerGeneration: "Millennial",
  consumerAge: 32,
  personalityScore: 87,
  
  favoriteBrands: {
    apparel: "Lululemon",
    supplement: "Thorne",
    fitnessEducation: "Peloton",
    shoppingStore: "Target",
    plexus: "Plexus"
  },
  
  characteristics: [
    "Entrepreneurial",
    "Community-focused",
    "Health-conscious",
    "Social media active"
  ],
  
  brand_1: "Thorne",
  brand_2: "Nike",
  brand_3: "N/A",
  brand_4: "Plexus",
  
  about: "Ashley is a 32-year-old Millennial who discovered Plexus through social media...",
  
  goals: [
    "Build sustainable income through Plexus",
    "Help 50+ people this year",
    "Achieve Diamond rank"
  ],
  
  needs: [
    "Reliable product quality",
    "Strong marketing support",
    "Ambassador community"
  ],
  
  painPoints: [
    "Overcoming MLM skepticism",
    "Balancing family and business",
    "Managing inventory",
    "Maintaining social presence"
  ],
  
  consumerHabits: {
    discovery: "Social media and friend recommendations",
    purchase: "Online via website and mobile app",
    comparison: "Reads reviews across platforms"
  },
  
  networkBuilding: {
    millennial: "Instagram and Facebook groups",
    genZ: "TikTok and Instagram stories",
    genX: "Facebook and email",
    boomer: "In-person events and calls"
  },
  
  csatTotal: 92,
  cesAverage: 7,
  npsTotal: 85,
  
  traits: {
    valueHunter: 7,
    researcher: 6,
    brandDevoted: 9,
    impulseShopping: 4,
    socialButterfly: 10,
    replenisher: 9,
    mobileShopping: 9,
    ethicalIngredients: 7,
    gifter: 6,
    techSavvy: 10
  },
  
  engagementScore: 87
});
```

---

## 📝 Notes

- All text fields support click-to-edit
- All sliders support drag-and-drop
- Total personality score auto-calculates from traits
- Background color and engagement level auto-update based on score
- Name field has 9-character maximum
- About field has 655-character maximum
- Tagline has 26-character maximum
- All changes are stored in React state (not persisted to database)
- Brand fields (`brand_1`, `brand_2`, `brand_3`, `brand_4`) can be set to any brand name

---

**Need to modify behavior?** Check these files:
- Component logic: `/components/`
- Generator logic: `/utils/personaGenerator.ts`
- Main state: `/App.tsx`
- Brand fields: `/components/ProfileSection.tsx` (lines 148-175)