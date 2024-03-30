import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Card({ post }) {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://picsum.photos/100/500" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{post.author.username}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.caption}>{post.content}</Text>
        </View>
        <Image source={{ uri: post.imgUrl }} style={styles.image} />
        <View style={styles.line}></View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Icon name="thumbs-up" size={18} color="gray" />
            <Text style={styles.text}>Like</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="comments" size={18} color="gray" /> 
            <Text style={styles.text}>Comment</Text> 
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'start',
    marginTop: 0,
    marginStart: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'start',
    paddingLeft: 35
  },
  text: {
    marginStart: 10,
    color: "gray",
    fontWeight: "bold",
    fontSize: 16,
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
    height: 250,
  },
  footer: {
    padding: 10,
  },
  caption: {
    fontSize: 16
  },
});

export default Card;
