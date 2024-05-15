import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createStatus, fetchAllStatusOnHomePage } from './StatusApi';

const initialState = {
    status: 'idle',
    statusData: [],
    currStatusUpload:null
};

export const fetchAllStoryOnHomePageAsync = createAsyncThunk('status/fetchAllStatusOnHomePage', async () => {
    try {
        const { data } = await fetchAllStatusOnHomePage();
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);
export const createStatusAsync = createAsyncThunk('status/createStatusAsync', async (StatusData) => {
    try {
        const { data } = await createStatus(StatusData);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStatusAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createStatusAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currStatusUpload=action.payload;
            })
            .addCase(fetchAllStoryOnHomePageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllStoryOnHomePageAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.statusData=action.payload;
            })
            
    },
});

export const selectStoryData = (state) => state.status.statusData;
export const selectStoryUploadstatus = (state) => state.status.status;
export const selectCurrStatus = (state) => state.status.currStatusUpload;


export default statusSlice.reducer;
