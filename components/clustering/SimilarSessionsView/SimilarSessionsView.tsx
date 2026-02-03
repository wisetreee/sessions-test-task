import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useSessionList } from "@/api";
import { ThemedText } from "@/components/ui/ThemedText/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView/ThemedView";
import { SessionDetails } from "@/types";
import { findSimilarSessions } from "@/utils";
import { SessionDiff } from "../SessionDiff/SessionDiff";
import { similarSessionsViewStyles as styles } from "./SimilarSessionsView.styles";

interface SimilarSessionsViewProps {
  currentSession: SessionDetails;
}

export function SimilarSessionsView({
  currentSession,
}: SimilarSessionsViewProps) {
  const { data: listData } = useSessionList(1000);
  const [selectedSimilar, setSelectedSimilar] = useState<SessionDetails | null>(
    null,
  );

  const allSessions = useMemo(() => {
    return listData?.pages.flatMap((page) => page.items) || [];
  }, [listData]);

  const sessionDetails = useMemo(() => {
    const details: SessionDetails[] = [currentSession];
    for (const item of allSessions) {
      if (item.id !== currentSession.id) {
        details.push({
          id: item.id,
          startedAt: item.startedAt,
          endedAt: item.startedAt
            ? item.startedAt + (item.durationMs || 0)
            : undefined,
          events: [],
        });
      }
    }
    return details;
  }, [allSessions, currentSession]);

  const similarSessions = useMemo(() => {
    if (sessionDetails.length === 0) {
      return [];
    }
    return findSimilarSessions(currentSession, sessionDetails, 5);
  }, [currentSession, sessionDetails]);

  if (similarSessions.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          Похожие сессии
        </ThemedText>
        <ThemedText style={styles.emptyText}>
          Похожих сессий не найдено
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Похожие сессии
      </ThemedText>

      {similarSessions.map((similar) => (
        <TouchableOpacity
          key={similar.session.id}
          style={styles.sessionItem}
          onPress={() =>
            setSelectedSimilar(
              selectedSimilar?.id === similar.session.id
                ? null
                : similar.session,
            )
          }
        >
          <View style={styles.sessionHeader}>
            <ThemedText style={styles.sessionId}>
              {similar.session.id}
            </ThemedText>
            <ThemedText style={styles.similarity}>
              Похожа на {(similar.similarity * 100).toFixed(1)}%
            </ThemedText>
          </View>
        </TouchableOpacity>
      ))}

      {selectedSimilar && (
        <View style={styles.diffContainer}>
          <SessionDiff sessionA={currentSession} sessionB={selectedSimilar} />
        </View>
      )}
    </ThemedView>
  );
}
