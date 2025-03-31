import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import { s } from "./styles";
import api from "../../services/api";
import { useEffect, useState } from "react";
import FilterModal from "../../components/FilterModal";

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/");
        response.data.forEach((anime) => {
          setAnimes((prevAnimes) => [...prevAnimes, anime]);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/bg-gradient-app.png")}
      style={s.container}
    >
      <View style={s.menu}>
        <Input placeholder={"Pesquise pelo nome!"} />
        <TouchableOpacity
          style={s.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../../../assets/icons/filterIcon.png")}
            width={32}
            height={32}
          />
        </TouchableOpacity>
      </View>
      <View style={s.listContainer}></View>
      {animes.map((anime) => (
        <View key={anime.id} style={s.animeCard}>
          <Image
            source={{ uri: anime.image_url }}
            style={s.animeImage}
            resizeMode="cover"
          />
          <Text style={s.animeTitle}>{anime.title}</Text>
        </View>
      ))}
      <FilterModal isVisible={modalVisible} />
      <Navbar />
    </ImageBackground>
  );
};

export default Home;
