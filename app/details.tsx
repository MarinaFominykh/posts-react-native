import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

type TPost = {
  id: number;
  title: string;
  thumbnailUrl: string;
};
export default function DetailsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TPost>();
  const params = useLocalSearchParams();
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
        Alert.alert("Ошибка", "Не удалось загрузить данные");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    router.setParams({
      title: params.title,
    });
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
      <Image style={styles.image} source={{ uri: data?.thumbnailUrl }} />
      <Text style={styles.text}>{data?.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
