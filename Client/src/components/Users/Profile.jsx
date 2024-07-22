import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../Slice/UsersSlice";
import { useEffect, useState } from "react";
import ModalLogout from "../Chat/ModalLogout";
import ModalEditUser from "../Chat/ModalEditUser";
import { BaseUrl } from "../../utils/BaseUrl";
function Profile() {
    const userInfor = useSelector((state) => state.users.user);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
    const dispatch = useDispatch()
    const handleLogout = () => {
        setModalIsOpen(true)
    };
    const handleEdit = () => {
        setModalEditIsOpen(true)
    };
    const closeModal = () => {
        setModalIsOpen(false)
    };
    const closeModalEdit = () => {
        setModalEditIsOpen(false)
    };
    const date = new Date(userInfor.createdDate);

    useEffect(() => {
        dispatch(getUserInfo())
    }, [])

    return (
        <div className="bg-gray-200 w-[13.2rem] p-3 flex items-center justify-center fixed bottom-0">
            <div className="text-center">
                {
                    userInfor.avatar ?
                        <img className="w-24 h-24 rounded-full mx-auto" src={`${BaseUrl}images/${userInfor.avatar}`} alt="Profile" />
                        : <img className="w-24 h-24 rounded-full mx-auto" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" />
                }

                <p className="mt-2 text-2xl">{userInfor.fullName}</p>
                <p className="mt-2 text-sm w-full break-words text-gray-600">{userInfor.email}</p>
                <p className="mt-2 text-sm text-gray-500">Joined Date:  {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</p>
                <div className="flex justify-between">
                    <button onClick={handleEdit} className="mt-5 hover:text-blue-700 hover:scale-110">
                        <i className="fa-solid fa-user-pen"></i> Edit
                    </button>
                    {
                        modalEditIsOpen && <ModalEditUser modalEditIsOpen={modalEditIsOpen} closeModalEdit={closeModalEdit} userInfo={userInfor} />
                    }
                    <button onClick={handleLogout} className="mt-5 hover:text-blue-700 hover:scale-110"><i className="fa-solid fa-right-from-bracket"></i>Logout</button>
                    {
                        modalIsOpen && <ModalLogout modalIsOpen={modalIsOpen} closeModal={closeModal} />
                    }
                </div>

            </div>
        </div>
    );
}

export default Profile;