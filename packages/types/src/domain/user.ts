export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  isLive: boolean;
  isVerified: boolean;
  isCreator: boolean;
  walletBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends Omit<User, "email" | "walletBalance"> {
  isFollowing: boolean;
  isSubscribed: boolean;
  currentStreamId?: string;
}

export interface BlockedUser {
  id: string;
  userId: string;
  blockedUserId: string;
  displayName: string;
  avatarUrl?: string;
  blockedAt: string;
}
