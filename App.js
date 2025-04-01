import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Fredoka-Regular": require("./assets/fonts/Fredoka/static/Fredoka-Regular.ttf"),
    "Fredoka-Bold": require("./assets/fonts/Fredoka/static/Fredoka-Bold.ttf"),
    "Fredoka-Medium": require("./assets/fonts/Fredoka/static/Fredoka-Medium.ttf"),
    "Fredoka-SemiBold": require("./assets/fonts/Fredoka/static/Fredoka-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-LightItalic": require("./assets/fonts/Poppins/Poppins-LightItalic.ttf"),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator color="red" size={"large"} />;
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
      <Routes />
    </NavigationContainer>
  );
}
