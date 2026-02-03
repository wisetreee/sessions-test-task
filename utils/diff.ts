import { SessionDetails } from "@/types";
import { getEventTypeSequence } from "./clustering";

export type DiffOperation = "equal" | "delete" | "insert";

export interface DiffItem {
  operation: DiffOperation;
  value: string;
  indexA?: number;
  indexB?: number;
}

export function computeDiff(
  sessionA: SessionDetails,
  sessionB: SessionDetails,
): DiffItem[] {
  const seqA = getEventTypeSequence(sessionA);
  const seqB = getEventTypeSequence(sessionB);

  const diff: DiffItem[] = [];
  const m = seqA.length;
  const n = seqB.length;

  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (seqA[i - 1] === seqB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = m;
  let j = n;
  let indexA = m - 1;
  let indexB = n - 1;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && seqA[i - 1] === seqB[j - 1]) {
      diff.unshift({
        operation: "equal",
        value: seqA[i - 1],
        indexA,
        indexB,
      });
      i--;
      j--;
      indexA--;
      indexB--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({
        operation: "insert",
        value: seqB[j - 1],
        indexB,
      });
      j--;
      indexB--;
    } else if (i > 0) {
      diff.unshift({
        operation: "delete",
        value: seqA[i - 1],
        indexA,
      });
      i--;
      indexA--;
    }
  }

  return diff;
}
