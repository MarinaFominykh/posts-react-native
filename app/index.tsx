import { useState, useEffect } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Post } from "@/components/Post";

export default function HomeScreen() {
  const router = useRouter();
  const [startPost, setStartPost] = useState(0);
  const [limit, setLimit] = useState(10);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPosts = () => {
    setIsLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${startPost}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.log(error);
        Alert.alert("Ошибка", "Не удалось загрузить данные");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color={"#266bf1"} />
        <Text style={styles.text}>Загрузка...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: "/details",
                params: {
                  id: item.id,
                  title: item.title,
                },
              });
            }}
          >
            {/* <Link href="/details" asChild> */}
            {/* <Pressable> */}
            <Post post={item} />
            {/* </Pressable> */}
            {/* </Link> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 15,
  },
});
