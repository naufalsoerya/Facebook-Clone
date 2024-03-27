import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CreatePost from "../screens/CreatePostScreen";
import HomeScreen from "../screens/HomeScreen";

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "fff",
        headerTitleStyle: {
          fontWeigth: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home Screen",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Create Post" 
        component={CreatePost} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="human-greeting-variant" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
