import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleSearchResponce } from './SearchApi';

const initialState = {
    status: 'idle', 
    searchData: []
};

export const handleSearchResponceAsync = createAsyncThunk('search/handleSearchResponceAsync', async (Searchdata) => {
    try {
        const { data } = await handleSearchResponce(Searchdata);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleSearchResponceAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(handleSearchResponceAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.searchData = action.payload;
            })
    },
});

export const selectSearchData= (state) => state.search.searchData;

export default searchSlice.reducer;
