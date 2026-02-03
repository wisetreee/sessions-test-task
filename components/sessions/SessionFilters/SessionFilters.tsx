import React from "react";
import { Switch, TextInput, View } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView/ThemedView";
import { useSessionListStore } from "@/stores";
import { sessionFiltersStyles as styles } from "./SessionFilters.styles";

export function SessionFilters() {
  const { filters, setFilters } = useSessionListStore();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Фильтры
      </ThemedText>

      <View style={styles.filterRow}>
        <ThemedText>Ошибок JS &gt; 0</ThemedText>
        <Switch
          value={filters.jsErrors}
          onValueChange={(value) => setFilters({ jsErrors: value })}
        />
      </View>

      <View style={styles.filterRow}>
        <ThemedText>Неудачных запросов &gt; 0</ThemedText>
        <Switch
          value={filters.failedRequests}
          onValueChange={(value) => setFilters({ failedRequests: value })}
        />
      </View>

      <View style={styles.filterRow}>
        <ThemedText>Обрабатываемых запросов &gt; 0</ThemedText>
        <Switch
          value={filters.pendingRequests}
          onValueChange={(value) => setFilters({ pendingRequests: value })}
        />
      </View>

      <View style={styles.filterRow}>
        <ThemedText>Кликов ярости &gt; 0</ThemedText>
        <Switch
          value={filters.rageClicks}
          onValueChange={(value) => setFilters({ rageClicks: value })}
        />
      </View>

      <View style={styles.filterRow}>
        <ThemedText>Мертвых кликов &gt; 0</ThemedText>
        <Switch
          value={filters.deadClicks}
          onValueChange={(value) => setFilters({ deadClicks: value })}
        />
      </View>

      <View style={styles.filterRow}>
        <ThemedText>Повреждено</ThemedText>
        <Switch
          value={filters.corrupted}
          onValueChange={(value) => setFilters({ corrupted: value })}
        />
      </View>

      <View style={styles.routeFilter}>
        <ThemedText style={styles.label}>Фильтр по маршрутам:</ThemedText>
        <TextInput
          style={styles.input}
          value={filters.routeFilter}
          onChangeText={(text) => setFilters({ routeFilter: text })}
          placeholder="Введите URL или regex"
          placeholderTextColor="#999"
        />
        <View style={styles.filterRow}>
          <ThemedText>Использовать Regex</ThemedText>
          <Switch
            value={filters.routeFilterIsRegex}
            onValueChange={(value) => setFilters({ routeFilterIsRegex: value })}
          />
        </View>
      </View>
    </ThemedView>
  );
}
