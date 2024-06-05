import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_TOKEN_KEY = "USER_TOKEN";
// save user token to local storage

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(USER_TOKEN_KEY, token);
};
// get user token from local storage

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(USER_TOKEN_KEY);
};
// remove user token from local storage

export const removeToken = async () => {
  await AsyncStorage.removeItem(USER_TOKEN_KEY);
};
