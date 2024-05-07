import { StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Article } from "@/types";
import Container from "@/components/Container";
import { useArticle } from "@/store/articleContext";
import { Text, Heading } from "@/components/StyledText";
import { View } from "@/components/Themed";
import { Image } from "expo-image";
import { parseArticleText } from "@/utils/articleText";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArticleText } from "@/types";
import BackButton2 from "@/components/pressable/BackButton2";
import ArticleCategory from "@/components/Article/ArticleCategory";
import { dateFormat } from "@/utils/dateFormat";
import Colors from "@/constants/Colors";
import MenuButton from "@/components/SelectTopics/MenuButton";
import LinksModal from "@/components/Article/LinksModal";
import { router } from "expo-router";
// create Animated.Heading component

type ArticleTextProps = {
  parsedArticle: ArticleText[];
};
const ArticleTextView = (props: ArticleTextProps) => {
  return (
    <>
      {props.parsedArticle.map((element, index) => (
        <View style={{ width: "100%" }} key={`articleBullet${index}`}>
          {element.subheading && (
            <Heading style={styles.articleText} size={20}>
              {element.subheading}
            </Heading>
          )}
          {element.paragraph && <Text size={18}>{element.paragraph}</Text>}
          {element.bullets && (
            <View style={styles.bullets}>
              {element.bullets.map((bullet, i) => (
                <Text size={18} key={`articleBullet${index}_${i}`}>
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
  const { article } = useArticle();
  const parsedArticle = parseArticleText(article.article);

  const onReportPress = () => {
    console.log("Report ");
    setMenuIsOpen(false);
    router.navigate("/(tabs)/Article/ReportArticle");
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
  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.light.background }}>
        <View style={[styles.backButton, styles.headerButton]}>
          <BackButton2 />
        </View>
        <View style={[styles.menu, styles.headerButton]}>
          <MenuButton
            onBookmarkPress={() => {
              console.log("Bookmark");
            }}
            onReportPress={() => onReportPress()}
            onExternalLinksPress={onExternalLinksPress}
            // TODO: Implement bookmarked state
            isBookmarked={false}
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
          />
        </View>
        <TouchableWithoutFeedback style={{ borderWidth: 5, borderColor: "red" }} onPress={handleCloseMenus}>
          <View>
            <Image source={{ uri: article.s3_image }} style={styles.ImageBackground} />
            <Container style={styles.container}>
              <Animated.View entering={FadeInDown} style={styles.header}>
                <ArticleCategory category={article.category} />
                <Text size={14} colorName="textMuted">
                  {dateFormat(article.publish_date)}
                </Text>
              </Animated.View>
              <Animated.View style={styles.heading} entering={FadeInDown.delay(200)}>
                <Heading size={24}>{article.title}</Heading>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(500)} style={styles.articleText}>
                <ArticleTextView parsedArticle={parsedArticle} />
              </Animated.View>
            </Container>
          </View>
        </TouchableWithoutFeedback>
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
    alignItems: "flex-start",
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
