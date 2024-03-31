import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import SearchUser from "../queries/Search";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  let result = useQuery(SearchUser, {
    variables: { username: searchTerm },
  });

  const { data, loading, error } = result;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by username"
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCapitalize="none"
      />
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity
          key={data?.searchUsers._id}
          style={styles.resultItem}
          onPress={() =>
            navigation.navigate("Profile", { id: data?.searchUsers._id })
          }
        >
          <Text style={styles.name}>{data?.searchUsers.username}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 30,
    margin: 40,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: -5,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});

export default Search;
