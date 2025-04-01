import { TextInput } from "react-native";
import { s } from "./styles";
const Input = ({
  placeholder,
  onChangeText,
  value,
  onSubmitEditing,
  isPassword = false,
}) => {
  return (
    <TextInput
      style={s.input}
      placeholder={placeholder}
      placeholderTextColor={"#737373"}
      onChangeText={onChangeText}
      secureTextEntry={isPassword}
      value={value}
      onSubmitEditing={onSubmitEditing}
      returnKeyType="search" // Isso muda o botão do teclado para "Search"
    />
  );
};

export default Input;
