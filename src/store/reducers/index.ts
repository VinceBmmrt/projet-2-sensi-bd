import postsReducer from './posts';
import userReducer from './user';

const reducer = {
  posts: postsReducer,
  user: userReducer,
};

export default reducer;
