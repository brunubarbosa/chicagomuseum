import { GetStaticProps } from "next";
import { api } from "../../api";
import defaultImage from "../../default-image.jpg";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { DATE_FORMAT } from "../../constants/date";
import styles from "./Exhibition.module.scss";

export default function Home({ data: { data } }) {
  return (
    <div className={styles.wrapper}>
      <h1>{data.title}</h1>
      {`${format(parseISO(data.aic_start_at), DATE_FORMAT)} - ${format(
        parseISO(data.aic_end_at),
        DATE_FORMAT
      )}`}
      <div className={styles.detail}>
        <Image
          width={300}
          height={300}
          src={data.image_url || defaultImage}
          alt={"TODO"}
        />
        <p className={styles.description}>{data.description}</p>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const data = await api("get", `/exhibitions/${id}`, {});
  return {
    props: {
      data: data.data,
    },
    revalidate: 1000,
  };
};

export async function getStaticPaths() {
  const data = (await api("get", "/exhibitions", {})) as any;
  const paths = data.data.data?.map((data) => {
    return {
      params: { id: data.id.toString() },
    };
  });

  return { paths, fallback: "blocking" };
}
