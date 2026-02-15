import { AnalystKey } from "../../constants/people/analysts";
import type { StockKey } from "../../constants/industry/stocks";

interface StockRec {
  stock: StockKey;
  thesis: string;
}

export const STOCK_RECS: Record<AnalystKey, StockRec[]> = {
  [AnalystKey.HARNOOR]: [
    { stock: "RELIANCE", thesis: "Jamnagar refinery is only one equipped to process heavier Venezuelan oil, plus data center investments got budget tax exemptions" },
    { stock: "SONACOMS", thesis: "Strong performance despite challenges, significant US exposure benefits from reduced tariffs" },
    { stock: "CCLPRODUCTS", thesis: "Key player in coffee sector benefiting from tariff reductions" },
    { stock: "MTARTECH", thesis: "Aircraft parts and machinery components player benefiting from trade deal" },
    { stock: "AZAD", thesis: "Aircraft parts and machinery components player benefiting from trade deal" },
  ],
  [AnalystKey.KEDIA]: [],
};
