import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AcademicFeeService from "../services/academicfee.service";

const academicFee = JSON.parse(localStorage.getItem("academicfee"));

export const registerAcademicFee = createAsyncThunk(
  "fee/registerAcademicFee",
  async ({ school_id, classname, feetype, amount, duedate }, thunkAPI) => {
    try {
      const response = await AcademicFeeService.registerAcademicFee(school_id, classname, feetype, amount, duedate);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      console.error("Error in registerAcademicFee thunk:", error);
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

const initialState = academicFee
  ? { isLoggedIn: true, academicFee }
  : { isLoggedIn: false, academicFee: null };

const academicFeeSlice = createSlice({
  name: "academicFee",
  initialState,
  extraReducers: {
    [registerAcademicFee.pending]: (state, action) => {
      state.loading = true;
    },
    [registerAcademicFee.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
    },
    [registerAcademicFee.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      console.error("Error in registerAcademicFee reducer:", action.error);
    }
  },
});

const academicFeeReducer = academicFeeSlice.reducer;
export default academicFeeReducer;
