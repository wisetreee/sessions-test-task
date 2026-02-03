import { StyleSheet } from "react-native";

export const sessionFiltersStyles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
  },
  title: {
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  routeFilter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    color: "#000",
  },
});
