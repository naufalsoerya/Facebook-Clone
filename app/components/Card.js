import { View, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();

function Card({post}) {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Username</Text>
        </View>
        <View style={styles.footer}>
          <Text>Description of the photo will be here.</Text>
        </View>
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={styles.image}
        />
        <View style={styles.line}></View>
        <View></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    overflow: "hidden",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
    alignContent: "center",
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 12,
    marginStart: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
  footer: {
    padding: 10,
  },
  caption: {
    fontWeight: "bold",
  },
});

export default Card;
