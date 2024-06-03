import { useCallback } from "react";
import { useArticle } from "@/core/store/articleContext";
import { router } from "expo-router";
import { Article } from "@/types";

const useArticleHandlers = () => {
  const { setArticle } = useArticle();

  const handlePress = useCallback(
    (article: Article) => {
      setArticle(article);
      router.push("/(app)/ArticleView");
    },
    [setArticle]
  );

  return { handlePress };
};

export default useArticleHandlers;
