import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const AnimeList = ({
  animes = [],
  onEndReached,
  ListFooterComponent,
  onEndReachedThreshold = 0.4,
  watchedAnimes = [],
  onAddToWatched,
  onRemoveFromWatched,
  isAnimeWatched = (animeId) =>
    watchedAnimes.some((anime) => anime.mal_id === animeId),
  isWatchedPage = false,
  navigation,
}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.animeCard}
      onPress={() => navigation.navigate("Anime", { id: item.mal_id })}
    >
      <View style={styles.animeInfo}>
        <Text style={styles.animeTitle}>{item.title}</Text>
        <Text style={styles.animeRating}>{item.score || "N/A"}</Text>

        {isWatchedPage ? (
          <TouchableOpacity
            onPress={() => onRemoveFromWatched?.(item.mal_id)}
            style={[styles.watchButton, styles.removeButton]}
          >
            <Text style={styles.watchButtonText}>Remover</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              isAnimeWatched(item.mal_id)
                ? onRemoveFromWatched?.(item.mal_id)
                : onAddToWatched?.(item)
            }
            style={[
              styles.watchButton,
              isAnimeWatched(item.mal_id) && styles.watchedButton,
            ]}
          >
            <Text style={styles.watchButtonText}>
              {isAnimeWatched(item.mal_id)
                ? "✓ Assistido"
                : "Marcar como assistido"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Image
        source={{ uri: item.images.jpg.image_url }}
        style={styles.animeImage}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={animes}
      keyExtractor={(item) => item.mal_id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  animeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animeInfo: {
    flex: 1,
    marginRight: 12,
  },
  animeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  animeRating: {
    fontSize: 14,
    color: "#FFA500",
    fontWeight: "bold",
    marginBottom: 8,
  },
  animeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  watchButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  watchedButton: {
    backgroundColor: "#2196F3",
  },
  removeButton: {
    backgroundColor: "#F44336",
  },
  watchButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default AnimeList;
