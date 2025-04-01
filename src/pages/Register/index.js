import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { s } from "./styles";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    const user = {
      email,
      password,
    };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Usuário cadastrado com sucesso!");
    navigation.navigate("Login");
  };

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <ImageBackground
      source={require("../../../assets/bg-gradient.png")} // Caminho para a imagem
      style={s.container}
    >
      <View style={s.logoView}>
        <Text style={s.logo}>先 生</Text>
        <Text style={s.logo}>Sensei - List</Text>
      </View>
      <Text style={s.title}>Cadastre-se</Text>

      <Text style={s.subTitle}>
        Faça seu cadastro para começar a usar o aplicativo
      </Text>
      <View style={s.textButtonView}>
        <Text style={s.subTitle}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={s.textButton}>Faça Login!</Text>
        </TouchableOpacity>
      </View>

      <View style={s.lineView}>
        <View style={s.line} />
        <View style={s.line} />
      </View>
      <View style={s.inputArea}>
        <View style={s.inputCombo}>
          <Text style={s.base}>E-mail</Text>
          <Input
            placeholder="example@email.com"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={s.inputCombo}>
          <Text style={s.base}>Senha</Text>
          <Input
            placeholder="********"
            onChangeText={(text) => setPassword(text)}
            isPassword={true}
          />
        </View>
        <View style={s.inputCombo}>
          <Button text="Cadastrar" click={handleRegister} />
        </View>
      </View>
      <View style={s.lineView}>
        <View style={s.line} />
        <View style={s.line} />
      </View>
    </ImageBackground>
  );
};

export default Register;
