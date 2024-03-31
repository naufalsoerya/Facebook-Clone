import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";
import PostDetail from "../screens/PostDetailScreen";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";
const Stack = createNativeStackNavigator();

function StackNavigator() {
  const {isSignedIn, setIsSignedIn} = useContext(AuthContext);
  (async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      setIsSignedIn(true);
    }
  })();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {!isSignedIn ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ 
                  headerShown: false, 
                }}
              />
              <Stack.Screen
                name="PostDetail"
                component={PostDetail}
                options={{ headerShown: true }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default StackNavigator;
