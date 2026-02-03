import { SessionDetails } from "@/types";

export interface SimilarSession {
  session: SessionDetails;
  similarity: number;
}

function longestCommonSubsequence(seq1: string[], seq2: string[]): number {
  const m = seq1.length;
  const n = seq2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (seq1[i - 1] === seq2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

export function getEventTypeSequence(session: SessionDetails): string[] {
  if (!session.events || !Array.isArray(session.events)) {
    return [];
  }
  return session.events
    .filter((event) => event && typeof event === "object")
    .map((event) =>
      event.type && typeof event.type === "string" ? event.type : "unknown",
    )
    .filter((type) => type !== "unknown");
}

export function calculateSimilarity(
  session1: SessionDetails,
  session2: SessionDetails,
): number {
  const seq1 = getEventTypeSequence(session1);
  const seq2 = getEventTypeSequence(session2);

  if (seq1.length === 0 && seq2.length === 0) {
    return 1.0;
  }
  if (seq1.length === 0 || seq2.length === 0) {
    return 0.0;
  }

  const lcsLength = longestCommonSubsequence(seq1, seq2);
  const similarity = (2 * lcsLength) / (seq1.length + seq2.length);

  return similarity;
}

export function findSimilarSessions(
  targetSession: SessionDetails,
  allSessions: SessionDetails[],
  limit: number = 10,
): SimilarSession[] {
  const similarities: SimilarSession[] = [];

  for (const session of allSessions) {
    if (session.id === targetSession.id) {
      continue;
    }

    const similarity = calculateSimilarity(targetSession, session);
    similarities.push({ session, similarity });
  }

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}
