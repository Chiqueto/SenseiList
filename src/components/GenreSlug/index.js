import { Text, View, TouchableOpacity } from "react-native";
import { s } from "./styles";
const GenreSlug = ({ item }) => {
  // Mudei de 'genre' para 'item' para ser consistente com o renderItem do FlatList
  return (
    <TouchableOpacity style={s.container}>
      <Text style={s.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default GenreSlug;
