import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../api";

export default function Home({ data: { data } }) {
  const router = useRouter();
  const props = router.query;
  return (
    <div className={"styles.container"}>
      <Link href="/">
        <a>Home {data.id}</a>
      </Link>
      <div>{data.description}</div>
      <div>{data.title}</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const data = await api("get", `/exhibitions/${id}`, {});
  await setTimeout(() => {}, 5000);

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
