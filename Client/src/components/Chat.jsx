import { useEffect, useState } from "react";
import UserConnect from "./Users/UserConnect";
import Messages from "./Chat/Messages";
import { useDispatch } from "react-redux";
import ModalGroup from "./Chat/ModalGroup";
import ListGroup from "./Chat/ListGroup";
import { SearchGroup } from "../Slice/GroupSlice";
import Profile from "./Users/Profile";
import HeaderGroup from "./Chat/HeaderGroup";
import { debounce } from "lodash";
import ChatBox from "./Chat/ChatBox";
import signalRService from "../utils/signalRSevice";
import { getMessages, pushMessages, deleteMessage } from "../Slice/ChatSlice"
import { GetUsersConnect } from "../Slice/UsersSlice";
import Login from "./Login";
function Chat() {
    const [modalIsOpen, setmodalIsOpen] = useState(false)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    useEffect(() => {
        async function startService() {
            try {
                await signalRService.start(token);
                await signalRService.on("GetMessages", (data) => {
                    dispatch(getMessages(data))
                })
                await signalRService.on("NewMessage", (newMessage) => {
                    dispatch(pushMessages(newMessage))
                })
                await signalRService.on("CurrentUsers", (currentUsers) => {
                    dispatch(GetUsersConnect(currentUsers))
                })
                await signalRService.on("DeleteMessageSuccess", (messageDeleted) => {
                    dispatch(deleteMessage(messageDeleted.id))
                })
                console.log('SignalR connected');
            } catch (error) {
                console.error('Failed to start SignalR connection:', error);
            }
        }
        startService();
    }, []);

    const handleModalOpen = () => {
        setmodalIsOpen(true)
    }
    const closeModal = () => {
        setmodalIsOpen(false)
    }
    const handleChangeSearch = debounce((e) => {
        dispatch(SearchGroup(e.target.value))
    }, 1000)
    if (!token) {
        return (
            <Login />
        )
    }
    return (
        <>
            <ModalGroup modalIsOpen={modalIsOpen} closeModal={closeModal} />
            <div className="grid grid-cols-1 md:grid-cols-4 mx-5 md:mx-40 h-screen">
                {/* Danh sách nhóm, nút thêm, ô tìm kiếm */}
                <div className="bg-slate-800 text-white p-3 md:p-7">
                    <div className="flex">
                        <input
                            onChange={handleChangeSearch}
                            className="rounded-lg bg-slate-900 border-none focus:border-none p-2 w-5/6"
                            placeholder="Search"
                        />
                        <button onClick={handleModalOpen} className="ms-2 md:ms-10 rounded-full cursor-pointer hover:text-red-500">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>

                    <ListGroup />
                </div>

                {/* Khu vực tin nhắn */}
                <div className="bg-slate-300 md:col-span-3 relative">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="md:col-span-3">
                            {/* Header */}
                            <HeaderGroup />
                            <hr />
                            {/* Tin nhắn nhận được */}
                            <Messages />
                            {/* Hộp chat */}
                            <ChatBox />
                        </div>

                        {/* Khu vực người dùng kết nối và hồ sơ cá nhân */}
                        <div>
                            <UserConnect />
                            <Profile />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;