import { useState, useEffect, useCallback } from "react";
import type { IndustryData } from "../types/screener";
import { getScreenerData } from "./screenerCache";

export function useScreenerData() {
  const [data, setData] = useState<IndustryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getScreenerData();
      setData(result);
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
