import BottomNav from '../BottomNav/BottomNav';
import Posts from '../Posts/Posts';
import AppHeader from '../appHeader/appHeader';

// import { useAppSelector } from '../../hooks/redux';

function Home() {
  // const recipes = useAppSelector((state) => state.recipes.list);
  return (
    <div className="home">
      <AppHeader />
      <Posts />;
    </div>
  );
}

export default Home;
