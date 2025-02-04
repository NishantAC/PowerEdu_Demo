import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import FeedbackStatusService from "../services/feedbackstatus.service";

const feedbackstatus = localStorage?.feedbackstatus;

export const registerFeedbackStatus = createAsyncThunk(
  "feedback/registerFeedbackStatus",
  async ({ schoolCode, status }, thunkAPI) => {
    try {
      const response = await FeedbackStatusService.registerFeedbackStatus(schoolCode, status);
      const { data: { message } } = response;
      thunkAPI.dispatch(setMessage(message));
      return response.data;
    } catch (error) {
      const { response: { data: { message } = {} } = {}, message: errorMessage } = error;
      thunkAPI.dispatch(setMessage(message || errorMessage));
      throw error;
    }
  }
);

export const getFeedbackStatus = createAsyncThunk(
  "feedback/getFeedbackStatus",
  async ({ school_id }, thunkAPI) => {
    try {
      const response = await FeedbackStatusService.getFeedbackStatusData(school_id);
      return response;
    } catch (error) {
      const { response: { data: { message } = {} } = {}, message: errorMessage } = error;
      thunkAPI.dispatch(setMessage(message || errorMessage));
      throw error;
    }
  }
);


const initialState = {
  isLoggedIn: Boolean(feedbackstatus),
  feedbackstatus
};

const feedbackStatusSlice = createSlice({
  name: "feedbackstatus",
  initialState,
  extraReducers: {
    [registerFeedbackStatus.fulfilled]: (state, action) => ({
      ...state,
      isLoggedIn: false
    }),
    [registerFeedbackStatus.rejected]: (state, action) => ({
      ...state,
      isLoggedIn: false
    }),
    [getFeedbackStatus.fulfilled]: (state, action) => ({
      ...state,
      feedbackstatus: action.payload.status,
    })
  },
});

export default feedbackStatusSlice.reducer;
