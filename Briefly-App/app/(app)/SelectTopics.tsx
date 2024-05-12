import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { t } from "@/core/i18n";
import TagSelect from "@/components/SelectTopics/TopicSelect";
import Button from "@/components/pressable/Button";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { topics } from "@/core/constants/topics";
import Persistent from "@/core/persistent";
import { Topic, topicsDict } from "@/types";
import { View, Text } from "@/components/Themed";
import LottieView from "lottie-react-native";

const SelectTopics = () => {
  const [selectedTopics, setSelectedTopics] = useState<topicsDict>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSelectedTopicFromStorage = async () => {
      const selectedTopicsFromStorage = await Persistent.SelectedTopic.getSelectedTopics();
      setSelectedTopics(selectedTopicsFromStorage);
      setTimeout(() => setLoading(false), 1000);
    };
    loadSelectedTopicFromStorage();
  }, []);

  const handlePress = async (topic: Topic, isSelected: boolean) => {
    const updatedSelectedTopic = { ...selectedTopics };
    if (isSelected) {
      updatedSelectedTopic[topic.id] = topic;
      setSelectedTopics(updatedSelectedTopic);
    } else {
      delete updatedSelectedTopic[topic.id];
      setSelectedTopics(updatedSelectedTopic);
    }
  };

  const saveSelectedTopics = async () => {
    await Persistent.SelectedTopic.setSelectTopics(selectedTopics);
    router.replace("/(tabs)/");
  };

  if (loading) {
    return (
      <Container>
        <View style={styles.lottieContainer}>
          <LottieView style={styles.lottie} source={require("@/assets/lottie/settings.json")} autoPlay loop />
        </View>
      </Container>
    );
  }
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
            selected={`${topic.id}` in selectedTopics}
          />
        ))}
      </View>
      <Button style={styles.nextButton} onPress={() => saveSelectedTopics()}>
        {t.selectTopics.btnText}
      </Button>
    </Container>
  );
};

export default SelectTopics;

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
