import axios, { Method, AxiosResponse } from "axios";

const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANALYTICS_ID,
});

interface ApiParams {
  page: number;
}

export const api = <T>(
  method: Method,
  url: string,
  params?: ApiParams
): Promise<AxiosResponse<T>> => {
  return apiConfig.request<T>({
    method,
    url,
    params,
  });
};

export const defaultQueryFn = async ({ queryKey }: any): Promise<unknown> => {
  const data = await api(queryKey[0], queryKey[1], queryKey[2]);
  return data;
};
