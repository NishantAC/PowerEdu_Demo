import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import YExamMarkService from "../services/yexammark.service";
import { setMessage } from "./message";

const yexammark = JSON.parse(localStorage.getItem("yexammark"));

export const registeryexammark = createAsyncThunk(
  "notice/registeryexammark",
  async ({ school_id, classname, subjectname, studentname, examdate, obtainedmarks, createdby }, { rejectWithValue }) => {
    try {
      const response = await YExamMarkService.registeryexammark(school_id, classname, subjectname, studentname, examdate, obtainedmarks, createdby);
      setMessage(response.data.message);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(message);
      return rejectWithValue();
    }
  }
);

const initialState = yexammark
  ? { isLoggedIn: true, yexammark }
  : { isLoggedIn: false, yexammark: null };

const yexammarkSlice = createSlice({
  name: "yexammark",
  initialState,
  extraReducers: {
    [registeryexammark.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registeryexammark.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export default yexammarkSlice.reducer;
