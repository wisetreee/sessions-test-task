import { EventCategory } from "@/types";

export const EVENT_CATEGORY_PATTERNS: Record<EventCategory, string[]> = {
  Navigation: ["nav."],
  UI: ["ui."],
  Network: ["net."],
  Errors: ["error.", "console."],
  Performance: ["perf."],
  Unknown: [],
};

export function getEventCategory(eventType: string): EventCategory {
  const lowerType = eventType.toLowerCase();

  for (const [category, patterns] of Object.entries(EVENT_CATEGORY_PATTERNS)) {
    if (category === "Unknown") continue;
    if (patterns.some((pattern) => lowerType.startsWith(pattern))) {
      return category as EventCategory;
    }
  }

  return "Unknown";
}
