import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { getEventCategory } from "@/constants";
import { Event, EventCategory } from "@/types";
import { timelineEventStyles as styles } from "./TimelineEvent.styles";

interface TimelineEventProps {
  event: Event;
  onPress: (event: Event) => void;
  isSelected: boolean;
}

const CATEGORY_COLORS: Record<EventCategory, string> = {
  Navigation: "#4CAF50",
  UI: "#2196F3",
  Network: "#FF9800",
  Errors: "#F44336",
  Performance: "#9C27B0",
  Unknown: "#9E9E9E",
};

export function TimelineEvent({
  event,
  onPress,
  isSelected,
}: TimelineEventProps) {
  const category = getEventCategory(event.type || "unknown");
  const color = CATEGORY_COLORS[category];
  const eventType = event.type || "unknown";

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={() => onPress(event)}
      activeOpacity={0.7}
    >
      <View style={[styles.indicator, { backgroundColor: color }]} />
      <View style={styles.content}>
        <Text style={styles.type} numberOfLines={1}>
          {eventType}
        </Text>
        {event.ts && (
          <Text style={styles.timestamp}>
            {new Date(event.ts).toLocaleTimeString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
