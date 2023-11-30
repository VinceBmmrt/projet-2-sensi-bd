import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default postsReducer.reducer;
