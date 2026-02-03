import { StyleSheet } from "react-native";

export const sessionDiffStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
  },
  headerCell: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  sessionId: {
    fontSize: 10,
    color: "#666",
  },
  diffContent: {
    maxHeight: 400,
  },
  diffRow: {
    flexDirection: "row",
    marginVertical: 2,
  },
  diffCell: {
    flex: 1,
    padding: 8,
    marginHorizontal: 2,
    borderRadius: 4,
    minHeight: 32,
    justifyContent: "center",
  },
  equalCell: {
    backgroundColor: "#e8f5e9",
  },
  deleteCell: {
    backgroundColor: "#ffebee",
  },
  insertCell: {
    backgroundColor: "#e3f2fd",
  },
  emptyCell: {
    backgroundColor: "#f5f5f5",
  },
  equalText: {
    fontSize: 12,
    color: "#2e7d32",
    fontWeight: "500",
  },
  deleteText: {
    fontSize: 12,
    color: "#c62828",
    fontWeight: "500",
  },
  insertText: {
    fontSize: 12,
    color: "#1565c0",
    fontWeight: "500",
  },
});
