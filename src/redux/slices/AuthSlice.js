import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    updated: false
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      state.updated = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.updated = true;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;