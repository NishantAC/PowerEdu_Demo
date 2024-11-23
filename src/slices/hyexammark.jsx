import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import HYExamMarkService from "../services/hyexammark.service";

const initialState = {
  hyexammarks: [],
  isLoading: false,
  error: null,
};

export const registerhyexammark = createAsyncThunk(
  "hyexammark/registerhyexammark",
  async ({schoolCode, className, subjectName, studentName, examDate, obtainedMarks, createdBy }, { rejectWithValue }) => {
    try {
      const response = await HYExamMarkService.registerhyexammark(schoolCode, className, subjectName, studentName, examDate, obtainedMarks, createdBy);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const hyexammarkSlice = createSlice({
  name: "hyexammark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerhyexammark.fulfilled, (state, { payload }) => {
        state.hyexammarks = payload;
        state.isLoggedIn = true;
      })
      .addCase(registerhyexammark.rejected, (state, { payload }) => {
        state.hyexammarks = null;
        state.isLoggedIn = false;
        if (payload) setMessage(payload);
      });
  },
});

export default hyexammarkSlice.reducer;
