import type { GiftEvent } from "../domain/gift";

export type StreamEventType =
  | "stream_start"
  | "stream_end"
  | "viewer_count_update"
  | "gift_received"
  | "new_subscriber"
  | "new_follower";

export interface StreamStartEvent {
  type: "stream_start";
  payload: {
    streamId: string;
    creatorId: string;
    title: string;
    categoryId: string;
  };
}

export interface StreamEndEvent {
  type: "stream_end";
  payload: {
    streamId: string;
    duration: number;
    peakViewers: number;
  };
}

export interface ViewerCountEvent {
  type: "viewer_count_update";
  payload: {
    streamId: string;
    count: number;
  };
}

export interface GiftReceivedEvent {
  type: "gift_received";
  payload: GiftEvent;
}

export interface NewSubscriberEvent {
  type: "new_subscriber";
  payload: {
    streamId: string;
    subscriberId: string;
    subscriberName: string;
    tier: string;
  };
}

export type StreamEvent =
  | StreamStartEvent
  | StreamEndEvent
  | ViewerCountEvent
  | GiftReceivedEvent
  | NewSubscriberEvent;
