import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HandleModifyRequest, HandleSendRequest, HandlefollowbackRequest, fetchAllRequestByUser } from './notificationApi';

const initialState = {
    status: 'idle',
    allRequestForUser: [],
};

export const fetchAllRequestByUserAsync = createAsyncThunk('notifications/fetchAllRequestByUserAsync', async () => {
    try {
        const { data } = await fetchAllRequestByUser();
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);
export const HandleSendRequestAsync = createAsyncThunk(
    'notifications/HandleSendRequestAsync', async ({ReceiverId, Msg}) => {
    try {
        const { data } = await HandleSendRequest(ReceiverId, Msg);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);
export const HandleFolowbackRequestAsync = createAsyncThunk(
    'notifications/HandleFolowbackRequestAsync', async ({ReceiverId, Msg}) => {
    try {
        const { data } = await HandlefollowbackRequest(ReceiverId, Msg);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);
export const HandleModifyRequestAsync = createAsyncThunk(
    'notifications/HandleModifyRequestAsync', async (RequestData) => {
    try {
        const { data } = await HandleModifyRequest(RequestData);
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRequestByUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllRequestByUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allRequestForUser = action.payload;
            })
    },
});

export const selectAllRequestForUser = (state) => state.notification.allRequestForUser;


export default notificationSlice.reducer;
