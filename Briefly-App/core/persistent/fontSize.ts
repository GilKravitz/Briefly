import AsyncStorage from "@react-native-async-storage/async-storage";

const FONT_SIZE_KEY = "FONT_SIZE";

export const saveFontSize = async (fontSize: number) => {
  await AsyncStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
};

export const getFontSize = async (): Promise<number | null> => {
  const fontSize = await AsyncStorage.getItem(FONT_SIZE_KEY);
  return fontSize ? parseInt(fontSize) : null;
};
