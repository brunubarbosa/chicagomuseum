import React from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { defaultQueryFn } from "../api";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { headerData } from "../constants/headerData";
import "../styles/global.scss";
function MyApp({ Component, pageProps }) {
  const { route, back } = useRouter();
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
        <Header goBack={back} headerData={headerData[route]} />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
