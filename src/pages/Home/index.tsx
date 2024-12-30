import { Page } from 'components/ui';
import PostList from 'components/PostList';
import Banner from 'components/Banner';

export default function Home() {
  return (
    <Page>
      <Banner />
      <PostList />
    </Page>
  );
}
