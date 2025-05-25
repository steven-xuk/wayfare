// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';
import userSlice from './slices/UserSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice
  },
});
