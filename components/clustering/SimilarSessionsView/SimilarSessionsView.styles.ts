import { StyleSheet } from "react-native";

export const similarSessionsViewStyles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  title: {
    marginBottom: 12,
  },
  emptyText: {
    fontStyle: "italic",
    color: "#666",
  },
  sessionItem: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionId: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  similarity: {
    fontSize: 12,
    color: "#0a7ea4",
    fontWeight: "600",
  },
  diffContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
});
