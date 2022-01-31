import React from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { defaultQueryFn } from "../api";

function MyApp({ Component, pageProps }) {
  const queryClient = React.useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: defaultQueryFn,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydrateState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
