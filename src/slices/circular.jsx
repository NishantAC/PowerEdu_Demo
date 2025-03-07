import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '@/common/constant';
import { toast } from 'sonner';

const powerEduAuthToken = localStorage.getItem('powerEduAuthToken');
const token = 'Bearer ' + JSON.parse(powerEduAuthToken);
const API_URL = API_BASE_URL + 'admin/circulars/';

// Async thunks for API calls
export const getCirculars = createAsyncThunk('circularManagement/getCirculars', async ({ school_id, academic_year_id }) => {
  const response = await axios.get(`${API_URL}?school_id=${school_id}&academic_year_id=${academic_year_id}`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const createCircular = createAsyncThunk('circularManagement/createCircular', async (body) => {
  toast.info('Creating circular...');
  const response = await axios.post(API_URL, body, {
    headers: { Authorization: token },
  });
  toast.success('Circular created successfully');
  return response.data.data[0];
});

export const deleteCircular = createAsyncThunk('circularManagement/deleteCircular', async (id) => {
  toast.info('Deleting circular...');
  const response = await axios.delete(`${API_URL}${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Circular deleted successfully');
  return response.data.data;
});

export const updateCircular = createAsyncThunk('circularManagement/updateCircular', async ({ id, body }) => {
  toast.info('Updating circular...');
  const response = await axios.put(`${API_URL}${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Circular updated successfully');
  return response.data.data[0];
});

// Initial state
const initialState = {
  circulars: [],
  status: 'idle',
  error: null,
};

// Slice
const circularManagementSlice = createSlice({
  name: 'circularManagement',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCirculars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCirculars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.circulars = action.payload;
      })
      .addCase(getCirculars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCircular.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(createCircular.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.circulars.push(action.payload);
      })
      .addCase(createCircular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCircular.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(deleteCircular.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.circulars = state.circulars.filter(circular => circular.id !== action.meta.arg);
      })
      .addCase(deleteCircular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCircular.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(updateCircular.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.circulars.findIndex(circular => circular.id === action.meta.arg.id);
        if (index !== -1) {
          state.circulars[index] = action.payload;
        }
      })
      .addCase(updateCircular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = circularManagementSlice.actions;
export default circularManagementSlice.reducer;