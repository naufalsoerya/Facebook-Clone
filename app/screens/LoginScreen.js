import { View, Text, Button } from "react-native";

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
}

export default LoginScreen;
