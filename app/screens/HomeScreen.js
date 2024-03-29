import { View, Text, Image, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Username</Text>
      </View>
      <Image
        source={{ uri: "https://via.placeholder.com/300" }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <Text style={styles.caption}>Caption</Text>
        <Text>Description of the photo will be here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    overflow: "hidden",
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

export default HomeScreen;
