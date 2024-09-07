import useArticleHandlers from "@/core/hooks/useArticleHandlers";
import useBookmarksQuery from "../../useBookmarksQuery";

const useBookmarksList = () => {
  const { handlePress } = useArticleHandlers();
  const { data, error, fetchNextPage, refetch, hasNextPage, isFetching, isFetchingNextPage, status } =
    useBookmarksQuery();

  return {
    handlePress,
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export default useBookmarksList;
