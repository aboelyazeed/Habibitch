export type MessageType = "text" | "system" | "gift" | "subscription";

export interface ChatMessage {
  id: string;
  streamId: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  content: string;
  type: MessageType;
  isSubscriber: boolean;
  isCreator: boolean;
  isModerator: boolean;
  timestamp: string;
}

export type ReactionType = "heart" | "fire" | "clap" | "star" | "laugh";

export interface ChatReaction {
  id: string;
  streamId: string;
  userId: string;
  type: ReactionType;
  timestamp: string;
}
