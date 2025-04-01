import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import Navbar from "../../components/Navbar";
import { s } from "./styles";
import AnimeList from "../../components/AnimeList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Watched = () => {
  const navigation = useNavigation();

  const [watchedAnimes, setWatchedAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega a lista de assistidos do AsyncStorage
  const loadWatchedAnimes = useCallback(async () => {
    try {
      setLoading(true);
      const storedAnimes = await AsyncStorage.getItem("@watchedAnimes");
      if (storedAnimes) {
        setWatchedAnimes(JSON.parse(storedAnimes));
      }
    } catch (error) {
      console.error("Erro ao carregar animes assistidos:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de assistidos");
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove um anime da lista de assistidos
  const removeFromWatchedList = useCallback(
    async (animeId) => {
      try {
        const updatedList = watchedAnimes.filter(
          (anime) => anime.mal_id !== animeId
        );
        setWatchedAnimes(updatedList);
        await AsyncStorage.setItem(
          "@watchedAnimes",
          JSON.stringify(updatedList)
        );
        Alert.alert("Removido", "Anime removido da lista de assistidos");
      } catch (error) {
        console.error("Erro ao remover anime assistido:", error);
      }
    },
    [watchedAnimes]
  );

  // Atualiza a lista quando a tela ganha foco
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      loadWatchedAnimes();
    });

    return focusListener;
  }, [loadWatchedAnimes]);

  // Carrega os dados iniciais
  useEffect(() => {
    loadWatchedAnimes();
  }, []);

  // Renderiza quando a lista está vazia
  const renderEmptyList = () => {
    if (loading) {
      return (
        <View style={s.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      );
    }

    return (
      <View style={s.emptyContainer}>
        <Text style={s.emptyText}>Nenhum anime assistido ainda</Text>
        <Text style={s.emptySubtext}>
          Adicione animes à sua lista através da página inicial
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg-gradient-app.png")}
      style={s.container}
    >
      <View style={s.header}>
        <Text style={s.title}>Animes Assistidos</Text>
      </View>

      {watchedAnimes.length === 0 ? (
        renderEmptyList()
      ) : (
        <AnimeList
          animes={watchedAnimes}
          watchedAnimes={watchedAnimes}
          onRemoveFromWatched={removeFromWatchedList}
          isWatchedPage={true}
        />
      )}

      <Navbar />
    </ImageBackground>
  );
};

export default Watched;
