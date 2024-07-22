import { useSelector } from "react-redux";
import { BaseUrl } from "../../utils/BaseUrl";
function UserConnect() {
    const usersConnect = useSelector(state => state.users.listUser)
    console.log(usersConnect)
    return (
        <div className="p-2 bg-gray-300">
            <p>Who's here? ({usersConnect.length})</p>
            <hr />
            {
                usersConnect && usersConnect.map((item, index) => {
                    return (
                        <div key={item.email + index} className="flex" >
                            {
                                item.avatar ?
                                    <img className="w-10 h-10 rounded-full mt-2 mr-2" src={`${BaseUrl}images/${item.avatar}`} alt="Profile" />
                                    : <img className="w-10 h-10 rounded-full mt-2 mr-2" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" />
                            }
                            <div>
                                <p>{item.fullName}</p>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default UserConnect;