import Content from './Content';
import Publish from './Content/Publish';
import Filter from './Filter';
import Header from './Header';

export default function Home() {
  return (
    <div>
      <Header />
      <Filter />
      <Content />
    </div>
  );
}
