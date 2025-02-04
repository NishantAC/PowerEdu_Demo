import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import QuestionPaperService from "../services/questionpaper.service";

const initialState = {
  papers: [],
  isLoading: false,
  message: null,
  error: null,
};

export const addPaper = createAsyncThunk(
  "questionpaper/addPaper",
  async ({ school_id, classid, examtype, subject, academicyear, paperFile, createdby }, { rejectWithValue, dispatch }) => {
    try {
      const response = await QuestionPaperService.addPaper(school_id, classid, examtype, subject, academicyear, paperFile, createdby);
      return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPapers = createAsyncThunk(
  "questionpaper/fetchPapers",
  async ({ school_id, classid, subject }, { rejectWithValue }) => {
    try {
      const response = await QuestionPaperService.fetchPapers(school_id, classid, subject);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllPapers = createAsyncThunk(
  "questionpaper/fetchAllPapers",
  async ({ school_id }, { rejectWithValue }) => {
    try {
      const response = await QuestionPaperService.fetchAllPapers(school_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePaper = createAsyncThunk(
  "questionpaper/deletePaper",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await QuestionPaperService.deletePaper(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const questionpaperSlice = createSlice({
  name: "questionpaper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPaper.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPaper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.papers.push(action.payload)
      })
      .addCase(addPaper.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchAllPapers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPapers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.papers = action.payload;
      })
      .addCase(fetchAllPapers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export default questionpaperSlice.reducer;
