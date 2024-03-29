import { useContext } from "react";
import { View, Text, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native";
import AuthContext from "./auth";

function LogoutButton() {
  const { setIsSignedIn } = useContext(AuthContext);

  return (
    <TouchableOpacity>
      <Text
        style={{
          fontFamily: "Helvetica",
          fontWeight: "bold",
          color: "#3b5998",
          marginEnd: 20,
        }}
        onPress={async () => {
          await SecureStore.deleteItemAsync("accessToken");
          setIsSignedIn(false);
        }}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
}

export default LogoutButton;
