import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";

const REGISTER = gql`
  mutation Mutation(
    $username: String!
    $email: String!
    $password: String!
    $name: String
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      name: $name
    ) {
      _id
      name
      username
      email
      password
    }
  }
`;

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [register, { data, loading, error }] = useMutation(REGISTER);

  async function handleSubmit() {
    try {
      await register({ variables: { username, password, email, name } });
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Register Failed", err.message);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View style={{ padding: 10, gap: 15 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                color: "#3b5998",
                marginBottom: 20,
              }}
            >
              Register
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Name"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TouchableOpacity
              title="Register"
              onPress={handleSubmit}
              style={{
                backgroundColor: "#56953e",
                padding: 10,
                borderRadius: 12,
                marginEnd: 20,
                marginStart: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>      
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
  },

  inputGroup: {
    gap: 5,
    backgroundColor: "#F8F0F0",
    marginEnd: 20,
    marginStart: 20,
  },
});

export default RegisterScreen;
