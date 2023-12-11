import postsReducer from './posts';
import userReducer from './user';
import categoryReducer from './category';

const reducer = {
  posts: postsReducer,
  user: userReducer,
  category: categoryReducer,
};

export default reducer;
