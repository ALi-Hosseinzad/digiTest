import dynamic from 'next/dynamic';
import Head from 'next/head';
import PageLayout from './src/pageComponent/pageLayout';

const List = dynamic(() => import('./src/pageComponent/ListEnters'));

export default function ListPage() {
  return (
    <PageLayout>
      <Head>
        <title>Digi Test-List</title>
      </Head>
      <List />
    </PageLayout>
  );
}
