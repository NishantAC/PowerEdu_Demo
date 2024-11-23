import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ExamTypeService from "../services/examtype.service";

const initialState = {
  examTypes: [],
  dropDownExamTypes: [],
  isLoading: false,
  error: null,
};

export const addExamType = createAsyncThunk(
  "examtype/addExamType",
  async ({ school_code, class_code, title }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamTypeService.addExamType({ school_code, class_code, title });
      dispatch(setMessage(response.message));
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  }
);

export const fetchExamTypes = createAsyncThunk(
  "examtype/fetchExamTypes",
  async ({ school_code, class_code }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamTypeService.fetchExamTypes({ school_code, class_code });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchDropdownExamTypes = createAsyncThunk(
  "examtype/fetchDropdownExamTypes",
  async ({ school_code, class_code }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamTypeService.fetchDropdownExamTypes({ school_code, class_code });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExamType = createAsyncThunk(
  "examtype/updateExamType",
  async ({ id, school_code, class_code, title }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamTypeService.updateExamType({ id, school_code, class_code, title });
      dispatch(fetchExamTypes({ school_code, class_code }));
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  }
);

export const mergeExamTypes = createAsyncThunk(
  "examtype/mergeExamTypes",
  async ({ examTypeData, class_code }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamTypeService.mergeExamTypes(examTypeData, class_code);
      dispatch(fetchExamTypes({ school_code: examTypeData.school_code, class_code: class_code }));
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message);
    }
  }
);

export const deleteExamType = createAsyncThunk(
  "examtype/deleteExamType",
  async ({ id, school_code, class_code }, { rejectWithValue, dispatch }) => {
    try {
      const response = await ExamTypeService.deleteExamType(id);
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

const examTypeSlice = createSlice({
  name: 'examtype',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExamType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addExamType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examTypes.push(action.payload);
      })
      .addCase(addExamType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchExamTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examTypes = action.payload;
      })
      .addCase(fetchExamTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(fetchDropdownExamTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDropdownExamTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dropDownExamTypes = action.payload;
      })
      .addCase(fetchDropdownExamTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateExamType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateExamType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateExamType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(mergeExamTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(mergeExamTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(mergeExamTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(deleteExamType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteExamType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examTypes = state.examTypes.filter((type) => type.id !== parseInt(action.payload.id));
        state.message = action.payload.message;
      })
      .addCase(deleteExamType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export const { clearMessage, clearError } = examTypeSlice.actions;
const { reducer } = examTypeSlice;
export default reducer;
