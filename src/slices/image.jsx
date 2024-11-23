import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import imageService from '../services/image.service';

// Create an async thunk to call the backend and generate a new pre-signed URL
export const getImageUrl = createAsyncThunk(
    'image/getImageUrl',
    async ({ path }) => {
        const response = await imageService.getimageUrl(path);
        // console.log(response);
        return response.data;
    }
);

// Create a slice to store the pre-signed URL
const imageSlice = createSlice({
    name: 'image',
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getImageUrl.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

const { reducer } = imageSlice;

export default reducer;
