export enum AnalystKey {
  HARNOOR = "HARNOOR",
  KEDIA = "KEDIA",
}

interface AnalystInfo {
  name: string;
}

export const ANALYSTS: Record<AnalystKey, AnalystInfo> = {
  [AnalystKey.HARNOOR]: { name: "Harnoor" },
  [AnalystKey.KEDIA]: { name: "Kedia" },
};
