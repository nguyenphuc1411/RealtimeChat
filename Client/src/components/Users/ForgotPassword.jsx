import { useFormik } from 'formik';
import { validationForgotPassword } from "../../utils/yup";
import { forgotpassword } from '../../Slice/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SetStatus } from '../../Slice/AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
function ForgotPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const status = useSelector(state => state.auth.status)
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: validationForgotPassword,
        onSubmit: (values) => {
            const request = {
                to: values.email,
                subject: "Forgot password request",
                resetLink: "http://localhost:5173/changepassword"
            }
            dispatch(forgotpassword(request))
        }
    })
    useEffect(() => {
        if (status === 'failed') {
            toast.error('Send mail failed');
            toast.clearWaitingQueue();
        } else if (status === 'succeeded') {
            navigate("/sendmailsuccess")
        }
        return () => {
            dispatch(SetStatus())
        }
    }, [status])
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="bg-white p-6 rounded shadow-lg w-full max-w-sm" onSubmit={formik.handleSubmit}>
                <h3 className="text-xl font-semibold mb-4 text-center">Forgot password</h3>
                <div>
                    <label>Email</label>
                    <input
                        className="p-2 mb-2 w-full border-b-2 outline-none border-b-slate-900"
                        name="email"
                        type="text"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Your email..." />
                    {formik.errors.email && formik.touched.email && (
                        <span className="text-red-500">{formik.errors.email}</span>
                    )}
                </div>
                <button
                    className="p-2 mt-3 w-full bg-blue-500 text-white rounded hover:bg-blue-900"
                    type="submit"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Sending mail in...' : 'Send mail'}
                </button>
                <Link to="/login" className="text-blue-300 cursor-pointer mt-2 float-end hover:text-blue-500">Back to Login?</Link>
            </form>
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
        </div>
    );
}


export default ForgotPassword;