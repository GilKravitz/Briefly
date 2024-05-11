import AsyncStorage from "@react-native-async-storage/async-storage";
const FIRST_TIME_USER_KEY = "FIRST_TIME_USER";

export const isFirstTimeUser = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(FIRST_TIME_USER_KEY);
    return value === null;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const setNotFirstTimeUser = async () => {
  try {
    await AsyncStorage.setItem(FIRST_TIME_USER_KEY, "false");
  } catch (e) {
    console.log(e);
  }
};

export const removeFirstTimeUser = async () => {
  try {
    await AsyncStorage.removeItem(FIRST_TIME_USER_KEY);
  } catch (e) {
    console.log(e);
  }
};
