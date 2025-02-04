import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import FeedbackQuestionService from "../services/feedbackquestions.service";

export const registerFeedbackQuestions = createAsyncThunk(
  "feeback/registerquestions",
  async ({  school_id, questions, subject_id, teacher_id, class_id }, thunkAPI) => {
    try {
      const response = await FeedbackQuestionService.registerFeedbackQuestions( school_id, questions, subject_id, teacher_id, class_id);
      // thunkAPI.dispatch(getFeedbackQuestions({class_id, school_id}))
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

export const getFeedbackQuestions = createAsyncThunk(
  "feedback/getquestions",
  async ({ class_id, school_id }, {dispatch, rejectWithValue}) => {
    try {
      const response = await FeedbackQuestionService.getFeedbackQuestions(class_id, school_id);
      // thunkAPI.dispatch(setMessage(response.data.message));
      // 
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
  feedbackquestions: null,
  status: 'idle',
  error: null
};

const feedbackQuestionSlice = createSlice({
  name: "feedbackquestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbackQuestions.pending, (state, action) => {
        state.status = 'loading'; // Update the status field to indicate loading
      })
      .addCase(getFeedbackQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbackquestions = action.payload;
      })
      .addCase(getFeedbackQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default feedbackQuestionSlice.reducer;
