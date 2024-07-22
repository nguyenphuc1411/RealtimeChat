import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetGroup } from "../../Slice/GroupSlice";
import { SetCurrentRoom } from "../../Slice/GroupSlice";
import signalRService from "../../utils/signalRSevice";
import { BaseUrl } from "../../utils/BaseUrl";
function ListGroup() {
    const dispatch = useDispatch();
    const listGroup = useSelector((state) => state.groups.listRoom);
    const currentRoom = useSelector(state => state.groups.currentRoom)
    useEffect(() => {
        dispatch(GetGroup());
    }, [dispatch]);

    const handleJoinGroup = async (item) => {
        await signalRService.send("Join", item.roomName)
        dispatch(SetCurrentRoom(item))
    }
    return (
        listGroup.map(item => {
            return (
                <div key={item.id} className={`flex mt-6 hover:bg-slate-700 cursor-pointer p-2 ${currentRoom.id == item.id ? "bg-slate-700" : ""}`} onClick={() => handleJoinGroup(item)}>
                    {
                        item.avatar ?
                            <img className="w-10 h-10 rounded-full mr-3" src={`${BaseUrl}images/${item.avatar}`} alt="Profile" />
                            : <img className="w-10 h-10 rounded-full mr-3" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" />
                    }
                    <div>
                        <h5>{item.roomName}</h5>
                        <span className="text-gray-400">Admin: {item.adminName}</span>
                    </div>
                </div>
            )
        })

    );
}
export default ListGroup;