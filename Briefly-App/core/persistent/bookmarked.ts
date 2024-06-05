import { Article } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARKED_KEY = "ARTICLE_BOOKMARKED";

const getAllBookmarkedKeys = async (): Promise<string[]> => {
  const allKeys = await AsyncStorage.getAllKeys();
  const bookmarkedKeys = allKeys.filter((key) => key.includes(BOOKMARKED_KEY));
  return bookmarkedKeys;
};

export const getAllBookmarked = async (): Promise<Article[]> => {
  const keys = await getAllBookmarkedKeys();
  const data = await AsyncStorage.multiGet(keys);
  const articles = data.map((article) => article[1] && JSON.parse(article[1]));
  // sort by date in descending order
  articles.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
  return articles;
};

const bookmarkArticle = async (article: Article) => {
  try {
    const key = article.id;
    await AsyncStorage.setItem(`${BOOKMARKED_KEY}_${key}`, JSON.stringify(article));
  } catch (e) {
    console.log(e);
  }
};
const removeArticleBookmark = async (article: Article) => {
  try {
    const key = article.id;
    await AsyncStorage.removeItem(`${BOOKMARKED_KEY}_${key}`);
  } catch (e) {
    console.log(e);
  }
};

export const isArticleBookmarked = async (article: Article): Promise<boolean> => {
  try {
    const key = article.id;
    const storedArticle = await AsyncStorage.getItem(`${BOOKMARKED_KEY}_${key}`);
    return storedArticle !== null;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const toggleBookmark = async (article: Article) => {
  const isBookmarked = await isArticleBookmarked(article);
  if (isBookmarked) {
    await removeArticleBookmark(article);
  } else {
    await bookmarkArticle(article);
  }
  return !isArticleBookmarked;
};

export const clearAllBookmarked = async () => {
  try {
    const keys = await getAllBookmarkedKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(e);
  }
};

export const consoleLogAllBookmarked = async () => {
  const keys = await getAllBookmarkedKeys();
  const articles = await AsyncStorage.multiGet(keys);
  console.log(articles);
};
