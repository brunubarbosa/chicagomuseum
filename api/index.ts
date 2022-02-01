import axios, { Method, AxiosResponse } from "axios";

const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANALYTICS_ID,
});

export const api = <T>(
  method: Method,
  url: string,
  params: any
): Promise<AxiosResponse<T>> => {
  return apiConfig.request<T>({
    method,
    url,
    params,
  });
};

export const defaultQueryFn = async ({
  queryKey,
  pageParam = 0,
}: any): Promise<unknown> => {
  console.log("---", queryKey[2]);
  const data = await api(queryKey[0], queryKey[1], queryKey[2]);
  return data;
};
