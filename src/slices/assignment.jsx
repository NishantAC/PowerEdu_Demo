import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AssignmentService from "../services/assignment.service";

const assignment = localStorage.getItem("assignment") ?? null;

export const registerOrGetAssignments = createAsyncThunk(
  "assignment/registerOrGetAssignments",
  async ({ isRegister, schoolcode, classname, subjectname, assigndate, duedate, title, createdby, body }, thunkAPI) => {
    try {
      const response = isRegister
        ? await AssignmentService.saveAssignment(schoolcode, classname, subjectname, assigndate, duedate, title, createdby)
        : await AssignmentService.getClassAssignments(body);

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

const initialState = {
  isLoggedIn: !!assignment,
  assignment,
  classAssignment: [],
  filterAssignment: [],
  isLoading: false,
};

export const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    stdFilteredAssignments: (state, action) => {
      state.filterAssignment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOrGetAssignments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerOrGetAssignments.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.isRegister) {
          state.isLoggedIn = false;
        } else {
          state.classAssignment = action.payload;
          state.filterAssignment = action.payload;
        }
      })
      .addCase(registerOrGetAssignments.rejected, (state) => {
        state.isLoading = false;
        state.classAssignment = [];
        state.filterAssignment = [];
      });
  },
});

export const { stdFilteredAssignments } = assignmentSlice.actions;

export default assignmentSlice.reducer;
