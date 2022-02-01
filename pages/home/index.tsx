import React from "react";
import Card from "../../components/Card";
import { useExhibitions } from "../../api/exhibitions";
import { useRouter } from "next/router";
import styles from "./Home.module.scss";
import Button from "../../components/Button";
import defaultImage from "../../public/default-image.jpg";
import { getExhibitionDateFormated } from "../../utils/date";

interface ApiDataMock {
  data: {
    data: any[];
  };
}
interface PageProps {
  data: ApiDataMock;
}

export default function Home() {
  const router = useRouter();
  const { data, isLoading, isFetching, fetchNextPage, isFetchingNextPage } =
    useExhibitions();
  const loadMore = () => fetchNextPage();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.gridWrapper}>
        {/* // TODO: on data coming fro API type axios service removing data statement*/}
        {data?.pages.map((page) => {
          return (page as ApiDataMock).data.data.map(
            ({ id, image_url, title, aic_start_at, aic_end_at }) => {
              return (
                <div
                  className={styles.cardWrapper}
                  key={id}
                  onClick={() => router.push(`/exhibition/${id}`)}
                >
                  <Card
                    image={image_url || defaultImage}
                    description={getExhibitionDateFormated({
                      aic_start_at,
                      aic_end_at,
                    })}
                    title={title}
                  />
                </div>
              );
            }
          );
        })}
      </div>
      <Button kind="primary" onClick={loadMore} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? "loading more..." : "load more"}{" "}
      </Button>
    </div>
  );
}
