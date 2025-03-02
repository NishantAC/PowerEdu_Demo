import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import ClassNoticeService from "../services/classnotice.service";

export const registerclassnotice = createAsyncThunk(
  "notice/registerclassnotice",
  async (
    { school_id, date, classname, title, createdby, details },
    thunkAPI
  ) => {
    try {
      const response = await ClassNoticeService.registerClassNotice(
        school_id,
        date,
        classname,
        title,
        createdby,
        details
      );
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
  async ({ school_id, academic_year_id }, thunkAPI) => {
    try {
      const response = await ClassNoticeService.getAllNotices(
        school_id,
        academic_year_id
      );
      console.log(response);

      // Extract only the necessary serializable data
      return {
        classnotice: response.data, // Only store `data`, excluding headers and other non-serializable parts
      };
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

// delete class notice

export const deleteclassnotice = createAsyncThunk(
  "notice/deleteclassnotice",
  async (id, thunkAPI) => {
    try {
      const response = await ClassNoticeService.deleteClassNotice(id);
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

// update class notice

export const updateclassnotice = createAsyncThunk(
  "notice/updateclassnotice",
  async (
    { id, school_id, date, classname, title, createdby, details },
    thunkAPI
  ) => {
    try {
      const response = await ClassNoticeService.updateClassNotice(
        id,
        school_id,
        date,
        classname,
        title,
        createdby,
        details
      );
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
      })
      .addCase(classnoticedata.fulfilled, (state, action) => {
        state.classnotice = action.payload.classnotice;
      })
      .addCase(deleteclassnotice.fulfilled, (state, action) => {
        state.notices = state.notices.filter(
          (notice) => notice.id !== action.payload
        );
      })
      .addCase(updateclassnotice.fulfilled, (state, action) => {
        const index = state.notices.findIndex(
          (notice) => notice.id === action.payload.id
        );
        if (index !== -1) {
          state.notices[index] = action.payload;
        }
      });
  },
});

const { reducer } = classnoticeSlice;
export default reducer;
