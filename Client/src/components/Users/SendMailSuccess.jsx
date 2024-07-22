import { Link } from "react-router-dom";

const SendEmailSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Send Email Success</h1>
                <p className="text-lg text-gray-700 mb-4 text-center">
                    A confirmation email has been sent to your email address. Please check your inbox and follow the instructions.
                </p>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    If you don't see the email in your inbox, please check your spam folder.
                </p>
                <div className="flex justify-center">
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SendEmailSuccess;