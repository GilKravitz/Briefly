import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { Heading } from "@/components/StyledText";
import { getAllBookmarked } from "@/core/persistant/bookmarked";
import { Article } from "@/types";
import Colors from "@/core/constants/Colors";
import { useArticle } from "@/core/store/articleContext";
import { router, useNavigation } from "expo-router";
import ListItem from "@/components/Article/ListItem";

const Bookmarked = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigation = useNavigation();
  const { setArticle } = useArticle();
  const getBookmarkedArticles = async () => {
    const bookmarkedArticles = await getAllBookmarked();
    setArticles(bookmarkedArticles);
  };

  useEffect(() => {
    getBookmarkedArticles();
  }, []);

  const handlePress = (article: Article) => {
    setArticle(article);
    router.push("/(app)/ArticleView");
  };

  // on tab focus fetch bookmarked articles
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getBookmarkedArticles();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={styles.backgroundMuted}>
      <FlatList
        data={articles}
        renderItem={({ item, index }) => <ListItem index={index} article={item} onPress={() => handlePress(item)} />}
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
