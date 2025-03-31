import { TouchableOpacity, View, Image } from "react-native";
import { s } from "./styles";
const Navbar = () => {
  return (
    <View style={s.navbar}>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/icons/homeIcon.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/icons/favoriteIcon.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
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
