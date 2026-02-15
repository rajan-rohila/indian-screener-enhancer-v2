import { useState, useEffect } from "react";
import { getScreenerData, getIndustryUrlMap } from "./screenerCache";

export function useIndustryUrls() {
  const [urlMap, setUrlMap] = useState<Map<string, string>>(getIndustryUrlMap());

  useEffect(() => {
    // If already cached, the map is already set
    if (urlMap.size > 0) return;

    getScreenerData().then(() => {
      setUrlMap(getIndustryUrlMap());
    }).catch(() => {
      // Silently fail
    });
  }, []);

  return urlMap;
}
