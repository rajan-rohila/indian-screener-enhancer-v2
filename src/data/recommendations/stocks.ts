import { AnalystKey } from "../../constants/people/analysts";
import { StockKey } from "../../constants/industry/stocks";

interface StockRec {
  stock: StockKey;
  thesis: string;
}

export const STOCK_RECS: Record<AnalystKey, StockRec[]> = {
  [AnalystKey.HARNOOR]: [
    { stock: StockKey.RELIANCE, thesis: "Jio IPO in H1 2026 unlocks value, brokerages target 1630-1733, safe portfolio anchor with 18-25% upside" },
    { stock: StockKey.SONACOMS, thesis: "Strong performance despite challenges, significant US exposure benefits from reduced tariffs" },
    { stock: StockKey.CCLPRODUCTS, thesis: "Key player in coffee sector benefiting from tariff reductions" },
    { stock: StockKey.MTARTECH, thesis: "Aircraft parts and machinery components player benefiting from trade deal" },
    { stock: StockKey.AZAD, thesis: "Aircraft parts and machinery components player benefiting from trade deal" },
    { stock: StockKey.HAVELLS, thesis: "White goods GST cut beneficiary, PLI scheme positive, targeting 20-25% return over 6-9 months" },
    { stock: StockKey.PGEL, thesis: "Blockbuster results, EMS stock with huge summer upside, target 750-800 within 6-8 months" },
    { stock: StockKey.SYMPHONY, thesis: "Cooler momentum play, typically sees upswing during summer period each year" },
    { stock: StockKey.VBL, thesis: "Safest summer bet, topped up stake, favorable PE, new Carlsberg tie-up" },
    { stock: StockKey.SKYGOLD, thesis: "Best results among jewellery stocks with revenue-backed profit growth, multibagger potential, target 400 first" },
    { stock: StockKey.KAYNES, thesis: "20% of capital deployed, EMS sector leader despite short-term pain, all brokerages target 6000+" },
    { stock: StockKey.TIINDIA, thesis: "Excellent results, 4-5 year multibagger potential, main earnings growth starts next year" },
    { stock: StockKey.ZAGGLE, thesis: "Outstanding results, exceptional on all parameters, microcap with stellar management commentary" },
    { stock: StockKey.KEC, thesis: "Stellar quarter on every front, target 1200 then 1400 over next 2 years" },
    { stock: StockKey.TECHNOELECTRIC, thesis: "Added from data centre space post budget, budget positive for data centre sector" },
    { stock: StockKey.HAL, thesis: "Defense sector play, added at 4250, good for short-term budget trade and long-term view" },
    { stock: StockKey.VISHALMEGA, thesis: "Low budget retailer, biggest beneficiary of consumption push from GST reforms, 2 year longterm bet" },
    { stock: StockKey.EPACK, thesis: "Risky bet in summer/AC theme, small stake, PLI scheme beneficiary" },
    { stock: StockKey.ASIANPAINT, thesis: "Worst is over after 4 year consolidation, back to glory days, any dip worth buying" },
    { stock: StockKey.TCS, thesis: "Small IT position for portfolio weightage and 4-5% annual dividend, safety play" },
    { stock: StockKey.TARIL, thesis: "Averaged during market correction along with other core holdings" },
    { stock: StockKey.JIOFINANCE, thesis: "Pure longterm bet, corrected a lot from highs, businesses still need time to grow" },
    { stock: StockKey.EIEL, thesis: "Water stock with cheap valuations, budget positive for water sector, reduced to 1% after weak results" },
  ],
  [AnalystKey.KEDIA]: [],
};
