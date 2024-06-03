import { useCallback, useEffect } from "react";
import useCategoriesMutate from "./useCategoriesMutate";
import useCategoriesQuery from "./useCategoriesQuery";
import useCategoriesState from "./useCategoriesState";

const useSelectCategories = () => {
  const { data, error, status, refetch } = useCategoriesQuery();
  const { mutate, status: mutationStatus, apiError } = useCategoriesMutate();
  const { categories, isCategorySelected, setCategories, addCategory, removeCategory } = useCategoriesState();

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setCategories(data);
    }
  }, [data]);

  const handleSaveCategories = useCallback(() => {
    console.log("mutate with:", categories);
    mutate(categories);
  }, [mutate, categories]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleCategorySelection = (isSelected: boolean, category: string) => {
    console.log("handle", category);
    if (isSelected) {
      addCategory(category);
    } else {
      removeCategory(category);
    }
  };

  return {
    error,
    status,
    refetch,
    categories,
    isCategorySelected,
    handleSaveCategories,
    mutationStatus,
    apiError,
    handleCategorySelection,
  };
};

export default useSelectCategories;
