// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { setMessage } from "./message";
// import PrincipalService from "../services/principal.service";
// import classService from "../services/class.service";

// const principal = JSON.parse(localStorage.getItem("principal"));

// export const registerPrincipal = createAsyncThunk(
//   "principal/registerPrincipal",
//   async ({ schoolcode, principalname, principalmessage }, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await PrincipalService.registerprincipal(schoolcode, principalname, principalmessage);
//       dispatch(setMessage(response.data.message));
//       return response.data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Something went wrong.";
//       dispatch(setMessage(message));
//       return rejectWithValue();
//     }
//   }
// );

// export const fetchPrincipalData = createAsyncThunk(
//   "principal/fetchPrincipalData",
//   async ({ code }, { dispatch, rejectWithValue }) => {
//     try {
//       const data = await PrincipalService.principaldata(code);
//       return { principal: data };
//     } catch (error) {
//       const message = error.response?.data?.message || "Something went wrong.";
//       dispatch(setMessage(message));
//       return rejectWithValue();
//     }
//   }
// );

// export const fetchStudentsProfile = createAsyncThunk(
//   "principal/fetchStudentsProfile",
//   async ({ schoolcode }, { dispatch, rejectWithValue }) => {
//     try {
//       const data = await PrincipalService.getStudentsProfile(schoolcode);
//       return data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Something went wrong.";
//       dispatch(setMessage(message));
//       return rejectWithValue();
//     }
//   }
// );

// export const getDropdownClasses = createAsyncThunk(
//   "principal/getDropdownClasses",
//   async ({ schoolcode }, { dispatch, rejectWithValue }) => {
//     try {
//       const data = await classService.getDropdownClasses(schoolcode);
//       return data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Something went wrong.";
//       dispatch(setMessage(message));
//       return rejectWithValue();
//     }
//   }
// );

// export const fetchTeachersProfile = createAsyncThunk(
//   "principal/fetchTeachersProfile",
//   async ({ schoolcode }, { dispatch, rejectWithValue }) => {
//     try {
//       const data = await PrincipalService.getTeachersProfile(schoolcode);
//       return data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Something went wrong.";
//       dispatch(setMessage(message));
//       return rejectWithValue();
//     }
//   }
// );

// const initialState = {
//   isLoggedIn: Boolean(principal),
//   principal: principal || null,
//   students: [],
//   teachers: [],
//   profile: null,
//   classes: [],
//   subjects: []
// };

// const principalSlice = createSlice({
//   name: "principal",
//   initialState,
//   reducers: {
//     setProfile: (state, action) => {
//       state.profile = action.payload
//     },
//     clearProfile: (state, action) => {
//       state.profile = null
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerPrincipal.fulfilled, (state) => {
//         state.isLoggedIn = false;
//       })
//       .addCase(registerPrincipal.rejected, (state) => {
//         state.isLoggedIn = false;
//       })
//       .addCase(fetchPrincipalData.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.principal = action.payload.principal;
//       })
//       .addCase(fetchPrincipalData.rejected, (state) => {
//         state.isLoggedIn = false;
//         state.principal = null;
//       })

//       .addCase(fetchStudentsProfile.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.students = action.payload?.data;
//       })
//       .addCase(fetchStudentsProfile.rejected, (state) => {
//         state.isLoggedIn = false;
//         state.students = [];
//       })
//       .addCase(getDropdownClasses.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.classes = action.payload;
//       })
//       .addCase(getDropdownClasses.rejected, (state) => {
//         state.isLoggedIn = false;
//         state.classes = [];
//       })

//       .addCase(fetchTeachersProfile.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.teachers = action.payload?.data;
//         state.classes = action.payload?.classes;
//         state.subjects = action.payload?.subjects;
//       })
//   },
// });

// export const { setProfile, clearProfile } = principalSlice.actions;
// export default principalSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PrincipalService from "../services/principal.service";
import classService from "../services/class.service";
import principalService from "../services/principal.service";

const principal = JSON.parse(localStorage.getItem("principal"));

export const registerPrincipal = createAsyncThunk(
  "principal/registerPrincipal",
  async (
    { schoolcode, principalname, principalmessage },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await PrincipalService.registerprincipal(
        schoolcode,
        principalname,
        principalmessage
      );
      dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

export const fetchPrincipalData = createAsyncThunk(
  "principal/fetchPrincipalData",
  async ({ code }, { dispatch, rejectWithValue }) => {
    try {
      const data = await PrincipalService.principaldata(code);
      return { principal: data };
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

export const fetchStudentsProfile = createAsyncThunk(
  "principal/fetchStudentsProfile",
  async ({ schoolcode }, { dispatch, rejectWithValue }) => {
    try {
      const data = await PrincipalService.getStudentsProfile(schoolcode);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

export const getDropdownClasses = createAsyncThunk(
  "principal/getDropdownClasses",
  async ({ schoolcode }, { dispatch, rejectWithValue }) => {
    try {
      const data = await classService.getDropdownClasses(schoolcode);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

export const getDropdownTeachers = createAsyncThunk(
  "principal/getDropdownTeachers",
  async ({ school_code }, { dispatch, rejectWithValue }) => {
    try {
      const data = await principalService.getDropdownTeachers(school_code);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

export const fetchTeachersProfile = createAsyncThunk(
  "principal/fetchTeachersProfile",
  async ({ schoolcode }, { dispatch, rejectWithValue }) => {
    try {
      const data = await PrincipalService.getTeachersProfile(schoolcode);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      dispatch(setMessage(message));
      return rejectWithValue();
    }
  }
);

const initialState = {
  isLoggedIn: Boolean(principal),
  principal: principal || null,
  students: [],
  teachers: [],
  profile: null,
  classes: [],
  subjects: [],
  dropdownTeachers: [],
};

const principalSlice = createSlice({
  name: "principal",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state, action) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPrincipal.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registerPrincipal.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(fetchPrincipalData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.principal = action.payload.principal;
      })
      .addCase(fetchPrincipalData.rejected, (state) => {
        state.isLoggedIn = false;
        state.principal = null;
      })

      .addCase(fetchStudentsProfile.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.students = action.payload?.data;
      })
      .addCase(fetchStudentsProfile.rejected, (state) => {
        state.isLoggedIn = false;
        state.students = [];
      })
      .addCase(getDropdownClasses.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.classes = action.payload;
      })
      .addCase(getDropdownClasses.rejected, (state) => {
        state.isLoggedIn = false;
        state.classes = [];
      })
      .addCase(getDropdownTeachers.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.dropdownTeachers = action.payload;
      })
      .addCase(getDropdownTeachers.rejected, (state) => {
        state.isLoggedIn = false;
        state.dropdownTeachers = [];
      })

      .addCase(fetchTeachersProfile.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.teachers = action.payload?.data;
        state.classes = action.payload?.classes;
        state.subjects = action.payload?.subjects;
      });
  },
});

export const { setProfile, clearProfile } = principalSlice.actions;
export default principalSlice.reducer;
