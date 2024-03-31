import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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

  // console.log(result, "<<<<<< ini result");

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#00ff00" />
  //     </View>
  //   );
  // }
  // if (error) return <Text>Error: {error.message}</Text>;

  // console.log(data, "<<<<<<<< ini data");
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by username"
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCapitalize="none"
        />
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error.message}</Text>}
        <FlatList
          data={data?.searchUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => navigation.navigate("Profile", { id: item._id })}
            >
              <Text style={styles.name}>({item.username})</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});

export default Search;
