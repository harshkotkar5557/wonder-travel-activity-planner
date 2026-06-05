export type ActivityKind = "skiing" | "surfing" | "indoor" | "outdoor";

export interface ActivityRanking {
  kind: ActivityKind;
  label: string;
  score: number;
  reason: string;
}
