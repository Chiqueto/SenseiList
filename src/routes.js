import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import { useFonts } from "expo-font";
import Register from "./pages/Register/index";
import Watched from "./pages/Watched";

const Stack = createStackNavigator();
const Routes = () => {
  const [fontsLoaded] = useFonts({
    "Fredoka-Regular": require("../assets/fonts/Fredoka/static/Fredoka-Regular.ttf"),
    "Fredoka-Bold": require("../assets/fonts/Fredoka/static/Fredoka-Bold.ttf"),
    "Fredoka-Medium": require("../assets/fonts/Fredoka/static/Fredoka-Medium.ttf"),
    "Fredoka-SemiBold": require("../assets/fonts/Fredoka/static/Fredoka-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-LightItalic": require("../assets/fonts/Poppins/Poppins-LightItalic.ttf"),
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Watched"
        component={Watched}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
