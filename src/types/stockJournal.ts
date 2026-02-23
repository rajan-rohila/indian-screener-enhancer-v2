import { AnalystKey } from "../constants/people/analysts";

export enum Outlook {
  BULLISH = "BULLISH",
  BEARISH = "BEARISH",
  NEUTRAL = "NEUTRAL",
}

export enum Action {
  BUY = "BUY",
  HOLD = "HOLD",
  SELL = "SELL",
}

export interface ThesisEntry {
  analyst: AnalystKey;
  date: string; // ISO date string e.g. "2025-06-15"
  arguments: string[];
}

export interface TimelineEntry {
  analyst: AnalystKey;
  date: string; // ISO date string
  outlook?: Outlook;
  action?: Action;
  update: string[];
}

export interface StockJournal {
  thesis: ThesisEntry[];
  timeline: TimelineEntry[];
}
