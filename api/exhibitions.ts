import { useQuery } from "react-query";

export const useExhibitions = () => {
  return useQuery(["GET", "/exhibitions"]) as any;
};
