import apiClient from "./apiClient";

export const getBookmarks = async (pageParam: any): Promise<any> => {
  const response = await apiClient.get(`/bookmarks?i_PageNumber=${pageParam}`);
  return response.data;
};

// set bookmark for article
export const addBookmark = async (articleId: number): Promise<string> => {
  const response = await apiClient.post(`/bookmarks`, { articleId });
  return response.data;
};

// remove bookmark for article
export const removeBookmark = async (i_ArticleId: number): Promise<string> => {
  const response = await apiClient.delete(`/bookmarks?i_ArticleId=${i_ArticleId}`);
  return response.data;
};
