import Posts from '../Posts/Posts';
import AppHeader from '../appHeader/appHeader';
// import data from '../../data';
import './Home.scss';
import { useAppSelector } from '../../hooks/redux';

function Home() {
  const posts = useAppSelector((state) => state.posts.list);
  return (
    <div className="home">
      <AppHeader />
      <Posts posts={posts} />
    </div>
  );
}

export default Home;
