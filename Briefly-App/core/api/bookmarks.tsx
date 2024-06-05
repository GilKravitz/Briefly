import apiClient from "./apiClient";

export const getBookmarked = async (): Promise<any> => {
  const response = await apiClient.get("/bookmarks");
  return response.data;
};

// set bookmark for article
export const setBookmark = async (id: string) => {
  const response = await apiClient.post(`/bookmarks/${id}`);
  return response.data;
};

// remove bookmark for article
export const removeBookmark = async (id: string) => {
  const response = await apiClient.delete(`/bookmarks/${id}`);
  return response.data;
};
