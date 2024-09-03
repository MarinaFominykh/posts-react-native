import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  post: {
    id: number;
    title: string;
    //author: string;
    thumbnailUrl: string;
  };
}
export const Post: FC<Props> = ({ post }) => {
  const { title, id, thumbnailUrl } = post;
  return (
    <View style={styles.post}>
      <Image source={{ uri: thumbnailUrl }} style={styles.image} />
      <View style={styles.detail}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{id}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderStyle: "solid",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  detail: {
    justifyContent: "center",
    flex: 1,
  },
  author: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.4)",
    marginTop: 2,
  },
});
