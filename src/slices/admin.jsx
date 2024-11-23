import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import SchoolUsersService from "../services/schoolusers.service";

const classTest = JSON.parse(localStorage.getItem("classTest"));

export const getAcademicYearsDropdown = createAsyncThunk(
  "admin/getAcademicYearsDropdown",
  async ({ schoolcode }, { dispatch, rejectWithValue }) => {
    try {
      const data = await SchoolUsersService.getAcademicYearsDropdown(
        schoolcode
      );
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

export const fetchAllTeachers = createAsyncThunk(
  "admin/fetchAllTeachers",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.getAllTeachersByYear(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTeacherDetails = createAsyncThunk(
  "admin/fetchTeacherDetails",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.getTeacher(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTeacherDetails = createAsyncThunk(
  "admin/updateTeacherDetails",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.updateTeacherDetails(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllPrincipal = createAsyncThunk(
  "admin/fetchAllPrincipal",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.getAllOtherManagementMembersByYear(
        body
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllAccountant = createAsyncThunk(
  "admin/fetchAllAccountant",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.getAllOtherManagementMembersByYear(
        body
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllStaff = createAsyncThunk(
  "admin/fetchAllStaff",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.getAllOtherManagementMembersByYear(
        body
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchOtherManagementMemebrDetails = createAsyncThunk(
  "admin/fetchOtherManagementMemebrDetails",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.getOtherManagementMemeber(body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateOtherManagementMemebrDetails = createAsyncThunk(
  "admin/updateOtherManagementMemebrDetails",
  async (body, thunkAPI) => {
    try {
      const data = await SchoolUsersService.updateOtherManagementMemeberDetails(
        body
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  academicYearsDropdown: [],
  allTeachers: [],
  allPrincipal: [],
  allAccountant: [],
  allStaff: [],
  teacher: {},
  otherManagementMember: {},
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicYearsDropdown.fulfilled, (state, action) => {
        state.academicYearsDropdown = action.payload;
      })
      .addCase(getAcademicYearsDropdown.rejected, (state) => {
        state.academicYearsDropdown = [];
      })
      .addCase(fetchAllTeachers.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllTeachers.fulfilled, (state, action) => {
        state.allTeachers = action.payload;
      })
      .addCase(fetchAllTeachers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTeacherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(fetchTeacherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeacherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(updateTeacherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllPrincipal.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllPrincipal.fulfilled, (state, action) => {
        state.allPrincipal = action.payload;
      })
      .addCase(fetchAllPrincipal.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchAllAccountant.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllAccountant.fulfilled, (state, action) => {
        state.allAccountant = action.payload;
      })
      .addCase(fetchAllAccountant.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchAllStaff.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllStaff.fulfilled, (state, action) => {
        state.allStaff = action.payload;
      })
      .addCase(fetchAllStaff.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchOtherManagementMemebrDetails.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOtherManagementMemebrDetails.fulfilled, (state, action) => {
        state.otherManagementMember = action.payload;
      })
      .addCase(fetchOtherManagementMemebrDetails.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateOtherManagementMemebrDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOtherManagementMemebrDetails.fulfilled,
        (state, action) => {
          state.loading = false;
          state.otherManagementMember = action.payload;
        }
      )
      .addCase(updateOtherManagementMemebrDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = adminSlice;
export default reducer;
