import { IndustryGroupKey } from "./industryGroups";
import { IndustryKey } from "./industries";
import { SubIndustryKey } from "./subIndustries";

export enum StockKey {
  RELIANCE = "RELIANCE",
  CCLPRODUCTS = "CCLPRODUCTS",
  MTARTECH = "MTARTECH",
  AZAD = "AZAD",
  SONACOMS = "SONACOMS",
}

export interface StockInfo {
  name: string;
  screenerUrl: string;
  subIndustry: SubIndustryKey;
  industry: IndustryKey;
  industryGroup: IndustryGroupKey;
}

export const STOCKS: Record<StockKey, StockInfo> = {
  [StockKey.RELIANCE]: {
    name: "Reliance Industries",
    screenerUrl: "https://www.screener.in/company/RELIANCE/",
    subIndustry: SubIndustryKey.REFINERIES_AND_MARKETING,
    industry: IndustryKey.OIL_AND_GAS,
    industryGroup: IndustryGroupKey.ENERGY,
  },
  [StockKey.CCLPRODUCTS]: {
    name: "CCL Products",
    screenerUrl: "https://www.screener.in/company/CCL/",
    subIndustry: SubIndustryKey.TEA_COFFEE,
    industry: IndustryKey.BEVERAGES,
    industryGroup: IndustryGroupKey.FB,
  },
  [StockKey.MTARTECH]: {
    name: "MTAR Technologies",
    screenerUrl: "https://www.screener.in/company/MTARTECH/",
    subIndustry: SubIndustryKey.AEROSPACE_DEFENSE,
    industry: IndustryKey.DEFENSE_OTHER,
    industryGroup: IndustryGroupKey.DEFENSE,
  },
  [StockKey.AZAD]: {
    name: "Azad Engineering",
    screenerUrl: "https://www.screener.in/company/AZAD/",
    subIndustry: SubIndustryKey.AEROSPACE_DEFENSE,
    industry: IndustryKey.DEFENSE_OTHER,
    industryGroup: IndustryGroupKey.DEFENSE,
  },
  [StockKey.SONACOMS]: {
    name: "Sona BLW",
    screenerUrl: "https://www.screener.in/company/SONACOMS/",
    subIndustry: SubIndustryKey.AUTO_COMPONENTS,
    industry: IndustryKey.ANCILLARY,
    industryGroup: IndustryGroupKey.AUTO,
  },
};
