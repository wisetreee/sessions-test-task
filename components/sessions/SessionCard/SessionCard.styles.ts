import { StyleSheet } from "react-native";

export const sessionCardStyles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  id: {
    fontSize: 16,
    flex: 1,
  },
  corruptedBadge: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  corruptedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    marginRight: 8,
    minWidth: 80,
  },
  route: {
    flex: 1,
    flexShrink: 1,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  statBadge: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  severityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  severity: {
    fontSize: 16,
    color: "#0a7ea4",
  },
});
