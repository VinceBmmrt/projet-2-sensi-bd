import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Posts from '../Posts/Posts';
import AppHeader from '../appHeader/appHeader';
// import data from '../../data';
import './Home.scss';
import { fetchPosts } from '../../store/reducers/posts';

function Home() {
  return (
    <div className="home">
      <AppHeader />
      <Posts />
    </div>
  );
}

export default Home;
