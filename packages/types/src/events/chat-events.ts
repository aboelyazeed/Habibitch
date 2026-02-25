import type { ChatMessage, ChatReaction } from "../domain/chat";

export type ChatEventType =
  | "message"
  | "reaction"
  | "delete_message"
  | "user_timeout"
  | "user_ban"
  | "system";

export interface ChatMessageEvent {
  type: "message";
  payload: ChatMessage;
}

export interface ChatReactionEvent {
  type: "reaction";
  payload: ChatReaction;
}

export interface ChatDeleteEvent {
  type: "delete_message";
  payload: {
    messageId: string;
    streamId: string;
    deletedBy: string;
  };
}

export interface ChatModerateEvent {
  type: "user_timeout" | "user_ban";
  payload: {
    streamId: string;
    userId: string;
    moderatorId: string;
    duration?: number; // seconds, for timeout
    reason?: string;
  };
}

export type ChatEvent =
  | ChatMessageEvent
  | ChatReactionEvent
  | ChatDeleteEvent
  | ChatModerateEvent;
