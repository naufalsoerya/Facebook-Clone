import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { useCallback } from "react";
import { useNavigation } from '@react-navigation/native';

const GET_POST_BY_ID_QUERY = gql`
  query Query($id: ID) {
    post(_id: $id) {
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

const COMMENT_POST_MUTATION = gql`
  mutation Mutation($content: String!, $id: ID) {
    commentPost(content: $content, _id: $id) {
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

const LIKE_POST_MUTATION = gql`
  mutation Mutation($id: ID) {
    likePost(_id: $id) {
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

function PostDetail({ route }) {
  const { getPostByIdId } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_POST_BY_ID_QUERY, {
    variables: { id: getPostByIdId },
    notifyOnNetworkStatusChange: true,
  });

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  const [commentContent, setCommentContent] = useState("");

  const [likePost, { data: likeData, loading: likeLoading, error: likeError }] =
    useMutation(LIKE_POST_MUTATION, {
      variables: { id: getPostByIdId },
      onCompleted: () => {},
      refetchQueries: [
        {
          query: GET_POST_BY_ID_QUERY,
          variables: { id: getPostByIdId },
        },
      ],
      onError: (error) => {
        Alert.alert("Error liking post", error.message);
      },
    });

  const [commentPost] = useMutation(COMMENT_POST_MUTATION, {
    variables: {
      content: commentContent,
      id: getPostByIdId,
    },
    refetchQueries: [
      { query: GET_POST_BY_ID_QUERY, variables: { getPostByIdId } },
    ],
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) return <Text>Error: {error.message}</Text>;

  const post = data.post;

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { id: post.authorId })}
          >
            <View style={styles.header}>
              <Image
                source={{ uri: "https://picsum.photos/300/500" }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{post.author.username}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.caption}>{post.content}</Text>
          </View>
          <Image source={{ uri: post.imgUrl }} style={styles.image} />
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={commentContent}
            onChangeText={setCommentContent}
            multiline
          />
          <View style={styles.line}></View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => likePost({ variables: { id: getPostByIdId } })}
              disabled={likeLoading}
            >
              <Icon name="thumbs-up" size={18} color="gray" />
              <Text style={styles.text}>
                {likeLoading ? "Liking..." : "Like"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                commentPost();
                setCommentContent("");
              }}
            >
              <Icon name="comments" size={18} color="gray" />
              <Text style={styles.text}>Comment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
        </View>
        {/* Comments List */}
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <View key={index} style={styles.comment}>
              <Text style={styles.commentUsername}>{comment.username}:</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))
        ) : (
          <Text style={{ marginStart: 12 }}>No comments yet</Text>
        )}
      </ScrollView>
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "start",
    marginTop: 0,
    marginStart: 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "start",
    paddingLeft: 35,
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
    fontSize: 16,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  commentContent: {
    marginLeft: 5,
  },
  comment: {
    marginTop: 10,
    marginStart: 20,
  },
  commentInput: {
    margin: 10,
  },
});

export default PostDetail;
