import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Posts from '../Posts/Posts';
import AppHeader from '../appHeader/appHeader';
// import data from '../../data';
import './Home.scss';
import { fetchPosts } from '../../store/reducers/posts';
import Posts2 from '../Posts2/Posts2';

function Home() {
  return (
    <div className="home">
      <AppHeader />
      <Posts2 />
    </div>
  );
}

export default Home;
