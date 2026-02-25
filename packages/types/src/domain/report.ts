export type ReportTarget = "stream" | "chat_message" | "user";
export type ReportStatus = "pending" | "reviewed" | "resolved" | "dismissed";
export type ReportReason =
  | "inappropriate_content"
  | "harassment"
  | "spam"
  | "haram_content"
  | "violence"
  | "misinformation"
  | "other";

export interface Report {
  id: string;
  reporterId: string;
  targetType: ReportTarget;
  targetId: string;
  reason: ReportReason;
  description?: string;
  status: ReportStatus;
  referenceId: string;
  createdAt: string;
  resolvedAt?: string;
}
