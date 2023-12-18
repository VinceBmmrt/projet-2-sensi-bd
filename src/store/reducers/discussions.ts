import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { axiosInstance } from '../../utils/axios';
import { Discussion as TDiscussion } from '../../@types/discussion';
// Définir le type pour l'état initial
type DiscussionsState = {
  isLoading: boolean;
  discussionsList: TDiscussion[];
};

// Définir l'état initial
const initialState: DiscussionsState = {
  isLoading: false,
  discussionsList: [],
};

// Créer une action asynchrone pour récupérer les messages
export const fetchDiscussions = createAsyncThunk(
  'chat/fetchDiscussions',
  async () => {
    const response = await axiosInstance.get<TDiscussion[]>(
      `/messages/conversations`
    );
    console.log('🚀 ~ response:', response);
    console.log('🚀 ~ data:', response.data);
    return response.data;
  }
);

// Créer une slice pour gérer les discussions
const discussionsSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    setDiscussionsList: (state, action) => {
      state.discussionsList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.discussionsList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDiscussions.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setDiscussionsList } = discussionsSlice.actions;

export const discussionsReducer = discussionsSlice.reducer;
