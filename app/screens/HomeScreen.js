import { View, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
      <Button title="Post" onPress={() => navigation.navigate('')} />
      <Button title="Search" onPress={() => navigation.navigate('')} />
      <Button title="Profile" onPress={() => navigation.navigate('')} />
    </View>
  );
}

export default HomeScreen;
