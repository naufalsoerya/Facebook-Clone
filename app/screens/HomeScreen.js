import Card from "../components/Card";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import GET_ALL_POST from "../queries/GetAllPost";

function HomeScreen({ route }) {
  const { loading, error, data, refetch } = useQuery(GET_ALL_POST, {
    notifyOnNetworkStatusChange: true,
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {data?.posts.map((post, index) => {
            return <Card key={index} post={post} />
          })}
        </ScrollView>
      </View>
    </>
  )
}

export default HomeScreen;
