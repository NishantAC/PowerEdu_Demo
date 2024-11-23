import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import ClassNoticeService from "../services/classnotice.service";

const classnotice = JSON.parse(localStorage.getItem("classnotice"));

export const registerclassnotice = createAsyncThunk(
  "notice/registerclassnotice",
  async ({ schoolcode, date, classname, title, createdby, details }, thunkAPI) => {
    try {
      const response = await ClassNoticeService.registerclassnotice(schoolcode, date, classname, title, createdby, details);
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
      throw error;
    }
  }
);

export const classnoticedata = createAsyncThunk(
  "notice/classnoticedata",
  async ({ code, clas }, thunkAPI) => {
    try {
      const data = await ClassNoticeService.classnoticedata(code, clas);
      return { classnotice: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      throw error;
    }
  }
);

export const getNoticeDropdownClasses = createAsyncThunk(
  "notice/getNoticeDropdownClasses",
  async ({ school_code }, thunkAPI) => {
    try {
      const data = await ClassNoticeService.getNoticeDropdownClasses(school_code);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      throw error;
    }
  }
);

const initialState = {
  noticeDropdownclasses: [],
  notices: [],
  loading: false,
  error: null,
};

const classnoticeSlice = createSlice({
  name: "classnotice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerclassnotice.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(registerclassnotice.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(classnoticedata.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.classnotice = action.payload.classnotice;
      })
      .addCase(classnoticedata.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.classnotice = null;
      }) 
      .addCase(getNoticeDropdownClasses.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.noticeDropdownclasses = action.payload.data.class_codes;
      })
      .addCase(getNoticeDropdownClasses.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.noticeDropdownclasses = null;
      })
      .addCase(getNoticeDropdownClasses.pending, (state, action) => {
        state.isLoggedIn = false;
        state.noticeDropdownclasses = null;
      })
  },
});

const { reducer } = classnoticeSlice;
export default reducer;
