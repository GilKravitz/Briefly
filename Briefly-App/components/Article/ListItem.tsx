import { TouchableOpacity, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { Article } from "@/types";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { dateFormat } from "@/utils/dateFormat";
import ArticleCategory from "./ArticleCategory";
import Animated, { FadeInDown } from "react-native-reanimated";
import ListItemSkeleton from "./ListItemSkeleton";

type ListItemProps = {
  index: number;
  article: Article;
  onPress: () => void;
  skeleton?: boolean;
};

const ListItem = React.memo(
  (props: ListItemProps) => {
    if (props.skeleton) {
      return <ListItemSkeleton />;
    }
    return (
      <Animated.View entering={FadeInDown.delay(50 * props.index)}>
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <ArticleCategory category={props.article.category} />
              <Text weight="bold" style={{ flex: 0.95 }}>
                {props.article.title.replaceAll("*", "")}
              </Text>
              <Text style={styles.date} colorName="textMuted">
                {dateFormat(props.article.publishDate)}
              </Text>
            </View>
            <Image source={{ uri: props.article.image }} style={styles.img} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
  (prev, next) => prev.article.id === next.article.id && prev.index === next.index
);

export default ListItem;

export const styles = StyleSheet.create({
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
