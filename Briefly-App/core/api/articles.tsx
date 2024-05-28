// import { articles } from "@/core/data/articles";
import apiClient from "./apiClient";
import { Article } from "@/types";

const ARTICLES_URL = "/articles?page=";

const getArticles = async (pageParam: any): Promise<Article[]> => {
  const response = await apiClient.get(ARTICLES_URL + pageParam);
  const { data: articles } = response;
  return articles;
};

export { getArticles };
