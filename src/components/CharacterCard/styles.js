import { colors, fontFamily } from "../../styles/theme";
import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  role: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
    opacity: 0.8,
  },
});
