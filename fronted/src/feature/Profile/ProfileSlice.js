import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserDetail, fetchUserID, handleChangeProfilePic, handleModifyProfile } from './ProfileApi';

const initialState = {
    status: 'idle',
    CurrUserProfileDetail: null,
    CurrLoggedInUserId: null
};

export const fetchUserDetailAsync = createAsyncThunk('profile/fetchUserDetailAsync', async (UserId) => {
    try {
        const { data } = await fetchUserDetail(UserId);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const fetchUserIdAsync = createAsyncThunk('profile/fetchUserIdAsync', async () => {
    try {
        const { data } = await fetchUserID();
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const handleChangeProfilePicAsync = createAsyncThunk('profile/handleChangeProfilePicAsync', async () => {
    try {
        const { data } = handleChangeProfilePic();
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const handleModifyProfileAsync = createAsyncThunk('profile/handleModifyProfileAsync', async (updateDetail) => {
    try {
        const { data } = await handleModifyProfile(updateDetail);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetailAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetailAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.CurrUserProfileDetail = action.payload;
            })
            .addCase(fetchUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.CurrLoggedInUserId = action.payload.CurrUserId;
            })
    },
});

export const selectCurrUserProfileDetail = (state) => state.profile.CurrUserProfileDetail;
export const selectLoggedInUserId = (state) => state.profile.CurrLoggedInUserId;


export default profileSlice.reducer;
