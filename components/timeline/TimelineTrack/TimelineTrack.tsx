import React from "react";
import { Text, View } from "react-native";

import { Event, EventCategory } from "@/types";
import { TimelineEvent } from "../TimelineEvent/TimelineEvent";
import { timelineTrackStyles as styles } from "./TimelineTrack.styles";

interface TimelineTrackProps {
  category: EventCategory;
  events: Event[];
  onEventPress: (event: Event) => void;
  selectedEvent: Event | null;
}

const CATEGORY_COLORS: Record<EventCategory, string> = {
  Navigation: "#4CAF50",
  UI: "#2196F3",
  Network: "#FF9800",
  Errors: "#F44336",
  Performance: "#9C27B0",
  Unknown: "#9E9E9E",
};

export function TimelineTrack({
  category,
  events,
  onEventPress,
  selectedEvent,
}: TimelineTrackProps) {
  if (events.length === 0) {
    return null;
  }

  const color = CATEGORY_COLORS[category];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.categoryIndicator, { backgroundColor: color }]} />
        <Text style={styles.categoryName}>{category}</Text>
        <Text style={styles.count}>({events.length})</Text>
      </View>
      <View style={styles.events}>
        {events.map((event, index) => (
          <TimelineEvent
            key={event.eventId || `event-${index}`}
            event={event}
            onPress={onEventPress}
            isSelected={selectedEvent?.eventId === event.eventId}
          />
        ))}
      </View>
    </View>
  );
}
