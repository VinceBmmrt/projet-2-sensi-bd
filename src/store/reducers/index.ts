import postsReducer from './posts';
import userReducer from './user';
import categoryReducer from './category';
import { messagesReducer } from './messages';

const reducer = {
  posts: postsReducer,
  user: userReducer,
  category: categoryReducer,
  messages: messagesReducer,
};

export default reducer;
