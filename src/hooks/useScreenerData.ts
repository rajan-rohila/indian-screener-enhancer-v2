import { useState, useEffect, useCallback } from "react";
import type { IndustryData } from "../types/screener";

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

export function useScreenerData() {
  const [data, setData] = useState<IndustryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/screener");
      if (!res.ok) throw new Error("Failed to fetch");
      const html = await res.text();
      setData(parseHtml(html));
    } catch {
      setError("Failed to load data. Please try again.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
