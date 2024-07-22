import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios"

export const PostGroup = createAsyncThunk(
    "groups/post",
    async (newGroup) => {
        const response = await axios.post("rooms", newGroup)
        return response
    }
)
export const GetGroup = createAsyncThunk(
    "groups/get",
    async () => {
        const response = await axios.get("rooms")
        return response
    }
)
export const SearchGroup = createAsyncThunk(
    "groups/search",
    async (search) => {
        const response = await axios.get(`rooms/search/?search=${search}`)
        return response
    }

)
const listRoom = []
const GroupSlice = createSlice({
    name: "groups",
    initialState: {
        currentRoom: {},
        listRoom: listRoom,
        loading: null,
        errors: null
    },
    reducers: {
        SetCurrentRoom: (state, action) => {
            state.currentRoom = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(PostGroup.fulfilled, (state, action) => {
                state.listRoom.push(action.payload)
            })
            .addCase(GetGroup.fulfilled, (state, action) => {
                state.listRoom = action.payload
            })
            .addCase(SearchGroup.fulfilled, (state, action) => {
                state.listRoom = action.payload
                console.log(action.payload)
            })
    }
})
export const { SetCurrentRoom } = GroupSlice.actions
export default GroupSlice.reducer