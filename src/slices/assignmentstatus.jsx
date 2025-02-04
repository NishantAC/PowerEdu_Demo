import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AssignmentStatusService from "../services/assignmentstatus.service";

const assignmentstatus = JSON.parse(localStorage.getItem("assignmentstatus"));

export const registerassignmentstatus = createAsyncThunk(
  "assignment/registerassignmentstatus",
  async ({ school_id, classname, subjectname, studentname, assigndate, submitdate, status }, thunkAPI) => {
    try {
      const response = await AssignmentStatusService.registerassignmentstatus(school_id, classname, subjectname, studentname, assigndate, submitdate, status);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = assignmentstatus
  ? { isLoggedIn: true, assignmentstatus }
  : { isLoggedIn: false, assignmentstatus: null };

const assignmentstatusSlice = createSlice({
  name: "assignmentstatus",
  initialState,
  extraReducers: {
    [registerassignmentstatus.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerassignmentstatus.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export const { reducer } = assignmentstatusSlice;
