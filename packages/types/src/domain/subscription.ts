export type SubscriptionTier = "basic" | "premium" | "elite";
export type SubscriptionStatus = "active" | "cancelled" | "expired";

export interface Subscription {
  id: string;
  subscriberId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatarUrl?: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  startedAt: string;
  expiresAt: string;
  autoRenew: boolean;
}

export interface SubscriptionPlan {
  id: string;
  creatorId: string;
  tier: SubscriptionTier;
  name: string;
  nameAr: string;
  price: number;
  benefits: string[];
  benefitsAr: string[];
}
