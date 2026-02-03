import { StyleSheet } from "react-native";

export const sessionSortStyles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
  },
  title: {
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#0a7ea4",
    borderColor: "#0a7ea4",
  },
  buttonText: {
    fontSize: 14,
  },
  buttonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
