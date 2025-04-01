import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import { s } from "./styles";
import api from "../../services/api";
import { useEffect, useState, useCallback, useRef } from "react";
import FilterModal from "../../components/FilterModal";
import AnimeList from "../../components/AnimeList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [watchedAnimes, setWatchedAnimes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const searchTimeoutRef = useRef(null);

  // Função para buscar animes
  const fetchAnimes = useCallback(
    async (query = "", page = 1, isNewSearch = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        // Delay para evitar rate limit
        await new Promise((resolve) => setTimeout(resolve, 350));

        const params = {
          page,
          limit: 25,
        };

        if (query) {
          params.q = query;
        }

        const response = await api.get("/anime", {
          params,
          timeout: 10000,
        });

        // Verificação da resposta
        if (
          !response.data ||
          !response.data.data ||
          !response.data.pagination
        ) {
          throw new Error("Estrutura de dados inválida da API");
        }

        const newAnimes = response.data.data;
        const newPagination = response.data.pagination;

        setPagination(newPagination);

        if (isNewSearch || page === 1) {
          setAnimes(newAnimes);
        } else {
          setAnimes((prev) => [...prev, ...newAnimes]);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        setError(error);

        if (error.response?.status === 500) {
          Alert.alert(
            "Erro no servidor",
            "A API está temporariamente indisponível. Por favor, tente novamente mais tarde.",
            [{ text: "OK" }]
          );
        } else {
          Alert.alert(
            "Erro",
            "Não foi possível carregar os animes. Tente novamente.",
            [{ text: "OK" }]
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // Função de pesquisa com debounce
  const handleSearch = useCallback(
    (text) => {
      setSearchQuery(text);
      clearTimeout(searchTimeoutRef.current);

      searchTimeoutRef.current = setTimeout(() => {
        if (text.trim() === "") {
          fetchAnimes("", 1, true); // Se o campo estiver vazio, carrega a lista normal
        } else {
          fetchAnimes(text, 1, true); // Faz a pesquisa com o texto digitado
        }
      }, 600); // Debounce de 600ms
    },
    [fetchAnimes]
  );

  // Carrega mais animes quando chegar no final da lista
  const loadMoreAnimes = useCallback(() => {
    if (!loading && pagination?.has_next_page && !error) {
      const nextPage = pagination.current_page + 1;
      fetchAnimes(searchQuery, nextPage);
    }
  }, [loading, pagination, error, searchQuery, fetchAnimes]);

  // Carrega a lista de assistidos do AsyncStorage
  const loadWatchedAnimes = useCallback(async () => {
    try {
      const storedAnimes = await AsyncStorage.getItem("@watchedAnimes");
      if (storedAnimes) {
        setWatchedAnimes(JSON.parse(storedAnimes));
      }
    } catch (error) {
      console.error("Erro ao carregar animes assistidos:", error);
    }
  }, []);

  // Salva um anime na lista de assistidos
  const addToWatchedList = useCallback(
    async (anime) => {
      try {
        // Verifica se o anime já está na lista
        if (watchedAnimes.some((a) => a.mal_id === anime.mal_id)) {
          Alert.alert("Aviso", "Este anime já está na sua lista de assistidos");
          return;
        }

        const updatedList = [...watchedAnimes, anime];
        setWatchedAnimes(updatedList);
        await AsyncStorage.setItem(
          "@watchedAnimes",
          JSON.stringify(updatedList)
        );
        Alert.alert("Sucesso", `${anime.title} foi adicionado aos assistidos!`);
      } catch (error) {
        console.error("Erro ao salvar anime assistido:", error);
        Alert.alert("Erro", "Não foi possível adicionar aos assistidos");
      }
    },
    [watchedAnimes]
  );

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

  // Verifica se um anime está na lista de assistidos
  const isAnimeWatched = useCallback(
    (animeId) => {
      return watchedAnimes.some((anime) => anime.mal_id === animeId);
    },
    [watchedAnimes]
  );

  // Carrega os dados iniciais
  useEffect(() => {
    fetchAnimes();
    loadWatchedAnimes();
  }, []);

  // Renderiza o footer da lista
  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      );
    }

    if (error) {
      return (
        <TouchableOpacity
          style={s.retryButton}
          onPress={() =>
            fetchAnimes(searchQuery, pagination?.current_page || 1, true)
          }
        >
          <Text style={s.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg-gradient-app.png")}
      style={s.container}
    >
      <View style={s.menu}>
        <Input
          placeholder={"Pesquise pelo nome!"}
          value={searchQuery}
          onChangeText={handleSearch}
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

      {error && animes.length === 0 ? (
        <View style={s.errorContainer}>
          <Text style={s.errorText}>Não foi possível carregar os animes</Text>
          <TouchableOpacity style={s.retryButton} onPress={() => fetchAnimes()}>
            <Text style={s.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <AnimeList
          animes={animes}
          onEndReached={loadMoreAnimes}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          watchedAnimes={watchedAnimes}
          onAddToWatched={addToWatchedList}
          onRemoveFromWatched={removeFromWatchedList}
          isAnimeWatched={isAnimeWatched}
        />
      )}

      <FilterModal isVisible={modalVisible} />
      <Navbar />
    </ImageBackground>
  );
};

export default Home;
