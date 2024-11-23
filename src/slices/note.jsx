import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import NoteService from "../services/note.service";

const note = JSON.parse(localStorage.getItem("note"));

export const registernote = createAsyncThunk(
  "note/registernote",
  async ({ schoolcode, classname, subjectname, chaptername, notename, createdby }, thunkAPI) => {
    try {
      const response = await NoteService.registernote(schoolcode, classname, subjectname, chaptername, notename, createdby);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
  }
);

const initialState = {
  isLoggedIn: !!note,
  note,
  loading: false,
  error: null,
};

const handleRejected = (state, action) => {
  state.isLoggedIn = false;
  state.loading = false;
  state.error = action.payload;
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registernote.pending, (state) => {
        state.loading = true;
      })
      .addCase(registernote.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(registernote.rejected, handleRejected);
  },
});

export default noteSlice.reducer;
