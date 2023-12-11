import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post as TPost } from '../../@types/post';

type CategoryState = {
  isLoading: boolean;
  list: TPost[];
};

const initialState: CategoryState = {
  isLoading: true,
  list: [],
};

export const fetchCategories = createAsyncThunk('category/fetch', async () => {
  try {
    const response = await fetch('http://localhost:3000/category');
    const data = await response.json();
    return data.categories; // Assurez-vous que votre API renvoie les catégories sous forme de tableau
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
});

const categoryReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload];
        state.isLoading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default categoryReducer.reducer;
