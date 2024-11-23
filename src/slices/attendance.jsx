import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AttendanceService from "../services/attendance.service";

const initialState = {
  allStudentsOfClass: [],
  teachersWithAttendance: [],
  userAttendance: {},
  studentsAcademicYears: {},
  filterAcademicYear: [],
  loading: false,
  error: null,
};

export const fetchAllStudentsOfClass = createAsyncThunk(
  "attendance/fetchAllStudentsOfClass",
  async (body, thunkAPI) => {
    try {
      const data = await AttendanceService.getAllStudentsOfClass(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserAttendance = createAsyncThunk(
  "attendance/fetchUserAttendance",
  async (body, thunkAPI) => {
    try {
      const data = await AttendanceService.getUserAttendance(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const markUserAttendance = createAsyncThunk(
  "attendance/markUserAttendance",
  async (body, thunkAPI) => {
    try {
      const data = await AttendanceService.markUserAttendance(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAcademicYearFilter = createAsyncThunk(
  "attendance/fetchAcademicYearFilter",
  async (body, thunkAPI) => {
    try {
      const data = await AttendanceService.getAcademicYearFilter(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentsAcedemicYears = createAsyncThunk(
  "attendance/fetchStudentsClasses",
  async (body, thunkAPI) => {
    try {
      const data = await AttendanceService.getStudentsAcedemicYears(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTeachersWithAttendance = createAsyncThunk(
  "attendance/teacherattendance",
  async (body, thunkAPI) => {
    try {
      const data = await AttendanceService.getTeachersWithAttendance(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudentsOfClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudentsOfClass.fulfilled, (state, action) => {
        state.loading = false;
        state.allStudentsOfClass = action.payload;
      })
      .addCase(fetchAllStudentsOfClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.userAttendance = action.payload;
      })
      .addCase(fetchUserAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAcademicYearFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicYearFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.filterAcademicYear = action.payload;
      })
      .addCase(fetchAcademicYearFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStudentsAcedemicYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsAcedemicYears.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsAcademicYears = action.payload;
      })
      .addCase(fetchStudentsAcedemicYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeachersWithAttendance.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchTeachersWithAttendance.fulfilled, (state, action) => {
        state.loading = true;
        state.teachersWithAttendance = action.payload;
      })
      .addCase(fetchTeachersWithAttendance.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
  },
});

export default attendanceSlice.reducer;
