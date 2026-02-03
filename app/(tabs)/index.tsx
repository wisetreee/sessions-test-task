import { useMemo, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { useSessionList } from "@/api";
import { SessionListItem } from "@/types";
import { calculateSeverity } from "@/utils";
import { useSessionListStore } from "@/stores";
import {
  SessionCard,
  SessionFilters,
  SessionSort,
} from "@/components/sessions";
import { ThemedText, ThemedView } from "@/components/ui";

function filterSessions(
  sessions: SessionListItem[],
  filters: ReturnType<typeof useSessionListStore>["filters"],
): SessionListItem[] {
  return sessions.filter((session) => {
    const stats = session.stats || {};

    if (filters.jsErrors && (stats.jsErrors || 0) === 0) return false;
    if (filters.failedRequests && (stats.failedRequests || 0) === 0)
      return false;
    if (filters.pendingRequests && (stats.pendingRequests || 0) === 0)
      return false;
    if (filters.rageClicks && (stats.rageClicks || 0) === 0) return false;
    if (filters.deadClicks && (stats.deadClicks || 0) === 0) return false;
    if (filters.corrupted && !session.flags?.corrupted) return false;

    if (filters.routeFilter) {
      const routeFilter = filters.routeFilter.toLowerCase();
      const entryUrl = (session.entryUrl || "").toLowerCase();
      const lastRoute = (session.lastRoute || "").toLowerCase();

      if (filters.routeFilterIsRegex) {
        try {
          const regex = new RegExp(routeFilter, "i");
          if (!regex.test(entryUrl) && !regex.test(lastRoute)) {
            return false;
          }
        } catch {
          return false;
        }
      } else {
        if (
          !entryUrl.includes(routeFilter) &&
          !lastRoute.includes(routeFilter)
        ) {
          return false;
        }
      }
    }

    return true;
  });
}

function sortSessions(
  sessions: SessionListItem[],
  sortField: "startedAt" | "severity",
  sortDirection: "asc" | "desc",
): SessionListItem[] {
  const sorted = [...sessions].sort((a, b) => {
    let comparison = 0;

    if (sortField === "startedAt") {
      const aTime = a.startedAt || 0;
      const bTime = b.startedAt || 0;
      comparison = aTime - bTime;
    } else if (sortField === "severity") {
      const aSeverity = calculateSeverity(a);
      const bSeverity = calculateSeverity(b);
      comparison = aSeverity - bSeverity;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return sorted;
}

export default function SessionListScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useSessionList(50);
  const {
    filters,
    sortField,
    sortDirection,
    scrollPosition,
    setScrollPosition,
  } = useSessionListStore();
  const scrollViewRef = useRef<FlatList>(null);

  const allSessions = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  const filteredSessions = useMemo(() => {
    return filterSessions(allSessions, filters);
  }, [allSessions, filters]);

  const sortedSessions = useMemo(() => {
    return sortSessions(filteredSessions, sortField, sortDirection);
  }, [filteredSessions, sortField, sortDirection]);

  useEffect(() => {
    if (scrollPosition > 0 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToOffset({
          offset: scrollPosition,
          animated: false,
        });
      }, 100);
    }
  }, []);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } };
  }) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading && !data) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Загрузка сессий...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        data={sortedSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionCard session={item} />}
        ListHeaderComponent={
          <View>
            <ThemedText type="title" style={styles.title}>
              Сессии
            </ThemedText>
            <SessionFilters />
            <SessionSort />
            <ThemedText style={styles.count}>
              Показано {sortedSessions.length} из {allSessions.length} сессий
            </ThemedText>
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.listContent}
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
  },
  loadingText: {
    marginTop: 16,
  },
  title: {
    padding: 16,
    paddingBottom: 8,
  },
  count: {
    padding: 16,
    paddingTop: 8,
    fontStyle: "italic",
  },
  listContent: {
    paddingBottom: 16,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
});
