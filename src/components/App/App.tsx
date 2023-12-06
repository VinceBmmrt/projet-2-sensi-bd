import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import SimpleBottomNavigation from '../BottomNav/BottomNav';
import './App.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPosts } from '../../store/reducers/posts';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts(''));
  }, [dispatch]);

  // exemple de fetch avec props
  // const [searchText, setSearchText] = useState('');
  // const [totalCount, setTotalCount] = useState(reposData.total_count);
  // const [data, setData] = useState(reposData.items);
  // const [nbPage, setNbPage] = useState(9);

  // useEffect(() => {
  //   if (searchText) {
  //     fetch(
  //       `https://api.github.com/search/repositories?q=${searchText}&sort=stars&order=desc&page=1&per_page=${nbPage}`
  //     )
  //       .then((response) => response.json())
  //       .then((dataResponse) => {
  //         setTotalCount(dataResponse.total_count);
  //         setData(dataResponse.items);
  //       });
  //   }
  // }, [searchText, nbPage]);

  return (
    <div className="app">
      <Outlet />
      <SimpleBottomNavigation />
    </div>
  );
}

export default App;
