import { useState, useEffect, useRef } from "react";
import type { StockData } from "../types/stockData";
import { StockKey, STOCKS } from "../constants/industry/stocks";
import {
  CACHE_TTL_DAYS,
  SCREENER_BATCH_SIZE,
  SCREENER_BATCH_GAP_MS,
  SCREENER_MAX_RETRIES,
  SCREENER_RETRY_BACKOFF_MS,
} from "../constants/screenerConfig";

// In-memory cache that persists across component re-renders within a session
const cache = new Map<StockKey, StockData>();

// localStorage persistence — 10 day TTL
const LS_KEY = "stock_pe_cache";
const TTL_MS = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const { ts, data } = JSON.parse(raw) as { ts: number; data: Record<string, StockData> };
    if (Date.now() - ts > TTL_MS) {
      localStorage.removeItem(LS_KEY);
      return;
    }
    for (const [k, v] of Object.entries(data)) {
      cache.set(k as StockKey, v);
    }
  } catch { /* ignore corrupt data */ }
}

function saveToStorage() {
  try {
    const data: Record<string, StockData> = {};
    for (const [k, v] of cache) data[k] = v;
    localStorage.setItem(LS_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch { /* quota exceeded etc */ }
}

// Hydrate on module load
loadFromStorage();

// Global queue so multiple hook instances share one throttled pipeline
let queue: StockKey[] = [];
let processing = false;
const listeners = new Set<() => void>();

const BATCH_SIZE = SCREENER_BATCH_SIZE;
const BATCH_GAP_MS = SCREENER_BATCH_GAP_MS;
const MAX_RETRIES = SCREENER_MAX_RETRIES;
const RETRY_BACKOFF_MS = SCREENER_RETRY_BACKOFF_MS;

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
    saveToStorage();
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
