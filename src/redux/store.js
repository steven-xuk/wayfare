// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice
  },
});
