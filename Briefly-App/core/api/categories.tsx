import apiClient from "./apiClient";

export const getCategories = async (): Promise<any> => {
  const response = await apiClient.get("/categories");
  return response.data;
};

// set bookmark for article
export const addCategory = async (id: string) => {
  const response = await apiClient.post(`/categories/${id}`);
  return response.data;
};

// remove bookmark for article
export const removeCategory = async (id: string) => {
  const response = await apiClient.delete(`/categories/${id}`);
  return response.data;
};
