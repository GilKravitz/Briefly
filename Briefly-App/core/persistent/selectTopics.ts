import AsyncStorage from "@react-native-async-storage/async-storage";
import { Topic } from "../../types";

const SELECTED_TOPICS_KEY = "SELECTED_TOPICS";

// check if user has selected topics before
const getAllTopics = async (): Promise<string[]> => {
  let topicKeys: string[] = [];
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    topicKeys = allKeys.filter((key) => key.includes(SELECTED_TOPICS_KEY));
  } catch (e) {
    console.log(e);
  }
  return topicKeys;
};

export const getSelectedTopics = async (): Promise<Topic[]> => {
  const keys = await getAllTopics();
  const data = await AsyncStorage.multiGet(keys);
  const topics = data.map((topic) => topic[1] && JSON.parse(topic[1]));
  return topics;
};

export const selectTopic = async (topic: Topic) => {
  try {
    await AsyncStorage.setItem(`${SELECTED_TOPICS_KEY}_${topic.name}`, JSON.stringify(topic));
  } catch (e) {
    console.log(e);
  }
};

export const removeTopic = async (topic: Topic) => {
  try {
    await AsyncStorage.removeItem(`${SELECTED_TOPICS_KEY}_${topic.name}`);
  } catch (e) {
    console.log(e);
  }
};

export const clearAllSelectedTopics = async () => {
  try {
    const keys = await getAllTopics();
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(e);
  }
};
