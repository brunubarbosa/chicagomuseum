import { GetStaticProps } from "next";
import { api } from "../../api";
import defaultImage from "../../public/default-image.jpg";
import Image from "next/image";
import styles from "./Exhibition.module.scss";
import { getExhibitionDateFormated } from "../../utils/date";

// API data types should be coming from some external library
export default function Home({ data }: any) {
  const { aic_start_at, aic_end_at, title, image_url, description } = data.data;
  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      {getExhibitionDateFormated({ aic_start_at, aic_end_at })}
      <div className={styles.detail}>
        <Image
          width={300}
          height={300}
          src={image_url || defaultImage}
          alt={description || "Museum photo"}
        />
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const data = await api("get", `/exhibitions/${id}`).catch((e) =>
    console.error(e)
  );
  return {
    props: {
      data: data ? data.data : null,
    },
    revalidate: 1000,
    notFound: !data,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
