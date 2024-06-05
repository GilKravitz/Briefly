import apiClient from "./apiClient";

export const getAllCategories = async (): Promise<any> => {
  const response = await apiClient.get("/PreferredCategories/all");
  return response.data;
};

export const getCategories = async (): Promise<any> => {
  const response = await apiClient.get("/PreferredCategories");
  return response.data;
};

export const putCategories = async (data: string[]): Promise<any> => {
  const response = await apiClient.put("/PreferredCategories", { preferredCategories: data });
  return response.data;
};
