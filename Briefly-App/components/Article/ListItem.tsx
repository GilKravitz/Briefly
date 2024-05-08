import { TouchableOpacity, StyleSheet } from "react-native";
import { View } from "../Themed";
import { Heading2, Text } from "../StyledText";
import { Article } from "@/types";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import React from "react";
import { dateFormat } from "@/utils/dateFormat";
import ArticleCategory from "./ArticleCategory";

type ListItemProps = {
  index: number;
  article: Article;
  onPress: () => void;
};

const ListItem = React.memo((props: ListItemProps) => {
  return (
    <Animated.View entering={FadeInDown.delay(50 * props.index)}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <ArticleCategory category={props.article.category} />
            <Heading2 style={{ flex: 0.95, fontSize: 16, fontWeight: "600" }} size={16}>
              {props.article.title}
            </Heading2>
            <Text style={styles.date} colorName="textMuted">
              {dateFormat(props.article.publish_date)}
            </Text>
          </View>
          <Image source={{ uri: props.article.s3_image }} style={styles.img} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    width: "100%",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    gap: 5,
  },
  img: {
    width: 140,
    height: 100,
    borderRadius: 10,
  },
});
