import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Message as TMessage } from '../../@types/message';
import { axiosInstance } from '../../utils/axios';

// Définir le type pour l'état initial
type ChatState = {
  isLoading: boolean;
  messagesList: TMessage[];
  userId?: number | undefined;
  postId?: number | undefined;
};

// Définir l'état initial
const initialState: ChatState = {
  isLoading: false,
  messagesList: [],
  userId: undefined,
  postId: undefined,
};

// Créer une action asynchrone pour récupérer les messages
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const response = await axiosInstance.get<TMessage[]>(
      `/messages/${postId}/${userId}`
    );
    console.log('🚀 ~ data:', data);
    return response.data;
  }
);
// Créer une action asynchrone pour envoyer un message
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (messageContent: string) => {
    const response = await axios.post('/messages', { content: messageContent });
    return response.data;
  }
);
// Créer une slice pour gérer le chat
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setSenderId: (state, action) => {
      state.userId = action.payload;
    },
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setMessagesList: (state, action) => {
      state.messagesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
        // Gérer les erreurs si nécessaire
      });
  },
});

export const { setSenderId, setPostId, setMessagesList } =
  messagesSlice.actions;

// Exporter le reducer spécifiquement sous le nom 'chatReducer'
export const messagesReducer = messagesSlice.reducer;
