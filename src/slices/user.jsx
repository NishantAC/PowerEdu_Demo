import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("user"));
const initialState = { user: userData ? userData : null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Update the parameter to (state, action)
      state.user = action.payload; // Update the state.user value
    },
    clearUser: (state) => {
      // Update the parameter to (state)
      state.user = null; // Update the state.user value
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser, clearUser } = actions;
export default reducer;
