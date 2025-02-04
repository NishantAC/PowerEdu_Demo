import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HYExamService from "../services/hyexam.service";
import HYExamMarkService from "../services/hyexammark.service";

const hyexam = JSON.parse(localStorage.getItem("hyexam"));

const initialState = {
  hyexams: [],
  dropDown: [],
  examdetails: [],
  studentmarks: [],
  isLoading: false,
  message: null,
  error: null,
};

export const addExamMarks = createAsyncThunk(
  "hyexams/addExamMarks",
  async ({marks, exam_id, createdby}, { rejectWithValue }) => {
    try {
      const response = await HYExamMarkService.registerHYExamMark(marks, exam_id, createdby);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamMarks = createAsyncThunk(
  "hyexams/fetchExamMarks",
  async (body, { rejectWithValue }) => {
    try {
      const response = await HYExamService.getUserExamMarks(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamDetails = createAsyncThunk(
  "hyexams/fetchExamDetails",
  async (body, { rejectWithValue }) => {
    try {
      const response = await HYExamService.getUserExamDetails(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamDetailsByClass = createAsyncThunk(
  "hyexams/fetchExamDetailsByClass",
  async (body, { rejectWithValue }) => {
    try {
      const response = await HYExamService.getStudentExamDetails(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentMarks = createAsyncThunk(
  "hyexams/fetchStudentMarks",
  async (body, { rejectWithValue }) => {
    try {
      const response = await HYExamMarkService.getStudentMarks(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudentMarks = createAsyncThunk(
  "hyexams/updateStudentMarks",
  async ({examMarks, exam_id}, { rejectWithValue, dispatch }) => {
    try {
      const response = await HYExamMarkService.updateStudentMarks({examMarks, exam_id});
      dispatch(fetchStudentMarks({exam_id}))
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const registerhyexam = createAsyncThunk(
  "hyexams/registerhyexam",
  async (
    {
      school_id,
      schoolclassId,
      subjectId,
      syllabus,
      examdate,
      totalmarks,
      createdby,
    },
    thunkAPI
  ) => {
    try {
      const response = await HYExamService.registerHYExam(
        school_id,
        schoolclassId,
        subjectId,
        syllabus,
        examdate,
        totalmarks,
        createdby
      );
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const hyexamSlice = createSlice({
  name: "hyexams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamMarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamMarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hyexams = action.payload.exams;
        state.dropDown = action.payload.dropDown;
      })
      .addCase(fetchExamMarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchExamDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examdetails = action.payload;
      })
      .addCase(fetchExamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchExamDetailsByClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamDetailsByClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examdetails = action.payload;
      })
      .addCase(fetchExamDetailsByClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchStudentMarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentMarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentmarks = action.payload;
      })
      .addCase(fetchStudentMarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(registerhyexam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerhyexam.fulfilled, (state) => {
        state.isLoading = false;
        state.hyexams.push(action.payload.data)
      })
      .addCase(registerhyexam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateStudentMarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStudentMarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message
      })
      .addCase(updateStudentMarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
  },
});

export default hyexamSlice.reducer;
