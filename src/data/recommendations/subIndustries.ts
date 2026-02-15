import { AnalystKey } from "../../constants/people/analysts";
import { SubIndustryKey } from "../../constants/industry/subIndustries";

interface IndustryGroupRec {
  subIndustry: SubIndustryKey;
  thesis: string;
}

export const INDUSTRY_GROUP_RECS: Record<AnalystKey, IndustryGroupRec[]> = {
  [AnalystKey.HARNOOR]: [
    { subIndustry: SubIndustryKey.REFINERIES_AND_MARKETING, thesis: "India-US trade deal benefits oil sector" },
    { subIndustry: SubIndustryKey.PHARMACEUTICALS, thesis: "Generic pharma to benefit from tariff reductions - Zydus, Sun Pharma, Lupin, Aurobindo" },
    { subIndustry: SubIndustryKey.GEMS_JEWELLERY, thesis: "Trade deal reduces tariffs on gems & jewelry exports to US" },
    { subIndustry: SubIndustryKey.CONSUMER_ELECTRONICS, thesis: "Smartphones and electronics benefit - Tata Electronics (Apple components), Dixon Technologies (Android)" },
    { subIndustry: SubIndustryKey.AUTO_COMPONENTS, thesis: "Auto ancillary with US exposure benefits - Bharat Forge, Sona BLW, Motherson Sumi" },
    { subIndustry: SubIndustryKey.HEAVY_ELECTRICAL, thesis: "Capital goods benefit from Make in India theme promoted by trade deal" },
    { subIndustry: SubIndustryKey.TEA_COFFEE, thesis: "Spices, tea and coffee benefit from trade deal tariff reductions" },
    { subIndustry: SubIndustryKey.AEROSPACE_DEFENSE, thesis: "Aircraft parts and machinery components benefit from trade deal" },
  ],
  [AnalystKey.KEDIA]: [
    { subIndustry: SubIndustryKey.CIVIL_CONSTRUCTION, thesis: "Infrastructure stocks significantly declined from highs, crucial for India's economic growth - good time for selective buying" },
    { subIndustry: SubIndustryKey.TOUR_TRAVEL, thesis: "Tourism is a sunrise theme with strong growth potential" },
    { subIndustry: SubIndustryKey.HOTELS_RESORTS, thesis: "Tourism is a sunrise theme with strong growth potential" },
  ],
};
