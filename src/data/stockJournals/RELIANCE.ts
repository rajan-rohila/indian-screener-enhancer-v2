import { AnalystKey } from "../../constants/people/analysts";
import { Outlook, Action, type StockJournal } from "../../types/stockJournal";

const journal: StockJournal = {
  thesis: [
    {
      analyst: AnalystKey.HARNOOR,
      date: "2025-05-01",
      arguments: [
        "Jio IPO expected in H1 2026 — massive value unlock event",
        "Brokerages target 1630–1733, implying 18–25% upside from current levels",
        "Safe portfolio anchor — diversified across telecom, retail, O2C, and new energy",
        "Retail business scaling rapidly with JioMart and store expansion",
        "New energy vertical (solar, hydrogen, battery) is a long-term re-rating catalyst",
      ],
    },
  ],
  timeline: [
    {
      analyst: AnalystKey.HARNOOR,
      date: "2025-06-15",
      outlook: Outlook.BULLISH,
      action: Action.HOLD,
      update: [
        "Q4 results in line — Jio ARPU continues to inch up",
        "Retail EBITDA margin improved QoQ",
        "Management reiterated Jio IPO timeline for H1 2026",
      ],
    },
    {
      analyst: AnalystKey.HARNOOR,
      date: "2025-05-01",
      outlook: Outlook.BULLISH,
      action: Action.BUY,
      update: [
        "Added as portfolio anchor at ~1380 levels",
        "India-US trade deal benefits oil sector directly",
        "Multiple brokerages initiating coverage with 1600+ targets",
      ],
    },
  ],
};

export default journal;
