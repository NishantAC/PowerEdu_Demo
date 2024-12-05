import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllMails } from '@/services/mail.service';

export const fetchMails = createAsyncThunk('mail/fetchMails', async (userId) => {
  const response = await fetchAllMails(userId);
  console.log("Hello world", response.data);
  return response.data;
});

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    mails: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mails = action.payload;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mailSlice.reducer;