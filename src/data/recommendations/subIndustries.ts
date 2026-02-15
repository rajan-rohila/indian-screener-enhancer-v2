import { AnalystKey } from "../../constants/people/analysts";
import { SubIndustryKey } from "../../constants/industry/subIndustries";

interface IndustryGroupRec {
  subIndustry: SubIndustryKey;
  thesis: string;
}

export const INDUSTRY_GROUP_RECS: Record<AnalystKey, IndustryGroupRec[]> = {
  [AnalystKey.HARNOOR]: [
    { subIndustry: SubIndustryKey.REFINERIES_AND_MARKETING, thesis: "India-US trade deal benefits oil sector, Reliance is portfolio anchor" },
    { subIndustry: SubIndustryKey.PHARMACEUTICALS, thesis: "Generic pharma to benefit from tariff reductions - Zydus, Sun Pharma, Lupin, Aurobindo" },
    { subIndustry: SubIndustryKey.GEMS_JEWELLERY, thesis: "Jewellery stocks delivered solid results but market not rewarding yet, Sky Gold standout with revenue-backed growth" },
    { subIndustry: SubIndustryKey.CONSUMER_ELECTRONICS, thesis: "EMS sector is the future, Kaynes and PGEL are core holdings despite short-term pain" },
    { subIndustry: SubIndustryKey.AUTO_COMPONENTS, thesis: "Auto ancillary with US exposure benefits - Bharat Forge, Sona BLW, Motherson Sumi" },
    { subIndustry: SubIndustryKey.HEAVY_ELECTRICAL, thesis: "KEC stellar results, Techno Electric added for data centre theme, capital goods benefit from Make in India" },
    { subIndustry: SubIndustryKey.TEA_COFFEE, thesis: "Spices, tea and coffee benefit from trade deal tariff reductions" },
    { subIndustry: SubIndustryKey.AEROSPACE_DEFENSE, thesis: "Defense stocks gave fabulous rally, HAL added at 4250, exited post-budget as capex not increased" },
    { subIndustry: SubIndustryKey.HOUSEHOLD_APPLIANCES, thesis: "White goods biggest GST beneficiary, PLI scheme positive, summer theme with huge upside" },
    { subIndustry: SubIndustryKey.OTHER_ELECTRICAL, thesis: "Electrical equipment companies benefit from summer demand and Make in India theme" },
    { subIndustry: SubIndustryKey.OTHER_BEVERAGES, thesis: "VBL is safest summer play, topped up stake" },
    { subIndustry: SubIndustryKey.DIVERSIFIED_RETAIL, thesis: "Vishal Mega Mart biggest beneficiary of consumption push, GST reforms boost FMCG and retail" },
    { subIndustry: SubIndustryKey.FINTECH, thesis: "Zaggle delivered exceptional results on all parameters, microcap with stellar management outlook" },
    { subIndustry: SubIndustryKey.PAINTS, thesis: "Asian Paints worst is over after 4 year consolidation, entire paint sector on radar" },
    { subIndustry: SubIndustryKey.INDUSTRIAL_PRODUCTS, thesis: "Tube Investment excellent results, multibagger potential over 4-5 years" },
    { subIndustry: SubIndustryKey.SOFTWARE_CONSULTING, thesis: "IT sector complete avoid except small TCS position for dividend, no growth and H1B visa issues" },
  ],
  [AnalystKey.KEDIA]: [
    { subIndustry: SubIndustryKey.CIVIL_CONSTRUCTION, thesis: "Infrastructure stocks significantly declined from highs, crucial for India's economic growth - good time for selective buying" },
    { subIndustry: SubIndustryKey.TOUR_TRAVEL, thesis: "Tourism is a sunrise theme with strong growth potential" },
    { subIndustry: SubIndustryKey.HOTELS_RESORTS, thesis: "Tourism is a sunrise theme with strong growth potential" },
  ],
};
