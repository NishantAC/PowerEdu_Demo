import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TimeTableService from "../services/timetable.service";
import { setMessage } from "./message";

export const getDayWiseSubject = createAsyncThunk(
  "timetable/getDayWiseSubjects",
  async ({ class_id, schoolcode, day }, thunkAPI) => {
    try {
      const response = await TimeTableService.getDayWiseSubjects(
        class_id,
        schoolcode,
        day
      );
      return response;
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

export const getTimetableByClass = createAsyncThunk(
  "timetable/getTimetableByClass",
  async ({ class_code, school_code }, thunkAPI) => {
    try {
      const response = await TimeTableService.getTimetableByClass(
        class_code,
        school_code
      );
      return response;
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

const initialState = {
  Timetable: {},
  subject: null,
  message: null,
  status: "idle",
};

export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add the getAllSubjectDetails async thunk to the slice
    builder.addCase(getDayWiseSubject.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDayWiseSubject.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.subject = action.payload;
    });
    builder.addCase(getDayWiseSubject.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message; //added optional chaining so when payload or action is undefined it will not generate error
    });
    builder.addCase(getTimetableByClass.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTimetableByClass.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.Timetable = action.payload;
    });
    builder.addCase(getTimetableByClass.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message;
    });
  },
});

export default timetableSlice.reducer;
