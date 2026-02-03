import { StyleSheet } from "react-native";

export const eventDetailPanelStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#0a7ea4",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  dataRow: {
    flexDirection: "row",
    marginVertical: 4,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  dataKey: {
    fontWeight: "600",
    marginRight: 8,
    minWidth: 100,
  },
  dataValue: {
    flex: 1,
  },
  jsonContainer: {
    maxHeight: 400,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    padding: 8,
  },
  jsonText: {
    fontFamily: "monospace",
    fontSize: 12,
  },
});
