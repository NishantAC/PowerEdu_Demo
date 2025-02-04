import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import FeedbackRepsonseService from "../services/feedbackresponses.service";

export const submitFeedback = createAsyncThunk(
  "feeback/submitfeedback",
  async ({ user_id, question_id, teacher_id, responses, comment }, thunkAPI) => {
    try {
      const response = await FeedbackRepsonseService.registerFeedbackResponses(user_id, question_id, teacher_id, responses, comment);
      // thunkAPI.dispatch(getFeedbackResponses(user_id, school_id, teacher_id))
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

export const updateFeedback = createAsyncThunk(
  "feeback/updatefeedback",
  async ({ response_id, responses, comment }, thunkAPI) => {
    try {
      const response = await FeedbackRepsonseService.updateFeedbackResponses(response_id, responses, comment);
      // thunkAPI.dispatch(getFeedbackResponses(user_id, school_id, teacher_id))
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

export const getFeedbackResponses = createAsyncThunk(
  "feedback/getresponses",
  async ({ user_id, school_id, teacher_id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await FeedbackRepsonseService.getFeedbackResponses(user_id, school_id, teacher_id);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);

    }
  }
);

const initialState = {
  feedbackresponses: [],
  status: 'idle',
  error: null
};

const feedbackResponseSlice = createSlice({
  name: "feedbackresponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state, action) => {
        state.status = 'loading'; // Update the status field to indicate loading
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbackresponses.push(action.payload);
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(updateFeedback.pending, (state, action) => {
        state.status = 'loading'; // Update the status field to indicate loading
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedFeedback = action.payload;
        const index = state.feedbackresponses.findIndex(fr => fr.id === updatedFeedback.id);
        if (index !== -1) {
          state.feedbackresponses[index] = updatedFeedback;
        }
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getFeedbackResponses.pending, (state, action) => {
        state.status = 'loading'; // Update the status field to indicate loading
      })
      .addCase(getFeedbackResponses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbackresponses = action.payload;
      })
      .addCase(getFeedbackResponses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default feedbackResponseSlice.reducer;
