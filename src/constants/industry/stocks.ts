import { IndustryGroupKey } from "./industryGroups";
import { IndustryKey } from "./industries";
import { SubIndustryKey } from "./subIndustries";

export interface StockInfo {
  name: string;
  screenerUrl: string;
  subIndustry: SubIndustryKey;
  industry: IndustryKey;
  industryGroup: IndustryGroupKey;
}

export const STOCKS = {
  RELIANCE: {
    name: "Reliance Industries",
    screenerUrl: "https://www.screener.in/company/RELIANCE/",
    subIndustry: SubIndustryKey.REFINERIES_AND_MARKETING,
    industry: IndustryKey.OIL_AND_GAS,
    industryGroup: IndustryGroupKey.ENERGY,
  },
  CCLPRODUCTS: {
    name: "CCL Products",
    screenerUrl: "https://www.screener.in/company/CCL/",
    subIndustry: SubIndustryKey.TEA_COFFEE,
    industry: IndustryKey.BEVERAGES,
    industryGroup: IndustryGroupKey.FB,
  },
  MTARTECH: {
    name: "MTAR Technologies",
    screenerUrl: "https://www.screener.in/company/MTARTECH/",
    subIndustry: SubIndustryKey.AEROSPACE_DEFENSE,
    industry: IndustryKey.DEFENSE_OTHER,
    industryGroup: IndustryGroupKey.DEFENSE,
  },
  AZAD: {
    name: "Azad Engineering",
    screenerUrl: "https://www.screener.in/company/AZAD/",
    subIndustry: SubIndustryKey.AEROSPACE_DEFENSE,
    industry: IndustryKey.DEFENSE_OTHER,
    industryGroup: IndustryGroupKey.DEFENSE,
  },
  SONACOMS: {
    name: "Sona BLW",
    screenerUrl: "https://www.screener.in/company/SONACOMS/",
    subIndustry: SubIndustryKey.AUTO_COMPONENTS,
    industry: IndustryKey.ANCILLARY,
    industryGroup: IndustryGroupKey.AUTO,
  },
} as const satisfies Record<string, StockInfo>;

export type StockKey = keyof typeof STOCKS;
