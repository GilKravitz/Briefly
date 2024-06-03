import { useState } from "react";

const useCategoriesState = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const addCategory = (category: string) => {
    setCategories((prev) => [...prev, category]);
  };

  const removeCategory = (category: string) => {
    setCategories((prev) => prev.filter((c) => c !== category));
  };

  const isCategorySelected = (category: string) => categories.includes(category);
  return { categories, setCategories, addCategory, removeCategory, isCategorySelected };
};

export default useCategoriesState;
