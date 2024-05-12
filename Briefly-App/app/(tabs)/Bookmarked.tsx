import { FlatList, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import Persistent from "@/core/persistent";
import { Article } from "@/types";
import Colors from "@/core/constants/Colors";
import { useArticle } from "@/core/store/articleContext";
import { router, useNavigation, useFocusEffect } from "expo-router";
import ListItem from "@/components/Article/ListItem";

const Bookmarked = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigation = useNavigation();
  const { setArticle } = useArticle();

  useFocusEffect(
    useCallback(() => {
      console.log("Focused Bookmarked");
      getBookmarkedArticles();
    }, [])
  );

  const getBookmarkedArticles = async () => {
    const bookmarkedArticles = await Persistent.Bookmarked.getAllBookmarked();
    setArticles(bookmarkedArticles);
  };

  const handlePress = (article: Article) => {
    setArticle(article);
    router.push("/(app)/ArticleView");
  };

  const renderItem = useMemo(
    () =>
      ({ item, index }: { item: Article; index: number }) =>
        <ListItem index={index} article={item} onPress={() => handlePress(item)} />,
    [articles]
  );
  return (
    <Container style={styles.backgroundMuted}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString() + item.title}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponentStyle={{ alignItems: "center", marginBottom: 30 }}
      />
    </Container>
  );
};

export default Bookmarked;

const styles = StyleSheet.create({
  backgroundMuted: {
    backgroundColor: Colors.listBackground,
  },
  list: {
    width: "100%",
    marginTop: 50,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    marginTop: 20,
  },
  contentContainer: {
    gap: 20,
    width: "100%",
    paddingBottom: 50,
  },
});
