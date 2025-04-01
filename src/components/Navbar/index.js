import { TouchableOpacity, View, Image } from "react-native";
import { s } from "./styles";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={s.navbar}>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/icons/homeIcon.png")}
          style={{ width: 32, height: 32 }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/icons/favoriteIcon.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Watched");
        }}
      >
        <Image
          source={require("../../../assets/icons/watchedIcon.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/icons/profileIcon.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
