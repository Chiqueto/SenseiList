import { StyleSheet } from "react-native";
import { colors, fontFamily } from "../../styles/theme"; // Supondo que você tenha um arquivo de tema

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  backButton: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  animeDetails: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: fontFamily.poppins_bold,
    fontSize: 24,
    color: colors.textPrimary,
    textAlign: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginLeft: 10,
  },
  animeRating: {
    textAlign: "center",
    fontSize: 20,
    color: "#FFA500",
    fontFamily: fontFamily.poppins_bold,
    marginBottom: 8,
  },
  animeRatingView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  subitle: {
    fontFamily: fontFamily.poppins_medium,
    fontSize: 20,
    color: colors.textPrimary,
    lineHeight: 24,
    marginBottom: 8,
  },
  score: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: colors.primary,
    textAlign: "center",
    backgroundColor: colors.lightPrimary,
    paddingVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  genreTag: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.textPrimary,
  },
  horizontalGenreList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    gap: 8,
  },

  genreList: {
    width: "100%",
    minHeight: 50,
  },
  detail: {
    marginVertical: 10,
  },
  scrollContainer: {
    width: "100%",
  },
  characterLoadingContainer: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
  },
  characterLoadingCard: {
    width: 120,
  },
  characterLoadingImage: {
    width: 120,
    height: 150,
    backgroundColor: colors.skeleton,
    borderRadius: 8,
    marginBottom: 8,
  },
  characterLoadingText: {
    height: 12,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 6,
    width: "80%",
  },
  charactersList: {
    paddingVertical: 10,
    gap: 15,
  },
  noCharactersText: {
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    textAlign: "center",
    marginVertical: 10,
  },

  backButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
});
