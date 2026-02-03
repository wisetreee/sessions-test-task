import { StyleSheet } from "react-native";

export const timelineTrackStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  categoryIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  count: {
    fontSize: 12,
    color: "#666",
  },
  events: {
    paddingLeft: 8,
  },
});
