import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import LinkService from "../services/link.service";

const link = JSON.parse(localStorage.getItem("link"));

export const registerlink = createAsyncThunk(
  "link/registerlink",
  async ({ schoolcode, classname, subjectname, chaptername, linkname, createdby }, thunkAPI) => {
    try {
      const response = await LinkService.registerlink(schoolcode, classname, subjectname, chaptername, linkname, createdby);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = { isLoggedIn: !!link, link: link || null };

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {},
  extraReducers: {
    [registerlink.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerlink.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export default linkSlice.reducer;
