import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FeeService from "../services/fee.service";

const allFee = [];

export const Fee = createAsyncThunk(
    "fee/allFee",
    async (body, thunkAPI) => {
        try {
            const response = await FeeService.allStudentFee(body)
            return response;
        } catch (error) {
            console.error("Error in Fee thunk:", error);
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    isLoggedIn: allFee ? true : false,
    allFee: allFee || null,
    classNames: null,
};

const FeeSlice = createSlice({
    name: "fee",
    initialState,
    extraReducers: {
        [Fee.pending]: (state, action) => {
            state.loading = true;
        },
        [Fee.fulfilled]: (state, action) => {
            //getting all the classes and removing duplicacy
            const classNames = [...new Set(action.payload.map(item => item.classname))]
            state.classNames = classNames;
            state.allFee = action.payload;
            state.isLoggedIn = false;
            state.loading = false;
        },
        [Fee.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.loading = false;
            console.error("Error in Fee reducer:", action.error);
        }
    },
});

const FeeReducer = FeeSlice.reducer;
export default FeeReducer;
