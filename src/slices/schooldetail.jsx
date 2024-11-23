import { createSlice } from "@reduxjs/toolkit";

const schoolDetail = JSON.parse(localStorage.getItem("schooldetail")); // retrieves the schooldetail data from browser's local storage (if any)
const initialState = { schooldetail: schoolDetail ? schoolDetail : "" };

const schoolDetailSlice = createSlice({
  name: "schooldetail",
  initialState,
  reducers: {
    setSchoolDetail: (state, action) => {
      // Update the parameter to (state, action)
      state.schooldetail = action.payload; // Update the state.schooldetail value
    },
    clearSchoolDetail: (state) => {
      // Update the parameter to (state)
      state.schooldetail = ""; // Update the state.schooldetail value
    },
  },
});

const { reducer, actions } = schoolDetailSlice;

export const { setSchoolDetail, clearSchoolDetail } = actions;
export default reducer;
