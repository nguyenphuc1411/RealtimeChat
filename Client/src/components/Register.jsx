import { useFormik } from 'formik';
import { validationRegister } from '../utils/yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { SetStatus } from '../Slice/AuthSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.auth.status);
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationRegister,
        onSubmit: (values) => {
            dispatch(register(values));
        },
    });
    useEffect(() => {
        if (status === 'failed') {
            toast.error('Register failed');
            toast.clearWaitingQueue()
        }
        else {
            if (status === "succeeded") {
                toast.success('Register successfully');
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
            }
        }
        return () => {
            dispatch(SetStatus())
        }
    }, [status])

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <form className="bg-white p-6 rounded shadow-lg w-full max-w-sm" onSubmit={formik.handleSubmit}>
                    <h3 className="text-xl font-semibold mb-4 text-center">Create a new account</h3>
                    <div>
                        <label>Full Name</label>
                        <input
                            className="p-2 mb-2 w-full border-b-2 outline-none border-b-slate-900"
                            type="text"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            placeholder="Your full name..."
                        />
                        {formik.errors.fullName && formik.touched.fullName && (
                            <span className="text-red-500">{formik.errors.fullName}</span>
                        )}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            className="p-2 mb-2 w-full border-b-2 outline-none border-b-slate-900"
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Your email..."
                        />
                        {formik.errors.email && formik.touched.email && (
                            <span className="text-red-500">{formik.errors.email}</span>
                        )}
                    </div>
                    <div>
                        <label>Password</label>
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
                        {status === 'loading' ? 'Registering...' : 'Register'}
                    </button>
                    <div className="mt-2 text-right">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 ml-1 hover:text-blue-900">
                            Login
                        </Link>
                    </div>
                </form>
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
        </>
    );
}

export default Register;
