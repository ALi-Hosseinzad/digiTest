import dynamic from "next/dynamic";
import Head from "next/head";
import PageLayout from "./src/pageComponent/pageLayout";

const Login = dynamic(() => import("./src/pageComponent/Login"));

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Digi Test-Login</title>
      </Head>
      <Login />
    </>
  );
}
