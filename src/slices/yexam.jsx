import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import YExamService from "../services/yexam.service";

export const registeryexam = createAsyncThunk(
  "notice/registeryexam",
  async ({ school_id, classname, subjectname, syllabus, examdate, totalmarks, createdby }, thunkAPI) => {
    try {
      const response = await YExamService.registeryexam(school_id, classname, subjectname, syllabus, examdate, totalmarks, createdby);
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

const yexamSlice = createSlice({
  name: "yexam",
  initialState: {
    isLoggedIn: false,
    yexam: JSON.parse(localStorage.getItem("yexam"))
  },
  reducers: {
    setYExam: (state, action) => {
      state.yexam = action.payload;
      localStorage.setItem("yexam", JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registeryexam.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.yexam = action.payload;
      localStorage.setItem("yexam", JSON.stringify(action.payload));
    });
    builder.addCase(registeryexam.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
  },
});

export const { setYExam } = yexamSlice.actions;
export default yexamSlice.reducer;
