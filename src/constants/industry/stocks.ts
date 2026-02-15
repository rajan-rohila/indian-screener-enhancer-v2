import { IndustryGroupKey } from "./industryGroups";
import { IndustryKey } from "./industries";
import { SubIndustryKey } from "./subIndustries";

export enum StockKey {
  RELIANCE = "RELIANCE",
  CCLPRODUCTS = "CCLPRODUCTS",
  MTARTECH = "MTARTECH",
  AZAD = "AZAD",
  SONACOMS = "SONACOMS",
  BLUESTARCO = "BLUESTARCO",
  VOLTAS = "VOLTAS",
  HAVELLS = "HAVELLS",
  EPACK = "EPACK",
  AMBER = "AMBER",
  PGEL = "PGEL",
  SYMPHONY = "SYMPHONY",
  VBL = "VBL",
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
    subIndustry: SubIndustryKey.HEAVY_ELECTRICAL,
    industry: IndustryKey.ELECTRICAL,
    industryGroup: IndustryGroupKey.INDUSTRIAL,
  },
  [StockKey.SONACOMS]: {
    name: "Sona BLW",
    screenerUrl: "https://www.screener.in/company/SONACOMS/",
    subIndustry: SubIndustryKey.AUTO_COMPONENTS,
    industry: IndustryKey.ANCILLARY,
    industryGroup: IndustryGroupKey.AUTO,
  },
  [StockKey.BLUESTARCO]: {
    name: "Blue Star",
    screenerUrl: "https://www.screener.in/company/BLUESTARCO/",
    subIndustry: SubIndustryKey.HOUSEHOLD_APPLIANCES,
    industry: IndustryKey.DURABLES,
    industryGroup: IndustryGroupKey.CONSUMER,
  },
  [StockKey.VOLTAS]: {
    name: "Voltas",
    screenerUrl: "https://www.screener.in/company/VOLTAS/",
    subIndustry: SubIndustryKey.HOUSEHOLD_APPLIANCES,
    industry: IndustryKey.DURABLES,
    industryGroup: IndustryGroupKey.CONSUMER,
  },
  [StockKey.HAVELLS]: {
    name: "Havells",
    screenerUrl: "https://www.screener.in/company/HAVELLS/",
    subIndustry: SubIndustryKey.CONSUMER_ELECTRONICS,
    industry: IndustryKey.DURABLES,
    industryGroup: IndustryGroupKey.CONSUMER,
  },
  [StockKey.EPACK]: {
    name: "Epack Durable",
    screenerUrl: "https://www.screener.in/company/EPACK/",
    subIndustry: SubIndustryKey.HOUSEHOLD_APPLIANCES,
    industry: IndustryKey.DURABLES,
    industryGroup: IndustryGroupKey.CONSUMER,
  },
  [StockKey.AMBER]: {
    name: "Amber Enterprises",
    screenerUrl: "https://www.screener.in/company/AMBER/",
    subIndustry: SubIndustryKey.HOUSEHOLD_APPLIANCES,
    industry: IndustryKey.DURABLES,
    industryGroup: IndustryGroupKey.CONSUMER,
  },
  [StockKey.PGEL]: {
    name: "PG Electroplast",
    screenerUrl: "https://www.screener.in/company/PGEL/",
    subIndustry: SubIndustryKey.CONSUMER_ELECTRONICS,
    industry: IndustryKey.DURABLES,
    industryGroup: IndustryGroupKey.CONSUMER,
  },
  [StockKey.SYMPHONY]: {
    name: "Symphony",
    screenerUrl: "https://www.screener.in/company/SYMPHONY/",
    subIndustry: SubIndustryKey.HOUSEHOLD_APPLIANCES,
    industry: IndustryKey.DURABLES,
    industryGroup: IndustryGroupKey.CONSUMER,
  },
  [StockKey.VBL]: {
    name: "Varun Beverages",
    screenerUrl: "https://www.screener.in/company/VBL/",
    subIndustry: SubIndustryKey.OTHER_BEVERAGES,
    industry: IndustryKey.BEVERAGES,
    industryGroup: IndustryGroupKey.FB,
  },
};
