import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '@/common/constant';
import { toast } from 'sonner';

const powerEduAuthToken = localStorage.getItem('powerEduAuthToken');
const token = 'Bearer ' + JSON.parse(powerEduAuthToken);
const API_URL = API_BASE_URL + 'admin/school-notices/';

// Async thunks for API calls
export const createSchoolNotice = createAsyncThunk('schoolnotice/createSchoolNotice', async (body) => {
  toast.info('Creating school notice...');
  const response = await axios.post(API_URL, body, {
    headers: { Authorization: token },
  });
  toast.success('School notice created successfully');
  return response.data.data[0];
});

export const getSchoolNoticeData = createAsyncThunk('schoolnotice/getSchoolNoticeData', async ({ school_id, academic_year_id }) => {
  const response = await axios.get(`${API_URL}?school_id=${school_id}&academic_year_id=${academic_year_id}`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const deleteSchoolNotice = createAsyncThunk('schoolnotice/deleteSchoolNotice', async (id) => {
  toast.info('Deleting school notice...');
  const response = await axios.delete(`${API_URL}${id}`, {
    headers: { Authorization: token },
  });
  toast.success('School notice deleted successfully');
  return response.data.data;
});

export const updateSchoolNotice = createAsyncThunk('schoolnotice/updateSchoolNotice', async ({ id, body }) => {
  toast.info('Updating school notice...');
  const response = await axios.put(`${API_URL}${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('School notice updated successfully');
  return response.data.data[0];
});

// Initial state
const initialState = {
  notices: [],
  status: 'idle',
  error: null,
};

// Slice
const schoolNoticeSlice = createSlice({
  name: 'schoolnotice',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchoolNotice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSchoolNotice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notices.push(action.payload);
      })
      .addCase(createSchoolNotice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSchoolNoticeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSchoolNoticeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notices = action.payload;
      })
      .addCase(getSchoolNoticeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSchoolNotice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSchoolNotice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notices = state.notices.filter(notice => notice.id !== action.meta.arg);
      })
      .addCase(deleteSchoolNotice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSchoolNotice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSchoolNotice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.notices.findIndex(notice => notice.id === action.meta.arg.id);
        if (index !== -1) {
          state.notices[index] = action.payload;
        }
      })
      .addCase(updateSchoolNotice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = schoolNoticeSlice.actions;
export default schoolNoticeSlice.reducer;
