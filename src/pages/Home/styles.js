import { StyleSheet } from "react-native";
import { fontFamily, colors } from "../../styles/theme";

export const s = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    // padding: 100,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginHorizontal: 10,
    marginTop: 50,
    gap: 8,
  },
  filterButton: {
    backgroundColor: colors.purple_main,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // height: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});
