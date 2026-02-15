import { AnalystKey } from "../../constants/people/analysts";
import { StockKey } from "../../constants/industry/stocks";

interface StockRec {
  stock: StockKey;
  thesis: string;
}

export const STOCK_RECS: Record<AnalystKey, StockRec[]> = {
  [AnalystKey.HARNOOR]: [
    { stock: StockKey.RELIANCE, thesis: "Jamnagar refinery is only one equipped to process heavier Venezuelan oil, plus data center investments got budget tax exemptions" },
    { stock: StockKey.SONACOMS, thesis: "Strong performance despite challenges, significant US exposure benefits from reduced tariffs" },
    { stock: StockKey.CCLPRODUCTS, thesis: "Key player in coffee sector benefiting from tariff reductions" },
    { stock: StockKey.MTARTECH, thesis: "Aircraft parts and machinery components player benefiting from trade deal" },
    { stock: StockKey.AZAD, thesis: "Aircraft parts and machinery components player benefiting from trade deal" },
    { stock: StockKey.HAVELLS, thesis: "Better AC play than Blue Star/Voltas due to current valuation, benefits from lower copper prices and GST cuts" },
    { stock: StockKey.PGEL, thesis: "AC component manufacturer with lower valuation and strong growth projections, indirect summer play" },
    { stock: StockKey.SYMPHONY, thesis: "Cooler momentum play, typically sees upswing during summer period each year" },
    { stock: StockKey.VBL, thesis: "Safest summer bet — growth despite stock price drop, favorable PE, new Carlsberg tie-up for alcoholic beverages in South Africa" },
  ],
  [AnalystKey.KEDIA]: [],
};
