import { View, Text, Button } from "react-native";

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Profile;
