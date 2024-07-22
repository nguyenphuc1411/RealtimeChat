import { useState } from "react";
import signalRService from "../../utils/signalRSevice";
import { useSelector } from "react-redux";
function ChatBox() {
    const [message, setMessage] = useState("")
    const currentRoom = useSelector(state => state.groups.currentRoom)
    const handleSendMessage = async () => {
        if (message && currentRoom) {
            try {
                await signalRService.send("SendMessage", message, parseInt(currentRoom.id));
                setMessage("");
            } catch (err) {
                console.error('Error sending message: ', err);
            }
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSendMessage();
            setMessage("")
        }
    };
    return (
        <div className=" bg-white px-6 border-b flex justify-between fixed bottom-0 w-[41rem]">
            <button className="mr-3 hover:text-blue-800"><i className="fa-solid fa-face-smile"></i></button>
            <button className="mr-5  hover:text-blue-800"><i className="fa-solid fa-link"></i></button>
            <textarea
                onKeyDown={handleKeyDown}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-2 outline-none resize-none max-h-[80px]"
                placeholder="Type a message..."
            />

            <button onClick={handleSendMessage} className="text-blue-700  hover:text-red-700 "><i className="fa-solid fa-paper-plane"></i></button>
        </div>
    );
}

export default ChatBox;