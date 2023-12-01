import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { LocalStorage } from '../../utils/LocalStorage';

// type UserData = {
//   pseudo: string;
//   token: string;
//   logged: boolean;
// };

interface UserState {
  pseudo?: string;
  token?: string;
  isLogged: boolean;
  credentials: { email: string; password: string };
  checked: boolean;
}

// Je vais récupérer les données de l'utilisateur dans le localStorage
// const userData = LocalStorage.getItem('user');

export const initialState: UserState = {
  isLogged: false,
  credentials: {
    email: '',
    password: '',
  },
  checked: false,
  // ...userData, // si null, ça ne fait rien, si utilisateur, écrase les données prédécentes et donc isLogged sera à jour
};

// type LoginCredentials = { email: string; password: string };
// export const login = createAsyncThunk(
//   'LoginForm',
//   async (credentials: LoginCredentials) => {
//     const { data } = await axiosInstance.post<UserData>('/login', credentials);

//     // Lorsque je me connecte, je stocke le token d'authorization dans axios
//     // Ce header sera envoyé automatiquement à chaque requête avec `axiosInstance`
//     // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

//     // Je vais enregistrer dans le localStorage les données de l'utilisateur
//     // comme ça au rafraichissement de la page, il reste connecté
//     // je stocke une information sur le navigateur en lmode clé/valeur
//     // La clé me permet de pouvoir récupérer / modifier / supprimer la valeur
//     // La valeur DOIT être une chaine de caractère. On transforme donc notre objet en chaines de caractères
//     LocalStorage.setItem('user', data);

//     // Je retourne les données récupérer depuis mon API
//     return data;
//   }
// );

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeCredentialValue(
      state,
      action: PayloadAction<{
        textfieldName: keyof UserState['credentials']; // name 'email'|'password'
        value: string;
      }>
    ) {
      const { textfieldName, value } = action.payload;
      state.credentials[textfieldName] = value;
    },
    changeCheckedValue(state) {
      state.checked = !state.checked;
    },
    getCredentialsFromStorage(state) {
      const getEmail = localStorage.getItem('email');
      const getPassword = localStorage.getItem('password');

      if (getEmail && getPassword && state.checked === true) {
        state.credentials.email = getEmail;
        state.credentials.password = getPassword;
      }
    },
    setCredentialsToStorage(state) {
      if (state.checked === true) {
        localStorage.setItem('email', state.credentials.email);
        localStorage.setItem('password', state.credentials.password);
      }
    },

    // handleLogout(state) {
    //   // a la deconnection je supprime les infos de l'utilisateur dans le navigateur
    //   LocalStorage.removeItem('user');
    //   state.isLogged = false;
    //   state.pseudo = undefined;
    //   state.token = undefined;
    // },
  },
  // extraReducers(builder) {
  //   builder.addCase(login.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = undefined;
  //   });
  //   builder.addCase(login.rejected, (state) => {
  //     // state.isLogged = false;
  //     state.isLoading = false;
  //     state.error = 'Identifiants incorrects';
  //   });
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.pseudo = action.payload.pseudo;
  //     state.token = action.payload.token;
  //     state.isLogged = action.payload.logged;
  //     state.loggedMsg = 'vous êtes connecté';
  //   });
  // },
});

export const {
  changeCredentialValue,
  changeCheckedValue,
  getCredentialsFromStorage,
  setCredentialsToStorage,
} = userReducer.actions;
export default userReducer.reducer;
