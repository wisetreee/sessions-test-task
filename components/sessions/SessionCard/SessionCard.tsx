import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView/ThemedView";
import { SessionListItem } from "@/types";
import { calculateSeverity } from "@/utils";
import { sessionCardStyles as styles } from "./SessionCard.styles";

interface SessionCardProps {
  session: SessionListItem;
}

export function SessionCard({ session }: SessionCardProps) {
  const router = useRouter();
  const severity = calculateSeverity(session);
  const duration = session.durationMs
    ? `${Math.round(session.durationMs / 1000)}s`
    : "N/A";
  const stats = session.stats || {};
  const isCorrupted = session.flags?.corrupted || false;

  const handlePress = () => {
    router.push(`/session/${session.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <ThemedView style={styles.card}>
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.id}>
            {session.id}
          </ThemedText>
          {isCorrupted && (
            <View style={styles.corruptedBadge}>
              <Text style={styles.corruptedText}>Повреждена</Text>
            </View>
          )}
        </View>

        <View style={styles.infoRow}>
          <ThemedText style={styles.label}>Длительность:</ThemedText>
          <ThemedText>{duration}</ThemedText>
        </View>

        <View style={styles.infoRow}>
          <ThemedText style={styles.label}>Точка входа:</ThemedText>
          <ThemedText numberOfLines={1} style={styles.route}>
            {session.entryUrl || "N/A"}
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <ThemedText style={styles.label}>Последний путь:</ThemedText>
          <ThemedText numberOfLines={1} style={styles.route}>
            {session.lastRoute || "N/A"}
          </ThemedText>
        </View>

        <View style={styles.statsRow}>
          {stats.jsErrors !== undefined && stats.jsErrors > 0 && (
            <View style={styles.statBadge}>
              <Text style={styles.statText}>Ошибок JS: {stats.jsErrors}</Text>
            </View>
          )}
          {stats.failedRequests !== undefined && stats.failedRequests > 0 && (
            <View style={styles.statBadge}>
              <Text style={styles.statText}>
                Failed: {stats.failedRequests}
              </Text>
            </View>
          )}
          {stats.pendingRequests !== undefined && stats.pendingRequests > 0 && (
            <View style={styles.statBadge}>
              <Text style={styles.statText}>
                Pending: {stats.pendingRequests}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.severityRow}>
          <ThemedText style={styles.label}>Severity:</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.severity}>
            {severity.toFixed(2)}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
