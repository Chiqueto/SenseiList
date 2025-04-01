import { StyleSheet } from "react-native";
import { colors, fontFamily } from "../../styles/theme";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    width: "100%",
    backgroundColor: "#1D1D1D",
  },
  logoView: {
    marginBottom: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: fontFamily.fredoka_bold,
    marginBottom: 5,
  },
  title: {
    color: "#FFF",
    fontSize: 40,
    fontFamily: fontFamily.poppins_medium,
    marginBottom: 5,
  },
  subTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: fontFamily.poppins_light,
    marginBottom: 12,
    textAlign: "center",
  },
  base: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: fontFamily.poppins_regular,
  },
  line: {
    width: "40%",
    height: 2,
    backgroundColor: "#fff",
    borderRadius: 40,
    borderColor: "#fff",
    borderWidth: 1,
  },
  lineView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
    marginHorizontal: 20,
  },
  inputArea: {
    width: "90%",
    paddingVertical: 8,
    textAlign: "left",
  },
  inputCombo: {
    marginBottom: 10,
  },
  textButton: {
    color: colors.white,
    textDecorationLine: "underline",
    fontSize: 16,
    fontFamily: fontFamily.poppins_light_italic,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonView: {
    flexDirection: "row",
  },
});
