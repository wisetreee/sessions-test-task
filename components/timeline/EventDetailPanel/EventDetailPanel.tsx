import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Collapsible } from "@/components/ui/Collapsible/Collapsible";
import { ThemedText } from "@/components/ui/ThemedText/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView/ThemedView";
import { Event } from "@/types";
import { eventDetailPanelStyles as styles } from "./EventDetailPanel.styles";

interface EventDetailPanelProps {
  event: Event | null;
  visible: boolean;
  onClose: () => void;
}

export function EventDetailPanel({
  event,
  visible,
  onClose,
}: EventDetailPanelProps) {
  if (!event) {
    return null;
  }

  const jsonString = JSON.stringify(event, null, 2);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Event Details</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Event ID
            </ThemedText>
            <ThemedText style={styles.value}>
              {event.eventId || "N/A"}
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Type
            </ThemedText>
            <ThemedText style={styles.value}>{event.type || "N/A"}</ThemedText>
          </View>

          {event.ts && (
            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Timestamp
              </ThemedText>
              <ThemedText style={styles.value}>
                {new Date(event.ts).toLocaleString()}
              </ThemedText>
            </View>
          )}

          {event.requestId && (
            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Request ID
              </ThemedText>
              <ThemedText style={styles.value}>{event.requestId}</ThemedText>
            </View>
          )}

          {event.data && Object.keys(event.data).length > 0 && (
            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Data
              </ThemedText>
              {Object.entries(event.data).map(([key, value]) => (
                <View key={key} style={styles.dataRow}>
                  <ThemedText style={styles.dataKey}>{key}:</ThemedText>
                  <ThemedText style={styles.dataValue}>
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2)
                      : String(value)}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}

          <Collapsible title="Raw JSON">
            <ScrollView style={styles.jsonContainer} nestedScrollEnabled>
              <Text style={styles.jsonText}>{jsonString}</Text>
            </ScrollView>
          </Collapsible>
        </ScrollView>
      </ThemedView>
    </Modal>
  );
}
