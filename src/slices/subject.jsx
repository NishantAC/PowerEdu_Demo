import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import SubjectService from "../services/subject.service";

const subject = JSON.parse(localStorage.getItem("subject"));

export const registersubject = createAsyncThunk(
  "subject/registersubject",
  async ({ schoolcode, classname, subjectname, createdby }, thunkAPI) => {
    try {
      const { data } = await SubjectService.registerSubject(
        schoolcode,
        classname,
        subjectname,
        createdby
      );
      thunkAPI.dispatch(setMessage(data.message));
      return data;
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

export const getAllSubjectDetails = createAsyncThunk(
  "subject/getAllSubjects",
  async ({ class_code, school_code, subject_code }, thunkAPI) => {
    try {
      const response = await SubjectService.getAllSubjectsDetails(
        class_code,
        school_code,
        subject_code
      );
      // thunkAPI.dispatch(setMessage(data.message));
      // console.log(response)
      return response;
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

export const getAllSubjectsBySchool = createAsyncThunk(
  "subject/getAllSubjectsBySchool",
  async ({ schoolcode }, thunkAPI) => {
    try {
      const response = await SubjectService.getAllSubjectsBySchool(schoolcode);
      // thunkAPI.dispatch(setMessage(data.message));
      // console.log(response)
      return response;
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

export const getDropdownSubjectsByClass = createAsyncThunk(
  "subject/getDropdownSubjectsByClass",
  async ({ schoolcode, class_code, timetable }, thunkAPI) => {
    try {
      const response = await SubjectService.getDropdownSubjectsByClass(
        schoolcode,
        class_code,
        timetable
      );
      // thunkAPI.dispatch(setMessage(data.message));
      // console.log(response)
      return response;
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

export const getAllDropdownSubjectsByClass = createAsyncThunk(
  "subject/getAllDropdownSubjectsByClass",
  async ({ class_code }, thunkAPI) => {
    try {
      const response = await SubjectService.getAllDropdownSubjectsByClass(
        class_code
      );
      // thunkAPI.dispatch(setMessage(data.message));
      // console.log(response)
      return response;
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

export const getSubjectsOfClasses = createAsyncThunk(
  "subject/getSubjectsOfClasses",
  async (body, thunkAPI) => {
    try {
      const response = await SubjectService.getSubjectsOfClasses(body);
      // thunkAPI.dispatch(setMessage(data.message));
      // console.log(response)
      return response;
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

// const subjectInitial = {subjectDetails: []};
// const initialState = subject ? { subject, ...subjectInitial } : { subject: null, ...subjectInitial };

const initialState = {
  subject: [],
  dropdownClassSubjects: [],
  alldropdownClassSubjects: [],
  subjects: [], // for table
  message: null,
  status: "idle",
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    resetSubjectsDropdown: (state) => {
      state.alldropdownClassSubjects = []; // Clear the alldropdownClassSubjects state
    },
  },
  extraReducers: (builder) => {
    // Add the getAllSubjectDetails async thunk to the slice
    builder.addCase(getAllSubjectDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllSubjectDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.subject = action.payload;
    });
    builder.addCase(getAllSubjectDetails.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message; //added optional chaining so when payload or action is undefined it will not generate error
    });
    builder.addCase(getAllSubjectsBySchool.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllSubjectsBySchool.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.subject = action.payload;
    });
    builder.addCase(getAllSubjectsBySchool.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message; //added optional chaining so when payload or action is undefined it will not generate error
    });
    builder.addCase(getDropdownSubjectsByClass.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDropdownSubjectsByClass.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.dropdownClassSubjects = action.payload;
    });
    builder.addCase(getDropdownSubjectsByClass.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message; //added optional chaining so when payload or action is undefined it will not generate error
    });
    builder.addCase(getAllDropdownSubjectsByClass.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getAllDropdownSubjectsByClass.fulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.alldropdownClassSubjects = action.payload;
      }
    );
    builder.addCase(getAllDropdownSubjectsByClass.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message; //added optional chaining so when payload or action is undefined it will not generate error
    });
    builder.addCase(getSubjectsOfClasses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSubjectsOfClasses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.subjects = action.payload;
    });
    builder.addCase(getSubjectsOfClasses.rejected, (state, action) => {
      state.status = "failed";
      state.message = action?.payload?.message; //added optional chaining so when payload or action is undefined it will not generate error
    });
  },
});
export const { resetSubjectsDropdown } = subjectSlice.actions;
export default subjectSlice.reducer;
