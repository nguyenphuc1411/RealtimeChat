import React from 'react';
import { PostGroup } from '../../Slice/GroupSlice';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { validationGroup } from '../../utils/yup';
import { toast, ToastContainer } from 'react-toastify';
function ModalGroup({ modalIsOpen, closeModal }) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            groupName: ""
        },
        validationSchema: validationGroup,
        onSubmit: (values, { resetForm }) => {
            const newGroup = {
                id: 0,
                roomName: values.groupName,
                adminId: ""
            }
            dispatch(PostGroup(newGroup))
            toast.success("Created Rooms Successfully")
            closeModal()
            resetForm()
        }
    })
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                shouldCloseOnEsc={true}
                appElement={document.getElementById('root')}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Create new group</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text" name="groupName"
                        placeholder="Group name..."
                        value={formik.values.groupName}
                        onChange={formik.handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 break-words"
                    />
                    {formik.errors.groupName && formik.touched.groupName && <span className="text-red-500">{formik.errors.groupName}</span>}
                    <div className="mt-4 flex justify-end">
                        <button type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Create
                        </button>
                        <button
                            onClick={closeModal}
                            className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </>

    );
}
export default ModalGroup;
