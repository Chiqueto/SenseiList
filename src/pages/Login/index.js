import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { s } from "./styles";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user");

    if (!user) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    try {
      const userJson = JSON.parse(user);

      if (userJson.email === email && userJson.password === password) {
        navigation.navigate("Home");
      } else {
        alert("E-mail ou senha inválidos!");
      }
    } catch (error) {
      console.error("Erro ao analisar JSON:", error);
      alert("Erro ao carregar os dados do usuário.");
    }
  };

  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg-gradient.png")}
      style={s.container}
    >
      <View style={s.logoView}>
        <Text style={s.logo}>先 生</Text>
        <Text style={s.logo}>Sensei - List</Text>
      </View>
      <Text style={s.title}>Login</Text>

      <Text style={s.subTitle}>Faça seu login para acessar o aplicativo</Text>
      <Text style={s.subTitle}>
        Não tem uma conta?{" "}
        <TouchableOpacity onPress={handleRegister}>
          <Text style={s.textButton}>Cadastre-se!</Text>
        </TouchableOpacity>
      </Text>

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
          <Button text="Logar" click={handleLogin} />
        </View>
      </View>
      <View style={s.lineView}>
        <View style={s.line} />
        <View style={s.line} />
      </View>
    </ImageBackground>
  );
};

export default Login;
