import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
    name: "chats",
    initialState: {
        listMessages: []
    },
    reducers: {
        getMessages: (state, action) => {
            state.listMessages = action.payload
        },
        pushMessages: (state, action) => {
            state.listMessages.push(action.payload)
        },
        deleteMessage: (state, action) => {
            state.listMessages = state.listMessages.filter(item => item.id !== action.payload);
        }
    }
})

export const { getMessages, pushMessages, deleteMessage } = ChatSlice.actions
export default ChatSlice.reducer