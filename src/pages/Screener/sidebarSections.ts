import { IndustryGroupKey, INDUSTRY_GROUP_ORDER } from "../../constants/industry/industryGroups";

export const SIDEBAR_SECTIONS: IndustryGroupKey[][] = [
  INDUSTRY_GROUP_ORDER.slice(0, 2),   // Financial, Insurance
  INDUSTRY_GROUP_ORDER.slice(2, 5),   // Metals, Energy, Chemicals
  INDUSTRY_GROUP_ORDER.slice(5, 7),   // Industrial, Auto
  INDUSTRY_GROUP_ORDER.slice(7, 9),   // Infrastructure, Construction
  INDUSTRY_GROUP_ORDER.slice(9, 13),  // Consumer, F&B, Textile, Craft Type
  INDUSTRY_GROUP_ORDER.slice(13, 14), // Media
  INDUSTRY_GROUP_ORDER.slice(14, 15), // Healthcare
  INDUSTRY_GROUP_ORDER.slice(15, 17), // Tech, Defense
];
