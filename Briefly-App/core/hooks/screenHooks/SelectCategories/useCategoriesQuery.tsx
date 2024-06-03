import { getAllCategories, getCategories } from "@/core/api/categories";
import { useQuery } from "@tanstack/react-query";

const useCategoriesQuery = (queryKey = "categories") => {
  const { data, error, status, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: getCategories,
  });
  return { data, error, status, refetch };
};

export default useCategoriesQuery;
