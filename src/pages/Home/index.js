import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import Navbar from "../../components/Navbar";
import { s } from "./styles";
import api from "../../services/api";
import { useEffect, useState, useCallback } from "react";
import FilterModal from "../../components/FilterModal";
import AnimeList from "../../components/AnimeList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [watchedAnimes, setWatchedAnimes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [searchAnime, setSearchAnime] = useState("");

  const navigation = useNavigation();

  // Função simplificada para buscar animes
  const fetchAnimes = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/anime?page=${page}`);

      if (!response.data?.data) {
        throw new Error("Dados inválidos da API");
      }

      setAnimes((prev) =>
        page === 1 ? response.data.data : [...prev, ...response.data.data]
      );
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Erro:", error);
      setError(error);
      Alert.alert("Erro", "Não foi possível carregar os animes");
      fetchAnimes();
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    const fetchFilteredAnimes = async () => {
      const response = await api.get(`/anime?q=${searchAnime}`);
      if (response.data.data.length > 0 && searchAnime !== "") {
        setFilteredAnimes(response.data.data);
      } else {
        setFilteredAnimes([]);
      }
    };
    fetchFilteredAnimes();
  }, [searchAnime]);

  const loadMoreAnimes = useCallback(() => {
    if (!loading) {
      fetchAnimes();
    }
  }, [loading, fetchAnimes]);

  const loadWatchedAnimes = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("@watchedAnimes");
      if (stored) setWatchedAnimes(JSON.parse(stored));
    } catch (error) {
      console.error("Erro ao carregar assistidos:", error);
    }
  }, []);

  const addToWatchedList = useCallback(
    async (anime) => {
      try {
        if (watchedAnimes.some((a) => a.mal_id === anime.mal_id)) {
          Alert.alert("Aviso", "Este anime já está na sua lista");
          return;
        }

        const updated = [...watchedAnimes, anime];
        setWatchedAnimes(updated);
        await AsyncStorage.setItem("@watchedAnimes", JSON.stringify(updated));
        Alert.alert("Sucesso", `${anime.title} foi adicionado!`);
      } catch (error) {
        console.error("Erro ao adicionar:", error);
        Alert.alert("Erro", "Não foi possível adicionar");
      }
    },
    [watchedAnimes]
  );

  const removeFromWatchedList = useCallback(
    async (id) => {
      try {
        const updated = watchedAnimes.filter((a) => a.mal_id !== id);
        setWatchedAnimes(updated);
        await AsyncStorage.setItem("@watchedAnimes", JSON.stringify(updated));
        Alert.alert("Removido", "Anime removido da lista");
      } catch (error) {
        console.error("Erro ao remover:", error);
      }
    },
    [watchedAnimes]
  );

  // Verifica se anime foi assistido
  const isAnimeWatched = useCallback(
    (id) => watchedAnimes.some((a) => a.mal_id === id),
    [watchedAnimes]
  );

  // Carrega dados iniciais
  useEffect(() => {
    fetchAnimes();
    loadWatchedAnimes();
  }, []);

  // Componente de carregamento/erro
  const renderFooter = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#FFA500"
          style={{ padding: 20 }}
        />
      );
    }
    if (error) {
      return (
        <TouchableOpacity
          style={s.retryButton}
          onPress={() => setPage(1) || fetchAnimes()}
        >
          <Text style={s.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const handleSearchSubmit = (event) => {
    setSearchAnime(event.nativeEvent.text);
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg-gradient-app.png")}
      style={s.container}
    >
      <View style={s.menu}>
        <Input
          placeholder={"Pesquise pelo nome!"}
          onSubmitEditing={handleSearchSubmit}
        />
        <TouchableOpacity
          style={s.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../../../assets/icons/filterIcon.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </View>

      {error && !animes.length ? (
        <View style={s.errorContainer}>
          <Text style={s.errorText}>Erro ao carregar animes</Text>
          <TouchableOpacity
            style={s.retryButton}
            onPress={() => setPage(1) || fetchAnimes()}
          >
            <Text style={s.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : { filteredAnimes } && searchAnime.length > 0 ? (
        <AnimeList
          animes={filteredAnimes}
          onEndReached={loadMoreAnimes}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          {...{
            onAddToWatched: addToWatchedList,
            onRemoveFromWatched: removeFromWatchedList,
            isAnimeWatched,
          }}
          navigation={navigation}
        />
      ) : (
        <AnimeList
          animes={animes}
          onEndReached={loadMoreAnimes}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          {...{
            onAddToWatched: addToWatchedList,
            onRemoveFromWatched: removeFromWatchedList,
            isAnimeWatched,
          }}
          navigation={navigation}
        />
      )}

      <FilterModal isVisible={modalVisible} />
      <Navbar />
    </ImageBackground>
  );
};

export default Home;
