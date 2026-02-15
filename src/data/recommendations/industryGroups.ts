import { AnalystKey } from "../../constants/people/analysts";
import { IndustryGroupKey } from "../../constants/industry/industryGroups";

interface IndustryGroupRec {
  industryGroup: IndustryGroupKey;
  thesis: string;
}

export const INDUSTRY_GROUP_RECS: Record<AnalystKey, IndustryGroupRec[]> = {
  [AnalystKey.HARNOOR]: [
    { industryGroup: IndustryGroupKey.ENERGY, thesis: "Reliance is portfolio anchor, Jio IPO unlocks value, brokerages bullish" },
    { industryGroup: IndustryGroupKey.HEALTHCARE, thesis: "Generic pharma to benefit from tariff reductions" },
    { industryGroup: IndustryGroupKey.CONSUMER, thesis: "White goods biggest GST beneficiary, EMS sector is the future, jewellery stocks undervalued, retail benefits from consumption push" },
    { industryGroup: IndustryGroupKey.AUTO, thesis: "Auto ancillary with US exposure benefits from reduced tariffs" },
    { industryGroup: IndustryGroupKey.INDUSTRIAL, thesis: "KEC stellar results, Tube Investment multibagger potential, Techno Electric for data centres" },
    { industryGroup: IndustryGroupKey.FB, thesis: "VBL safest summer play, coffee benefits from trade deal" },
    { industryGroup: IndustryGroupKey.DEFENSE, thesis: "Defense gave fabulous rally, HAL added, exited post-budget as capex not increased per estimates" },
    { industryGroup: IndustryGroupKey.TECH, thesis: "Zaggle exceptional fintech results, but IT sector is complete avoid due to no growth and H1B issues" },
    { industryGroup: IndustryGroupKey.CONSTRUCTION, thesis: "Asian Paints worst is over, paint sector consolidation ending after 4 years" },
    { industryGroup: IndustryGroupKey.FINANCIAL, thesis: "Jio Finance pure longterm bet, NBFC stocks indirect beneficiary of consumption push" },
  ],
  [AnalystKey.KEDIA]: [
    { industryGroup: IndustryGroupKey.INFRASTRUCTURE, thesis: "Infrastructure stocks significantly declined from highs, good time for selective buying" },
    { industryGroup: IndustryGroupKey.CONSUMER, thesis: "Tourism is a sunrise theme with strong growth potential" },
  ],
};
