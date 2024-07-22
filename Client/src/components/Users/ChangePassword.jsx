import { useFormik } from 'formik';
import { validationChangePassword } from "../../utils/yup";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SetStatus } from '../../Slice/AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
import { confirmchangepassword } from '../../Slice/AuthSlice';

function ChangePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const status = useSelector(state => state.auth.status)
    const email = new URLSearchParams(location.search).get("email")
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: validationChangePassword,
        onSubmit: (values) => {
            const token = new URLSearchParams(location.search).get("token")
            const model = {
                token: token,
                password: values.password
            }
            dispatch(confirmchangepassword(model))
        }
    })
    useEffect(() => {
        if (status === 'failed') {
            toast.error('Change password failed');
            toast.clearWaitingQueue();
        } else if (status === 'succeeded') {
            toast.success('Change password successfully');
            setTimeout(() => {
                navigate("/login")
            }, 1500);
        }
        return () => {
            dispatch(SetStatus())
        }
    }, [status])
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="bg-white p-6 rounded shadow-lg w-full max-w-sm" onSubmit={formik.handleSubmit}>
                <h3 className="text-xl font-semibold mb-4 text-center">Confirm Change Password</h3>
                <p className='my-3'>Email: <b>{email}</b></p>
                <div>
                    <label>New Password</label>
                    <input
                        className="p-2 mb-2 w-full border-b-2 outline-none border-b-slate-900"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Your password..."
                    />
                    {formik.errors.password && formik.touched.password && (
                        <span className="text-red-500">{formik.errors.password}</span>
                    )}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        className="p-2 mb-2 w-full border-b-2 outline-none border-b-slate-900"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        placeholder="Confirm password..."
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <span className="text-red-500">{formik.errors.confirmPassword}</span>
                    )}
                </div>
                <button
                    className="p-2 mt-3 w-full bg-blue-500 text-white rounded hover:bg-blue-900"
                    type="submit"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Changing password...' : 'Change Password'}
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


export default ChangePassword;