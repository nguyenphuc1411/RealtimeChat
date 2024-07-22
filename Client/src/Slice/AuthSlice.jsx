import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('auth/login', { email, password });
            localStorage.setItem('token', response.token);
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

// Thunk để gọi API đăng ký
export const register = createAsyncThunk(
    'auth/register',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axios.post('auth/register', newUser);
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        await axios.post('auth/logout');
        localStorage.removeItem('token');
        return null;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const forgotpassword = createAsyncThunk(
    "auth/forgotpassword",
    async (request, { rejectWithValue }) => {
        try {
            const response = await axios.post("auth/forgotpassword", request)
            return response;
        }
        catch (err) {
            return rejectWithValue(err.response)
        }
    }
)
export const confirmchangepassword = createAsyncThunk(
    "auth/changepasswords",
    async (model, { rejectWithValue }) => {
        try {
            await axios.post("auth/changepassword", model);
            return null;
        } catch (err) {
            return rejectWithValue(err.response);
        }
    }
);
export const updateprofile = createAsyncThunk(
    "auth/updateprofile",
    async (model, { rejectWithValue }) => {
        try {
            await axios.post("auth/updateprofile", model);
            return null;
        } catch (err) {
            return rejectWithValue(err.response);
        }
    }
);

const initialState = {
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetStatus: (state) => {
            state.status = "ide"
        },
    },
    extraReducers: (builder) => {
        builder
            //// login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            })
            ////// register
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            })
            /// logout
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'succeeded';
                state.token = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            })
            // forgot password
            .addCase(forgotpassword.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(forgotpassword.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(forgotpassword.rejected, (state) => {
                state.status = "failed";
            })
            // confirm change password
            .addCase(confirmchangepassword.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(confirmchangepassword.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(confirmchangepassword.rejected, (state) => {
                state.status = "failed";
            })
            // update profile
            .addCase(updateprofile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateprofile.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(updateprofile.rejected, (state) => {
                state.status = "failed";
            })
            ;
    },
});
export const { SetStatus } = AuthSlice.actions
export default AuthSlice.reducer;

