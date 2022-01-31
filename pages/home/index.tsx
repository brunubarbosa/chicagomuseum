import React from "react";
import Card from "../../components/Card";
import { useExhibitions } from "../../api/exhibitions";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import styles from "./Home.module.scss";
import { DATE_FORMAT } from "../../constants/date";

export default function Home() {
  const router = useRouter();
  const { data, isLoading, isFetching } = useExhibitions();
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.wrapper}>
      {/* // TODO */}
      {data?.data.data.map(
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
                description={`${format(
                  parseISO(aic_start_at),
                  DATE_FORMAT
                )} - ${format(parseISO(aic_end_at), DATE_FORMAT)}`}
                title={title}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
