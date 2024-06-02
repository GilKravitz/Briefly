import { StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { useArticle } from "@/core/store/articleContext";
import { View, Text } from "@/components/Themed";
import { Image } from "expo-image";
import { parseArticleText } from "@/utils/articleText";
import Animated, { FadeInDown } from "react-native-reanimated";
import BackButton2 from "@/components/pressable/BackButton2";
import ArticleCategory from "@/components/Article/ArticleCategory";
import { dateFormat } from "@/utils/dateFormat";
import Colors from "@/core/constants/Colors";
import MenuButton from "@/components/SelectTopics/MenuButton";
import LinksModal from "@/components/Article/LinksModal";
import { router } from "expo-router";
import Persistent from "@/core/persistent";
import ArticleTextView from "@/components/Article/ArticleTextView";

const ArticleView = () => {
  const [openLinksModal, setOpenLinksModal] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { article } = useArticle();
  useEffect(() => {
    Persistent.Bookmarked.isArticleBookmarked(article).then((result) => {
      setIsBookmarked(result);
    });
  }, []);

  const onReportPress = () => {
    console.log("Report ");
    setMenuIsOpen(false);
    router.push("/(app)/ReportArticle");
  };

  const onExternalLinksPress = () => {
    console.log("External Links");
    setMenuIsOpen(false);
    setOpenLinksModal(true);
  };
  const handleCloseMenus = () => {
    console.log("Close Menus");
    setOpenLinksModal(false);
    setMenuIsOpen(false);
  };

  const onBookmarkPress = () => {
    Persistent.Bookmarked.toggleBookmark(article);
    setIsBookmarked((prev) => !prev);
    console.log("Bookmark");
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.light.background }}>
        <View style={[styles.backButton, styles.headerButton]}>
          <BackButton2 />
        </View>
        <View style={[styles.menu, styles.headerButton]}>
          <MenuButton
            onBookmarkPress={onBookmarkPress}
            onReportPress={() => onReportPress()}
            onExternalLinksPress={onExternalLinksPress}
            isBookmarked={isBookmarked}
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
          />
        </View>
        <Pressable onPress={() => handleCloseMenus()}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: article.image }} style={styles.ImageBackground} />
            <Container style={styles.container}>
              <Animated.View entering={FadeInDown} style={styles.header}>
                <ArticleCategory category={article.category} />
                <Text size={14} colorName="textMuted">
                  {dateFormat(article.publishDate)}
                </Text>
              </Animated.View>
              <Animated.View style={styles.heading} entering={FadeInDown.delay(200)}>
                <Text variant="title" size={24}>
                  {article.title.replaceAll("*", "")}
                </Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(500)} style={styles.articleTextContainer}>
                <ArticleTextView content={article.content} />
              </Animated.View>
            </Container>
          </View>
        </Pressable>
      </ScrollView>

      <LinksModal open={openLinksModal} links={article.sourceLinks} />
    </>
  );
};

export default ArticleView;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -25,
    paddingTop: 20,
    minHeight: "auto",
  },
  ImageBackground: {
    width: "100%",
    aspectRatio: 16 / 13,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  articleTextContainer: {
    width: "100%",
  },
  heading: {
    width: "100%",
  },
  headerButton: {
    position: "absolute",
    top: 60,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  backButton: {
    left: 20,
  },
  menu: {
    right: 20,
  },
});
