import { StyleSheet } from "react-native";
import { fontFamily } from "../../styles/theme";

export const s = StyleSheet.create({
  input: {
    width: "100%",
    paddingVertical: 9,
    textAlign: "left",
    fontSize: 16,
    fontFamily: fontFamily.poppins_regular,
    color: "#000",
    backgroundColor: "#DCCBFD",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
});
