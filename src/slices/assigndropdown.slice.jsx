import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subject: "",
  assdate: "",
  duedate: "",
  weekly: false,
  monthly: false,
  overview: true
};

export const assignDropDownSlice = createSlice({
  name: "assigndrop",
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    setAssDate: (state, action) => {
      state.assdate = action.payload;
    },
    setDueDate: (state, action) => {
      state.duedate = action.payload;
    },
    sortByMonthWeekly: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetAssFilter: () => {
      return initialState;
    }
  }
});

export const { setAssDate, setDueDate, setSubject, sortByMonthWeekly, resetAssFilter } = assignDropDownSlice.actions;
export default assignDropDownSlice.reducer;
