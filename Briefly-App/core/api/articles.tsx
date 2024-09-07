// import { articles } from "@/core/data/articles";
import apiClient from "./apiClient";
import { Article } from "@/types";

const ARTICLES_URL = "/articles";

const getArticles = async (pageParam: any): Promise<Article[]> => {
  const response = await apiClient.get(`${ARTICLES_URL}?i_PageNumber=${pageParam}`);
  const { data: articles } = response;
  return articles;
};

const reportArticle = async (articleId: number, reason: string): Promise<string> => {
  const response = await apiClient.post(`${ARTICLES_URL}/report`, { articleId, reason });
  return response.data;
};

export { getArticles, reportArticle };
