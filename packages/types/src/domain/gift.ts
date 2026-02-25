export interface GiftTier {
  id: string;
  name: string;
  nameAr: string;
  iconUrl: string;
  cost: number;
  animationUrl?: string;
  sortOrder: number;
}

export interface GiftEvent {
  id: string;
  streamId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl?: string;
  recipientId: string;
  giftId: string;
  giftName: string;
  giftIconUrl: string;
  cost: number;
  quantity: number;
  timestamp: string;
}
