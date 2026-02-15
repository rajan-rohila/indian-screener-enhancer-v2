import { AnalystKey } from "../../constants/people/analysts";
import { IndustryGroupKey } from "../../constants/industry/industryGroups";
import { SubIndustryKey } from "../../constants/industry/subIndustries";
import { StockKey } from "../../constants/industry/stocks";
import { INDUSTRY_GROUP_RECS } from "./industryGroups";
import { INDUSTRY_GROUP_RECS as SUB_INDUSTRY_RECS } from "./subIndustries";
import { STOCK_RECS } from "./stocks";

export interface Vote {
  analyst: AnalystKey;
  thesis: string;
}

export interface IndustryGroupRec {
  key: IndustryGroupKey;
  votes: Vote[];
}

export interface SubIndustryRec {
  key: SubIndustryKey;
  votes: Vote[];
}

export interface StockRec {
  key: StockKey;
  votes: Vote[];
}

export interface RecommendationTree {
  industryGroups: IndustryGroupRec[];
  subIndustries: SubIndustryRec[];
  stocks: StockRec[];
}

function buildTree(analysts?: AnalystKey[]): RecommendationTree {
  const targetAnalysts = analysts ?? (Object.values(AnalystKey) as AnalystKey[]);

  // Aggregate industry groups
  const igMap = new Map<IndustryGroupKey, Vote[]>();
  for (const analyst of targetAnalysts) {
    for (const rec of INDUSTRY_GROUP_RECS[analyst] ?? []) {
      const votes = igMap.get(rec.industryGroup) ?? [];
      votes.push({ analyst, thesis: rec.thesis });
      igMap.set(rec.industryGroup, votes);
    }
  }

  // Aggregate sub-industries
  const siMap = new Map<SubIndustryKey, Vote[]>();
  for (const analyst of targetAnalysts) {
    for (const rec of SUB_INDUSTRY_RECS[analyst] ?? []) {
      const votes = siMap.get(rec.subIndustry) ?? [];
      votes.push({ analyst, thesis: rec.thesis });
      siMap.set(rec.subIndustry, votes);
    }
  }

  // Aggregate stocks
  const stMap = new Map<StockKey, Vote[]>();
  for (const analyst of targetAnalysts) {
    for (const rec of STOCK_RECS[analyst] ?? []) {
      const votes = stMap.get(rec.stock) ?? [];
      votes.push({ analyst, thesis: rec.thesis });
      stMap.set(rec.stock, votes);
    }
  }

  return {
    industryGroups: [...igMap.entries()]
      .map(([key, votes]) => ({ key, votes }))
      .sort((a, b) => b.votes.length - a.votes.length),
    subIndustries: [...siMap.entries()]
      .map(([key, votes]) => ({ key, votes }))
      .sort((a, b) => b.votes.length - a.votes.length),
    stocks: [...stMap.entries()]
      .map(([key, votes]) => ({ key, votes }))
      .sort((a, b) => b.votes.length - a.votes.length),
  };
}

export { buildTree };
