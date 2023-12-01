import BottomNav from '../BottomNav/BottomNav';
import Posts from '../Posts/Posts';
import AppHeader from '../appHeader/appHeader';
import data from '../../data';
// TO DO remplacer la data far un fetch axios
// import { useAppSelector } from '../../hooks/redux';

function Home() {
  // const recipes = useAppSelector((state) => state.recipes.list);
  return (
    <div className="home">
      <AppHeader />
      <Posts posts={data} />;
    </div>
  );
}

export default Home;
