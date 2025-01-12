import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearMessage, setMessage } from "./message";
import AuthService from "../services/auth.service";
import { setUser, clearUser } from "./user";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      userid,
      email,
      firstname,
      lastname,
      admissionno,
      rollno,
      parentname,
      schoolcode,
      status,
      classname,
      password,
      roles,
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await AuthService.register(
        userid,
        email,
        firstname,
        lastname,
        admissionno,
        rollno,
        parentname,
        schoolcode,
        status,
        classname,
        password,
        roles
      );
      dispatch(setMessage(data.message));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ userid, password, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await AuthService.login(userid, password, rememberMe);
      dispatch(setUser(data));
      return { response: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message));
      return rejectWithValue(message); // return the error message
    }
  }
);


export const authUser = createAsyncThunk(
  "auth/authUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await AuthService.authUser();
      dispatch(setUser(user));
      return user;
    } catch (error) {
      dispatch(clearUser());
      return rejectWithValue(error);
    }
  }
);


export const handleTokenExpiry = createAsyncThunk(
  "auth/handleLoginExpiry",
  async (_, { dispatch }) => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("powerEduAuthToken");
    const tokenExpiry = sessionStorage.getItem("tokenExpiry");
    if (token && tokenExpiry && user) {
      const expiryTime = parseInt(tokenExpiry);
      const currentTime = Date.now();
      if (expiryTime - currentTime < 0) {
        dispatch(clearUser());
        dispatch(logout());
      } else {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(dispatch(handleTokenExpiry()));
          }, expiryTime - currentTime);
        });
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, {dispatch}) => {
  
  await AuthService.logout();
  dispatch(clearUser());
  dispatch(clearMessage());
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [register.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;

export default reducer;
