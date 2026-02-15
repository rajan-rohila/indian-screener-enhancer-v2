import type { IndustryData } from "../types/screener";

// Shared in-memory cache for screener data — persists across components within a session
let cachedData: IndustryData[] | null = null;
let fetchPromise: Promise<IndustryData[]> | null = null;

function parseHtml(html: string): IndustryData[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const data: IndustryData[] = [];

  doc.querySelectorAll("table tr").forEach((row) => {
    if (row.querySelector("th")) return;
    const cells = row.querySelectorAll("td");
    if (cells.length < 10) return;
    const link = cells[1]?.querySelector("a");
    if (!link) return;

    data.push({
      name: link.textContent?.trim() || "",
      url: "https://www.screener.in" + link.getAttribute("href"),
      companies: parseInt(cells[2]?.textContent?.trim() || "0") || 0,
      marketCap: cells[3]?.textContent?.trim() || "-",
      medianCap: cells[4]?.textContent?.trim() || "-",
      pe: cells[5]?.textContent?.trim() || "-",
      salesGrowth: cells[6]?.textContent?.trim() || "-",
      opm: cells[7]?.textContent?.trim() || "-",
      roce: cells[8]?.textContent?.trim() || "-",
      return1y: cells[9]?.textContent?.trim() || "-",
    });
  });

  return data;
}

export function getScreenerData(): Promise<IndustryData[]> {
  if (cachedData) return Promise.resolve(cachedData);

  if (!fetchPromise) {
    fetchPromise = fetch("/api/screener")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.text();
      })
      .then((html) => {
        cachedData = parseHtml(html);
        return cachedData;
      })
      .catch((err) => {
        fetchPromise = null;
        throw err;
      });
  }

  return fetchPromise;
}

// Quick lookup: industry name → screener URL
export function getIndustryUrlMap(): Map<string, string> {
  const map = new Map<string, string>();
  if (cachedData) {
    for (const item of cachedData) {
      map.set(item.name, item.url);
    }
  }
  return map;
}
