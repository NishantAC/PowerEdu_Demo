import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ClassTestMarkService from "../services/classtestmark.service";

const classtestmark = JSON.parse(localStorage.getItem("classtestmark"));


export const fetchClassTestMarks = createAsyncThunk(
  "classtestmark/fetchClassTestMarks",
  async (body, { rejectWithValue }) => {
    try {
      const response = await ClassTestMarkService.getClassTestMarks(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const registerclasstestmark = createAsyncThunk(
  "classtestmark/registerclasstestmark",
  async ({ schoolcode, classname, subjectname, studentname, examdate, obtainedmarks, createdby }, thunkAPI) => {
    try {
      const response = await ClassTestMarkService.registerClassTestMark(schoolcode, classname, subjectname, studentname, examdate, obtainedmarks, createdby);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  classtestmark: classtestmark || [],
  isLoading: false,
  error: null,
};

const classtestmarkSlice = createSlice({
  name: "classtestmark",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchClassTestMarks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchClassTestMarks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.classtestmark = action.payload;
    })
    .addCase(fetchClassTestMarks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ? action.payload.message : action.error.message;
    })
      .addCase(registerclasstestmark.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerclasstestmark.fulfilled, (state) => {
        state.isLoading = false;
        state.classtestmark.push(action.payload.data)
      })
      .addCase(registerclasstestmark.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { reducer } = classtestmarkSlice;
export default reducer;
