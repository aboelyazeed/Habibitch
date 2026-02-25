export type StreamStatus = "live" | "ended" | "scheduled";

export interface Stream {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatarUrl?: string;
  isCreatorVerified: boolean;
  title: string;
  categoryId: string;
  categoryName: string;
  thumbnailUrl?: string;
  status: StreamStatus;
  viewerCount: number;
  startedAt: string;
  endedAt?: string;
  tags?: string[];
}

export interface StreamDetail extends Stream {
  description?: string;
  chatRules?: string;
  isFollowing: boolean;
  isSubscribed: boolean;
}
