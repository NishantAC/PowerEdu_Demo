import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { handleErrors } from "../Utils/errorHandler";
import HYExamService from "../services/hyexam.service";

const hyexam = JSON.parse(localStorage.getItem("hyexam"));

export const registerhyexam = createAsyncThunk(
  "notice/registerhyexam",
  async ({ school_id, classname, subjectname, syllabus, examdate, totalmarks, createdby }, thunkAPI) => {
    const response = await HYExamService.registerhyexam(school_id, classname, subjectname, syllabus, examdate, totalmarks, createdby);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  }
);

export const classnoticedata = createAsyncThunk(
  "notice/classnoticedata",
  async ({ code, clas }, thunkAPI) => {
    const response = await HYExamService.classnoticedata(code, clas);
    return { hyexam: response.data };
  }
);

const initialState = hyexam
  ? { isLoggedIn: true, hyexam }
  : { isLoggedIn: false, hyexam: null };

const hyexamSlice = createSlice({
  name: "hyexam",
  initialState,
  extraReducers: {
    [registerhyexam.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerhyexam.rejected]: handleErrors,
    [classnoticedata.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.hyexam = action.payload.hyexam;
    },
    [classnoticedata.rejected]: handleErrors,
  },
});

const { reducer } = hyexamSlice;
export default reducer;
