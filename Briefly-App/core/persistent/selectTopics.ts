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

export const setSelectTopics = async (topics: topicsDict) => {
  try {
    await removeAllSelectedTopics();
    const keys = Object.keys(topics);
    if (keys.length === 0) return;
    const data: [string, string][] = keys.map((key) => [`${SELECTED_TOPICS_KEY}_${key}`, JSON.stringify(topics[key])]);
    await AsyncStorage.multiSet(data);
    console.log("selected topics saved", topics);
  } catch (e) {
    console.log(e);
  }
};

export const removeAllSelectedTopics = async () => {
  try {
    const keys = await getAllTopicsKeys();
    await AsyncStorage.multiRemove(keys);
    console.log("removed all selected topics", keys);
  } catch (e) {
    console.log(e);
  }
};
