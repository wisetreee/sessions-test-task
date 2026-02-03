import { ScrollView, Text, View } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView/ThemedView";
import { SessionDetails } from "@/types";
import { computeDiff, DiffItem } from "@/utils";

import { sessionDiffStyles as styles } from "./SessionDiff.styles";

interface SessionDiffProps {
  sessionA: SessionDetails;
  sessionB: SessionDetails;
}

export function SessionDiff({ sessionA, sessionB }: SessionDiffProps) {
  const diff = computeDiff(sessionA, sessionB);

  const renderDiffItem = (item: DiffItem, index: number) => {
    const key = `${item.operation}-${index}`;

    switch (item.operation) {
      case "equal":
        return (
          <View key={key} style={styles.diffRow}>
            <View style={[styles.diffCell, styles.equalCell]}>
              <Text style={styles.equalText}>{item.value}</Text>
            </View>
            <View style={[styles.diffCell, styles.equalCell]}>
              <Text style={styles.equalText}>{item.value}</Text>
            </View>
          </View>
        );
      case "delete":
        return (
          <View key={key} style={styles.diffRow}>
            <View style={[styles.diffCell, styles.deleteCell]}>
              <Text style={styles.deleteText}>{item.value}</Text>
            </View>
            <View style={[styles.diffCell, styles.emptyCell]} />
          </View>
        );
      case "insert":
        return (
          <View key={key} style={styles.diffRow}>
            <View style={[styles.diffCell, styles.emptyCell]} />
            <View style={[styles.diffCell, styles.insertCell]}>
              <Text style={styles.insertText}>{item.value}</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Event Sequence Diff
      </ThemedText>

      <View style={styles.header}>
        <View style={styles.headerCell}>
          <ThemedText style={styles.headerText}>Сессия A</ThemedText>
          <ThemedText style={styles.sessionId}>{sessionA.id}</ThemedText>
        </View>
        <View style={styles.headerCell}>
          <ThemedText style={styles.headerText}>Сессия B</ThemedText>
          <ThemedText style={styles.sessionId}>{sessionB.id}</ThemedText>
        </View>
      </View>

      <ScrollView style={styles.diffContent} nestedScrollEnabled>
        {diff.map((item, index) => renderDiffItem(item, index))}
      </ScrollView>
    </ThemedView>
  );
}
