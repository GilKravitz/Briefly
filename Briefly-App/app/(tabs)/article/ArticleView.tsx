import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import React from "react";
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
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import ArticleCategory from "@/components/Feed/ArticleCategory";
import { dateFormat } from "@/utils/dateFormat";
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
  const { article } = useArticle();
  const parsedArticle = parseArticleText(article.article);

  return (
    <ScrollView>
      <View style={styles.backButton}>
        <BackButton2 />
      </View>
      <Image source={{ uri: article.s3_image }} style={styles.ImageBackground} />
      <Container style={styles.container}>
        <Animated.View entering={FadeInDown} style={styles.header}>
          <ArticleCategory category={article.category} />
          <Text size={14} colorName="textMuted">
            {article.publish_date}
          </Text>
        </Animated.View>
        <Animated.View style={styles.heading} entering={FadeInDown.delay(200)}>
          <Heading size={24}>{article.title}</Heading>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(500)} style={styles.articleText}>
          <ArticleTextView parsedArticle={parsedArticle} />
        </Animated.View>
      </Container>
    </ScrollView>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 50,
  },
});
