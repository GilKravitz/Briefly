import useArticleHandlers from "@/core/hooks/useArticleHandlers";
import useArticleQuery from "@/core/hooks/useArticleQuery";

const useArticleList = () => {
  const { handlePress } = useArticleHandlers();
  const { data, error, fetchNextPage, refetch, hasNextPage, isFetching, isFetchingNextPage, status } =
    useArticleQuery();

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

export default useArticleList;
