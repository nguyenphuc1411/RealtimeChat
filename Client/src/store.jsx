import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slice/AuthSlice"
import GroupReducer from "./Slice/GroupSlice"
import UsersReducer from "./Slice/UsersSlice"
import ChatReducer from "./Slice/ChatSlice"
const store = configureStore({
    reducer: {
        auth: AuthReducer,
        groups: GroupReducer,
        users: UsersReducer,
        chat: ChatReducer
    }
})

export default store;