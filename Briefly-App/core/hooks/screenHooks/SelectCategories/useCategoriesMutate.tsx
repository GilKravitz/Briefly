import API from "@/core/api";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

const useCategoriesMutate = () => {
  const onSucess = () => {
    setTimeout(() => {
      router.push("(tabs)/");
    }, 1500);
  };

  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (data: string[]) => API.Categories.putCategories(data),
    onError: (error) => console.log("screen", error.message),
    onSuccess: onSucess,
  });

  return { mutate, status, apiError };
};

export default useCategoriesMutate;
