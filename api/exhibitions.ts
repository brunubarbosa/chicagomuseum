import { useInfiniteQuery } from "react-query";
import { defaultQueryFn } from "../api";

interface Exhibition {
  pagination: {
    current_page: number;
  };
}
interface LastPageData {
  data: Exhibition;
  previousId: string | null;
}

export const useExhibitions = () => {
  return useInfiniteQuery(["GET", `/exhibitions`], {
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
    getNextPageParam: (lastPage: LastPageData) =>
      lastPage.data.pagination.current_page + 1,
    queryFn: (page) => {
      const nextPage = page.pageParam || 1;
      return defaultQueryFn({
        ...page,
        queryKey: [...page.queryKey, { page: nextPage }],
      });
    },
  });
};
