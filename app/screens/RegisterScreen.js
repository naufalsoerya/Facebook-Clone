import { View, Text, Button } from "react-native";

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default RegisterScreen;
