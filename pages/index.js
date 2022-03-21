import dynamic from "next/dynamic";
import Head from "next/head";
import PageLayout from "./src/pageComponent/pageLayout";

const Landing = dynamic(() => import("./src/pageComponent/Landing"), {
  ssr: false,
});
export default function Home() {
  return (
    <PageLayout>
      <Head>
        <title>Digi Test</title>
        <meta name="digi-test" content="ali hosseinzad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </PageLayout>
  );
}
