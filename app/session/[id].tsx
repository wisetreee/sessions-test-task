import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useSessionDetails } from "@/api";
import { normalizeNetworkEvents } from "@/utils";
import { useSessionDetailStore } from "@/stores";
import { TimelineView, EventDetailPanel } from "@/components/timeline";
import { SimilarSessionsView } from "@/components/clustering";
import { ThemedView, ThemedText } from "@/components/ui";

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: session, isLoading, error } = useSessionDetails(id || "");
  const {
    selectedEvent,
    setSelectedEvent,
    scrollPosition,
    setScrollPosition,
    reset,
  } = useSessionDetailStore();
  const scrollViewRef = useRef<ScrollView>(null);
  const isRestoringScroll = useRef(false);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (
      scrollPosition > 0 &&
      scrollViewRef.current &&
      session &&
      !isRestoringScroll.current
    ) {
      isRestoringScroll.current = true;
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: scrollPosition,
          animated: false,
        });
      }, 100);
    }
  }, [session]);

  if (isLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Загрузка сессии...</ThemedText>
      </ThemedView>
    );
  }

  if (error || !session) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText type="title" style={styles.errorText}>
          Ошибка загрузки сессии
        </ThemedText>
        <ThemedText>{error?.message || "Сессия не найдена"}</ThemedText>
      </ThemedView>
    );
  }

  const events = session.events || [];
  const { normalized } = normalizeNetworkEvents(events);

  const handleEventPress = (event: typeof selectedEvent) => {
    setSelectedEvent(event);
  };

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } };
  }) => {
    // Сохраняем позицию только если не восстанавливаем
    if (isRestoringScroll.current) {
      isRestoringScroll.current = false;
      return;
    }
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {session.id}
          </ThemedText>
          {session.startedAt && (
            <ThemedText style={styles.timestamp}>
              Начато: {new Date(session.startedAt).toLocaleString()}
            </ThemedText>
          )}
          {session.endedAt && session.startedAt && (
            <ThemedText style={styles.timestamp}>
              Длительность:{" "}
              {Math.round((session.endedAt - session.startedAt) / 1000)}s
            </ThemedText>
          )}
        </View>

        <TimelineView
          events={normalized.map((n) => n.event)}
          onEventPress={handleEventPress}
          selectedEvent={selectedEvent}
        />

        <SimilarSessionsView currentSession={session} />
      </ScrollView>

      <EventDetailPanel
        event={selectedEvent}
        visible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
  },
  errorText: {
    marginBottom: 8,
    color: "#F44336",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
