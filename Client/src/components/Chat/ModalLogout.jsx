import { logout } from "../../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from 'react-modal';
import { SetStatus } from "../../Slice/AuthSlice";
function ModalLogout(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { modalIsOpen, closeModal } = props
    const status = useSelector((state) => state.auth.status);
    const ConfirmLogout = () => {
        dispatch(logout())
    }
    useEffect(() => {
        if (status === 'failed') {
            toast.error('Logout failed');
            toast.clearWaitingQueue();
        } else if (status === 'succeeded') {
            navigate("/login")
        }
        return () => {
            dispatch(SetStatus())
        }
    }, [status]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            shouldCloseOnEsc={true}
            appElement={document.getElementById('root')}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Are you sure Logout?</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={ConfirmLogout}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Logout
                </button>
                <button
                    onClick={closeModal}
                    className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

export default ModalLogout;