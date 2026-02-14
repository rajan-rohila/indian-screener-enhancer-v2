export const INDUSTRIES = {
  // FINANCIAL
  BANKS: "Banks",
  NBFC: "NBFC",
  ASSET_MGMT: "Asset Mgmt",
  FINANCIAL_SERVICES: "Services",

  // INSURANCE
  INSURANCE: "Insurance",
  INSURANCE_DISTRIBUTORS: "Distributors",

  // METALS
  IRON: "Iron",
  ALUMINIUM: "Aluminium",
  COPPER: "Copper",
  ZINC: "Zinc",
  PRECIOUS_METALS: "Precious",
  OTHER_METALS: "Other",

  // ENERGY
  POWER: "Power",
  OIL_AND_GAS: "Oil & Gas",
  COAL: "Coal",

  // CHEMICALS
  SPECIALTY_CHEMICALS: "Specialty",
  AGRI_CHEMICALS: "Agri",
  COMMODITY_CHEMICALS: "Commodity",
  INDUSTRIAL_CHEMICALS: "Industrial",
  TRADING_CHEMICALS: "Trading",

  // INDUSTRIAL
  ELECTRICAL: "Electrical",
  MACHINERY: "Machinery",
  COMPONENTS: "Components",
  INDUSTRIAL_PRODUCTS: "Products",

  // AUTO
  OEM: "OEM",
  ANCILLARY: "Ancillary",
  DEALER: "Dealer",

  // INFRASTRUCTURE
  CIVIL_CONSTRUCTION: "Construction",
  ROAD: "Road",
  RAIL: "Rail",
  SEA: "Sea",
  AIR: "Air",

  // CONSTRUCTION
  MATERIALS: "Materials",
  REAL_ESTATE: "Real Estate",

  // CONSUMER
  STAPLES: "Staples",
  RETAIL: "Retail",
  DURABLES: "Durables",
  DISCRETIONARY: "Discretionary",

  // F&B
  BEVERAGES: "Beverages",
  FB_STAPLES: "Staples",
  PROTEIN: "Protein",
  OTHER_FB: "Other",

  // TEXTILE
  TEXTILE_ALL: "All",

  // CRAFT TYPE
  CRAFT_OTHER: "Other",

  // MEDIA
  ENTERTAINMENT: "Entertainment",
  ADVERTISING: "Advertising",
  DIGITAL_MEDIA: "Digital Media",
  PRINT_MEDIA: "Print Media",

  // HEALTHCARE
  PHARMA: "Pharma",
  HEALTHCARE_SERVICES: "Services",
  EQUIPMENT: "Equipment",

  // TECH
  IT_SERVICES: "IT Services",
  TELECOM: "Telecom",
  HARDWARE: "Hardware",
  BIOTECH: "Biotech",

  // DEFENSE
  DEFENSE_OTHER: "Other",
} as const;

export type IndustryKey = keyof typeof INDUSTRIES;
