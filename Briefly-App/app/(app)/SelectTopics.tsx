import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Container from "@/components/Container";
import { t } from "@/core/i18n";
import TagSelect from "@/components/SelectTopics/TopicSelect";
import Button from "@/components/pressable/Button";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { topics } from "@/core/constants/topics";
import Persistent from "@/core/persistent";
import { Topic, topicsDict } from "@/types";
import { View, Text } from "@/components/Themed";

const index = () => {
  const [selectedTopics, setSelectedTopics] = React.useState<topicsDict>({});
  useEffect(() => {
    // const loadSelectedTopicFromStorage = async () => {
    //   const selectedTopics = await Persistent.SelectedTopic.getSelectedTopics();
    //   setSelectedTopics(selectedTopics);
    // };
    // loadSelectedTopicFromStorage();
  }, []);

  const handlePress = (topic: Topic, isSelected: boolean) => {
    // console.log(tag, isSelected);
    if (isSelected) {
      setSelectedTopics({ ...selectedTopics, [topic.id]: topic });
      // Persistent.SelectedTopic.selectTopic(topic);
    } else {
      // setSelectedTopics(selectedTopics.filter((topic) => topic.name !== topic.name));
      delete selectedTopics[topic.id];
      setSelectedTopics({ ...selectedTopics });
      // Persistent.SelectedTopic.removeTopic(topic);
    }
  };

  return (
    <Container>
      <Animated.View entering={FadeInDown} style={styles.headingContainer}>
        <Text variant="title" style={styles.title}>
          {t.selectTopics.title}
        </Text>
        <Text variant="heading" style={styles.subheading} size={20}>
          {t.selectTopics.subheading}
        </Text>
      </Animated.View>
      <View style={styles.tagsContainer}>
        {topics.map((topic, i) => (
          <TagSelect
            entering={FadeInDown.delay(100 + i * 100)}
            key={topic.name}
            label={topic.name}
            onPress={(isSelected) => handlePress(topic, isSelected)}
            selected={false}
          />
        ))}
      </View>
      <Button style={styles.nextButton} onPress={() => router.replace("/(tabs)/ArticleList")}>
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
    marginTop: 5,
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
    alignSelf: "center",
  },
  lottieContainer: {
    position: "absolute",
    alignItems: "center",
    top: "30%",
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
