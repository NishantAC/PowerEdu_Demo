// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthorized: false,
  user: null,
};

const googleAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload.isAuthorized;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.user = null;
    },
  },
});

export const { setAuthorized, logout } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;