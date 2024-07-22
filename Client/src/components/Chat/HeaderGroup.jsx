
import { useSelector } from "react-redux";

function HeaderGroup() {
    const currentRoom = useSelector(state => state.groups.currentRoom)
    const date = new Date(currentRoom.createdDate)
    return (
        <div className="flex justify-evenly items-center p-4">
            <p>Room name: <b>{currentRoom.roomName}</b> </p>
            <p>Admin: <b>{currentRoom.adminName}</b> </p>
            <p>Created Date: <b>
                {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
            </b> </p>
        </div>
    );
}

export default HeaderGroup;