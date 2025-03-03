import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '@/common/constant';
import { toast } from 'sonner';

const powerEduAuthToken = localStorage.getItem('powerEduAuthToken');
const token = 'Bearer ' + JSON.parse(powerEduAuthToken);
const API_URL = API_BASE_URL + 'admin/class-notices/';

// Async thunks for API calls
export const createClassNotice = createAsyncThunk('Classnotice/createClassNotice', async (body) => {
  toast.info('Creating Class notice...');
  const response = await axios.post(API_URL, body, {
    headers: { Authorization: token },
  });
  toast.success('Class notice created successfully');
  return response.data.data[0];
});

export const getClassNoticeData = createAsyncThunk('Classnotice/getClassNoticeData', async ({ Class_id, academic_year_id }) => {
  const response = await axios.get(`${API_URL}?school_id=${Class_id}&academic_year_id=${academic_year_id}`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const deleteClassNotice = createAsyncThunk('Classnotice/deleteClassNotice', async (id) => {
  toast.info('Deleting Class notice...');
  const response = await axios.delete(`${API_URL}${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Class notice deleted successfully');
  return response.data.data;
});

export const updateClassNotice = createAsyncThunk('Classnotice/updateClassNotice', async ({ id, body }) => {
  toast.info('Updating Class notice...');
  const response = await axios.put(`${API_URL}${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Class notice updated successfully');
  return response.data.data[0];
});

// Initial state
const initialState = {
  notices: [],
  status: 'idle',
  error: null,
};

// Slice
const ClassNoticeSlice = createSlice({
  name: 'Classnotice',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClassNotice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClassNotice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notices.push(action.payload);
      })
      .addCase(createClassNotice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getClassNoticeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClassNoticeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notices = action.payload;
      })
      .addCase(getClassNoticeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteClassNotice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteClassNotice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notices = state.notices.filter(notice => notice.id !== action.meta.arg);
      })
      .addCase(deleteClassNotice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateClassNotice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateClassNotice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.notices.findIndex(notice => notice.id === action.meta.arg.id);
        if (index !== -1) {
          state.notices[index] = action.payload;
        }
      })
      .addCase(updateClassNotice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = ClassNoticeSlice.actions;
export default ClassNoticeSlice.reducer;
