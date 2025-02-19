import { createSlice } from "@reduxjs/toolkit";

const initialState = { schooldetail: "" };

const schoolDetailSlice = createSlice({
  name: "schooldetail",
  initialState,
  reducers: {
    setSchoolDetail: (state, action) => {
      state.schooldetail = action.payload; // Update the state.schooldetail value
    },
    clearSchoolDetail: (state) => {
      state.schooldetail = ""; // Update the state.schooldetail value
    },
  },
});

const { reducer, actions } = schoolDetailSlice;

export const { setSchoolDetail, clearSchoolDetail } = actions;
export default reducer;