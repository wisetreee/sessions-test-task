import { StyleSheet } from "react-native";

export const timelineViewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  categoryButtonActive: {
    backgroundColor: "#0a7ea4",
    borderColor: "#0a7ea4",
  },
  categoryButtonText: {
    fontSize: 12,
  },
  categoryButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  navButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#2196F3",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  timeline: {
    flex: 1,
    padding: 16,
  },
});
