import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { Heading } from "@/components/StyledText";
import { getArticles } from "@/api/articles";
import { Article } from "@/types";
import ListItem from "@/components/Feed/ListItem";
const index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchArticles = async () => {
    const articles = await getArticles();
    setArticles(articles as Article[]);
    console.log(articles);
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container>
      <Heading>Home</Heading>
      <FlatList
        data={articles}
        renderItem={({ item }) => <ListItem article={item} onPress={() => console.log("pressed")} />}
        keyExtractor={(item) => item.id.toString() + item.title}
        // ItemSeparatorComponent={() => (
        //   <View style={{ height: 20, borderBottomWidth: 1, marginBottom: 20, borderColor: "#b8b9ba" }} />
        // )}
        // extraData={selectedId}
        style={styles.list}
        contentContainerStyle={{ width: "100%", paddingBottom: 50 }}
        // ListHeaderComponent={<Logo />}
        ListHeaderComponentStyle={{ alignItems: "center", marginBottom: 30 }}
      />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  list: {
    width: "100%",
    marginTop: 50,
  },
});
