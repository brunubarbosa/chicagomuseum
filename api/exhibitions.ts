import { useInfiniteQuery } from "react-query";
import { defaultQueryFn } from "../api";

export const useExhibitions = () => {
  return useInfiniteQuery(["GET", `/exhibitions`], {
    getPreviousPageParam: (firstPage: any) => firstPage.previousId ?? false,
    getNextPageParam: (lastPage: any) =>
      lastPage.data.pagination.current_page + 1,
    queryFn: (page: any) => {
      const nextPage = page.pageParam || 1;
      return defaultQueryFn({
        ...page,
        queryKey: [...page.queryKey, { page: nextPage }],
      });
    },
  });
};
