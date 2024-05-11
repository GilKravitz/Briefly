import { StyleSheet, ScrollView, TouchableWithoutFeedback, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Article } from "@/types";
import Container from "@/components/Container";
import { useArticle } from "@/core/store/articleContext";
import { View, Text } from "@/components/Themed";
import { Image } from "expo-image";
import { parseArticleText } from "@/utils/articleText";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArticleText } from "@/types";
import BackButton2 from "@/components/pressable/BackButton2";
import ArticleCategory from "@/components/Article/ArticleCategory";
import { dateFormat } from "@/utils/dateFormat";
import Colors from "@/core/constants/Colors";
import MenuButton from "@/components/SelectTopics/MenuButton";
import LinksModal from "@/components/Article/LinksModal";
import { router } from "expo-router";
import Persistent from "@/core/persistent";

type ArticleTextProps = {
  parsedArticle: ArticleText[];
};
const ArticleTextView = (props: ArticleTextProps) => {
  return (
    <>
      {props.parsedArticle.map((element, index) => (
        <View style={{ width: "100%" }} key={`articleBullet${index}`}>
          {element.subheading && (
            <Text variant="subheading" style={[{ fontWeight: "bold" }, styles.articleText]} size={18}>
              {element.subheading}
            </Text>
          )}
          {element.paragraph && <Text size={16}>{element.paragraph}</Text>}
          {element.bullets && (
            <View style={styles.bullets}>
              {element.bullets.map((bullet, i) => (
                <Text size={16} key={`articleBullet${index}_${i}`}>
                  • {bullet}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </>
  );
};
const ArticleView = () => {
  const [openLinksModal, setOpenLinksModal] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { article } = useArticle();
  const parsedArticle = parseArticleText(article.article);

  useEffect(() => {
    // Persistent.Bookmarked.isArticleBookmarked(article).then((result) => {
    // setIsBookmarked(result);
    // });
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
    // Persistent.Bookmarked.toggleBookmark(article);
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
            <Image source={{ uri: article.s3_image }} style={styles.ImageBackground} />
            <Container style={styles.container}>
              <Animated.View entering={FadeInDown} style={styles.header}>
                <ArticleCategory category={article.category} />
                <Text size={14} colorName="textMuted">
                  {dateFormat(article.publish_date)}
                </Text>
              </Animated.View>
              <Animated.View style={styles.heading} entering={FadeInDown.delay(200)}>
                <Text variant="title" size={24}>
                  {article.title}
                </Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(500)} style={styles.articleText}>
                <ArticleTextView parsedArticle={parsedArticle} />
              </Animated.View>
            </Container>
          </View>
        </Pressable>
      </ScrollView>

      <LinksModal open={openLinksModal} links={article.links} />
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
  heading: {
    width: "100%",
  },
  articleText: {
    width: "100%",
  },
  bullets: {
    marginRight: 15,
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
