import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ClassTestService from "../services/classtest.service";
import ClassTestMarkService from "../services/classtestmark.service";

const classTest = JSON.parse(localStorage.getItem("classTest"));

const initialState = {
  classtests: [],
  studentTestMarks: [],
  isLoading: false,
  message: null,
  error: null,
};

export const registerClassTest = createAsyncThunk(
  "classtest/registerClassTest",
  async ({ schoolcode, schoolclassId, subjectId, syllabus, testdesc, examdate, totalmarks, createdby}) => {
    try {
      const response = await ClassTestService.registerclasstest(schoolcode, schoolclassId, subjectId, syllabus, testdesc, examdate, totalmarks, createdby);
      dispatch(setMessage(response.data.message));
      return { data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  }
);

export const addTestMarks = createAsyncThunk(
  "classtest/addTestMarks",
  async ({marks, test_id}, { rejectWithValue }) => {
    try {
      const response = await ClassTestMarkService.registerClassTestMark(marks, test_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchClassTestsByTeacher = createAsyncThunk(
  "classtest/fetchClassTestsByTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const response = await ClassTestService.getClassTestsByTeacher(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentClassTestMarks = createAsyncThunk(
  "classtest/fetchStudentClassTestMarks",
  async (body, { rejectWithValue }) => {
    try {
      const response = await ClassTestMarkService.getStudentClassTestMarks(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudentClassTestMarks = createAsyncThunk(
  "classtest/updateStudentClassTestMarks",
  async ({testMarks, test_id}, { rejectWithValue, dispatch }) => {
    try {
      const response = await ClassTestMarkService.updateStudentClassTestMarks({testMarks, test_id});
      dispatch(fetchStudentClassTestMarks({test_id}))
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// const initialState = classTest ? { isLoggedIn: true, classTest , 
//   isLoading: false,
//   error: null} : { isLoggedIn: false, classTest: null, 
//     isLoading: false,
//     error: null};

const classTestSlice = createSlice({
  name: 'classtest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerClassTest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerClassTest.fulfilled, (state) => {
        state.isLoading = false;
        state.classtests.push(action.payload.data)
      })
      .addCase(registerClassTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchClassTestsByTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClassTestsByTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classtests = action.payload
      })
      .addCase(fetchClassTestsByTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchStudentClassTestMarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentClassTestMarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentTestMarks = action.payload;
      })
      .addCase(fetchStudentClassTestMarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateStudentClassTestMarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStudentClassTestMarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message
      })
      .addCase(updateStudentClassTestMarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
  },
});

const { reducer } = classTestSlice;
export default reducer;
