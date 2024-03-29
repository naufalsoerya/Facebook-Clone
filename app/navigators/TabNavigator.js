import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CreatePost from "../screens/CreatePostScreen";
import HomeScreen from "../screens/HomeScreen";
import Search from "../screens/SearchScreen";
import Profile from "../screens/ProfileScreen";
import LogoutButton from "../context/LogOut";
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "#fff",
        headerTitle: `Facebook`,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "Helvetica",
          color: "#3b5998",
        },
        headerRight: () => <LogoutButton />
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
