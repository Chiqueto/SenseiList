import { TouchableOpacity, Text } from "react-native";
import { s } from "./styles";
const button = ({ text, click }) => {
  return (
    <TouchableOpacity style={s.button} onPress={click}>
      <Text style={s.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

export default button;
