import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import CalendarServices from "../services/calendar.service";

export const getGoogleEvents = createAsyncThunk(
  "calendar/getGoogleEvents",
  async (thunkAPI) => {
    try {
      const response = await CalendarServices.getGoogleEvents();
      return response.data.calendarEvents;
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
  googleEvents: [],
  message: null,
  status: "idle",
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add the getAllSubjectDetails async thunk to the slice
    builder.addCase(getGoogleEvents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getGoogleEvents.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.googleEvents = action.payload;
    });
    builder.addCase(getGoogleEvents.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message; //added optional chaining so when payload or action is undefined it will not generate error
    });
  },
});

export default calendarSlice.reducer;
