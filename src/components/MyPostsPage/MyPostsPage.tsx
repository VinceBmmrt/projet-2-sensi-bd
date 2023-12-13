import { useEffect } from 'react';
import Post from '../Post/Post';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function MypostsPage() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.list);

  useEffect(() => {
    dispatch(fetchMyPosts()); // Chargement initial, page 1
  }, []);

  return (
    <div className="myPosts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
export default MypostsPage;
