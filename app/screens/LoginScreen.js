import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";

const LOGIN = gql`
  mutation Mutation($username: String!, $password: String) {
    loginUser(username: $username, password: $password) {
      accessToken
    }
  }
`;

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsSignedIn } = useContext(AuthContext);

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync("accessToken", data?.login.accessToken);
      setIsSignedIn(true);
    },
  });

  // const [login, { data, loading, error }] = useMutation(LOGIN);

  async function handleSubmit() {
    try {
      await login({ variables: { username, password } });
    } catch (err) {
      Alert.alert("Login Failed", err.message);
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
              Facebook
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChange={setUsername}
              value={username}
              placeholder="Username"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChange={setPassword}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TouchableOpacity
              title="Log In"
              // onPress={async () => {
              //   try {
              //     const response = await login({
              //       variables: {
              //         email: username,
              //         password: password
              //       }
              //     })
              //     console.log(response);
              //     setIsSignedIn(true)
              //   } catch(error) {
              //     console.log(error)
              //   }
              // }}
              onPress={handleSubmit}
              style={{
                backgroundColor: "#3b5998",
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
                Log In
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#000",
              alignContent: "center",
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              marginEnd: 20,
              marginStart: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                top: 9,
                backgroundColor: "#F0F0F0",
                paddingHorizontal: 10,
              }}
            >
              OR
            </Text>
          </View>
          <View>
            <TouchableOpacity
              title="Create New Account"
              onPress={() => navigation.navigate("Register")}
              style={{
                backgroundColor: "#56953e",
                padding: 10,
                borderRadius: 12,
                margin: 20,
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
                Create New Account
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

export default LoginScreen;
