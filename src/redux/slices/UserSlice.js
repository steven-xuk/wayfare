import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return {};
    },
  },
});


export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;