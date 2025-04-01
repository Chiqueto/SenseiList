import { TextInput } from "react-native";
import { s } from "./styles";
const Input = ({ placeholder, onChangeText, isPassword, value }) => {
  return (
    <TextInput
      style={s.input}
      placeholder={placeholder}
      placeholderTextColor={"#737373"}
      onChangeText={onChangeText}
      secureTextEntry={isPassword ? isPassword : false}
      value={value} // Adicionado para refletir o estado atual da busca
    />
  );
};

export default Input;
