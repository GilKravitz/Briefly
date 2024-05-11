import AsyncStorage from "@react-native-async-storage/async-storage";
import { Topic, topicsDict } from "../../types";

const SELECTED_TOPICS_KEY = "SELECTED_TOPICS";

const getAllTopicsKeys = async (): Promise<string[]> => {
  let topicKeys: string[] = [];
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    topicKeys = allKeys.filter((key) => key.includes(SELECTED_TOPICS_KEY));
  } catch (e) {
    console.log(e);
  }
  return topicKeys;
};

export const getSelectedTopics = async (): Promise<topicsDict> => {
  try {
    // return a dictionary of selected topics with topic id as key
    const keys = await getAllTopicsKeys();
    const data = await AsyncStorage.multiGet(keys);
    const topics: topicsDict = {};
    data.forEach((topic) => {
      const topicObj = topic[1] && JSON.parse(topic[1]);
      topics[topicObj.id] = topicObj;
    });
    return topics;
  } catch (e) {
    console.log(e);
    return {};
  }
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
    const keys = await getAllTopicsKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(e);
  }
};
