import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '@/common/constant';
import { toast } from 'sonner';

const powerEduAuthToken = localStorage.getItem('powerEduAuthToken');
const token = 'Bearer ' + JSON.parse(powerEduAuthToken);
const API_URL = API_BASE_URL + 'admin/transports/';

// Async thunks for API calls
export const getDriversList = createAsyncThunk('transport/getDriversList', async () => {
  const response = await axios.get(`${API_URL}drivers`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const getBusesList = createAsyncThunk('transport/getBusesList', async () => {
  const response = await axios.get(`${API_URL}buses`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const getTransportRoutesList = createAsyncThunk('transport/getTransportRoutesList', async () => {
  const response = await axios.get(`${API_URL}routes`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const getTransportZonesList = createAsyncThunk('transport/getTransportZonesList', async () => {
  const response = await axios.get(`${API_URL}zones`, {
    headers: { Authorization: token },
  });
  return response.data.data;
});

export const createTransportZone = createAsyncThunk('transport/createTransportZone', async (body) => {
  toast.info('Creating transport zone...');
  const response = await axios.post(`${API_URL}zones`, body, {
    headers: { Authorization: token },
  });
  toast.success('Transport zone created successfully');
  return response.data.data;
});

export const createBusRoutesRoute = createAsyncThunk('transport/createBusRoutesRoute', async (body) => {
  toast.info('Creating bus route...');
  const response = await axios.post(`${API_URL}routes`, body, {
    headers: { Authorization: token },
  });
  toast.success('Bus route created successfully');
  return response.data.data[0]; // Return the first object in the data array
});

export const createBus = createAsyncThunk('transport/createBus', async (body) => {
  toast.info('Creating bus...');
  const response = await axios.post(`${API_URL}buses`, body, {
    headers: { Authorization: token },
  });
  toast.success('Bus created successfully');
  return response.data.data[0]; // Return the first object in the data array
});

export const createBusDriverRoute = createAsyncThunk('transport/createBusDriverRoute', async (body) => {
  toast.info('Creating driver...');
  const response = await axios.post(`${API_URL}drivers`, body, {
    headers: { Authorization: token },
  });
  toast.success('Driver created successfully');
  return response.data.data[0]; // Return the first object in the data array
});

export const deleteTransportZone = createAsyncThunk('transport/deleteTransportZone', async (id) => {
  toast.info('Deleting transport zone...');
  const response = await axios.delete(`${API_URL}zones/${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Transport zone deleted successfully');
  return response.data.data;
});

export const deleteBusRouter = createAsyncThunk('transport/deleteBusRouter', async (id) => {
  toast.info('Deleting bus route...');
  const response = await axios.delete(`${API_URL}routes/${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Bus route deleted successfully');
  return response.data.data;
});

export const deleteBus = createAsyncThunk('transport/deleteBus', async (id) => {
  toast.info('Deleting bus...');
  const response = await axios.delete(`${API_URL}buses/${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Bus deleted successfully');
  return response.data.data;
});

export const deleteDrivers = createAsyncThunk('transport/deleteDrivers', async (id) => {
  toast.info('Deleting driver...');
  const response = await axios.delete(`${API_URL}drivers/${id}`, {
    headers: { Authorization: token },
  });
  toast.success('Driver deleted successfully');
  return response.data.data;
});

export const updateTransportZoneRoutes = createAsyncThunk('transport/updateTransportZoneRoutes', async ({ id, body }) => {
  toast.info('Updating transport zone...');
  const response = await axios.put(`${API_URL}zones/${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Transport zone updated successfully');
  return response.data.data;
});

export const updateBusRouter = createAsyncThunk('transport/updateBusRouter', async ({ id, body }) => {
  toast.info('Updating bus route...');
  const response = await axios.put(`${API_URL}routes/${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Bus route updated successfully');
  return response.data.data;
});

export const updateBus = createAsyncThunk('transport/updateBus', async ({ id, body }) => {
  toast.info('Updating bus...');
  const response = await axios.put(`${API_URL}buses/${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Bus updated successfully');
  return response.data.data;
});

export const updateDrivers = createAsyncThunk('transport/updateDrivers', async ({ id, body }) => {
  toast.info('Updating driver...');
  const response = await axios.put(`${API_URL}drivers/${id}`, body, {
    headers: { Authorization: token },
  });
  toast.success('Driver updated successfully');
  return response.data.data;
});

// Initial state
const initialState = {
  drivers: [],
  buses: [],
  routes: [],
  zones: [],
  status: 'idle',
  error: null,
};

// Slice
const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDriversList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDriversList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drivers = action.payload;
      })
      .addCase(getDriversList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getBusesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBusesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buses = action.payload;
      })
      .addCase(getBusesList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTransportRoutesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransportRoutesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.routes = action.payload;
      })
      .addCase(getTransportRoutesList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTransportZonesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransportZonesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.zones = action.payload;
      })
      .addCase(getTransportZonesList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTransportZone.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTransportZone.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.zones.push(action.payload);
      })
      .addCase(createTransportZone.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBusRoutesRoute.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBusRoutesRoute.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.routes.push(action.payload);
      })
      .addCase(createBusRoutesRoute.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buses.push(action.payload);
      })
      .addCase(createBus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBusDriverRoute.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBusDriverRoute.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drivers.push(action.payload);
      })
      .addCase(createBusDriverRoute.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTransportZone.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTransportZone.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.zones = state.zones.filter(zone => zone.id !== action.meta.arg);
      })
      .addCase(deleteTransportZone.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBusRouter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBusRouter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.routes = state.routes.filter(route => route.id !== action.meta.arg);
      })
      .addCase(deleteBusRouter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buses = state.buses.filter(bus => bus.id !== action.meta.arg);
      })
      .addCase(deleteBus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteDrivers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDrivers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drivers = state.drivers.filter(driver => driver.id !== action.meta.arg);
      })
      .addCase(deleteDrivers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTransportZoneRoutes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTransportZoneRoutes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.zones.findIndex(zone => zone.id === action.meta.arg.id);
        if (index !== -1) {
          state.zones[index] = action.payload;
        }
      })
      .addCase(updateTransportZoneRoutes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBusRouter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBusRouter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.routes.findIndex(route => route.id === action.meta.arg.id);
        if (index !== -1) {
          state.routes[index] = action.payload;
        }
      })
      .addCase(updateBusRouter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.buses.findIndex(bus => bus.id === action.meta.arg.id);
        if (index !== -1) {
          state.buses[index] = action.payload;
        }
      })
      .addCase(updateBus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateDrivers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDrivers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.drivers.findIndex(driver => driver.id === action.meta.arg.id);
        if (index !== -1) {
          state.drivers[index] = action.payload;
        }
      })
      .addCase(updateDrivers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = transportSlice.actions;
export default transportSlice.reducer;