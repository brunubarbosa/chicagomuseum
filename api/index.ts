import axios, { Method, AxiosResponse } from "axios";

const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANALYTICS_ID,
});

export const api = <T>(
  method: Method,
  url: string,
  params: any
): Promise<AxiosResponse<T>> => {
  // apiConfig
  //   .request<T>({
  //     method,
  //     url,
  //     params,
  //   })
  //   .then((res) => console.log(res.data));
  return apiConfig.request<T>({
    method,
    url,
    params,
  });
};

// Define a default query function that will receive the query key
export const defaultQueryFn = async ({ queryKey }: any): Promise<unknown> => {
  const data = await api(queryKey[0], queryKey[1], queryKey[2]);
  return data;
};
