import { useInfiniteQuery } from "@tanstack/react-query";

import { Article } from "@/types";
import { getBookmarks } from "../api/bookmarks";

const useBookmarksQuery = (queryKey = "bookmarks") => {
  const { data, error, fetchNextPage, refetch, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<
    Article[],
    Error
  >({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => getBookmarks(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length + 1; // Assuming you use the page number for pagination
    },
  });

  return { data, error, fetchNextPage, refetch, hasNextPage, isFetching, isFetchingNextPage, status };
};

export default useBookmarksQuery;
