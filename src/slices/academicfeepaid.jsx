import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AcademicFeePaidService from "../services/academicfeepaid.service";

const academicfeepaid = JSON.parse(localStorage.getItem("academicfeepaid"));

export const registeracademicfeepaid = createAsyncThunk(
  "fee/registeracademicfeepaid",
  async ({ school_id, classname, studentname, feetype, latefee, datesubmitted }, thunkAPI) => {
    try {
      const response = await AcademicFeePaidService.registeracademicfeepaid(school_id, classname, studentname, feetype, latefee, datesubmitted);
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

const initialState = academicfeepaid
  ? { isLoggedIn: true, academicfeepaid }
  : { isLoggedIn: false, academicfeepaid: null };

const academicfeepaidSlice = createSlice({
  name: "academicfeepaid",
  initialState,
  extraReducers: {
    [registeracademicfeepaid.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registeracademicfeepaid.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = academicfeepaidSlice;
export default reducer;
