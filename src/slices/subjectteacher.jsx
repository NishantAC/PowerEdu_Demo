import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import SubjectTeacherService from "../services/subjectteacher.service";

const subjectteacher = JSON.parse(localStorage.getItem("subjectteacher"));

export const registersubjectteacher = createAsyncThunk(
  "teacher/registersubjectteacher",
  async ({ school_id, classname, firstname, lastname, subjectname, details }, thunkAPI) => {
    try {
      const response = await SubjectTeacherService.registersubjectteacher(school_id, classname, firstname, lastname, subjectname, details);
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

export const getSubjectTeacherData = createAsyncThunk(
  "teacher/getsubjectteachers",
  async ({ classId, school_id }, {dispatch, rejectWithValue}) => {
    try {
      const response = await SubjectTeacherService.getSubjectTeacherData(classId, school_id);
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

export const getCurrentTeacherData = createAsyncThunk(
  "teacher/getCurrentTeacherData",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await SubjectTeacherService.getCurrentTeacherData(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTeachersBySchool = createAsyncThunk(
  "teacher/fetchAllTeachersBySchool",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await SubjectTeacherService.getAllTeachersBySchool(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  currentteacher: null,
  subjectteachers: subjectteacher || null,
  status: 'idle',
  error: null
};

const subjectteacherSlice = createSlice({
  name: "subjectteacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registersubjectteacher.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(registersubjectteacher.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(getSubjectTeacherData.pending, (state, action) => {
        state.status = 'loading'; // Update the status field to indicate loading
      })
      .addCase(getCurrentTeacherData.pending, (state) => {
        state.status = 'loading'; 
        state.error = null;
      })
      .addCase(getCurrentTeacherData.fulfilled, (state, action) => {
        state.status = 'idle'; 
        state.currentteacher = action.payload;
      })
      .addCase(getCurrentTeacherData.rejected, (state, action) => {
        state.status = 'idle'; 
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getSubjectTeacherData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subjectteachers = action.payload;
      })
      .addCase(getSubjectTeacherData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      // .addCase(fetchAllTeachersBySchool.rejected, (state, action) => {
      //   state.status = 'idle'; 
      //   state.error = action.payload ? action.payload.message : action.error.message;
      // })
      .addCase(fetchAllTeachersBySchool.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subjectteachers = action.payload;
      })
      // .addCase(fetchAllTeachersBySchool.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload.message;
      // });
  },
});

export default subjectteacherSlice.reducer;
