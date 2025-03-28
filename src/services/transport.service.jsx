import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "@/common/constant";

const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const API_URL = API_BASE_URL + "admin/transports/";

// Async thunks for API calls
export const getDriversList = createAsyncThunk(
  "transport/getDriversList",
  async () => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);
    const response = await axios.get(`${API_URL}drivers`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const getBusesList = createAsyncThunk(
  "transport/getBusesList",
  async () => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);
    const response = await axios.get(`${API_URL}buses`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const getTransportRoutesList = createAsyncThunk(
  "transport/getTransportRoutesList",
  async () => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.get(`${API_URL}routes`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const getTransportZonesList = createAsyncThunk(
  "transport/getTransportZonesList",
  async () => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.get(`${API_URL}zones`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const createTransportZone = createAsyncThunk(
  "transport/createTransportZone",
  async (body) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.post(`${API_URL}zones`, body, {
      headers: { Authorization: token },
    });
    console.log("Create zone " + response.data);
    return response.data;
  }
);

export const createBusRoutesRoute = createAsyncThunk(
  "transport/createBusRoutesRoute",
  async (body) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.post(`${API_URL}routes`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const createBus = createAsyncThunk(
  "transport/createBus",
  async (body) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.post(`${API_URL}buses`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const createBusDriverRoute = createAsyncThunk(
  "transport/createBusDriverRoute",
  async (body) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.post(`${API_URL}drivers`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const deleteTransportZone = createAsyncThunk(
  "transport/deleteTransportZone",
  async (id) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.delete(`${API_URL}zones/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const deleteBusRouter = createAsyncThunk(
  "transport/deleteBusRouter",
  async (id) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.delete(`${API_URL}routes/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const deleteBus = createAsyncThunk("transport/deleteBus", async (id) => {
  const token = "Bearer " + JSON.parse(powerEduAuthToken);

  const response = await axios.delete(`${API_URL}buses/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
});

export const deleteDrivers = createAsyncThunk(
  "transport/deleteDrivers",
  async (id) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.delete(`${API_URL}drivers/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const updateTransportZoneRoutes = createAsyncThunk(
  "transport/updateTransportZoneRoutes",
  async ({ id, body }) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.put(`${API_URL}zones/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const updateBusRouter = createAsyncThunk(
  "transport/updateBusRouter",
  async ({ id, body }) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.put(`${API_URL}routes/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const updateBus = createAsyncThunk(
  "transport/updateBus",
  async ({ id, body }) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);

    const response = await axios.put(`${API_URL}buses/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const updateDrivers = createAsyncThunk(
  "transport/updateDrivers",
  async ({ id, body }) => {
    const token = "Bearer " + JSON.parse(powerEduAuthToken);
    const response = await axios.put(`${API_URL}drivers/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

// Initial state
const initialState = {
  drivers: [],
  buses: [],
  routes: [],
  zones: [],
  status: "idle",
  error: null,
};

// Slice
const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {},
  // ...existing code...
  extraReducers: (builder) => {
    builder
      .addCase(getDriversList.fulfilled, (state, action) => {
        state.drivers = action.payload;
      })
      .addCase(getBusesList.fulfilled, (state, action) => {
        state.buses = action.payload;
      })
      .addCase(getTransportRoutesList.fulfilled, (state, action) => {
        state.routes = action.payload;
      })
      .addCase(getTransportZonesList.fulfilled, (state, action) => {
        state.zones = action.payload;
      })
      .addCase(createTransportZone.fulfilled, (state, action) => {
        console.log("createTransportZone fulfilled:", action.payload); // Add this log statement
        state.zones.push(action.payload);
      })
      .addCase(createBusRoutesRoute.fulfilled, (state, action) => {
        state.routes.push(action.payload);
      })
      .addCase(createBus.fulfilled, (state, action) => {
        state.buses.push(action.payload);
      })
      .addCase(createBusDriverRoute.fulfilled, (state, action) => {
        state.drivers.push(action.payload);
      })
      .addCase(deleteTransportZone.fulfilled, (state, action) => {
        state.zones = state.zones.filter((zone) => zone.id !== action.meta.arg);
      })
      .addCase(deleteBusRouter.fulfilled, (state, action) => {
        state.routes = state.routes.filter(
          (route) => route.id !== action.meta.arg
        );
      })
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.buses = state.buses.filter((bus) => bus.id !== action.meta.arg);
      })
      .addCase(deleteDrivers.fulfilled, (state, action) => {
        state.drivers = state.drivers.filter(
          (driver) => driver.id !== action.meta.arg
        );
      })
      .addCase(updateTransportZoneRoutes.fulfilled, (state, action) => {
        const index = state.zones.findIndex(
          (zone) => zone.id === action.meta.arg.id
        );
        if (index !== -1) {
          state.zones[index] = action.payload;
        }
      })
      .addCase(updateBusRouter.fulfilled, (state, action) => {
        const index = state.routes.findIndex(
          (route) => route.id === action.meta.arg.id
        );
        if (index !== -1) {
          state.routes[index] = action.payload;
        }
      })
      .addCase(updateBus.fulfilled, (state, action) => {
        const index = state.buses.findIndex(
          (bus) => bus.id === action.meta.arg.id
        );
        if (index !== -1) {
          state.buses[index] = action.payload;
        }
      })
      .addCase(updateDrivers.fulfilled, (state, action) => {
        const index = state.drivers.findIndex(
          (driver) => driver.id === action.meta.arg.id
        );
        if (index !== -1) {
          state.drivers[index] = action.payload;
        }
      });
  },
});

export default transportSlice.reducer;
