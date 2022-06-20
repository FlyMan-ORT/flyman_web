import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pending: false,
  data: null,
  error: null,
}

export const postLogin = createAsyncThunk('auth/login', async (params) => {
  const url = `${process.env.REACT_APP_BASE_URL}/users/web/login`;
  const response = await axios.post(url, { email: params.email, password: params.password });
  window.sessionStorage.setItem('token', response.data.token);
  return response;
});

export const logout = createAction('auth/logout', () => {
  window.sessionStorage.removeItem('token');
  window.location.reload();
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.pending = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.pending = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.pending = false;
      state.error = action.error;
      state.data = null;
    });
    builder.addCase(logout, (state) => {
      state.data = null;
    });
  },
});

const reducer = loginSlice.reducer;
export default reducer;
