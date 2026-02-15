export enum IndustryGroupKey {
  FINANCIAL = "FINANCIAL",
  INSURANCE = "INSURANCE",
  METALS = "METALS",
  ENERGY = "ENERGY",
  CHEMICALS = "CHEMICALS",
  INDUSTRIAL = "INDUSTRIAL",
  AUTO = "AUTO",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  CONSTRUCTION = "CONSTRUCTION",
  CONSUMER = "CONSUMER",
  FB = "FB",
  TEXTILE = "TEXTILE",
  CRAFT_TYPE = "CRAFT_TYPE",
  MEDIA = "MEDIA",
  HEALTHCARE = "HEALTHCARE",
  TECH = "TECH",
  DEFENSE = "DEFENSE",
}

/** Canonical display order — matches the Screener sidebar grouping. */
export const INDUSTRY_GROUP_ORDER: IndustryGroupKey[] = [
  IndustryGroupKey.FINANCIAL,
  IndustryGroupKey.INSURANCE,
  IndustryGroupKey.METALS,
  IndustryGroupKey.ENERGY,
  IndustryGroupKey.CHEMICALS,
  IndustryGroupKey.INDUSTRIAL,
  IndustryGroupKey.AUTO,
  IndustryGroupKey.INFRASTRUCTURE,
  IndustryGroupKey.CONSTRUCTION,
  IndustryGroupKey.CONSUMER,
  IndustryGroupKey.FB,
  IndustryGroupKey.TEXTILE,
  IndustryGroupKey.CRAFT_TYPE,
  IndustryGroupKey.MEDIA,
  IndustryGroupKey.HEALTHCARE,
  IndustryGroupKey.TECH,
  IndustryGroupKey.DEFENSE,
];

interface IndustryGroupInfo {
  name: string;
}

export const INDUSTRY_GROUPS: Record<IndustryGroupKey, IndustryGroupInfo> = {
  [IndustryGroupKey.FINANCIAL]: { name: "Financial" },
  [IndustryGroupKey.INSURANCE]: { name: "Insurance" },
  [IndustryGroupKey.METALS]: { name: "Metals" },
  [IndustryGroupKey.ENERGY]: { name: "Energy" },
  [IndustryGroupKey.CHEMICALS]: { name: "Chemicals" },
  [IndustryGroupKey.INDUSTRIAL]: { name: "Industrial" },
  [IndustryGroupKey.AUTO]: { name: "Auto" },
  [IndustryGroupKey.INFRASTRUCTURE]: { name: "Infra" },
  [IndustryGroupKey.CONSTRUCTION]: { name: "Construction" },
  [IndustryGroupKey.CONSUMER]: { name: "Consumer" },
  [IndustryGroupKey.FB]: { name: "F&B" },
  [IndustryGroupKey.TEXTILE]: { name: "Textile" },
  [IndustryGroupKey.CRAFT_TYPE]: { name: "Craft Type" },
  [IndustryGroupKey.MEDIA]: { name: "Media" },
  [IndustryGroupKey.HEALTHCARE]: { name: "Healthcare" },
  [IndustryGroupKey.TECH]: { name: "Tech" },
  [IndustryGroupKey.DEFENSE]: { name: "Defense" },
};
