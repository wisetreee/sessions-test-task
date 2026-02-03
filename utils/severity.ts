import { SessionListItem } from "@/types";

export function calculateSeverity(session: SessionListItem): number {
  if (!session || typeof session !== "object") {
    return 0;
  }

  const stats =
    session.stats && typeof session.stats === "object" ? session.stats : {};
  const flags =
    session.flags && typeof session.flags === "object" ? session.flags : {};

  const jsErrors =
    typeof stats.jsErrors === "number" ? Math.max(0, stats.jsErrors) : 0;
  const consoleErrors =
    typeof stats.consoleErrors === "number"
      ? Math.max(0, stats.consoleErrors)
      : 0;
  const failedRequests =
    typeof stats.failedRequests === "number"
      ? Math.max(0, stats.failedRequests)
      : 0;
  const pendingRequests =
    typeof stats.pendingRequests === "number"
      ? Math.max(0, stats.pendingRequests)
      : 0;
  const rageClicks =
    typeof stats.rageClicks === "number" ? Math.max(0, stats.rageClicks) : 0;
  const deadClicks =
    typeof stats.deadClicks === "number" ? Math.max(0, stats.deadClicks) : 0;

  const errorScore =
    Math.log(jsErrors + 1) * 10 + Math.log(consoleErrors + 1) * 5;
  const requestScore =
    Math.log(failedRequests + 1) * 8 + Math.log(pendingRequests + 1) * 6;
  const clickScore =
    Math.log(rageClicks + 1) * 3 + Math.log(deadClicks + 1) * 2;
  const corruptionPenalty = flags.corrupted === true ? 50 : 0;

  return errorScore + requestScore + clickScore + corruptionPenalty;
}
