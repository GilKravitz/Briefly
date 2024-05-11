import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_TOKEN_KEY = "USER_TOKEN";
// save user token to local storage

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(USER_TOKEN_KEY, token);
  } catch (e) {
    console.log(e);
  }
};
// get user token from local storage

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_TOKEN_KEY);
  } catch (e) {
    console.log(e);
    return null;
  }
};
// remove user token from local storage

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
  } catch (e) {
    console.log(e);
  }
};
