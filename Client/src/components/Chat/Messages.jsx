import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import signalRService from "../../utils/signalRSevice";
import { BaseUrl } from "../../utils/BaseUrl";
import { useRef, useEffect } from "react";
function Messages() {
    const decode = jwtDecode(localStorage.getItem("token"))
    const messages = useSelector(state => state.chat.listMessages)
    const currentRoom = useSelector(state => state.groups.currentRoom)
    const messageContainerRef = useRef(null);
    const HandleDeleteMessage = async (id) => {
        if (id && currentRoom) {
            try {
                await signalRService.send("DeleteMessage", parseInt(currentRoom.id), parseInt(id))
            } catch (err) {
                console.error('Error deleting message: ', err);
            }
        }
    }

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="h-[36rem] overflow-y-auto flex flex-col" ref={messageContainerRef}>
            {messages &&
                messages.map((item) => {
                    const formatDate = (timestamp) => {
                        const date = new Date(timestamp);
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        return `${day}-${month}    ${hours}:${minutes}`;
                    };

                    return (
                        <div
                            key={item.timeStamp}
                            className={`flex ${decode.sub === item.email ? 'justify-end' : 'justify-start'} mt-3 pl-2`}
                        >
                            {decode.sub !== item.email && (
                                item.avatar ?
                                    <img className="w-10 h-10 rounded-full mr-3" src={`${BaseUrl}images/${item.avatar}`} alt="Profile" />
                                    : <img className="w-10 h-10 rounded-full mr-3" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" />
                            )}
                            <div className="flex flex-col">
                                <p
                                    className={`p-2 rounded-md break-words w-72 ${decode.sub === item.email ? 'bg-purple-400' : 'bg-slate-100'
                                        }`}
                                >
                                    {item.content}
                                </p>
                                <div className="flex justify-between">
                                    <span className="text-sm">{item.fullName}</span>
                                    <span className="text-[0.75rem] mt-2">{formatDate(item.timeStamp)}</span>
                                </div>
                            </div>
                            {decode.sub === item.email && (
                                <>
                                    <button onClick={() => HandleDeleteMessage(item.id)} className="mb-5">
                                        <i className="fa-solid fa-delete-left hover:text-red-700 "></i>
                                    </button>
                                    {
                                        item.avatar ?
                                            <img className="w-10 h-10 rounded-full mr-3" src={`${BaseUrl}images/${item.avatar}`} alt="Profile" />
                                            : <img className="w-10 h-10 rounded-full mr-3" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" />
                                    }
                                </>

                            )}
                        </div>
                    );
                })}
        </div>
    )
}

export default Messages;