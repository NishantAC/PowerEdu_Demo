import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ExamService from "../services/exam.service";
import ExamMarkService from "../services/exammark.service";
import { fetchExamTypes } from "./examtype";

const initialState = {
  exams: [],
  studentProfile: [],
  examdetails: [],
  studentProgressData: [],
  studentmarks: [],
  isLoading: false,
  error: null,
};

export const addExam = createAsyncThunk(
  "exam/addExam",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamService.addExam(body);
      dispatch(fetchExamTypes({ school_code: body.school_code, class_code: body.class_code }))
      dispatch(setMessage(response.message));
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  }
);

export const fetchExams = createAsyncThunk(
  "exam/fetchExams",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamService.fetchExams(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getStudentProgressData = createAsyncThunk(
  "exam/getStudentProgressData",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamService.getStudentProgressData(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentProgressDataById = createAsyncThunk(
  "exam/getStudentProgressDataById",
  async (user_id, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamService.getStudentProgressDataById(user_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExam = createAsyncThunk(
  "exam/updateExam",
  async ({ updatedRow, school_code, class_code }, { rejectWithValue, dispatch }) => {
    try {
      console.log(updatedRow);
      const response = await ExamService.updateExam(updatedRow);
      dispatch(fetchExamTypes({ school_code, class_code }));
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  }
);

export const deleteExam = createAsyncThunk(
  "exam/deleteExam",
  async ({ id, school_code, class_code }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamService.deleteExam(id);
      dispatch(setMessage(response.message));
      dispatch(fetchExamTypes({ school_code, class_code }));
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  }
);

export const addExamMarks = createAsyncThunk(
  "exam/addExamMarks",
  async ({ marks, exam_id, createdby }, { rejectWithValue }) => {
    try {
      const response = await ExamMarkService.registerExamMark(marks, exam_id, createdby);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamMarks = createAsyncThunk(
  "exam/fetchExamMarks",
  async (body, { rejectWithValue }) => {
    try {
      const response = await ExamMarkService.getStudentMarks(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllExamDetails = createAsyncThunk(
  "exam/fetchAllExamDetails",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamService.getAllExamDetails(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExamDetailsByTeacher = createAsyncThunk(
  "exam/fetchExamDetailsByTeacher",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamService.getExamDetailsByTeacher(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudentMarks = createAsyncThunk(
  "exam/updateStudentMarks",
  async ({ examMarks, exam_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamMarkService.updateStudentMarks({ examMarks, exam_id });
      dispatch(fetchExamMarks({ examid: exam_id }))
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStudentMarks = createAsyncThunk(
  "exam/deleteStudentMarks",
  async (markId, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamMarkService.deleteStudentMarks(markId);
      dispatch(fetchExamMarks({ examid: exam_id }))
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setStudentProfile: (state, action) => {
      state.studentProfile = action.payload
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams.push(action.payload);
      })
      .addCase(addExam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchExams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getStudentProgressData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStudentProgressData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentProgressData = action.payload;
      })
      .addCase(getStudentProgressData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getStudentProgressDataById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStudentProgressDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentProgressData = action.payload;
      })
      .addCase(getStudentProgressDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchExamMarks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamMarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentmarks = action.payload;
      })
      .addCase(fetchExamMarks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchAllExamDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllExamDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examdetails = action.payload;
      })
      .addCase(fetchAllExamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchExamDetailsByTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamDetailsByTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examdetails = action.payload;
      })
      .addCase(fetchExamDetailsByTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateExam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(deleteExam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = state.exams.filter((type) => type.id !== parseInt(action.payload.id));
        state.message = action.payload.message;
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export const { clearMessage, clearError, setStudentProfile } = examSlice.actions;
const { reducer } = examSlice;
export default reducer;
