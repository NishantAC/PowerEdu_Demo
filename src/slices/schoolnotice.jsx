import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import SchoolNoticeService from "../services/schoolnotice.service";

// Load school notice data from local storage
const schoolNotice = JSON.parse(localStorage.getItem("schoolnotice"));

// Async thunk to register a school notice
export const registerSchoolNotice = createAsyncThunk(
  "notice/registerschoolnotice",
  async ({ school_id, date, title, createdby, details }, thunk) => {
    try {
      const response = await SchoolNoticeService.registerSchoolNotice(
        school_id,
        date,
        title,
        createdby,
        details
      );
      thunk.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunk.dispatch(setMessage(message));
      return thunk.rejectWithValue();
    }
  }
);

// Async thunk to load school notice data
export const loadSchoolNoticeData = createAsyncThunk(
  "notice/schoolnoticedata",
  async ({ code }, thunk) => {
    try {
      const data = await SchoolNoticeService.loadSchoolNoticeData(code);
      return { schoolNotice: data };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunk.dispatch(setMessage(message));
      return thunk.rejectWithValue();
    }
  }
);

// Define initial state
const initialState = schoolNotice
  ? { isLoggedIn: true, schoolNotice }
  : { isLoggedIn: false, schoolNotice: null };

// Define school notice slice
const schoolNoticeSlice = createSlice({
  name: "schoolnotice",
  initialState,
  extraReducers: {
    [registerSchoolNotice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerSchoolNotice.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [loadSchoolNoticeData.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.schoolNotice = action.payload.schoolNotice;
    },
    [loadSchoolNoticeData.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.schoolNotice = null;
    },
  },
});

// Export school notice reducer
export default schoolNoticeSlice.reducer;
