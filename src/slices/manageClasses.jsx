import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ManageClassesService from "../services/manageClasses.service";
import { toast } from "sonner";

export const createClass = createAsyncThunk(
  "classes/createClass",
  async (classData, thunkAPI) => {
    try {
      toast.info("Creating class...");
      const response = await ManageClassesService.createClass(classData);
      thunkAPI.dispatch(setMessage(response.message));
      thunkAPI.dispatch(fetchClasses({ school_id: 1, academic_year_id: 1 })); // Fetch classes after creating
      toast.success("Class created successfully");
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      toast.error(message);
      throw error;
    }
  }
);

export const updateClass = createAsyncThunk(
  "classes/updateClass",
  async ({ id, classData }, thunkAPI) => {
    try {
      toast.info("Updating class...");
      const response = await ManageClassesService.updateClass(id, classData);
      thunkAPI.dispatch(setMessage(response.message));
      thunkAPI.dispatch(fetchClasses({ school_id: 1, academic_year_id: 1 })); // Fetch classes after updating
      toast.success("Class updated successfully");
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      toast.error(message);

      throw error;
    }
  }
);

export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async ({ school_id, academic_year_id }, thunkAPI) => {
    try {
      const response = await ManageClassesService.fetchClasses(school_id, academic_year_id);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      throw error;
    }
  }
);

export const fetchClassDetail = createAsyncThunk(
  "classes/fetchClassDetail",
  async (id, thunkAPI) => {
    try {
      const response = await ManageClassesService.fetchClassDetail(id);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      toast.error(message);

      throw error;
    }
  }
);

export const deleteClass = createAsyncThunk(
  "classes/deleteClass",
  async (id, thunkAPI) => {
    try {
      toast.info("Deleting class...");
      const response = await ManageClassesService.deleteClass(id);
      thunkAPI.dispatch(setMessage(response.message));
      thunkAPI.dispatch(fetchClasses({ school_id: 1, academic_year_id: 1 })); // Fetch classes after deleting
      toast.success("Class deleted successfully");
      return response;
      
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      toast.error(message);
      throw error;
    }
  }
);

const initialState = {
  classes: [],
  classDetail: null,
  loading: false,
  error: null,
};

const manageClassesSlice = createSlice({
  name: "manageClasses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.loading = false;
      })
      .addCase(fetchClassDetail.fulfilled, (state, action) => {
        state.classDetail = action.payload;
        state.loading = false;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("classes/") &&
          action.type.endsWith("/pending") &&
          !["classes/createClass/pending", "classes/updateClass/pending", "classes/deleteClass/pending"].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("classes/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("classes/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

const { reducer } = manageClassesSlice;
export default reducer;