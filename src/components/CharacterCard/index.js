import { Image, View, Text, TouchableOpacity } from "react-native";
import { s } from "./styles";
const CharacterCard = ({ item }) => {
  return (
    <TouchableOpacity style={s.container} activeOpacity={0.8}>
      <Image
        source={{ uri: item.character.images.jpg.image_url }}
        style={s.image}
      />
      <View style={s.textContainer}>
        <Text style={s.name} numberOfLines={1}>
          {item.character.name}
        </Text>
        <Text style={s.role} numberOfLines={1}>
          {item.role}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CharacterCard;
