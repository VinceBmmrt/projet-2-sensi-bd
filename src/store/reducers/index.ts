import postsReducer from './posts';
import userReducer from './user';
import categoryReducer from './category';
import { messagesReducer } from './messages';
import { discussionsReducer } from './discussions';

const reducer = {
  posts: postsReducer,
  user: userReducer,
  category: categoryReducer,
  messages: messagesReducer,
  discussions: discussionsReducer,
};

export default reducer;
