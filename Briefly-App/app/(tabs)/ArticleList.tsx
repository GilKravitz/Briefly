import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import { getArticles } from "@/api/articles";
import { Article } from "@/types";
import ListItem from "@/components/Article/ListItem";
import { useArticle } from "@/core/store/articleContext";
import { router } from "expo-router";
import Colors from "@/core/constants/Colors";
import Svg, { Path, SvgProps } from "react-native-svg";

const Logo = (props: SvgProps) => (
  <Svg width={92} height={109} fill="none" {...props}>
    <Path
      fill="#2D2D2D"
      d="M0 0v91.974h46.379c32.583 0 46.773-33.768 25.753-49.273C87.372 25.882 72.915 0 47.822 0H0ZM75.725 94.664a2.69 2.69 0 0 1 2.69-2.69h10.76a2.69 2.69 0 0 1 2.69 2.69v10.76a2.69 2.69 0 0 1-2.69 2.69h-10.76a2.69 2.69 0 0 1-2.69-2.69v-10.76Z"
    />
  </Svg>
);

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
        ListHeaderComponent={<Logo />}
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
    marginBottom: 50,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    marginTop: 20,
  },
  contentContainer: {
    gap: 20,
    width: "100%",
  },
});
