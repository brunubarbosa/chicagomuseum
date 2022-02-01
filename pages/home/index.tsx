import React from "react";
import Card from "../../components/Card";
import { useExhibitions } from "../../api/exhibitions";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import styles from "./Home.module.scss";
import { DATE_FORMAT } from "../../constants/date";
import Button from "../../components/Button";

export default function Home() {
  const router = useRouter();
  const { data, isLoading, isFetching, fetchNextPage, isFetchingNextPage } =
    useExhibitions();
  const loadMore = () => fetchNextPage();

  const getExhibitionDateFormated = ({ aic_start_at, aic_end_at }) => {
    const startDate = aic_start_at
      ? format(parseISO(aic_start_at), DATE_FORMAT)
      : "-";

    const endDate = aic_end_at
      ? format(parseISO(aic_end_at), DATE_FORMAT)
      : "-";

    return `${startDate} - ${endDate}`;
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.gridWrapper}>
        {/* // TODO */}
        {data?.pages.map((page) => {
          return page.data.data.map(
            ({ id, image_url, title, aic_start_at, aic_end_at }) => {
              return (
                <div
                  className={styles.cardWrapper}
                  key={id}
                  onClick={() => router.push(`/exhibition/${id}`)}
                >
                  <Card
                    // todo
                    image={image_url || ""}
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
