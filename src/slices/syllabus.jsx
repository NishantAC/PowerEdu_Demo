import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SyllabusService from "../services/syllabus.service";

export const registersyllabus = createAsyncThunk(
  "syllabus/registerSyllabus",
  async ({ schoolCode, className, subjectName, chapterName, status, createdBy }, thunkAPI) => {
    try {
      const data = await SyllabusService.registerSyllabus(
        schoolCode,
        className,
        subjectName,
        chapterName,
        status,
        createdBy
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSyllabusBySubject = createAsyncThunk(
  "syllabus/fetchSyllabusBySubject",
  async ({ school_id, classid, subjectid }, thunkAPI) => {
    try {
      
      const data = await SyllabusService.getSyllabusBySubject(school_id, classid, parseInt(subjectid));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  syllabus: null,
  loading: false,
  error: null
};

const syllabusSlice = createSlice({
  name: "syllabus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registersyllabus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registersyllabus.fulfilled, (state, action) => {
      state.loading = false;
      state.syllabus = action.payload;
      state.error = null;
    });
    builder.addCase(registersyllabus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchSyllabusBySubject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSyllabusBySubject.fulfilled, (state, action) => {
      state.loading = false;
      state.syllabus = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSyllabusBySubject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  }
});

export default syllabusSlice.reducer;
