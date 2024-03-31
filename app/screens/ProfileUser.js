import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const PROFILE_USER = gql`
  query Query($id: ID) {
    user(_id: $id) {
      _id
      name
      username
      email
      password
      followerDetail {
        _id
        name
        username
        email
      }
      followingDetail {
        _id
        name
        username
        email
      }
    }
  }
`;

function ProfileUser() {
  const { loading, error, data } = useQuery(PROFILE_USER);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const user = data.user;

  console.log(user, "<<<<<<<<<,");

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainter}>
          <Image
            source={{ uri: "https://picsum.photos/200/500" }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.username}>@{user?.username}</Text>
        <View style={{ flex: 1, flexDirection: "row", marginLeft: 22 }}>
          <View style={styles.section}>
            <Text style={styles.subtitle}>
              Followers: {user.followerDetail.length}
            </Text>
            {user?.followerDetail.map((follower, index) => (
              <Text key={index} style={styles.detailText}>
                
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>
              Following: {user.followingDetail.length}
            </Text>
            {user?.followingDetail.map((following, index) => (
              <Text key={index} style={styles.detailText}>
                
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  imageContainter: {
    paddingBottom: 20,
    alignItems: "center",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 17,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 30,
  },
  section: {
    width: "37%",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 13,
    marginLeft: 0,
  },
  followButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  followButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ProfileUser;
