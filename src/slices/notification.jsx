import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationService from "../services/notification.service";

// Define the initial state for the notification slice
const initialState = {
  notifications: [],
  status: "idle",
  message: null,
};

// Create an async thunk for creating a new notification
export const createNewNotification = createAsyncThunk(
  "notifications/createNewNotification",
  async ({ title, notiDesc, users }, { rejectWithValue }) => {
    try {
      return await NotificationService.createNotification(title, notiDesc, users);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an async thunk for updating the read status of a notification
export const updateNotificationReadStatus = createAsyncThunk(
  "notifications/updateNotificationReadStatus",
  async ({ notificationId, flag, userId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await NotificationService.updateNotificationRead(notificationId, flag, userId);
      dispatch(fetchNotificationsByUserId({ userId }));
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an async thunk for fetching notifications by user ID
export const fetchNotificationsByUserId = createAsyncThunk(
  "notifications/fetchNotificationsByUserId",
  async ({ userId }, { rejectWithValue }) => {
    try {
      return await NotificationService.fetchNotificationByUserId(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an async thunk for adding a new device token
export const addNewDeviceToken = createAsyncThunk(
  "notifications/addNewDeviceToken",
  async ({ userId, newToken }, { rejectWithValue }) => {
    try {
      return await NotificationService.addNewDeviceToken(userId, newToken);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the notification slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addLatestNotification: (state, action) => {
      state.notifications.pop();
      state.notifications.unshift(action.payload);
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.flag = true;
      });
    },
  },
  extraReducers: (builder) => {
    // Handle pending, fulfilled, and rejected states for createNewNotification
    builder.addCase(createNewNotification.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewNotification.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.message = action.payload.message || "Notification created successfully";
    });
    builder.addCase(createNewNotification.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });

    // Handle pending, fulfilled, and rejected states for updateNotificationReadStatus
    builder.addCase(updateNotificationReadStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateNotificationReadStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.message = action.payload.message || "Notification status updated successfully";
    });
    builder.addCase(updateNotificationReadStatus.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });

    // Handle pending, fulfilled, and rejected states for fetchNotificationsByUserId
    builder.addCase(fetchNotificationsByUserId.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchNotificationsByUserId.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.notifications = action.payload;
    });
    builder.addCase(fetchNotificationsByUserId.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });

    // Handle pending, fulfilled, and rejected states for addNewDeviceToken
    builder.addCase(addNewDeviceToken.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewDeviceToken.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.message = action.payload.message || "Device token added successfully";
    });
    builder.addCase(addNewDeviceToken.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
  },
});

// Export the actions and reducer for the notification slice
export const { addLatestNotification, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
