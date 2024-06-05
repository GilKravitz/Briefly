import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_EMAIL_KEY = "USER_CREDENTIALS_EMAIL";
const USER_PASSWORD_KEY = "USER_CREDENTIALS_PASSWORD";
// save user email to local storage

const saveEmail = async (email: string) => {
  await AsyncStorage.setItem(USER_EMAIL_KEY, email);
};

const getEmail = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(USER_EMAIL_KEY);
};

const removeEmail = async () => {
  await AsyncStorage.removeItem(USER_EMAIL_KEY);
};

const savePassword = async (password: string) => {
  await AsyncStorage.setItem(USER_PASSWORD_KEY, password);
};

const getPassword = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(USER_PASSWORD_KEY);
};

const removePassword = async () => {
  await AsyncStorage.removeItem(USER_PASSWORD_KEY);
};

export const saveCredentials = async (email: string, password: string) => {
  await saveEmail(email);
  await savePassword(password);
};

export const getCredentials = async (): Promise<{ email: string | null; password: string | null }> => {
  const email = await getEmail();
  const password = await getPassword();
  return { email, password };
};

export const removeCredentials = async () => {
  await removeEmail();
  await removePassword();
};
