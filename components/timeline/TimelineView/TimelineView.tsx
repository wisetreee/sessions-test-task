import { ThemedText } from "@/components/ui/ThemedText/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView/ThemedView";
import { getEventCategory } from "@/constants";
import { useSessionDetailStore } from "@/stores";
import { Event, EventCategory } from "@/types";
import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { TimelineTrack } from "../TimelineTrack/TimelineTrack";
import { timelineViewStyles as styles } from "./TimelineView.styles";

interface TimelineViewProps {
  events: Event[];
  onEventPress: (event: Event) => void;
  selectedEvent: Event | null;
}

const CATEGORIES: EventCategory[] = [
  "Navigation",
  "UI",
  "Network",
  "Errors",
  "Performance",
  "Unknown",
];

export function TimelineView({
  events,
  onEventPress,
  selectedEvent,
}: TimelineViewProps) {
  const { enabledCategories, toggleCategory } = useSessionDetailStore();

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aTs = a.ts || 0;
      const bTs = b.ts || 0;
      if (aTs !== bTs) {
        return aTs - bTs;
      }
      const aId = a.eventId || "";
      const bId = b.eventId || "";
      return aId.localeCompare(bId);
    });
  }, [events]);

  const eventsByCategory = useMemo(() => {
    const grouped: Partial<Record<EventCategory, Event[]>> = {};

    for (const event of sortedEvents) {
      const category = getEventCategory(event.type || "unknown");
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category]!.push(event);
    }

    return grouped;
  }, [sortedEvents]);

  const visibleEvents = useMemo(() => {
    const visible: Partial<Record<EventCategory, Event[]>> = {};
    for (const category of CATEGORIES) {
      if (enabledCategories.has(category)) {
        visible[category] = eventsByCategory[category] || [];
      }
    }
    return visible;
  }, [eventsByCategory, enabledCategories]);

  const findNextEvent = (
    predicate: (event: Event) => boolean,
    startIndex: number = 0,
  ): Event | null => {
    const allVisible = Object.values(visibleEvents).flat();
    for (let i = startIndex; i < allVisible.length; i++) {
      if (predicate(allVisible[i]!)) {
        return allVisible[i]!;
      }
    }
    return null;
  };

  const handleNextError = () => {
    const currentIndex = selectedEvent
      ? sortedEvents.findIndex((e) => e.eventId === selectedEvent.eventId)
      : -1;
    const nextError = findNextEvent((e) => {
      const category = getEventCategory(e.type || "unknown");
      return category === "Errors";
    }, currentIndex + 1);
    if (nextError) {
      onEventPress(nextError);
    }
  };

  const handleNextFailedRequest = () => {
    const currentIndex = selectedEvent
      ? sortedEvents.findIndex((e) => e.eventId === selectedEvent.eventId)
      : -1;
    const nextFailed = findNextEvent((e) => {
      return !!(
        e.type === "net.response" &&
        e.data &&
        typeof e.data === "object" &&
        "status" in e.data &&
        typeof e.data.status === "number" &&
        e.data.status >= 400
      );
    }, currentIndex + 1);
    if (nextFailed) {
      onEventPress(nextFailed);
    }
  };

  const handleNextPendingRequest = () => {
    const currentIndex = selectedEvent
      ? sortedEvents.findIndex((e) => e.eventId === selectedEvent.eventId)
      : -1;
    const nextPending = findNextEvent((e) => {
      return !!(e.type === "net.request" && !e.data?.requestId);
    }, currentIndex + 1);
    if (nextPending) {
      onEventPress(nextPending);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.controls}>
        <ThemedText type="subtitle" style={styles.title}>
          Категории
        </ThemedText>
        <View style={styles.categoryButtons}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                enabledCategories.has(category) && styles.categoryButtonActive,
              ]}
              onPress={() => toggleCategory(category)}
            >
              <ThemedText
                style={[
                  styles.categoryButtonText,
                  enabledCategories.has(category) &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedText type="subtitle" style={styles.title}>
          Навигация
        </ThemedText>
        <View style={styles.navButtons}>
          <TouchableOpacity style={styles.navButton} onPress={handleNextError}>
            <ThemedText style={styles.navButtonText}>Next Error</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNextFailedRequest}
          >
            <ThemedText style={styles.navButtonText}>
              Next Failed Request
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNextPendingRequest}
          >
            <ThemedText style={styles.navButtonText}>
              Next Pending Request
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.timeline}>
        {CATEGORIES.map((category) => {
          const categoryEvents = visibleEvents[category] || [];
          if (categoryEvents.length === 0) {
            return null;
          }
          return (
            <TimelineTrack
              key={category}
              category={category}
              events={categoryEvents}
              onEventPress={onEventPress}
              selectedEvent={selectedEvent}
            />
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}
