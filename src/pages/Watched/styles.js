import { StyleSheet } from "react-native";
import { fontFamily, colors } from "../../styles/theme";

export const s = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  header: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fontFamily.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: fontFamily.bold,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtext: {
    color: "#DDD",
    fontSize: 14,
    fontFamily: fontFamily.regular,
    textAlign: "center",
  },
});
