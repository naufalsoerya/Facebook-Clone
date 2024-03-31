import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";

const POST_CREATE = gql`
  mutation CreatePost($content: String!, $tags: [String], $imgUrl: String) {
    createPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        username
        name
        email
      }
    }
  }
`;

function CreatePost({ navigation }) {
  const image = { uri: "https://wallpapercave.com/wp/wp9307062.jpg" };

  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [post, { data, loading, error }] = useMutation(POST_CREATE);

  async function handleSubmit() {
    try {
      await post({ variables: { content, tags, imgUrl } });
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Create Post Failed", err.message);
    }
  }

  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>Facebook Post</Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              onChangeText={setContent}
              value={content}
              placeholder="description"
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="tags"
              onChangeText={setTags}
              value={tags}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="img url"
              onChangeText={setImgUrl}
              value={imgUrl}
            />
          </View>
          <View>
            <TouchableOpacity
              title="Create Post"
              onPress={handleSubmit}
              style={styles.button}
            >
              <Text style={styles.textBtn}>Create Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 30,
    margin: 40,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
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
    marginEnd: 5,
    marginStart: 5,
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#3b5998",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3b5998",
    padding: 10,
    borderRadius: 12,
    marginEnd: 5,
    marginStart: 5,
  },
  textBtn: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CreatePost;
