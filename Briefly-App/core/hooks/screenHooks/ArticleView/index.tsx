import API from "@/core/api";
import { Bookmarked } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

const useBookmarked = () => {
  const { mutate, status, error } = useMutation({
    mutationFn: (articleData: Bookmarked) => {
      if (articleData.isBookmarked) return API.Bookmarks.addBookmark(articleData.id);
      return API.Bookmarks.removeBookmark(articleData.id);
    },
    onSuccess: (data: string) => {
      console.log("Bookmarked:", data);
    },
    onError: (error) => console.log("bookmarked error:", error.message),
  });

  return { status, error, mutate };
};

const onSuccessfuReport = async (data: string) => {
  console.log("Reported:", data);
  setTimeout(() => {
    router.back();
  }, 1500);
};

const useReportArticle = () => {
  const { mutate, status, error } = useMutation({
    mutationFn: (articleData: { articleId: number; reason: string }) => {
      return API.Articles.reportArticle(articleData.articleId, articleData.reason);
    },
    onSuccess: (data: string) => {
      onSuccessfuReport(data);
    },
    onError: (error) => console.log("report error:", error.message),
  });

  return { status, error, mutate };
};

export { useBookmarked, useReportArticle };
