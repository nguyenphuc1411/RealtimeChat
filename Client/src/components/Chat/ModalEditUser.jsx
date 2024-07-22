import { updateprofile } from "../../Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { SetStatus } from "../../Slice/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { getUserInfo } from "../../Slice/UsersSlice";

function ModalEditUser(props) {
    const dispatch = useDispatch();
    const { modalEditIsOpen, closeModalEdit, userInfo } = props;
    const status = useSelector((state) => state.auth.status);
    const [fullName, setFullname] = useState(userInfo.fullName);
    const [avatar, setAvatar] = useState(null);

    const ConfirmUpdate = () => {
        if (fullName === "") {
            toast.error("Fullname is required")
            toast.clearWaitingQueue()
        }
        else {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("file", avatar);
            dispatch(updateprofile(formData));
        }
    };
    useEffect(() => {
        if (status === "failed") {
            toast.error("Update Profile failed")
        }
        else {
            if (status === "succeeded") {
                closeModalEdit()
                dispatch(getUserInfo())
            }
        }
        return () => {
            dispatch(SetStatus())
        }
    }, [status])

    return (
        <Modal
            isOpen={modalEditIsOpen}
            onRequestClose={closeModalEdit}
            contentLabel="Example Modal"
            shouldCloseOnEsc={true}
            appElement={document.getElementById('root')}
            className="fixed top-1/2 left-1/2 transform w-2/6 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit user information?</h2>
                <button onClick={closeModalEdit} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form>
                <div>
                    <label>Fullname</label>
                    <input
                        className="p-2 mb-2 w-full border-b-2 outline-none border-b-slate-900"
                        name="fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Your fullname..."
                    />
                    <label>Upload Avatar</label>
                    <input
                        className="p-2 mb-2 w-full border-b-2 outline-none border-b-slate-900"
                        name="avatar"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/svg"
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={ConfirmUpdate}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Updating Info" : "Update"}
                    </button>
                    <button
                        type="button"
                        onClick={closeModalEdit}
                        className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    limit={1}
                    hideProgressBar={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </form>
        </Modal>
    );
}

export default ModalEditUser;
