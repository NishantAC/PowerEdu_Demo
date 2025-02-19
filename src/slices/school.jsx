import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { setSchoolDetail } from "./schooldetail";

import SchoolService from "../services/school.service";

const school = "";

export const registerschool = createAsyncThunk(
  "school/registerschool",
  async (
    { school_id, schoolname, status, view_performance_button },
    thunkAPI
  ) => {
    try {
      const response = await SchoolService.registerschool(
        school_id,
        schoolname,
        status,
        view_performance_button
      );
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

export const schooldata = createAsyncThunk(
  "school/schooldata",
  async ({ code }, { dispatch, rejectWithValue }) => {
    try {
      

      const { data } = await SchoolService.getSchoolData(code);
      

      dispatch(setSchoolDetail(data?.data));

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message); // return the error message
    }
  }
);

export const getAcademicYears = createAsyncThunk(
  "school/getAcademicYears",
  async ({ code }, { dispatch, rejectWithValue }) => {
    try {
      const data = await SchoolService.getAcademicYears(code);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message); // return the error message
    }
  }
);

const initialState = school
  ? { isLoggedIn: true, school, academicYears: null }
  : { isLoggedIn: false, school: null, academicYears: null };

const schoolSlice = createSlice({
  name: "school",
  initialState,
  extraReducers: {
    [registerschool.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerschool.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [getAcademicYears.fulfilled]: (state, action) => {
      state.academicYears = action.payload;
    },
    [getAcademicYears.rejected]: (state, action) => {
      state.academicYears = null;
    },
    [schooldata.fulfilled]: (state, action) => {
      

      state.isLoggedIn = true;
      state.school = action?.payload?.school;
    },
    [schooldata.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.school = null;
    },
  },
});

export default schoolSlice.reducer;
