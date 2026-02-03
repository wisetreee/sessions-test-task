import React from "react";
import { TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView/ThemedView";
import { SortField, useSessionListStore } from "@/stores";
import { sessionSortStyles as styles } from "./SessionSort.styles";

export function SessionSort() {
  const { sortField, sortDirection, setSort } = useSessionListStore();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSort(field, sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSort(field, "desc");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Сортировать по
      </ThemedText>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.button,
            sortField === "startedAt" && styles.buttonActive,
          ]}
          onPress={() => handleSort("startedAt")}
        >
          <ThemedText
            style={[
              styles.buttonText,
              sortField === "startedAt" && styles.buttonTextActive,
            ]}
          >
            Времени{" "}
            {sortField === "startedAt" && (sortDirection === "asc" ? "↑" : "↓")}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            sortField === "severity" && styles.buttonActive,
          ]}
          onPress={() => handleSort("severity")}
        >
          <ThemedText
            style={[
              styles.buttonText,
              sortField === "severity" && styles.buttonTextActive,
            ]}
          >
            Severity{" "}
            {sortField === "severity" && (sortDirection === "asc" ? "↑" : "↓")}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
