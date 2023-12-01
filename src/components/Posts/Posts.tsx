import Post from '../Post/Post';

import { Post as TPost } from '../../@types/post';
import './Posts.scss';

type PostsProps = {
  posts: TPost[];
};
function Posts({ posts }: PostsProps) {
  console.log('🚀 ~ posts:', posts);
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
