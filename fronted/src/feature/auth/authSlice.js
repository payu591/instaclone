import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, loginUser } from './authApi';


const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
//   userChecked: false,
//   mailSent: false,
//   passwordReset:false
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser', 
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkUserAsync = createAsyncThunk('auth/checkUser', async (loginData, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  });

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async () => {
    // const response = await signout();
    // The value we return becomes the `fulfilled` action payload
    // return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(loginUserAsync.pending, (state) => {
            state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
// export const selectUserChecked = (state) => state.auth.userChecked;
// export const selectMailSent = (state) => state.auth.mailSent;
// export const selectPasswordReset = (state) => state.auth.passwordReset;

// export const { } = authSlice.actions;

export default authSlice.reducer;