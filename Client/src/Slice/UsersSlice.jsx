import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios"
export const getUserInfo = createAsyncThunk(
    "users/getProfile",
    async () => {
        const response = await axios.get("auth/userinfo")
        return response
    }
)

const UsersSlice = createSlice({
    name: "UsersSlice",
    initialState: {
        listUser: [],
        user: {}
    },
    reducers: {
        GetUsersConnect: (state, action) => {
            state.listUser = action.payload[0]
        }
    },
    extraReducers: (builder) => builder
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload
        })

})
export const { GetUsersConnect } = UsersSlice.actions
export default UsersSlice.reducer