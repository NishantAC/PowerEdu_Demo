import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '@/common/constant';
import { toast } from 'sonner';

const powerEduAuthToken = localStorage.getItem('powerEduAuthToken');
const token = 'Bearer ' + JSON.parse(powerEduAuthToken);
const API_URL = API_BASE_URL + 'admin/fees/';

// Async thunks for API calls
export const getFeeStructures = createAsyncThunk('feeManagement/getFeeStructures', async () => {
  const response = await axios.get(`${API_URL}fee-structures`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const createFeeStructure = createAsyncThunk('feeManagement/createFeeStructure', async (body) => {
  toast.info('Creating fee structure...');
  const response = await axios.post(`${API_URL}fee-structures`, body, {
    headers: { Authorization: token },
  });
  toast.success('Fee structure created successfully');
  return response.data.data[0];
});

export const deleteFeeStructure = createAsyncThunk('feeManagement/deleteFeeStructure', async (id) => {
  toast.info('Deleting fee structure...');
  const response = await axios.delete(`${API_URL}fee-structures/${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Fee structure deleted successfully');
  return response.data.data;
});

export const updateFeeStructure = createAsyncThunk('feeManagement/updateFeeStructure', async ({ id, body }) => {
  toast.info('Updating fee structure...');
  const response = await axios.put(`${API_URL}fee-structures/${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Fee structure updated successfully');
  return response.data.data[0];
});

export const getFeeDues = createAsyncThunk('feeManagement/getFeeDues', async () => {
  const response = await axios.get(`${API_URL}fee-dues`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const createFeeDue = createAsyncThunk('feeManagement/createFeeDue', async (body) => {
  toast.info('Creating fee due...');
  const response = await axios.post(`${API_URL}fee-dues`, body, {
    headers: { Authorization: token },
  });
  toast.success('Fee due created successfully');
  return response.data.data[0];
});

export const deleteFeeDue = createAsyncThunk('feeManagement/deleteFeeDue', async (id) => {
  toast.info('Deleting fee due...');
  const response = await axios.delete(`${API_URL}fee-dues/${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Fee due deleted successfully');
  return response.data.data;
});

export const updateFeeDue = createAsyncThunk('feeManagement/updateFeeDue', async ({ id, body }) => {
  toast.info('Updating fee due...');
  const response = await axios.put(`${API_URL}fee-dues/${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Fee due updated successfully');
  return response.data.data[0];
});

export const getFeePayments = createAsyncThunk('feeManagement/getFeePayments', async () => {
  const response = await axios.get(`${API_URL}fee-payments`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const createFeePayment = createAsyncThunk('feeManagement/createFeePayment', async (body) => {
  toast.info('Creating fee payment...');
  const response = await axios.post(`${API_BASE_URL}fees/fee-payments`, body, {
    headers: { Authorization: token },
  });
  toast.success('Fee payment created successfully');
  return response.data.data[0];
});

export const deleteFeePayment = createAsyncThunk('feeManagement/deleteFeePayment', async (id) => {
  toast.info('Deleting fee payment...');
  const response = await axios.delete(`${API_BASE_URL}fees/fee-payments/${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Fee payment deleted successfully');
  return response.data.data;
});

// Initial state
const initialState = {
  feeStructures: [],
  feeDues: [],
  feePayments: [],
  status: 'idle',
  error: null,
};

// Slice
const feeManagementSlice = createSlice({
  name: 'feeManagement',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeStructures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFeeStructures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeStructures = action.payload;
      })
      .addCase(getFeeStructures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createFeeStructure.pending, (state) => {
        // //state.status = 'loading';
      })
      .addCase(createFeeStructure.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeStructures.push(action.payload);
      })
      .addCase(createFeeStructure.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteFeeStructure.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(deleteFeeStructure.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeStructures = state.feeStructures.filter(feeStructure => feeStructure.id !== action.meta.arg);
      })
      .addCase(deleteFeeStructure.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateFeeStructure.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(updateFeeStructure.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.feeStructures.findIndex(feeStructure => feeStructure.id === action.meta.arg.id);
        if (index !== -1) {
          state.feeStructures[index] = action.payload;
        }
      })
      .addCase(updateFeeStructure.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getFeeDues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFeeDues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeDues = action.payload;
      })
      .addCase(getFeeDues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createFeeDue.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(createFeeDue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeDues.push(action.payload);
      })
      .addCase(createFeeDue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteFeeDue.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(deleteFeeDue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeDues = state.feeDues.filter(feeDue => feeDue.id !== action.meta.arg);
      })
      .addCase(deleteFeeDue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateFeeDue.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(updateFeeDue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.feeDues.findIndex(feeDue => feeDue.id === action.meta.arg.id);
        if (index !== -1) {
          state.feeDues[index] = action.payload;
        }
      })
      .addCase(updateFeeDue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getFeePayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFeePayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feePayments = action.payload;
      })
      .addCase(getFeePayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createFeePayment.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(createFeePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feePayments.push(action.payload);
      })
      .addCase(createFeePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteFeePayment.pending, (state) => {
        //state.status = 'loading';
      })
      .addCase(deleteFeePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feePayments = state.feePayments.filter(feePayment => feePayment.id !== action.meta.arg);
      })
      .addCase(deleteFeePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = feeManagementSlice.actions;
export default feeManagementSlice.reducer;