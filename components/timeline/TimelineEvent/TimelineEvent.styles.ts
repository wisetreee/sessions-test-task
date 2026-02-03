import { StyleSheet } from "react-native";

export const timelineEventStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
  selected: {
    backgroundColor: "#e3f2fd",
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  indicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  type: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
});
