import { StyleSheet } from "react-native";
import { fontFamily } from "../../styles/theme";

export const s = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
