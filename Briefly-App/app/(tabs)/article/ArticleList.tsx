import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { Heading } from "@/components/StyledText";
import { getArticles } from "@/api/articles";
import { Article } from "@/types";
import ListItem from "@/components/Feed/ListItem";
import { useArticle } from "@/store/articleContext";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const ArticleList = () => {
  const { setArticle } = useArticle();
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchArticles = async () => {
    const articles = await getArticles();
    setArticles(articles as Article[]);
    // console.log(articles);
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePress = (article: Article) => {
    setArticle(article);
    router.navigate("/article/ArticleView");
  };
  return (
    <Container style={styles.backgroundMuted}>
      <Heading>Home</Heading>
      <FlatList
        data={articles}
        renderItem={({ item, index }) => <ListItem index={index} article={item} onPress={() => handlePress(item)} />}
        keyExtractor={(item) => item.id.toString() + item.title}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        // ListHeaderComponent={<Logo />}
        ListHeaderComponentStyle={{ alignItems: "center", marginBottom: 30 }}
      />
    </Container>
  );
};

export default ArticleList;

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
