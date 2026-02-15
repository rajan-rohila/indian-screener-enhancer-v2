import { AnalystKey } from "../../constants/people/analysts";
import { IndustryGroupKey } from "../../constants/industry/industryGroups";

interface IndustryGroupRec {
  industryGroup: IndustryGroupKey;
  thesis: string;
}

export const INDUSTRY_GROUP_RECS: Record<AnalystKey, IndustryGroupRec[]> = {
  [AnalystKey.HARNOOR]: [
    { industryGroup: IndustryGroupKey.ENERGY, thesis: "India-US trade deal benefits oil sector" },
    { industryGroup: IndustryGroupKey.HEALTHCARE, thesis: "Generic pharma to benefit from tariff reductions" },
    { industryGroup: IndustryGroupKey.CONSUMER, thesis: "Trade deal reduces tariffs on gems, jewelry and electronics exports to US" },
    { industryGroup: IndustryGroupKey.AUTO, thesis: "Auto ancillary with US exposure benefits from reduced tariffs" },
    { industryGroup: IndustryGroupKey.INDUSTRIAL, thesis: "Capital goods benefit from Make in India theme promoted by trade deal" },
    { industryGroup: IndustryGroupKey.FB, thesis: "Spices, tea and coffee benefit from trade deal tariff reductions" },
    { industryGroup: IndustryGroupKey.DEFENSE, thesis: "Aircraft parts and machinery components benefit from trade deal" },
  ],
  [AnalystKey.KEDIA]: [
    { industryGroup: IndustryGroupKey.INFRASTRUCTURE, thesis: "Infrastructure stocks significantly declined from highs, good time for selective buying" },
    { industryGroup: IndustryGroupKey.CONSUMER, thesis: "Tourism is a sunrise theme with strong growth potential" },
  ],
};
