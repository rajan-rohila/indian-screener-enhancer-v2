export const INDUSTRY_GROUPS = {
  FINANCIAL: "Financial",
  INSURANCE: "Insurance",
  METALS: "Metals",
  ENERGY: "Energy",
  CHEMICALS: "Chemicals",
  INDUSTRIAL: "Industrial",
  AUTO: "Auto",
  INFRASTRUCTURE: "Infrastructure",
  CONSTRUCTION: "Construction",
  CONSUMER: "Consumer",
  FB: "F&B",
  TEXTILE: "Textile",
  CRAFT_TYPE: "Craft Type",
  MEDIA: "Media",
  HEALTHCARE: "Healthcare",
  TECH: "Tech",
  DEFENSE: "Defense",
} as const;

export type IndustryGroupKey = keyof typeof INDUSTRY_GROUPS;
