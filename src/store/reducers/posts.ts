import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post as TPost } from '../../@types/post';

type PostsState = {
  isLoading: boolean;
  list: TPost[];
  searchText: string;
};

const initialState: PostsState = {
  isLoading: true,
  list: [],
  searchText: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (searchText: string) => {
    const { data } = await axios.get<TPost[]>(`URL/posts?search=${searchText}`);
    return data;
  }
);

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSearchText } = postsReducer.actions;
export default postsReducer.reducer;
