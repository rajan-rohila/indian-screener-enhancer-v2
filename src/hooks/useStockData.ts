import { useState, useEffect, useRef } from "react";
import type { StockData } from "../types/stockData";
import { StockKey, STOCKS } from "../constants/industry/stocks";

// In-memory cache that persists across component re-renders within a session
const cache = new Map<StockKey, StockData>();

// Global queue so multiple hook instances share one throttled pipeline
let queue: StockKey[] = [];
let processing = false;
const listeners = new Set<() => void>();

const BATCH_SIZE = 3; // concurrent requests per batch
const BATCH_GAP_MS = 600; // gap between batches
const MAX_RETRIES = 2;
const RETRY_BACKOFF_MS = 2000; // extra wait on 429

function notify() {
  for (const fn of listeners) fn();
}

function parseStockHtml(html: string): StockData {
  const doc = new DOMParser().parseFromString(html, "text/html");

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

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchOne(key: StockKey, attempt = 0): Promise<void> {
  const url = STOCKS[key].screenerUrl;
  try {
    const res = await fetch(`/api/stock?url=${encodeURIComponent(url)}`);
    if (res.status === 429) {
      if (attempt < MAX_RETRIES) {
        const wait = RETRY_BACKOFF_MS * (attempt + 1);
        await sleep(wait);
        return fetchOne(key, attempt + 1);
      }
      return; // give up silently after retries
    }
    if (!res.ok) return;
    const html = await res.text();
    cache.set(key, parseStockHtml(html));
    notify();
  } catch {
    // silently fail
  }
}

async function processQueue() {
  if (processing) return;
  processing = true;

  while (queue.length > 0) {
    const batch = queue.splice(0, BATCH_SIZE).filter((k) => !cache.has(k));
    if (batch.length === 0) continue;
    await Promise.all(batch.map((key) => fetchOne(key)));
    if (queue.length > 0) await sleep(BATCH_GAP_MS);
  }

  processing = false;
}

function enqueue(keys: StockKey[]) {
  for (const key of keys) {
    if (!cache.has(key) && !queue.includes(key)) {
      queue.push(key);
    }
  }
  processQueue();
}

export function useStockData(stockKeys: StockKey[]) {
  const [data, setData] = useState<Map<StockKey, StockData>>(new Map(cache));
  const keysRef = useRef(stockKeys);
  keysRef.current = stockKeys;

  useEffect(() => {
    const update = () => setData(new Map(cache));
    listeners.add(update);
    enqueue(stockKeys);
    return () => { listeners.delete(update); };
  }, [stockKeys]);

  return data;
}
