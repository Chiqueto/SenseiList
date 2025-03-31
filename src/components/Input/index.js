import { TextInput } from "react-native";
import { s } from "./styles";
const input = ({ placeholder, onChangeText, isPassword }) => {
  return (
    <TextInput
      style={s.input}
      placeholder={placeholder}
      placeholderTextColor={"#737373"}
      onChangeText={onChangeText}
      secureTextEntry={isPassword ? isPassword : false}
    />
  );
};

export default input;
