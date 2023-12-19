import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Message as TMessage } from '../../@types/message';
import { axiosInstance } from '../../utils/axios';

// typage des données
type ChatState = {
  isLoading: boolean;
  messagesList: TMessage[];
  userId?: number | undefined;
  postId?: number | undefined;
};

//* Données initiales
const initialState: ChatState = {
  isLoading: false,
  messagesList: [],
  userId: undefined,
  postId: undefined,
};

// Fonction asynchrone pour récupérer les messages
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ postId, userId }: { postId: number; userId: number }) => {
    const response = await axiosInstance.get<TMessage[]>(
      `/messages/${postId}/${userId}`
    );
    return response.data;
  }
);
// Fonction asynchrone pour envoyer un message
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({
    postId,
    userId,
    messageContent,
  }: {
    postId: number;
    userId: number;
    messageContent: string;
  }) => {
    const response = await axiosInstance.post(`/messages/${postId}/${userId}`, {
      content: messageContent,
    });
    return response.data;
  }
);

//* Création d'une slice pour gérer le chat

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
      });
  },
});

export const { setSenderId, setPostId, setMessagesList } =
  messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
