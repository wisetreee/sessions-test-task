import { Event, NetworkRequestEvent, NetworkResponseEvent } from "@/types";

export interface NormalizedNetworkEvent {
  event: Event;
  status: "complete" | "pending" | "orphaned-request" | "orphaned-response";
  matchedRequestId?: string;
}

export function normalizeNetworkEvents(events: Event[]): {
  normalized: NormalizedNetworkEvent[];
  requests: Map<string, NetworkRequestEvent>;
  responses: Map<string, NetworkResponseEvent>;
} {
  const requests = new Map<string, NetworkRequestEvent>();
  const responses = new Map<string, NetworkResponseEvent>();
  const normalized: NormalizedNetworkEvent[] = [];

  for (const event of events) {
    if (event.type === "net.request") {
      const requestEvent = event as NetworkRequestEvent;
      const requestId = requestEvent.data?.requestId || requestEvent.requestId;
      if (requestId) {
        requests.set(requestId, requestEvent);
      }
    } else if (
      event.type === "net.response" ||
      event.type === "net.error" ||
      event.type === "net.abort"
    ) {
      const responseEvent = event as NetworkResponseEvent;
      const requestId =
        responseEvent.data?.requestId || responseEvent.requestId;
      if (requestId) {
        responses.set(requestId, responseEvent);
      }
    }
  }

  for (const event of events) {
    if (!event || typeof event !== "object") {
      normalized.push({
        event: { type: "unknown" },
        status: "complete",
      });
      continue;
    }

    if (event.type === "net.request") {
      const requestEvent = event as NetworkRequestEvent;
      const requestId = requestEvent.data?.requestId || requestEvent.requestId;
      if (
        requestId &&
        typeof requestId === "string" &&
        responses.has(requestId)
      ) {
        normalized.push({
          event: requestEvent,
          status: "complete",
          matchedRequestId: requestId,
        });
      } else if (requestId && typeof requestId === "string") {
        normalized.push({
          event: requestEvent,
          status: "pending",
          matchedRequestId: requestId,
        });
      } else {
        normalized.push({
          event: requestEvent,
          status: "orphaned-request",
        });
      }
    } else if (
      event.type === "net.response" ||
      event.type === "net.error" ||
      event.type === "net.abort"
    ) {
      const responseEvent = event as NetworkResponseEvent;
      const requestId =
        responseEvent.data?.requestId || responseEvent.requestId;
      if (
        requestId &&
        typeof requestId === "string" &&
        requests.has(requestId)
      ) {
        normalized.push({
          event: responseEvent,
          status: "complete",
          matchedRequestId: requestId,
        });
      } else {
        normalized.push({
          event: responseEvent,
          status: "orphaned-response",
          matchedRequestId:
            requestId && typeof requestId === "string" ? requestId : undefined,
        });
      }
    } else {
      normalized.push({
        event,
        status: "complete",
      });
    }
  }

  return { normalized, requests, responses };
}

export function safeParseNumber(
  value: unknown,
  defaultValue: number = 0,
): number {
  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
}

export function safeParseString(
  value: unknown,
  defaultValue: string = "",
): string {
  if (typeof value === "string") {
    return value;
  }
  if (value == null) {
    return defaultValue;
  }
  return String(value);
}

export function isValidTimestamp(ts: unknown): ts is number {
  return (
    typeof ts === "number" &&
    !isNaN(ts) &&
    ts > 0 &&
    ts < Number.MAX_SAFE_INTEGER
  );
}
