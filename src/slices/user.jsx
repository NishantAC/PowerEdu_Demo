import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(sessionStorage.getItem("user"));
const initialState = { user: userData ? userData : null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser, clearUser } = actions;
export default reducer;