import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StudentService from "../services/student.service";

const initialState = {
  allStudents: [],
  studentsWithMarks: [],
  student: {},
  academics: [],
  loading: false,
  error: null,
};

export const fetchAllStudents = createAsyncThunk(
  "attendance/fetchAllStudents",
  async (body, thunkAPI) => {
    try {
      const data = await StudentService.getAllStudents(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentStudentData = createAsyncThunk(
  "student/getCurrentStudentData",
  async (body, thunkAPI) => {
    try {
      const data = await StudentService.getStudentDetails(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentsWithMarks = createAsyncThunk(
  "attendance/fetchStudentsWithMarks",
  async (body, thunkAPI) => {
    try {
      const data = await StudentService.getStudentsWithMarks(body);
      console.log(data,"returnddatatatatatattaatata")
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentDetails = createAsyncThunk(
  "attendance/fetchStudentDetails",
  async (body, thunkAPI) => {
    try {
      const data = await StudentService.getStudent(body);
      console.log(data,"datatataatatatatatat")
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateStudentDetails = createAsyncThunk(
  "attendance/updateStudentDetails",
  async (body, thunkAPI) => {
    try {
      const data = await StudentService.updateStudentDetails(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteStudentProfile = createAsyncThunk(
  "attendance/deleteStudentProfile",
  async (body, thunkAPI) => {
    try {
      const data = await StudentService.deleteStudentProfile(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getStudentAcademics = createAsyncThunk(
  "attendance/getStudentAcademics",
  async (body, thunkAPI) => {
    try {
      const data = await StudentService.getStudentAcademics(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const attendanceSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.allStudents = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentsWithMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsWithMarks = action.payload;
      })
      .addCase(fetchStudentsWithMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsWithMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStudentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(updateStudentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudentProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudentAcademics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentAcademics.fulfilled, (state, action) => {
        state.academics = action.payload;
        state.loading = false;
      })
      .addCase(getStudentAcademics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(getCurrentStudentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(getCurrentStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
