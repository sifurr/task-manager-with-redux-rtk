import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../../../utils/firebase.config';

const initialState = {
  name: '',
  email: '',
  isLoading: true,
  isError: false,
  error: ''
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ name, email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    })
    console.log(data);
    return {
      name: data.user.displayName,
      email: data.user.email,
    };
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,

  reducers: {

    setUser: (state, { payload }) => {
      state.name = payload.name,
      state.email = payload.email
    },

    toggleLoading: (state, {payload}) => {
      state.isLoading = payload;
    }

  },

  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
      state.name = '';
      state.email = '';
      state.error = '';
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.name = payload.name;
      state.email = payload.email;
      state.error = '';
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.name = '';
      state.email = '';
      state.error = action.error.message;
    });
  }
});

export const {setUser, toggleLoading} = userSlice.actions;

export default userSlice.reducer;
