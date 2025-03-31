import { StyleSheet } from "react-native";
import { fontFamily } from "../../styles/theme";

export const s = StyleSheet.create({
  button: {
    paddingVertical: 8,
    backgroundColor: "#B06AE5",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  textButton: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: fontFamily.poppins_medium,
    textAlign: "center",
  },
});
