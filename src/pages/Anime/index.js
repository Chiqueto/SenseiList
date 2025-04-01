import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import api from "../../services/api";
import { s } from "./styles"; // Importe seus estilos
import GenreSlug from "../../components/GenreSlug";
import CharacterCard from "../../components/CharacterCard";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { colors } from "../../styles/colors";

const AnimePage = ({ route }) => {
  const navigation = useNavigation();
  // Recebe route como prop
  const { id } = route.params; // Extrai o id dos parâmetros
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loadingCharacters, setLoadingCharacters] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await api.get(`/anime/${id}`);
        setAnime(response.data.data);
        fetchCharacters();
      } catch (error) {
        // console.error("Erro ao buscar anime:", error);
        fetchAnime(); // Tente novamente em caso de erro
      }
    };
    const fetchCharacters = async () => {
      try {
        setLoadingCharacters(true);
        const response = await api.get(`/anime/${id}/characters`);
        setCharacters(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      } finally {
        setLoadingCharacters(false);
      }
    };
    fetchAnime();
  }, [id]); // Adicione id como dependência

  if (!anime) {
    return (
      <View style={s.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} de ${month} de ${year}`;
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg-gradient-app.png")}
      style={s.container}
    >
      <ScrollView
        style={s.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.animeDetails}>
          <View style={s.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={s.backButton}
            >
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={s.title}>{anime.title}</Text>
            <View style={{ width: 44 }} />
          </View>
          <Image
            source={{ uri: anime.images.jpg.image_url }}
            style={s.image}
            resizeMode="contain"
          />
          <View style={s.animeRatingView}>
            <Image source={require("../../../assets/icons/starIcon.png")} />
            <Text style={s.animeRating}>{anime.score || "N/A"}</Text>
          </View>
          <View style={s.genreList}>
            <FlatList
              data={anime.genres}
              keyExtractor={(item) => item.mal_id.toString()}
              renderItem={({ item }) => <GenreSlug item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.horizontalGenreList}
            />
          </View>
          <View style={s.detail}>
            <Text style={s.subitle}>Detalhes:</Text>

            <Text style={s.description}>
              Lançamento: {formatDate(anime.aired.from)}
            </Text>
            <Text style={s.description}>Temporada: {anime.season}</Text>
            <Text style={s.description}>{anime.episodes} Episódios </Text>
          </View>
          <View style={s.detail}>
            <Text style={s.subitle}>Estudio(s):</Text>

            <Text style={s.description}>
              {anime.studios?.length > 0
                ? anime.studios.map((studio) => studio.name).join(", ")
                : "Estúdio não informado"}
            </Text>
          </View>
          <View style={s.detail}>
            <Text style={s.subitle}>Sinopse:</Text>

            <Text style={s.description}>{anime.synopsis}</Text>
          </View>
          <View style={s.detail}>
            <Text style={s.subitle}>Personagens:</Text>

            {loadingCharacters ? (
              <CharacterLoadingSkeleton />
            ) : characters.length > 0 ? (
              <FlatList
                data={characters}
                keyExtractor={(item) => item.character.mal_id.toString()}
                renderItem={({ item }) => <CharacterCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.charactersList}
              />
            ) : (
              <Text style={s.noCharactersText}>
                Nenhum personagem encontrado
              </Text>
            )}
          </View>
          <View style={s.detail}>
            <Text style={s.subitle}>Trailer:</Text>

            {anime.trailer?.youtube_id ? (
              <View style={s.videoContainer}>
                <WebView
                  style={s.video}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  renderLoading={() => (
                    <ActivityIndicator
                      color={colors.primary}
                      style={s.loadingIndicator}
                    />
                  )}
                  allowsFullscreenVideo={true}
                  source={{
                    uri: anime.trailer.embed_url,
                  }}
                />
              </View>
            ) : (
              <Text style={s.noTrailerText}>Trailer não disponível</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const CharacterLoadingSkeleton = () => {
  return (
    <FlatList
      horizontal
      data={[...Array(4)]}
      renderItem={() => (
        <View style={s.characterLoadingCard}>
          <View style={s.characterLoadingImage} />
          <View style={s.characterLoadingText} />
          <View style={[s.characterLoadingText, { width: "60%" }]} />
        </View>
      )}
      contentContainerStyle={s.characterLoadingContainer}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default AnimePage;
