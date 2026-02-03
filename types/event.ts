export type EventCategory =
  | "Navigation"
  | "UI"
  | "Network"
  | "Errors"
  | "Performance"
  | "Unknown";

export interface Event {
  eventId?: string;
  ts?: number;
  type?: string;
  data?: Record<string, unknown>;
  requestId?: string;
}

export interface NetworkRequestEvent extends Event {
  type: "net.request";
  data?: {
    url?: string;
    method?: string;
    requestId?: string;
  };
}

export interface NetworkResponseEvent extends Event {
  type: "net.response" | "net.error" | "net.abort";
  data?: {
    requestId?: string;
    status?: number;
    url?: string;
  };
}
