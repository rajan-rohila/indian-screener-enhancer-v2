import { useState, useEffect, useRef } from "react";
import type { StockData } from "../types/stockData";
import { StockKey, STOCKS } from "../constants/industry/stocks";

// In-memory cache that persists across component re-renders within a session
const cache = new Map<StockKey, StockData>();

function parseStockHtml(html: string): StockData {
  const doc = new DOMParser().parseFromString(html, "text/html");

  // PE ratio: look for "Stock P/E" in the ratios list
  let pe: string | null = null;
  const listItems = doc.querySelectorAll("#top-ratios li");
  for (const li of listItems) {
    const name = li.querySelector(".name");
    const value = li.querySelector(".value, .number");
    if (name?.textContent?.trim().includes("Stock P/E") && value) {
      pe = value.textContent?.trim() || null;
    }
  }

  return { pe };
}

export function useStockData(stockKeys: StockKey[]) {
  const [data, setData] = useState<Map<StockKey, StockData>>(new Map(cache));
  const fetchingRef = useRef(new Set<StockKey>());

  useEffect(() => {
    for (const key of stockKeys) {
      // Skip if already cached or currently fetching
      if (cache.has(key) || fetchingRef.current.has(key)) continue;

      fetchingRef.current.add(key);
      const url = STOCKS[key].screenerUrl;

      fetch(`/api/stock?url=${encodeURIComponent(url)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed");
          return res.text();
        })
        .then((html) => {
          const parsed = parseStockHtml(html);
          cache.set(key, parsed);
          setData(new Map(cache));
        })
        .catch(() => {
          // Silently fail — no loader, no error state
        })
        .finally(() => {
          fetchingRef.current.delete(key);
        });
    }
  }, [stockKeys]);

  return data;
}
