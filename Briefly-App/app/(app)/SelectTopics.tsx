import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Heading, Heading2 } from "@/components/StyledText";
import { t } from "@/i18n";
import TagSelect from "@/components/SelectTopics/TopicSelect";
import Button from "@/components/pressable/Button";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutUp } from "react-native-reanimated";

const tags = ["Tech", "Economics", "Politics", "Sport", "Food"];
const index = () => {
  return (
    <Container>
      <Animated.View entering={FadeInDown} style={styles.headingContainer}>
        <Heading style={styles.title}>{t.selectTopics.title}</Heading>
        <Heading2 style={styles.subheading} size={20}>
          {t.selectTopics.subheading}
        </Heading2>
      </Animated.View>
      <Animated.View entering={FadeOut.delay(1500)}>
        <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/settings.json")} />
      </Animated.View>
      <View style={styles.tagsContainer}>
        {tags.map((tag, i) => (
          <TagSelect
            entering={FadeInDown.delay(1500 + i * 100)}
            key={tag}
            label={tag}
            onPress={(isSelected) => console.log(tag, isSelected)}
            selected={false}
          />
        ))}
      </View>
      <Button style={styles.nextButton} onPress={() => router.replace("/(tabs)/Article/ArticleList")}>
        {t.selectTopics.btnText}
      </Button>
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  headingContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
  },
  subheading: {
    marginTop: 10,
  },
  tagsContainer: {
    marginTop: 50,
    width: "100%",
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  nextButton: {
    marginTop: 20,
    // width: 175,
    alignSelf: "center",
  },
  lottie: {
    width: 300,
    height: 300,
    alignSelf: "center",
    position: "absolute",
    top: "33%",
  },
});
