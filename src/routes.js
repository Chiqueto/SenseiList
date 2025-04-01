import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Watched from "./pages/Watched";
import AnimePage from "./pages/Anime/index";

const Stack = createStackNavigator();
const Routes = () => {
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
      <Stack.Screen
        name="Anime"
        component={AnimePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
