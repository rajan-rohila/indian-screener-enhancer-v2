import { StockKey } from "../../constants/industry/stocks";
import type { StockJournal } from "../../types/stockJournal";

// Each stock with journal data gets a lazy import here.
// Add new stocks by adding their ticker key and import.
const JOURNAL_LOADERS: Partial<Record<StockKey, () => Promise<{ default: StockJournal }>>> = {
  [StockKey.RELIANCE]: () => import("./RELIANCE"),
};

export async function loadStockJournal(key: StockKey): Promise<StockJournal | null> {
  const loader = JOURNAL_LOADERS[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function hasJournal(key: StockKey): boolean {
  return key in JOURNAL_LOADERS;
}
